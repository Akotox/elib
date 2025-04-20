"use server";

import PurchaseConfirmationEmail from "@/emails/PurchaceConfirmation";
import { Resend } from "resend";


type EmailParams = {
  customerEmail: string;
  firstName: string;
  downloadUrl: string;
};

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendConfirmationEmail({
  customerEmail,
  firstName,
  downloadUrl,
}: EmailParams) {
  try {
    console.log('====================================');
    console.log(
        "Sending confirmation email to:",
        customerEmail,
        "with download URL:",
        downloadUrl
    );
    console.log('====================================');

    const response = await resend.emails.send({
      from: "Horizon Developers <no-reply@horizonapps.cloud>",
      to: [customerEmail],
      subject: "Your e-book purchase is confirmed",
      react: PurchaseConfirmationEmail({ firstName, downloadUrl }),
    });

    console.log('====================================');
    console.log("Email sent successfully:", response);
    console.log('====================================');

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