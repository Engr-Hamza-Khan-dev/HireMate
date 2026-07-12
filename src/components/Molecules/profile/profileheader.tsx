import { Button } from "@/components/Atoms/button";

interface ProfileHeaderProps {
  title: string;
  description: string;
  onSave?: () => void;
  isSaving?: boolean;
  isLoading?: boolean;
}

export default function ProfileHeader({
  title,
  description,
  onSave,
  isSaving = false,
  isLoading = false,
}: ProfileHeaderProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          {title}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>

      <Button
        onClick={onSave}
        disabled={isSaving || isLoading}
        className="self-start sm:self-auto"
      >
        {isSaving ? (
          <span className="flex items-center gap-2">
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
            Saving…
          </span>
        ) : "Save Changes"}
      </Button>
    </div>
  );
}
