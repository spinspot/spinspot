import { cn } from "@spin-spot/utils";

interface BadgeProps {
    labelName?: string;
    label?: string;
    leftIcon?: React.ReactNode;
    className?: string;

}

export function Badges({
    labelName,
    label,
    leftIcon,
    className
}:BadgeProps){
    return(
        <div className="badge badge-outline h-20 w-44 border-[3.3px] border-primary flex justify-start">
                {leftIcon && <span className="flex justify-end w-1/4">{leftIcon}</span>}

            <div className="flex flex-col justify-center justify-items-center w-full text-center col-span-2"> 
                <span className="text-[17px]">{label}</span>
                <span className="text-base text-neutral-content">{labelName}</span>

            </div>
        </div>
    );
}
