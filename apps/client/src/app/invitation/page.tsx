"use client";

import {
  Button,
  LayoutWaves,
  ReservationInfo,
  TextInput,
} from "@spin-spot/components";
import { useTimeBlock } from "@spin-spot/services";
import { useRouter } from "next/navigation";

interface InvitationProps {
  timeBlockId: string;
  reservationOwner: { firstName: string; lastName: string } | null;
}
export default function Invitation({
    timeBlockId,
    reservationOwner,
}: InvitationProps) {
  const timeBlock = useTimeBlock(timeBlockId);
  const router = useRouter();
  const handleClick = () => {
    router.push("/");
  };

  return (
    <LayoutWaves>
      <div className="font-body flex-grow py-32">
        <h1 className="mt-6 text-center text-3xl font-bold">Invitacion</h1>
        <div className="font-title h-56  w-full pt-5 text-center font-normal md:h-60">
          <h2 className="pb-3 text-xl">
            ¿Deseas aceptar la invitacion de {reservationOwner?.firstName} para la siguiente reserva?
          </h2>
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
              user={reservationOwner}
            />
          )}
          <div className="flex flex-col gap-4">
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
          </div>
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
          />
        </div>
      </div>
    </LayoutWaves>
  );
}
