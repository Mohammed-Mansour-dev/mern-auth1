// import axios from "axios";
// import {  useRef, useState } from "react";
// import { BACKENDURL } from "../context/AppContext";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";


// const ResetPassword = () => {

//     axios.defaults.withCredentials = true;
//     const [activeCard, setActiveCard] = useState("email"); 
// const [email , setEmail ] = useState("");
// const [otp , setOtp ] = useState("")
// const [loading , setLoading ] = useState(false)
// const [newPassword , setNewPassword ] = useState("")
// const inputsRef =useRef([]);
// const [showPassword , setShowPassword ] = useState(false)

// const navigation =useNavigate();
// // !send reset OTP
// const handleSubmit =async (e) => {
// e.preventDefault();
// setLoading(true);
// if(activeCard === "email"){

//     const response =await axios.post(BACKENDURL + "/api/auth/send-reset-otp",{email});
//   if(response.data.success){
//     toast.success("Reset OTP sent to your Email successfully!");
//     setActiveCard("otp");
//     setLoading(false)
//   }else {
//     toast.error(response.data.message);
//     setLoading(false)
//   }
    


// }else if(activeCard == "otp"){
//     const otpArray = inputsRef.current.map(el => el.value)
//     const otp2 =otpArray.join("");
//     setOtp(otp2)
//     setLoading(false);
//     setActiveCard("newPassword")
   
// }else if(activeCard === "newPassword"){
    
// try {
//      const res =await axios.post(BACKENDURL + "/api/auth/verify-reset-otp",{otp,email,newPassword});
    
//     if(res.data.success){
//         toast.success(res.data.message);
//         navigation("/sign-in");
//         setLoading(false);
       
//     }else {
//         toast.error(res.data.message);
//         setLoading(false)
//     }



// } catch (error) {
//     toast.error(error.message);
//     console.log(error)
// }


    
// }
// setLoading(false)
// };


// //! handles Backspace functionality
// const handleBackspace =(e,index) => {
//     if(e.key === 'Backspace' && e.target.value === "" && index > 0 ){
//     inputsRef.current[index - 1].focus()
//     }
//     }
    
//     // !handle paste functionality
//     const handlePaste = (e) => {
//     const paste =e.clipboardData.getData("text");
//     const pasteArray = paste.split("");
//     pasteArray.forEach((char,index)=>{
//         if(inputsRef.current[index]){
//             inputsRef.current[index].value = char;
          
//         }
//     })
//     }

//     //!  move to nexct input function
// const handleOnInput = (e,index) => {
//     if(e.target.value.length > 0 && index < inputsRef.current.length - 1){
//         inputsRef.current[index + 1].focus()
//     }
// }

//     return (
//       <div className="flex
//       bg-gradient-to-br from-white to-purple-300
//       border min-h-screen w-full justify-center items-center ">
   
//  <div  className="bg-gray-900 text-white rounded-lg shadow-xl p-8 w-96">
 
//  <div>
//         <h2 className="text-3xl font-bold text-center mb-2">
//          Reset Password
//         </h2>
//         <p className="text-gray-400 text-center mb-6">
//        { activeCard === "email" ? "  Enter your registered Email Address" :
//        activeCard === "otp" ? "Enter Reset OTP send to Your Email" :
//        activeCard === "newPassword" && "Enter your new password"
//        }
//         </p>
//      </div>
 
 
//    <form onSubmit={handleSubmit} className="space-y-4">
       
// { activeCard === "email" ?
//        (  
//           <div>
//             {/* Email Field */} 
//             <label htmlFor="email" className="sr-only">
//               Email
//             </label>
//             <div className="relative">
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 placeholder="Email id"
//                 value={email}
//                 onChange={(e)=>setEmail(e.target.value)}
//                 className="w-full bg-gray-800 text-gray-200 border border-gray-700 rounded-full py-2.5 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-blue-500"
//               />
//               <span className="absolute pt-1 left-3 top-2.5 text-gray-400">
//                 <img src="./mail.svg" className="w-5" />
//               </span>
//             </div>
//           </div>): activeCard === "otp" ? (
// <div className="">
// {/* reset otp */}
// <div  className="flex w-full">
// <div onPaste={handlePaste} className="flex gap-3 my-3 mt-2" >  
//     {
//         Array(6).fill(0).map((_,index)=>(
//             <input 
//             onKeyDown={(e)=>handleBackspace(e,index)}
//             onInput={(e)=>handleOnInput(e,index)}
//             ref={e => inputsRef.current[index] =e }
//             key={index} required type="text" maxLength={1}
//             className="w-10 h-12 rounded-md
//             bg-gray-600 text-center text-white font-semibold
//             "
//             />
//         ))
//     }
// </div>
// </div>
// </div>
//           ) : activeCard === "newPassword" && (
//             <div className="">
//       {/* Password Field */}
//       <div>
//   <label htmlFor="password" className="sr-only">
//     Password
//   </label>
//   <div className="relative">
//     <input
//       type={showPassword ? "text" : "password"}
//       id="password"
//       name="password"
//       placeholder="Password"
//       value={newPassword}
//       onChange={(e)=>setNewPassword(e.target.value)}
//       className="w-full bg-gray-800 text-gray-200 border border-gray-700 rounded-full py-2.5 pl-10 pr-10 focus:outline-none focus:ring-1 focus:ring-blue-500"
//     />
//     <span className="absolute left-3 top-2.5 text-gray-400">
//       <i className="fas fa-lock"></i>
//     </span>

//     {/* show and hide password */}
//     <button
//       type="button"
//       onClick={() => setShowPassword(!showPassword)}
//       className="absolute mt-1 flex justify-center items-center right-3 top-2.5 text-gray-400 hover:text-gray-200 focus:outline-none"
//     >
//       {showPassword ? (
//        <img src="./hide.png" className="w-5" />
//       ) : (
//         <img src="./view.png" className="w-5" />
//       )}
//     </button>
//   </div>
// </div>
//             </div>
//           )


//         }

//           {/* Submit Button */}
//   <button 
//             type="submit"
//             className="w-full !mt-7 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2.5 rounded-full text-lg font-medium hover:opacity-90 transition"
//           >
//             {  loading ? (<div className="w-4 h-4 bg-transparent mx-auto animate-spin rounded-full border-t-transparent border-2 border-gray-300  "  />) : "Submit"}
//           </button>
//         </form>

//  </div>
//       </div>
//     );
// }

// export default ResetPassword


import axios from "axios";
import { useRef, useState } from "react";
import { BACKENDURL } from "../context/AppContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  axios.defaults.withCredentials = true;

  const [activeStep, setActiveStep] = useState("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const inputsRef = useRef([]);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Handle form submission based on the current step
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (activeStep === "email") {
        const response = await axios.post(`${BACKENDURL}/api/auth/send-reset-otp`, { email });
        if (response.data.success) {
          toast.success("Reset OTP sent to your email successfully!");
          setActiveStep("otp");
        } else {
          toast.error(response.data.message);
        }
      } else if (activeStep === "otp") {
        const enteredOtp = inputsRef.current.map((el) => el.value).join("");
        setOtp(enteredOtp);
        setActiveStep("newPassword");
      } else if (activeStep === "newPassword") {
        const response = await axios.post(`${BACKENDURL}/api/auth/verify-reset-otp`, {
          otp,
          email,
          newPassword,
        });
        if (response.data.success) {
          toast.success(response.data.message);
          navigate("/sign-in");
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Handle backspace key for OTP inputs
  const handleBackspace = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  // Handle paste functionality for OTP inputs
  const handlePaste = (e) => {
    const pastedData = e.clipboardData.getData("text").split("");
    pastedData.forEach((char, index) => {
      if (inputsRef.current[index]) {
        inputsRef.current[index].value = char;
      }
    });
  };

  // Move focus to the next OTP input
  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  return (
    <div className="flex bg-gradient-to-br from-white to-purple-300 min-h-screen w-full justify-center items-center">
      <div className="bg-gray-900 text-white rounded-lg shadow-xl p-8 w-96">
        <div>
          <h2 className="text-3xl font-bold text-center mb-2">Reset Password</h2>
          <p className="text-gray-400 text-center mb-6">
            {activeStep === "email" && "Enter your registered Email Address"}
            {activeStep === "otp" && "Enter the OTP sent to your email"}
            {activeStep === "newPassword" && "Enter your new password"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/*-------------------------------------------------------------------------------------------------------------
          ------------------ enter email card
            -------------------------------------------------------------------------------------------------------------*/}

          {activeStep === "email" && (
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-800 text-gray-200 border border-gray-700 rounded-full py-2.5 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <span className="absolute left-3 top-2.5 text-gray-400">
                  <img src="./mail.svg" alt="email-icon" className="w-5" />
                </span>
              </div>
            </div>
          )}
  {/*-------------------------------------------------------------------------------------------------------------
          ------------------ enter otp card
            -------------------------------------------------------------------------------------------------------------*/}

          {activeStep === "otp" && (
            <div className="flex gap-3 mt-2" onPaste={handlePaste}>
              {Array(6)
                .fill(0)
                .map((_, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    ref={(el) => (inputsRef.current[index] = el)}
                    onKeyDown={(e) => handleBackspace(e, index)}
                    onInput={(e) => handleInput(e, index)}
                    className="w-10 h-12 rounded-md bg-gray-600 text-center text-white font-semibold"
                  />
                ))}
            </div>
          )}
  {/*-------------------------------------------------------------------------------------------------------------
          ------------------ enter new password card
            -------------------------------------------------------------------------------------------------------------*/}

          {activeStep === "newPassword" && (
            <div>
              <label htmlFor="password" className="sr-only">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-gray-800 text-gray-200 border border-gray-700 rounded-full py-2.5 pl-10 pr-10 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <span className="absolute left-3 top-2.5 text-gray-400">
                  <i className="fas fa-lock"></i>
                </span>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-200"
                >
                  <img
                    src={showPassword ? "./hide.png" : "./view.png"}
                    alt="toggle-visibility"
                    className="w-5"
                  />
                </button>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-7 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2.5 rounded-full text-lg font-medium hover:opacity-90 transition"
          >
            {loading ? (
              <div className="w-4 h-4 mx-auto animate-spin rounded-full border-t-transparent border-2 border-gray-300" />
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
