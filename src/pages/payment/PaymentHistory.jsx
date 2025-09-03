import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { Link } from 'react-router-dom'
import { PaymentHistoryCard } from '../../components';
import { User, CalendarClock, Info, Loader2, Clock, Clipboard } from "lucide-react";
import { formatDate, capitalizeFirstLetter } from '../../utils/utilFunctions';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';




const PaymentHistory = () => {
  const [cursor, setCursor] = useState(null);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [loader, setLoader] = useState(false);
  const [payments, setPayments] = useState([])
  const { backendUrl, profileData } = useContext(AuthContext);
  const navigate = useNavigate()


  useEffect(() => {
    fetchPayments()
  }, [])



  const fetchPayments = async () => {
    try {
      setLoader(true);
      const res = await axios.get(backendUrl + "/api/user/get-allpayments",
        {
          params: { cursor },
          withCredentials: true
        },
      )

      if (res.data.success) {
        setPayments([...payments, ...res.data.data]);
        setCursor(res.data.nextCursor);
        setHasNextPage(res.data.hasNextPage);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    } finally {
      setLoader(false)
    }
  }



  return (
    <div className="">
      <h1 className='text-center text-3xl my-6 font-semibold'>Payment History</h1>
      <div>
        <div className="max-w-5xl mx-auto p-4 space-y-6">
          {
            payments?.length === 0 && !loader ? (
              <div className="text-center text-gray-500">
                No membership history found.
              </div>
            )
              :
              payments?.map((membership, index) => (
                <PaymentHistoryCard
                  key={index}
                  membership={membership}
                  name={profileData?.personalInfo?.name}
                />
              ))
          }
        </div>
        {
          loader && <Loader2 className='w-5 animate-spin my-10 mx-auto' />
        }
        {hasNextPage && payments.length > 0 && (
          <button
            disabled={loader}
            onClick={fetchPayments}
            className={`block mx-auto mt-4 px-4 py-2 bg-orange-600 text-white rounded-lg shadow-md hover:bg-orange-700 transition cursor-pointer ${loader && "opacity-40"}`}
          >
            Load More...
          </button>
        )}
      </div>
    </div>

  )
}

export default PaymentHistory