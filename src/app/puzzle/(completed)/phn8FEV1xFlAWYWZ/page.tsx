"use client";

const Page = () => {
  const phoneNumbers = [
    "7411004271",
    "6362320199",
    "8762037401",
    "8748035788",
    "9518307223",
  ] as const;

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
