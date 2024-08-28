import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("accessToken");

  const userRoutes = ["/account", "/myactivities", "/reservations", "/reservation-status"];
  const userAuthRoutes = ["/signin", "/signup"];

  if (!accessToken && userRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  if (accessToken && userAuthRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};
