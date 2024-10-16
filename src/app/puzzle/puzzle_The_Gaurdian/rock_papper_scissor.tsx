import React, { useState } from "react";

import "./rps.css";

// Define types for the choice object
type Choice = {
  id: "rock" | "paper" | "scissor";
  symbol: string;
};

export default function RockPaperScissor() {
  const [playerChoice, setPlayerChoice] = useState<Choice | null>(null);
  const [computerChoice, setComputerChoice] = useState<Choice | null>(null);
  const [message, setMessage] = useState<string>("");
  const [isClickable, setIsClickable] = useState<boolean>(true);
  const [playerScore, setPlayerScore] = useState<number>(0);
  const [compScore, setCompScore] = useState<number>(0);

  const choices: Choice[] = [
    { id: "rock", symbol: "✊" },
    { id: "paper", symbol: "🤚" },
    { id: "scissor", symbol: "✌️" },
  ];

  const getComputerChoice = (playerChoice: Choice): Choice => {
    if (playerChoice.id === "rock") {
      return { id: "paper", symbol: "🤚" };
    } else if (playerChoice.id === "paper") {
      return { id: "scissor", symbol: "✌️" };
    } else {
      return { id: "rock", symbol: "✊" };
    }
  };

  const handlePlayerChoice = (choice: Choice) => {
    if (!isClickable) return;

    setIsClickable(false); // Prevent further clicks
    setPlayerChoice(choice);

    // Simulate computer choice
    const computerChoice = getComputerChoice(choice);
    setComputerChoice(computerChoice);

    // Show result after a delay
    setTimeout(() => {
      determineWinner(choice, computerChoice);
    }, 250);
  };

  const determineWinner = (player: Choice, computer: Choice) => {
    if (player.id === computer.id) {
      setMessage("Draw");
    } else if (
      (player.id === "rock" && computer.id === "paper") ||
      (player.id === "paper" && computer.id === "scissor") ||
      (player.id === "scissor" && computer.id === "rock")
    ) {
      setCompScore(() => compScore + 1);
    } else {
      setPlayerScore(() => playerScore + 1);
    }

    setTimeout(resetGame, 1500);
  };

  const resetGame = () => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setMessage("");
    setIsClickable(true);
  };

  return (
    <div className="game-container">
      {/* Computer choice */}
      <div id="computer-choice" className="hand text-center">
        {computerChoice ? computerChoice.symbol : " 💂 "} 
      </div>

      {/* Player choices */}
      <div id="player" className="hand">
        {choices.map((choice) => (
          <span
            key={choice.id}
            className={`choice ${playerChoice?.id === choice.id ? "chosen" : ""}`}
            onClick={() => handlePlayerChoice(choice)}
            style={{ cursor: isClickable ? "pointer" : "not-allowed" }}
          >
            {choice.symbol}
          </span>
        ))}
      </div>

      {/* Result message */}
      <br />
      <p className="text-4xl ">
        {" "}
        The Guardian : {compScore} - you : {playerScore}
      </p>
    </div>
  );
}