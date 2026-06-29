import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";

interface StatCardProps {
  label: string;
  value: string;
  delta: string;
  icon: React.ElementType;
}

export default function StatCard({
  label,
  value,
  delta,
  icon: Icon,
}: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardDescription className="text-sm font-medium">
          {label}
        </CardDescription>

        <Icon
          className="h-4 w-4 text-muted-foreground"
          aria-hidden="true"
        />
      </CardHeader>

      <CardContent>
        <p className="text-2xl font-bold text-foreground">
          {value}
        </p>

        <p className="mt-1 text-xs text-muted-foreground">
          {delta}
        </p>
      </CardContent>
    </Card>
  );
}