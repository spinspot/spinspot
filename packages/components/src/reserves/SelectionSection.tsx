import { Pagination } from "../paginations";

interface SelectionSectionProps {
  options: string[];
  optinosNo: string[];
  eventType: string | null;
  indumentary: string | null;
  setEventType: (_eventType: string | null) => void;
  setIndumentary: (_indumentary: string | null) => void;
  resetInputs: (_length: number) => void;
}

export function SelectionSection({
  options,
  optinosNo,
  setEventType,
  setIndumentary,
  resetInputs,
}: SelectionSectionProps) {
  return (
    <div>
      <div className="mt-6 flex flex-col items-center">
        <h3 className="mr-1 text-lg">Seleccione modalidad: </h3>
        <Pagination
          labels={options}
          size="sm"
          onPageChange={(label) => {
            setEventType(label ?? null);
            resetInputs(label === "1V1" ? 1 : 3);
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
    </div>
  );
}
