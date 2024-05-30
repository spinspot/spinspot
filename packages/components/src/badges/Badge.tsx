import { cn } from "@spin-spot/utils";

interface BadgeProps {
    labelName?: string;
    label?: string;
    className?: string;

}

export function Badges(){
    return(
        <div>
            <span className="badge">Badge</span>
        </div>
    );
}