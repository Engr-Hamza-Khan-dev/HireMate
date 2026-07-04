import React from "react";

type WelcomeHeaderProps = {
  name: string;
  subtitle: string;
  rightSlot?: React.ReactNode;
};

export default function WelcomeHeader({ name, subtitle, rightSlot }: WelcomeHeaderProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1 className="text-xl font-semibold text-foreground sm:text-2xl">
          Welcome back, {name} 👋
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
      </div>
      {rightSlot && <div className="flex items-center gap-3 self-start">{rightSlot}</div>}
    </div>
  );
}
