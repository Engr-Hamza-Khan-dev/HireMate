"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { PlayCircleIcon, SparklesIcon, BriefcaseIcon, FileTextIcon, MailIcon, LayoutDashboardIcon, StarIcon } from "lucide-react";
import { Button } from "@/components/Atoms/button";
import { LandingBadge } from "@/components/Atoms/landing/landing-badge";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

/** Mock dashboard card shown on the right side of the hero */
function DashboardMockup() {
  return (
    <div className="relative w-full max-w-lg">
      {/* Main card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.7 }}
        className="rounded-2xl border border-border bg-card shadow-2xl overflow-hidden"
      >
        {/* Header bar */}
        <div className="flex items-center gap-2 border-b border-border bg-muted/40 px-4 py-3">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-red-400" />
            <span className="h-3 w-3 rounded-full bg-yellow-400" />
            <span className="h-3 w-3 rounded-full bg-green-400" />
          </div>
          <span className="ml-2 text-xs font-medium text-muted-foreground">HireMate AI — Dashboard</span>
        </div>

        <div className="flex">
          {/* Sidebar */}
          <div className="hidden w-36 shrink-0 border-r border-border bg-muted/20 p-3 sm:block">
            <div className="mb-4 flex items-center gap-1.5">
              <BriefcaseIcon className="h-4 w-4 text-primary" />
              <span className="text-xs font-bold text-foreground">HireMate</span>
            </div>
            {[
              { icon: LayoutDashboardIcon, label: "Dashboard", active: true },
              { icon: BriefcaseIcon, label: "Jobs" },
              { icon: FileTextIcon, label: "Resumes" },
              { icon: MailIcon, label: "Cover Letters" },
            ].map(({ icon: Icon, label, active }) => (
              <div
                key={label}
                className={`mb-1 flex items-center gap-2 rounded-md px-2 py-1.5 text-xs ${active ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
              >
                <Icon className="h-3 w-3 shrink-0" />
                {label}
              </div>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 p-4">
            <p className="mb-3 text-sm font-semibold text-foreground">Good morning, John 👋</p>
            {/* Stats row */}
            <div className="mb-3 grid grid-cols-4 gap-2">
              {[
                { label: "Applied", value: "24" },
                { label: "Interviews", value: "7" },
                { label: "Match", value: "95%" },
                { label: "Saved", value: "16" },
              ].map((s) => (
                <div key={s.label} className="rounded-lg bg-muted/60 p-2 text-center">
                  <p className="text-sm font-bold text-foreground">{s.value}</p>
                  <p className="text-[10px] text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>
            {/* Job cards */}
            <p className="mb-2 text-xs font-semibold text-foreground">Recommended Jobs</p>
            {[
              { title: "Senior Frontend Dev", company: "Meta", match: 98 },
              { title: "Product Designer", company: "Airbnb", match: 91 },
              { title: "Full Stack Engineer", company: "Stripe", match: 87 },
            ].map((job) => (
              <div key={job.title} className="mb-1.5 flex items-center justify-between rounded-lg border border-border bg-background px-3 py-2">
                <div>
                  <p className="text-xs font-semibold text-foreground">{job.title}</p>
                  <p className="text-[10px] text-muted-foreground">{job.company}</p>
                </div>
                <span className="rounded-full bg-success/10 px-2 py-0.5 text-[10px] font-bold text-success">
                  {job.match}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Floating ATS badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.4 }}
        className="absolute -bottom-4 -left-4 flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 shadow-lg"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-success/10">
          <SparklesIcon className="h-4 w-4 text-success" />
        </div>
        <div>
          <p className="text-xs font-bold text-foreground">ATS Score: 98</p>
          <p className="text-[10px] text-muted-foreground">Excellent match</p>
        </div>
      </motion.div>

      {/* Floating profile card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.4 }}
        className="absolute -right-4 -top-4 flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 shadow-lg"
      >
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
          JD
        </div>
        <div>
          <p className="text-xs font-bold text-foreground">Profile 75%</p>
          <div className="mt-0.5 h-1.5 w-16 rounded-full bg-muted">
            <div className="h-1.5 w-3/4 rounded-full bg-primary" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-50 via-background to-background py-16 sm:py-24">
      {/* Background blobs */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        {/* Left — copy */}
        <div className="flex flex-col gap-6">
          <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show">
            <LandingBadge>
              <SparklesIcon className="h-3.5 w-3.5" />
              AI-Powered Career Success
            </LandingBadge>
          </motion.div>

          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl"
          >
            Land Your Dream Job{" "}
            <span className="text-primary">Faster with AI</span>
          </motion.h1>

          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="max-w-md text-lg text-muted-foreground"
          >
            HireMate AI helps you find the right jobs, create ATS-friendly resumes, and write personalised cover letters in minutes.
          </motion.p>

          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="flex flex-wrap gap-3"
          >
            <Button size="lg" asChild>
              <Link href="/sign-up">Get Started Free</Link>
            </Button>
            <Button size="lg" variant="outline" className="gap-2" asChild>
              <Link href="#how-it-works">
                <PlayCircleIcon className="h-4 w-4" />
                See How It Works
              </Link>
            </Button>
          </motion.div>

          {/* Social proof */}
          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="flex items-center gap-3"
          >
            <div className="flex -space-x-2">
              {[
                "/hamza.png",
                "/muzzamil.png",
                "/Taha.png",
                "/hamza1.png",
              ].map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`User ${i + 1}`}
                  width={32}
                  height={32}
                  className="h-8 w-8 rounded-full border-2 border-background object-cover"
                />
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <StarIcon key={i} className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-xs text-muted-foreground">Loved by 10,000+ job seekers</p>
            </div>
          </motion.div>

          {/* Trusted by logos */}
          <motion.div custom={5} variants={fadeUp} initial="hidden" animate="show">
            <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Trusted by professionals from
            </p>
            <div className="flex flex-wrap items-center gap-5">
              {["Google", "Microsoft", "Amazon", "Airbnb", "Spotify"].map((co) => (
                <span key={co} className="text-sm font-semibold text-muted-foreground/70">
                  {co}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right — dashboard mockup */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="flex justify-center lg:justify-end"
        >
          <DashboardMockup />
        </motion.div>
      </div>
    </section>
  );
}
