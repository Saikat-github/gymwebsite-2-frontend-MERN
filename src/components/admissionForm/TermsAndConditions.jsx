import React from 'react'

const TermsAndConditions = ({register, errors}) => {
    return (
        <div>
            <div className="flex gap-2 items-start text-xs">
                <input type="checkbox" {...register("termsAndPolicy", { required: true })} className="mt-1" />
                <p>By continuing, you agree to the <a href="/terms" className="text-blue-400 underline">Terms</a> & <a href="/privacy" className="text-blue-400 underline">Privacy Policy</a>. 
                <br />
                Please read our <a href="/terms" className="text-blue-400 underline">Terms</a> & <a href="/privacy" className="text-blue-400 underline">Privacy Policy</a> before proceding</p>
            </div>
            {errors.termsAndPolicy && <p className="text-red-400 text-xs">You must agree before submitting</p>}

        </div>
    )
}

export default TermsAndConditions