import React from "react";

export default function VideoPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <h1 className="mb-4 text-2xl font-bold">Silence is the key</h1>

      <div className="flex h-[400px] w-[360px] items-center justify-center overflow-hidden rounded-lg bg-black shadow-lg">
        <video controls className="h-full w-full">
          <source src="/muteman.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}
