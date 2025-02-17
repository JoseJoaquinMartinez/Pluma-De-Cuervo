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
  console.log("Middleware invoked for path:", req.nextUrl.pathname);
  console.log("Token found:", token);

  try {
    if (token && loggedInRoutes.includes(req.nextUrl.pathname)) {
      console.log("Ruta de login/singup detectada, redirigiendo a /");
      return NextResponse.redirect(new URL("/", req.nextUrl.origin));
    }

    if (adminLoggedInRoutes.test(req.nextUrl.pathname)) {
      console.log("Ruta de admin detectada:", req.nextUrl.pathname);
      if (!token) {
        console.log("No se encontró token para ruta de admin");
        return NextResponse.redirect(new URL("/", req.nextUrl.origin));
      }

      const secret = new TextEncoder().encode(JWT_SECRET);
      const { payload } = await jwtVerify(token, secret);
      console.log("Payload del token admin:", payload);

      if (payload.role !== "admin") {
        console.log(
          "Rol incorrecto en token. Se esperaba 'admin' pero se recibió:",
          payload.role
        );
        return NextResponse.redirect(new URL("/", req.nextUrl.origin));
      }
    }

    if (regularUserRoutes.includes(req.nextUrl.pathname)) {
      console.log("Ruta de usuario regular detectada:", req.nextUrl.pathname);
      if (!token) {
        console.log("No se encontró token para ruta de usuario regular");
        return NextResponse.redirect(new URL("/", req.nextUrl.origin));
      }

      const secret = new TextEncoder().encode(JWT_SECRET);
      const { payload } = await jwtVerify(token, secret);
      console.log("Payload del token usuario regular:", payload);

      if (payload.role !== "user") {
        console.log(
          "Rol incorrecto en token. Se esperaba 'user' pero se recibió:",
          payload.role
        );
        return NextResponse.redirect(new URL("/", req.nextUrl.origin));
      }
    }

    console.log("Acceso permitido para:", req.nextUrl.pathname);
    return NextResponse.next();
  } catch (error) {
    console.error("Error en middleware:", error);
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export const config = {
  matcher: ["/admin/:path*", "/auth/:path*", "/comentarios"],
};
