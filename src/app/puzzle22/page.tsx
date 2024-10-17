'use client'
import React, { useState, useEffect } from 'react'
import { Button } from "~/components/ui/button"

const WIRE_COLORS = ['yellow', 'green', 'red', 'blue', 'white']
const ANSWER_SEQUENCE = ['yellow', 'red', 'white', 'blue', 'green']; 

export default function Component() {
  const [time, setTime] = useState(300) // 5 minutes in seconds
  const [isActive, setIsActive] = useState(false)
  const [hasExploded, setHasExploded] = useState(false)
  const [clickedWire, setClickedWire] = useState<string | null>(null);
  const [cutWires, setCutWires] = useState<Set<string>>(new Set());
  const [selectedColor, setSelectedColor] = useState<string[]>([]);
  const [explode, setExplode] = useState(false); 
  const [videoEnded, setVideoEnded] = useState(false); 

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1)
      }, 1000)
    } else if (time === 0 && !hasExploded) {
      setHasExploded(true)
      setExplode(true);
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, time, hasExploded])

  useEffect(() => {
    if (hasExploded) {
      setIsActive(false);
    }
  }, [hasExploded]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const toggleTimer = () => {
    setIsActive(!isActive)
  }

  const handleWireClick = (color: string) => {
    setClickedWire(color);
    setSelectedColor(prevColors => [...prevColors, color]);
    setCutWires(prevCutWires => new Set(prevCutWires).add(color));
    setTimeout(() => setClickedWire(null), 3000);
  };

  const submit = () => {
    if (selectedColor.length < 5) {
      alert("Cut all wires");
      return;
    }

    let isMatch = true;
    for (let i = 0; i < 5; i++) {
      if (ANSWER_SEQUENCE[i] !== selectedColor[i]) {
        isMatch = false;
        break;
      }
    }

    if (isMatch) {
      alert("Sequences match!");
      setIsActive(false);
    } else {
      alert("Sequences do not match.");
      setHasExploded(true);
      setExplode(true);
      setIsActive(false);
      setVideoEnded(false); // Reset video ended state
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#282828] bg-[radial-gradient(black_15%,transparent_16%)_0_0,radial-gradient(black_15%,transparent_16%)_8px_8px] bg-[length:16px_16px]">
      
      
      <div className={`relative ${hasExploded ? 'explode' : ''}`}> 
      <div className='text-xs text-[#282828] absolute top-[-100px] left-[-200px]'>
      <p>{ANSWER_SEQUENCE[0]}</p>
      <p>{ANSWER_SEQUENCE[1]}</p>
      <p>{ANSWER_SEQUENCE[2]}</p>
      <p>{ANSWER_SEQUENCE[3]}</p>
      <p>{ANSWER_SEQUENCE[4]}</p>
      </div>  
     
        {explode && (
          <div className="fixed inset-0 z-50 bg-black">
            <video
              className="w-full h-full object-cover"
              autoPlay
              onEnded={() => setVideoEnded(true)}
            >
              <source src="/explosion.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        )}
        {!explode || videoEnded ? (
          <div className="bomb relative flex flex-col items-center justify-center text-[1.1vw] filter drop-shadow-[1em_1em_0.3em_rgba(0,0,0,0.5)]">
            {/* Dynamite sticks */}
            {[0, 1, 2].map((index) => (
              <div
                key={index}
                className={`w-[52em] h-[9em] bg-gradient-to-b from-[#3A0101] via-[#A00202] to-[#3A0101] relative ${
                  index === 0 ? 'translate-y-[2em]' : index === 2 ? '-translate-y-[2em]' : 'z-10 w-[54em]'
                } filter drop-shadow-[0_0.2em_0.1em_rgba(0,0,0,0.5)] drop-shadow-[0_-0.2em_0.1em_rgba(0,0,0,0.5)]`}
              >
                <div className="absolute top-0 left-[-1.9em] w-[2em] h-full bg-gradient-to-b from-[#3A0101] via-[#A00202] to-[#3A0101] rounded-l-full"></div>
                <div className="absolute top-0 right-[-1.9em] w-[2em] h-full bg-gradient-to-b from-[#3A0101] via-[#A00202] to-[#3A0101] rounded-r-full"></div>
              </div>
            ))}

            {/* Tape */}
            <div className="absolute z-20 w-[3em] h-[23em] top-[calc(50%-11.5em)] left-[8em] rounded-l-full shadow-[-1em_0_0_0_black,_-2em_0_0_0_black,_-3em_0_0_0_black,_-4em_0_0_0_black] filter drop-shadow-[0_0_0.3em_rgba(0,0,0,0.4)]"></div>
            <div className="absolute z-20 w-[3em] h-[23em] top-[calc(50%-11.5em)] right-[8em] rounded-r-full shadow-[1em_0_0_0_black,_2em_0_0_0_black,_3em_0_0_0_black,_4em_0_0_0_black] filter drop-shadow-[0_0_0.3em_rgba(0,0,0,0.4)]"></div>

            {/* Circuit board */}
            <div className="circuit absolute top-[calc(50%-8em)] left-[calc(50%-12em)] z-20 text-[1em] bg-[#08422A] w-[24em] h-[16em] shadow-[0.1em_0.1em_0.1em_rgba(0,0,0,0.4),_-0.1em_-0.1em_0.1em_rgba(0,0,0,0.4),_-0.1em_0.1em_0.1em_rgba(0,0,0,0.4),_0.1em_-0.1em_0.1em_rgba(0,0,0,0.4),_0.3em_0.3em_0.3em_rgba(0,0,0,0.5)]">
              {/* LCD Display */}
              <div className="lcd relative w-[19.5em] h-[7em] bg-black mx-auto mt-4 filter drop-shadow-[0.05em_0.05em_0_rgba(0,0,0,0.4)] drop-shadow-[-0.05em_-0.05em_0_rgba(0,0,0,0.4)] drop-shadow-[0.4em_0.4em_0.3em_rgba(0,0,0,0.5)]">
                <div className="lcd__background absolute text-[5em] text-right right-[0.6em] top-[0.02em] text-[rgba(255,255,255,0.1)] font-['LCD_AT&T_Phne_Time/Date',_sans-serif]">88:88</div>
                <div className="lcd__time absolute text-[5em] text-right right-[0.6em] top-[0.02em] text-[#E00505] font-['LCD_AT&T_Phne_Time/Date',_sans-serif] [text-shadow:0_0_0.5em_#E00505,_0_0_0.1em_#E00505]">{formatTime(time)}</div>
              </div>

              {/* Buttons */}
              <div className="flex justify-center space-x-4 mt-4">
                <Button
                  onClick={toggleTimer}
                  className="w-[2.3em] h-[2.3em] rounded-full bg-gradient-radial from-[#C41B2B] via-[#DB3E3E] to-[#8F2844] shadow-[0.1em_0.1em_0.2em_rgba(0,0,0,0.4)]"
                >
                  {isActive ? '■' : '▶'}
                </Button>
                <Button onClick={submit}>confirm</Button> 
              </div>
            </div>

            {/* Wires */}
            <svg className="absolute right-[-6.2em] top-[6em] w-[24em] z-40 filter drop-shadow-[0.5em_0.5em_0.2em_rgba(0,0,0,0.3)]" viewBox="0 0 240 160">
              {WIRE_COLORS.map((color, index) => {
                const isCut = cutWires.has(color);
                const d = isCut
                  ? `M10,${20 + index * 30} C30,${20 + index * 30} 40,${50 + index * 20} 60,${60 + index * 15} M180,${100 + index * 5} C200,${90 + index * 8} 220,${85 + index * 9} 230,${80 + index * 10}`
                  : `M10,${20 + index * 30} C50,${20 + index * 30} 100,${80 + index * 10} 230,${80 + index * 10}`;

                return (
                  <path
                    key={color}
                    className={`wire wire--${color} cursor-pointer`}
                    d={d}
                    stroke={color}
                    strokeWidth="3"
                    fill="none"
                    onClick={() => handleWireClick(color)}
                  />
                );
              })}
            </svg>
          </div>
        ) : null}

        {hasExploded && (
          <div className="absolute inset-0 flex items-center justify-center bg-red-500 bg-opacity-75 rounded-lg explode">
            <span className="text-4xl font-bold text-white">BOOM!</span>
          </div>
        )}
      </div>
      
    </div>
  )
}

