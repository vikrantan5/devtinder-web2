import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addRequest, removeRequest } from '../utils/requestSlice'
import { useState } from 'react'

const Requests = () => {
    const dispatch = useDispatch();
    const requestdata = useSelector((store) => store.request);



    const reviewRequest=async (status , requestId)=>{

        try{
            const res = await axios.post(BASE_URL + "/request/review/"+status +"/" +requestId ,{},{
                withCredentials : true
            })
            dispatch(removeRequest(requestId))

        }
        catch(err){
            console.log(err);
        }

    }

    const fetchRequests = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/requests/recieved", {
                withCredentials: true
            })
            console.log("Requests data:", res.data.data)
            dispatch(addRequest(res.data.data))
        } catch (err) {
            console.error("Error fetching requests:", err)
        }
    }

    useEffect(() => {
        fetchRequests()
    }, [])





    if(!requestdata) return;

if(requestdata.length === 0){
    return <h1 className='text-2xl font-bold text-black font-lg'>No connections found</h1>
}


    return (
        <div className='w-full min-h-screen bg-gray-50 py-10'>
            <div className='container mx-auto px-4'>
                <h1 className='text-3xl font-bold text-center text-gray-800 mb-8'>
                    Connection Requests
                </h1>
                
                {!requestdata || requestdata.length === 0 ? (
                    <div className='text-center py-10'>
                        <p className='text-gray-500 text-lg'>No pending requests</p>
                    </div>
                ) : (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto'>
                        {requestdata?.map((request) => {
                            // ✅ CORRECT: Access the fromUserId object properly
                            const { firstName, lastName, photoUrl, about, _id } = request.fromUserId || {};
                            
                            return (
                                <div key={_id || request._id} className="card bg-base-100 w-full shadow-xl hover:shadow-2xl transition-shadow duration-300">
                                    <figure className="px-10 pt-10">
                                        <img
                                            src={photoUrl || "https://via.placeholder.com/150"}
                                            alt={`${firstName} ${lastName}`}
                                            className="rounded-full w-32 h-32 object-cover"
                                            onError={(e) => {
                                                e.target.src = "https://via.placeholder.com/150?text=No+Image";
                                            }}
                                        />
                                    </figure>

                                  
                                    <div className="card-body items-center text-center">
                                        <h2 className="card-title text-xl font-bold">
                                            {firstName} {lastName}
                                        </h2>
                                        <p className="text-gray-600">{about || "No bio provided"}</p>
                                          
                                        <div className="card-actions mt-4">
                                            <button value={"accepted"} onClick={()=>{
                                                reviewRequest("accepted",request._id)
                                                setShowbutton(false);
                                            }} className="btn btn-primary">Accept Request</button>
                                            <button value={"rejected"} onClick={()=>{
                                                reviewRequest("rejected", request._id)
                                                setShowbutton(false);
                                            }} className="btn btn-outline btn-secondary">Reject</button>
                                        </div>
                                         
                                    </div>
                                   
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Requests