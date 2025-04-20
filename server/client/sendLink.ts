"use server";

import PurchaseConfirmationEmail from "@/emails/PurchaceConfirmation";
import RequestedDownloadEmail from "@/emails/RequestedLinkEmail";
import { Resend } from "resend";
import { OrderWithProduct } from "./getUserOrser";


type EmailParams = {
  customerEmail: string;
  order: OrderWithProduct;
};

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendConfirmationEmail({
  customerEmail,
  order
}: EmailParams) {
  try {

    const response = await resend.emails.send({
      from: "Horizon Developers <no-reply@horizonapps.cloud>",
      to: [customerEmail],
      subject: "Your e-book purchase is confirmed",
      react: RequestedDownloadEmail({order}),
    });


    return {
      success: true,
      response,
    };
  } catch (error) {
    console.error("Email sending failed:", error);
    return {
      success: false,
      error: (error as Error).message,
    };
  }
}