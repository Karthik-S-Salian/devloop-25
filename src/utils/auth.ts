import { db } from "~/server/db";

const getUserById = async (id: string) => {
  const user = await db.user.findUnique({
    where: { id },
  });
  return user;
};

const getUserByEmail = async (email: string) => {
  const user = await db.user.findUnique({
    where: { email },
  });
  console.log("EMail USer", user);

  return user;
};

export { getUserById, getUserByEmail };
