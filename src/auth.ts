import { PrismaAdapter } from "@auth/prisma-adapter";
import { type UserRole } from "@prisma/client";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import { type Adapter } from "next-auth/adapters";
import authConfig from '~/auth.config';

import { db } from "~/server/db";

import { env } from "~/env";
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
      isRound2: boolean;
      // ...other properties
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
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
    isRound2:boolean;
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    session: async({ session, user,token }) => {
      if(token.sub && session.user){
        session.user.id = token.sub;
        session.user.role = token.role;
        session.user.name = token.name;
        session.user.isRound2 = token.isRound2;
      }

      return session;
    
    },
    jwt: async({ token, user }) => {
      if(!token.sub) return token;
      const existingUser = await getUserById(token.sub);
      if(!existingUser) return token;
      token.role = existingUser.role;
      token.name = existingUser.name;
      token.email= existingUser.email;
      token.isRound2 = existingUser.isRound2;
      return token;

  }
},
  adapter: PrismaAdapter(db) as Adapter,
  session:{strategy:"jwt"},
  ...authConfig,
 
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
