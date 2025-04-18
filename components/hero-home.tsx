import Image from "next/image";
import PageIllustration from "@/components/page-illustration";
import Avatar01 from "@/public/images/avatar-01.jpg";
import Avatar02 from "@/public/images/avatar-02.jpg";
import Avatar03 from "@/public/images/avatar-03.jpg";
import Avatar04 from "@/public/images/avatar-04.jpg";
import Avatar05 from "@/public/images/avatar-05.jpg";
import Avatar06 from "@/public/images/avatar-06.jpg";
import {ProductCard, ProductCardSkeleton} from "./ProductCard";
import { Product } from "@prisma/client";
import db from "@/db/db";
import {cache, Suspense} from "react";
import { Button } from "./ui/button";
import {ArrowRight} from "lucide-react";
import Link from "next/link";


const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Digital Art Pack Vol. 1',
    priceInCents: 1999,
    filePath: 'https://cdn.pixabay.com/photo/2015/11/19/21/10/glasses-1052010_640.jpg',
    imagePath: 'https://cdn.pixabay.com/photo/2015/11/19/21/10/glasses-1052010_640.jpg',
    description: 'A premium collection of high-res digital artworks.',
    isAvailableForPurchase: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    name: 'E-book: Learn JavaScript',
    priceInCents: 1499,
    filePath: 'https://cdn.pixabay.com/photo/2015/11/19/21/10/glasses-1052010_640.jpg',
    imagePath: 'https://cdn.pixabay.com/photo/2015/11/19/21/10/glasses-1052010_640.jpg',
    description: 'A complete guide to mastering JavaScript in 30 days.',
    isAvailableForPurchase: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    name: 'Music Loops Vol. 2',
    priceInCents: 1299,
    filePath: 'https://cdn.pixabay.com/photo/2015/11/19/21/10/glasses-1052010_640.jpg',
    imagePath: 'https://cdn.pixabay.com/photo/2015/11/19/21/10/glasses-1052010_640.jpg',
    description: 'Royalty-free music loops for your next project.',
    isAvailableForPurchase: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '4',
    name: 'Mobile UI Kit',
    priceInCents: 2499,
    filePath: 'https://cdn.pixabay.com/photo/2015/11/19/21/10/glasses-1052010_640.jpg',
    imagePath: 'https://cdn.pixabay.com/photo/2015/11/19/21/10/glasses-1052010_640.jpg',
    description: 'A mobile-first UI kit with hundreds of components.',
    isAvailableForPurchase: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '5',
    name: 'Video LUTs Pack',
    priceInCents: 999,
    filePath: 'https://cdn.pixabay.com/photo/2015/11/19/21/10/glasses-1052010_640.jpg',
    imagePath: 'https://cdn.pixabay.com/photo/2015/11/19/21/10/glasses-1052010_640.jpg',
    description: 'Color grading LUTs for cinematic video editing.',
    isAvailableForPurchase: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '6',
    name: 'Resume Template Bundle',
    priceInCents: 799,
    filePath: 'https://cdn.pixabay.com/photo/2015/11/19/21/10/glasses-1052010_640.jpg',
    imagePath: 'https://cdn.pixabay.com/photo/2015/11/19/21/10/glasses-1052010_640.jpg',
    description: 'Stand out with these professionally designed resumes.',
    isAvailableForPurchase: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '7',
    name: 'Coding Fonts Pack',
    priceInCents: 499,
    filePath: 'https://cdn.pixabay.com/photo/2015/11/19/21/10/glasses-1052010_640.jpg',
    imagePath: 'https://cdn.pixabay.com/photo/2015/11/19/21/10/glasses-1052010_640.jpg',
    description: 'A curated pack of fonts optimized for developers.',
    isAvailableForPurchase: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '8',
    name: 'iOS App Icon Set',
    priceInCents: 1299,
    filePath: 'https://cdn.pixabay.com/photo/2015/11/19/21/10/glasses-1052010_640.jpg',
    imagePath: 'https://cdn.pixabay.com/photo/2015/11/19/21/10/glasses-1052010_640.jpg',
    description: 'A complete app icon set tailored for iOS apps.',
    isAvailableForPurchase: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '9',
    name: 'Notion Productivity Templates',
    priceInCents: 599,
    filePath: 'https://cdn.pixabay.com/photo/2015/11/19/21/10/glasses-1052010_640.jpg',
    imagePath: 'https://cdn.pixabay.com/photo/2015/11/19/21/10/glasses-1052010_640.jpg',
    description: 'Boost your workflow with these Notion templates.',
    isAvailableForPurchase: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '10',
    name: 'AI Prompt Library',
    priceInCents: 899,
    filePath: 'https://cdn.pixabay.com/photo/2015/11/19/21/10/glasses-1052010_640.jpg',
    imagePath: 'https://cdn.pixabay.com/photo/2015/11/19/21/10/glasses-1052010_640.jpg',
    description: 'Hundreds of prompts to supercharge your AI outputs.',
    isAvailableForPurchase: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

const getMostPopularProducts = cache(
    () => {
      return db.product.findMany({
        where: { isAvailableForPurchase: true },
        orderBy: { orders: { _count: "desc" } },
        take: 6,
      })
    },
    // ["/", "getMostPopularProducts"],
    // { revalidate: 60 * 60 * 24 }
)

const getNewestProducts = cache(() => {
  return db.product.findMany({
    where: { isAvailableForPurchase: true },
    orderBy: { createdAt: "desc" },
    take: 6,
  })
},
    // ["/", "getNewestProducts"]
)

export default function HeroHome() {
  return (
    <section className="relative">
      <PageIllustration />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Hero content */}
        <div className="pb-12 pt-32 md:pb-20 md:pt-40">
          {/* Section header */}
          <div className="pb-12 text-center md:pb-16">
            <div
              className="mb-6 border-y [border-image:linear-gradient(to_right,transparent,--theme(--color-slate-300/.8),transparent)1]"
              data-aos="zoom-y-out"
            >
              <div className="-mx-0.5 flex justify-center -space-x-3">
                <Image
                  className="box-content rounded-full border-2 border-gray-50"
                  src={Avatar01}
                  width={32}
                  height={32}
                  alt="Avatar 01"
                />
                <Image
                  className="box-content rounded-full border-2 border-gray-50"
                  src={Avatar02}
                  width={32}
                  height={32}
                  alt="Avatar 01"
                />
                <Image
                  className="box-content rounded-full border-2 border-gray-50"
                  src={Avatar03}
                  width={32}
                  height={32}
                  alt="Avatar 02"
                />
                <Image
                  className="box-content rounded-full border-2 border-gray-50"
                  src={Avatar04}
                  width={32}
                  height={32}
                  alt="Avatar 03"
                />
                <Image
                  className="box-content rounded-full border-2 border-gray-50"
                  src={Avatar05}
                  width={32}
                  height={32}
                  alt="Avatar 04"
                />
                <Image
                  className="box-content rounded-full border-2 border-gray-50"
                  src={Avatar06}
                  width={32}
                  height={32}
                  alt="Avatar 05"
                />
              </div>
            </div>
            <h1
              className="mb-6 border-y text-5xl font-bold [border-image:linear-gradient(to_right,transparent,--theme(--color-slate-300/.8),transparent)1] md:text-6xl"
              data-aos="zoom-y-out"
              data-aos-delay={150}
            >
              The e-library store you’ve been  <br className="max-lg:hidden" />
              waiting for
            </h1>
            <div className="mx-auto max-w-3xl">
              <p
                className="mb-8 text-lg text-gray-700"
                data-aos="zoom-y-out"
                data-aos-delay={300}
              >
                E-lib is a powerful and intuitive platform designed to help authors and creators effortlessly publish, manage, and sell their eBooks online. From professional layouts to seamless transactions, E-lib makes digital publishing easier and more accessible than ever.
              </p>
              <div className="relative before:absolute before:inset-0 before:border-y before:[border-image:linear-gradient(to_right,transparent,--theme(--color-slate-300/.8),transparent)1]">
                <div
                  className="mx-auto max-w-xs sm:flex sm:max-w-none sm:justify-center"
                  data-aos="zoom-y-out"
                  data-aos-delay={450}
                >
                  <a
                    className="btn group mb-4 w-full bg-linear-to-t from-blue-600 to-blue-500 bg-[length:100%_100%] bg-[bottom] text-white shadow-sm hover:bg-[length:100%_150%] sm:mb-0 sm:w-auto"
                    href="/products"
                  >
                    <span className="relative inline-flex items-center">
                      Browser Books{" "}
                      <span className="ml-1 tracking-normal text-blue-300 transition-transform group-hover:translate-x-0.5">
                        -&gt;
                      </span>
                    </span>
                  </a>
                  <a
                    className="btn w-full bg-white text-gray-800 shadow-sm hover:bg-gray-50 sm:ml-4 sm:w-auto"
                    href="#0"
                  >
                    Request e-book
                  </a>
                </div>
              </div>
            </div>
          </div>

          <ProductGridSection
              title="Most Popular"
              productsFetcher={getMostPopularProducts}
          />
          <div className="h-10"/>
          <ProductGridSection title="Newest" productsFetcher={getNewestProducts} />
        </div>
      </div>
    </section>
  );
}

type ProductGridSectionProps = {
  title: string
  productsFetcher: () => Promise<Product[]>
}

function ProductGridSection({
                              productsFetcher,
                              title,
                            }: ProductGridSectionProps) {
  return (
      <div className="space-y-4">
        <div className="flex gap-4 flex-row justify-between">
          <h2 className="text-3xl font-bold">{title}</h2>
          c

        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Suspense
              fallback={
                <>
                  <ProductCardSkeleton/>
                  <ProductCardSkeleton/>
                  <ProductCardSkeleton/>
                </>
              }
          >
            <ProductSuspense productsFetcher={productsFetcher}/>
          </Suspense>
        </div>
      </div>
  )
}

async function ProductSuspense({
                                 productsFetcher,
                               }: {
  productsFetcher: () => Promise<Product[]>
}) {
  return (await productsFetcher()).map(product => (
      <ProductCard key={product.id} {...product} />
  ))
}
