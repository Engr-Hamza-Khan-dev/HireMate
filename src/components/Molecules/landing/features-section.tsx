"use client";

import { motion } from "framer-motion";
import {
  SearchIcon,
  FileTextIcon,
  MailIcon,
  BarChart2Icon,
  BotIcon,
} from "lucide-react";
import { LandingSectionHeading } from "@/components/Atoms/landing/landing-section-heading";

const FEATURES = [
  {
    icon: SearchIcon,
    title: "Smart Job Matching",
    description:
      "AI-powered job matching that finds opportunities matching your skills and experience.",
  },
  {
    icon: FileTextIcon,
    title: "AI Resume Builder",
    description:
      "Create ATS-friendly resumes that get past screening systems.",
  },
  {
    icon: MailIcon,
    title: "Cover Letters",
    description:
      "Generate personalised cover letters that make you stand out.",
  },
  {
    icon: BarChart2Icon,
    title: "Application Tracking",
    description:
      "Track your applications and never miss an opportunity.",
  },
  {
    icon: BotIcon,
    title: "AI Career Coach",
    description:
      "Get AI-powered advice to improve your career and skills.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <LandingSectionHeading
          badge="Powerful Features"
          title={
            <>
              Everything You Need to{" "}
              <span className="text-primary">Accelerate Your Career</span>
            </>
          }
          subtitle="AI-powered tools designed to make your job search smarter, faster, and more effective."
          align="center"
          className="mb-14"
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {FEATURES.map(({ icon: Icon, title, description }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="group flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-md"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="mb-1.5 text-sm font-semibold text-foreground">{title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
