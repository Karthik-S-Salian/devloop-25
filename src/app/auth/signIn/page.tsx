"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { type z } from "zod";

import { Button } from "~/components/ui/button";
import { InputPassword } from "~/components/ui/custom/input-password";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";

import { signInZ } from "~/zod/authZ";

const SignIn = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const formSchema = signInZ;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    toast.loading("Signing in...");

    const response = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    toast.dismiss();
    if (response)
      if (response.ok) {
        console.log("Signed in successfully, redirecting to ", response.url);
        toast.success("Signed in successfully");
        router.refresh();
      } else {
        console.log(response.status, response.error);
        toast.error("Failed to sign in! Check your credentials.");
      }
    else {
      console.error("Failed to sign in, No response from server");
      toast.error("Failed to sign in");
    }
  };

  if (session) router.back();

  return (
    <main className="flex h-full w-full items-center justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-md space-y-8 rounded-md border p-10"
        >
          <h1 className="text-center text-2xl font-bold">Sign In</h1>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="user@flc.in" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <InputPassword placeholder="password@123" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Sign In</Button>
        </form>
      </Form>
    </main>
  );
};

export default SignIn;
