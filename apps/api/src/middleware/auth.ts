import { ApiError, IUser } from "@spin-spot/models";
import { NextFunction, Request, Response } from "express";
import passport from "passport";

type TAuthMiddlewareOptions = {
  reject?: boolean;
};

export function auth({ reject = true }: TAuthMiddlewareOptions = {}) {
  return (req: Request, res: Response, next: NextFunction) =>
    passport.authenticate(
      "jwt",
      { session: false },
      (err: any, user?: IUser | false | null) => {
        if (err) {
          return next(err);
        }

        if (user) {
          req.user = user;
        } else if (reject) {
          throw new ApiError({
            status: 401,
            errors: [{ message: "Token de autenticación inválido" }],
          });
        }

        next();
      },
    )(req, res, next);
}
