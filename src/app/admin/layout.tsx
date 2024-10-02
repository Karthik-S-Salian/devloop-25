import { getServerSession } from "next-auth";
import React from "react";

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession();

  return children;
};

export default AdminLayout;
