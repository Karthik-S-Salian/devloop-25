"use client";

import { FlippingPages } from "flipping-pages";
import "flipping-pages/dist/style.css";
import { useState } from "react";

import { Button } from "~/components/ui/button";

const Page = () => {
  const [selected, setSelected] = useState<number>(0);

  const back = () => setSelected((selected) => Math.max(selected - 1, 0));
  const next = () => setSelected((selected) => Math.min(selected + 1, 2));

  return (
    <div className="flex size-full items-center justify-center">
      <div className="flex size-96 flex-col gap-4">
        <FlippingPages
          direction="right-to-left"
          disableSwipe={true}
          selected={selected}
        >
          <div className="page relative grid size-full select-none grid-cols-2">
            <div className="grid size-full place-content-center border-l-black">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Dignissimos, expedita. Praesentium, labore quis in aut id tempore
              eos obcaecati, tenetur sequi fuga impedit deleniti amet? Nisi,
              aspernatur iusto! Nemo, dignissimos.
            </div>
            <div className="grid place-content-center">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Id,
              cupiditate!
            </div>
          </div>
          <div className="page relative grid size-full select-none grid-cols-2">
            <div className="grid size-full place-content-center border-l-black">
              <div
                className="absolute bottom-0 right-0 text-white"
                id="find-me"
              >
                Bezos is hot
              </div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum
              pariatur debitis voluptates nemo!
            </div>
            <div className="grid place-content-center">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet nam
              fuga ducimus. Nisi iste autem in quis.
            </div>
          </div>
          <div className="page relative grid size-full select-none grid-cols-2">
            <div className="grid size-full place-content-center border-l-black">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos
              voluptatibus aspernatur numquam facere error, eveniet neque
              repellat perferendis, dolor sapiente excepturi sed corporis ipsa
              architecto, vel cum? Excepturi at eveniet quisquam amet, in
              doloribus culpa saepe adipisci asperiores quos neque!
            </div>
            <div className="grid place-content-center">
              Lorem ipsum dolor sit amet consectetur.
            </div>
          </div>
        </FlippingPages>
        <div className="flex w-full items-center justify-between">
          <Button onClick={back}>Back</Button>
          <Button onClick={next}>Next</Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
