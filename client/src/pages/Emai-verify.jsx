import axios from "axios"
import { useContext, useEffect, useRef, useState } from "react"

import { AppContent, BACKENDURL } from "../context/AppContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const EmaiVerify = () => {
axios.defaults.withCredentials = true;
const inputsRef =useRef([])
const navigation =useNavigate()
const [loading , setLoading ] = useState(false)

const {getUserData,userData} =useContext(AppContent)

//!  move to nexct input function
const handleOnInput = (e,index) => {
    if(e.target.value.length > 0 && index < inputsRef.current.length - 1){
        inputsRef.current[index + 1].focus()
    }
}

//! handles Backspace functionality
const handleBackspace =(e,index) => {
if(e.key === 'Backspace' && e.target.value === "" && index > 0 ){
inputsRef.current[index - 1].focus()
}
}

// !handle paste functionality
const handlePaste = (e) => {
const paste =e.clipboardData.getData("text");
const pasteArray = paste.split("");
pasteArray.forEach((char,index)=>{
    if(inputsRef.current[index]){
        inputsRef.current[index].value = char;
      
    }
})
}

//! on submit handler
const onSubmitHandler =async (e) => {
try {
    setLoading(true)
    e.preventDefault();
    const otpArray = inputsRef.current.map(el => el.value)
const otp =otpArray.join("");
 
const res =await axios.post(BACKENDURL + "/api/auth/verify-otp",{otp});

if(res.data.success){
    toast.success(res.data.message);
    navigation("/");
    setLoading(false);
    getUserData();
}else {
    toast.error(res.data.message);
    setLoading(false)
}



} catch (error) {
    console.log(error);
    toast.error(error.message)
}

}

useEffect(() => {

if(userData?.isUserVerified) navigation("/")
}, []);


  return (
    <div className="min-h-screen bg-gradient-to-br w-full 
    from-purple-100 to-purple-300 px-5 flex flex-col
    " >
        


{/* body */}
<div className="w-full  flex items-center justify-center border-red-500 flex-1 ">

{/* authentication card */}
<div className="p-7 py-10 text-center rounded-md bg-gray-900">
<h1 className="text-white font-medium md:text-3xl text-2xl " >Email Verify OTP</h1>
<p className="text-slate-300 pt-3" >Enter the 6-digit code sent to your email id </p>


{/* inputs code fields */}
<form onSubmit={onSubmitHandler} >
<div  className="flex w-full">
<div onPaste={handlePaste} className="flex gap-3 my-3 mt-8" >  
    {
        Array(6).fill(0).map((_,index)=>(
            <input 
            onKeyDown={(e)=>handleBackspace(e,index)}
            onInput={(e)=>handleOnInput(e,index)}
            ref={e => inputsRef.current[index] =e }
            key={index} required type="text" maxLength={1}
            className="w-10 h-12 rounded-md
            bg-gray-600 text-center text-white font-semibold
            "
            />
        ))
    }
</div>
</div>


{/* verify button */}
<div className="w-full">
    <button type="submit" className="bg-gradient-to-r 
    from-sky-600 to-blue-700 text-white px-3
   hover:from-sky-600 
    py-3 rounded-full w-full mt-5 font-semibold text-lg
    " >
     { loading ? (<div className="w-7 h-7 border border-transparent border-t-white border-r-white rounded-full animate-spin mx-auto" />) : "Verify Email"}
    </button>
</div>

</form>

</div>


</div>





    </div>
  )
}

export default EmaiVerify