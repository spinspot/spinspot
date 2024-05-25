import { sendMail } from "@/email";
import { userService } from "@/user";
import {
  IUser,
  forgotPasswordInputDefinition,
  resetPasswordInputDefinition,
  signInWithGoogleQueryDefinition,
  signUpWithCredentialsInputDefinition,
} from "@spin-spot/models";
import { CookieOptions, NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import ms from "ms";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as JWTStrategy } from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";
import { authService } from "./service";

const jwtCookieOptions: CookieOptions = {
  httpOnly: true,
  maxAge: ms("1d"),
  sameSite: "none",
  secure: true,
};

function loadProviders() {
  passport.use(
    new JWTStrategy(
      {
        jwtFromRequest: (req: Request) => {
          return req.cookies["JWT_TOKEN"];
        },
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

      return res.status(200).cookie("JWT_TOKEN", jwt, jwtCookieOptions).send({
        user,
      });
    },
  )(req, res, next);
}

function signInWithGoogle(req: Request, res: Response, next: NextFunction) {
  const query = signInWithGoogleQueryDefinition.parse(req.query);
  passport.authenticate("google", {
    session: false,
    state: JSON.stringify(query),
  })(req, res, next);
}

function signInWithGoogleCallback(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const state = signInWithGoogleQueryDefinition.parse(
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

      const baseUrl =
        state.app === "admin"
          ? process.env.ADMIN_APP_URL
          : process.env.CLIENT_APP_URL;

      return res
        .cookie("JWT_TOKEN", jwt, jwtCookieOptions)
        .redirect(new URL(state.route, baseUrl).href);
    },
  )(req, res, next);
}

async function signUpWithCredentials(req: Request, res: Response) {
  const input = signUpWithCredentialsInputDefinition.parse(req.body);
  const user = await userService.createUser(input);

  const jwt = authService.signJWT(user);

  return res.status(200).cookie("JWT_TOKEN", jwt, jwtCookieOptions).send({
    user,
  });
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

      return res.status(200).cookie("JWT_TOKEN", jwt, jwtCookieOptions).send({
        user,
      });
    },
  )(req, res, next);
}

function signOut(req: Request, res: Response) {
  return res
    .clearCookie("JWT_TOKEN", { ...jwtCookieOptions, maxAge: undefined })
    .end();
}

async function getCurrentUser(req: Request, res: Response) {
  return res.status(200).json(req.user);
}

async function forgotPassword(req: Request, res: Response) {
  const email = forgotPasswordInputDefinition.parse(req.body);

  const users = await userService.getUsers(email);
  if (users.length !== 1) {
    return res.status(404).send("El usuario no existe!");
  }
  const user = users[0]!;
  const token = authService.signJWT(
    user,
    process.env.JWT_SECRET + user.password,
    "10m",
  );
  const link = new URL(
    `/reset-password?user=${encodeURIComponent(`${user._id}`)}&token=${encodeURIComponent(token)}`,
    process.env.CLIENT_APP_URL,
  ).href;

  sendMail({
    from: `Spin Spot 🏓 <${process.env.EMAIL_USER}>`,
    to: `${email.email}`,
    subject: "Password Reset 🚨 SpinSpot",
    html: `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        .button {
          display: inline-block;
          padding: 10px 20px;
          font-size: 16px;
          background-color: #02415a;
          color: #ffffff !important;
          text-decoration: none;
          border-radius: 5px;
          transition: background-color 0.3s ease;
        }

        .button:hover {
          background-color: #022431;
          color: #ffffff;
        }

        .text {
          color: #000000;
        }
      </style>
    </head>
    <body>
      <p class="text">Hola! ${user.firstName} ${user.lastName}, te saludamos desde SpinSpot. Presiona el botón a continuación para cambiar tu contraseña:</p>
      <a href="${link}" class="button">Cambiar Contraseña</a>
    </body>
    </html>
  `,
  });
}

async function resetPassword(req: Request, res: Response) {
  const {
    user: id,
    token,
    password,
  } = resetPasswordInputDefinition.parse(req.body);

  const user = await userService.getUser(id);
  if (!user) {
    return res.status(404).json({ status: "El usuario no exste!" });
  }
  const secret = process.env.JWT_SECRET + user.password;

  if (!token) {
    return res.status(404).send("Token undefined");
  }
  const verifyUser: any = verify(token, secret);
  if (verifyUser && verifyUser?._id === `${user._id}`) {
    await userService.updateUser(user._id, { password });
  }
  return res.status(401).json({ status: "Usted no esta autorizado" });
}

export const authController = {
  loadProviders,
  signUpWithCredentials,
  signInWithCredentials,
  signInWithGoogle,
  signInWithGoogleCallback,
  refresh,
  signOut,
  getCurrentUser,
  forgotPassword,
  resetPassword,
} as const;
