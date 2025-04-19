import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Tailwind,
} from "@react-email/components"
import { OrderInformation } from "./components/OrderInformation"
import React from "react"

type OrderHistoryEmailProps = {
  order: {
    id: string
    pricePaidInCents: number
    createdAt: Date
    downloadVerificationId: string
    product: {
      name: string
      imagePath: string
      filePath: string
      description: string
    }
  }
}

// ✅ Adjust PreviewProps to pass a single order item
OrderHistoryEmail.PreviewProps = {
  order: {
    id: crypto.randomUUID(),
    createdAt: new Date(),
    pricePaidInCents: 10000,
    downloadVerificationId: crypto.randomUUID(),
    product: {
      name: "Product name",
      description: "Some description",
      "filePath": "https://cdn.pixabay.com/photo/2015/11/19/21/10/glasses-1052010_640.jpg",
      "imagePath": "https://cdn.pixabay.com/photo/2015/11/19/21/10/glasses-1052010_640.jpg",
    },
  },
} satisfies OrderHistoryEmailProps

export default function OrderHistoryEmail({ order }: OrderHistoryEmailProps) {
  return (
    <Html>
      <Preview>Order History & Downloads</Preview>
      <Tailwind>
        <Head />
        <Body className="font-sans bg-white">
          <Container className="max-w-xl">
            <Heading>Order History</Heading>
            <OrderInformation
              order={order}
              product={order.product}
              downloadVerificationId={order.product.filePath}
            />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}