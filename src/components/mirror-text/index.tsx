'use client'

import { useEffect, useRef } from 'react'

export default function MirrorCard() {
  const contentRef = useRef<HTMLDivElement>(null)
  const mirrorContentRef = useRef<HTMLDivElement>(null)
  const textContentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (contentRef.current && mirrorContentRef.current && textContentRef.current) {
      mirrorContentRef.current.innerHTML = contentRef.current.innerHTML
      const textContent = contentRef.current.innerText
      textContentRef.current.innerText = textContent
    }
  }, [])

  return (
    <div className="relative w-full min-h-screen overflow-hidden flex items-center justify-center bg-background">
    
      <div>
        <div>
        <div>
        <div>
        <div>
        <div>
        <div>
        <div>
        <div>


        <p className='text-center my-12 '>Text Translation: ukranian-english, i am the nearer continent to the weird country that allows actors to lead it</p>
        <div ref={contentRef} className="hidden">
        <div className="container mx-auto px-4">
          <div className="bg-card text-card-foreground rounded-lg shadow-lg max-w-md mx-auto">
            <div className="bg-muted px-4 py-2 rounded-t-lg text-center">Here we go</div>
            <div className="p-6">
              <h5 className="text-xl font-bold mb-2 text-center">AHEM</h5>
              <p className="mb-4 text-center">Я є прихильником дивної країни, яка дозволяє акторам кіно керувати нею</p>
              <div className="text-center">
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        id="mirror-content"
        ref={mirrorContentRef}
        className="w-full h-full transform -scale-x-100 user-select-none pointer-events-none"
        aria-hidden="true"
        style={{ userSelect: 'none', pointerEvents: 'none' }}
      ></div>

      <div
        ref={textContentRef}
        className="sr-only"
        aria-label="Copyable mirrored text content"
      ></div>




        </div>
        </div>
        </div>
        </div>
        </div>
        </div>
        </div>
        </div>
        
        
        
        
      </div>

    </div>
  )
}
