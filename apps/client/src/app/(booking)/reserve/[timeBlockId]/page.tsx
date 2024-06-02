"use client";

import {
  Badge,
  Button,
  GoogleIcon,
  Loader,
  Pagination,
  TextInput,
} from "@spin-spot/components";
import { getTable, getTimeBlock, getUsers, useAuth } from "@spin-spot/services";
import { useEffect, useState } from "react";
import { useCreateBooking } from "@spin-spot/services";
import { useToast } from "@spin-spot/services";
import { useRouter } from "next/navigation";

interface ReserveProps {
  timeBlockId: string;
}

export default function Reserve({ params }: { params: ReserveProps }) {
  const { user } = useAuth();
  const { showToast } = useToast();
  const options = ["1V1", "2V2"];
  const optinosNo = ["NO", "Si"];
  const [isLoading, setIsLoading] = useState(false);
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [dateReserve, setDateReserve] = useState<string>("");
  const [tableCode, setTableCode] = useState<string>("");
  const [tableId, setTableId] = useState<string>("");
  const [users, setUsers] = useState<any[]>([]);
  const [searchTexts, setSearchTexts] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<any[][]>([]);
  const [selectedUsers, setSelectedUsers] = useState<(string | null)[]>([]);
  const [eventType, setEventType] = useState<string | null>(null);
  const [indumentary, setIndumentary] = useState<string | null>(null);
  const router = useRouter();

  const { mutate: createBooking } = useCreateBooking();

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
          })
        );

        setEndTime(
          new Date(endTime).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })
        );

        setDateReserve(
          new Date(startTime)
            .toLocaleDateString([], {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })
            .replace(/\//g, "-")
        );

        const tableData = await getTable(table);
        setTableCode(tableData.code);
        setTableId(tableData._id.toString());
        const fetchedUsers = await getUsers();
        setUsers(fetchedUsers);
        setIsLoading(false);
      } catch (error) {
        console.error("Error al obtener los datos de los bloques de tiempo:", error);
        setIsLoading(false);
      }
    };

    fetchTimeBlocks();
  }, [params.timeBlockId]);

  const handleSearch = (index: number, text: string) => {
    const newSearchTexts = [...searchTexts];
    newSearchTexts[index] = text;
    setSearchTexts(newSearchTexts);

    const newSelectedUsers = [...selectedUsers];
    newSelectedUsers[index] = null;
    setSelectedUsers(newSelectedUsers);

    if (text.length >= 4) {
      const filtered = users.filter(
        (user) =>
          user.firstName.toLowerCase().includes(text.toLowerCase()) ||
          user.lastName.toLowerCase().includes(text.toLowerCase())
      );
      const newSuggestions = [...suggestions];
      newSuggestions[index] = filtered;
      setSuggestions(newSuggestions);
    } else {
      const newSuggestions = [...suggestions];
      newSuggestions[index] = [];
      setSuggestions(newSuggestions);
    }
  };

  const handleSelectUser = (index: number, user: any) => {
    const newSearchTexts = [...searchTexts];
    newSearchTexts[index] = `${user.firstName} ${user.lastName}`;
    setSearchTexts(newSearchTexts);

    const newSuggestions = [...suggestions];
    newSuggestions[index] = [];
    setSuggestions(newSuggestions);

    const newSelectedUsers = [...selectedUsers];
    newSelectedUsers[index] = user._id;
    setSelectedUsers(newSelectedUsers);
  };

  const renderPlayerInputs = () => {
    const inputCount = eventType === "1V1" ? 2 : 4;
    const playerInputs = [];
    for (let i = 0; i < inputCount; i++) {
      playerInputs.push(
        <div key={i} className="mb-6 mt-2">
          <TextInput
            placeholder="Type here"
            value={searchTexts[i] || ""}
            onChange={(e) => handleSearch(i, e.target.value)}
          />
          {(searchTexts[i]?.length ?? 0) >= 4 && (
            <ul className="bg-primary border rounded-md border-primary mt-1 max-h-40 overflow-y-auto">
              {suggestions[i]?.map((user, index) => (
                <li
                  key={index}
                  className="p-2 cursor-pointer hover:bg-secondary hover:text-primary"
                  onClick={() => handleSelectUser(i, user)}
                >
                  {user.firstName} {user.lastName}
                </li>
              ))}
            </ul>
          )}
        </div>
      );
    }
    return playerInputs;
  };

  const handleReserve = async () => {
    if (!eventType || !indumentary || !user) return;

    const validPlayers = selectedUsers.filter((player) => player !== null) as string[];

    try {
      createBooking(
        {
          eventType: eventType as "1V1" | "2V2",
          owner: user._id,
          table: tableId,
          players: validPlayers,
          timeBlock: params.timeBlockId,
          status: "PENDING",
        },
        {
          onSuccess: () => {
            showToast({
              label: "Reserva creada exitosamente",
              type: "success",
            })
            router.push("/dashboard");
          },
          onError: (error) => {
            console.error("Error al crear la reserva:", error);
            showToast({
              label: "Error al crear la reserva",
              type: "error",
            });
          },
        }
      );
    } catch (error) {
      console.error("Error al crear la reserva:", error);
      showToast({
        label: "Error al crear la reserva",
        type: "error",
      });
    }
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
          onPageChange={(label) => {
            setEventType(label ?? null);
            setSearchTexts(Array(label === "1V1" ? 2 : 4).fill(""));
            setSuggestions(Array(label === "1V1" ? 2 : 4).fill([]));
            setSelectedUsers(Array(label === "1V1" ? 2 : 4).fill(null));
          }}
          className="btn-neutral mt-2 min-w-28 text-nowrap"
        />
      </div>
      <div className="mt-6 flex flex-col items-center">
        <h3 className="mr-1 text-lg">Indumentaria: </h3>
        <Pagination
          labels={optinosNo}
          size="sm"
          onPageChange={(label) => setIndumentary(label ?? null)}
          className="btn-neutral mt-2 min-w-28 text-nowrap"
        />
      </div>

      <div className="mx-auto mt-8 max-w-md">
        {eventType && renderPlayerInputs()}
      </div>
      <div className="mt-14 flex flex-row justify-center gap-x-6">
        <Button
          label="Cancelar"
          labelSize="text-sm"
          className="btn-lg btn-secondary"
          onClick={() => window.history.back()}
        />
        <Button
          label="Reservar"
          labelSize="text-sm"
          className={
            eventType != null && indumentary != null
              ? "btn-lg btn-primary"
              : "btn-primary btn-lg btn-disabled"
          }
          onClick={handleReserve}
        />
      </div>
    </div>
  );
}




