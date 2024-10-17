export default function PhoneNumber() {
  const phoneNumbers: string[] = [
    "9481585863",
    "9448846524",
    "9481585863",
    "9481585863",
    "9481585863",
  ];

  function formattedPhoneNumber(number: string) {
    return number.split("").map((num) => num.charCodeAt(0).toString(16));
  }

  return (
    <>
      <div className="flex h-[50vw] w-full items-center justify-center">
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
                    className="size-10 border border-gray-400 text-center text-lg"
                    disabled
                  />
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
