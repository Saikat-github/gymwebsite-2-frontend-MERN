import React, { useCallback } from 'react'
import { Upload, AlertCircle } from 'lucide-react'

const FilesUpload = ({ profilePreview, aadharPreview, register, setAadharImg, setProfileImg, errors, setError, clearErrors }) => {



  // Production-grade file validator
  const validateFile = useCallback((file, fieldName) => {
    try {
      const maxSize = 500 * 1024; // 500KB in bytes
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp'];

      if (!file) {
        setError?.(fieldName, {
          type: 'required',
          message: 'File is required'
        });
        return false;
      }

      // Check file size
      if (file.size > maxSize) {
        setError?.(fieldName, {
          type: 'fileSize',
          message: 'File size must be less than 500KB'
        });
        return false;
      }

      // Check MIME type (primary validation)
      if (!allowedTypes.includes(file.type)) {
        setError?.(fieldName, {
          type: 'fileType',
          message: 'Only JPEG, PNG, and WebP images are allowed'
        });
        return false;
      }

      // Check file extension (secondary validation for security)
      const fileName = file.name.toLowerCase();
      const hasValidExtension = allowedExtensions.some(ext => fileName.endsWith(ext));

      if (!hasValidExtension) {
        setError?.(fieldName, {
          type: 'fileExtension',
          message: 'Invalid file extension. Use .jpg, .jpeg, .png, or .webp'
        });
        return false;
      }

      // Clear errors if validation passes
      clearErrors(fieldName);
      return true;
    } catch (error) {
      console.log(error)
    }
  }, [setError]);



  // Handle profile image change
  const handleProfileChange = useCallback(async (e) => {
    const file = e.target.files[0];
    if (file && validateFile(file, 'image')) {
      setProfileImg(file);
    } else {
      e.target.value = ''; // Reset input
    }
  }, [validateFile, setProfileImg]);



  // Handle Aadhar image change
  const handleAadharChange = useCallback(async (e) => {
    const file = e.target.files[0];
    if (file && validateFile(file, 'aadhar')) {
      setAadharImg(file);
    } else {
      e.target.value = ''; // Reset input
    }
  }, [validateFile, setAadharImg]);




  return (
    <div>
      <h1 className="text-lg text-slate-100 sm:text-xl mb-2 flex items-center gap-2">
        <Upload />Upload Documents
      </h1>
      <div className="flex justify-around gap-10 flex-wrap bg-gray-900 p-4 sm:p-8">

        {/* Profile Image */}
        <div className="flex gap-4 items-center">
          <div className="flex flex-col gap-2">
            <label htmlFor="profile-img" className="cursor-pointer flex flex-col gap-1 items-center">
              <img
                src={profilePreview}
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover"
              />
              <p className="text-center text-sm">
                Upload Profile Picture
                <span className="text-red-500">*</span>
              </p>
              <p className="text-xs text-gray-400">Max 500KB; JPG, JPEG, PNG, WebP only</p>
            </label>
            {errors?.image && (
              <div className="flex items-center gap-1 text-red-400 text-xs">
                <AlertCircle size={12} />
                <span>{errors.image.message}</span>
              </div>
            )}
          </div>
          <input
            type="file"
            id="profile-img"
            hidden
            accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
            {...register("image")}
            onChange={handleProfileChange}
          />
        </div>

        {/* Aadhar Image */}
        <div className="flex gap-4 items-center">
          <div className="flex flex-col gap-2">
            <label htmlFor="aadhar-img" className="cursor-pointer flex flex-col gap-1 items-center">
              <img
                src={aadharPreview}
                alt="Aadhar"
                className="w-20 h-20 rounded-full object-cover"
              />
              <p className="text-center text-sm">
                Upload Aadhar Card
                <span className="text-red-500">*</span>
              </p>
              <p className="text-xs text-gray-400">Max 500KB; JPG, JPEG, PNG, WebP only</p>
            </label>
            {errors?.aadhar && (
              <div className="flex items-center gap-1 text-red-400 text-xs">
                <AlertCircle size={12} />
                <span>{errors.aadhar.message}</span>
              </div>
            )}
          </div>
          <input
            type="file"
            id="aadhar-img"
            hidden
            accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
            {...register("aadhar")}
            onChange={handleAadharChange}
          />
        </div>
      </div>
    </div>
  )
}

export default FilesUpload