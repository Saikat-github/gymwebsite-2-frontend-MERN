import { useEffect, useState } from 'react'
import { Login, Signup } from '../../components';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';


const LoginPage = () => {
    const [state, setState] = useState('Login');
    const location = useLocation();
    const from = location.state?.from?.pathname || '/'; // default to home if no previous route

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const message = params.get('message');
        if (message) {
            toast.error(message)
        }
    }, [location]);


    return (
        <div className="pt-16 flex justify-center">
            <div className='max-w-80 rounded-xl text-xs sm:text-sm py-4 px-6 sm:px-10 space-y-2 mb-20 max-sm:mb-32 border border-gray-400'>
                {
                    state === "Login"
                        ?
                        <Login state={state} setState={setState} navigateTo={from}/>
                        :
                        <Signup state={state} setState={setState} navigateTo={from}/>
                }
            </div>
        </div>

    )
}

export default LoginPage;