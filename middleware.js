import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

// https://stackoverflow.com/questions/67053080/how-to-hide-nextjs-api-routes-from-being-directly-accessible-through-url
// https://supabase.com/docs/guides/auth/auth-helpers/nextjs
export async function middleware(req) {
  const res = NextResponse.next();
  const url = req.nextUrl;
  const { pathname } = url;

  if (pathname.startsWith(`/api/`)) {
    console.log(
      `Middleware : sending an API request to ${pathname}. Referer : ${req.headers.get(
        "referer"
      )}`
    );

    if (!req.headers.get("referer")?.includes(process.env.SITE_URL)) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
  }

  const supabase = createMiddlewareClient({ req, res });
  await supabase.auth.getSession();

  return res;
}

export const config = {
  matcher: ["/((?!_next|fonts|examples|svg|[\\w-]+\\.\\w+).*)"],
};
