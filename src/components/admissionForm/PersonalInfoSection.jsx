import React from "react";
import { User } from "lucide-react";

const GENDERS = ["male", "female", "other"];

const PersonalInfoSection = ({ register, errors }) => (

  <div>
    <h3 className="text-lg text-slate-100 sm:text-xl mb-2 flex items-center gap-2"><User size={20} /> Personal Information</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* First Name */}
      <div>
        <input
          {...register("name", { required: "Name is required" })}
          placeholder="Name" className="bg-slate-900 outline-none p-2 rounded w-full" />
        {errors.name && <p className="text-red-600 text-xs sm:text-sm">{errors.name.message}</p>}
      </div>

      {/* Phone */}
      <div>
        <input {...register("phone", {
          required: "Phone number is required",
          pattern: {
            value: /^[6-9]\d{9}$/,
            message: "Enter a valid 10-digit Indian phone number",
          },
        })} 
        type="tel" 
        placeholder="Phone Number" 
        className="bg-slate-900 outline-none p-2 rounded w-full" />
        {errors.phone && <p className="text-red-600 text-xs sm:text-sm">{errors.phone.message}</p>}
      </div>
      
      {/* Gender */}
      <div>
        <select {...register("gender", { required: "Gender is required" })}
          className="bg-slate-900 outline-none p-2 rounded w-full">
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        {errors.gender && <p className="text-red-600 text-xs sm:text-sm">{errors.gender.message}</p>}
      </div>

      {/* DOB */}
      <div className="bg-slate-900 p-2 rounded w-full text-gray-400 flex gap-1">
        <label htmlFor="dob" className="w-28">Your DOB</label>
        <input
        id="dob"
          type="date"
          {...register("dob", { required: "Date of birth is required" })}
           className="w-full outline-none"
        />
        {errors.dob && (
          <p className="text-red-400 text-xs mt-1">{errors.dob.message}</p>
        )}
      </div>


      {/* Emergency Contact Name */}
      <div>
        <input
          type="text"
          placeholder="Emergency Contact Name"
          {...register("emergencyName", { required: "Required" })}
          className="bg-slate-900 outline-none p-2 rounded w-full" 
        />
      </div>


      {/* Emergency Relation */}
      <div>
        <input
          type="text"
          placeholder="Emergency Relation"
          {...register("emergencyRelation", { required: "Required" })}
          className="bg-slate-900 outline-none p-2 rounded w-full" 
        />
      </div>

      {/* Emergency Phone */}
      <div>
        <input
          type="tel"
          placeholder="Emergency Phone"
          {...register("emergencyPhone", {
            required: "Required",
            pattern: { value: /^[6-9]\d{9}$/, message: "Invalid phone number" },
          })}
          className="bg-slate-900 outline-none p-2 rounded w-full" 
        />
        {errors.emergencyPhone && (
          <p className="text-red-400 text-xs mt-1">{errors.emergencyPhone.message}</p>
        )}
      </div>

    </div>
  </div>
);

export default PersonalInfoSection;
