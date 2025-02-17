/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      // Excluye las rutas /api/auth/* para que sean manejadas localmente
      {
        source: "/api/auth/:path*",
        destination: "/api/auth/:path*", // Mantén estas rutas locales
      },
      // Redirige otras rutas /api/* al backend externo, ajustando la ruta
      {
        source: "/api/:path*",
        destination: process.env.NEXT_PUBLIC_BACKEND_URL
          ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/:path*`
          : "http://localhost:3000/:path*",
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "circulodigital.com.mx",
      },
      {
        protocol: "https",
        hostname: "imgur.com",
      },
      {
        protocol: "https",
        hostname: "imgv3.fotor.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "image.ondacero.es",
      },
      {
        protocol: "https",
        hostname: "img.freepik.com",
      },
      {
        protocol: "https",
        hostname: "png.pngtree.com",
      },
      {
        protocol: "https",
        hostname: "www.pixartprinting.es",
      },
      {
        protocol: "https",
        hostname: "www.educaciontrespuntocero.com",
      },
      {
        protocol: "https",
        hostname: "media.es.wired.com",
      },
      {
        protocol: "https",
        hostname: "img.freepik.com",
      },
      { protocol: "https", hostname: "th.bing.com" },
      { protocol: "https", hostname: "1819.es" },
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },
};

export default nextConfig;
