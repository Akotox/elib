import Stripe from "stripe";
import { NextResponse, NextRequest } from "next/server";
import db from "@/db/db";
import { OrderStatus } from "@prisma/client";
import { clerkClient, currentUser } from "@clerk/nextjs/server";
// import { Resend } from "resend";

export async function POST(req: NextRequest) {
  console.log("👉 Webhook endpoint hit"); // 👈 This is your key log

  const payload = await req.text();
  const sig = req.headers.get("Stripe-Signature");
  console.log('====================================');
  console.log('Payload:', payload);
  console.log('====================================');

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  
  try {
    const event = stripe.webhooks.constructEvent(
      payload,
      sig!,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );

    console.log(`✅ Received Stripe event: ${event.type}`);

    await processWebhookEvent(event)

    return NextResponse.json({ status: "success", event: event.type });
  } catch (error) {
    console.error("❌ Webhook signature verification failed:", error);
    return new NextResponse("Invalid signature", { status: 400 });
  }
}

// Process webhook events asynchronously
async function processWebhookEvent(event: Stripe.Event) {
  switch (event.type) {
    case "checkout.session.completed":
      await handleCheckoutSessionCompleted(event);
      break;

    case "payment_intent.succeeded":
      await handlePaymentIntentSucceeded(event);
      break;


    case "invoice.paid":
      await handleInvoicePaid(event);
      break;

    case "invoice.finalized":
      await handleInvoiceFinalized(event);
      break;

    // Add more cases for other event types as needed
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }
}

// Example Handlers

async function handleCheckoutSessionCompleted(event: Stripe.Event) {
  const session = event.data.object as Stripe.Checkout.Session;

  const metadata = session.metadata ?? {};
  const { user_id, product_id, price_id } = metadata;
  try {

    console.log("====================================");
    console.log("✅ Checkout session completed:", session.id);
    console.log("🧾 Metadata:", metadata);
    console.log("🔑 user_id:", user_id);
    console.log("📦 product_id:", product_id);
    console.log("💲 price_id:", price_id);
    console.log("====================================");
    
    const product = await db.product.findFirst({
      where: {
        id: product_id,
      },
    })

    const user = await currentUser()

    if (!user) {
      console.log('====================================');
      console.log('User not found');
      console.log('====================================');
    }

    

    if (product) {
      await db.order.create({
        data: {
          userId: user_id,
          productId: product_id,
          pricePaidInCents: product.priceInCents,
          status: OrderStatus.DELIVERED,
          email: user?.emailAddresses[0].emailAddress!,
        }
      })
  
    }

   
    // const resend = new Resend(process.env.RESEND_API_KEY);
    //     await resend.emails.send({
    //         from: "StudyBuddy <no-reply@studybuddy.ing>",
    //         to: [`${invoice.customer_email}`],
    //         subject: "StudyBuddy subscription has been successfully activated",
    //         react: StudyBuddySubscriptionEmail({
    //           firstName: user.name,
    //           subscriptionPlan: plan,
    //           invoiceLink: invoice.hosted_invoice_url as string,
    //           pricePaid: invoice.amount_paid,
    //           locale: user.locale as "en" | "es" | "vi",
    //           lessonCount: Number(session.metadata!.lesson_count!),
    //           teacherName: teacherName as string,
    //         }),
    //       });
  } catch (error) {
    
  }
}



async function handleInvoicePaid(event: Stripe.Event) {
  const invoice = event.data.object as Stripe.Invoice;

  try {
   console.log('====================================');
   console.log('Invoice paid:', invoice.id);
   console.log('====================================');
  } catch (error) {
    console.error("Error handling invoice payment:", error);
  }
}


async function handlePaymentIntentSucceeded(event: Stripe.Event) {
  const paymentIntent = event.data.object as Stripe.PaymentIntent;

  try {
    // Process successful payment intent
    console.log(`PaymentIntent succeeded: ${paymentIntent.id}`);
  } catch (error) {
    console.error("Error handling payment intent success:", error);
  }
}

async function handleInvoiceFinalized(event: Stripe.Event) {
  const invoice = event.data.object as Stripe.Invoice;
  
  try {
    console.log('====================================');
    console.log('Invoice finalized:', invoice);
    console.log('====================================');
  } catch (error) {
    console.error("Error handling payment intent success:", error);
  }
}
