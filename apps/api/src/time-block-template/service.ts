import {
  TCreateTimeBlockTemplateInputDefinition,
  TGetTimeBlockTemplateParamsDefinition,
  TGetTimeBlockTemplatesQueryDefinition,
  TUpdateTimeBlockTemplateInputDefinition,
  TUpdateTimeBlockTemplateParamsDefinition,
  timeBlockTemplateSchema,
} from "@spin-spot/models";
import { model } from "mongoose";

const TimeBlockTemplate = model("TimeBlockTemplate", timeBlockTemplateSchema);

async function createTimeBlockTemplate(
  data: TCreateTimeBlockTemplateInputDefinition,
) {
  const timeBlockTemplate = await TimeBlockTemplate.create(data);
  return timeBlockTemplate;
}

async function getTimeBlockTemplates(
  filter: TGetTimeBlockTemplatesQueryDefinition = {},
) {
  const timeBlockTemplates = await TimeBlockTemplate.find(filter);
  return timeBlockTemplates;
}

async function updateTimeBlockTemplate(
  _id: TUpdateTimeBlockTemplateParamsDefinition["_id"],
  data: TUpdateTimeBlockTemplateInputDefinition,
) {
  const timeBlockTemplate = await TimeBlockTemplate.findByIdAndUpdate(
    _id,
    data,
    { new: true },
  );
  return timeBlockTemplate;
}

async function getTimeBlockTemplate(
  _id: TGetTimeBlockTemplateParamsDefinition["_id"],
) {
  const timeBlockTemplate = await TimeBlockTemplate.findById(_id).populate([
    "table",
    {
      path: "booking",
      populate: {
        path: "players",
      },
    },
  ]);
  return timeBlockTemplate;
}

export const timeBlockTemplateService = {
  getTimeBlockTemplates,
  getTimeBlockTemplate,
  createTimeBlockTemplate,
  updateTimeBlockTemplate,
} as const;
