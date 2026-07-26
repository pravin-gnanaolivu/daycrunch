"use client";

import { useEffect, useState } from "react";
import { ANNOUNCEMENTS } from "@/lib/constants";

export function AnnouncementBar() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-plum text-white text-center text-xs sm:text-sm h-10 flex items-center justify-center px-4 relative overflow-hidden">
      <div className="flex items-center justify-center gap-2">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-golden animate-pulse" />
        <p className="font-medium transition-opacity duration-500">
          {ANNOUNCEMENTS[current]}
        </p>
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-golden animate-pulse" />
      </div>
    </div>
  );
}
