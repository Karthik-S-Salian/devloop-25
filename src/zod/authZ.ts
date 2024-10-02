import { z } from "zod";

const LoginZ = z.object({
  email: z.string().min(1, { message: "Enter valid email" }),
  password: z
    .string()
    .min(1, { message: "Password should contain 1 character atleast" }),
});

export { LoginZ };
