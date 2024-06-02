import React from "react";
import { TextInput } from "../text-inputs";

interface PlayerInputProps {
  searchTexts: string[];
  suggestions: any[][];
  selectedUsers: (string | null)[];
  handleSearch: (index: number, text: string) => void;
  handleSelectUser: (index: number, user: any) => void;
}

export const PlayerInput: React.FC<PlayerInputProps> = ({
  searchTexts,
  suggestions,
  selectedUsers,
  handleSearch,
  handleSelectUser,
}) => {
  const inputCount = searchTexts.length;
  const playerInputs = [];
  for (let i = 1; i < inputCount; i++) {
    playerInputs.push(
      <div
        key={i}
        className="mb-6 mt-2 flex w-full flex-col items-center justify-center"
      >
        <TextInput
          placeholder="Type here"
          topLeftLabel="Ingrese nombre del otro jugador:"
          value={searchTexts[i] || ""}
          onChange={(e) => handleSearch(i, e.target.value)}
          bottomLeftLabel={
            selectedUsers[i] === null &&
            (searchTexts[i]?.length ?? 0) >= 1 &&
            suggestions[i]?.length === 0
              ? "No hay jugadores encontrados"
              : ""
          }
        />
        {(searchTexts[i]?.length ?? 0) >= 1 && suggestions[i]?.length !== 0 && (
          <ul className="bg-primary border-primary mt-2 w-3/4 rounded-md border">
            {suggestions[i]?.map((user, index) => (
              <li
                key={index}
                className="hover:bg-secondary cursor-pointer p-2 text-white"
                onClick={() => handleSelectUser(i, user)}
              >
                {user.firstName} {user.lastName}
              </li>
            ))}
          </ul>
        )}
      </div>,
    );
  }
  return <>{playerInputs}</>;
};
