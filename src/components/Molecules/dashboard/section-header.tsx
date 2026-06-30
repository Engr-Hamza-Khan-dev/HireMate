import React from "react";

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
      <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
      {actionLabel && (
        <button
          onClick={onAction}
          className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}