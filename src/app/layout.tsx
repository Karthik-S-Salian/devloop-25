import type { Metadata } from "next";
import React from "react";

import { Toaster } from "~/components/ui/sonner";

import Navbar from "~/components/navbar";
import { RootProvider } from "~/contexts/root";
import { cn } from "~/lib/utils";
import "~/styles/globals.css";

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
        <RootProvider>
          <Navbar />
          <main className="size-full h-[calc(100%_-_4rem)]">{children}</main>
        </RootProvider>
        <Toaster />
      </body>
    </html>
  );
};

export default RootLayout;
