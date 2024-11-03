/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
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
    ],
  },
};

export default nextConfig;
