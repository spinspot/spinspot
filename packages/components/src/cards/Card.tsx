import { Button } from "@spin-spot/components";
import { cn } from "@spin-spot/utils";

interface cardProps{
  label?: string;
  className?: string;
}

export function Card({
    label, 
    className}:cardProps) {
  return (
    <>
      <div className={cn("card w-72 shadow-xl", className)}>
        <figure className="h-50">
          <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
            alt="Shoes"
          />
        </figure>
        <div className="card-body p-5">
          <h2 className="card-title text-2xl font-semibold">Torneo</h2>
          <p>{label}</p>
          <div className="card-actions justify-start">
            <Button
              className="btn-md btn-neutral"
              label="Ver evento"
              labelSize="text-md"
            />
          </div>
        </div>
      </div>
    </>
  );
}
