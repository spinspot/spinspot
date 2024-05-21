"use client";

import { cn } from "@spin-spot/utils";
import { useState } from "react";

interface PaginationProps {
  labels: string[];
  size?: "xs" | "sm" | "md" | "lg";
  activeIndex?: number;
  className?: string;
}

const paginationSizes = {
  xs: "btn-xs",
  sm: "btn-sm",
  md: "btn-md",
  lg: "btn-lg",
};

export function Pagination({
  labels,
  size = "md",
  activeIndex,
  className,
}: PaginationProps) {
  const [currentIndex, setCurrentIndex] = useState<number | null>(
    activeIndex !== undefined ? activeIndex : null,
  );

  const handleClick = (index: number) => {
    setCurrentIndex(index === currentIndex ? currentIndex : index);
  };

  return (
    <div className="join">
      {labels.map((label, index) => (
        <button
          key={index}
          className={cn(
            "join-item btn btn-square",
            paginationSizes[size],
            className,
            index === currentIndex ? "btn-active" : "",
          )}
          onClick={() => handleClick(index)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
