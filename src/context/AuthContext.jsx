import { createContext, useState, useEffect, useCallback, useMemo } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios'
import conf from '../conf/conf';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const backendUrl = conf.backendUrl;

  const [user, setUser] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [loader, setLoader] = useState(true);
  const [plans, setPlans] = useState([]);
  const [savedSchedule, setSavedSchedule] = useState({});


  // Create axios instance with default config
  const axiosInstance = useMemo(() => {
    return axios.create({
      baseURL: backendUrl,
      withCredentials: true,
      timeout: 10000, // 10 second timeout
    });
  }, [backendUrl]);



  // Add error interceptor for better error handling
  useEffect(() => {
    const interceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          setUser(null);
          setProfileData(null);
        }
        return Promise.reject(error);
      }
    );

    return () => axiosInstance.interceptors.response.eject(interceptor);
  }, [axiosInstance]);



  const getUserProfile = useCallback(async () => {
    try {
      const res = await axiosInstance.get("/api/user/get-profile");
      if (res.data.success) {
        setProfileData(res.data.data);
      } else {
        setProfileData(null);
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      toast.error(error.response?.data?.message || 'Failed to fetch profile');
    }
  }, []);



  const getAllPlans = useCallback(async () => {
    try {
      const result = await axiosInstance.get("/api/admin/get-plans");
      if (result.data.success) {
        setPlans(result.data.data);
      } else {
        toast.error(result.data.message);
      }
    } catch (error) {
      console.error('Error fetching plans:', error);
      toast.error(error.response?.data?.message || 'Failed to fetch plans');
    }
  }, []);



  const loadFirstSchedule = useCallback(async () => {
    try {
      const response = await axiosInstance.get("/api/admin/get-schedule");
      if (response.data.success) {
        const { createdAt, updatedAt, __v, _id, timezone, ...rest } = response.data.schedule;
        setSavedSchedule(rest);
      } else {
        setSavedSchedule({});
      }
    } catch (error) {
      console.error('Error loading schedule:', error);
      toast.error(error.response?.data?.message || 'Failed to load schedule');
    }
  }, []);



  const checkAuthStatus = useCallback(async () => {
    try {
      const response = await axiosInstance.get('/api/user/current_user');
      if (response.data.success) {
        setUser(response.data.user);
        await getUserProfile();
        return true;
      } else {
        setUser(null);
        return false;
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setUser(null);
      return false;
    } finally {
      // Run these in parallel for better performance
      try {
        await Promise.all([getAllPlans(), loadFirstSchedule()]);
      } catch (error) {
        console.error('Error loading initial data:', error);
      }
      setLoader(false);
    }
  }, []);



  useEffect(() => {
    checkAuthStatus();
  }, []);



  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    setUser,
    user,
    isAuthenticated: !!user,
    profileData,
    setProfileData,
    plans,
    backendUrl,
    checkAuthStatus,
    loader,
    getUserProfile,
    savedSchedule,
  }), [
    user,
    profileData,
    plans,
    backendUrl,
    checkAuthStatus,
    loader,
    getUserProfile,
    savedSchedule,
  ]);



  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};



export default AuthContextProvider;