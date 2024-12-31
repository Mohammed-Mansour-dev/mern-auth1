import {  Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Signing from './pages/Signing'

import {ToastContainer} from "react-toastify"
import EmaiVerify from './pages/Emai-verify'
import ResetPassword from './pages/ResetPassword'

function App() {


  return (
<>
<ToastContainer />
<Routes>

<Route path='/' element={<Home/>}  />
<Route path='/sign-in' element={<Signing/>}  />
<Route path='/email-verify' element={<EmaiVerify/>}  />
<Route path='/reset-password' element={<ResetPassword/>}  />


</Routes>


</>
  )
}

export default App
