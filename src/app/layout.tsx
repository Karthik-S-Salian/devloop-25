import type { Metadata } from "next";

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

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body className={cn("h-screen w-screen")}>
        <AuthProvider>
          <Navbar />
          <TRPCReactProvider>{children}</TRPCReactProvider>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
};

export default RootLayout;
