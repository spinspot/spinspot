import { userService } from "@/user";
import bcrypt from "bcrypt";

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

async function validateJWT(payload: any) {
  const user = await userService.getUser(payload?._id);

  if (user) {
    return user;
  }

  return null;
}

export const authService = {
  validateCredentials,
  validateJWT,
} as const;
