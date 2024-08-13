import { db } from '@/components/service/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react';
import InfoSection from '../components/InfoSection';
import Hotels from '../components/Hotels';
import PlacesToVisit from '../components/PlacesToVisit';
import Footer from '../components/Footer';

function index() {

  const {tripId}=useParams();
  const[trip , setTrip]=useState([]);

  useEffect(()=>{
   tripId&&GetTripData()
  },[tripId])

  const GetTripData=async()=>{
    const docRef=doc(db , 'AiTrips' , tripId);
    const docSnap=await getDoc(docRef);

    if(docSnap.exists()){
      console.log("Document:" , docSnap.data());
      setTrip(docSnap.data());

    }else{
      console.log("No such document");
    }
  }
  return (


    <div className='p-10 md:px-20 lg:px-44 '>
        <InfoSection trip={trip}/>
        <Hotels trip={trip}/>
        <PlacesToVisit trip={trip}/>
        <Footer/>
    </div>
  )
}

export default index