import { motion } from "framer-motion";
import { useState } from "react";
import axios from "axios";

export default function SignUp() {
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")


    const handleData=async(e)=>{
        e.preventDefault()
        const res=await axios.post("http://localhost:1006/auth/register",{name,email,password})
        if(res.data){
            alert(res.data.msg)
        }
        else{
            alert("Somthing went wrogn!")
        }
        setName("")
        setEmail("")
        setPassword("")

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
          Create Account
        </h2>

        <form className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Full Name</label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
              placeholder="Enter your full name"
              value={name}
              name="name"
              onChange={(e)=>setName(e.target.value)}
            />
          </div>

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
              placeholder="Create a password"
              value={password}
              name="password"
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>

          {/* <div>
            <label className="block text-gray-700 font-medium mb-1">Confirm Password</label>
            <input
              type="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
              placeholder="Confirm your password"
            />
          </div> */}

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-orange-500 text-white py-3 rounded-xl text-lg font-semibold shadow-lg"
            onClick={handleData}
          >
            Register
          </motion.button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <a href="/" className="text-orange-500 hover:underline font-medium">
            Sign In
          </a>
        </p>
      </motion.div>
    </div>
  );
}