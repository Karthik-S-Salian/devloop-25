import { type User } from "@prisma/client";
import type { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { getUserByEmail } from "./utils/auth";
import { signInZ } from "./zod/authZ";

export default {
  providers: [
    Credentials({
      credentials: {},
      async authorize(credentials): Promise<User | null> {
        const validateFields = signInZ.safeParse(credentials);
        if (validateFields.success) {
          const { email, password } = validateFields.data;
          const user = await getUserByEmail(email);
          if (!user?.password) return null;
          const passwordMatch = password === user.password;
          if (passwordMatch) return user;
        }
        return null;
      },
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the GOOGLE provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
} satisfies NextAuthOptions;
