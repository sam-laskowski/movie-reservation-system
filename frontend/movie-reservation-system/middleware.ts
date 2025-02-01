import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./lib/session";

const protectedRoutes = ["/dashboard"];
const publicRoutes = ["/login", "register", "/"];

export default async function middleware(req: NextRequest) {
  // check if current route is protected or public
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  // decrypt the session from the cookie
  const cookie = (await cookies()).get("session")?.value;
  //console.log("cookie: ", cookie);
  const session = await decrypt(cookie);
  console.log("session role: ", session?.role);

  //  redirect to / if the user is not admin
  if (isProtectedRoute && session?.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  // id user is an admin they can access /dashboard

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
