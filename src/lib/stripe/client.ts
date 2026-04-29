import Stripe from 'stripe';

// 環境変数がない場合でもビルドできるようにする
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_dummy', {
  apiVersion: '2025-02-24.acacia',
});

export const PRICE_IDS = {
  STANDARD_MONTHLY: process.env.STRIPE_STANDARD_MONTHLY_PRICE_ID!,
  STANDARD_YEARLY: process.env.STRIPE_STANDARD_YEARLY_PRICE_ID!,
  PREMIUM_MONTHLY: process.env.STRIPE_PREMIUM_MONTHLY_PRICE_ID!,
  PREMIUM_YEARLY: process.env.STRIPE_PREMIUM_YEARLY_PRICE_ID!,
};
