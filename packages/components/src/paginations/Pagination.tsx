"use client";

import { cn } from "@spin-spot/utils";
import { useState } from "react";

interface PaginationProps {
  ariaLabels: string[];
  size?: "xs" | "sm" | "md" | "lg";
  activeIndex?: number;
  className?: string;
}

const loadingSizes = {
  xs: "btn-xs",
  sm: "btn-sm",
  md: "btn-md",
  lg: "btn-lg",
};

export function Pagination({
  ariaLabels,
  size = "md",
  activeIndex,
  className,
  ...props
}: PaginationProps) {
  const [currentIndex, setCurrentIndex] = useState<number | null>(
    activeIndex !== undefined ? activeIndex : null,
  );

  const handleClick = (index: number) => {
    setCurrentIndex(index === currentIndex ? currentIndex : index);
  };

  return (
    <div className="join" {...props}>
      {ariaLabels.map((label, index) => (
        <button
          key={index}
          className={cn(
            "join-item btn btn-square",
            loadingSizes[size],
            className,
            index === currentIndex ? "btn-active" : "",
          )}
          aria-label={label}
          onClick={() => handleClick(index)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
