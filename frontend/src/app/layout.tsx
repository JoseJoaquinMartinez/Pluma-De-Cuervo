import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";
import Providers from "../../providers/Providers";

const onest = localFont({
  src: "../../public/fonts/Onest-VariableFont_wght.ttf",
  variable: "--font-önest",
});

export const metadata: Metadata = {
  title: "Pluma de cuervo",
  description:
    "Pluma de Cuervo el lugar perfecto para disfrutar de las obras de Gabriel P.",
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
        </Providers>
      </body>
    </html>
  );
}
