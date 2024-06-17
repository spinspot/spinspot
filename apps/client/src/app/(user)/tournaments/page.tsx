"use client";

import { Button } from "@spin-spot/components";
import { useCreateTournament, useToast } from "@spin-spot/services";

export default function page() {
  const createTournament = useCreateTournament();
  const { showToast } = useToast();

  const handleCreateExampleTournament = () => {
    // Create a new tournament
    createTournament.mutate(
      {
        name: "Torneo 1",
        description: "Primer torneo ping pong unimet",
        owner: "665229652dc1249bcd4611b7",
        maxPlayers: 4,
        prize: "50$",
        eventType: "1V1",
        status: "OPEN",
        startTime: new Date("2024-06-26T15:00:00.000Z"),
        endTime: new Date("2024-06-27T15:00:00.000Z"),
      },
      {
        onSuccess: () => {
          showToast({
            label: "Torneo creado exitosamente",
            type: "success",
          });
        },
        onError: (error) => {
          console.error("Error al crear el torneo:", error);
          showToast({
            label: "Error al crear el torneo",
            type: "error",
          });
        },
      },
    );
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-5 text-lg font-bold">
      Tournaments Page 🚧
      <Button
        onClick={handleCreateExampleTournament}
        label="Crear torneo ejemplo"
      ></Button>
    </div>
  );
}
