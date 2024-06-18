"use client";

import {
  Button,
  LayoutWaves,
  ReservationInfo,
  TextInput,
} from "@spin-spot/components";
import { useTimeBlock } from "@spin-spot/services";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface InvitationParams {
  timeBlockId: string;
}
export default function Invitation({ params }: { params: InvitationParams }) {
  const timeBlock = useTimeBlock(params.timeBlockId);
  const router = useRouter();
  const handleClick = () => {
    router.push("/");
  };
  const [confirm, setConfirm] = useState<string | null>(null);

  const handleConfirm = () => {
    setConfirm("SI");
  };

  return (
    <LayoutWaves>
      <div className="font-body flex-grow items-center justify-center py-32">
        <h1 className="mt-6 text-center text-3xl font-bold">Invitacion</h1>
        <div className="font-title  w-full pt-5 text-center font-normal md:h-60"></div>
        {timeBlock.isSuccess && (
          <ReservationInfo
            dateReserve={new Date(timeBlock.data.startTime)
              .toLocaleDateString([], {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })
              .replace(/\//g, "-")}
            startTime={new Date(timeBlock.data.startTime).toLocaleTimeString(
              [],
              {
                hour: "2-digit",
                minute: "2-digit",
              },
            )}
            endTime={new Date(timeBlock.data.endTime).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
            tableCode={timeBlock.data.table.code}
            user={null}
          />
        )}
        <h2 className="mt-5 pb-3 text-center text-xl">
          ¿Deseas unirte a la partida de pepe?
        </h2>
        <div className="mt-6 flex flex-row justify-center gap-x-6">
          <Button
            className="btn-md btn-primary mx-2"
            label="No"
            labelSize="text-md"
            onClick={handleClick}
          />
          <Button
            className="btn-md btn-primary mx-2"
            label="Si"
            labelSize="text-md"
            onClick={handleConfirm}
          />
        </div>
        {confirm === "SI" && (
          <div className="flex flex-col items-center justify-center gap-4">
            <h3 className="mt-5 pb-2 text-center text-lg">
              Ingresa tu nombre y apellido para poder unirte a la reserva
            </h3>
            <TextInput
              placeholder="First Name"
              topRightLabel="First Name"
              className=""
              bottomLeftLabel=""
            />
            <TextInput
              placeholder="Last Name"
              topRightLabel="Last Name"
              className=""
              bottomLeftLabel=""
            />
            <Button
              className="btn-md btn-primary mx-2"
              label="Unirse"
              labelSize="text-md"
            />
          </div>
        )}
      </div>
    </LayoutWaves>
  );
}
