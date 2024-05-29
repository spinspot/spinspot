"use client";

import { cn } from "@spin-spot/utils";
import { useState } from "react";

interface PaginationProps {
  labels: string[];
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
  onPageChange?: (label: string | null | undefined) => void; 
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
  className,
  onPageChange,
}: PaginationProps) {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  const handleClick = (index: number) => {
    const newIndex = index === currentIndex ? null : index;
    setCurrentIndex(newIndex);
    if (onPageChange) {
      onPageChange(newIndex !== null ? labels[newIndex] : null);
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