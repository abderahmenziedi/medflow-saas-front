import React from 'react'
import DoctorCard from './DoctorCard'
import { doctors } from '../../assets/data/doctors.js'

const DoctorList = () => {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {doctors.map((doc) => (
        <DoctorCard key={doc.id} {...doc} />
      ))}
    </div>
  )
}

export default DoctorList
