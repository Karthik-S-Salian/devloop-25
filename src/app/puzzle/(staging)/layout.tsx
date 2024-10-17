import { redirect } from "next/navigation";

import { env } from "~/env";

const StagingLayout = () => {
  if (env.NODE_ENV !== "development") redirect("/round");
  return null;
};

export default StagingLayout;
