import { db } from "~/server/db";

export const getUserById = async (id: string) => {
    const user = await db.user.findUnique({
        where: { id },
    });
    return user;
    }