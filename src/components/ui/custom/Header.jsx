import React, { useEffect } from 'react'
import { Button } from '../button'
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { googleLogout } from '@react-oauth/google';

import { FcGoogle } from "react-icons/fc";
import { useState } from 'react';


function Header() {
  

  const [openDialog , setOpenDialog]=useState(false);

  const user=JSON.parse(localStorage.getItem('user'));

  useEffect(()=>{
    console.log(user);
  },[])
  console.log(user);
  const login=useGoogleLogin({
    onSuccess:(codeResp)=>
     GetUserProfile(codeResp)
    ,
    onError:(error)=>console.log(error)

  })

  const GetUserProfile=async(tokenInfo)=>{
    console.log('Here' , tokenInfo);
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
         window.location.reload();
          }
        )
    }
  return (
    <div className='flex justify-between w-screen items-center p-3 shadow-sm px-5 '>
        <img src="/logo.svg"/>
      <div>
        {user ? (<div className='flex gap-3 items-center'>

        <a href="/create-trip">
          <Button className="rounded-full">+Create-trip</Button> 
          </a> 
        <a href="/my-trips">
          <Button className="rounded-full">My trip</Button> 
          </a>
        <Popover>
       <PopoverTrigger className='bg-white'>
       <img src={user?.picture} className='rounded-full w-[35px] h-[35px]'/>
       </PopoverTrigger>
       <PopoverContent className="bg-white -mt-4">
       <h2  className='cursor-pointer'
       onClick={()=>{
        googleLogout();
        localStorage.clear();
        window.location.pathname='/';
       }}
       >Log Out</h2></PopoverContent>
      </Popover>

        </div>)
      
        : (<Button onClick={()=>setOpenDialog(true)
        }>Sign in</Button>)
        }
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

export default Header