import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-[var(--r-pill)] px-3 py-1 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--plum-soft)] text-[var(--plum-deep)]",
        secondary:
          "bg-[var(--bg-soft)] text-[var(--ink-2)]",
        destructive:
          "bg-[var(--rose-soft)] text-[var(--rose-deep)]",
        outline: "border border-[var(--ink-4)] text-[var(--ink-2)]",
        success: "bg-[var(--bg-mint)] text-[var(--success)]",
        gold: "bg-[var(--bg-cream)] text-[var(--gold)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
