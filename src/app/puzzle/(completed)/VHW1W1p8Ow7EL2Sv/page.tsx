"use client";

import React, { useEffect, useState } from "react";
import Spreadsheet, { type Matrix, type CellBase } from "react-spreadsheet";

import { useSubmission } from "~/store";

const Page = () => {
  const { setSubmissionNote } = useSubmission();

  useEffect(() => {
    setSubmissionNote("Should have 4 after .");
  }, [setSubmissionNote]);

  const [data, setData] = useState<Matrix<CellBase> | null>(null);

  useEffect(() => {
    const parsedData = csvFile.split("\n").map((row) =>
      row.split(",").map((cell) => ({
        value: cell.trim(),
        readOnly: true,
      })),
    );
    setData(parsedData);
  }, []);

  return (
    <div className="flex size-full items-center justify-center px-4 pb-20 pt-4 sm:px-6 md:px-8 xl:px-10">
      <div className="flex size-full items-center justify-center overflow-scroll">
        <Spreadsheet className="h-full w-fit" data={data ?? []} />
      </div>
    </div>
  );
};

export default Page;

const csvFile = `Order ID,Date,Product Name,Quantity,Price per Unit,Total Sale,Buyer Name,
ORD0001,2023-11-22,Nendoroid Luffy,7,225,1575,Mason Wright,
ORD0002,2024-06-02,Figma Mikasa,7,39,273,Laura Taylor,
ORD0003,2024-02-23,Nendoroid Goku,7,197,1379,Valdamir Putin,
ORD0004,2024-04-27,Figurine Rem,7,182,1274,Sophia Walker,
ORD0005,2024-05-08,Scale Figure Asuka,7,50,153,Aiden Baker,
ORD0006,2024-06-29,Figma Shinobu,7,314,2198,Sophia Walker,
ORD0007,2024-09-07,Nendoroid Kaguya,7,125,875,Mia Nelson,
ORD0008,2024-01-03,Scale Figure Erza,7,253,1771,Charlotte Hill,
ORD0009,2024-08-05,Nendoroid Kirito,7,350,2797,Amelia Roberts,
ORD0010,2024-06-13,Figma Saber,7,234,1638,Jeff Bezos,
ORD0011,2024-07-14,Scale Figure Rei,7,359,2513,Maria Harris,
ORD0012,2024-08-20,Nendoroid Nezuko,7,25,175,Oliver Adams,
ORD0013,2024-05-24,Figurine Saitama,7,205,1435,Daniel Anderson,
ORD0014,2024-06-15,Nendoroid Chika,7,102,714,Mason Wright,
ORD0015,2024-08-27,Figma Lala,7,141,987,Chris Lee,
ORD0016,2023-10-20,Nendoroid Tanjiro,7,249,1743,John Doe,
ORD0017,2024-06-27,Scale Figure Bulma,7,209,1463,James White,
ORD0018,2024-02-25,Figma Shinoa,7,181,1267,David Martinez,
ORD0019,2024-01-06,Nendoroid Kaguya,7,355,2485,Aiden Baker,
ORD0020,2024-07-15,Figma Miku,7,123,861,Jessica Thomas,
ORD0021,2023-11-22,Nendoroid Luffy,7,130,910,Mason Wright,
ORD0022,2024-06-02,Figma Mikasa,7,318,2226,Laura Taylor,
ORD0023,2024-02-23,Nendoroid Goku,7,372,2604,Valdamir Putin,
ORD0024,2024-04-27,Figurine Rem,7,321,2247,Sophia Walker,
ORD0025,2024-05-08,Scale Figure Asuka,7,131,917,Aiden Baker,
ORD0026,2024-06-29,Figma Shinobu,7,333,2331,Sophia Walker,
ORD0027,2024-09-07,Nendoroid Kaguya,7,234,1638,Mia Nelson,
ORD0028,2024-01-03,Scale Figure Erza,7,208,1456,Charlotte Hill,
ORD0029,2024-08-05,Nendoroid Kirito,7,163,1141,Amelia Roberts,
ORD0030,2024-06-13,Figma Saber,7,226,1582,Jeff Bezos,
ORD0031,2024-07-14,Scale Figure Rei,7,173,1211,Maria Harris,
ORD0032,2024-08-20,Nendoroid Nezuko,7,57,399,Oliver Adams,
ORD0033,2024-05-24,Figurine Saitama,7,184,1288,Daniel Anderson,
ORD0034,2024-06-15,Nendoroid Chika,7,316,2212,Mason Wright,
ORD0035,2024-08-27,Figma Lala,7,396,2772,Chris Lee,
ORD0036,2023-10-20,Nendoroid Tanjiro,7,283,1981,John Doe,
ORD0037,2024-06-27,Scale Figure Bulma,7,331,2317,James White,
ORD0038,2024-02-25,Figma Shinoa,7,33,231,David Martinez,
ORD0039,2024-01-06,Nendoroid Kaguya,7,241,1687,Aiden Baker,
ORD0040,2024-07-15,Figma Miku,7,76,532,Jessica Thomas,
ORD0041,2023-11-22,Nendoroid Luffy,7,378,2646,Mason Wright,
ORD0042,2024-06-02,Figma Mikasa,7,306,2142,Laura Taylor,
ORD0043,2024-02-23,Nendoroid Goku,7,109,763,Putin,
ORD0044,2024-04-27,Figurine Rem,7,152,1064,Sophia Walker,
ORD0045,2024-05-08,Scale Figure Asuka,7,147,1029,Aiden Baker,
ORD0046,2024-06-29,Figma Shinobu,7,46,322,Sophia Walker,
ORD0047,2024-09-07,Nendoroid Kaguya,7,256,1792,Mia Nelson,
ORD0048,2024-01-03,Scale Figure Erza,7,376,2632,Charlotte Hill,
ORD0049,2024-08-05,Nendoroid Kirito,7,194,1358,Amelia Roberts,
ORD0050,2024-06-13,Figma Saber,7,339,2373,Bezos,
ORD0051,2024-07-14,Scale Figure Rei,7,162,1134,Maria Harris,
ORD0052,2024-08-20,Nendoroid Nezuko,7,372,2604,Oliver Adams,
ORD0053,2024-05-24,Figurine Saitama,7,162,1134,Daniel Anderson,
ORD0054,2024-06-15,Nendoroid Chika,7,108,756,Mason Wright,
ORD0055,2024-08-27,Figma Lala,7,371,2597,Chris Lee,
ORD0056,2023-10-20,Nendoroid Tanjiro,7,138,966,John Doe,
ORD0057,2024-06-27,Scale Figure Bulma,7,284,1988,James White,
ORD0058,2024-02-25,Figma Shinoa,7,33,231,David Martinez,
ORD0059,2024-01-06,Nendoroid Kaguya,7,173,1211,Aiden Baker,
ORD0060,2024-07-15,Figma Miku,7,47,329,Jessica Thomas,
`;
