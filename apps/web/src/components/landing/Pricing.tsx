"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Check, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { pricingPlans } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Pricing() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section id="pricing" className="relative overflow-hidden py-24">
      <div className="from-background via-background to-muted/30 absolute inset-0 bg-gradient-to-b" />

      <div className="container relative z-10 mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <Badge variant="outline" className="mb-4">
            <Sparkles className="ml-2 h-4 w-4" />
            خطط مرنة تناسب الجميع
          </Badge>
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            اختر الخطة
            <span className="from-primary to-primary/60 mr-2 bg-gradient-to-r bg-clip-text text-transparent">
              المناسبة لك
            </span>
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
            خطط أسعار مرنة تبدأ من 0 ريال، مع إمكانية الترقية في أي وقت
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div
          ref={ref}
          className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {pricingPlans.map((plan, index) => {
            const delay = index * 0.1;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay }}
                whileHover={{ y: -10 }}
                className="relative"
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-0 right-0 flex justify-center">
                    <Badge className="from-primary to-primary/60 border-0 bg-gradient-to-r text-white">
                      الأكثر طلباً
                    </Badge>
                  </div>
                )}

                {/* Card */}
                <div
                  className={cn(
                    "bg-card h-full rounded-2xl border p-8 shadow-sm transition-all duration-300",
                    plan.popular && "border-primary scale-105 shadow-lg",
                  )}
                >
                  {/* Header */}
                  <div className="mb-8 text-center">
                    <h3 className="mb-2 text-2xl font-bold">{plan.name}</h3>
                    <p className="text-muted-foreground mb-4 text-sm">
                      {plan.description}
                    </p>
                    <div className="flex items-center justify-center gap-1">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground">
                        ريال/{plan.period}
                      </span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-8 space-y-4">
                    <p className="font-semibold">المميزات:</p>
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <Check className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                    {plan.limitations.map((limitation, i) => (
                      <div
                        key={i}
                        className="text-muted-foreground flex items-start gap-2"
                      >
                        <X className="text-muted-foreground mt-0.5 h-5 w-5 shrink-0" />
                        <span className="text-sm">{limitation}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Button
                    className={cn(
                      "w-full",
                      plan.popular &&
                        "from-primary to-primary/60 bg-gradient-to-r",
                    )}
                    variant={plan.popular ? "default" : "outline"}
                    asChild
                  >
                    <Link
                      href={plan.name === "المؤسسات" ? "/contact" : "/register"}
                    >
                      {plan.cta}
                    </Link>
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
