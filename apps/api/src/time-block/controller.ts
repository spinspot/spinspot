import { timeBlockTemplateService } from "@/time-block-template";
import {
  ApiError,
  ITimeBlockTemplate,
  TCreateTimeBlocksInputDefinition,
  TDayOfWeek,
  createTimeBlockInputDefinition,
  createTimeBlocksFromActiveTemplatesInputDefinition,
  createTimeBlocksFromTemplateInputDefinition,
  createTimeBlocksInputDefinition,
  getTimeBlockParamsDefinition,
  getTimeBlocksQueryDefinition,
  updateTimeBlockInputDefinition,
  updateTimeBlockParamsDefinition,
} from "@spin-spot/models";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Request, Response } from "express";
import { timeBlockService } from "./service";

dayjs.extend(utc);

/* Utility to generate time block data */
function generateTimeBlocksFromTemplate({
  timeBlockTemplate,
  startDate,
  endDate,
}: {
  timeBlockTemplate: ITimeBlockTemplate;
  startDate: string;
  endDate: string;
}) {
  const newTimeBlocks: TCreateTimeBlocksInputDefinition = [];

  /* For each day from startDate to endDate */
  for (
    let day = dayjs.utc(startDate);
    !day.isAfter(endDate);
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

  return newTimeBlocks;
}

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

async function createTimeBlocksFromTemplate(req: Request, res: Response) {
  const input = createTimeBlocksFromTemplateInputDefinition.parse(req.body);
  const timeBlockTemplate = await timeBlockTemplateService.getTimeBlockTemplate(
    input.timeBlockTemplate,
  );

  if (!timeBlockTemplate) {
    throw new ApiError({
      status: 404,
      errors: [{ message: "No se encontró el TimeBlockTemplate" }],
    });
  }

  const newTimeBlocks = generateTimeBlocksFromTemplate({
    timeBlockTemplate,
    startDate: input.startDate,
    endDate: input.endDate,
  });

  const timeBlocks = await timeBlockService.createTimeBlocks(newTimeBlocks);
  return res.status(200).json(timeBlocks);
}

async function createTimeBlocksFromActiveTemplates(
  req: Request,
  res: Response,
) {
  const input = createTimeBlocksFromActiveTemplatesInputDefinition.parse(
    req.body,
  );
  const timeBlockTemplates =
    await timeBlockTemplateService.getTimeBlockTemplates({ isActive: true });

  const newTimeBlocks = timeBlockTemplates.flatMap((timeBlockTemplate) =>
    generateTimeBlocksFromTemplate({
      timeBlockTemplate,
      startDate: input.startDate,
      endDate: input.endDate,
    }),
  );

  const timeBlocks = await timeBlockService.createTimeBlocks(newTimeBlocks);
  return res.status(200).json(timeBlocks);
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
  createTimeBlocksFromTemplate,
  createTimeBlocksFromActiveTemplates,
} as const;
