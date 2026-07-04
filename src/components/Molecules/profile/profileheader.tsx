import { Button } from "@/components/Atoms/button";

interface ProfileHeaderProps {
  title: string;
  description: string;
  onSave?: () => void;
}

export default function ProfileHeader({
  title,
  description,
  onSave,
}: ProfileHeaderProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          {title}
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          {description}
        </p>
      </div>

      <Button onClick={onSave} className="self-start sm:self-auto">
        Save Changes
      </Button>
    </div>
  );
}