import DoctorCard from '../../components/Doctors/DoctorCard'

import { BASE_URL } from '../../config'
import useFetchData from '../../hooks/useFetchData.jsx'


const DoctorList = () => {

  const {data:doctors, loading, error} = useFetchData(`${BASE_URL}/doctors`)
  
  if (loading) {
    return <div>Loading...</div>
  }
  
  if (error) {
    return <div>Error: {error.message}</div>
  }
  
  // Handle case where doctors data is null or undefined
  if (!doctors) {
    return <div>No doctors found</div>
  }
  
  return (
  <>
  
    <div className="grid md:grid-cols-3 gap-6">
      {doctors.map((doctor) => (
        <DoctorCard key={doctor._id || doctor.id || Math.random()} {...doctor} />
      ))}
    </div>
  </>

  )
}

export default DoctorList