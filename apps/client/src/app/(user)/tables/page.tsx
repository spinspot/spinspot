'use client';

import { Calendar, Button, Pagination } from "@spin-spot/components";


export default function page() {

  const reservations = {
    "7:00": "Reservado Completo",
    "8:30": "Reservado incompleto (unirse)",
    "10:00": "Disponible",
    "11:30": "Reservado por Ti",
  };

  function handleReserve(time: any) {
    // lógica para reservar
    console.log(`Reserva solicitada para las ${time}`);
  }

  function handleCancel(time: any) {
    // lógica para cancelar reserva
    console.log(`Cancelar reserva solicitada para las ${time}`);
  }

  function handleEdit(time: any) {
    // lógica para editar reserva
    console.log(`Editar reserva solicitada para las ${time}`);
  }

  function handleJoin(time: any) {
    // lógica para unirse a una reserva
    console.log(`Unirse a la reserva solicitada para las ${time}`);
  }

  const renderButton = (status: any, time: any) => {
    switch (status) {
      case "Disponible":
        return (
          <Button
            className="btn-primary btn-sm"
            label="Reservar"
            labelSize="text-md"
            onClick={() => handleReserve(time)}
          />
        );
      case "Reservado por Ti":
        return (
          <>
            <Button
              className="btn-secondary btn-sm m-2"
              label="Eliminar"
              labelSize="text-md"
              onClick={() => handleCancel(time)}
            />
            <Button
              className="btn-sm btn-neutral m-2"
              label="Editar"
              labelSize="text-md"
              onClick={() => handleEdit(time)}
            />
          </>
        );
      case "Reservado incompleto (unirse)":
        return (
          <Button
            className="btn-sm btn-neutral "
            label="Unirse"
            labelSize="text-md"
            onClick={() => handleJoin(time)}
          />
        );
      case "Reservado Completo":
        return <span>Reservado</span>;
      default:
        return null;
    }
  };

  return (
    <div className="inset-0  z-40 my-3 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-5">Reservas de Mesas de Ping Pong</h1>
      <Calendar/>
      <h3 className="text-xl font-bold mb-3">Mesa</h3>
      <Pagination className="btn-neutral" labels={['1','2','3','4','5','6','7']}>
      </Pagination>
      <div className="overflow-x-auto mt-2">
        <table className="table w-full justify-center items-center text-center">
          <thead>
            <tr>
              <th>Horarios</th>
              <th>Número de Mesa</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(reservations).map((time) => (
              <tr key={time}>
                <td>{time}</td>
                <td>{renderButton(reservations[time as keyof typeof reservations], time)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
