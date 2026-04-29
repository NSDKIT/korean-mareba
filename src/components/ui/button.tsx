import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-semibold transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-b from-[#9888CF] to-[#6F5DAB] text-white shadow-[0_6px_16px_rgba(111,93,171,0.3)] hover:shadow-[0_8px_20px_rgba(111,93,171,0.4)] active:scale-[0.98]",
        destructive:
          "bg-gradient-to-b from-[#C97A7A] to-[#B05F5F] text-white shadow-md hover:shadow-lg active:scale-[0.98]",
        outline:
          "border border-[var(--ink-4)] bg-white hover:bg-[var(--bg-soft)] text-[var(--ink-1)]",
        secondary:
          "bg-[var(--bg-soft)] text-[var(--ink-1)] hover:bg-[var(--bg-blush)]",
        ghost: "bg-[var(--bg-soft)] text-[var(--ink-1)] hover:bg-[var(--bg-blush)]",
        link: "text-[var(--plum-deep)] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-12 px-6 py-3 rounded-[var(--r-pill)]",
        sm: "h-10 px-4 py-2 rounded-[var(--r-pill)]",
        lg: "h-14 px-8 py-4 rounded-[var(--r-pill)] text-base",
        icon: "h-10 w-10 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
