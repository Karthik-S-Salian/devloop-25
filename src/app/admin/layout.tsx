import React from "react";

import { getServerAuthSession } from "~/auth";

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerAuthSession();

  if (session?.user.role !== "ADMIN") {
    return <div>Unauthorized</div>;
  }
  return children;
};

export default AdminLayout;
