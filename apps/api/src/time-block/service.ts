import { timeBlockTemplateService } from "@/time-block-template";
import {
  TCreateTimeBlockInputDefinition,
  TCreateTimeBlocksFromTemplateInputDefinition,
  TCreateTimeBlocksInputDefinition,
  TDayOfWeek,
  TGetTimeBlockParamsDefinition,
  TGetTimeBlocksQueryDefinition,
  TUpdateTimeBlockInputDefinition,
  TUpdateTimeBlockParamsDefinition,
  timeBlockSchema,
} from "@spin-spot/models";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { model } from "mongoose";

dayjs.extend(utc);

const TimeBlock = model("TimeBlock", timeBlockSchema);

async function createTimeBlock(data: TCreateTimeBlockInputDefinition) {
  const timeBlock = await TimeBlock.create(data);
  return timeBlock;
}

async function createTimeBlocks(data: TCreateTimeBlocksInputDefinition) {
  const timeBlock = await TimeBlock.create(data);
  return timeBlock;
}

async function createTimeBlocksFromTemplate(
  data: TCreateTimeBlocksFromTemplateInputDefinition,
) {
  const timeBlockTemplate = await timeBlockTemplateService.getTimeBlockTemplate(
    data.template,
  );

  const newTimeBlocks: TCreateTimeBlocksInputDefinition = [];

  /* For each day from startDate to endDate */
  for (
    let day = dayjs.utc(data.startDate);
    !day.isAfter(data.endDate);
    day = day.add(1, "day")
  ) {
    /* Skip if not in daysOfWeek */
    if (
      !timeBlockTemplate?.daysOfWeek.includes(
        [
          "SUNDAY",
          "MONDAY",
          "TUESDAY",
          "WEDNESDAY",
          "THURSDAY",
          "FRIDAY",
          "SATURDAY",
        ][day.day()] as TDayOfWeek,
      )
    ) {
      continue;
    }
    /* For each time */
    timeBlockTemplate?.times
      .map((time) => time.split(":").map(Number))
      .forEach(([hours = 0, minutes = 0, seconds = 0]) => {
        const startTime = day
          .clone()
          .set("hours", hours)
          .set("minutes", minutes)
          .set("seconds", seconds);

        const endTime = startTime.add(timeBlockTemplate.duration, "minutes");

        /* For each table */
        timeBlockTemplate.tables.forEach((table) => {
          newTimeBlocks.push({
            table: table,
            startTime: startTime.toDate(),
            endTime: endTime.toDate(),
            status: "AVAILABLE",
          });
        });
      });
  }

  const timeBlocks = await TimeBlock.create(newTimeBlocks);
  return timeBlocks;
}

async function getTimeBlocks(filter: TGetTimeBlocksQueryDefinition = {}) {
  const timeBlocks = await TimeBlock.find(filter).populate([
    "table",
    {
      path: "booking",
      populate: {
        path: "players",
      },
    },
  ]);
  return timeBlocks;
}

async function updateTimeBlock(
  _id: TUpdateTimeBlockParamsDefinition["_id"],
  data: TUpdateTimeBlockInputDefinition,
) {
  const timeBlock = await TimeBlock.findByIdAndUpdate(_id, data, { new: true });
  return timeBlock;
}

async function getTimeBlock(_id: TGetTimeBlockParamsDefinition["_id"]) {
  const timeBlock = await TimeBlock.findById(_id).populate([
    "table",
    {
      path: "booking",
      populate: {
        path: "players",
      },
    },
  ]);
  return timeBlock;
}

export const timeBlockService = {
  getTimeBlocks,
  getTimeBlock,
  createTimeBlock,
  createTimeBlocks,
  updateTimeBlock,
  createTimeBlocksFromTemplate,
} as const;
