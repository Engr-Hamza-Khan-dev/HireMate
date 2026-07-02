"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { CheckIcon, ZapIcon } from "lucide-react";
import { Button } from "@/components/Atoms/button";
import { Badge } from "@/components/ui/badge";
import { LandingSectionHeading } from "@/components/Atoms/landing/landing-section-heading";
import { cn } from "@/lib/utils";

type BillingCycle = "monthly" | "yearly";

const PLANS = [
  {
    name: "Free",
    monthlyPrice: 0,
    yearlyPrice: 0,
    description: "Perfect for getting started with your job search.",
    cta: "Get Started Free",
    href: "/sign-up",
    highlight: false,
    badge: null,
    features: [
      "3 AI resume builds per month",
      "5 job matches per day",
      "1 cover letter template",
      "Basic ATS score check",
      "Email support",
    ],
    missing: [
      "Unlimited resumes",
      "AI career coach",
      "Priority job matching",
    ],
  },
  {
    name: "Pro",
    monthlyPrice: 19,
    yearlyPrice: 15,
    description: "For serious job seekers who want every advantage.",
    cta: "Start Pro Trial",
    href: "/sign-up?plan=pro",
    highlight: true,
    badge: "Most Popular",
    features: [
      "Unlimited AI resume builds",
      "Unlimited job matches",
      "Unlimited cover letters",
      "Advanced ATS optimization",
      "AI career coach",
      "Priority job matching",
      "Application tracker",
      "Priority email support",
    ],
    missing: [],
  },
  {
    name: "Enterprise",
    monthlyPrice: 49,
    yearlyPrice: 39,
    description: "For teams, agencies and recruiting professionals.",
    cta: "Contact Sales",
    href: "/sign-up?plan=enterprise",
    highlight: false,
    badge: null,
    features: [
      "Everything in Pro",
      "Team collaboration tools",
      "Custom branding",
      "Dedicated account manager",
      "SSO & advanced security",
      "API access",
      "SLA guarantee",
      "Phone & chat support",
    ],
    missing: [],
  },
] as const;

export function PricingSection() {
  const [billing, setBilling] = useState<BillingCycle>("monthly");

  return (
    <section id="pricing" className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <LandingSectionHeading
          badge="Simple Pricing"
          title={
            <>
              Choose the Plan That{" "}
              <span className="text-primary">Fits Your Goals</span>
            </>
          }
          subtitle="Start free, upgrade when you're ready. No hidden fees, cancel any time."
          align="center"
          className="mb-10"
        />

        {/* Billing toggle */}
        <div className="mb-12 flex justify-center">
          <div className="flex items-center gap-1 rounded-full border border-border bg-muted p-1">
            {(["monthly", "yearly"] as BillingCycle[]).map((cycle) => (
              <button
                key={cycle}
                onClick={() => setBilling(cycle)}
                className={cn(
                  "relative rounded-full px-5 py-1.5 text-sm font-medium transition-colors",
                  billing === cycle
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {cycle === "yearly" ? "Yearly" : "Monthly"}
                {cycle === "yearly" && (
                  <span className="ml-1.5 rounded-full bg-success/15 px-1.5 py-0.5 text-[10px] font-semibold text-success">
                    –20%
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Plan cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {PLANS.map(({ name, monthlyPrice, yearlyPrice, description, cta, href, highlight, badge, features, missing }, i) => {
            const price = billing === "yearly" ? yearlyPrice : monthlyPrice;
            return (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={cn(
                  "relative flex flex-col rounded-2xl border p-7 transition-shadow",
                  highlight
                    ? "border-primary bg-primary shadow-xl shadow-primary/10"
                    : "border-border bg-card hover:shadow-md"
                )}
              >
                {/* Popular badge */}
                {badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <Badge className="gap-1 bg-background px-3 py-1 text-xs font-semibold text-primary shadow-sm">
                      <ZapIcon className="h-3 w-3" />
                      {badge}
                    </Badge>
                  </div>
                )}

                {/* Plan name & price */}
                <div className="mb-5">
                  <p className={cn("text-sm font-semibold uppercase tracking-wider", highlight ? "text-primary-foreground/70" : "text-muted-foreground")}>
                    {name}
                  </p>
                  <div className="mt-2 flex items-end gap-1">
                    <span className={cn("text-4xl font-extrabold", highlight ? "text-primary-foreground" : "text-foreground")}>
                      ${price}
                    </span>
                    <span className={cn("mb-1 text-sm", highlight ? "text-primary-foreground/60" : "text-muted-foreground")}>
                      / mo{billing === "yearly" && ", billed yearly"}
                    </span>
                  </div>
                  <p className={cn("mt-2 text-sm leading-relaxed", highlight ? "text-primary-foreground/70" : "text-muted-foreground")}>
                    {description}
                  </p>
                </div>

                {/* CTA */}
                <Button
                  asChild
                  variant={highlight ? "secondary" : "default"}
                  className="mb-6 w-full"
                >
                  <Link href={href}>{cta}</Link>
                </Button>

                {/* Divider */}
                <div className={cn("mb-5 h-px", highlight ? "bg-primary-foreground/20" : "bg-border")} />

                {/* Feature list */}
                <ul className="flex flex-col gap-3">
                  {features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <CheckIcon className={cn("mt-0.5 h-4 w-4 shrink-0", highlight ? "text-primary-foreground" : "text-success")} />
                      <span className={highlight ? "text-primary-foreground/90" : "text-foreground"}>{f}</span>
                    </li>
                  ))}
                  {missing.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm opacity-40">
                      <span className="mt-0.5 h-4 w-4 shrink-0 text-center leading-4">–</span>
                      <span className={highlight ? "text-primary-foreground" : "text-muted-foreground"}>{f}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom note */}
        <p className="mt-10 text-center text-sm text-muted-foreground">
          All plans include a 14-day free trial. No credit card required.{" "}
          <Link href="/sign-up" className="font-medium text-primary">
            Start free today →
          </Link>
        </p>
      </div>
    </section>
  );
}
