import { signOut } from "~/server/auth";

export default function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button
        className="text-md mb-2 me-2 bg-gradient-to-r from-green-400 via-green-500 to-green-600 px-5 py-2.5 text-center font-normal text-white shadow-lg shadow-green-800/80 ring-4 ring-green-900 hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800"
        type="submit"
      >
        SignOut
      </button>
    </form>
  );
}
