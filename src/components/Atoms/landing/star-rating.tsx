import { StarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type StarRatingProps = {
  rating?: number;
  max?: number;
  className?: string;
};

/** Row of filled star icons */
export function StarRating({ rating = 5, max = 5, className }: StarRatingProps) {
  return (
    <div className={cn("flex items-center gap-0.5", className)}>
      {Array.from({ length: max }).map((_, i) => (
        <StarIcon
          key={i}
          className={cn(
            "h-4 w-4",
            i < rating ? "fill-yellow-400 text-yellow-400" : "fill-muted text-muted"
          )}
        />
      ))}
    </div>
  );
}
