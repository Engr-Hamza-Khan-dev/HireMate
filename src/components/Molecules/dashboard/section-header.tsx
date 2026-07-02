import { Button } from "@/components/Atoms/button";

type SectionHeaderProps = {
  title: string;
  actionLabel?: string;
  onAction?: () => void;
};

export default function SectionHeader({
  title,
  actionLabel,
  onAction,
}: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      {actionLabel && (
        <Button variant="link" size="sm" onClick={onAction} className="h-auto p-0">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}