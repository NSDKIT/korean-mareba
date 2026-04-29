import Stripe from 'stripe';
import { stripe, PRICE_IDS } from '@/lib/stripe/client';
import { prisma } from '@/lib/prisma/client';
import type { Plan } from '@/types';
import { checkEnvGroup, createEnvErrorResponse } from '@/lib/env';

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || 'whsec_dummy';

function getPlanFromPriceId(priceId: string): Plan {
  if (
    priceId === PRICE_IDS.PREMIUM_MONTHLY ||
    priceId === PRICE_IDS.PREMIUM_YEARLY
  ) {
    return 'PREMIUM';
  }
  if (
    priceId === PRICE_IDS.STANDARD_MONTHLY ||
    priceId === PRICE_IDS.STANDARD_YEARLY
  ) {
    return 'STANDARD';
  }
  return 'FREE';
}

export async function POST(req: Request) {
  // 環境変数チェック
  const envCheck = checkEnvGroup('stripe');
  if (!envCheck.isValid) {
    return createEnvErrorResponse('Stripe Webhook', envCheck.missing);
  }

  try {
    const body = await req.text();
    const signature = req.headers.get('stripe-signature');

    if (!signature) {
      return new Response('No signature', { status: 400 });
    }

    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return new Response('Webhook signature verification failed', {
        status: 400,
      });
    }

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.userId;

        if (!userId) {
          console.error('No userId in session metadata');
          break;
        }

        const subscription = await stripe.subscriptions.retrieve(
          session.subscription as string
        );
        const priceId = subscription.items.data[0].price.id;
        const plan = getPlanFromPriceId(priceId);

        await prisma.user.update({
          where: { id: userId },
          data: {
            stripeCustomerId: session.customer as string,
            stripeSubscriptionId: session.subscription as string,
            plan,
          },
        });

        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        const priceId = subscription.items.data[0].price.id;
        const plan = getPlanFromPriceId(priceId);

        await prisma.user.updateMany({
          where: { stripeSubscriptionId: subscription.id },
          data: { plan },
        });

        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;

        await prisma.user.updateMany({
          where: { stripeSubscriptionId: subscription.id },
          data: {
            plan: 'FREE',
            stripeSubscriptionId: null,
          },
        });

        break;
      }
    }

    return new Response('OK', { status: 200 });
  } catch (error) {
    console.error('Webhook error:', error);
    return new Response('Internal server error', { status: 500 });
  }
}
