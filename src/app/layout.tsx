import type { Metadata } from "next";
import React from "react";

import { Toaster } from "~/components/ui/sonner";

import AuthProvider from "~/components/authProvider";
import Navbar from "~/components/navbar";
import { cn } from "~/lib/utils";
import "~/styles/globals.css";
import { TRPCReactProvider } from "~/trpc/react";

export const metadata: Metadata = {
  title: "Digital Hunt",
  description:
    "Intercollege Capture the flag like event organised by Finite Loop Club, NMAMIT",
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body className={cn("flex h-screen w-screen flex-col")}>
        <AuthProvider>
          <TRPCReactProvider>
            <Navbar />
            <main className="size-full h-[calc(100%_-_4rem)]">{children}</main>
          </TRPCReactProvider>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
};

export default RootLayout;
