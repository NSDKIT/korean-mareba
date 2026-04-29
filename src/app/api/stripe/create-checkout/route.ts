import { stripe, PRICE_IDS } from '@/lib/stripe/client';
import { getUser } from '@/lib/supabase/server';
import { checkEnvGroup, createEnvErrorResponse } from '@/lib/env';

export async function POST(req: Request) {
  // 環境変数チェック
  const envCheck = checkEnvGroup('stripe');
  if (!envCheck.isValid) {
    return createEnvErrorResponse('Stripe Checkout', envCheck.missing);
  }

  try {
    const user = await getUser();
    if (!user) {
      return new Response('Unauthorized', { status: 401 });
    }

    const { priceKey } = await req.json();

    if (!priceKey || !(priceKey in PRICE_IDS)) {
      return new Response('Invalid price key', { status: 400 });
    }

    const priceId = PRICE_IDS[priceKey as keyof typeof PRICE_IDS];

    const session = await stripe.checkout.sessions.create({
      customer_email: user.email,
      mode: 'subscription',
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/settings?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/settings?canceled=true`,
      metadata: {
        userId: user.id,
      },
    });

    return Response.json({ url: session.url });
  } catch (error) {
    console.error('Create checkout error:', error);
    return new Response('Internal server error', { status: 500 });
  }
}
