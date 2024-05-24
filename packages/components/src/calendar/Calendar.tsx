// Calendar.tsx
'use client';

import { DayPicker } from "react-day-picker";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export function Calendar() {
  const [date, setDate] = useState<Date>();

  return (
    <div className="p-4 justify-center">
      <div className="flex w-full m-2">
        <DayPicker
          mode="single"
          selected={date}
          onSelect={setDate}
          showOutsideDays
          classNames={{
            caption: "flex justify-center py-2 m-4 relative items-center",
            caption_label: "text-lg font-bold",
            nav: "flex items-center",
            nav_button_previous: "absolute left-1.5",
            nav_button_next: "absolute right-1.5",
            table: "w-full border-collapse",
            head_row: "flex justify-around font-base w-full",
            head_cell: "w-9 font-normal text-primary dark:text-neutral-content text-center",
            row: "flex justify-around w-full mt-0",
            cell: "text-primary dark:text-neutral-content h-full w-full text-center p-0 font-normal border border-gray-600" ,
            day: "h-9 w-9 p-0 font-normal",
            day_range_end: "day-range-end",
            day_selected: "bg-primary text-white hover:text-white focus:text-white",
            day_outside: "text-gray-400 opacity-50",
            day_disabled: "text-gray-400 opacity-50",
            day_hidden: "invisible",
          }}
          components={{
            IconLeft: ({ ...props }) => (
              <ChevronLeftIcon {...props} className="h-4 w-4 stroke-2" />
            ),
            IconRight: ({ ...props }) => (
              <ChevronRightIcon {...props} className="h-4 w-4 stroke-2" />
            ),
          }}
        />
      </div>
    </div>
  );
}




