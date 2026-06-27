import { Crown } from "lucide-react";
import { Button } from "@/components/Atoms/button";
import { cn } from "@/lib/utils";

export function UpgradeBanner() {
  return (
    <div className="rounded-xl border border-brand-200 bg-brand-50 p-4">
      <div className="flex items-center gap-2 mb-1">
        <Crown className="h-4 w-4 text-brand-600" aria-hidden="true" />
        <p className="text-sm font-semibold text-brand-700">Upgrade to Pro</p>
      </div>
      <p className="text-xs text-brand-600 mb-3 leading-relaxed">
        Unlock unlimited resumes, advanced templates and more.
      </p>
      <Button
        size="sm"
        className={cn(
          "w-full bg-brand-600 hover:bg-brand-700 text-white",
          "focus-visible:ring-brand-500"
        )}
      >
        Upgrade Now
      </Button>
    </div>
  );
}
