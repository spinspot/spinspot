interface LoaderProps {
  size?: string;
}

export function Loader({ size }: LoaderProps) {
  return <span className={`loading loading-spinner loading-${size}`}></span>;
}
