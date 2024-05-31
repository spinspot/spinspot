"use client";

import {
  Badges,
  Button,
  GoogleIcon,
  Pagination,
  SelectInput,
  TextInput,
} from "@spin-spot/components";
import { useAuth } from "@spin-spot/services";
import { useState } from "react";

export default function Reserve() {
  const { user } = useAuth();
  const userName = user?.firstName;
  const options = ["Single 1 Vs 1", "Double 2 Vs 2"];
  const optinosNo = ["NO", "Si"];
  const players = ["Andres", "Fabrizio", "Mich", "Dani"];

  const [eventType, setEventType] = useState<string | null>(null);
  const [indumentary, setIndumentary] = useState<string | null>(null);
  console.log(eventType);
  console.log("Quier indumentaria? :" + indumentary);
  return (
    <div className="font-body flex-grow py-32">
      <div className="font-title pb-12 text-center">
        <h1 className="text-3xl font-bold">Datos de la reserva</h1>
      </div>

      <div className="flex w-full justify-center">
        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
          <Badges
            labelName="Fecha"
            label="2024-05-12"
            leftIcon={<GoogleIcon />}
          />
          <Badges
            labelName="Horario"
            label="8:30 -> 10:00"
            leftIcon={<GoogleIcon />}
          />
          <Badges
            labelName="Deporte"
            label="Ping-Pong"
            leftIcon={<GoogleIcon />}
          />
          <Badges labelName="Mesa" label="3" leftIcon={<GoogleIcon />} />
        </div>
      </div>

      <h3 className="mt-9 flex justify-center text-xl">
        {" "}
        <span className="mr-1">Reservado por: </span>{" "}
        <span className="font-bold">{userName}</span>
      </h3>
      <div className="mt-6 flex flex-col items-center">
        <h3 className="mr-1 text-lg">Seleccione modalidad: </h3>
        <Pagination
          labels={options}
          size="sm"
          onPageChange={(label) => setEventType(label ?? null)}
          className="btn-neutral mt-2 min-w-28 text-nowrap"
        />
      </div>
      <div className="mt-6 flex flex-col items-center justify-center">
        <span className=" text-lg">Filtro de busqueda para jugadores:</span>
        <TextInput placeholder="Type here" className="mt-2" />
        <>
          {eventType === null ? (
            <></>
          ) : (
            <div className="mt-10">
              {eventType === "Single 1 Vs 1" ? (
                <div>
                  <span className=" mt-4 text-lg">Seleccione Jugador:</span>
                  <SelectInput
                    options={players}
                    defaultOption="Pick one option"
                    disabled={false}
                    className="my-3"
                  />
                </div>
              ) : (
                <div>
                  <span className=" mt-4 text-lg">Seleccionar Jugadores:</span>
                  <SelectInput
                    options={players}
                    defaultOption="Pick one option"
                    disabled={false}
                    className="my-3"
                  />
                  <SelectInput
                    options={players}
                    defaultOption="Pick one option"
                    disabled={false}
                    className="my-3"
                  />
                  <SelectInput
                    options={players}
                    defaultOption="Pick one option"
                    disabled={false}
                    className="my-3"
                  />
                </div>
              )}
            </div>
          )}
        </>
      </div>

      <div className="font-body mt-10 flex flex-col items-center">
        <span className="">¿Posee raquetas y pelotas?</span>
        <Pagination
          labels={optinosNo}
          size="sm"
          onPageChange={(label) => setIndumentary(label ?? null)}
          className="btn-neutral mt-2 text-nowrap px-5"
        />
      </div>
      <div className="mt-14 flex flex-row justify-center gap-x-6">
        <Button
          label="Cancelar"
          labelSize="text-sm"
          className="btn-lg btn-secondary"
        />
        <Button
          label="Reservar"
          labelSize="text-sm"
          className={
            eventType != null && indumentary != null
              ? "btn-lg btn-primary"
              : " btn-primary btn-lg btn-disabled"
          }
        />
      </div>
    </div>
  );
}
