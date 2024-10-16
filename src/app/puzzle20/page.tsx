
'use client'

import { useState, useEffect } from 'react'

export default function Compass() {
  const [tiltLR, setTiltLR] = useState(0)
  const [tiltFB, setTiltFB] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isSupported, setIsSupported] = useState(true)

  useEffect(() => {
    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleOrientation, true)
    } else {
      setIsSupported(false)
    }

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation, true)
    }
  }, [])

  const handleOrientation = (event: DeviceOrientationEvent) => {
    setTiltLR(Math.ceil(event.gamma ?? 0))
    setTiltFB(Math.ceil(event.beta ?? 0))
    setDirection(Math.ceil(event.alpha ?? 0))
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-[#86fe19] font-sans text-center p-8">
      <h1 className="text-2xl font-bold mb-4">Compass/Gyro</h1>

      <div id="notice" className="mb-4">
        {isSupported ? "SUPPORTED on this device / browser..." : "NOT SUPPORTED on this device / browser..."}
      </div>

      <div className="relative w-[260px] h-[260px] mx-auto my-5 bg-[#222] p-5 rounded-[40px] border-4 border-[#444]">
        <div 
          className="absolute top-5 left-5 w-[260px] h-[260px] bg-[url('http://dev.rvltn.eu/compass/compass.svg')] bg-cover"
          style={{ transform: `rotate(${direction}deg)` }}
        />
        <div className="absolute top-5 left-5 w-[260px] h-[260px] bg-[url('http://dev.rvltn.eu/compass/arrow.svg')] bg-cover z-10" />
      </div>

      <div className="orientation-data text-left max-w-xs mx-auto">
        <div>tiltFB: <span id="tiltFB">{tiltFB}</span></div>
        <div>tiltLR: <span id="tiltLR">{tiltLR}</span></div>
        <div>direction: <span id="direction">{direction}</span></div>
      </div>
    </div>
  )
}