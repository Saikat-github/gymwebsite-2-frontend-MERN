import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { AdmissionForm, UserProfileCard } from '../../components';

const Profile = () => {
  const { profileData } = useContext(AuthContext);

  
  return (
      profileData
      ?
      <UserProfileCard user={profileData} />
      :
      <AdmissionForm />
    
  )
}

export default Profile