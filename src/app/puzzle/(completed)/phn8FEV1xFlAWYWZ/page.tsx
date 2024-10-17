"use client";

const Page = () => {
  const phoneNumbers: string[] = [
    "9481585863",
    "9448846524",
    "9481585863",
    "9481585863",
    "9481585863",
  ];

  const formattedPhoneNumber = (number: string) =>
    number.split("").map((num) => num.charCodeAt(0).toString(16));

  return (
    <div className="flex size-full items-center justify-center">
      <div className="flex flex-col justify-center gap-2">
        {phoneNumbers.map((number, phoneIndex) => {
          const encoded_number = ["+", "9", "1", "-"].concat(
            formattedPhoneNumber(number),
          );
          return (
            <div key={phoneIndex} className="flex gap-1">
              {encoded_number.map((num, index) => (
                <input
                  type="text"
                  value={num}
                  key={index}
                  className="size-5 border border-gray-400 text-center text-base sm:size-10 md:size-12 md:text-lg"
                  disabled
                />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Page;
