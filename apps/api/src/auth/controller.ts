import { IUser } from "@spin-spot/models";
import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { authService } from "./service";

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async function verify(email, password, cb) {
      try {
        const user = await authService.validateCredentials(email, password);
        cb(null, user ?? false);
      } catch (err) {
        cb(err);
      }
    },
  ),
);

function signIn(req: Request, res: Response, next: NextFunction) {
  passport.authenticate(
    "local",
    { session: false },
    (err: any, user?: IUser | false | null) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        throw "Correo electrónico o contraseña inválidos";
      }

      const jwt = authService.signJWT(user);

      return res.status(200).send({
        user,
        jwt,
      });
    },
  )(req, res, next);
}

function refresh(req: Request, res: Response, next: NextFunction) {
  passport.authenticate(
    "jwt",
    { session: false },
    (err: any, user?: IUser | false | null) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        throw "Token inválido";
      }

      const jwt = authService.signJWT(user);

      return res.status(200).send({
        user,
        jwt,
      });
    },
  )(req, res, next);
}

export const authController = {
  signIn,
  refresh,
} as const;
