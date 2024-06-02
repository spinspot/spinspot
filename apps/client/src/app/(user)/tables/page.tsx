"use client";

import { Button, Calendar, Loader, Pagination } from "@spin-spot/components";
import { IPopulatedTimeBlock } from "@spin-spot/models";
import { useAuth, useTables, useTimeBlocks, useToast, useUpdateBooking, useUpdateTimeBlock } from "@spin-spot/services";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function Page() {

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(),
  );
  const { data: tables } = useTables();
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const { data: timeBlocks, isLoading } = useTimeBlocks(
    selectedTable || undefined,
  ); 
  const { user } = useAuth(); 
  const router = useRouter();
  const {showToast} = useToast();
  const {mutate: updateBooking} = useUpdateBooking();
  const {mutate: updateTimeBlock} = useUpdateTimeBlock();

  const handleShowCancelationToast = (timeBlockId: string, bookingId: string) => { 
    showToast({
      label: "¿Seguro que quieres cancelar la reserva?",
      type: "info",
      acceptButtonLabel: "Sí",
      denyButtonLabel: "No",
      onAccept() {
        handleCancelReservation(timeBlockId, bookingId); 
      },
      onDeny() {
        showToast({
          label: "Reserva no cancelada",
          type: "error",
        });
      },
    });
    };

    const handleCancelReservation = async (timeBlockId: string, bookingId: string) => {
      try {
        updateBooking({
          _id: bookingId,
          status: "FINISHED"
        });
        updateTimeBlock({
          _id: timeBlockId,
          status: "AVAILABLE",
          booking: null
        });
        showToast({
          label: "Reserva cancelada",
          type: "success",
        });
      } catch (error) {
        console.error("Error al cancelar la reserva:", error);
        showToast({
          label: "Error al cancelar la reserva",
          type: "error",
        });
      }
    };

  useEffect(() => {
    if (tables?.length) {
      setSelectedTable(null); // No seleccionar ninguna mesa por defecto
    }
  }, [tables]);

  function handleReserve(timeBlockId: string) {
    router.push(`/reserve/${timeBlockId}`);
    console.log(
      `Reserva solicitada para el bloque de tiempo con ID: ${timeBlockId}`,
    );
  }


  function handleEdit(timeBlockId: string) {
    console.log(
      `Editar reserva solicitada para el bloque de tiempo con ID: ${timeBlockId}`,
    );
  }

  function handleJoin(timeBlockId: string) {
    console.log(
      `Unirse a la reserva solicitada para el bloque de tiempo con ID: ${timeBlockId}`,
    );
  }

  const filteredTimeBlocks = useMemo<IPopulatedTimeBlock[]>(() => {
    if (!selectedDate || !timeBlocks) return [];
    return timeBlocks.filter((block) => {
      const blockDate = new Date(block.startTime);
      // Filtrar por fecha y, si hay una mesa seleccionada, por el código de mesa
      const isSameDate =
        blockDate.getDate() === selectedDate.getDate() &&
        blockDate.getMonth() === selectedDate.getMonth() &&
        blockDate.getFullYear() === selectedDate.getFullYear();
      const isSameTable = selectedTable
        ? block.table.code === selectedTable
        : true;
      return isSameDate && isSameTable;
    });
  }, [timeBlocks, selectedDate, selectedTable]);

  return (
    <div className="inset-0 z-40 my-3 flex flex-col items-center justify-center">
      <h1 className="mt-6 text-center text-3xl font-bold">
        Reservas de Mesas de Ping Pong 🏓
      </h1>
      <Calendar onDateChange={setSelectedDate} />
      <h3 className="mb-3 text-xl font-bold">Mesa</h3>
      <Pagination
        className="btn-neutral"
        labels={tables?.map((table) => table.code) || []}
        onPageChange={(label) => setSelectedTable(label ?? null)} // Si no hay mesa seleccionada, se pone null
      />
      <div className="mt-2 w-full overflow-x-auto p-4 sm:w-4/5">
        {isLoading ? (
          <div className="flex items-center justify-center">
            <Loader
              className="text-primary dark:text-neutral"
              size="lg"
              variant="dots"
            />{" "}
          </div>
        ) : (
          <table className="table-lg table w-full items-center justify-center text-center">
            <thead>
              <tr>
                <th className="w-[125px]">Horarios</th>
                <th>Estado</th>
                <th className="w-[125px]">Mesa</th>
              </tr>
            </thead>
            <tbody>
              {filteredTimeBlocks.map((block) => {
                const playersCount = block.booking?.players?.length || 0;
                const maxPlayers =
                  block.booking?.eventType === "1V1"
                    ? 2
                    : block.booking?.eventType === "2V2"
                      ? 4
                      : 0; // Variable para ver la cantidad maxima de jugadores que puede tener un evento

                return (
                  <tr key={`${block._id}`}>
                    <td>
                      {new Date(block.startTime).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td>
                      {block.status.toLowerCase() === "available" && (
                        <Button
                          className="btn-primary btn-sm"
                          label="Reservar"
                          labelSize="text-md"
                          onClick={() => handleReserve(`${block._id}`)}
                        />
                      )}
                      {block.status.toLowerCase() === "booked" &&
                        user?._id === block.booking?.owner && (
                          <>
                            <Button
                              className="btn-secondary btn-sm mx-2"
                              label="Cancelar"
                              labelSize="text-md"
                              onClick={() => handleShowCancelationToast(block._id.toString(), block.booking?._id.toString())}
                            />
                            <Button
                              className="btn-primary btn-sm mx-2"
                              label="Editar"
                              labelSize="text-md"
                              onClick={() => handleEdit(`${block._id}`)}
                            />
                          </>
                        )}
                      {block.status === "BOOKED" &&
                        user?._id !== block.booking?.owner &&
                        playersCount < maxPlayers && (
                          <>
                            <Button
                              className="btn-primary btn-sm mx-2"
                              label="Unirse"
                              labelSize="text-md"
                              onClick={() => handleJoin(`${block._id}`)}
                            />
                            <span>{`${playersCount}/${maxPlayers}`}</span>
                          </>
                        )}
                      {block.status === "BOOKED" &&
                        user?._id !== block.booking?.owner &&
                        playersCount === maxPlayers && <span>Reservado</span>}
                    </td>
                    <td>{block.table.code}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
