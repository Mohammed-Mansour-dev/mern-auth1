import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext";


const Home = () => {

  const navigation =useNavigate();

// !navigate login button
    const handleButton = () => {
navigation("sign-in");

    }



const {userData } =useContext(AppContent)

    return (
        <div className="min-h-screen w-full font-Outfit px-7 ">

          {/* Main Content */}
          <div className="text-center mt-24">
            <div className="flex justify-center mb-6">
            <img className="h-52" src="./logo2.png"  />
            
            </div>
            <h1 className="text-2xl font-semibold text-neutral-600">
              Hey {userData?.name ? userData?.name:"Developer!"} <span className="wave">👋</span>
            </h1>
            <h2 className="text-3xl font-extrabold text-gray-900 mt-2">Welcome to our app</h2>
            <p className="text-gray-600 mt-2">
              Let&apos;s start with a quick product tour and we will have you up and
              running in no time!
            </p>
            <button 
            onClick={handleButton}
            className="mt-6 px-6 border-black border py-2 text-black rounded-full text-lg  hover:bg-slate-100">
              Get Started
            </button>
          </div>
        </div>
      );
}

export default Home