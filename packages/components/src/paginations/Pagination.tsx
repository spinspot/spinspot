"use client";

import { cn } from "@spin-spot/utils";
import { useState } from "react";

interface PaginationProps {
  labels: string[];
  size?: "xs" | "sm" | "md" | "lg";
  activeIndex?: number;
  className?: string;
  onPageChange?: (label: string) => void;
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
  onPageChange,
}: PaginationProps) {
  const [currentIndex, setCurrentIndex] = useState<number | null>(
    activeIndex !== undefined ? activeIndex : null,
  );

  const handleClick = (index: number) => {
    setCurrentIndex(index === currentIndex ? currentIndex : index);
    if (onPageChange) {
      onPageChange(labels[index] as string);
    }
  };

  return (
    <div className="join">
      {labels.map((label, index) => (
        <button
          key={index}
          className={cn(
            "join-item btn btn-square px-10",
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
