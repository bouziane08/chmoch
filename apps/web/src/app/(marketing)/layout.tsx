//apps/web/src/app/%28marketing%29/layout.tsx
"use client";

import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { motion, AnimatePresence } from "framer-motion";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="from-background via-background to-background/95 relative min-h-screen bg-gradient-to-b">
      {/* Background Pattern */}
      <div className="bg-grid-black/[0.02] dark:bg-grid-white/[0.02] absolute inset-0" />
      <div className="from-background absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        <AnimatePresence mode="wait">
          <motion.main
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            {children}
          </motion.main>
        </AnimatePresence>
        <Footer />
      </div>
    </div>
  );
}
