import axios from "axios";
import { motion } from "framer-motion";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignIn() {
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")

  const navigate=useNavigate()

    const handleData=async(e)=>{
        e.preventDefault()
        const res=await axios.post("http://localhost:1006/auth/login",{email,password})
        console.log(res.data.token);
        localStorage.setItem("token",res.data.token)
        setEmail("")
        setPassword("")
        navigate("/dashboard")    
        
    }
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8 border border-orange-200"
      >
        <h2 className="text-3xl font-bold text-center text-orange-500 mb-6">
          Welcome Back
        </h2>

        <form className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
              placeholder="Enter your email"
              value={email}
              name="email"
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input
              type="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
              placeholder="Enter your password"
              value={password}
              name="password"
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-orange-500 text-white py-3 rounded-xl text-lg font-semibold shadow-lg"
            onClick={handleData}
          >
           Sign In 
          </motion.button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Don't have an account?{" "}
         <Link to="/signup" className="text-orange-500 hover:underline font-medium"> 
            Create one
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
