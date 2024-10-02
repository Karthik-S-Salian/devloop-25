"use client";

import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

import NotFound from "~/app/not-found";

export default function RootTemplate({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: session } = useSession();
  const pathname = usePathname();

  const unportectedRoutes: string[] = ["/login"];

  if (!session && !unportectedRoutes.includes(pathname)) return <NotFound />;

  return children;
}
