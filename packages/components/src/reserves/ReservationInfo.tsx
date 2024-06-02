import React from "react";
import { Badge } from "../badges";
import { GoogleIcon } from "../extra-icons";

interface ReservationInfoProps {
  dateReserve: string;
  startTime: string;
  endTime: string;
  tableCode: string;
  user: { firstName: string; lastName: string } | null;
}

export const ReservationInfo: React.FC<ReservationInfoProps> = ({
  dateReserve,
  startTime,
  endTime,
  tableCode,
  user,
}) => (
  <div>
    <div className="font-title pb-12 text-center">
      <h1 className="text-3xl font-bold">Datos de la reserva</h1>
    </div>
    <div className="flex w-full justify-center">
      <div className="grid grid-cols-2 gap-x-8 gap-y-4">
        <Badge
          labelName="Fecha"
          label={dateReserve}
          leftIcon={<GoogleIcon />}
        />
        <Badge
          labelName="Horario"
          label={`${startTime} to ${endTime}`}
          leftIcon={<GoogleIcon />}
        />
        <Badge
          labelName="Deporte"
          label="Ping-Pong"
          leftIcon={<GoogleIcon />}
        />
        <Badge labelName="Mesa" label={tableCode} leftIcon={<GoogleIcon />} />
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
