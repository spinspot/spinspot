import {
  createTimeBlockTemplateInputDefinition,
  getTimeBlockTemplateParamsDefinition,
  getTimeBlockTemplatesQueryDefinition,
  updateTimeBlockTemplateInputDefinition,
  updateTimeBlockTemplateParamsDefinition,
} from "@spin-spot/models";
import { Request, Response } from "express";
import { timeBlockTemplateService } from "./service";

async function createTimeBlockTemplate(req: Request, res: Response) {
  const timeBlockTemplateData = createTimeBlockTemplateInputDefinition.parse(
    req.body,
  );

  const timeBlockTemplate =
    await timeBlockTemplateService.createTimeBlockTemplate(
      timeBlockTemplateData,
    );

  return res.status(200).json(timeBlockTemplate);
}

async function getTimeBlockTemplates(req: Request, res: Response) {
  const query = getTimeBlockTemplatesQueryDefinition.parse(req.query);
  const timeBlockTemplates =
    await timeBlockTemplateService.getTimeBlockTemplates(query);
  return res.status(200).json(timeBlockTemplates);
}

async function getTimeBlockTemplate(req: Request, res: Response) {
  const params = getTimeBlockTemplateParamsDefinition.parse(req.params);
  const timeBlockTemplate = await timeBlockTemplateService.getTimeBlockTemplate(
    params._id,
  );
  return res.status(200).json(timeBlockTemplate);
}

async function updateTimeBlockTemplate(req: Request, res: Response) {
  const params = updateTimeBlockTemplateParamsDefinition.parse(req.params);
  const input = updateTimeBlockTemplateInputDefinition.parse(req.body);
  const user = await timeBlockTemplateService.updateTimeBlockTemplate(
    params._id,
    input,
  );
  return res.status(200).json(user);
}

export const timeBlockTemplateController = {
  createTimeBlockTemplate,
  getTimeBlockTemplate,
  getTimeBlockTemplates,
  updateTimeBlockTemplate,
} as const;
