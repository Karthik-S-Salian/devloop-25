import { redirect } from "next/navigation";

import { getServerAuthSession } from "~/auth";

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  // const session = await getServerAuthSession();
  // if (session?.user.role !== "ADMIN") redirect("/");
  return children;
};

export default AdminLayout;
