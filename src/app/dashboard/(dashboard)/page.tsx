import type { Metadata } from "next";
import {
  FileText,
  Briefcase,
  ClipboardList,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/Atoms/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = { title: "Dashboard" };

interface StatCard {
  label: string;
  value: string;
  delta: string;
  icon: React.ElementType;
}

const STAT_CARDS: StatCard[] = [
  { label: "Resumes", value: "4", delta: "+1 this week", icon: FileText },
  { label: "Jobs Saved", value: "12", delta: "+3 this week", icon: Briefcase },
  { label: "Applications", value: "7", delta: "+2 this week", icon: ClipboardList },
  { label: "Profile Views", value: "38", delta: "+14 this week", icon: TrendingUp },
] as const;

interface RecentApplication {
  role: string;
  company: string;
  status: "Applied" | "Interview" | "Rejected" | "Offer";
  date: string;
}

const RECENT_APPLICATIONS: RecentApplication[] = [
  { role: "Frontend Engineer", company: "Stripe", status: "Interview", date: "Jun 24" },
  { role: "Full Stack Developer", company: "Vercel", status: "Applied", date: "Jun 21" },
  { role: "React Developer", company: "Linear", status: "Offer", date: "Jun 18" },
  { role: "UI Engineer", company: "Figma", status: "Rejected", date: "Jun 14" },
] as const;

const STATUS_VARIANT: Record<RecentApplication["status"], "default" | "secondary" | "destructive" | "outline"> = {
  Interview: "default",
  Applied: "secondary",
  Offer: "outline",
  Rejected: "destructive",
};

/**
 * Dashboard overview — Server Component.
 * All data is static/mock here; replace with async fetches as needed.
 */
export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8 p-6 md:p-8">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Dashboard
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Welcome back, Hamza. Here's what's happening.
        </p>
      </div>

      {/* Stat cards */}
      <section aria-label="Overview statistics">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {STAT_CARDS.map(({ label, value, delta, icon: Icon }) => (
            <Card key={label}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardDescription className="text-sm font-medium">
                  {label}
                </CardDescription>
                <Icon className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-foreground">{value}</p>
                <p className="text-xs text-muted-foreground mt-1">{delta}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator />

      {/* Recent applications */}
      <section aria-label="Recent applications">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-foreground">
            Recent Applications
          </h2>
          <Button variant="ghost" size="sm" className="gap-1 text-violet-600 hover:text-violet-700">
            View all <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Button>
        </div>

        <Card>
          <CardContent className="p-0">
            <ul role="list" className="divide-y divide-border">
              {RECENT_APPLICATIONS.map(({ role, company, status, date }) => (
                <li
                  key={`${role}-${company}`}
                  className="flex items-center justify-between px-4 py-3 hover:bg-accent/50 transition-colors"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">
                      {role}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {company}
                    </p>
                  </div>
                  <div className="ml-4 flex shrink-0 items-center gap-3">
                    <Badge variant={STATUS_VARIANT[status]}>{status}</Badge>
                    <span className="text-xs text-muted-foreground">{date}</span>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}