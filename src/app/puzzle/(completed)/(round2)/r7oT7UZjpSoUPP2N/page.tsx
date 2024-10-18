import { redirect } from "next/navigation";

const Page = () => {
  redirect("/error.html");
  return null;
};

export default Page;
