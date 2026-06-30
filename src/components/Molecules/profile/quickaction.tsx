import { ChevronRight } from "lucide-react";

interface QuickActionItemProps {
  title: string;
  description: string;
  icon: React.ElementType;
  onClick?: () => void;
}

export default function QuickActionItem({
  title,
  description,
  icon: Icon,
  onClick,
}: QuickActionItemProps) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center justify-between rounded-lg border p-4 text-left transition hover:bg-muted"
    >
      <div className="flex items-center gap-4">
        <div className="rounded-lg bg-violet-100 p-3">
          <Icon className="h-5 w-5 text-violet-600" />
        </div>

        <div>
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-muted-foreground">
            {description}
          </p>
        </div>
      </div>

      <ChevronRight className="h-5 w-5 text-muted-foreground" />
    </button>
  );
}