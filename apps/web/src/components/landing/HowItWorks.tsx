"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { howItWorks } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className="from-background to-muted/50 bg-gradient-to-b py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            كيف
            <span className="from-primary to-primary/60 mr-2 bg-gradient-to-r bg-clip-text text-transparent">
              يعمل
            </span>
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
            ابدأ في دقائق مع خطوات بسيطة ومباشرة
          </p>
        </motion.div>

        {/* Steps */}
        <div
          ref={ref}
          className="relative grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4"
        >
          {/* Connecting Line */}
          <div className="from-primary/0 via-primary to-primary/0 absolute left-0 right-0 top-1/2 hidden h-0.5 bg-gradient-to-r lg:block" />

          {howItWorks.map((step, index) => {
            const isEven = index % 2 === 0;
            const delay = index * 0.15;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay }}
                className={cn(
                  "relative flex flex-col items-center text-center",
                  isEven ? "lg:mt-8" : "lg:-mt-8",
                )}
              >
                {/* Step Number */}
                <div className="relative mb-6">
                  <div className="bg-primary/20 absolute inset-0 animate-ping rounded-full" />
                  <div className="from-primary to-primary/60 relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br text-xl font-bold text-white">
                    {step.step}
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <div className="mb-2 text-4xl">{step.icon}</div>
                  <h3 className="text-lg font-semibold">{step.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {step.description}
                  </p>
                </div>

                {/* Arrow for desktop */}
                {index < howItWorks.length - 1 && (
                  <div className="absolute -left-4 top-1/2 hidden -translate-y-1/2 lg:block">
                    <svg
                      className="text-primary/40 h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
