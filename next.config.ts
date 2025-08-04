const nextConfig = {
  images: {
    domains: [
      "res.cloudinary.com",
      "cdn.pixabay.com",
      "images.unsplash.com",
      "yourdomain.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // match semua host (⚠️ pastikan tahu risikonya)
      },
    ],
  },
};

export default nextConfig;
