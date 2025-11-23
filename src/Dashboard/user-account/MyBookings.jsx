import React from 'react'
import useFetchData from '../../hooks/useFetchData';
import { BASE_URL } from '../../config'
import Doctorcard from '../../components/Doctors/DoctorCard'


const MyBookings = () => {
 
    const {
        data:appointments,
    }=useFetchData(`${BASE_URL}/users/appointments/my-appointments`)
  
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {appointments && appointments.map((appointment) => (
          <Doctorcard key={appointment._id} appointment={appointment} />
        ))}
      </div>
      {appointments && appointments.length === 0 && (
        <h2 className="mt-5 text-center leading-7 text-[20px] font-semibold">You have no bookings yet.</h2>
      )}
    </div>

  )
}

export default MyBookings
