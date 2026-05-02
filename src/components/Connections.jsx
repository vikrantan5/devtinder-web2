import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addConnection } from '../utils/connectionSlice'

const Connections = () => {
    const connection = useSelector((store)=> store.connection);

const dispatch = useDispatch()
const fetchConnections = async()=>{
    try{
    const res = await axios.get(BASE_URL + "/user/connections" , {
        withCredentials : true
    })
    console.log(res.data.data)
    dispatch(addConnection(res.data.data))

}
catch(err){
    console.log(err)
}
}
useEffect(()=>{
    fetchConnections();
} ,[])


if(!connection) return;

if(connection.length === 0){
    return <h1 className='text-2xl font-bold text-black font-lg'>No connections found</h1>
}

  return (
    <div className='w-full h-screen flex justify-center my-10'>
        <h1 className='text-2xl font-bold text-black font-lg'>Connections</h1>

        <div className='mt-20'>
                { connection.map((con)=>{
        const {firstName , lastName , photoUrl, about} = con;
        return(
           <div className="card bg-base-100 w-96 shadow-sm">
  <figure className="px-10 pt-10">
    <img
      src={photoUrl}
      alt="Shoes"
      className="rounded-xl" />
  </figure>
  <div className="card-body items-center text-center">
    <h2 className="card-title">{firstName} {lastName}</h2>
    <p>{about}</p>
    <div className="card-actions">
      <button className="btn btn-primary">Buy Now</button>
    </div>
  </div>
</div>
        )

        })}
        </div>

   
      
    </div>
  )
}

export default Connections
