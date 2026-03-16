"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { features } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Features() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="features" className="relative overflow-hidden py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            مميزات
            <span className="from-primary to-primary/60 mr-2 bg-gradient-to-r bg-clip-text text-transparent">
              متقدمة
            </span>
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
            كل ما تحتاجه لإدارة هوية المستخدمين والصلاحيات في مكان واحد
          </p>
        </motion.div>

        {/* Features Grid */}
        <div
          ref={ref}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const delay = index * 0.1;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group relative"
              >
                <div
                  className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-r opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background: `linear-gradient(135deg, ${feature.color.split(" ")[1]} 0%, ${feature.color.split(" ")[3]} 100%)`,
                  }}
                />

                <div className="bg-card group-hover:border-primary/20 relative h-full rounded-xl border p-6 shadow-sm transition-all duration-300 group-hover:shadow-xl">
                  {/* Icon */}
                  <div
                    className={cn(
                      "mb-4 inline-flex rounded-lg p-3",
                      "bg-gradient-to-br",
                      feature.color,
                      "text-white",
                    )}
                  >
                    <Icon className="h-6 w-6" />
                  </div>

                  {/* Title */}
                  <h3 className="group-hover:text-primary mb-2 text-lg font-semibold transition-colors">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm">
                    {feature.description}
                  </p>

                  {/* Hover Effect Line */}
                  <div className="from-primary/0 via-primary to-primary/0 absolute bottom-0 left-0 right-0 h-0.5 scale-x-0 bg-gradient-to-r transition-transform duration-300 group-hover:scale-x-100" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
