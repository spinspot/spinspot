import { cn } from "@spin-spot/utils";

interface LoaderProps {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "spinner" | "dots";
}

const loadingSizes = {
  sm: "loading-sm",
  md: "loading-md",
  lg: "loading-lg",
  xl: "loading-xl",
};

export function Loader({ size = "md", variant = "spinner" }: LoaderProps) {
  const variantClass =
    variant === "spinner" ? "loading-spinner" : "loading-dots";

  return (
    <span className={cn("loading", variantClass, loadingSizes[size])}></span>
  );
}
