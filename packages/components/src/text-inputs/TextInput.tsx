import { cn } from "@spin-spot/utils";
import { forwardRef } from "react";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  topLeftLabel?: string;
  topRightLabel?: string;
  bottomLeftLabel?: string;
  bottomRightLabel?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  function TextInput(
    {
      className,
      topLeftLabel,
      topRightLabel,
      bottomLeftLabel,
      bottomRightLabel,
      iconLeft,
      iconRight,
      ...props
    },
    ref,
  ) {
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
            ref={ref}
            className={cn(
              "input input-bordered input-primary w-full max-w-xs",
              className,
              {
                "pl-10": iconLeft,
                "pr-10": iconRight,
              },
            )}
            {...props}
          />
          {iconRight && (
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              {iconRight}
            </span>
          )}
        </div>
        {renderBottomLabels && (
          <div className="label mx-1 mt-2 p-0">
            {bottomLeftLabel && (
              <span className="label-text-alt text-error">
                {bottomLeftLabel}
              </span>
            )}
            {bottomRightLabel && (
              <span className="label-text-alt">{bottomRightLabel}</span>
            )}
          </div>
        )}
      </label>
    );
  },
);
