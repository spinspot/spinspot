import { ErrorRequestHandler } from "express";
import { MongooseError } from "mongoose";
import { ZodError } from "zod";

export const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {
  console.error(err);
  if (err instanceof ZodError) {
    return res.status(500).json(err.message);
  } else if (err instanceof MongooseError) {
    return res.status(500).json(err.message);
  } else {
    return res.status(500).end();
  }
};
