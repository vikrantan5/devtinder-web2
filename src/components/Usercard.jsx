import axios from 'axios';
import React from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from '../utils/feedSlice';

const Usercard = ({ user }) => {
  const dispatch = useDispatch();

  const handlesendRequest = async({status , senderId})=>{
    try{
      const res = await axios.post(BASE_URL +"/request/send/"+ status+"/" +senderId,{}, {withCredentials : true
      });
      console.log(res.data);
      dispatch(removeUserFromFeed(senderId))
    }
    catch(err){
      console.log(err);
    }
  }


    console.log(user)
  return (
    <div className="card bg-base-100 w-80 md:w-96 lg:w-80 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
      <figure className="relative h-48 md:h-56 overflow-hidden">
        <img
          src={user.photoUrl || "https://via.placeholder.com/400x300?text=No+Image"}
          alt={user.firstName}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-2 right-2">
          <div className="badge badge-secondary badge-lg">NEW</div>
        </div>
      </figure>
      
      <div className="card-body p-4 md:p-5">
        <h2 className="card-title text-lg md:text-xl font-bold">
          {user.firstName} {user.lastName}
        </h2>
        
        <p className="text-sm text-gray-600 line-clamp-2 min-h-[2.5rem]">
          {user.about || "No bio available"}
        </p>
        
        <div className="divider my-2"></div>
        
        <div className="flex flex-wrap gap-2 mt-2">
          <div className="badge badge-outline badge-md bg-indigo-50 text-indigo-600 border-indigo-200">
            💼 {user.age}
          </div>
          <div className="badge badge-outline badge-md bg-purple-50 text-purple-600 border-purple-200">
            📍 {user.gender || "Not specified"}
          </div>
        </div>
        
        <div className="card-actions justify-between items-center mt-4">
          <div className="text-xs text-gray-400">
            🚀 Member since {new Date(user.createdAt || Date.now()).getFullYear()}
          </div>
          <div className="flex gap-2">
            <button className="btn btn-primary btn-sm" onClick={()=>{
              handlesendRequest({status: "interested", senderId: user._id})
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              Interested
            </button>
            <button className="btn btn-outline btn-sm" onClick={()=>{
              handlesendRequest({status: "ignore", senderId: user._id})
            }}>Ignore</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Usercard