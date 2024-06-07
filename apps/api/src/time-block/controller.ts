import {
  createTimeBlockInputDefinition,
  createTimeBlocksInputDefinition,
  getTimeBlockParamsDefinition,
  getTimeBlocksQueryDefinition,
  updateTimeBlockInputDefinition,
  updateTimeBlockParamsDefinition,
} from "@spin-spot/models";
import { Request, Response } from "express";
import { timeBlockService } from "./service";

async function createTimeBlock(req: Request, res: Response) {
  const timeBlockData = createTimeBlockInputDefinition
    .or(createTimeBlocksInputDefinition)
    .parse(req.body);

  if (timeBlockData instanceof Array) {
    /* Create many time blocks */
    const timeBlock = await timeBlockService.createTimeBlocks(timeBlockData);
    res.status(200).json(timeBlock);
  } else {
    /* Create one time blocks */
    const timeBlock = await timeBlockService.createTimeBlock(timeBlockData);
    res.status(200).json(timeBlock);
  }
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

async function updateTimeBlock(req: Request, res: Response) {
  const params = updateTimeBlockParamsDefinition.parse(req.params);
  const input = updateTimeBlockInputDefinition.parse(req.body);
  const user = await timeBlockService.updateTimeBlock(params._id, input);
  return res.status(200).json(user);
}

export const timeBlockController = {
  createTimeBlock,
  getTimeBlock,
  getTimeBlocks,
  updateTimeBlock,
} as const;
