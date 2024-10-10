import { db } from "~/server/db";

const getUserById = async (id: string) =>
  await db.user.findUnique({
    where: { id },
  });

const getUserByEmail = async (email: string) =>
  await db.user.findUnique({
    where: { email },
  });

export { getUserById, getUserByEmail };
