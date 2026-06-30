import React from "react";

type ResumeCTAProps = {
  title: string;
  description: string;
  buttonLabel: string;
  onClick?: () => void;
  icon?: React.ReactNode;
};

export default function ResumeCTA({
  title,
  description,
  buttonLabel,
  onClick,
  icon,
}: ResumeCTAProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600">
            {icon ?? "✨"}
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-500">{description}</p>
          </div>
        </div>

        <button
          onClick={onClick}
          className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700"
        >
          {buttonLabel}
        </button>
      </div>
    </div>
  );
}