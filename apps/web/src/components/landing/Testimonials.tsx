"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star } from "lucide-react";
import { testimonials } from "@/lib/constants";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

export function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className="from-muted/50 to-background bg-gradient-to-b py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            آراء
            <span className="from-primary to-primary/60 mr-2 bg-gradient-to-r bg-clip-text text-transparent">
              العملاء
            </span>
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
            ماذا يقول عملاؤنا عن تجربتهم معنا
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <div ref={ref}>
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="h-full"
                  >
                    <div className="bg-card h-full rounded-xl border p-6 shadow-sm transition-shadow duration-300 hover:shadow-lg">
                      {/* Rating */}
                      <div className="mb-4 flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              "h-5 w-5",
                              i < testimonial.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-muted-foreground",
                            )}
                          />
                        ))}
                      </div>

                      {/* Quote */}
                      <p className="text-muted-foreground mb-6 line-clamp-4">
                        &quot;{testimonial.content}&quot;
                      </p>

                      {/* Author */}
                      <div className="flex items-center gap-3">
                        <div className="text-3xl">{testimonial.avatar}</div>
                        <div>
                          <p className="font-semibold">{testimonial.name}</p>
                          <p className="text-muted-foreground text-sm">
                            {testimonial.role} - {testimonial.company}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
