'use client';

import { Calendar, Button, Pagination } from "@spin-spot/components";
import { useTables, useTimeBlocks } from "@spin-spot/services";
import { useState, useEffect } from "react";

export default function Page() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const { data: tables, isLoading: isTablesLoading } = useTables();
  const [selectedTable, setSelectedTable] = useState<string | undefined>(undefined);
  const { data: timeBlocks, isLoading: isTimeBlocksLoading } = useTimeBlocks(selectedTable);

  useEffect(() => {
    if (tables?.length) {
      setSelectedTable(tables[0]?.code); // Seleccionar la primera mesa por defecto
    }
  }, [tables]);

  function handleReserve(timeBlockId: string) {
    console.log(`Reserva solicitada para el bloque de tiempo con ID: ${timeBlockId}`);
  }

  function handleCancel(timeBlockId: string) {
    console.log(`Cancelar reserva solicitada para el bloque de tiempo con ID: ${timeBlockId}`);
  }

  const filterTimeBlocks = (blocks: any[]) => {
    if (!selectedDate || !selectedTable) return [];
    return blocks.filter(block => {
      const blockDate = new Date(block.startTime);
      // Filtrar por fecha y código de mesa
      return (
        blockDate.getDate() === selectedDate.getDate() &&
        blockDate.getMonth() === selectedDate.getMonth() &&
        blockDate.getFullYear() === selectedDate.getFullYear() &&
        block.table.code === selectedTable
      );
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
        onPageChange={setSelectedTable}
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
            {filterTimeBlocks(timeBlocks || []).map((block: any) => (
              <tr key={block._id}>
                <td>{new Date(block.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                <td>
                  {block.status === "Available" && (
                    <Button
                      className="btn-primary btn-sm"
                      label="Reservar"
                      labelSize="text-md"
                      onClick={() => handleReserve(block._id)}
                    />
                  )}
                  {block.status === "Booked" && <span>Reservado</span>}
                </td>
                <td>{block.table.code}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}




//Como abordar los filtros y los datos
//Primero se filtran los timeblocks por dia (hecho)
//Se filtran los timeblocks por mesa 
//Si no hya filtro de mesa, se ponen todas y ademas se pone la mesa de cada timeblock (medio opcional)
//Se muestra el estado del timeblock
//Si el timeblock esta disponible, se muestra un boton para reservar (hecho)
//Si el timeblock esta reservado y estan todos los jugares (2 pa 1v1 y 4 pa 2v2) se muestra un mensaje de reservado (hecho)
//si el timeblock esta reservado pero hay espacio para jugadores en la reserva, poner el boton de unirse
//Si el timeblock esta reservado y el usuario es el que reservo, poner el boton de cancelar reserva y editar reserva



