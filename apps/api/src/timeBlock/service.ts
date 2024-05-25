import {
  TCreateTimeBlockInputDefinition,
  TCreateTimeBlocksInputDefinition,
  TGetTimeBlockParamsDefinition,
  TGetTimeBlocksQueryDefinition,
  TUpdateTimeBlockInputDefinition,
  TUpdateTimeBlockParamsDefinition,
  statusTimeTypeDefinition,
  timeSchema,
} from "@spin-spot/models";
import { model } from "mongoose";

const TimeBlock = model("TimeBlock", timeSchema);

async function createTimeBlock(data: TCreateTimeBlockInputDefinition) {
  const timeBlock = await TimeBlock.create(data);
  return timeBlock;
}

async function createTimeBlocks(data: TCreateTimeBlocksInputDefinition) {
  const timeBlock = await TimeBlock.create(data);
  return timeBlock;
}

async function getTimeBlocks(filter: TGetTimeBlocksQueryDefinition = {}) {
  const timeBlocks = await TimeBlock.find(filter);
  return timeBlocks;
}

async function updateStatusTimeBlock(
  _id: TUpdateTimeBlockParamsDefinition["_id"],
  status: typeof statusTimeTypeDefinition.Enum[keyof typeof statusTimeTypeDefinition.Enum]
) {
  const timeBlock = await TimeBlock.findByIdAndUpdate(
    _id,
    { status },
    { new: true }
  );
  return timeBlock;
}

async function getTimeBlock(_id: TGetTimeBlockParamsDefinition["_id"]) {
  const timeBlock = await TimeBlock.findById(_id);
  return timeBlock;
}


export const timeBlockService = {
  getTimeBlocks,
  getTimeBlock,
  createTimeBlock,
  createTimeBlocks,
  updateStatusTimeBlock
} as const;
