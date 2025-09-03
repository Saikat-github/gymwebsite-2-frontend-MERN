import { useContext, useState } from 'react'
import { Footer, Navbar, ScrollToTop } from './components'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { AuthContext } from './context/AuthContext'
import { Loader2 } from 'lucide-react'


function App() {
  const { loader } = useContext(AuthContext);

  return (
    !loader
      ?
      <div className='font-family-poppins bg-gradient-to-r from-slate-950 via-gray-950 to-slate-800
 text-gray-200 max-sm:text-sm'>
        <Navbar />
        <ToastContainer />
        <main className='min-h-screen'>
          <ScrollToTop />
          <Outlet />
        </main>
        <Footer />
      </div>
      :
      <div className="bg-gradient-to-r from-slate-950 via-gray-950 to-slate-800
 text-white flex justify-center py-28 min-h-screen">
        <div className="w-full max-w-md p-8 space-y-8 text-center flex flex-col items-center">
          <Loader2 className='animate-spin' />
          <p className="text-xl font-medium">Loading...</p>
        </div>
      </div>

  )
}

export default App
