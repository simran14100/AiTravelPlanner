import React, { useEffect, useState } from 'react'
import { IoIosSend } from "react-icons/io";
import { Button } from '@/components/ui/button';
import { GetPlacedetails } from '@/components/service/GlobalApi';
import { PHOTO_REF_URL } from '@/components/service/GlobalApi';

function InfoSection({trip}) {
  
  const [photoUrl ,setPhotoUrl ]=useState();
  useEffect(()=>{
    trip && GetPlacePhoto();
   },[trip])
    
   const GetPlacePhoto=async()=>{
     const data={
       textQuery:trip?.userSelection?.location?.label
     }
     const result=await GetPlacedetails(data).then(resp=>{
       

       const photoUrl=PHOTO_REF_URL.replace('{NAME}' ,resp.data.places[0].photos[3].name );
       setPhotoUrl(photoUrl);
}   )
} 
  return (
    <div >
        <img src={photoUrl?photoUrl:"/images.png"} className='h-[250px] w-full object-cover  rounded-xl'/>
        <div className='flex justify-between items-center'>
        
        <div className='my-5 flex flex-col gap-2'>
            <h2 className='font-bold text-2xl'>{trip?.userSelection?.location?.label}</h2>
            <div className='flex gap-5'>
                <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-sm md:text-md'>📅{trip?.userSelection?.totalDays} Day</h2>
                <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-sm md:text-md'>💰{trip?.userSelection?.budget} Budget</h2>
                <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-sm md:text-md'> 🍾No. of Traveller:{trip?.userSelection?.traveller}</h2>
            </div>
        </div>

        
        </div>
    </div>
  )
}

export default InfoSection