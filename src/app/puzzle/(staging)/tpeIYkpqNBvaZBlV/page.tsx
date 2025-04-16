//color transform
export default function Page() {
  const answer =
    "Through arrogance we are bound in perpetual obscurity until wisdom liberates us";
  return (
    <div className="flex h-full flex-col items-center justify-center bg-gray-900 p-6">
      <div className="max-w-lg rounded-2xl bg-gray-300 p-6 text-center shadow-lg">
        <h1 className="mb-4 text-2xl font-bold">Color Transform</h1>
        <p className="mb-4">
          In a great kingdom there lived three wizards. Each having their own
          unique power. The wizards were cursed by a giant because of their
          pride. They were turned into colors and the only way to free their
          curse is by saying the magical words. But the spell is in tongue of
          the giants which you dont understand. But dont worry the wizards can
          still help you
        </p>
        {/* appears on hint. */}
        {/* <div> magical + red = glamica</div> */}
        {/* Find shift value */}
        {/* <div> magical + green = wkqsmkv</div> */}
        {/* <div> magical + blue = magicl</div> */}
        {/* Alt 3rd transform remove vowels */}
        <div>
          &quot;
          {/* [110] */}
          <span className="text-yellow-400">yrerdqb </span>
          {/* [011]  */}
          <span className="text-[#00ffff]">byxqkom </span>
          <span className="text-black">we </span>
          <span className="text-black">are </span>
          {/* [100] */}
          <span className="text-red-500">dbuon </span>
          <span className="text-black">in </span>
          {/* [111] */}
          <span className="text-white">evbodzk </span>
          {/* [110] */}
          <span className="text-yellow-400">meilcybsd </span>
          {/* [010] */}
          <span className="text-green-500">exdsv </span>
          {/* [110] */}
          <span className="text-yellow-400">wnscgy </span>
          {/* [111] */}
          <span className="text-white">dkvlbose </span>
          <span className="text-black">us </span>
          &quot;
        </div>
      </div>
    </div>
  );
}
