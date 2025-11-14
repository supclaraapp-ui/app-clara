import { loadStripe } from '@stripe/stripe-js';

// Carrega o Stripe com a chave pública
export const getStripe = () => {
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''
  );
  return stripePromise;
};
