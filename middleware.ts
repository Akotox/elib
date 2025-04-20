// import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"

// const isPublicRoute = createRouteMatcher([
//   "/",
//   "/sign-in(.*)",
//   "/sign-up(.*)",
//   "/products(.*)",
// ])

// export default clerkMiddleware(async (auth, req) => {
//   if (!isPublicRoute(req)) {
//     const { userId, redirectToSignIn } = await auth();
//     if (!userId) return redirectToSignIn({ returnBackUrl: req.url });
//   }
// });

// export const config = {
//   matcher: [
//     // Skip Next.js internals and all static files, unless found in search params
//     "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
//     // Always run for API routes
//     "/(api|trpc)(.*)",
//   ],
// }

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define public routes that don't require authentication
const PUBLIC_ROUTES = [
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/products(.*)",
];

// Define API routes to ignore from auth (e.g., webhooks)
const IGNORED_API_ROUTES = [
  "/api/edgestore/init",
  "/api/webhook",
  "/api/webhooks",
];

const isPublicRoute = createRouteMatcher(PUBLIC_ROUTES);

export default clerkMiddleware(async (auth, req) => {
  const pathname = req.nextUrl.pathname;

  // Allow all public routes
  if (isPublicRoute(req)) return;

  // Skip Clerk auth for specific ignored API routes (e.g., Stripe webhooks)
  if (IGNORED_API_ROUTES.some(route => pathname.startsWith(route))) return;

  // Require auth for all other routes
  const { userId, redirectToSignIn } = await auth();
  if (!userId) return redirectToSignIn({ returnBackUrl: req.url });
});

export const config = {
  matcher: [
    // Run middleware for everything except static files and Next.js internals
    "/((?!_next|.*\\.(?:jpg|jpeg|png|svg|gif|ico|css|js|json|txt|woff2?|ttf|map|webmanifest|zip)).*)",

    // Always run for API and TRPC routes
    "/(api|trpc)(.*)",
  ],
};