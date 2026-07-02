"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  BookOpenIcon,
  LightbulbIcon,
  FileTextIcon,
  VideoIcon,
  ArrowRightIcon,
  TrendingUpIcon,
  BriefcaseIcon,
} from "lucide-react";
import { Button } from "@/components/Atoms/button";
import { Badge } from "@/components/ui/badge";
import { LandingSectionHeading } from "@/components/Atoms/landing/landing-section-heading";
import { cn } from "@/lib/utils";

const FEATURED_ARTICLES = [
  {
    tag: "Resume Tips",
    tagColor: "bg-primary/10 text-primary",
    icon: FileTextIcon,
    title: "10 ATS Resume Mistakes That Are Costing You Interviews",
    excerpt:
      "Most resumes never get seen by a human. Learn the most common ATS pitfalls and exactly how to fix them.",
    readTime: "7 min read",
    href: "#",
    featured: true,
  },
  {
    tag: "Career Growth",
    tagColor: "bg-success/10 text-success",
    icon: TrendingUpIcon,
    title: "How to Negotiate Your Salary Like a Pro",
    excerpt:
      "Data-backed strategies that help candidates earn an average of 12% more in their first offer.",
    readTime: "5 min read",
    href: "#",
    featured: false,
  },
  {
    tag: "Job Search",
    tagColor: "bg-warning/10 text-warning-foreground",
    icon: BriefcaseIcon,
    title: "LinkedIn Profile Optimizations That Get Recruiters to Find You",
    excerpt:
      "Small tweaks to your LinkedIn profile that dramatically increase recruiter inbound in 30 days.",
    readTime: "6 min read",
    href: "#",
    featured: false,
  },
];

const RESOURCE_TYPES = [
  {
    icon: BookOpenIcon,
    title: "Career Blog",
    description: "Expert guides on resumes, interviews, and job searching.",
    count: "120+ articles",
    href: "#",
  },
  {
    icon: VideoIcon,
    title: "Video Tutorials",
    description: "Step-by-step walkthroughs of every HireMate AI feature.",
    count: "40+ videos",
    href: "#",
  },
  {
    icon: LightbulbIcon,
    title: "Career Tips",
    description: "Bite-sized advice delivered weekly to your inbox.",
    count: "Weekly newsletter",
    href: "#",
  },
  {
    icon: FileTextIcon,
    title: "Resume Templates",
    description: "ATS-tested templates for every industry and level.",
    count: "50+ templates",
    href: "#",
  },
];

export function ResourcesSection() {
  return (
    <section id="resources" className="bg-muted/30 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <LandingSectionHeading
          badge="Resources"
          title={
            <>
              Everything You Need to{" "}
              <span className="text-primary">Level Up Your Career</span>
            </>
          }
          subtitle="Free guides, templates, and tools from our team of career experts."
          align="center"
          className="mb-14"
        />

        {/* Resource type cards */}
        <div className="mb-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {RESOURCE_TYPES.map(({ icon: Icon, title, description, count, href }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
            >
              <Link
                href={href}
                className={cn(
                  "group flex flex-col gap-3 rounded-2xl border border-border bg-card p-6 no-underline",
                  "transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
                )}
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{description}</p>
                </div>
                <span className="mt-auto text-xs font-medium text-primary">{count}</span>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Featured articles */}
        <div className="mb-8 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Featured Articles</h3>
          <Button variant="ghost" size="sm" className="gap-1.5" asChild>
            <Link href="#">
              View all articles
              <ArrowRightIcon className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {FEATURED_ARTICLES.map(({ tag, tagColor, icon: Icon, title, excerpt, readTime, href, featured }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <Link
                href={href}
                className={cn(
                  "group flex h-full flex-col gap-4 rounded-2xl border bg-card p-6 no-underline transition-all hover:shadow-md",
                  featured ? "border-primary/30" : "border-border"
                )}
              >
                {/* Tag row */}
                <div className="flex items-center justify-between">
                  <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold", tagColor)}>
                    <Icon className="h-3 w-3" />
                    {tag}
                  </span>
                  {featured && (
                    <Badge variant="outline" className="text-[10px]">Featured</Badge>
                  )}
                </div>

                {/* Title & excerpt */}
                <div className="flex-1">
                  <h4 className="mb-2 text-sm font-semibold leading-snug text-foreground group-hover:text-primary transition-colors">
                    {title}
                  </h4>
                  <p className="text-xs leading-relaxed text-muted-foreground">{excerpt}</p>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between border-t border-border pt-3">
                  <span className="text-xs text-muted-foreground">{readTime}</span>
                  <span className="flex items-center gap-1 text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                    Read more
                    <ArrowRightIcon className="h-3 w-3" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
