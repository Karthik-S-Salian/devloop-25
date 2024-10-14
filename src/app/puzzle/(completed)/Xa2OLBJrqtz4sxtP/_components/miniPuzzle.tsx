import Image from "next/image";
import React from "react";

const MiniPuzzle = ({ idx }: { idx: number }) => {
  switch (idx) {
    // Genie will get this: 473707427
    case 0:
      return (
        <div className="flex size-full flex-col items-center justify-center gap-4">
          <div className="relative size-60">
            <Image src="/image/UJBzOOpkq0V2mkE7.jpeg" alt="image" fill />
          </div>
          <p>
            &quot;In a land of dreams where fortunes gleam, I appear to grant
            wishes and scheme. Ask me nicely, with a heart so pure, And
            I&apos;ll reveal a number, that&apos;s for sure!&quot;
          </p>
        </div>
      );
    // Hidden in the DOM: 835452964
    case 1:
      return (
        <div className="flex size-full flex-col items-center justify-center gap-4">
          <div>
            <pre>xb1R3cv3p@flc.us</pre>
            <pre>k3VDaRVc5@flc.me</pre>
            <pre>cn0CUo2z6@flc.ru</pre>
            <pre>g8XaRS0Kt@flc.cn</pre>
            <pre>B30CGixoi@flc.uk</pre>
            <pre>xVXGhb2qd@flc.io</pre>
            <pre className="hidden">
              .xr is not a valid ccTLD, I hope you wasted time
            </pre>
            <pre className="835452964">rzITcnBih@flc.xr</pre>
            <pre>B6BpcDpP1@flc.in</pre>
            <pre>73tSK1r2U@flc.fr</pre>
            <pre>l2IJBtdUF@flc.jp</pre>
          </div>
          <p>
            &quot;Among these e<b>x</b>trodinary emails, a treasure lies, One
            email&apos;s the key, it&apos;s wise to be wise. Compose you<b>r</b>{" "}
            thoughts and make them polite, Find it out gently, and wait for the
            light.&quot;
          </p>
        </div>
      );
    // Hidden in the BG: 763143382
    case 2:
      return (
        <div className="flex size-full flex-col items-center justify-center">
          <div className="flex gap-4">
            <div className="size-4 bg-indigo-500"></div>
            <div className="size-4 bg-lime-500"></div>
            <div className="size-4 bg-amber-500"></div>
            <div className="size-4 bg-emerald-500"></div>
            <div className="size-4 bg-slate-500"></div>
            <div className="size-4 bg-sky-500"></div>
            <div className="size-4 bg-fuchsia-500"></div>
            <div className="size-4 bg-teal-500"></div>
            <div className="size-4 bg-rose-500"></div>
          </div>
          <p>
            &quot;In shadows cast by colors so bright, A number hides, just out
            of sight. Look closely now, and trust your sight, To find the answer
            that feels just right.&quot;
          </p>
        </div>
      );
    // Shaadi.com profiles: 217863624
    case 3:
      return (
        <div className="flex size-full flex-col items-center justify-center gap-4">
          <a
            href="https://whatsapp.com/channel/0029VargwlYDJ6Gs9Rhwsm2O"
            target="_blank"
          >
            🥵
          </a>
          <p>
            &quot;In a digital realm where connections flow, A channel united,
            with profiles to show. Explore their profiles, and you may see, A
            number in hidden, that unlocks your key.&quot;
          </p>
        </div>
      );
    default:
      return null;
  }
};

export default MiniPuzzle;
