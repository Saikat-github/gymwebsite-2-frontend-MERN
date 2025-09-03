import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { ArrowLeft, Loader2 } from "lucide-react";
import { toast } from 'react-toastify';
import SingleDayPass from './SingleDayPass';
import { Link } from 'react-router-dom';
import axios from 'axios';




const AllDayPasses = () => {
  const [documents, setDocuments] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [loader, setLoader] = useState(false);
  const { user, backendUrl } = useContext(AuthContext);


  const fetchDayPasses = async () => {
    try {
      setLoader(true)
      const res = await axios.get(backendUrl + "/api/user/get-daypasses", {
        params: { cursor },
        withCredentials: true
      })
      
      if (res.data.success) {
        setDocuments([...documents, ...res.data.data]);
        setCursor(res.data.nextCursor);
        setHasNextPage(res.data.hasNextPage);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoader(false);
    }
  }


  useEffect(() => {
    fetchDayPasses()
  }, [])


  return (
    <div className="text-slate-100">
      <h1 className='text-center text-2xl mb-4 font-semibold'>Day Passes</h1>
      <div className='text-center'>
        <Link to={"/day-pass"} className='px-4 py-1 border border-orange-600 text-center rounded-full hover:opacity-75 transition-all duration-300 text-xs'>
          Back
        </Link>
      </div>

      <div>
        <div className="max-w-5xl mx-auto p-4 space-y-6">
          {
            documents?.length === 0 && !loader ? (
              <div className="text-center text-gray-500">
                No Day-Pass history found.
              </div>
            )
              :
              documents?.map((dayPass, index) => (
                <SingleDayPass key={index} dayPass={dayPass} />
              ))
          }
        </div>
        {
          loader && <Loader2 className='w-5 animate-spin my-10 mx-auto' />
        }
        {hasNextPage && documents.length > 0 && (
          <button
            disabled={loader}
            onClick={fetchDayPasses}
            className={`block mx-auto mt-4 px-4 py-2 bg-orange-600 text-white rounded-lg shadow-md hover:bg-orange-700 transition cursor-pointer ${loader && "opacity-40"}`}
          >
            Load More...
          </button>
        )}
      </div>
    </div>
  )
}

export default AllDayPasses