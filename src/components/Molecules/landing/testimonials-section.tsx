"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "@/components/Atoms/button";
import { LandingSectionHeading } from "@/components/Atoms/landing/landing-section-heading";
import { StarRating } from "@/components/Atoms/landing/star-rating";

const TESTIMONIALS = [
  {
    quote:
      '"HireMate AI helped me land my dream job at Google. The AI resume builder is incredible!"',
    name: "Sarah Johnson",
    role: "Software Engineer at Google",
    initials: "SJ",
  },
  {
    quote:
      '"The cover letter generator saves me so much time and helps me stand out from other candidates."',
    name: "Mike Chen",
    role: "Product Manager at Microsoft",
    initials: "MC",
  },
  {
    quote:
      '"Best investment for my career. The AI job matching is spot on!"',
    name: "Emily Rodriguez",
    role: "Designer at Airbnb",
    initials: "ER",
  },
];

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  function prev() {
    setCurrent((c) => (c === 0 ? TESTIMONIALS.length - 1 : c - 1));
  }
  function next() {
    setCurrent((c) => (c === TESTIMONIALS.length - 1 ? 0 : c + 1));
  }

  return (
    <section className="bg-muted/30 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <LandingSectionHeading
          title="What Our Users Say"
          subtitle="Real success stories from real people"
          align="center"
          className="mb-14"
        />

        {/* Cards row */}
        <div className="hidden gap-6 md:grid md:grid-cols-3">
          {TESTIMONIALS.map(({ quote, name, role, initials }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm"
            >
              <StarRating />
              <p className="flex-1 text-sm leading-relaxed text-muted-foreground">{quote}</p>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                  {initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{name}</p>
                  <p className="text-xs text-muted-foreground">{role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile carousel */}
        <div className="md:hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm"
            >
              <StarRating />
              <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                {TESTIMONIALS[current].quote}
              </p>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                  {TESTIMONIALS[current].initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{TESTIMONIALS[current].name}</p>
                  <p className="text-xs text-muted-foreground">{TESTIMONIALS[current].role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-6 flex items-center justify-center gap-3">
            <Button variant="outline" size="icon" onClick={prev} aria-label="Previous">
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
            <div className="flex gap-1.5">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all ${i === current ? "w-5 bg-primary" : "w-2 bg-border"}`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <Button variant="outline" size="icon" onClick={next} aria-label="Next">
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
