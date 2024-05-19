import { MiddlewareConfig } from "next/server";

export { default } from "next-auth/middleware";

export const config: MiddlewareConfig = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico|.*).*)",
};
