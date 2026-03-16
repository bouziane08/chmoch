//apps/web/src/app/(marketing)/page.tsx
"use client";

import dynamic from "next/dynamic";

const Hero = dynamic(
  () => import("@/components/landing/Hero").then((mod) => mod.Hero),
  {
    ssr: false,
    loading: () => <div className="bg-background min-h-[80vh]" />,
  },
);

const Stats = dynamic(
  () => import("@/components/landing/Stats").then((mod) => mod.Stats),
  { ssr: false },
);
const Features = dynamic(
  () => import("@/components/landing/Features").then((mod) => mod.Features),
  { ssr: false },
);
const HowItWorks = dynamic(
  () => import("@/components/landing/HowItWorks").then((mod) => mod.HowItWorks),
  { ssr: false },
);
const Pricing = dynamic(
  () => import("@/components/landing/Pricing").then((mod) => mod.Pricing),
  { ssr: false },
);
const FAQ = dynamic(
  () => import("@/components/landing/FAQ").then((mod) => mod.FAQ),
  { ssr: false },
);
const CTA = dynamic(
  () => import("@/components/landing/CTA").then((mod) => mod.CTA),
  { ssr: false },
);

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <Hero />
      <Stats />
      <Features />
      <HowItWorks />
      <Pricing />
      <FAQ />
      <CTA />
    </div>
  );
}
