"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2Icon, SparklesIcon } from "lucide-react";
import { Button } from "@/components/Atoms/button";
import { LandingBadge } from "@/components/Atoms/landing/landing-badge";

const FEATURES = [
  {
    title: "ATS-optimized resumes",
    description: "Beat the bots and get to human review",
  },
  {
    title: "Keyword optimization",
    description: "Match the right keywords and skills",
  },
  {
    title: "Content evaluation",
    description: "AI analyzes and improves your content",
  },
  {
    title: "Real-time suggestions",
    description: "Get instant improvements as you build",
  },
];

/** Fake resume preview card */
function ResumeCard() {
  return (
    <div className="relative w-full max-w-sm rounded-2xl border border-border bg-card shadow-xl">
      <div className="p-5">
        {/* Header */}
        <div className="mb-4 border-b border-border pb-3">
          <p className="text-base font-bold text-foreground">John Doe</p>
          <p className="text-xs text-muted-foreground">Senior Frontend Developer</p>
          <div className="mt-1 flex flex-wrap gap-2 text-[10px] text-muted-foreground">
            <span>📍 New York, USA</span>
            <span>📧 john@example.com</span>
          </div>
        </div>

        {/* Experience */}
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Experience</p>
        <div className="mb-3 rounded-lg bg-muted/40 p-3">
          <p className="text-xs font-bold text-foreground">Senior Frontend Developer</p>
          <p className="text-[10px] text-muted-foreground">Meta • 2022 – Present</p>
          <ul className="mt-1.5 space-y-1">
            {["Led redesign increasing engagement by 40%", "Built reusable component library", "Mentored a team of 5 engineers"].map((b) => (
              <li key={b} className="flex items-start gap-1 text-[10px] text-muted-foreground">
                <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                {b}
              </li>
            ))}
          </ul>
        </div>

        {/* Skills */}
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Skills</p>
        <div className="flex flex-wrap gap-1.5 mb-3">
          {["React", "TypeScript", "Next.js", "GraphQL", "Tailwind"].map((s) => (
            <span key={s} className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
              {s}
            </span>
          ))}
        </div>

        {/* Education */}
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Education</p>
        <p className="text-xs text-foreground">B.Sc. Computer Science</p>
        <p className="text-[10px] text-muted-foreground">MIT • 2018</p>
      </div>

      {/* ATS Score badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="absolute -right-5 top-1/3 flex flex-col items-center gap-1 rounded-2xl border border-border bg-card p-3 shadow-lg"
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-full border-4 border-success bg-success/10">
          <span className="text-lg font-extrabold text-success">98</span>
        </div>
        <p className="text-[10px] font-semibold text-foreground">ATS Score</p>
        <p className="text-[10px] text-success">Excellent</p>
        {["Keyword Match ✓", "Format Check ✓", "Content Quality ✓"].map((t) => (
          <span key={t} className="text-[9px] text-muted-foreground">{t}</span>
        ))}
      </motion.div>
    </div>
  );
}

export function ResumeBuilderSection() {
  return (
    <section id="how-it-works" className="bg-muted/30 py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        {/* Left — resume card */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-center"
        >
          <ResumeCard />
        </motion.div>

        {/* Right — copy */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-6"
        >
          <LandingBadge>
            <SparklesIcon className="h-3.5 w-3.5" />
            AI-Powered Excellence
          </LandingBadge>

          <h2 className="text-3xl font-bold leading-tight text-foreground sm:text-4xl">
            Built to Get{" "}
            <span className="text-primary">You Hired</span>
          </h2>

          <p className="text-muted-foreground">
            Our AI analyses job descriptions and optimizes your application materials to match perfectly.
          </p>

          <ul className="flex flex-col gap-4">
            {FEATURES.map(({ title, description }) => (
              <li key={title} className="flex items-start gap-3">
                <CheckCircle2Icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <p className="text-sm font-semibold text-foreground">{title}</p>
                  <p className="text-sm text-muted-foreground">{description}</p>
                </div>
              </li>
            ))}
          </ul>

          <div>
            <Button size="lg" asChild>
              <Link href="/sign-up">Create Your Resume</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
