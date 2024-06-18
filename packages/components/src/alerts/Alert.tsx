import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
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
  alert: <InformationCircleIcon className="h-6 w-6"></InformationCircleIcon>,
  info: <InformationCircleIcon className="h-6 w-6"></InformationCircleIcon>,
  success: <CheckCircleIcon className="h-6 w-6"></CheckCircleIcon>,
  warning: (
    <ExclamationTriangleIcon className="h-6 w-6"></ExclamationTriangleIcon>
  ),
  error: <XCircleIcon className="h-6 w-6"></XCircleIcon>,
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
            <button className="btn btn-sm dark:text-white" onClick={onDeny}>
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
