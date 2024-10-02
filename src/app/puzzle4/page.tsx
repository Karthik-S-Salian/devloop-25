import React from "react";

import QrCode from "../../components/qrCode/qrCode";

export default function page() {
  return (
    <div className="m-auto mt-6 w-[30%] text-center">
      <h2>Solve QrCode to get the meaning</h2>
      <QrCode dimension={3} message="our value/answer"></QrCode>
    </div>
  );
}
