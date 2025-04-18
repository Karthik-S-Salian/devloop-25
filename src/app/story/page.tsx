"use client";

import { ChevronRight, ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useCallback } from "react";

import { Button } from "~/components/ui/button";

const slides: { image?: string; text: string }[] = [
  {
    text: "Round 1",
  },
  {
    image: "/assets/story/1.jpg",
    text: "Late at night, Putin's secret love for Hello Kitty is just one click away from being exposed.",
  },
  {
    image: "/assets/story/2.jpg",
    text: "Bezos, amused, screenshots the order—his next viral post is already brewing.",
  },
  {
    image: "/assets/story/3.jpg",
    text: "Breaking news: Putin's Hello Kitty obsession takes the internet by storm.",
  },
  {
    image: "/assets/story/5.jpg",
    text: "...",
  },
  {
    image: "/assets/story/4.jpg",
    text: "In the Kremlin, a shattered Hello Kitty mug symbolizes Putin's fury.",
  },
  {
    image: "/assets/story/6.jpg",
    text: "A Russian fighter jet closes in on Bezos' jet—it's now a high-stakes chase.",
  },
  {
    image: "/assets/story/7.jpg",
    text: "Bezos makes a daring escape to his hidden North Pole bunker.",
  },
  {
    image: "/assets/story/8.jpg",
    text: "In a Kremlin conference room, Putin sends a secret message to the world's top detectives. He lays down the challenge: solve a series of puzzles to prove their worth.",
  },
  {
    image: "/assets/story/9.jpg",
    text: "Top detectives are summoned to solve the puzzles and prove their worth.",
  },
  {
    image: "/assets/story/10.jpg",
    text: "The pressure mounts as only the top teams will survive the Kremlin's challenge.",
  },
  {
    image: "/assets/story/12.jpg",
    text: "Detective teams enter Bezos' high-tech bunker, facing mind-bending puzzles.",
  },
  {
    image: "/assets/story/11.jpg",
    text: "Putin watches in admiration and hope, ready to reward the top 3 teams who find Bezos.",
  },
];

const Page = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToSlide = useCallback(
    (index: number) => {
      if (!isTransitioning) {
        setIsTransitioning(true);
        setCurrentSlide(index);
      }
    },
    [isTransitioning],
  );

  const nextSlide = useCallback(() => {
    goToSlide((currentSlide + 1) % slides.length);
  }, [currentSlide, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide((currentSlide - 1 + slides.length) % slides.length);
  }, [currentSlide, goToSlide]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [currentSlide]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100 p-4 pt-0">
      <div className="w-full max-w-6xl scale-125 overflow-hidden rounded-lg bg-black shadow-2xl">
        <div className="relative">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((slide, index) => (
              <div key={index} className="w-full flex-shrink-0">
                {slide.image ? (
                  <div className="relative h-[600px] w-full">
                    <Image
                      src={slide.image}
                      alt={`Slide ${index + 1}`}
                      className="object-contain"
                      fill
                    />
                  </div>
                ) : (
                  <div className="flex h-[600px] w-full items-center justify-center bg-black">
                    <span className="text-6xl font-bold text-white">
                      {slide.text}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4 text-white">
            {slides[currentSlide]?.image && (
              <p className="text-center text-lg font-semibold">
                {slides[currentSlide].text}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between bg-gray-100 p-4">
          <Button
            onClick={prevSlide}
            disabled={isTransitioning}
            className="flex items-center"
          >
            <ChevronLeft className="mr-2 h-4 w-4" /> Previous
          </Button>
          <div className="text-sm font-medium text-gray-500">
            {currentSlide + 1} / {slides.length}
          </div>
          {currentSlide !== slides.length - 1 && (
            <Button
              onClick={nextSlide}
              disabled={isTransitioning}
              className="flex items-center"
            >
              Next <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          )}
          {currentSlide === slides.length - 1 && (
            <Button className="ml-4 text-center" asChild>
              <Link href="/round">PLAY</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
