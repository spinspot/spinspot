"use client";

import {
  Badge,
  Button,
  GoogleIcon,
  Loader,
  Pagination,
  SelectInput,
  TextInput,
} from "@spin-spot/components";
import { getTable, getTimeBlock, getUsers, useAuth } from "@spin-spot/services";
import { useEffect, useState } from "react";

interface ReserveProps {
  timeBlockId: string;
}

export default function Reserve({ params }: { params: ReserveProps }) {
  const { user } = useAuth();
  const options = ["Single 1 Vs 1", "Double 2 Vs 2"];
  const optinosNo = ["NO", "Si"];
  const [isLoading, setIsLoading] = useState(false);
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [dateReserve, setDateReserve] = useState<string>("");
  const [tableCode, setTableCode] = useState<string>("");
  const [users, setUsers] = useState<any[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [searchText, setSearchText] = useState("");
  const [eventType, setEventType] = useState<string | null>(null);
  const [indumentary, setIndumentary] = useState<string | null>(null);

  useEffect(() => {
    const fetchTimeBlocks = async () => {
      setIsLoading(true);
      try {
        const timeBlockData = await getTimeBlock(params.timeBlockId);
        const { startTime, endTime, table } = timeBlockData;

        setStartTime(
          new Date(startTime).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        );

        setEndTime(
          new Date(endTime).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        );

        setDateReserve(
          new Date(startTime)
            .toLocaleDateString([], {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })
            .replace(/\//g, "-"),
        );

        const tableData = await getTable(table);
        setTableCode(tableData.code);

        const fetchedUsers = await getUsers();
        setUsers(fetchedUsers);
        setFilteredUsers(fetchedUsers);

        setIsLoading(false);
      } catch (error) {
        console.error(
          "Error al obtener los datos de los bloques de tiempo:",
          error,
        );
        setIsLoading(false);
      }
    };

    fetchTimeBlocks();
  }, [params.timeBlockId]);

  const handleSearch = (text: string) => {
    setSearchText(text);
    const filtered = users.filter(
      (user) =>
        user.firstName.toLowerCase().includes(text.toLowerCase()) ||
        user.lastName.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredUsers(filtered);
  };

  return (
    <div className="font-body flex-grow py-32">
      <div className="font-title pb-12 text-center">
        <h1 className="text-3xl font-bold">Datos de la reserva</h1>
      </div>

      <div className="flex w-full justify-center">
        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
          <Badge
            labelName="Fecha"
            label={
              isLoading ? (
                <Loader size="md" variant="dots" className="text-primary" />
              ) : (
                `${dateReserve}`
              )
            }
            leftIcon={<GoogleIcon />}
          />
          <Badge
            labelName="Horario"
            label={
              isLoading ? (
                <Loader size="md" variant="dots" className="text-primary" />
              ) : (
                `${startTime} to ${endTime}`
              )
            }
            leftIcon={<GoogleIcon />}
          />
          <Badge
            labelName="Deporte"
            label={
              isLoading ? (
                <Loader size="md" variant="dots" className="text-primary" />
              ) : (
                "Ping-Pong"
              )
            }
            leftIcon={<GoogleIcon />}
          />
          <Badge
            labelName="Mesa"
            label={
              isLoading ? (
                <Loader size="md" variant="dots" className="text-primary" />
              ) : (
                `${tableCode}`
              )
            }
            leftIcon={<GoogleIcon />}
          />
        </div>
      </div>

      <h3 className="mt-9 flex justify-center text-xl">
        {" "}
        <span className="mr-1">Reservado por: </span>{" "}
        <span className="font-bold">
          {user?.firstName} {user?.lastName}
        </span>
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
        {eventType ? (
          <div className="">
            <span className="text-lg">Filtro de busqueda para jugadores:</span>
            <TextInput
              placeholder="Type here"
              className="mb-6 mt-2"
              value={searchText}
              onChange={(e) => handleSearch(e.target.value)}
            />
            {eventType === "Single 1 Vs 1" ? (
              filteredUsers.length > 0 ? (
                <SelectInput
                  options={filteredUsers.map(
                    (user) => `${user.firstName} ${user.lastName}`,
                  )}
                  defaultOption="Pick one option"
                  disabled={false}
                  className="select-primary my-3"
                />
              ) : (
                <div className="text-error flex items-center justify-center">
                  No se encontraron jugadores.
                </div>
              )
            ) : filteredUsers.length > 0 ? (
              <div>
                <SelectInput
                  options={filteredUsers.map(
                    (user) => `${user.firstName} ${user.lastName}`,
                  )}
                  defaultOption="Pick one option"
                  disabled={false}
                  className="select-primary my-3"
                />
                <SelectInput
                  options={filteredUsers.map(
                    (user) => `${user.firstName} ${user.lastName}`,
                  )}
                  defaultOption="Pick one option"
                  disabled={false}
                  className="select-primary my-3"
                />
                <SelectInput
                  options={filteredUsers.map(
                    (user) => `${user.firstName} ${user.lastName}`,
                  )}
                  defaultOption="Pick one option"
                  disabled={false}
                  className="select-primary my-3"
                />
              </div>
            ) : (
              <div className="text-error flex items-center justify-center">
                No se encontraron jugadores.
              </div>
            )}
          </div>
        ) : (
          <div className=" text-error flex items-center justify-center">
            No se ha seleccionado una modalidad!
          </div>
        )}
      </div>

      <div className="font-body mt-7 flex flex-col items-center">
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
