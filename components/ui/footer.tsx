import Link from "next/link";
import Logo from "./logo";
import { LinkItem } from "../link_item";
import Insta from "@/public/images/instagram.svg";
import Image from "next/image";
import Facebook from "@/public/images/facebook.svg";
import Twitter from "@/public/images/twitter.svg";


const productLinks = [
  { label: "E-books", href: "#0" },
  { label: "Bedtime stories", href: "#0" },
  { label: "Pricing & Plans", href: "#0" },
];

const companyLinks = [
  { label: "About us", href: "#0" },
  { label: "Blog", href: "#0" },
  { label: "Careers", href: "#0" },
  
];

const resourceLinks = [
  { label: "Community", href: "#0" },
  { label: "Terms of service", href: "#0" },
  { label: "Report a vulnerability", href: "#0" },
];

export default function Footer({ border = false }: { border?: boolean }) {
  return (
    <footer>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Top area: Blocks */}
        <div
          className={`grid gap-10 py-8 sm:grid-cols-12 md:py-12 ${border ? "border-t [border-image:linear-gradient(to_right,transparent,var(--color-slate-200),transparent)1]" : ""}`}
        >
          {/* 1st block */}
          <div className="space-y-2 sm:col-span-12 lg:col-span-4">
            <div>
              <Logo />
            </div>
            <div className="text-sm text-gray-600">
              &copy; Horizon Developers - All rights reserved.
            </div>
          </div>

          {/* 2nd block */}
          <div className="space-y-2 sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h3 className="text-sm font-medium">Product</h3>
            <ul className="space-y-2 text-sm">
              {productLinks.map((link) => (
                <LinkItem key={link.label} {...link} />
              ))}
            </ul>
          </div>

          {/* 3rd block */}
          <div className="space-y-2 sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h3 className="text-sm font-medium">Company</h3>
            <ul className="space-y-2 text-sm">
              {companyLinks.map((link) => (
                <LinkItem key={link.label} {...link} />
              ))}
            </ul>
          </div>
 

          {/* 4th block */}
          <div className="space-y-2 sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h3 className="text-sm font-medium">Resources</h3>
            <ul className="space-y-2 text-sm">
              {resourceLinks.map((link) => (
                <LinkItem key={link.label} {...link} />
              ))}
            </ul>
          </div>

          {/* 5th block */}
          <div className="space-y-2 sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h3 className="text-sm font-medium">Social</h3>
            <ul className="flex gap-1">
            <li>
                <Link href="/">
                  <Image src={Insta} alt="Instagram" width={32} height={32} />
                </Link>
              </li>
              <li>
                <Link href="/">
                  <Image src={Facebook} alt="Facebook" width={32} height={32} />
                </Link>
              </li>
              <li>
                <Link href="/">
                  <Image src={Twitter} alt="Twitter" width={32} height={32} />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Big text */}
      <div className="relative -mt-16 h-60 w-full" aria-hidden="true">
        <div className="pointer-events-none absolute left-1/2 -z-10 -translate-x-1/2 text-center text-[348px] font-bold leading-none before:bg-linear-to-b before:from-gray-200 before:to-gray-100/30 before:to-80% before:bg-clip-text before:text-transparent before:content-['Simple'] after:absolute after:inset-0 after:bg-gray-300/70 after:bg-clip-text after:text-transparent after:mix-blend-darken after:content-['Simple'] after:[text-shadow:0_1px_0_white]"></div>
        {/* Glow */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-2/3"
          aria-hidden="true"
        >
          <div className="h-56 w-56 rounded-full border-[20px] border-blue-700 blur-[80px]"></div>
        </div>
      </div>
    </footer>
  );
}
