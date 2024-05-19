import passport from "passport";

export function auth() {
  return passport.authenticate("jwt", { session: false });
}
