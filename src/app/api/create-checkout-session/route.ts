import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-12-18.acacia',
});

export async function POST(req: NextRequest) {
  try {
    const { priceId, planName } = await req.json();

    // Cria uma sessão de checkout do Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${req.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}/?canceled=true`,
      metadata: {
        planName,
      },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error: any) {
    console.error('Erro ao criar sessão de checkout:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
