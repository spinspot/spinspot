import { userService } from "@/user";
import { IUser, signInWithGoogleInputDefinition } from "@spin-spot/models";
import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { ExtractJwt, Strategy as JWTStrategy } from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";
import { authService } from "./service";

function loadProviders() {
  passport.use(
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET,
      },
      async function verify(payload, done) {
        try {
          const user = await authService.validateJWT(payload);
          done(null, user ?? false);
        } catch (err) {
          done(err);
        }
      },
    ),
  );

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

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        scope: ["email", "profile"],
        callbackURL: new URL(
          "/auth/sign-in/google/callback",
          process.env.API_APP_URL,
        ).href,
      },
      async function verify(accessToken, refreshToken, profile, done) {
        console.log(profile);
        try {
          if (!profile.emails || !profile.emails[0]) {
            return done(null, false);
          }
          const email = profile.emails[0].value;
          const user = await authService.validateGoogle(profile.id, email);

          if (user) {
            return done(null, user);
          }

          const newUser = await userService.createUser({
            email,
            firstName: profile.name?.givenName || profile.displayName,
            lastName: profile.name?.familyName || "",
            googleId: profile.id,
          });

          done(null, newUser);
        } catch (err) {
          done(err);
        }
      },
    ),
  );
}

function signInWithCredentials(
  req: Request,
  res: Response,
  next: NextFunction,
) {
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

function signInWithGoogle(req: Request, res: Response, next: NextFunction) {
  const input = signInWithGoogleInputDefinition.parse(req.body);
  passport.authenticate("google", {
    session: false,
    state: JSON.stringify(input),
  })(req, res, next);
}

function signInWithGoogleCallback(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const state = signInWithGoogleInputDefinition.parse(
    JSON.parse(`${req.query?.state}`),
  );
  passport.authenticate(
    "google",
    { session: false },
    (err: any, user?: IUser | false | null) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        throw "Autenticación con Google fallida";
      }

      const jwt = authService.signJWT(user);

      const searchParams = new URLSearchParams({ jwt });

      const baseUrl =
        state.app === "admin"
          ? process.env.ADMIN_APP_URL
          : process.env.CLIENT_APP_URL;

      return res.redirect(
        new URL(state.route, baseUrl).href + `?${searchParams}`,
      );
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
  signInWithCredentials,
  signInWithGoogle,
  signInWithGoogleCallback,
  loadProviders,
  refresh,
} as const;
