"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import CountUp from "react-countup";
import { stats } from "@/lib/constants";

export function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div ref={ref} className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-primary mb-2 text-3xl font-bold md:text-4xl">
                {isInView ? (
                  <CountUp
                    end={parseInt(stat.value)}
                    suffix={stat.value.replace(/[0-9]/g, "")}
                    duration={2}
                  />
                ) : (
                  "0"
                )}
              </div>
              <div className="text-muted-foreground text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
