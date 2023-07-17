import { NextResponse } from "next/server";

// https://stackoverflow.com/questions/67053080/how-to-hide-nextjs-api-routes-from-being-directly-accessible-through-url
export function middleware(req) {
  const url = req.nextUrl;
  const { pathname } = url;

  if (pathname.startsWith(`/api/`)) {
    console.log(
      `Middleware : sending an API request to ${pathname}. Referer : ${req.headers.get(
        "referer"
      )}`
    );

    if (!req.headers.get("referer")?.includes(process.env.NEXTAUTH_URL)) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|fonts|examples|svg|[\\w-]+\\.\\w+).*)"],
};
