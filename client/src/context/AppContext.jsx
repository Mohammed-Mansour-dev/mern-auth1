/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom";



// eslint-disable-next-line react-refresh/only-export-components
export const AppContent = createContext();
export const BACKENDURL =import.meta.env.VITE_BACKEND_URL


const AppContextProvider = ({ children }) => {

axios.defaults.withCredentials = true;
const [isLoggedIn , setIsLoggedIn ] = useState(false) 
const [userData , setUserData ] = useState(null)

const navigation =useNavigate();

// check if user loggedin  
  const checkLogin = async () => {
    try {
        const response = await axios.post(BACKENDURL + '/api/auth/is-authenticated')
        if (response.data.success) {
            setIsLoggedIn(true);
            getUserData();
        } else {
            setIsLoggedIn(false)
        }
    
    } catch (error) {
        console.log(error)
    }
  }

// !get user data
const getUserData =async ()=>{
    try {
        const response = await axios.get(BACKENDURL + '/api/user/getUserData')
       setUserData(response.data.userData)
console.log(response)
    } catch (error) {
        console.log(error)
    }
}

console.log(userData);

// ! logout function
const handleLogout = async () => {
try {
  const response = await axios.post(BACKENDURL + "/api/auth/logout")

console.log(response)
navigation("/")
checkLogin()
} catch (error) {
  console.log(error)
}
}



  useEffect(() => {
    checkLogin();
    getUserData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

    const value ={
        isLoggedIn , setIsLoggedIn ,
        userData, setUserData,handleLogout,
        checkLogin,getUserData
    }

  return (
    <AppContent.Provider value={value} >
      {children}
    </AppContent.Provider>
  )
}

export default AppContextProvider

