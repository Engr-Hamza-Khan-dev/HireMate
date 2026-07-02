import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

type SettingsDangerButtonProps = ComponentProps<"button"> & {
  label: string;
};

/**
 * Atom: destructive-styled action button for the danger zone.
 */
export function SettingsDangerButton({
  label,
  className,
  ...props
}: SettingsDangerButtonProps) {
  return (
    <Button
      type="button"
      variant="destructive"
      className={cn("h-9 text-sm font-medium", className)}
      {...props}
    >
      {label}
    </Button>
  );
}
