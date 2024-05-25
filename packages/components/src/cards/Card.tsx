import { Button } from "@spin-spot/components";
import { cn } from "@spin-spot/utils";

interface cardProps{
  labelName?:string;
  label?: string;
  className?: string;
  labelButtom?:string;
  onClick?: () => void;
}

export function Card({
    labelName,
    label, 
    labelButtom,
    onClick,
    className}:cardProps) {
  return (
    <>
      <div className={cn("card w-72 shadow-xl break-all", className)}>
        <figure className="h-50">
          <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
            alt="Shoes"
          />
        </figure>
        <div className="card-body p-5">
          <h2 className="card-title text-2xl font-semibold">{labelName}</h2>
          <p>{label}</p>
          <div className="card-actions justify-start">
            <Button
              className="btn-md btn-primary"
              label={(labelButtom)}
              labelSize="text-md"
              onClick={(onClick)}
            />
          </div>
        </div>
      </div>
    </>
  );
}
