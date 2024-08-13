import React from 'react'
import { useState , useEffect} from 'react';
import { GetPlacedetails } from '@/components/service/GlobalApi';
import { PHOTO_REF_URL } from '@/components/service/GlobalApi';
import { Link } from 'react-router-dom';

function UserTripCardItem({trip}) {
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
    <Link to={'/view-trip/'+trip?.id}> 
    <div className='hover:scale-105 transition-all '>
        <img src={photoUrl?photoUrl:"/images.png"}  className='h-[220px] w-full object-cover  rounded-xl'/>
        <h2 className='font-bold text-lg'>{trip?.userSelection?.location?.label}</h2>
        <h2 className='text-sm text-gray-500'>{trip?.userSelection?.totalDays} Days of trip with {trip?.userselection?.budget} Budget</h2>
    </div>
    </Link>
  )
}

export default UserTripCardItem