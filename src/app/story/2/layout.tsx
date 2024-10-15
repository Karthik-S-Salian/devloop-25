"use client";

import { useRouter, useSearchParams } from "next/navigation";

const Story2Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const accessToken = searchParams.get("accessToken");

  if (!accessToken) {
    router.back();
    return null;
  }

  return children;
};

export default Story2Layout;
