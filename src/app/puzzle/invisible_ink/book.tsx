"use client";

import { FlippingPages } from "flipping-pages";
import "flipping-pages/dist/style.css";
import { useState } from "react";

import "./App.css";

const Page = () => {
  const [selected, setSelected] = useState(0);

  const back = () => {
    setSelected((selected) => Math.max(selected - 1, 0));
  };

  const next = () => {
    setSelected((selected) => Math.min(selected + 1, 2));
  };

  return (
    <div>
      <div className="pages">
        <FlippingPages
          direction="left-to-right"
          onSwipeEnd={setSelected}
          disableSwipe={true}
          selected={selected}
        >
          <div className="page relative grid grid-cols-2">
            <div className="grid place-content-center border-l-black">
              <div className="absolute text-white">
                This is a secret content
              </div>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Voluptatem consequatur alias, ab assumenda, aliquam dolorum veniam
              minus, esse nostrum nobis nisi et quo culpa repellendus illo
              mollitia necessitatibus q
              uasi? Placeat? Lorem, ipsum dolor sit amet consectetur adipisicing
              elit. Aut adipisci repudiandae, quod maiores ipsam esse ea placeat
              optio, nesciunt consequuntur incidunt illum impedit dignissimos
              similique eius debitis, rerum assumenda ipsa!
            </div>
            <div className="grid place-content-center">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Voluptatem consequatur alias, ab assumenda, aliquam dolorum veniam
              minus, esse nostrum nobis nisi et quo culpa repellendus illo
              mollitia necessitatibus quasi? Placeat? Lorem, ipsum dolor sit
              amet consectetur adipisicing elit. Aut adipisci repudiandae, quod
              maiores ipsam esse ea placeat optio, nesciunt consequuntur
              incidunt illum impedit dignissimos similique eius debitis, rerum
              assumenda ipsa!
            </div>
          </div>
          <div className="page page2">Page 2</div>
          <div className="page page3">Page 3</div>
        </FlippingPages>
      </div>
      <button onClick={back}>Back</button>
      <button onClick={next}>Next</button>
    </div>
  );
};

export default Page;
