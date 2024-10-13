"use client";
import React, { useState } from "react";

// Alphabet and Rotor Wiring
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("") as const;
type Letter = typeof ALPHABET[number];

// Rotor Wiring (Example: Enigma I Rotors I, II, III)
const ROTOR_I = "EKMFLGDQVZNTOWYHXUSPAIBRCJ".split("");
const ROTOR_II = "AJDKSIRUXBLHWTMCQGZNPYFVOE".split("");
const ROTOR_III = "BDFHJLCPRTXVZNYEIWGAKMUSQO".split("");

// Reflector (Example: Reflector B)
const REFLECTOR_B = "YRUHQSLDPXNGOKMIEBFZCWVJAT".split("");

// Rotor Positions Notches (Trigger next rotor stepping)
const NOTCHES = {
  r1: "Q", // Notch at Q for Rotor I
  r2: "E", // Notch at E for Rotor II
  r3: "V", // Notch at V for Rotor III
};

type RotorState = {
  r1: number; // Rotor 1 (Rightmost)
  r2: number; // Rotor 2 (Middle)
  r3: number; // Rotor 3 (Leftmost)
};

const EnigmaSimulator: React.FC = () => {
  const [output, setOutput] = useState<string>("Output:");
  const [rotorState, setRotorState] = useState<RotorState>({ r1: 0, r2: 0, r3: 0 });

  // Converts a letter to its corresponding index (A -> 0, B -> 1, ..., Z -> 25)
  const letterToNum = (letter: Letter) => ALPHABET.indexOf(letter);

  // Converts an index (0-25) to its corresponding letter (0 -> A, 1 -> B, ..., 25 -> Z)
  const numToLetter = (num: number): Letter => ALPHABET[(num + 26) % 26];

  // Encrypts a single letter through the Enigma rotors and reflector
  const encrypt = (input: Letter): void => {
    let signal = letterToNum(input); // Convert letter to number
    bumpRotors(); // Step rotors for each letter press

    // Pass through rotors (right to left)
    signal = passThroughRotor(signal, ROTOR_III, rotorState.r1);
    signal = passThroughRotor(signal, ROTOR_II, rotorState.r2);
    signal = passThroughRotor(signal, ROTOR_I, rotorState.r3);

    // Reflector
    signal = reflect(signal, REFLECTOR_B);

    // Pass back through rotors (left to right)
    signal = passBackThroughRotor(signal, ROTOR_I, rotorState.r3);
    signal = passBackThroughRotor(signal, ROTOR_II, rotorState.r2);
    signal = passBackThroughRotor(signal, ROTOR_III, rotorState.r1);

    setOutput((prevOutput) => prevOutput + numToLetter(signal)); // Add result to output
  };

  // Passes a signal through a rotor
  const passThroughRotor = (input: number, rotor: string[], offset: number): number => {
    const adjustedIndex = (input + offset) % 26; // Apply rotor offset
    return letterToNum(rotor[adjustedIndex]); // Get output letter from rotor
  };

  // Passes a signal back through a rotor (reverse mapping)
  const passBackThroughRotor = (input: number, rotor: string[], offset: number): number => {
    const adjustedIndex = rotor.indexOf(numToLetter((input + offset) % 26)); // Reverse lookup in rotor
    return (adjustedIndex - offset + 26) % 26; // Remove rotor offset
  };

  // Reflects the signal through the reflector
  const reflect = (input: number, reflector: string[]): number => {
    return letterToNum(reflector[input]); // Reflects the signal
  };

  // Advances the rotors, with a notch causing the next rotor to step
  const bumpRotors = (): void => {
    setRotorState((prev) => {
      let { r1, r2, r3 } = prev;

      // Step the first rotor (rightmost) every time
      r1 = (r1 + 1) % 26;

      // If rotor I hits its notch, advance rotor II
      if (numToLetter(r1) === NOTCHES.r1) {
        r2 = (r2 + 1) % 26;

        // If rotor II hits its notch, advance rotor III
        if (numToLetter(r2) === NOTCHES.r2) {
          r3 = (r3 + 1) % 26;
        }
      }

      return { r1, r2, r3 };
    });
  };

  // Handles key press for encryption
  const handleKeyClick = (key: Letter): void => {
    encrypt(key);
  };

  // Resets the output display
  const handleReset = (): void => setOutput("Output:");

  // Handles changing the rotor's initial position via dropdowns
  const handleRotorChange = (rotor: keyof RotorState, value: string): void => {
    setRotorState((prev) => ({ ...prev, [rotor]: ALPHABET.indexOf(value) }));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-mono p-6">
      {/* Reset Output Button */}
      <div className="flex justify-end">
        <button
          onClick={handleReset}
          className="bg-gray-800 text-white border border-gray-600 px-4 py-2 rounded hover:bg-gray-700 transition-colors"
        >
          Reset Output
        </button>
      </div>

      {/* Rotor Selector */}
      <div className="mt-6 flex justify-center space-x-2">
        {(["r3", "r2", "r1"] as const).map((rotor) => (
          <select
            key={rotor}
            value={ALPHABET[rotorState[rotor]]}
            onChange={(e) => handleRotorChange(rotor, e.target.value)}
            className="bg-gray-800 text-white border border-gray-600 px-2 py-1 rounded"
          >
            {ALPHABET.map((letter) => (
              <option key={letter} value={letter}>
                {letter}
              </option>
            ))}
          </select>
        ))}
      </div>

      {/* Output Display */}
      <div className="mt-6 text-center">
        <span className="block bg-gray-800 text-white py-4 px-6 rounded">
          {output}
        </span>

        {/* Keyboard for User Input */}
        <div className="mt-4 flex flex-wrap justify-center">
          {ALPHABET.map((letter) => (
            <button
              key={letter}
              className="bg-gray-800 border border-gray-600 text-white px-4 py-2 m-1 rounded-full hover:bg-gray-700 transition-colors"
              onClick={() => handleKeyClick(letter)}
            >
              {letter}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EnigmaSimulator;
