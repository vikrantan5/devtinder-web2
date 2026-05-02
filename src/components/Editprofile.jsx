import React, { useState } from 'react'
import Usercard from './Usercard';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice'; 

const Editprofile = ({ user }) => {
    console.log(user)
  // State for form fields - initialize with values from user prop
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender || "male");
  const [about, setAbout] = useState(user?.about || "");
  const [skills, setSkills] = useState(user?.skills?.join(", ") || "");
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "https://randomuser.me/api/portraits/men/75.jpg");
  const [error ,setError] = useState("");

const [showtoast , setShowtoast] = useState(false);

  const dispatch =useDispatch();

  const saveProfile =async ()=>{
    setError("")
    try{
      const res = await axios.patch(BASE_URL+"/profile/edit" ,{firstName , lastName ,age , about , photoUrl ,gender , skills } ,{withCredentials : true})


      // dispatchEvent(addUser(res.data))
      dispatch(addUser(res?.data?.data))
      setShowtoast(true);
      setTimeout(()=>{
        setShowtoast(false);
      },3000)
    }
    catch(err){
      setError(err?.message || "An error occurred while saving your profile. Please try again.")
      console.log(err.message)
    }

  }

  return (
    <>

        <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl">
        {/* Background decorations */}
        <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-white rounded-full opacity-10 animate-pulse"></div>
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-white rounded-full opacity-10 animate-pulse delay-1000"></div>
        </div>


        {/* Main Card */}
        <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden">
          {/* Decorative top bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

          <div className="p-8">
            {/* Header Section */}
            <div className="text-center mb-8">
              <div className="inline-flex p-3 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl mb-4 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-1">Edit Profile</h2>
              <p className="text-gray-500 text-sm">Update your personal information</p>
            </div>

            {/* Profile Photo Section */}
            <div className="flex flex-col items-center mb-6">
              <div className="relative">
                <img
                  src={photoUrl}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/128?text=No+Image";
                  }}
                />
                <div className="absolute -bottom-2 -right-2 bg-indigo-600 rounded-full p-2 shadow-lg">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-5">
              {/* Photo URL Field */}
              <div className="transform transition-all duration-200 hover:translate-x-1">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Photo URL
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={photoUrl}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-800 focus:outline-none focus:border-indigo-400 focus:bg-white transition-all duration-200"
                    onChange={(e) => setPhotoUrl(e.target.value)}
                    placeholder="https://example.com/your-photo.jpg"
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1">Enter a valid image URL for your profile picture</p>
              </div>

              {/* First Name & Last Name - 2 columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="transform transition-all duration-200 hover:translate-x-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-800 focus:outline-none focus:border-indigo-400 focus:bg-white transition-all duration-200"
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Enter first name"
                  />
                </div>

                <div className="transform transition-all duration-200 hover:translate-x-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-800 focus:outline-none focus:border-indigo-400 focus:bg-white transition-all duration-200"
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Enter last name"
                  />
                </div>
              </div>

              {/* Age & Gender - 2 columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="transform transition-all duration-200 hover:translate-x-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Age
                  </label>
                  <input
                    type="number"
                    value={age}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-800 focus:outline-none focus:border-indigo-400 focus:bg-white transition-all duration-200"
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="Enter age"
                  />
                </div>

                <div className="transform transition-all duration-200 hover:translate-x-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Gender
                  </label>
                  <select
                    value={gender}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-800 focus:outline-none focus:border-indigo-400 focus:bg-white transition-all duration-200"
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  
                  </select>
                </div>
              </div>

              {/* About */}
              <div className="transform transition-all duration-200 hover:translate-x-1">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  About
                </label>
                <textarea
                  value={about}
                  rows="4"
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-800 focus:outline-none focus:border-indigo-400 focus:bg-white transition-all duration-200 resize-none"
                  onChange={(e) => setAbout(e.target.value)}
                  placeholder="Tell us about yourself..."
                />
              </div>

              {/* Skills */}
              <div className="transform transition-all duration-200 hover:translate-x-1">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Skills
                </label>
                <input
                  type="text"
                  value={skills}
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-800 focus:outline-none focus:border-indigo-400 focus:bg-white transition-all duration-200"
                  onChange={(e) => setSkills(e.target.value)}
                  placeholder="React, Node.js, Python, etc. (comma separated)"
                />
                <p className="text-xs text-gray-400 mt-1">Separate skills with commas</p>
              </div>
            </div>

<p className='text-red-400'>{error}</p>
            {/* Action Buttons */}
            <div className="flex gap-4 mt-8">
              <button
                className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                onClick={saveProfile}
              >
                Save Changes
              </button>
              <button
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>

        {/* Decorative dots */}
        <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/20 rounded-full blur-xl pointer-events-none"></div>
        <div className="absolute -top-4 -left-4 w-20 h-20 bg-white/20 rounded-full blur-xl pointer-events-none"></div>
      </div>
    </div>
    <div className='w-full flex items-center justify-center'>
<Usercard user={user} />

{showtoast && <div className="toast toast-top toast-center">
 
  <div className="alert alert-success">
    <span>Profile saved successfully.</span>
  </div>
</div>}

    </div>
    
    
    </>

  )
}

export default Editprofile