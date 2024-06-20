import {
  CalendarDaysIcon,
  ClockIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";
import { Badge } from "../badges";
import { PingPongIcon } from "../extra-icons";

interface ReservationInfoProps {
  dateReserve: string;
  startTime: string;
  endTime: string;
  tableCode: string;
  user: { firstName: string; lastName: string } | null;
}

export function ReservationInfo({
  dateReserve,
  startTime,
  endTime,
  tableCode,
  user,
}: ReservationInfoProps) {
  return (
    <div>
      <div className="font-title pb-12 text-center">
        <h1 className="text-3xl font-bold">Datos de la reserva</h1>
      </div>
      <div className="flex w-full justify-center">
        <div className="grid grid-cols-2 gap-x-6 gap-y-4 md:gap-x-8">
          <Badge
            labelName="Fecha"
            label={dateReserve}
            leftIcon={
              <CalendarDaysIcon className="text-neutral h-[36px] w-[36px]" />
            }
          />
          <Badge
            labelName="Horario"
            label={`${startTime} a ${endTime}`}
            leftIcon={<ClockIcon className="text-neutral h-[36px] w-[36px]" />}
          />
          <Badge
            labelName="Deporte"
            label="Ping-Pong"
            leftIcon={<PingPongIcon className="h-[36px] w-[36px]" />}
          />
          <Badge
            labelName="Mesa"
            label={tableCode}
            leftIcon={
              <QuestionMarkCircleIcon className="text-neutral h-[36px] w-[36px]" />
            }
          />
        </div>
      </div>
      <h3 className="mt-12 text-center text-lg">
        Responsable de la reserva:{" "}
        <span className="font-bold">
          {user?.firstName} {user?.lastName}
        </span>
      </h3>
    </div>
  );
}
