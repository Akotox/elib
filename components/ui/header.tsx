import Link from "next/link";
import Logo from "./logo";
import { Button } from "./button";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";



export default function Header() {
  const { isSignedIn, user, isLoaded } = useUser();
  
  const adminList = [
    process.env.NEXT_PUBLIC_ADMIN1,
    process.env.NEXT_PUBLIC_ADMIN2,
    process.env.NEXT_PUBLIC_ADMIN3,
    process.env.NEXT_PUBLIC_ADMIN4,
  ];


  return (
    <header className="fixed top-2 z-30 w-full md:top-6">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative flex h-14 items-center justify-between gap-3 rounded-2xl bg-white/90 px-3 shadow-lg shadow-black/[0.03] backdrop-blur-xs before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(var(--color-gray-100),var(--color-gray-200))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)]">
          {/* Site branding */}
          <div className="flex flex-1 items-center">
            <Logo />
          </div>

          {/* Desktop sign in links */}
          <ul className="flex flex-1 items-center justify-end gap-3">
            <li>
              <Link
                href="/products"
                className="btn-sm bg-white text-gray-800 shadow-sm hover:bg-gray-50"
              >
                Library
              </Link>
            </li>
            <li>
              <Link
                href="/history"
                className="btn-sm bg-white text-gray-800 shadow-sm hover:bg-gray-50"
              >
                History
              </Link>
            </li>
            {isLoaded && isSignedIn && adminList.includes(user.id) && (
              <li>
                <Link
                  href="/dashboard"
                  className="btn-sm bg-gray-800 text-white shadow-sm hover:bg-white hover:text-gray-800"
                >
                  Dashboard
                </Link>
              </li>
            )}

            <li>
              <SignedOut>
                <Button
                  asChild
                  className="btn-sm bg-gray-800 text-gray-200 shadow-sm hover:bg-gray-900"
                >
                  <SignInButton />
                </Button>
              </SignedOut>

              <SignedIn>
                <div className="mt-2">
                  <UserButton
                    appearance={{
                      elements: { userButtonAvatarBox: "size-full" },
                    }}
                  />
                </div>
              </SignedIn>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
