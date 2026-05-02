import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'

const Connections = () => {


const fetchConnections = async()=>{
    try{
    const res = await axios.get(BASE_URL + "/user/connections" , {
        withCredentials : true
    })
    console.log(res.data.data)

}
catch(err){
    console.log(err)
}
}
useEffect(()=>{
    fetchConnections();
} ,[])


  return (
    <div className='flex justify-center my-10'>
        <h1 className=' font-bold text-black font-lg'>Connections</h1>
      
    </div>
  )
}

export default Connections
