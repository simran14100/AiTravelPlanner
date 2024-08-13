import React, { useEffect, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { Input } from '@/components/ui/input';
import { AI_PROMPT, SelectBudgetOptions, SelectTravelList } from '@/components/constants/options';
import { Button} from '@/components/ui/button';
import { FcGoogle } from "react-icons/fc";
import { toast } from 'sonner';
import { chatSession } from '@/components/service/AIModal';

import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doc } from 'firebase/firestore';
import { db } from '@/components/service/firebaseConfig';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { setDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogClose,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Contrast } from 'lucide-react';




function CreateTrip() {

  const [place , setPlace]=useState();
  const [formData , setFormData]=useState();
  const [openDialog , setOpenDialog]=useState(false);
  const [loading , setLoading]=useState(false);
  const navigate=useNavigate();

  const handleInputChange=(name , value)=>{ 
  setFormData({
    ...formData,
    [name]:value
  })
  }

  useEffect(()=>{
    console.log(formData);
  },[formData]) 

  const login=useGoogleLogin({
    onSuccess:(codeResp)=>GetUserProfile(codeResp),
    onError:(error)=>console.log(error)
  })

   async function onGenerateTrip(){

   const user=  localStorage.getItem('user');

   if(!user){
    setOpenDialog(true);
    return;
   }

   if(formData?.totalDays>5 && !formData?.location||  !formData?.budget || !formData?.traveller){
    toast("Please fill all the details");
    return;
   }
   setLoading(true);
   const FINAL_PROMPT=AI_PROMPT
  .replace('{location}',formData?.location?.label)
  .replace('{budget}',formData?.budget)
  .replace('{traveller}',formData?.traveller)
  .replace('{totalDay}',formData?.totalDays)
  .replace('{totalDay}',formData?.totalDays)

  console.log(FINAL_PROMPT);

   const result=await chatSession.sendMessage(FINAL_PROMPT);
   console.log("--",result?.response?.text());
   setLoading(false);
   SaveAiTrip(result?.response?.text()); 
  }

  const SaveAiTrip=async(TripData)=>{
    setLoading(true);
    const user=JSON.parse(localStorage.getItem('user'));
    const docId=Date.now().toString()

    await setDoc(doc(db,"AiTrips",docId),{
      userSelection:formData,
      tripData:JSON.parse(TripData),
      userEmail:user?.email,
      id:docId,
      });
      setLoading(false);
      navigate('/view-trip/'+docId)
    }
  

  const GetUserProfile=(tokenInfo)=>{
  axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
      {
        header:{
          Authorization:`Bearer ${tokenInfo?.access_token}`,
          Accept:'Application/json',
        }
      } ).then(
        (resp)=>{
          console.log(resp);
          localStorage.setItem('user',JSON.stringify(resp.data));
          setOpenDialog(false);
          onGenerateTrip();
        }
      )
  }
 
  return (
    <div className='  sm:px-10 md:px-32 lg:px-52 px-5 mt-10 '> 
    <h2 className='font-bold text-3xl '>Tell us your travel preferenies 🏕️🌴</h2>
    <p className='mt-3 text-gray-500 text-xl  '>Just provide some basic information, and our trip planner will generate a customised itinerary based on our prefences</p>

    <div>
    <div className='mt-10 flex flex-col gap-9'>
    <h2 className='text-xl my-3 font-medium -mb-6'>What is your destination?</h2>
    <GooglePlacesAutocomplete
      apiKey={import.meta.env.VITE_GOGGLE_PLACE_API_KEY}
     selectProps={{
      place,
      onChange:(v)=>{setPlace(v);
      handleInputChange("location" , v)
      }
     }}
    />
    </div>

    <div className='mt-8'>
        <h2 className='text-xl my-3 font-medium'>How many days are you planning your trip</h2>
        <Input placeholder={3} type="number"
          onChange={(e)=>handleInputChange("totalDays" , e.target.value)}
        />
    </div>
      
    </div>

       <div>
        <h2 className='text-xl my-3 font-medium'>What is your budget?</h2>
        <div className='grid grid-cols-3 gap-5 mt-5'>
         {SelectBudgetOptions.map((item , index)=>(
          <div key={index} 
          className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg
          ${formData?.budget == item.title && 'shadow-lg border-black'}`}
    
          onClick={()=>handleInputChange("budget" , item.title)}>
             <h2 className='text-4xl'>{item.icon}</h2>
             <h2 className='font-bold text-lg'>{item.title}</h2>
             <h2 className='text-sm text-gray-600'>{item.desc}</h2>
          </div>
         ))}
        </div>

  
       </div>

       <div>
        <h2 className='text-xl my-3 font-medium'>Who do you plan on travelling with on your next adventure ?</h2>
        <div className='grid grid-cols-3 gap-5 mt-5'>
        {SelectTravelList.map((item , index)=>(
          <div key={index} 
          className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg
          ${formData?.traveller == item.people && 'shadow-lg border-black'}`}
          onClick={()=>handleInputChange("traveller" , item.people)}>
             <h2 className='text-4xl'>{item.icon}</h2>
             <h2 className='font-bold text-lg'>{item.title}</h2>
             <h2 className='text-sm text-gray-600'>{item.desc}</h2>
          </div>
         ))}
        </div>

  
       </div>

         <div className='my-10 justify-end flex'>
            
            <Button onClick={onGenerateTrip} disabled={loading}
            > 
            {
                loading?<AiOutlineLoading3Quarters className="w-7 h-7 animate-spin"/>:
              "Generate trip"
            }
            </Button>
         </div>


         
         <Dialog open={openDialog}>
  
  <DialogContent className="bg-slate-100">

  
    <DialogHeader>
     
      <DialogDescription >
       
    
        <img src="logo.svg"/>
        <h2 className='text-lg font-bold mt-7'>Sign in With Google</h2>
        <p>Sign in to the app with Google authentication securely</p>
        <Button  onClick={login}
        className="w-full flex gap-4 mt-5 items-center">
          <FcGoogle/>
          Sign in With Google
        </Button>
    
      </DialogDescription>
    </DialogHeader>
    
  </DialogContent>

</Dialog>

    </div>    
       
  )
  

}
export default CreateTrip