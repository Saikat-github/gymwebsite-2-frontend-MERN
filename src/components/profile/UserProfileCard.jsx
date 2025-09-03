import React from 'react'
import {
  Phone, Mail, Calendar, Heart, Ruler, Weight,
  ShieldCheck, CreditCard, AlertTriangle, Contact, Edit,
  User,
  Wallet2
} from 'lucide-react'
import { Link } from 'react-router-dom'
import DeleteButtons from './DeleteButtons'



const UserProfileCard = ({ user }) => {
  const { personalInfo, healthInfo, membership } = user

  const formatDate = (date) => {
    if (!date) return 'N/A'
    return new Date(date).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })
  }

  const medicalConditionsText = () => {
    if (!healthInfo.hadMedicalCondition) return 'None'
    let allConditions = [...(healthInfo.conditions || [])]
    if (healthInfo.otherConditions) allConditions.push(healthInfo.otherConditions)
    return allConditions.length > 0 ? allConditions.join(', ') : 'None'
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="rounded-2xl shadow-lg shadow-orange-600 border-orange-600 p-4 sm:p-6 md:p-8 space-y-6">

        {/* Top Profile Section */}
        <div className="flex flex-col md:flex-row items-center gap-2 sm:gap-6 mb-6 sm:justify-around">
          <div className='space-y-2'>
            <img
              src={personalInfo.imageUrl}
              alt="Profile"
              className="w-32 h-32 object-cover rounded-full"
            />
            <h2 className="text-lg sm:text-2xl font-semibold tracking-wide">{personalInfo.name}</h2>
          </div>
          <div className="flex flex-col gap-3 max-sm:text-xs text-sm">
            <Link
              to='/admission-form'
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 text-white border border-orange-600 transition duration-200 hover:opacity-80"
            >
              <Edit size={16} /> Edit
            </Link>
            <Link
              to={"/membership-details"}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 text-white border border-orange-600 transition duration-200 hover:opacity-80"
            >
              <CreditCard size={16} /> Membership Details
            </Link>
            <Link
              to={"/payment-history"}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 text-white border border-orange-600 transition duration-200 hover:opacity-80"
            >
              <Wallet2 size={16} /> Payment History
            </Link>
          </div>
        </div>

        {membership.status === "inactive" && (
          <p className='text-xs p-2 rounded border border-red-600 text-gray-200'>
            You don't have any active membership, please buy a membership plan to continue using our gym services. <Link to="/plans" className='underline'>Click Here</Link>
          </p>
        )}

        {/* Personal & Health Info */}
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <InfoItem icon={<User size={18} />} label="Roll Number" value={user?.rollNo} />
          <InfoItem icon={<Phone size={18} />} label="Contact Number" value={personalInfo.phone} />
          <InfoItem icon={<Mail size={18} />} label="Email" value={personalInfo.email} />
          <InfoItem icon={<Calendar size={18} />} label="Date of Birth" value={formatDate(personalInfo.dob)} />
          <InfoItem icon={<CreditCard size={18} />} label="Gender" value={personalInfo.gender} />
          <InfoItem icon={<Ruler size={18} />} label="Height" value={`${healthInfo.height} cm`} />
          <InfoItem icon={<Weight size={18} />} label="Weight" value={`${healthInfo.weight} kg`} />
          <InfoItem icon={<Heart size={18} />} label="Fitness Goal" value={healthInfo.goal} />
          <InfoItem icon={<ShieldCheck size={18} />} label="Medical Conditions" value={medicalConditionsText()} />
        </div>

        {/* Emergency Contact */}
        <div className="bg-slate-800/50 p-4 rounded-lg">
          <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
            <AlertTriangle className='text-orange-600' size={18} /> Emergency Contact
          </h3>
          <div className="space-y-2 text-sm">
            <p><strong>Name :</strong> {personalInfo.emergencyName}</p>
            <p><strong>Relation :</strong> {personalInfo.emergencyRelation}</p>
            <p><strong>Phone :</strong> {personalInfo.emergencyPhone}</p>
          </div>
        </div>

        {/* Aadhar */}
        <div className="pt-4">
          <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
            <Contact className='text-orange-600' size={18} /> Aadhar Image
          </h3>
          <img
            src={personalInfo.aadharUrl}
            alt="Aadhar"
            className="w-full max-w-md rounded-xl border border-slate-800 shadow mx-auto"
          />
        </div>

        {/* Danger Zone */}
        <DeleteButtons />
      </div>
    </div>
  )
}

const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-center gap-3 text-slate-100 bg-slate-900 p-3 rounded-lg">
    <div className="text-orange-600">{icon}</div>
    <div>
      <p className="text-xs uppercase text-slate-300">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  </div>
)

export default UserProfileCard
