'use client'

import { useEffect, useRef } from 'react'
import RGBImageSplitter from '~/components/rgb-image'
export default function Page() {
 

  return (
    <div>
    <RGBImageSplitter imageSrc={'rgb-image-text.png'}></RGBImageSplitter>
    </div>
  )
}