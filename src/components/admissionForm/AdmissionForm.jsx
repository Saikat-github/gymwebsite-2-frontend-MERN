import React, { useState, useEffect, useMemo, useCallback, useContext } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { X } from "lucide-react";
import PersonalInfoSection from "./PersonalInfoSection";
import HealthInfoSection from "./HealthInfoSection";
import { assets } from "../../assets/assets";
import ButtonControls from "./ButtonControls";
import { useNavigate } from "react-router-dom";
import TermsAndConditions from "./TermsAndConditions";
import FilesUpload from "./FilesUpload";
import { AuthContext } from "../../context/AuthContext";
import DeleteButtons from "../profile/DeleteButtons";



const AdmissionForm = ({ profileData }) => {
  const [profileImg, setProfileImg] = useState(null);
  const [aadharImg, setAadharImg] = useState(null);
  const [loader, setLoader] = useState(false);

  const { user, backendUrl, getUserProfile } = useContext(AuthContext);

  const { register, handleSubmit, reset, watch, formState: { errors }, setError, clearErrors } = useForm();

  const navigate = useNavigate()

  const profilePreview = useMemo(() =>
    profileImg ? URL.createObjectURL(profileImg) : profileData?.personalInfo?.imageUrl || assets.UploadImage
    , [profileImg, profileData]);

  const aadharPreview = useMemo(() =>
    aadharImg ? URL.createObjectURL(aadharImg) : profileData?.personalInfo?.aadharUrl || assets.UploadImage
    , [aadharImg, profileData]);

  // Pre-fill form when editing
  useEffect(() => {
    if (profileData) {
      reset({
        ...profileData.personalInfo,
        dob: profileData.personalInfo.dob?.split("T")[0],
        ...profileData.healthInfo,
        ...profileData.membership,
        termsAndPolicy: profileData.termsAndPolicy
      });
    }
  }, [profileData, reset]);

  const resetForm = useCallback(() => {
    reset();
    setProfileImg(null);
    setAadharImg(null);
  }, [reset]);

  const onSubmit = useCallback(async (data) => {
    try {
      setLoader(true);
      const {aadhar, image, ...restData} = data;
      if (!profileImg && !profileData?.personalInfo?.imageUrl) {
        throw new Error("Please upload profile image");
      }
      if (!aadharImg && !profileData?.personalInfo?.aadharUrl) {
        throw new Error("Please upload Aadhar image");
      }

      const formData = new FormData();
      if (profileImg) formData.append("image", profileImg);
      if (aadharImg) formData.append("aadhar", aadharImg);
      if (!profileData) formData.append("email", user.email)

      Object.entries(restData).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const endpoint = profileData
        ? "/api/user/update-profile"
        : "/api/user/create-profile";

      const res = await axios.post(backendUrl + endpoint, formData, { withCredentials: true });

      if (!res.data.success) throw new Error(res.data.message);
      getUserProfile()
      toast.success(res.data.message);
      resetForm();
      navigate("/profile")
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoader(false);
    }
  }, [profileImg, aadharImg, profileData, resetForm]);





  return (
    <div className="min-h-screen sm:p-6 flex flex-col items-center justify-center mb-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" bg-slate-950 p-8 shadow-lg shadow-gray-200 w-full max-w-3xl text-gray-200 px-4 sm:px-8 pb-8 rounded-lg space-y-10 max-sm:text-sm relative"
      >
        <h1 className="text-3xl font-semibold text-center my-6">Admission Form</h1>
        {profileData && (
          <X
            onClick={() => navigate("/profile")}
            className="w-6 cursor-pointer opacity-70 hover:opacity-100 absolute top-4 right-10"
          />
        )}
        {/* Form Sections */}
        <PersonalInfoSection register={register} errors={errors} />
        <HealthInfoSection register={register} errors={errors} watch={watch} />


        {/* Files Upload */}
        <FilesUpload
          register={register}
          profilePreview={profilePreview}
          aadharPreview={aadharPreview}
          setAadharImg={setAadharImg}
          setProfileImg={setProfileImg}
          errors={errors}
          setError={setError}
          clearErrors={clearErrors}
        />

        {/* Terms */}
        <TermsAndConditions register={register} errors={errors} />

        {/* Buttons */}
        <ButtonControls
          profileData={profileData}
          navigate={navigate}
          loader={loader} />
      </form>

      <DeleteButtons />
    </div>
  );
};

export default AdmissionForm;
