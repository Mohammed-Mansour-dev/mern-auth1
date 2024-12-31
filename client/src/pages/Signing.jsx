import axios from "axios";
import { useContext, useState } from "react";
import { AppContent, BACKENDURL } from "../context/AppContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const Signing = () => {
axios.defaults.withCredentials = true;
    const [mode, setMode] = useState("signUp"); // Mode state: 'signUp' or 'signIn'
 const [showPassword , setShowPassword ] = useState(false)
 const [loading , setLoading ] = useState(false)
const navigation =useNavigate();
const {checkLogin} =useContext(AppContent);


 
    const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Toggle mode between 'signUp' and 'signIn'
  const toggleMode = () => {
    setMode((prevMode) => (prevMode === "signUp" ? "signIn" : "signUp"));
    setFormData((prevData) => ({
      ...prevData,
      name: "", // Reset name field when switching to Sign In
    }));
  };

const handleSubmit =async (e)=>{
    e.preventDefault();

try {
setLoading(true);

if(mode === "signUp"){
  const response = await axios.post(`${BACKENDURL}/api/auth/register`, formData);
  if(response.data.success){
    toast.success("User registered successfully!");
    setFormData({
      name: "",
      email: "",
      password: "",
    });
    navigation("/")
    checkLogin()
  }else{
    toast.error(response.data.msg);
    console.log("response",response);
  }
}else {
  const response = await axios.post(`${BACKENDURL}/api/auth/login`, formData);
  if(response.data.success){
    toast.success("User logged in successfully!");
    setFormData({
      name: "",
      email: "",
      password: "",
    });
    navigation("/")
    checkLogin()
  }else{
    toast.error(response.data.message);
  }
  console.log(response)
}

  setLoading(false)
} catch (error) {
  console.log(error);
}


}


  return (
    <div className="min-h-screen px-5 font-Outfit bg-gradient-to-tl from-purple-300 via-purple-100 to-purple-100 flex items-center justify-center">
      <div className="bg-gray-900 text-white rounded-lg shadow-xl p-8 w-96">
      
      
        {/* Dynamic Header */}
     <div>
        <h2 className="text-3xl font-bold text-center mb-2">
          {mode === "signUp" ? "Create Account" : "Welcome Back"}
        </h2>
        <p className="text-gray-400 text-center mb-6">
          {mode === "signUp" ? "Create your account" : "Sign in to your account"}
        </p>
     </div>

        <form className="space-y-4">
          {/* Name Field (Hidden in Sign In Mode) */}
          {mode === "signUp" && (
            <div>
              <label htmlFor="name" className="sr-only">
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-gray-800 text-gray-200 border border-gray-700 rounded-full py-2.5 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <span className="absolute left-3 top-2.5 text-gray-400">
                  <i className="fas fa-user"></i>
                </span>
              </div>
            </div>
          )}

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email id"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-gray-800 text-gray-200 border border-gray-700 rounded-full py-2.5 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <span className="absolute left-3 top-2.5 text-gray-400">
                <i className="fas fa-envelope"></i>
              </span>
            </div>
          </div>

      {/* Password Field */}
<div>
  <label htmlFor="password" className="sr-only">
    Password
  </label>
  <div className="relative">
    <input
      type={showPassword ? "text" : "password"}
      id="password"
      name="password"
      placeholder="Password"
      value={formData.password}
      onChange={handleChange}
      className="w-full bg-gray-800 text-gray-200 border border-gray-700 rounded-full py-2.5 pl-10 pr-10 focus:outline-none focus:ring-1 focus:ring-blue-500"
    />
    <span className="absolute left-3 top-2.5 text-gray-400">
      <i className="fas fa-lock"></i>
    </span>

    {/* show and hide password */}
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute mt-1 flex justify-center items-center right-3 top-2.5 text-gray-400 hover:text-gray-200 focus:outline-none"
    >
      {showPassword ? (
       <img src="./hide.png" className="w-5" />
      ) : (
        <img src="./view.png" className="w-5" />
      )}
    </button>
  </div>
</div>

          {/* Forgot Password */}
          {mode === "signIn" && (
            <div className="text-right">
              <p onClick={()=>navigation("/reset-password")} href="#" className="text-blue-400 cursor-pointer text-sm hover:underline">
                Forgot password?
              </p>
            </div>
          )}

          {/* Submit Button */}
  <button disabled={loading}
          onClick={handleSubmit}
            type="submit"
            className="w-full !mt-7 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2.5 rounded-full text-lg font-medium hover:opacity-90 transition"
          >
            {loading ? (<div className="w-4 h-4 bg-transparent mx-auto animate-spin rounded-full border-t-transparent border-2 border-gray-300  "  />) : mode === "signUp" ? "Sign Up" : "Sign In"}
          </button>
        </form>

        {/* Toggle Mode Link */}
        <p className="text-gray-400 text-center mt-6">
          {mode === "signUp"
            ? "Already have an account? "
            : "Don't have an account? "}
          <button
            onClick={toggleMode}
            className="text-blue-400 underline hover:underline focus:outline-none"
          >
            {mode === "signUp" ? "Sign in here" : "Sign up here"}
          </button>
        </p>
      </div>
    </div>
  );
}

export default Signing