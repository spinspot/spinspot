import { cn } from "@spin-spot/utils";

interface LoaderProps {
  size?: "xs" | "sm" | "md" | "lg";
  variant?: "spinner" | "dots" | "ring" | "ball" | "bars" | "infinity";
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

export function Loader({ size = "md", variant = "spinner" }: LoaderProps) {
  const variantClass =
    variant === "spinner" ? "loading-spinner" : "loading-dots";

  return (
    <span
      className={cn("loading", loadingVariants[variant], loadingSizes[size])}
    ></span>
  );
}
