import { z } from "zod";

const signInZ = z.object({
  email: z.string().email({ message: "Enter valid email" }),
  password: z.string().min(1, { message: "Password cannot be empty" }),
});

export { signInZ };
