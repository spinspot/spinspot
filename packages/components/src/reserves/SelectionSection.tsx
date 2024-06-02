import React from "react";
import { Pagination } from "../paginations";

interface SelectionSectionProps {
  options: string[];
  optinosNo: string[];
  eventType: string | null;
  indumentary: string | null;
  setEventType: (eventType: string | null) => void;
  setIndumentary: (indumentary: string | null) => void;
  resetInputs: (length: number) => void;
}

const SelectionSection: React.FC<SelectionSectionProps> = ({
  options,
  optinosNo,
  eventType,
  indumentary,
  setEventType,
  setIndumentary,
  resetInputs,
}) => (
  <div>
    <div className="mt-6 flex flex-col items-center">
      <h3 className="mr-1 text-lg">Seleccione modalidad: </h3>
      <Pagination
        labels={options}
        size="sm"
        onPageChange={(label) => {
          setEventType(label ?? null);
          resetInputs(label === "1V1" ? 2 : 4);
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

export default SelectionSection;
