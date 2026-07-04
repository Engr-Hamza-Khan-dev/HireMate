import React from "react";

type ResumeCTAProps = {
  title: string;
  description: string;
  buttonLabel: string;
  onClick?: () => void;
  icon?: React.ReactNode;
};

export default function ResumeCTA({ title, description, buttonLabel, onClick, icon }: ResumeCTAProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            {icon ?? "✨"}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
        <button
          onClick={onClick}
          className="self-start rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition sm:self-auto"
        >
          {buttonLabel}
        </button>
      </div>
    </div>
  );
}
