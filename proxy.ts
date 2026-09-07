import { clerkMiddleware } from "@clerk/nextjs/server"

function publicAuthPaths() {
  return [
    process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL,
    process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL,
  ]
    .filter((value): value is string => Boolean(value))
    .map((value) => {
      if (value.startsWith("http://") || value.startsWith("https://")) {
        return new URL(value).pathname
      }
      return value
    })
    .map((value) => (value.length > 1 && value.endsWith("/") ? value.slice(0, -1) : value))
}

function isPublicAuthPath(pathname: string) {
  return publicAuthPaths().some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  )
}

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicAuthPath(req.nextUrl.pathname)) {
    await auth.protect()
  }
})

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
    "/__clerk/(.*)",
  ],
}
