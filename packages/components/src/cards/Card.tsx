import { Button } from "@spin-spot/components";

export function Card() {
  return (
    <>
      <div className="carousel-item card h-90 w-72 shadow-xl">
        <figure className="h-50">
          <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
            alt="Shoes"
          />
        </figure>
        <div className="card-body p-5">
          <h2 className="card-title text-2xl font-semibold">Torneo</h2>
          <p>Card text content</p>
          <div className="card-actions justify-start">
            <Button
              className="btn-sm btn-neutral w-25 h-10"
              label="Ver evento"
              labelSize="text-md"
            />
          </div>
        </div>
      </div>
    </>
  );
}
