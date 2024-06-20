import { IUser } from "@spin-spot/models";

interface PlayerListProps {
  players: IUser[];
}

export function PlayerList({ players }: PlayerListProps) {
  return (
    <div className="join join-vertical">
      {players.map((player) => (
        <div className="flex flex-col p-4">
          <div>
            {player.firstName} {player.lastName}
          </div>
          <div className="text-sm">{player.email}</div>
        </div>
      ))}
    </div>
  );
}
