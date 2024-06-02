import { TextInput } from "../text-inputs";

interface PlayerInputProps {
  searchTexts: string[];
  suggestions: any[][];
  selectedUsers: (string | null)[];
  handleSearch: (_index: number, text: string) => void;
  handleSelectUser: (_index: number, user: any) => void;
}

export const PlayerInput: React.FC<PlayerInputProps> = ({
  searchTexts,
  suggestions,
  selectedUsers,
  handleSearch,
  handleSelectUser,
}) => {
  return (
    <>
      {searchTexts.map((searchTexts, _index) => (
        <div
          key={_index}
          className="mb-6 mt-2 flex w-full flex-col items-center justify-center"
        >
          <TextInput
            placeholder="Type here"
            topLeftLabel="Ingrese nombre del otro jugador:"
            value={searchTexts[_index] || ""}
            onChange={(e) => handleSearch(_index, e.target.value)}
            bottomLeftLabel={
              selectedUsers[_index] === null &&
              (searchTexts[_index]?.length ?? 0) >= 1 &&
              suggestions[_index]?.length === 0
                ? "No hay jugadores encontrados"
                : ""
            }
          />
          {(searchTexts[_index]?.length ?? 0) >= 1 &&
            suggestions[_index]?.length !== 0 && (
              <ul className="bg-primary border-primary animate-slide-down mt-2 w-3/4 rounded-md border">
                {suggestions[_index]?.map((_user, _index) => (
                  <li
                    key={_index}
                    className="hover:bg-secondary cursor-pointer p-2 text-white"
                    onClick={() => handleSelectUser(_index, _user)}
                  >
                    {_user.firstName} {_user.lastName}
                  </li>
                ))}
              </ul>
            )}
        </div>
      ))}
    </>
  );
};
