//randi numbers
export default function Page() {
  const answer = "fsxbjw";
  return (
    <div className="flex h-full flex-col items-center justify-center bg-gray-900 p-6 text-white">
      <div className="max-w-lg rounded-2xl bg-gray-800 p-6 text-center shadow-lg">
        <h1 className="mb-4 text-2xl font-bold">A Hidden Pattern</h1>
        <p className="mb-4 text-gray-300">
          These numbers might look random but all come from the same mother. You
          can meet them all in Python. To get to the answer you must know the
          mother. If you cant see her just shift your view.
        </p>
        <div className="inline-block rounded-md bg-gray-700 p-3 font-mono text-xl">
          <span>0</span> 637 759 367 261 <span>1000</span>
        </div>
      </div>
    </div>
  );
}
