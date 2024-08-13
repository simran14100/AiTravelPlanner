import React from 'react'
import { useNavigation } from 'react-router-dom';
import { useEffect  , useState} from 'react';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db  } from '@/components/service/firebaseConfig';
import UserTripCardItem from './components/UserTripCardItem';
function MyTrips() {
 
    const [userTrips , setUserTrips]=useState([]);
    const navigation=useNavigation();
    useEffect(()=>{
        GetUserTrips();
    },[])
   
    const GetUserTrips=async()=>{
        const user=JSON.parse(localStorage.getItem('user'));
    

        if(!user){
            navigation('/');
            return;
        }
        setUserTrips([]);
        const q = query(collection(db, "AiTrips"), where("userEmail", "==", user?.email));

     const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data());
  setUserTrips(prevVal=>[...prevVal , doc.data()])
});

    }
  return (
    <div className='  sm:px-10 md:px-32 lg:px-52 px-5 mt-10 '
    >
        <h2 className='font-bold text-3xl'>My Trips</h2>

        <div className='mt-8 grid grid-cols-2 md:grid-cols-3 gap-5 rounded-lg'>
            {
                userTrips?.length>0?userTrips?.map((trip, index)=>(
                    
                    <UserTripCardItem trip={trip} />
                )

                ):
                [1,2,3,4,5,6].map((item , index)=>(
                    <div key={index} className='h-[220px] w-full bg-slate-200 animate-pulse rounded-xl'>

                    </div>
                )

                )
            }
        </div>
    </div> 
  )
}

export default MyTrips