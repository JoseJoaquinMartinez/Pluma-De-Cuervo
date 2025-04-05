import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";
import Providers from "../../providers/Providers";
import CookieBanner from "@/components/shared/CookieBanner";

const onest = localFont({
  src: "../../public/fonts/Onest-VariableFont_wght.ttf",
  variable: "--font-onest",
});

export const metadata: Metadata = {
  title: "Pluma de Cuervo | Obras de Gabriel P.",
  description:
    "Pluma de Cuervo es el lugar perfecto para disfrutar de las obras literarias de Gabriel P.",
  openGraph: {
    title: "Pluma de Cuervo",
    description:
      "Explora las obras literarias de Gabriel P. en Pluma de Cuervo.",
    url: "https://www.plumadecuervo.com/",
    siteName: "Pluma de Cuervo",
    images: [
      {
        url: "https://res.cloudinary.com/dk9juz4fp/image/upload/v1739611427/Pluma%20de%20Cuervo/igvlg1cr6ntol97a2ct5.jpg",
        width: 1200,
        height: 630,
        alt: "Portada de Pluma de Cuervo",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pluma de Cuervo",
    description:
      "Explora las obras literarias de Gabriel P. en Pluma de Cuervo.",
    images: [
      "https://res.cloudinary.com/dk9juz4fp/image/upload/v1739611427/Pluma%20de%20Cuervo/igvlg1cr6ntol97a2ct5.jpg",
    ],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  keywords: [
    "Pluma de Cuervo",
    "Gabriel P.",
    "Literatura",
    "Escritor",
    "Obras literarias",
    "Libros",
    "LitRPG",
    "Fantasía",
    "Ciencia ficción",
    "RPGLit",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${onest.variable} antialiased bg-background flex flex-col min-h-screen min-w-screen`}
      >
        <Providers>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
          <CookieBanner />
        </Providers>
      </body>
    </html>
  );
}
