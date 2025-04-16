"use client";

import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { useEffect, useRef } from "react";

gsap.registerPlugin(Draggable);

type GravitySliderProps = {
  onChange: (value: number) => void;
};

export default function GravitySlider({ onChange }: GravitySliderProps) {
  const pointerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pointerRef.current) return;

    const draggable = Draggable.create(pointerRef.current, {
      type: "rotation",
      inertia: true,
      // Limit rotation between 0 and 100 degrees (you can adjust these values)
      bounds: { minRotation: 0, maxRotation: 100 },
      onDrag: function () {
        if (onChange) {
          onChange((this as Draggable).rotation);
        }
      },
      onDragEnd: function () {
        // When released, animate back to 0 (simulate gravity)
        gsap.to(pointerRef.current, {
          rotation: 0,
          duration: 1.5,
          ease: "bounce.out",
          onUpdate: function () {
            if (onChange) {
              const currentRotation = gsap.getProperty(
                pointerRef.current,
                "rotation",
              );
              onChange(currentRotation as number);
            }
          },
        });
      },
    });

    return () => {
      draggable[0]?.kill();
    };
  }, [onChange]);

  return (
    <div className="relative flex h-40 w-40 cursor-grab select-none items-center justify-center rounded-full bg-gray-300 shadow-lg">
      {/* The pointer element that visibly rotates */}
      <div
        ref={pointerRef}
        className="absolute flex items-center justify-center"
        style={{ transformOrigin: "50% 90%" }} // Set pivot point near the bottom center
      >
        {/* A vertical bar as pointer */}
        <div className="h-20 w-2 bg-black" />
      </div>
      {/* Optional: A label in the center */}
      {/* <div className="z-10 text-2xl font-bold">Rotate Me</div> */}
    </div>
  );
}
