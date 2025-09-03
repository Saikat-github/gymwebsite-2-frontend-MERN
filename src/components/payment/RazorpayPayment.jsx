import { ArrowRight, Loader2 } from "lucide-react";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";



const RazorpayPayment = ({ plan, email, name, navigateTo, dayPassData }) => {
  const { getUserProfile, backendUrl } = useContext(AuthContext);
  const [loader, setLoader] = useState(false)

  const navigate = useNavigate();

  const handlePayment = async () => {
    try {
      setLoader(true);
      // Step 1: Create order
      const orderResult = await axios.post(backendUrl + "/api/user/create-order", { planId: plan._id, dayPassData }, { withCredentials: true })
      const { orderId, key, currency, amount } = orderResult.data;

      if (orderResult.data.success) {
        // Step 2: Initialize Razorpay
        const options = {
          key,
          amount: amount * 100,
          currency,
          name: 'Minimalist Gyms',
          description: `${plan.title} Membership`,
          order_id: orderId,
          notify: {
            email: true // Email notifications to customer
          },
          handler: async (response) => {
            try {
              // Step 3: Verify payment
              const verificationResult = await axios.post(backendUrl + "/api/user/verify-order", response, { withCredentials: true });

              if (verificationResult.data.success) {
                toast.success('Payment successful!');
                await getUserProfile();
                navigate(navigateTo)
              }
            } catch (error) {
              console.error('Payment verification failed:', error);
              toast.error('Payment verification failed!');
              setLoader(false); // Set loader off on failure
            }
          },
          prefill: {
            name: name || 'Customer',
            email: email || 'customer@example.com',
          },
          theme: {
            color: '#3399cc',
          },
          modal: {
            ondismiss: () => {
              // ✅ Reset loader if user closes Razorpay without paying
              setLoader(false);
            }
          }
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        console.log(orderResult);
        toast.error(orderResult.data.message);
        setLoader(false)
      }
    } catch (error) {
      console.error('Error creating order:', error);
      toast.error('Failed to create order!');
      setLoader(false)
    } 
  };



  return (
    <div className="flex justify-center my-28">
      <button
        disabled={loader}
        onClick={() => handlePayment()}
        className={`py-2 rounded-full bg-orange-700 flex gap-2 px-4 hover:gap-4 transition-all duration-200 ${loader ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}
      >
        Pay ₹{dayPassData?.noOfDays ? plan.price * dayPassData.noOfDays : plan.price} securely for {plan.title} plan {loader ? <Loader2 className="animate-spin w-4" /> : <ArrowRight />}
      </button>
    </div>
  );
}

export default RazorpayPayment