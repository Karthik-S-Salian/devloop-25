/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { PrismaAdapter } from "@auth/prisma-adapter";
import { type UserRole } from "@prisma/client";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import { type Adapter } from "next-auth/adapters";

import { db } from "~/server/db";

import authConfig from "~/auth.config";
import { getUserById } from "~/utils/auth";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: UserRole;
      // ...other properties
    } & DefaultSession["user"];
  }

  interface User {
    // ...other properties
    role: UserRole;
  }
}

declare module "next-auth/jwt" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface JWT {
    iat: number;
    exp: number;
    role: UserRole;
    accessToken: string;
    refreshToken: string;
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    session: async ({ session, token }) => {
      if (token.sub && session.user) {
        session.user.id = token.sub;
        session.user.role = token.role;
        session.user.name = token.name;
      }
      return session;
    },
    jwt: async ({ token }) => {
      if (!token.sub) return token;
      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;
      token.role = existingUser.role;
      token.name = existingUser.name;
      token.email = existingUser.email;
      return token;
    },
  },
  adapter: PrismaAdapter(db) as Adapter,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signIn",
    signOut: "/auth/signOut",
  },
  ...authConfig,
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
