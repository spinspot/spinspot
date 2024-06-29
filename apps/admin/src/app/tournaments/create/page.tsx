'use client';

import { useState } from "react";
import { Button, Calendar, TextInput, SelectInput } from "@spin-spot/components";
import { useRouter } from "next/navigation";

const eventTypeOptions = ["1V1", "2V2"];
const tournamentTypeOptions = ["MEDIUM", "ADVANCED", "BEGINNER"];
const tournamentFormatOptions = ["LEAGUE", "ELIMINATION"];

export default function Create() {
  const router = useRouter();
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [maxTeams, setMaxTeams] = useState<number | undefined>(undefined);
  const [eventType, setEventType] = useState<string | undefined>(undefined);
  const [tournamentType, setTournamentType] = useState<string | undefined>(undefined);
  const [tournamentFormat, setTournamentFormat] = useState<string | undefined>(undefined);
  const [prize, setPrize] = useState<number | undefined>(undefined);

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log({
      startDate,
      endDate,
      maxTeams,
      eventType,
      tournamentType,
      tournamentFormat,
      prize,
    });
  };

  return (
    <div className="font-body flex-grow py-32">
      <div className="font-title font-bold text-center">
        <h1 className="flex flex-col text-3xl">
          <span>Crear</span>
          <span>Torneo</span>
        </h1>
      </div>
      <div className="flex flex-col items-center mt-4 gap-y-4 max-w-md mx-auto ">
        <TextInput
          topLeftLabel="Cantidad de equipos"
          type="number"
          min={2}
          max={50}
          placeholder="Cantidad de equipos"
          value={maxTeams !== undefined ? maxTeams : ""}
          onChange={(e) => setMaxTeams(e.target.value ? parseInt(e.target.value) : undefined)}
        />
        <TextInput
          topLeftLabel="Premio"
          type="number"
          placeholder="Premio"
          value={prize !== undefined ? prize : ""}
          onChange={(e) => setPrize(e.target.value ? parseFloat(e.target.value) : undefined)}
        />
        <SelectInput
          topLeftLabel="Tipo de evento"
          defaultOption="Selecciona el tipo de evento"
          options={eventTypeOptions}
          value={eventType}
          onChange={(e) => setEventType(e.target.value)}
        />
        <SelectInput
          topLeftLabel="Tipo de torneo"
          defaultOption="Selecciona el tipo de torneo"
          options={tournamentTypeOptions}
          value={tournamentType}
          onChange={(e) => setTournamentType(e.target.value)}
        />
        <SelectInput
          topLeftLabel="Formato del torneo"
          defaultOption="Selecciona el formato del torneo"
          options={tournamentFormatOptions}
          value={tournamentFormat}
          onChange={(e) => setTournamentFormat(e.target.value)}
        />
        <div className="flex flex-col items-center">
          <span className="label-text text-base">Fecha de inicio</span>
          <Calendar onDateChange={setStartDate} endDate={endDate} />
        </div>
        <div className="flex flex-col items-center">
          <span className="label-text text-base">Fecha de finalización</span>
          <Calendar onDateChange={setEndDate} />
        </div>
        <Button onClick={handleSubmit} label="Crear Torneo"></Button>
      </div>
    </div>
  );
}

