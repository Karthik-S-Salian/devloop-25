"use client";
//folder frenzy
/*Hint-search for read me file*/
export default function FolderFrenzy() {
  const handleDownload = () => {
    window.location.href = "/you_are_cooked.zip";
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center space-y-6">
      <div className="flex flex-col items-center space-y-4">
        Download the files
        <button
          onClick={handleDownload}
          className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-10 w-10 text-gray-700"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75v10.5c0 1.242 1.008 2.25 2.25 2.25h12c1.242 0 2.25-1.008 2.25-2.25V9c0-1.242-1.008-2.25-2.25-2.25h-7.5l-1.5-1.5h-3A2.25 2.25 0 0 0 3.75 6.75z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
