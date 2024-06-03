"use client";

import {
  Button,
  Loader,
  PlayerInput,
  ReservationInfo,
  SelectionSection,
} from "@spin-spot/components";
import {
  useAuth,
  useBooking,
  useTable,
  useTimeBlock,
  useToast,
  useUpdateBooking,
  useUsers,
} from "@spin-spot/services";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ReserveProps {
  timeBlockId: string;
}

export default function EditReserve({ params }: { params: ReserveProps }) {
  const { user } = useAuth();
  const { showToast } = useToast();
  const options = ["1V1", "2V2"];
  const optinosNo = ["NO", "SI"];
  const [isLoading] = useState(false);
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [dateReserve, setDateReserve] = useState<string>("");
  const [tableCode, setTableCode] = useState<string>("");
  const [tableId, setTableId] = useState<string>("");
  const [searchTexts, setSearchTexts] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<any[][]>([]);
  const [selectedUsers, setSelectedUsers] = useState<(string | null)[]>([]);
  const [eventType, setEventType] = useState<string | null>(null);
  const [indumentary, setIndumentary] = useState<string | null>(null);
  const router = useRouter();

  const { data: timeBlockData, isLoading: isTimeBlockLoading } = useTimeBlock(
    params.timeBlockId,
  );
  const { data: tableData, isLoading: isTableLoading } = useTable(
    timeBlockData?.table || "",
  );
  const { data: fetchedUsers, isLoading: isUsersLoading } = useUsers();
  const { data: bookingData, isLoading: isBookingLoading } = useBooking(
    timeBlockData?.booking || "",
  );

  const { mutate: updateBooking } = useUpdateBooking();

  useEffect(() => {
    if (timeBlockData && tableData && fetchedUsers && bookingData) {
      const { startTime, endTime } = timeBlockData;

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

      const playersWithoutOwner = bookingData.players?.slice(0, -1).map(player => player.toString()) ?? [];
      const maxPlayers = bookingData.eventType === "1V1" ? 1 : 3;

      const initialSelectedUsers: (string | null)[] = playersWithoutOwner.slice(0, maxPlayers);
      const initialSearchTexts = initialSelectedUsers.map(playerId => {
        const user = fetchedUsers.find(u => u._id === playerId);
        return user ? `${user.firstName} ${user.lastName}` : "";
      });

      while (initialSearchTexts.length < maxPlayers) {
        initialSearchTexts.push("");
        initialSelectedUsers.push(null);
      }

      setSearchTexts(initialSearchTexts);
      setSelectedUsers(initialSelectedUsers);
      setEventType(bookingData.eventType);
      setTableCode(tableData.code);
      setTableId(tableData._id.toString());
    }
  }, [timeBlockData, tableData, fetchedUsers, bookingData]);
  

  const handleSearch = (index: number, text: string) => {
    const newSearchTexts = [...searchTexts];
    newSearchTexts[index] = text;
    setSearchTexts(newSearchTexts);

    const newSelectedUsers = [...selectedUsers];
    newSelectedUsers[index] = null;
    setSelectedUsers(newSelectedUsers);

    if (text.length >= 1) {
      const lowerCaseText = text.toLowerCase();
      const filtered = fetchedUsers?.filter((user) => {
        const fullName = `${user.firstName.toLowerCase()} ${user.lastName.toLowerCase()}`;
        return (
          user.firstName.toLowerCase().includes(lowerCaseText) ||
          user.lastName.toLowerCase().includes(lowerCaseText) ||
          fullName.includes(lowerCaseText)
        );
      });
      const newSuggestions = [...suggestions];
      newSuggestions[index] = filtered ?? [];
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

  const resetInputs = (length: number) => {
    setSearchTexts(Array(length).fill(""));
    setSuggestions(Array(length).fill([]));
    setSelectedUsers(Array(length).fill(null));
  };

  const handleUpdate = async () => {
    if (!eventType || !indumentary || !user || !bookingData || !tableId) return;

    const validPlayers = [
      ...(selectedUsers.filter((player) => player !== null) as string[]),
      user._id,
    ];

    const finalizeUpdate = async () => {
      updateBooking(
        {
          _id: bookingData?._id,
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
              label: "Reserva actualizada exitosamente",
              type: "success",
            });
            router.push("/tables");
          },
          onError: (error) => {
            console.error("Error al actualizar la reserva:", error);
            showToast({
              label: "Error al actualizar la reserva",
              type: "error",
            });
          },
        },
      );
    };

    if (
      (eventType === "1V1" && validPlayers.length !== 2) ||
      (eventType === "2V2" && validPlayers.length !== 4)
    ) {
      showToast({
        label:
          "¿Seguro que quieres actualizar la reserva sin completar los jugadores?",
        type: "warning",
        acceptButtonLabel: "Sí",
        denyButtonLabel: "No",
        onAccept() {
          finalizeUpdate();
        },
        onDeny() {
          showToast({
            label: "Actualización no realizada",
            type: "error",
          });
        },
      });
    } else {
      finalizeUpdate();
    }
  };

  if (
    isLoading ||
    isTimeBlockLoading ||
    isTableLoading ||
    isUsersLoading ||
    isBookingLoading
  ) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader size="lg" variant="dots" className="text-primary" />
      </div>
    );
  }

  return (
    <div className="font-body flex-grow py-32">
      <ReservationInfo
        dateReserve={dateReserve}
        startTime={startTime}
        endTime={endTime}
        tableCode={tableCode}
        user={user}
      />
      <SelectionSection
        options={options}
        optinosNo={optinosNo}
        eventType={eventType}
        indumentary={indumentary}
        setEventType={setEventType}
        setIndumentary={setIndumentary}
        resetInputs={resetInputs}
        initialActive={eventType === "1V1" ? 0 : 1}
      />
      <div className="mt-8 flex w-full flex-col items-center justify-center">
        {eventType && (
          <PlayerInput
            searchTexts={searchTexts}
            suggestions={suggestions}
            selectedUsers={selectedUsers}
            handleSearch={handleSearch}
            handleSelectUser={handleSelectUser}
          />
        )}
      </div>
      <div className="mt-10 flex flex-row justify-center gap-x-6">
        <Button
          label="Cancelar"
          labelSize="text-sm"
          className="btn-lg btn-secondary"
          onClick={() => router.back()}
        />
        <Button
          label="Editar"
          labelSize="text-sm"
          className={
            eventType != null && indumentary != null
              ? "btn-lg btn-primary w-[102px]"
              : "btn-primary btn-lg btn-disabled w-[102px]"
          }
          onClick={handleUpdate}
        />
      </div>
    </div>
  );
}

