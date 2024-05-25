import { userService } from "@/user";
import { IUser, JwtPayload } from "@spin-spot/models";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";

async function validateCredentials(email: string, password: string) {
  const users = await userService.getUsers({ email });

  if (users.length === 1) {
    const user = users[0]!;
    if (user.password && (await bcrypt.compare(password, user.password))) {
      return user;
    }
  }

  return null;
}

async function validateGoogle(googleId: string, email: string) {
  const usersWithGoogle = await userService.getUsers({ googleId });

  if (usersWithGoogle.length === 1) {
    const user = usersWithGoogle[0]!;
    return user;
  }

  const usersWithEmail = await userService.getUsers({ email });

  if (usersWithEmail.length === 1) {
    const user = usersWithEmail[0]!;
    const updatedUser = await userService.updateUser(user._id, { googleId });
    return updatedUser;
  }

  return null;
}

function signJWT(
  user: IUser,
  secret: string = process.env.JWT_SECRET,
  expiresIn: string = "1d",
) {
  return sign(
    {
      _id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      userType: user.userType,
    } as JwtPayload,
    secret,
    {
      expiresIn: expiresIn,
    },
  );
}

async function validateJWT(payload: any) {
  const user = await userService.getUser(payload?._id);

  if (user) {
    return user;
  }

  return null;
}

export const authService = {
  validateCredentials,
  validateGoogle,
  signJWT,
  validateJWT,
} as const;
