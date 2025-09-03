import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { Link } from 'react-router-dom'
import { User, CalendarClock, Info, Loader2, Clock, Clipboard } from "lucide-react";
import { formatDate, capitalizeFirstLetter } from '../../utils/utilFunctions';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import PaymentHistory from '../payment/PaymentHistory';




const MembershipDetails = () => {
  const [cursor, setCursor] = useState(null);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [loader, setLoader] = useState(false);
  const [payments, setPayments] = useState([])
  const { backendUrl, profileData } = useContext(AuthContext);
  const navigate = useNavigate()


  if (!profileData) {
    return <p className='text-center text-sm my-20 text-slate-700'>No Payment History Found <br />
      Please complete your profile on <span onClick={() => navigate("/profile")} className='text-indigo-600 cursor-pointer'>profile page.</span></p>
  }



  return (
    <div className="flex flex-col items-center justify-center text-xs sm:text-sm">
      <h1 className='text-center text-2xl my-6 font-semibold'>Membership Details</h1>
      {profileData?.membership?.status !== "active" ? (
        <div className="p-2 rounded max-w-2xl text-center mx-2 sm:mx-auto flex gap-2 border border-red-600 my-10 ">
          <Info />
          <div>
            You don't have any active membership, {profileData.membership.endDate ? `your membership expired on ${formatDate(profileData.membership.endDate)}` : "please buy a membership plan to continue using our gym services."}{" "}
            <Link to="/plans" className="underline">
              Click Here
            </Link>
          </div>
        </div>
      )
        :
        <div className='flex flex-col gap-4 my-4 p-2 sm:p-6 rounded border border-orange-600'>
          <p className='flex gap-2 items-center'><User className='w-5 text-green-600' />Membership : Active</p>
          <p className='flex gap-2 items-center'><Clipboard className='w-5 text-green-600' />Plan : {capitalizeFirstLetter(profileData?.membership?.planType)}</p>
          <p className='flex gap-2 items-center'><Clock className='w-5 text-green-600' />Last Payment On : {formatDate(profileData?.membership?.lastPaymentDate)}</p>
          <p className='flex gap-2 items-center'><CalendarClock className='w-5 text-green-600' />Expires on : {formatDate(profileData?.membership?.endDate)}</p>
        </div>
      }


<Link to={"/plans"} className='flex items-center gap-2 px-6 py-2 rounded-full bg-orange-600 text-white text-sm transition duration-200 cursor-pointer hover:opacity-80'>Renew Plan</Link>
    </div>

  )
}

export default MembershipDetails