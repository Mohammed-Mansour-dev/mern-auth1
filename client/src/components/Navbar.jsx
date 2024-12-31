import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"
import { AppContent, BACKENDURL } from "../context/AppContext";
import axios from "axios";


const Navbar = () => {
    axios.defaults.withCredentials = true;
const {isLoggedIn ,userData ,handleLogout} =useContext(AppContent)

    const navigation =useNavigate();
const {pathname} =useLocation();


    // !navigate login button
        const handleButton = () => {
    navigation("sign-in");
        }

        // !send otp function
        const sendOtp = async () => {


            try {
                await axios.post(BACKENDURL + '/api/auth/send-verify-otp')

            } catch (error) {
                console.error(error);
            }
        }

          return (
    <div className="absolute top-0   w-full" >
    
                 
                 <header className="w-full px-5 flex justify-between shadow-md border-b border-slate-300 py-3">
                 <Link to="/" className=" flex items-center font-semibold text-xl" >
    <img src="./logo1.png" className="h-14" alt="logo" />
<span>Mern auth</span>
</Link>


               {/* Login Button */}
       {        

isLoggedIn ? (
  <div className="relative group" >
<div className="">
<h1 className="rounded-full bg-emerald-600 p-3 px-4 font-bold " >{userData?.name[0].toUpperCase()}</h1>
</div>

<div className="absolute hidden group-hover:block bg-transparent right-0 p-2 ">
<div className="bg-slate-400 py-3 px-1  rounded-lg " >
 { !userData?.isUserVerified && pathname !== "/email-verify" && ( <Link className="text-base font-Outfit text-slate-800  p-2 hover:bg-slate-600 hover:text-slate-200  rounded-md w-full px-5  " to="/email-verify" onClick={sendOtp} >Verify</Link>)}
  <button onClick={handleLogout} className="text-base font-Outfit text-slate-800 p-2 hover:bg-slate-600 hover:text-slate-200 rounded-md w-full px-5  " to={"/verify"} >Logout</button>
</div>
</div>


  </div>
):
         ( <button
          onClick={handleButton}
          className=" top-4 right-4 border border-gray-300 rounded-full px-4 py-1.5 text-sm text-gray-800 hover:bg-gray-100 flex items-center space-x-2">
            <span>Login</span>
            <span className="text-xl">→</span>
          </button>)
}
          </header>
    </div>
  )
}

export default Navbar