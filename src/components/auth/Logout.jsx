import { NavLink, useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import { useContext, useState } from "react";
import { Loader2, LogIn, Power } from "lucide-react";
import { AuthContext } from "../../context/AuthContext";
import axios from 'axios'



const Logout = ({ isAuthenticated, setMobileMenuOpen }) => {
    const [loader, setLoader] = useState(false);
    const { backendUrl, user, setUser } = useContext(AuthContext);


    const navigate = useNavigate()
    const handleLogout = async () => {
        try {
            setLoader(true);
            const { data } = await axios.get(backendUrl + "/api/user/logout", { withCredentials: true })
            if (data.success) {
                setUser(null);
                toast.success(data.message);
                navigate('/login');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        } finally {
            setLoader(false);
            setMobileMenuOpen(false);
        }
    }


    return (
        <>
            {
                user
                    ?

                    <button
                        disabled={loader}
                        onClick={handleLogout}
                        className="flex gap-2 items-center px-3 py-2 hover:text-orange-600 cursor-pointer"
                    >
                        <Power className="w-4 text-orange-600" />
                        {loader ? <Loader2 className='w-4 animate-spin' /> : "Logout"}
                    </button>
                    :
                    <NavLink
                        to="/login"
                        onClick={() => setMobileMenuOpen(false)}
                        className={({ isActive }) =>
                            `flex gap-2 items-center px-1 py-1 border-b-2 hover:border-orange-600 text-white mx-auto ${isActive ? "border-orange-600" : "border-transparent"}`
                        }
                    >
                        <LogIn className="w-4 text-orange-600" />
                        Login
                    </NavLink>

            }
        </>
    )
}

export default Logout