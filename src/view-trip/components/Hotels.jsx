import React from 'react'

import HotelCardItem from './HotelCardItem'

function Hotels({trip}) {
  return (
    <div >
        <h2 className='mt-5 text-xl font-bold'>Hotel Recommendation</h2>
        <div className='grid  md:grid-cols-2 lg:grid-cols-3 gap-5 mt-2'>
            {trip?.tripData?.trip?.hotels?.map((hotel , index)=>(
              <HotelCardItem hotel={hotel}/>
            ))}
        </div>
    </div>
  )
}

export default Hotels