import React, { useContext } from 'react'
import { AlertTriangle, UserX, Trash2 } from 'lucide-react'
import { useState } from 'react';
import ConfirmationModal from '../utils/ConfirmationModal';
import { toast } from 'react-toastify'
import { useNavigate } from "react-router-dom"
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios'



const DeleteButtons = () => {
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false); // Track modal state
    const [btn, setBtn] = useState(null);
    const navigate = useNavigate()
    const { getUserProfile, backendUrl, setUser, profileData } = useContext(AuthContext);


    // Open the modal when delete button is clicked
    const openModal = (btnName) => {
        setIsModalOpen(true);
        setBtn(btnName)
    };

    // Close the modal
    const closeModal = () => {
        setIsModalOpen(false);
        setBtn(null)
    };


    const confirmDelete = async () => {
        try {
            setLoading(true)
            if (btn === "account") {
                const result = await axios.delete(backendUrl + "/api/user/delete-account", { withCredentials: true })
                if (result.data.success) {
                    setUser(null);
                    toast.success(result.data.message)
                    navigate("/login")
                } else {
                    toast.error(result.data.message)
                    navigate("/profile")
                }
            } else {
                const result = await axios.delete(backendUrl + "/api/user/delete-profile", { withCredentials: true })
                if (result.data.success) {
                    toast.success(result.data.message)
                } else {
                    toast.error(result.data.message)
                }
            }
        } catch (error) {
            toast.error(error.message)
        } finally {
            setTimeout(() => {
                closeModal();
                getUserProfile();
                setLoading(false);
            }, 2000); // Delay to let toast appear
        }
    }


    return (
        <div className="p-4 mt-60 border border-red-600 rounded">
            <h3 className="text-lg font-semibold mb-4 text-red-600 flex items-center gap-2">
                <AlertTriangle size={20} />
                Danger Zone
            </h3>
            <div className="flex flex-col gap-8 justify-start">
                <button
                    onClick={() => openModal("profile")}
                    className={`${profileData ? "flex" : "hidden"} px-4 py-2 text-sm border border-red-800 text-white bg-red-700 rounded hover:bg-red-800 transition duration-200 items-center justify-center gap-2 cursor-pointer`}
                >
                    <UserX size={16} /> Delete Profile
                </button>


                <button
                    onClick={() => openModal("account")}
                    className="flex px-4 py-2 text-sm border border-red-800 text-white bg-red-700 rounded hover:bg-red-800 transition duration-200 items-center justify-center gap-2 cursor-pointer"
                >
                    <Trash2 size={16} /> Delete Account
                </button>

                {/* Modal for confirmation */}
                <ConfirmationModal
                    btn={btn}
                    isOpen={isModalOpen}
                    onConfirm={confirmDelete} // Handle confirm action
                    onCancel={closeModal}
                    loader={loading} // Handle cancel action
                />
            </div>
        </div>
    )
}

export default DeleteButtons