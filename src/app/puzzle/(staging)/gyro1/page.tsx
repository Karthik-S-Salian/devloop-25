/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import React, { useEffect, useRef, useState } from "react";

import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";



type BallPosition = {
  x: number;
  y: number;
};

type GyroscopeReading = {
  x: number;
  y: number;
  z: number;
};

declare global {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Window {
    Gyroscope: any;
  }
}

export default function GyroscopeBallPuzzle(): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isSupported, setIsSupported] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const ballPos = useRef<BallPosition>({ x: 150, y: 150 });
  const gyroscope = useRef<any | null>(null);

  useEffect(() => {
    setIsSupported(typeof window !== "undefined" && "Gyroscope" in window);
  }, []);

  useEffect(() => {
    if (!isPlaying) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const ballRadius = 10;
    const holeRadius = 15;
    const holePosition: BallPosition = { x: 250, y: 250 };

    const drawBall = (): void => {
      ctx.clearRect(0, 0, 300, 300);

      // Draw hole
      ctx.beginPath();
      ctx.arc(holePosition.x, holePosition.y, holeRadius, 0, Math.PI * 2);
      ctx.fillStyle = "black";
      ctx.fill();

      // Draw ball
      ctx.beginPath();
      ctx.arc(ballPos.current.x, ballPos.current.y, ballRadius, 0, Math.PI * 2);
      ctx.fillStyle = "red";
      ctx.fill();

      // Check if ball is in the hole
      const distance = Math.sqrt(
        Math.pow(ballPos.current.x - holePosition.x, 2) +
          Math.pow(ballPos.current.y - holePosition.y, 2),
      );
      if (distance < holeRadius - ballRadius) {
        setIsPlaying(false);
        alert("You won!");
      }
    };

    const updateBallPosition = (): void => {
      if (gyroscope.current) {
        const reading = gyroscope.current as unknown as GyroscopeReading;
        const xMovement = reading.x * 0.5; // Adjust sensitivity as needed
        const yMovement = reading.y * 0.5; // Adjust sensitivity as needed
        ballPos.current.x = Math.max(
          ballRadius,
          Math.min(300 - ballRadius, ballPos.current.x + xMovement),
        );
        ballPos.current.y = Math.max(
          ballRadius,
          Math.min(300 - ballRadius, ballPos.current.y - yMovement),
        ); // Inverted Y-axis
      }
    };

    const animate = (): void => {
      updateBallPosition();
      drawBall();
      if (isPlaying) {
        requestAnimationFrame(animate);
      }
    };

    animate();

    return () => {
      if (gyroscope.current) {
        gyroscope.current.stop();
      }
    };
  }, [isPlaying]);

  const startGame = (): void => {
    if (!isSupported) return;
    try {
      gyroscope.current = new window.Gyroscope({ frequency: 60 });
      gyroscope.current.addEventListener("error", (error: Event) => {
        console.error("Gyroscope error: ", error);
        setIsPlaying(false);
      });
      gyroscope.current.start();
      setIsPlaying(true);
      ballPos.current = { x: 150, y: 150 }; // Reset ball position
    } catch (error) {
      console.error("Error starting gyroscope: ", error);
      setIsSupported(false);
    }
  };

  const stopGame = (): void => {
    setIsPlaying(false);
    if (gyroscope.current) {
      gyroscope.current.stop();
    }
  };

  if (!isSupported) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Gyroscope Not Supported</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Sorry, your device does not support the Gyroscope API.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gyroscope Ball Puzzle</CardTitle>
      </CardHeader>
      <CardContent>
        <canvas
          ref={canvasRef}
          width={300}
          height={300}
          style={{ border: "1px solid black", marginBottom: "10px" }}
        />
        <div>
          <Button onClick={startGame} disabled={isPlaying}>
            Start Game
          </Button>
          <Button
            onClick={stopGame}
            disabled={!isPlaying}
            variant="outline"
            className="ml-2"
          >
            Stop Game
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
