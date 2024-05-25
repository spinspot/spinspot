import { cn } from "@spin-spot/utils";

interface LoaderProps {
  size?: "xs" | "sm" | "md" | "lg";
  variant?: "spinner" | "dots" | "ring" | "ball" | "bars" | "infinity";
  className?: string;
}

const loadingSizes = {
  xs: "loading-xs",
  sm: "loading-sm",
  md: "loading-md",
  lg: "loading-lg",
};

const loadingVariants = {
  spinner: "loading-spinner",
  dots: "loading-dots",
  ring: "loading-ring",
  ball: "loading-ball",
  bars: "loading-bars",
  infinity: "loading-infinity",
};

export function Loader({
  size = "md",
  variant = "spinner",
  className,
}: LoaderProps) {
  return (
    <span
      className={cn(
        "loading",
        loadingVariants[variant],
        loadingSizes[size],
        className,
      )}
    />
  );
}
