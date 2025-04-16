"use client";

import { usePathname, useRouter } from "next/navigation";

export default function RedirectPage() {
  const router = useRouter();
  const pathname = usePathname();
  const handleRedirect = () => {
    //@ts-ignore
    router.push(`${pathname}/page1`);
  };
  return (
    <div className="flex h-full w-full items-center justify-center rounded-md">
      <button onClick={handleRedirect} className="border-2 bg-blue-400 p-4">
        Go to Page 1
      </button>
    </div>
  );
}
