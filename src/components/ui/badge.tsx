import * as React from "react";
import { cn } from "@/lib/utils";

const Badge = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement> & {
    variant?: "default" | "secondary" | "accent" | "outline" | "sale";
  }
>(({ className, variant = "default", ...props }, ref) => {
  const variants = {
    default: "bg-sunset text-white",
    secondary: "bg-plum text-white",
    accent: "bg-pistachio text-white",
    outline: "border border-sunset text-sunset bg-transparent",
    sale: "bg-golden text-charcoal",
  };

  return (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
        variants[variant],
        className
      )}
      {...props}
    />
  );
});
Badge.displayName = "Badge";

export { Badge };
