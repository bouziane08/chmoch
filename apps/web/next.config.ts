import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* ✅ قمنا بحذف جميع الخصائص التي تسبب تعارض مع TypeScript.
     Next.js 16 ذكي بما يكفي للتعامل مع الـ Monorepo تلقائياً.
  */

  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  // إذا كنت تستخدم أي مكتبات خارجية تحتاج transpile
  transpilePackages: ["@workspace/ui"],
};

export default nextConfig;
