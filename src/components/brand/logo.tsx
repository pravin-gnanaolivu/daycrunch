"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showTagline?: boolean;
}

export function Logo({ className, size = "md", showTagline = false }: LogoProps) {
  const sizes = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-4xl",
  };

  return (
    <Link href="/" className={cn("group inline-flex flex-col", className)}>
      <div className={cn("flex items-center gap-1.5 font-black tracking-tight", sizes[size])}>
        <svg
          viewBox="0 0 32 32"
          className={cn(
            "text-pistachio transition-transform group-hover:rotate-12",
            size === "sm" ? "h-5 w-5" : size === "md" ? "h-7 w-7" : "h-10 w-10"
          )}
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M16 2C10 2 6 8 6 14c0 4 2 8 6 10 2 1 4 1 4 1s2 0 4-1c4-2 6-6 6-10 0-6-4-12-10-12zm0 4c1.5 0 3 2 3 5s-1.5 5-3 5-3-2-3-5 1.5-5 3-5z" />
          <ellipse cx="16" cy="28" rx="8" ry="2" opacity="0.3" />
        </svg>
        <span>
          <span className="text-plum">DAY</span>
          <span className="text-sunset">CRUNCH</span>
        </span>
      </div>
      {showTagline && (
        <span className="mt-0.5 text-xs font-medium text-muted tracking-wide">
          Crunch Better. Live Better.
        </span>
      )}
    </Link>
  );
}
