import React from "react";

type WelcomeHeaderProps = {
  name: string;
  subtitle: string;
  rightSlot?: React.ReactNode;
};

export default function WelcomeHeader({
  name,
  subtitle,
  rightSlot,
}: WelcomeHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Welcome back, {name} 👋
        </h1>
        <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
      </div>

      {rightSlot && <div className="flex items-center gap-3">{rightSlot}</div>}
    </div>
  );
}