import { IUser } from "@spin-spot/models";
import { authorizeSignIn } from "@spin-spot/services";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

declare global {
  export interface User extends IUser {}
}

const handler = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials.password) return null;

        const data = await authorizeSignIn(credentials);

        if (data === null) return null;

        const { user, jwt } = data;

        return {
          jwt: jwt,
          _id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          userType: user.userType,
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      return { ...token, ...user };
    },
    session({ session, token }) {
      return { ...session, user: token };
    },
  },
});

export { handler as GET, handler as POST };
