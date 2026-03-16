"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Mail, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

export function CTA() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast.success("تم الاشتراك في النشرة البريدية بنجاح!");
    setEmail("");
    setIsLoading(false);
  };

  return (
    <section id="contact" className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="from-primary to-primary/80 relative overflow-hidden rounded-3xl bg-gradient-to-r p-12"
        >
          {/* Background Pattern */}
          <div className="bg-grid-white/10 absolute inset-0" />

          {/* Content */}
          <div className="relative z-10 text-center text-white">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm"
            >
              <Sparkles className="h-4 w-4" />
              <span>ابدأ رحلتك معنا اليوم</span>
            </motion.div>

            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              جاهز لتطوير مشروعك؟
            </h2>

            <p className="mx-auto mb-8 max-w-2xl text-xl text-white/90">
              انضم إلى آلاف الشركات التي تثق بنا في إدارة هوية مستخدميها
              وصلاحياتهم
            </p>

            <div className="mb-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" variant="secondary" className="group" asChild>
                <Link href="/register">
                  ابدأ مجاناً
                  <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white bg-transparent text-white hover:bg-white/20"
                asChild
              >
                <Link href="/contact">تواصل مع المبيعات</Link>
              </Button>
            </div>

            {/* Newsletter Form */}
            <form onSubmit={handleSubmit} className="mx-auto max-w-md">
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="أدخل بريدك الإلكتروني"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-white/20 bg-white/10 text-white placeholder:text-white/60"
                  required
                />
                <Button type="submit" variant="secondary" disabled={isLoading}>
                  {isLoading ? (
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  ) : (
                    <Mail className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <p className="mt-2 text-xs text-white/60">
                سنرسل لك آخر الأخبار والعروض الحصرية
              </p>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
