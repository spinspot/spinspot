import { cn } from "@spin-spot/utils";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  className?: string;
  onChange?: (_event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  topLeftLabel?: string;
  topRightLabel?: string;
  bottomLeftLabel?: string;
  bottomRightLabel?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

export function TextInput({
  type = "text",
  className,
  placeholder,
  onChange,
  topLeftLabel,
  topRightLabel,
  bottomLeftLabel,
  bottomRightLabel,
  iconLeft,
  iconRight,
  ...props
}: TextInputProps) {
  const renderTopLabels = topLeftLabel || topRightLabel;
  const renderBottomLabels = bottomLeftLabel || bottomRightLabel;

  return (
    <label className="form-control w-full max-w-xs">
      {renderTopLabels && (
        <div className="label">
          {topLeftLabel && (
            <span className="label-text text-base">{topLeftLabel}</span>
          )}
          {topRightLabel && (
            <span className="label-text-alt text-base">{topRightLabel}</span>
          )}
        </div>
      )}
      <div className="relative w-full max-w-xs">
        {iconLeft && (
          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            {iconLeft}
          </span>
        )}
        <input
          type={type}
          placeholder={placeholder}
          className={cn(
            "input input-bordered input-primary w-full max-w-xs",
            className,
            {
              "pl-10": iconLeft,
              "pr-10": iconRight,
            },
          )}
          onChange={onChange}
          {...props}
        />
        {iconRight && (
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            {iconRight}
          </span>
        )}
      </div>
      {renderBottomLabels && (
        <div className="label">
          {bottomLeftLabel && (
            <span className="label-text-alt">{bottomLeftLabel}</span>
          )}
          {bottomRightLabel && (
            <span className="label-text-alt">{bottomRightLabel}</span>
          )}
        </div>
      )}
    </label>
  );
}
