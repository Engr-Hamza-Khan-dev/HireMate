"use client";

import { motion } from "framer-motion";
import { UsersIcon, FileTextIcon, BriefcaseIcon, TrendingUpIcon } from "lucide-react";
import { LandingStat } from "@/components/Atoms/landing/landing-stat";

const STATS = [
  { icon: <UsersIcon className="h-5 w-5" />, value: "10,000+", label: "Happy Users" },
  { icon: <FileTextIcon className="h-5 w-5" />, value: "25,000+", label: "Resumes Created" },
  { icon: <BriefcaseIcon className="h-5 w-5" />, value: "50,000+", label: "Jobs Applied" },
  { icon: <TrendingUpIcon className="h-5 w-5" />, value: "85%", label: "Success Rate" },
];

export function StatsSection() {
  return (
    <section className="border-y border-border bg-background py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center text-sm font-medium uppercase tracking-wider text-muted-foreground"
        >
          Trusted by Job Seekers Worldwide
        </motion.p>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {STATS.map(({ icon, value, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <LandingStat icon={icon} value={value} label={label} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
