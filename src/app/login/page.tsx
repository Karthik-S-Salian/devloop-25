"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { LoginZ } from "~/zod/authZ";

export default function Login() {
  const formSchema = LoginZ;
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Handle form submission
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    toast.loading("Logging in...");
    console.log("WOrking");

    signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    })
      .then(async (response) => {
        console.log(response);

        toast.dismiss();
        if (response?.ok) {
          toast.success("Logged in successfully");
          router.push("/");
        } else {
          toast.error("Failed to log in! Check your credentials.");
        }
      })
      .catch((error) => {
        toast.dismiss();
        console.error(error);
        toast.error("Failed to log in");
      });
  };

  return (
    <main className="flex h-full w-full items-center justify-center overflow-x-clip">
      <div className="max-w-md">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <h1 className="text-center text-2xl font-bold">Login</h1>

          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email")}
              className={`mt-1 w-full border px-3 py-2 ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password")}
              className={`mt-1 w-full border px-3 py-2 ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none`}
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Sign In
          </button>
        </form>
      </div>
    </main>
  );
}
