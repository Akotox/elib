"use client";

import { Button } from "@/components/ui/button";
import { OrderWithProduct } from "@/server/client/getUserOrser";
import { sendConfirmationEmail } from "@/server/client/sendLink";

export default function OrderActions({ order }: { order: OrderWithProduct }) {
  const handleSend = async () => {
    
    await sendConfirmationEmail({
      customerEmail: order.email,
      firstName: "BookWorm",
      downloadUrl: order.product.filePath,
    });
  };

  return (
    <Button
      onClick={handleSend}
      variant="outline"
      className="rounded-2xl ml-1 tracking-normal bg-blue-500 hover:bg-blue-600 transition-transform group-hover:translate-x-0.5 text-white"
    >
      <span className="text-white">Send Link</span>
    </Button>
  );
}