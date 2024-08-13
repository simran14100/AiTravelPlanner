import React from 'react'
import { Button } from '../button'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div className='flex flex-col items-center  justify-center gap-9  '>
        
        <h1 className='font-extrabold text-[39px] text-center mt-16 '>
        <span className='text-[#f56551]'>Discover your next Adventure with AI: <br/></span>Personalized Itineries at your Fingertips</h1>

        <p className='text-gray-500 text-xl text-center '>Your personel trip planner and travel curator , creating custom itineries tailored to your interests and budget. </p>


         <Link to="/create-trip">
         <Button className="bg-[#1a1a1a] text-white">Get Started , It's Free </Button>
         </Link>

        
        
    </div>
  )
}

export default Hero