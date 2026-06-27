import { Button as ShadcnButton } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

export type ButtonProps = ComponentProps<typeof ShadcnButton>;

export function Button({ className, ...props }: ButtonProps) {
  return <ShadcnButton className={cn(className)} {...props} />;
}