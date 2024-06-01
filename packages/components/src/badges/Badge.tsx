import { cn } from "@spin-spot/utils";
interface BadgeProps {
  labelName?: string;
  label?: string;
  leftIcon?: React.ReactNode;
  className?: string;
}

export function Badge({ labelName, label, leftIcon, className }: BadgeProps) {
  return (
    <div
      className={cn(
        "badge badge-outline border-primary bg-base-200 flex h-20 w-44 justify-start border-[3.3px] dark:bg-transparent",
        className,
      )}
    >
      {leftIcon && <span className="flex w-1/4 justify-end">{leftIcon}</span>}

      <div className="col-span-2 flex w-full flex-col justify-center justify-items-center text-center">
        <span className="text-[17px] font-bold">{label}</span>
        <span className="text-base font-bold text-gray-500">{labelName}</span>
      </div>
    </div>
  );
}
