import { IUser } from "@spin-spot/models";
import { NextFunction, Request, Response } from "express";
import { sign } from "jsonwebtoken";
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

      const jwt = sign(
        {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          userType: user.userType,
        },
        process.env.JWT_SECRET ?? "$pin$pot",
        {
          expiresIn: "1h",
        },
      );

      return res.status(200).send(jwt);
    },
  )(req, res, next);
}

export const authController = {
  signIn,
} as const;
