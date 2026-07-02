"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/Atoms/button";
import { Input } from "@/components/ui/input";

export function CtaSection() {
  const [email, setEmail] = useState("");

  return (
    <section className="bg-primary py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-center">
          {/* Left copy */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-lg"
          >
            <h2 className="text-3xl font-bold leading-tight text-primary-foreground sm:text-4xl">
              Ready to Accelerate{" "}
              <span className="opacity-90">Your Career?</span>
            </h2>
            <p className="mt-3 text-primary-foreground/75">
              Join thousands of professionals who have already advanced their careers with HireMate AI.
            </p>
          </motion.div>

          {/* Right — email capture */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-sm"
          >
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/50 focus-visible:border-primary-foreground"
              />
              <Button
                variant="secondary"
                className="h-11 shrink-0 gap-1.5"
                asChild
              >
                <Link href="/sign-up">
                  Get Started Free
                  <ArrowRightIcon className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <p className="mt-2 text-xs text-primary-foreground/60">
              No credit card required • Free forever plan available
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
