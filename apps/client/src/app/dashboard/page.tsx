import { Card } from "@spin-spot/components";
var cant = 3;

export default function Dashboard() {
  return (
    <div className="flex-grow">
      <div className="grid h-56 w-full items-center justify-items-center bg-black md:h-60">
        <div className="font-quicksand text-center font-normal">
          <h1 className="text-2xl">PING PONG</h1>
          <h1 className="text-2xl">UNIMET</h1>
        </div>
      </div>
      <div className="font-quicksand h-56  w-full pt-5 text-center font-normal md:h-60">
        <h1 className="text-1xl h-10">¡Bienvenido a Spin-Spot! </h1>
        <p className="px-6 pb-5 text-center">
          En esta página podrás realizar las reservas de las nuevas canchas de
          Ping Pong disponibles para los estudiantes.{" "}
        </p>
        <button className="btn btn-active bg-primary h-16 w-72 text-white">
          ¿Estas listo para empezar a jugar?
        </button>
      </div>
      <div className="font-quicksand w-full pt-10 text-center font-normal md:h-20">
        <h1 className="h-10 text-2xl">Torneos activos</h1>
      </div>

      <div className="carousel carousel-center w-full space-x-8  bg-inherit p-4 md:justify-center">
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
}
