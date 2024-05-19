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
}

export function TextInput({
  type,
  className,
  placeholder,
  onChange,
  topLeftLabel,
  topRightLabel,
  bottomLeftLabel,
  bottomRightLabel,
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
      <input
        type={type}
        placeholder={placeholder}
        className={cn("input input-bordered w-full max-w-xs", className)}
        onChange={onChange}
      />
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
