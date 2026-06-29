import React from "react";
import { Sparkles, ArrowRight } from "lucide-react";

type ResumeBannerProps = {
  title: string;
  description: string;
  buttonLabel: string;
  onClick?: () => void;
};

export default function ResumeBanner({
  title,
  description,
  buttonLabel,
  onClick,
}: ResumeBannerProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-center">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600">
            <Sparkles className="h-8 w-8" />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-500">{description}</p>
          </div>
        </div>

        <button
          onClick={onClick}
          className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700"
        >
          {buttonLabel} <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}