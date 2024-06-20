import {
  TCreateTimeBlockInputDefinition,
  TCreateTimeBlocksInputDefinition,
  TGetTimeBlockParamsDefinition,
  TGetTimeBlocksQueryDefinition,
  TUpdateTimeBlockInputDefinition,
  TUpdateTimeBlockParamsDefinition,
  timeBlockSchema,
} from "@spin-spot/models";
import { model } from "mongoose";

const TimeBlock = model("TimeBlock", timeBlockSchema);

async function createTimeBlock(data: TCreateTimeBlockInputDefinition) {
  const timeBlock = await TimeBlock.create(data);
  return timeBlock;
}

async function createTimeBlocks(data: TCreateTimeBlocksInputDefinition) {
  const timeBlock = await TimeBlock.create(data);
  return timeBlock;
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
} as const;
