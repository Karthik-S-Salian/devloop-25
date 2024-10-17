"use client";

const Page = () => {
  return (
    <div className="flex size-full flex-col items-center justify-center gap-4">
      <div className="flex">
        <pre className="border border-black p-2">int arr[18]</pre>
        <pre className="border border-black p-2">floatarr[25]+char c;</pre>
        <pre className="border border-black p-2">short arr[54];</pre>
        <pre className="border border-black p-2">char arr[108];</pre>
        <pre className="border border-black p-2">
          int arr[27]+short a+char c;
        </pre>
      </div>
    </div>
  );
};

export default Page;
