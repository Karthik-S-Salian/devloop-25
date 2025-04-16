"use client";

//jwt
import { useEffect, useState } from "react";

export default function Jwt() {
  const [password, setPassword] = useState("");
  const onSubmit = () => {
    if (password === "digital-heist") {
      alert("Correct password");
    } else {
      alert("Wrong password");
    }
  };

  useEffect(() => {
    const secretKey = "secret-key";
    const secretValue = "b2xUeXpTUVBWWldGVkFjUUdNUkdDTmVt";

    if (!localStorage.getItem(secretKey)) {
      localStorage.setItem(secretKey, secretValue);
    }
  }, []);

  return (
    <div className="flex h-full items-center justify-center">
      <div className="w-full max-w-md rounded-lg bg-gray-100 p-8 shadow-lg">
        <p className="mb-4 text-xl font-bold text-gray-800">
          Enter a passphrase
        </p>
        <p className="mb-2 text-sm text-gray-600">Hint</p>
        <p className="mb-4 break-all text-xs text-gray-500">
          eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbmNyeXB0ZWQtcGFzc3BocmFzZSI6IkJPODdHeGk0OUl3T2tBcmQyMTVvSVE9PSIsInNlY3JldC1rZXktbG9jYXRpb24taGludCI6IkkgcmVtZW1iZXIgd2hhdCB5b3UgZm9yZ2V0LCB5ZXQgSSB2YW5pc2ggd2hlbiB5b3UgcmVzZXQuIFNlZWsgbWUgd2hlcmUgdGhlIGJyb3dzZXIga2VlcHMgaXRzIHdoaXNwZXJzIn0.6IZWEjKMHsq_Sh4n3-z20X5lnGqyjzEm9OctLjHxhyE
        </p>
        <input
          type="text"
          className="mb-4 w-full rounded border border-gray-500 p-3 text-white focus:border-gray-500 focus:outline-none"
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="off"
          spellCheck="false"
        />
        <button
          onClick={onSubmit}
          className="w-full rounded bg-blue-600 p-3 text-white transition duration-300 hover:bg-blue-700"
        >
          Submit
        </button>
      </div>
      <div className="absolute bottom-10 w-full text-center text-sm">
        <p className="text-white">AES ENCRYPTED</p>
      </div>
    </div>
  );
}
