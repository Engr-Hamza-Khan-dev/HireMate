import { Badge } from "@/components/ui/badge";

interface ApplicationItemProps {
  role: string;
  company: string;
  status: "Applied" | "Interview" | "Rejected" | "Offer";
  date: string;
}

const STATUS_VARIANT: Record<
  ApplicationItemProps["status"],
  "default" | "secondary" | "destructive" | "outline"
> = {
  Interview: "default",
  Applied: "secondary",
  Offer: "outline",
  Rejected: "destructive",
};

export default function ApplicationItem({
  role,
  company,
  status,
  date,
}: ApplicationItemProps) {
  return (
    <li className="flex items-center justify-between px-4 py-3 transition-colors hover:bg-accent/50">
      <div className="min-w-0">
        <p className="truncate text-sm font-medium text-foreground">
          {role}
        </p>

        <p className="truncate text-xs text-muted-foreground">
          {company}
        </p>
      </div>

      <div className="ml-4 flex shrink-0 items-center gap-3">
        <Badge variant={STATUS_VARIANT[status]}>
          {status}
        </Badge>

        <span className="text-xs text-muted-foreground">
          {date}
        </span>
      </div>
    </li>
  );
}