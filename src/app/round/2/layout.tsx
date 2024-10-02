import { redirect } from "next/navigation";

import { getServerAuthSession } from "~/auth";

const Round2Layout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const session = await getServerAuthSession();

  if (!session?.user.isRound2) redirect("/");

  return children;
};

export default Round2Layout;
