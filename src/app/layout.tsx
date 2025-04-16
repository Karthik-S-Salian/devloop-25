import type { Metadata } from "next";
import React from "react";

import { Toaster } from "~/components/ui/sonner";

import Navbar from "~/components/navbar";
import ProdNavbar from "~/components/navbar/prod";
import { RootProvider } from "~/contexts/root";
import { env } from "~/env";
import { cn } from "~/lib/utils";
import "~/styles/globals.css";

export const metadata: Metadata = {
  title: "Tech race | Devloop-2025",
  description:
    "Capture the flag like event organised by Finite Loop Club, NMAMIT",
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
          {env.NODE_ENV === "development" ? <Navbar /> : <ProdNavbar />}
          <main className="size-full">{children}</main>
        </RootProvider>
        <Toaster />
      </body>
    </html>
  );
};

export default RootLayout;
