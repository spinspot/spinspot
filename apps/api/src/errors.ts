import { ApiError, TApiError } from "@spin-spot/models";
import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { Error as MongooseError } from "mongoose";
import { ZodError } from "zod";

function handleApiError(
  err: ApiError,
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  console.log("Handled Error: ", err.message);
  return res.status(err.status).json({
    status: err.status,
    errors: err.errors,
  } as TApiError);
}

function handleZodError(
  err: ZodError,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  return handleApiError(
    new ApiError({
      status: 400,
      errors: err.errors.map(({ message }) => ({ message })),
    }),
    req,
    res,
    next,
  );
}

function handleMongooseValidationError(
  err: MongooseError.ValidationError,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const errors = Object.values(err.errors);

  return handleApiError(
    new ApiError({
      status: 400,
      errors: errors.map(({ message }) => ({ message })),
    }),
    req,
    res,
    next,
  );
}

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof ApiError) {
    return handleApiError(err, req, res, next);
  } else if (err instanceof ZodError) {
    return handleZodError(err, req, res, next);
  } else if (err instanceof MongooseError.ValidationError) {
    return handleMongooseValidationError(err, req, res, next);
  } else {
    console.error("🚨 Unhandled Error: ", err);
    return res.status(500).end();
  }
};
