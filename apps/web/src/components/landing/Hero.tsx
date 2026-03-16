"use client";

import { useRef, useLayoutEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, Shield, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const COMPANY_NAME = "Enterprise";
const COMPANY_SLOGAN = "أمان ذكي لمؤسستك";

export function Hero() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // ✔️ useLayoutEffect يضمن أن ref مرتبط بالـ DOM
  useLayoutEffect(() => {
    // لا شيء هنا — فقط لضمان التوقيت
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);

  return (
    <div
      ref={containerRef}
      className="bg-background relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 -z-10">
        <div className="from-primary/5 absolute inset-0 bg-gradient-to-br via-transparent to-transparent" />
        <div className="[background-image:linear-gradient(to_right,#808080_1px,transparent_1px), linear-gradient(to_bottom,#808080_1px,transparent_1px)] absolute inset-0 opacity-[0.03] [background-size:24px_24px]" />
      </div>

      <motion.div
        style={{ y, opacity }}
        className="container mx-auto px-4 py-32 text-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-primary/10 text-primary border-primary/20 mb-8 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm"
        >
          <Sparkles className="h-4 w-4" />
          <span>أحدث نظام لإدارة الهوية والصلاحيات</span>
        </motion.div>

        <motion.h1 className="mb-6 text-5xl font-bold tracking-tight md:text-7xl">
          <span className="from-primary to-primary/60 bg-gradient-to-r bg-clip-text text-transparent">
            {COMPANY_NAME}
          </span>
          <br />
          <span className="text-foreground">{COMPANY_SLOGAN}</span>
        </motion.h1>

        <motion.p className="text-muted-foreground mx-auto mb-12 max-w-3xl text-xl leading-relaxed">
          نظام متكامل لإدارة المصادقة والصلاحيات مع أعلى معايير الأمان للمؤسسات.
        </motion.p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button size="lg" className="group" asChild>
            <Link href="/register">
              ابدأ مجاناً
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="#features">
              <Shield className="ml-2 h-4 w-4" />
              المميزات
            </Link>
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
