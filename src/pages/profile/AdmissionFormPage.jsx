import React, { useContext } from 'react'
import { AdmissionForm } from '../../components'
import { AuthContext } from '../../context/AuthContext'

const AdmissionFormPage = () => {
  const {profileData} = useContext(AuthContext);


  return (
    <AdmissionForm profileData={profileData}/>
  )
}

export default AdmissionFormPage