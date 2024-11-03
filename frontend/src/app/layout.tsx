import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";

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
    <html lang="en">
      <body className={`${onest.variable} antialiased bg-background`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
