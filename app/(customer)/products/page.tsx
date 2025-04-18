import { ProductCard, ProductCardSkeleton } from "@/components/ProductCard"
import db from "@/db/db"
import { cache } from "@/lib/cache"
import { Suspense } from "react"

const getProducts = cache(() => {
  return db.product.findMany({
    where: { isAvailableForPurchase: true },
    orderBy: { name: "asc" },
  })
}, ["/products", "getProducts"])

export default function ProductsPage() {
  return (
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="pb-12 pt-32 md:pb-20 md:pt-40">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Suspense
                      fallback={
                          <>
                              <ProductCardSkeleton/>
                              <ProductCardSkeleton/>
                              <ProductCardSkeleton/>
                              <ProductCardSkeleton/>
                              <ProductCardSkeleton/>
                              <ProductCardSkeleton/>
                          </>
                      }
                  >
                      <ProductsSuspense/>
                  </Suspense>
              </div>
          </div>
      </div>
  )
}

async function ProductsSuspense() {
    const products = await getProducts()

    return products.map(product => <ProductCard key={product.id} {...product} />)
}
