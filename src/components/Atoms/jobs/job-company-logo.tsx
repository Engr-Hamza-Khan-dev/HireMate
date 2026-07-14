import Image from "next/image";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { ComponentProps } from "react";

export type CompanyLogoProps = ComponentProps<"div"> & {
  src?: string;
  alt: string;
  size?: "sm" | "md" | "lg";
};

export function CompanyLogo({
  src,
  alt,
  size = "md",
  className,
}: CompanyLogoProps) {
  const initials = alt
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <Avatar className={className} size={size === "lg" ? "lg" : size === "sm" ? "sm" : "default"}>
      {src ? (
        <Image src={src} alt={alt} fill className="object-cover" unoptimized />
      ) : null}
      <AvatarFallback className="text-xs font-semibold">{initials}</AvatarFallback>
    </Avatar>
  );
}
