/* eslint-disable no-unused-vars */
import { JwtPayload } from "@spin-spot/models";
import "next-auth";

declare module "next-auth" {
  type User = JwtPayload & { jwt: string };
  interface Session {
    user: User;
  }
}
