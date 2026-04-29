import * as React from "react";
import { cn } from "@/lib/utils";

export interface ProgressProps
  extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value = 0, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative h-2 w-full overflow-hidden rounded-full bg-[var(--bg-soft)]",
          className
        )}
        {...props}
      >
        <div
          className="h-full bg-gradient-to-r from-[var(--plum)] to-[var(--rose)] rounded-full transition-all duration-300"
          style={{ width: `${value || 0}%` }}
        />
      </div>
    );
  }
);
Progress.displayName = "Progress";

export { Progress };
