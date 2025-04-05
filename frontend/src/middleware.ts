import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET no está definido en las variables de entorno");
}

const adminLoggedInRoutes = /^\/admin/;
const loggedInRoutes = ["/auth/singup/email-validation"];
const regularUserRoutes = ["/comentarios"];

export default async function middleware(req: NextRequest) {
  const token = req.cookies.get("authToken")?.value;

  try {
    if (token && loggedInRoutes.includes(req.nextUrl.pathname)) {
      return NextResponse.redirect(new URL("/", req.nextUrl.origin));
    }

    if (adminLoggedInRoutes.test(req.nextUrl.pathname)) {
      if (!token) {
        return NextResponse.redirect(new URL("/", req.nextUrl.origin));
      }

      const secret = new TextEncoder().encode(JWT_SECRET);
      const { payload } = await jwtVerify(token, secret);

      if (payload.role !== "admin") {
        return NextResponse.redirect(new URL("/", req.nextUrl.origin));
      }
    }

    if (regularUserRoutes.includes(req.nextUrl.pathname)) {
      if (!token) {
        return NextResponse.redirect(new URL("/", req.nextUrl.origin));
      }

      const secret = new TextEncoder().encode(JWT_SECRET);
      const { payload } = await jwtVerify(token, secret);

      if (payload.role !== "user") {
        return NextResponse.redirect(new URL("/", req.nextUrl.origin));
      }
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Error en middleware:", error);
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export const config = {
  matcher: ["/admin/:path*", "/auth/:path*", "/comentarios"],
};
