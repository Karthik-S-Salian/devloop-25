import type { Metadata } from "next";
import React from "react";

import { Toaster } from "~/components/ui/sonner";

import Navbar from "~/components/navbar";
import { cn } from "~/lib/utils";
import "~/styles/globals.css";
import { TRPCReactProvider } from "~/trpc/react";

import AuthProvider from "../components/authProvider";

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
      <body className={cn("h-screen w-screen")}>
        <AuthProvider>
          <Navbar />
          <TRPCReactProvider>
            <main className="size-full pt-16">{children}</main>
          </TRPCReactProvider>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
};

export default RootLayout;
