'use client';

import { Calendar, Button, Pagination } from "@spin-spot/components";
import { useTables, useTimeBlocks } from "@spin-spot/services";
import { useAuth } from "@spin-spot/services"; 
import { useState, useEffect } from "react";

export default function Page() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const { data: tables } = useTables();
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const { data: timeBlocks } = useTimeBlocks(selectedTable||undefined); //obtiene las timeblocks de las mesas, si no hay ninguna seleccionada, trae todas
  const { user } = useAuth(); // Obtiene la información del usuario logeado

  useEffect(() => {
    if (tables?.length) {
      setSelectedTable(null); // No seleccionar ninguna mesa por defecto
    }
  }, [tables]);

  function handleReserve(timeBlockId: string) {
    console.log(`Reserva solicitada para el bloque de tiempo con ID: ${timeBlockId}`);
  }

  function handleCancel(timeBlockId: string) {
    console.log(`Cancelar reserva solicitada para el bloque de tiempo con ID: ${timeBlockId}`);
  }

  function handleEdit(timeBlockId: string) {
    console.log(`Editar reserva solicitada para el bloque de tiempo con ID: ${timeBlockId}`);
  }

  function handleJoin(timeBlockId: string) {
    console.log(`Unirse a la reserva solicitada para el bloque de tiempo con ID: ${timeBlockId}`);
  }

  const filterTimeBlocks = (blocks: any[]) => {
    if (!selectedDate) return [];
    return blocks.filter(block => {
      const blockDate = new Date(block.startTime);
      // Filtrar por fecha y, si hay una mesa seleccionada, por el código de mesa
      const isSameDate = (
        blockDate.getDate() === selectedDate.getDate() &&
        blockDate.getMonth() === selectedDate.getMonth() &&
        blockDate.getFullYear() === selectedDate.getFullYear()
      );
      const isSameTable = selectedTable ? block.table.code === selectedTable : true;
      return isSameDate && isSameTable;
    });
  };

  return (
    <div className="inset-0 z-40 my-3 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-5">Reservas de Mesas de Ping Pong</h1>
      <Calendar onDateChange={setSelectedDate} />
      <h3 className="text-xl font-bold mb-3">Mesa</h3>
      <Pagination
        className="btn-neutral"
        labels={tables?.map(table => table.code) || []}
        onPageChange={label => setSelectedTable(label ?? null)} // Si no hay mesa seleccionada, se pone null
      />
      <div className="overflow-x-auto mt-2">
        <table className="table w-full justify-center items-center text-center">
          <thead>
            <tr>
              <th>Horarios</th>
              <th>Estado</th>
              <th>Mesa</th>
            </tr>
          </thead>
          <tbody>
            {filterTimeBlocks(timeBlocks || []).map((block: any) => {
              const playersCount = block.booking?.players?.length || 0;
              const maxPlayers = block.booking?.eventType === "1v1" ? 2 : block.booking?.eventType === "2v2" ? 4 : 0; //Variable para ver la cantidad maxima de jugadores que puede tener un evento

              return (
                <tr key={block._id}>
                  <td>{new Date(block.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                  <td>
                    {block.status.toLowerCase() === "available" && (
                      <Button
                        className="btn-primary btn-sm"
                        label="Reservar"
                        labelSize="text-md"
                        onClick={() => handleReserve(block._id)}
                      />
                    )}
                    {block.status.toLowerCase() === "booked" && user?._id === block.booking?.owner && ( 
                      <>
                        <Button
                          className="btn-secondary btn-sm mx-2"
                          label="Cancelar"
                          labelSize="text-md"
                          onClick={() => handleCancel(block._id)}
                        />
                        <Button
                          className="btn-primary btn-sm mx-2"
                          label="Editar"
                          labelSize="text-md"
                          onClick={() => handleEdit(block._id)}
                        />
                      </>
                    )}
                    {block.status.toLowerCase() === "booked" && user?._id !== block.booking?.owner && playersCount < maxPlayers && (
                      <>
                        <Button
                          className="btn-primary btn-sm mx-2"
                          label="Unirse"
                          labelSize="text-md"
                          onClick={() => handleJoin(block._id)}
                        />
                        <span>{`${playersCount}/${maxPlayers}`}</span>
                      </>
                    )}
                    {block.status.toLowerCase() === "booked" && user?._id !== block.booking?.owner && playersCount === maxPlayers && (
                      <span>Reservado</span>
                    )}
                  </td>
                  <td>{block.table.code}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}



