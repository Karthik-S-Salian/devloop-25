"use client";

//GYRO
import { Trophy, RotateCcw } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export default function GyroGame() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const position = useRef({ x: 50, y: 80 });
  const [goalReached, setGoalReached] = useState(false);
  const [movementDisabled, setMovementDisabled] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const resetGame = () => {
    position.current = { x: 50, y: 80 };
    setGoalReached(false);
    setMovementDisabled(false);
    setAttempts((prev) => prev + 1);
    drawCanvas();
  };

  useEffect(() => {
    const handleMotion = (event: DeviceOrientationEvent) => {
      if (movementDisabled) return;
      const { gamma, beta } = event;
      if (gamma !== null && beta !== null) {
        position.current = {
          x: Math.min(90, Math.max(10, position.current.x + gamma * 0.1)),
          y: Math.min(90, Math.max(10, position.current.y + beta * 0.1)),
        };
        drawCanvas();
      }
    };

    window.addEventListener("deviceorientation", handleMotion);
    return () => window.removeEventListener("deviceorientation", handleMotion);
  }, [movementDisabled]);

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw decorative background pattern
    ctx.fillStyle = "#1a1a1a";
    for (let i = 0; i < canvas.width; i += 30) {
      for (let j = 0; j < canvas.height; j += 30) {
        ctx.fillRect(i, j, 2, 2);
      }
    }

    // Draw ground with gradient
    const gradient = ctx.createLinearGradient(
      0,
      0,
      canvas.width,
      canvas.height,
    );
    gradient.addColorStop(0, "#065f46");
    gradient.addColorStop(1, "#047857");
    ctx.fillStyle = gradient;
    ctx.fillRect(50, 50, canvas.width - 100, canvas.height - 100);

    // Draw goal with glow effect
    ctx.shadowColor = "rgba(234, 179, 8, 0.5)";
    ctx.shadowBlur = 20;
    ctx.fillStyle = "#eab308";
    ctx.fillRect(60, 60, 50, 50);
    ctx.shadowBlur = 0;

    // Draw ball with gradient and shadow
    const ballGradient = ctx.createRadialGradient(
      (position.current.x / 100) * canvas.width,
      (position.current.y / 100) * canvas.height,
      0,
      (position.current.x / 100) * canvas.width,
      (position.current.y / 100) * canvas.height,
      15,
    );
    ballGradient.addColorStop(0, "#60a5fa");
    ballGradient.addColorStop(1, "#3b82f6");

    ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
    ctx.shadowBlur = 10;
    ctx.fillStyle = ballGradient;
    ctx.beginPath();
    ctx.arc(
      (position.current.x / 100) * canvas.width,
      (position.current.y / 100) * canvas.height,
      15,
      0,
      Math.PI * 2,
    );
    ctx.fill();
    ctx.shadowBlur = 0;

    // Check collision
    if (!goalReached && position.current.x < 20 && position.current.y < 20) {
      toast.success("Congratulations!", {
        description: "You've reached the goal! 'here is ur answer: lorem'",
        duration: 3000,
      });
      setGoalReached(true);
      setMovementDisabled(true);
    }
  };

  useEffect(() => {
    drawCanvas();
    window.addEventListener("resize", drawCanvas);
    return () => window.removeEventListener("resize", drawCanvas);
  }, []);

  const startGame = () => {
    drawCanvas();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 p-4">
      <div className="flex h-full w-full flex-col md:h-3/4 md:w-3/4 lg:w-2/3 xl:w-1/2">
        <div className="mb-4 flex items-center justify-between">
          <div className="text-white">Attempts: {attempts}</div>
          {goalReached && (
            <div className="flex items-center gap-2 text-yellow-500">
              <Trophy size={20} />
              <span>Goal Reached!</span>
            </div>
          )}
          <button
            onClick={resetGame}
            className="flex items-center gap-2 rounded border border-gray-600 px-3 py-1.5 text-sm text-white transition-colors duration-200 hover:bg-gray-700"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </button>
        </div>
        <canvas
          ref={canvasRef}
          className="w-full flex-1 rounded-lg border border-gray-600 bg-gray-800 shadow-2xl"
        />
      </div>
    </div>
  );
}
