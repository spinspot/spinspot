import { cn } from "@spin-spot/utils";

interface AlertProps {
  label: string;
  type?: "alert" | "info" | "success" | "warning" | "error";
  className?: string;
  denyButtonLabel?: string;
  acceptButtonLabel?: string;
  onDeny?: () => void;
  onAccept?: () => void;
}

const alertIcons = {
  alert: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      className="stroke-info h-6 w-6 shrink-0"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      ></path>
    </svg>
  ),
  info: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      className="h-6 w-6 shrink-0 stroke-current"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      ></path>
    </svg>
  ),
  success: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 shrink-0 stroke-current"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  warning: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 shrink-0 stroke-current"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
      />
    </svg>
  ),
  error: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 shrink-0 stroke-current"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
};

const alertColors = {
  alert: "",
  info: "alert-info",
  success: "alert-success",
  warning: "alert-warning",
  error: "alert-error",
};

export function Alert({
  label,
  type = "alert",
  className,
  denyButtonLabel,
  acceptButtonLabel,
  onDeny,
  onAccept,
}: AlertProps) {
  return (
    <div role="alert" className={cn("alert", alertColors[type], className)}>
      {alertIcons[type]}
      <span>{label}</span>
      {(denyButtonLabel || acceptButtonLabel) && (
        <div className="flex gap-2">
          {denyButtonLabel && (
            <button className="btn btn-sm" onClick={onDeny}>
              {denyButtonLabel}
            </button>
          )}
          {acceptButtonLabel && (
            <button className="btn btn-sm btn-primary" onClick={onAccept}>
              {acceptButtonLabel}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
