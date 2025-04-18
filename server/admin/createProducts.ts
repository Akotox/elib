"use server";

import db from "@/db/db";


export async function createProducts() {
  await db.order.createMany({
    data: [
      {
        pricePaidInCents: 1000,
        userId: "user_2vshsYJwQXYBM5JZoTJt9hlIOny",
        email: "akotoxmpimbo@gmail.com",
        productId: "1",
        status: "PENDING"
      },
      {
        pricePaidInCents: 1200,
        userId: "user_2vshsYJwQXYBM5JZoTJt9hlIOny",
        email: "akotoxmpimbo@gmail.com",
        productId: "2",
        status: "DELIVERED"
      },
      {
        "pricePaidInCents": 900,
        "userId": "user_2vshsYJwQXYBM5JZoTJt9hlIOny",
        "email": "akotoxmpimbo@gmail.com",
        "productId": "3",
        "status": "FAILED",
      
      },
      {
        "id": "a4",
        "pricePaidInCents": 1100,
        "userId": "user_2vshsYJwQXYBM5JZoTJt9hlIOny",
        "email": "akotoxmpimbo@gmail.com",
        "productId": "4",
        "status": "PENDING",
      
      },
      {
        "pricePaidInCents": 950,
        "userId": "user_2vshsYJwQXYBM5JZoTJt9hlIOny",
        "email": "akotoxmpimbo@gmail.com",
        "productId": "5",
        "status": "DELIVERED",
      
      },
      {
        "pricePaidInCents": 1050,
        "userId": "user_2vshsYJwQXYBM5JZoTJt9hlIOny",
        "email": "akotoxmpimbo@gmail.com",
        "productId": "6",
        "status": "FAILED",
      
      },
      {
        "pricePaidInCents": 1150,
        "userId": "user_2vshsYJwQXYBM5JZoTJt9hlIOny",
        "email": "akotoxmpimbo@gmail.com",
        "productId": "7",
        "status": "PENDING",
      
      },
      {
        "pricePaidInCents": 990,
        "userId": "user_2vshsYJwQXYBM5JZoTJt9hlIOny",
        "email": "akotoxmpimbo@gmail.com",
        "productId": "8",
        "status": "DELIVERED",
      
      },
      {
        "pricePaidInCents": 1010,
        "userId": "user_2vshsYJwQXYBM5JZoTJt9hlIOny",
        "email": "akotoxmpimbo@gmail.com",
        "productId": "9",
        "status": "FAILED",
      
      },
      {
        "pricePaidInCents": 1080,
        "userId": "user_2vshsYJwQXYBM5JZoTJt9hlIOny",
        "email": "akotoxmpimbo@gmail.com",
        "productId": "10",
        "status": "PENDING",
      
      }
    ]
  });
}