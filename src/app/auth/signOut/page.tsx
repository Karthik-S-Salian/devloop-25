"use client";

import { signOut } from "next-auth/react";
import React from "react";

import { Button } from "~/components/ui/button";

const SignOut = () => {
  return (
    <main className="flex h-full w-full items-center justify-center">
      <Button onClick={() => signOut()}>Sign Out</Button>
    </main>
  );
};

export default SignOut;
