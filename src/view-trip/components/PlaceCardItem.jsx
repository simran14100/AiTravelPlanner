import React from 'react'
import { FaLocationDot } from "react-icons/fa6";
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { PHOTO_REF_URL } from '@/components/service/GlobalApi';
import { GetPlacedetails } from '@/components/service/GlobalApi';

function PlaceCardItem({place}) {


  const [photoUrl ,setPhotoUrl ]=useState();
  useEffect(()=>{
    place && GetPlacePhoto();
   },[place])
    
   const GetPlacePhoto=async()=>{
  
     const data={
       textQuery:place.place
     }
     const result=await GetPlacedetails(data).then(resp=>{
       

       const photoUrl=PHOTO_REF_URL.replace('{NAME}' ,resp.data.places[0].photos[3].name );
       setPhotoUrl(photoUrl);
     
}   )
}
  return (
    <div className='border rounded-xl p-3 mt-2 flex gap-3 hover:scale-105 transition-all hover:shadow-md cursor-pointer'>
        <img src={photoUrl?photoUrl:"/images.png"}
            className='w-[130px] h-[130px] rounded-xl object-cover'
        />
        <div>
            <h2 className='font-bold text-lg'>{place.place}</h2>
            <p className='text-sm text-gray-600'>{place.details}</p>
            <p className='mt-2 font-semibold'>🕙{place.timeTravel}</p>
            <Link to={'https://www.google.com/maps/search/?api=1&query='+place?.place }target="_blank"> 
            <Button  className="mt-1" size="2rem"><FaLocationDot /></Button>
            </Link>
        </div>

    </div>
  )
}

export default PlaceCardItem