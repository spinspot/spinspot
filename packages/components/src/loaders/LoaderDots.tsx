interface LoaderDotsProps {
  size?: string;
}

export function LoaderDots({ size }: LoaderDotsProps) {
  return <span className={`loading loading-dots loading-${size}`}></span>;
}
