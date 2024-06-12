"use client";

import {
  BanknotesIcon,
  BuildingLibraryIcon,
  CalendarDaysIcon,
  ClockIcon,
  TrophyIcon,
} from "@heroicons/react/24/outline";
import { Badge, Button, Countdown, PingPongIcon } from "@spin-spot/components";
import { useToast } from "@spin-spot/services";

export default function TournamentId() {
  const { showToast } = useToast();

  const handleInscribirse = () => {
    showToast({
      label: "¿Seguro que quieres unirte al torneo?",
      type: "warning",
      acceptButtonLabel: "Sí",
      denyButtonLabel: "No",
      //   onAccept() {
      //     funcionAca()
      //   },
      onDeny() {
        showToast({
          label: "Inscripción Cancelada",
          type: "error",
          duration: 2500,
        });
      },
    });
  };

  return (
    <div>
      <div className="relative grid h-64 w-full items-center justify-items-center bg-[url(/tournamentBackGround.svg)] bg-cover bg-center bg-no-repeat md:h-72">
        <div className="absolute inset-0 bg-gray-800 opacity-50"></div>
        <div className="font-title relative text-center">
          <h1 className="flex flex-col text-3xl">
            <span className="text-white">TORNEO</span>
            <span className="text-white">POR LA PAZ</span>
          </h1>
        </div>
      </div>
      <div className="font-title py-10 text-center">
        <h1 className="text-3xl font-bold">Información Relevante 🏆</h1>
      </div>
      <div className="flex w-full justify-center">
        <div className="grid grid-cols-2 gap-x-6 gap-y-4 md:gap-x-8">
          <Badge
            labelName="Fecha"
            label="2024-07-11"
            leftIcon={
              <CalendarDaysIcon className="text-neutral h-[36px] w-[36px]" />
            }
          />
          <Badge
            labelName="Horario"
            label={`2:00-pm a 5:00pm`}
            leftIcon={<ClockIcon className="text-neutral h-[36px] w-[36px]" />}
          />
          <Badge
            labelName="Modalidad"
            label="1 VS 1"
            leftIcon={<PingPongIcon className="h-[36px] w-[36px]" />}
          />
          <Badge
            labelName="Sede"
            label={"Unimet"}
            leftIcon={
              <BuildingLibraryIcon className="text-neutral h-[36px] w-[36px]" />
            }
          />
          <Badge
            labelName="Formato"
            label={"Eliminación"}
            leftIcon={<TrophyIcon className="text-neutral h-[36px] w-[36px]" />}
          />
          <Badge
            labelName="Precio"
            label={"10$"}
            leftIcon={
              <BanknotesIcon className="text-neutral h-[36px] w-[36px]" />
            }
          />
        </div>
      </div>
      <div className="my-10 flex flex-col items-center justify-center gap-8">
        <div className="text-3xl font-bold">Tiempo Restante</div>
        <Countdown></Countdown>
        <div className="text-3xl font-bold">Juagdores Inscritos 4/16</div>
        <Button
          label="Inscribirse"
          className="btn-primary btn-lg w-72"
          onClick={handleInscribirse}
        ></Button>
      </div>
    </div>
  );
}
