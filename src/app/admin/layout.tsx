import { redirect } from "next/navigation";

import { auth } from "~/server/auth";

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  if (session?.user.role !== "ADMIN") redirect("/");
  return children;
};

export default AdminLayout;
