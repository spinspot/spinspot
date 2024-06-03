"use client";

import { Button, Pagination, SelectInput } from "@spin-spot/components";
import {
  ApiError,
  TCreateBookingInputDefinition,
  TCreateTimeBlockInputDefinition,
  TUpdateBookingInputDefinition,
} from "@spin-spot/models";
import {
  useCreateBooking,
  useCreateTimeBlock,
  useToast,
  useUpdateBooking,
} from "@spin-spot/services";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const { showToast } = useToast();
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [pendingUpdate, setPendingUpdate] = useState(false);

  const { mutate: createBooking } = useCreateBooking();
  const { mutate: updateBooking } = useUpdateBooking();
  const { mutate: createTimeBlock } = useCreateTimeBlock();

  const handleLoginClick = () => {
    router.push("/login");
  };

  const handleShowToast = () => {
    showToast({
      label: "This is a warning toast!",
      type: "error",
      duration: 5000,
    });
  };

  const handleCreateTimeBlock = () => {
    const startTime = new Date("2024-06-25T13:00:00-04:00");
    const endTime = new Date("2024-06-25T14:30:00-04:00");

    const newTimeBlock: TCreateTimeBlockInputDefinition = {
      table: "665213fa379bfd2db7c0df6f",
      startTime: startTime,
      endTime: endTime,
      status: "AVAILABLE", // Puede ser "Available", "Booked", "Pending", etc.
    };

    createTimeBlock(newTimeBlock, {
      onSuccess: () => {
        showToast({
          label: "Se ha generado el TimeBlock!",
          type: "success",
          duration: 3000,
        });
      },
      onError: (err) => {
        if (err instanceof ApiError)
          err.errors.forEach((error) =>
            showToast({
              label: error.message,
              type: "error",
              duration: 3000,
            }),
          );
      },
    });
  };

  const handleCreateBooking = () => {
    const newBooking: TCreateBookingInputDefinition = {
      //Esto solo lo pongo aqui para no tener que ponerle un poco de inputs
      eventType: "1V1", // Debe ser 1V1 o 2V2
      owner: "664e51c4814d7dd13fd0db5f",
      table: "6652192d3fd0ad8d090d21f0",
      players: [],
      timeBlock: "66522937a5b3c9fcf6e6fa4c",
      status: "PENDING", // Debe ser PENDING, IN PROGRESS o FINISHED
    };

    createBooking(newBooking, {
      onSuccess: (data) => {
        setBookingId(data._id.toString()); //Esto lo puedes ignorar, es solo para que funcione bien el update despues
        showToast({ label: "Booking created successfully!", type: "success" });
      },
      onError: () => {
        showToast({ label: "Failed to create booking", type: "error" });
      },
    });
  };

  useEffect(() => {
    //Esto es solo para que funcione bien el update despues
    if (pendingUpdate && bookingId) {
      handleUpdateBooking();
    }
  }, [bookingId, pendingUpdate]);

  const handleUpdateBooking = () => {
    if (!bookingId) {
      showToast({ label: "No booking to update", type: "warning" });
      return;
    }

    const updatedBooking: TUpdateBookingInputDefinition = {
      //Esto es para no tener que usar yo los inputs, pero tu lo haces desde el front que creaste
      eventType: "2V2",
      status: "FINISHED",
    };

    updateBooking(
      //Asi es que tu vas a usar realmente el Update, obtienes el ID de la Reserva (por ejemplo si abres el boton de editar desde el timeblock
      //Puedes obtener el id del booking con timeblock.booking._id y ya despues le pasas los parametros que quieras actualizar
      { _id: bookingId, ...updatedBooking },
      {
        onSuccess: () => {
          showToast({
            label: "Booking updated successfully!",
            type: "success",
          });
        },
        onError: () => {
          showToast({ label: "Failed to update booking", type: "error" });
        },
      },
    );
  };

  const initiateUpdateBooking = () => {
    //Esto es solo para que funcione bien el update
    setPendingUpdate(true);
    setBookingId("665936975e60876f1abb8c4d");
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-5 text-lg font-bold">
      HomePage 🚧
      <Button
        label="Login"
        className="btn-primary"
        onClick={handleLoginClick}
      />
      <Pagination labels={["1", "2", "3", "4", "5"]} className="btn-neutral" />
      <SelectInput
        options={[
          "Harry Potter",
          "Planeta De los Simios",
          "StarTrek",
          "Star Wars",
        ]}
        defaultOption="Pick A Movie!"
        topRightLabel="Hola papi"
        className="select-primary"
      />
      <Button label="Show Toast" onClick={handleShowToast}></Button>
      <Button label="Create Booking" onClick={handleCreateBooking}></Button>
      <Button label="Update Booking" onClick={initiateUpdateBooking}></Button>
      <Button label="Create TimeBlock" onClick={handleCreateTimeBlock}></Button>
    </div>
  );
}
