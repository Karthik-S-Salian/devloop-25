"use client";

import React, { useEffect, useState } from "react";
import Spreadsheet, { type Matrix, type CellBase } from "react-spreadsheet";

const Page = () => {
  const [data, setData] = useState<Matrix<CellBase> | null>(null);

  useEffect(() => {
    void (async () => {
      const response = await fetch("/docs/Zsz2MQXNknD216Ys.csv");
      if (response.ok) {
        const csvData = await response.text();
        const parsedData = csvData.split("\n").map((row) =>
          row.split(",").map((cell) => ({
            value: cell.trim(),
            readOnly: true,
          })),
        );
        setData(parsedData);
      } else {
        console.error("Error fetching csv:", await response.json());
      }
    })();
  }, []);

  return (
    <div className="flex size-full items-center justify-center">
      <div className="h-4/5 overflow-scroll">
        <Spreadsheet className="h-full w-fit" data={data ?? []} />
      </div>
    </div>
  );
};

export default Page;
