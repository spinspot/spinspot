import { userService } from "@/user";
import { IUser } from "@spin-spot/models";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";

async function validateCredentials(email: string, password: string) {
  const users = await userService.getUsers({ email });

  if (users.length === 1) {
    const user = users[0]!;
    if (await bcrypt.compare(password, user.password)) {
      return user;
    }
  }

  return null;
}

function signJWT(user: IUser) {
  return sign(
    {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      userType: user.userType,
    },
    process.env.JWT_SECRET ?? "$pin$pot",
    {
      expiresIn: "1d",
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
  signJWT,
  validateJWT,
} as const;
