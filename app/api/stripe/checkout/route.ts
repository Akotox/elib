import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { getAuth, clerkClient, currentUser } from '@clerk/nextjs/server'

export type CheckOutRequest = {
  priceId: string;
  productId: string;
  email: string;
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: NextRequest) {

  const { userId } = getAuth(req)



  const {
    priceId,
    productId,
    email,
  }: CheckOutRequest = await req.json();

  try {
    const stripeSession = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_URL}/success?product_id=${productId}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/cancel`,
      metadata: {
        price_id: priceId,
        user_id: userId,
        product_id: productId,
        email: email,
      },
    });

    return NextResponse.json({ url: stripeSession.url });

  } catch (error: any) {
    return NextResponse.json(
      { error: "Error creating Stripe session" + error },
      { status: 500 },
    );
  }
}
