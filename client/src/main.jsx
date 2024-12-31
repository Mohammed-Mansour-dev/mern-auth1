import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

import {BrowserRouter} from "react-router-dom"
import AppContextProvider from './context/AppContext.jsx'
import Navbar from './components/Navbar.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <AppContextProvider>
     <StrictMode>
  <main className='w-full border relative  ' >
      <Navbar />
    <App />
  </main>
  </StrictMode>
  </AppContextProvider>
   
  </BrowserRouter>

);
