interface DashboardHeaderProps {
  title: string;
  subtitle: string;
}

export default function DashboardHeader({
  title,
  subtitle,
}: DashboardHeaderProps) {
  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight text-foreground">
        {title}
      </h1>

      <p className="mt-1 text-sm text-muted-foreground">
        {subtitle}
      </p>
    </div>
  );
}