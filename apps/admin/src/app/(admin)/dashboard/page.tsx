"use client";

import {
  ChartBarIcon,
  TrophyIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { Loader, PingPongIcon } from "@spin-spot/components";
import Stat from "@spin-spot/components/stats/Stat";
import {
  useAuth,
  useBookings,
  useTables,
  useTournaments,
  useUsers,
} from "@spin-spot/services";

export default function dashboard() {
  const users = useUsers();
  const { user } = useAuth();
  const tournaments = useTournaments();
  const tables = useTables();
  const bookings = useBookings();

  console.log(users);

  const statsData = [
    {
      icon: <UserGroupIcon className="inline-block h-8 w-8 stroke-current" />,
      title: "Usuarios",
      value: users.data?.length,
      description: "Jan 1st - Feb 1st",
      isLoading: tournaments.isLoading,
    },
    {
      icon: <TrophyIcon className="inline-block h-8 w-8 stroke-current" />,
      title: "Torneos Creados",
      value: tournaments.data?.length,
      description: "↗︎ 400 (22%)",
      isLoading: tournaments.isLoading,
    },
    {
      icon: (
        <PingPongIcon className="text-primary inline-block h-8 w-8 stroke-current" />
      ),
      title: "Mesas de SpinSpot",
      value: tables.data?.length,
      description: "↘︎ 90 (14%)",
      isLoading: tables.isLoading,
    },
    {
      icon: <ChartBarIcon className="inline-block h-8 w-8 stroke-current" />,
      title: "Reservas Creadas",
      value: bookings.data?.length,
      description: "↘︎ 90 (14%)",
      isLoading: bookings.isLoading,
    },
  ];

  return (
    <div>
      <div className="m-6 flex flex-col items-center justify-center gap-6">
        {user ? (
          <div className="p-5 text-center text-3xl font-bold">
            Bienvenido de vuelta, {user?.firstName} {user?.lastName}
          </div>
        ) : (
          <Loader variant="dots" size="lg" className="text-primary"></Loader>
        )}
        <Stat stats={statsData}></Stat>
      </div>
    </div>
  );
}
