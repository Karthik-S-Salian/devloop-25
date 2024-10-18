import { redirect } from "next/navigation";

import { env } from "~/env";

const StagingLayout = ({ children }: { children: React.ReactNode }) => {
  if (env.NODE_ENV !== "development") redirect("/round");
  return children;
};

export default StagingLayout;
