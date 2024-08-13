import React from 'react'
import { Link } from 'react-router-dom'
import { PHOTO_REF_URL } from '@/components/service/GlobalApi';
import { GetPlacedetails } from '@/components/service/GlobalApi';
import { useState, useEffect } from 'react';

function HotelCardItem({hotel}) {
     
    const [photoUrl ,setPhotoUrl ]=useState();
  useEffect(()=>{
    hotel && GetPlacePhoto();
   },[hotel])
    
   const GetPlacePhoto=async()=>{
     const data={
      textQuery:hotel?.name
     }
     const result=await GetPlacedetails(data).then(resp=>{
        console.log(resp.data.places[0].photos[3].name);

        const photoUrl=PHOTO_REF_URL.replace('{NAME}' ,resp.data.places[0].photos[3].name );
       setPhotoUrl(photoUrl);
}   )
}

  return (
    <Link to={'https://www.google.com/maps/search/?api=1&query='+hotel?.name+","+hotel?.address }target="_blank"> 
                <div className='hover:scale-105 transition-all cursor-pointer'>
                    <img src={photoUrl} className='rounded-xl object-cover h-[180px] w-full '/>
                    <div className='my-2 flex flex-col gap-2'>
                    <h2 className='font-medium'>{hotel?.name}</h2>
                    <h2 className='text-xs text-gray-600'>📍{hotel?.address}</h2>
                    <h2 className='text-xs'>💰{hotel?.price}</h2>
                    <h2 className='text-xs '>⭐{hotel?.rating} stars</h2>
                    </div>
                </div>
                </Link>
  )
}

export default HotelCardItem