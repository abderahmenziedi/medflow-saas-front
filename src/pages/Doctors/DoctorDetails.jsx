import React from 'react';
import { useParams } from 'react-router-dom';
import starIcon from "../../assets/images/Star.png";
import DoctorAbout from './DoctorAbout';
import Feedback from './Feedback';
import SidePanel from './SidePanel';
import { BASE_URL } from '../../config'
import useFetchData from '../../hooks/useFetchData.jsx'

const DoctorDetails = () => {
  const [tab, setTab] = React.useState('about')

  const {id} = useParams()
  const {data:doctor, loading, error} = useFetchData(`${BASE_URL}/doctors/${id}`)

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  if (!doctor) {
    return <div>Doctor not found</div>
  }

  const {
    name,
    qualifications,
    experiences,
    timeSlots,
    reviews,
    bio,
    about,
    averageRating,
    totalRating,
    specialization,
    ticketPrice,
    photo
  } = doctor

  return (
    <section>
      <div className='max-w-[1170px] px-5 mx-auto'>
        <div className='grid md:grid-cols-3 gap-[50px]'>
          <div className='md:col-span-2'>
            <div className='flex items-center gap-5'>
              <figure>
                <img src={photo} alt="" className="w-full" />
              </figure>
              <div>
                <span className='bg-[#ccf0f3] text-irisBlueColor py-1 px-6 lg:py-2 lg:px-6 text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded-full'>
                  {specialization}
                </span>
                <h3 className='text-headingColor text-[20px] leading-9 mt-3 font-bold'>
                  {name}
                </h3>
                <div className='flex items-center gap-[6px]'>
                  <span className='flex items-center gap-[6px] text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-semibold text-headingColor'>
                    <img src={starIcon} alt="" />   
                    {averageRating}
                  </span>
                  <span className='text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-[400] text-textColor'>
                    ({totalRating})
                  </span>
                </div>
                <p className='text__para text-[14px] leading-6 md:text-[15px] lg:max-w-[390px]'>
                  {bio}
                </p>
              </div>
            </div>

            <div className='mt-[50px] border-b border-solid border-[#0066ff34]'>
              <button
                onClick={() => setTab('about')}
                className={`py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold ${tab === "about" ? "border-b border-solid border-primaryColor" : ""}`}
              >
                About
              </button>
              <button
                onClick={() => setTab('feedback')}
                className={`py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold ${tab === "feedback" ? "border-b border-solid border-primaryColor" : ""}`}
              >
                FeedBack
              </button>
            </div>

            <div className='mt-[50px]'>
              {
                tab==="about" && <DoctorAbout name={name} specialization={specialization} about={about} qualifications={qualifications} experiences={experiences} />
              }
              {
                tab==="feedback" && <Feedback reviews={reviews} totalRating={totalRating} />
              }
            </div>
          </div>
          <div>
            <SidePanel doctorId={doctor._id} ticketPrice={ticketPrice} timeSlots={timeSlots} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default DoctorDetails