import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addConnection } from '../utils/connectionSlice'

const Connections = () => {


  


    const connection = useSelector((store) => store.connection);
    const dispatch = useDispatch()

    const fetchConnections = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/connections", {
                withCredentials: true
            })
            console.log(res.data.data)
            dispatch(addConnection(res.data.data))
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchConnections()
    }, [])

    if (!connection) return (
        <div className='w-full min-h-screen flex justify-center items-center'>
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
    )

    if (connection.length === 0) {
        return (
            <div className='w-full min-h-screen flex justify-center items-center'>
                <h1 className='text-2xl font-bold text-gray-600'>No connections found</h1>
            </div>
        )
    }

    return (
        <div className='w-full min-h-screen bg-gray-50 py-10'>
            <div className='container mx-auto px-4'>
                <h1 className='text-3xl font-bold text-center text-gray-800 mb-8'>
                    Connections ({connection.length})
                </h1>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto'>
                    {connection.map((con) => {
                        const { firstName, lastName, photoUrl, about, _id } = con;
                        return (
                            <div key={_id} className="card bg-base-100 w-full shadow-xl hover:shadow-2xl transition-shadow duration-300">
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
                                        <button className="btn btn-primary">View Profile</button>
                                        <button className="btn btn-outline btn-secondary">Message</button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Connections