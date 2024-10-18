"use client";

import { UserRole as DBUserRole } from "@prisma/client";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

import { api } from "~/trpc/react";

const UserRoles = {
  ...DBUserRole,
  UNPROTECTED: "UNPROTECTED" as const,
};

const UserView = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [userRole, setUserRole] = useState<keyof typeof UserRoles>(
    session?.user.role ?? UserRoles.UNPROTECTED,
  );

  const getPuzzles = api.useUtils().puzzle.getPuzzles;

  useEffect(
    () => setUserRole(session?.user.role ?? UserRoles.UNPROTECTED),
    [session],
  );

  return (
    <Select
      value={userRole}
      onValueChange={async (value) => {
        const newUserRole = value as keyof typeof UserRoles;
        if (userRole === newUserRole) return;

        if (newUserRole === "UNPROTECTED")
          await signOut({
            redirect: false,
          });

        if (newUserRole === "USER")
          await signIn("credentials", {
            email: "user@flc.in",
            password: "user@123",
            redirect: false,
          });

        if (newUserRole === "ADMIN")
          await signIn("credentials", {
            email: "admin@flc.in",
            password: "admin@123",
            redirect: false,
          });

        void getPuzzles.refetch();
        setUserRole(newUserRole);
        router.refresh();
      }}
    >
      <SelectTrigger className="w-56 text-blue-300 first:*:w-full">
        <SelectValue>Viewing as: {userRole}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        {Object.values(UserRoles).map((role, idx) => (
          <SelectItem key={idx} value={role}>
            {role}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default UserView;
