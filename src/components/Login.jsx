import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
const [firstName, setFirstName] = useState("");
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    // Clear previous error and set loading
    setError("");
    setIsLoading(true);
    
    // Basic validation
    if (!email || !password) {
      setError("Please enter both email and password");
      setIsLoading(false);
      return;
    }
    
    try {
      const result = await axios.post(
        BASE_URL + "/login",
        {
          email: email,
          password: password,
        },
        {
          withCredentials: true,
        }
      );
      
      console.log("Login success:", result.data);
      
      // Dispatch user to Redux store
      if (result.data.user) {
        dispatch(addUser(result.data.user));
        
        // Optional: Store user in localStorage as backup
        localStorage.setItem("user", JSON.stringify(result.data.user));
        
        // Navigate to home page
        navigate("/");
      } else {
        setError("Invalid response from server");
      }
      
    } catch (err) {
      console.error("Login error:", err);
      
      // Handle different error scenarios
      if (err.response) {
        // Server responded with error
        setError(err.response.data?.message || "Login failed. Please check your credentials.");
      } else if (err.request) {
        // Request was made but no response
        setError("Cannot connect to server. Please check if backend is running.");
      } else {
        // Something else happened
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };



  const handleSignup = async()=>{
    // Clear previous error and set loading
    setError("");
    setIsLoading(true);
    // Basic validation
    if (!firstName || !lastName || !email || !password) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }
    try{
      const res = await axios.post(BASE_URL +"/signup" ,{ firstName, lastName, email, password },
        { withCredentials: true }
      )
      dispatch(addUser(res.data.user));
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/profile");

    }
    catch(err){
      console.error("Signup error:", err);
      if (err.response) {
        setError(err.response.data?.message || "Signup failed. Please check your details.");
      } else if (err.request) {
        setError("Cannot connect to server. Please check if backend is running.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }

  }

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isLoading) {
      handleLogin();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="relative w-full max-w-md">
        {/* Floating shapes background */}
        <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-white rounded-full opacity-10 animate-pulse"></div>
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-white rounded-full opacity-10 animate-pulse delay-1000"></div>
        </div>

        {/* Main Card */}
        <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:shadow-3xl">
          {/* Decorative top bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

          <div className="p-8">
            {/* Header Section */}
            <div className="text-center mb-8">
              <div className="inline-flex p-3 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl mb-4 shadow-lg">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-1">
                Welcome Back!
              </h2>
              <p className="text-gray-500 text-sm">{isLogin  ? "Sign in to continue to DevTinder" : "Create an account to continue to DevTinder"}</p>
            </div>

            {/* Error Message Display */}
            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Form Fields */}
            <div className="space-y-5">




              {!isLogin && ( <><div className="transform transition-all duration-200 hover:translate-x-1">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  FirstName
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    {/* <svg
                      className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                      />
                    </svg> */}
                  </div>
                  <input
                    type="text"
                    value={firstName}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-indigo-400 focus:bg-white transition-all duration-200"
                    onChange={(e) => setFirstName(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Vikrant"
                    disabled={isLoading}
                  />
                </div>
              </div>









             <div className="transform transition-all duration-200 hover:translate-x-1">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  LastName
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    {/* <svg
                      className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                      />
                    </svg> */}
                  </div>
                  <input
                    type="text"
                    value={lastName}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-indigo-400 focus:bg-white transition-all duration-200"
                    onChange={(e) => setLastName(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Singh"
                    disabled={isLoading}
                  />
                </div>
              </div> 
              </>)
              
}

              
              {/* Email Field */}
              <div className="transform transition-all duration-200 hover:translate-x-1">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                      />
                    </svg>
                  </div>
                  <input
                    type="email"
                    value={email}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-indigo-400 focus:bg-white transition-all duration-200"
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="your@email.com"
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="transform transition-all duration-200 hover:translate-x-1">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2">
                        <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                        <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                      </g>
                    </svg>
                  </div>
                  <input
                    type="password"
                    value={password}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-indigo-400 focus:bg-white transition-all duration-200"
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter your password"
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Remember me & Forgot password */}
              <div className="flex items-center justify-between pt-2">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <span className="ml-2 text-sm text-gray-600">Remember me</span>
                </label>
                <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium transition-colors">
                  Forgot password?
                </button>
              </div>
            </div>

            {/* Login Button */}
            <div className="mt-8">


              {isLogin ?  <button
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                onClick={handleLogin}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Logging in...
                  </div>
                ) : (
                  "Login"
                )}
              </button>
              :
              <button
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                onClick={handleSignup}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating your account...
                  </div>
                ) : (
                  "SignUp"
                )}
              </button>}
            </div>

            {/* Sign up link */}
            <div className="text-center mt-6 pt-4 border-t border-gray-200">
            {isLogin ?  <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link  className="text-indigo-600 hover:text-indigo-700 font-semibold transition-colors" onClick={()=>{
                  setIsLogin(false)
                }}>
                  Sign up
                </Link>
              </p>
              :
              <p className="text-sm text-gray-600">
                Already had an account?{" "}
                <Link  className="text-indigo-600 hover:text-indigo-700 font-semibold transition-colors" onClick={()=>{
                  setIsLogin(true)
                }}>
                  Log in
                </Link>
              </p>}
            </div>
          </div>
        </div>

        {/* Decorative dots */}
        <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/20 rounded-full blur-xl pointer-events-none"></div>
        <div className="absolute -top-4 -left-4 w-20 h-20 bg-white/20 rounded-full blur-xl pointer-events-none"></div>
      </div>
    </div>
  );
};

export default Login;