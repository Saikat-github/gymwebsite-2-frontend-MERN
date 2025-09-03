import { useContext } from 'react'
import { CheckCircle, Tag, IndianRupee } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import { capitalizeFirstLetter } from '../../utils/utilFunctions';








const SinglePlan = ({ plan }) => {
    const { profileData, user } = useContext(AuthContext);
    const { title, price, duration, features, popular, discount } = plan;

    const navigate = useNavigate();

    const handlePlanSelect = () => {
        if (!user) {
            toast.error("Please login to select a plan");
            return navigate("/login");
        }
        if (title === "day-pass") {
            return navigate("/day-pass")
        }

        if (profileData) {
            navigate('/payment-page',
                {
                    state:
                    {
                        plan,
                        email: profileData.personalInfo.email,
                        name: profileData.personalInfo.name,
                        navigateTo: "/membership-details"
                    }
                });
        } else {
            toast.error("Please complete your profile to select a plan");
            navigate("/profile")
        }

    }

    return (
        <div
            className={`bg-gradient-to-b from-gray-900 to-blue-950 p-8 rounded-lg shadow-md relative ${popular === "yes" ? 'border-2 border-orange-500' : ''}`}
        >
            {popular === "yes" && (
                <div className="absolute top-0 right-0 bg-orange-600 text-white px-4 py-1 text-sm font-semibold rounded-bl-lg">
                    Popular
                </div>
            )}
            <h3 className="text-2xl sm:text-xl font-bold mb-4">{capitalizeFirstLetter(title)}</h3>
            <p className="text-xl sm:text-3xl font-bold mb-4 flex items-center">
                <IndianRupee className='' />{price}/{title !== "day-pass" ? duration : "1"} days
                <span className="text-lg text-gray-500"></span>
            </p>
            {discount
                &&
                <p className='flex items-center'>
                    <Tag className='h-5 w-5 text-green-500 mr-2' />
                    {discount}% Off
                </p>}
            <ul className="mb-8 space-y-2">
                {features.length > 0 && features.map((feature, idx) => (
                    feature !== "" && (<li key={idx} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                        <span>{feature}</span>
                    </li>)
                ))}
            </ul>
            <button
                onClick={handlePlanSelect}
                className="w-full py-2 bg-orange-600 text-white rounded-full hover:bg-orange-800 cursor-pointer transition-all duration-200">
                Select Plan
            </button>
        </div>
    )
}

export default SinglePlan