import React from 'react'
import QrCode from '../../components/qrCode/qrCode'
export default function page() {
  return (
    <div className='w-[30%] m-auto text-center mt-6 '>

         <h2>Solve QrCode to get the meaning</h2>      
         <QrCode dimension={3} message='our value/answer'></QrCode>
    </div>
  )
}
