import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET no está definido en las variables de entorno");
}

const adminLoggedInRoutes = ["/admin/libros/libro/crear"];
const loggedInRoutes = [
  "/auth/login",
  "/auth/singup",
  "/auth/singup/email-validation",
];

export default function middleware(req: NextRequest) {
  const token = req.cookies.get("authToken")?.value;

  try {
    if (token && loggedInRoutes.includes(req.nextUrl.pathname)) {
      return NextResponse.redirect(new URL("/", req.nextUrl.origin));
    }

    if (!token && adminLoggedInRoutes.includes(req.nextUrl.pathname)) {
      return NextResponse.redirect(new URL("/", req.nextUrl.origin));
    }

    if (token) {
      const decoded = jwt.verify(token, JWT_SECRET as string) as {
        userId: string;
        role: string;
      };
      console.log(decoded);
      if (
        decoded.role !== "admin" &&
        adminLoggedInRoutes.includes(req.nextUrl.pathname)
      ) {
        return NextResponse.redirect(new URL("/", req.nextUrl.origin));
      }
    }
  } catch (error) {
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export const config = {
  matcher: ["/admin/:path*", "/auth/:path*"],
};
