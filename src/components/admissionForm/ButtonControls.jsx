import { Loader2 } from "lucide-react"


const ButtonControls = ({ loader, profileData, navigate }) => {

    return (
        <div className="flex items-center gap-2">
            <button type="submit" disabled={loader} className="bg-orange-600 hover:bg-orange-700 text-white rounded-full px-6 py-2 flex items-center justify-center cursor-pointer">
                {loader ? <Loader2 className="w-4 h-4 animate-spin" /> : (profileData ? "Update" : "Submit")}
            </button>

            {profileData && (
                <button type="button" onClick={() => navigate("/profile")} className="border border-gray-400 text-gray-200 rounded-full px-6 py-2 hover:bg-gray-700 cursor-pointer">
                    Cancel
                </button>
            )}
        </div>
    )
}

export default ButtonControls