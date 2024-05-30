import {
  createTimeBlockInputDefinition,
  getTimeBlockParamsDefinition,
  getTimeBlocksQueryDefinition,
} from "@spin-spot/models";
import { Request, Response } from "express";
import { timeBlockService } from "./service";

async function createTimeBlock(req: Request, res: Response) {
  const timeBlockData = createTimeBlockInputDefinition.parse(req.body);
  const timeBlock = await timeBlockService.createTimeBlock(timeBlockData);
  res.status(200).json(timeBlock);
}

async function getTimeBlocks(req: Request, res: Response) {
  const query = getTimeBlocksQueryDefinition.parse(req.query);
  const timeBlocks = await timeBlockService.getTimeBlocks(query);
  return res.status(200).json(timeBlocks);
}

async function getTimeBlock(req: Request, res: Response) {
  const params = getTimeBlockParamsDefinition.parse(req.params);
  const timeBlock = await timeBlockService.getTimeBlock(params._id);
  return res.status(200).json(timeBlock);
}

export const timeBlockController = {
  createTimeBlock,
  getTimeBlock,
  getTimeBlocks,
} as const;
