import React from 'react'
import { formatDate } from '../../utils/formateDate'

const DoctorAbout = ({ name, about, qualifications, experiences }) => {
  return (
    <div>
      {/* About Section */}
      <div>
        <h3 className='text-[20px] leading-[30px] font-semibold text-headingColor flex items-center gap-2'>
          About of Dr. 
          <span className='text-irisBlueColor text-[28px] leading-9 font-bold'>
            {name}
          </span>
        </h3>

        <p className='text__para'>
          {about}
        </p>
      </div>

      {/* Education Section */}
      <div className='mt-12'>
        <h3 className='text-[20px] leading-[30px] font-semibold text-headingColor'>
          Education
        </h3>

        <ul className='pt-4 md:p-5'>
          {qualifications && qualifications.length > 0 ? (
            qualifications.map((qualification, index) => (
              <li key={index} className='flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]'>
                <div>
                  <span className='text-irisBlueColor text-[15px] leading-6 font-semibold'>
                    {qualification.from ? formatDate(qualification.from) : 'N/A'} - {qualification.to ? formatDate(qualification.to) : 'Present'}
                  </span>
                  <p className='text-[15px] leading-6 font-medium text-textColor'>
                    {qualification.degree || 'Degree not specified'}
                  </p>
                </div>
                <p className='text-[14px] leading-5 font-medium text-textColor'>
                  {qualification.institute || 'Institute not specified'}
                </p>
              </li>
            ))
          ) : (
            <li className='text-[15px] leading-6 font-medium text-textColor'>
              No qualifications listed
            </li>
          )}
        </ul>
      </div>

      {/* Experience Section */}
      <div className='mt-12'>
        <h3 className='text-[20px] leading-[30px] font-semibold text-headingColor'>
          Experience
        </h3>

        <ul className='grid sm:grid-cols-2 gap-[30px] pt-4 md:p-5'>
          {experiences && experiences.length > 0 ? (
            experiences.map((experience, index) => (
              <li key={index} className='p-4 rounded bg-[#ff9]'>
                <span className='text-yellowColor text-[15px] leading-6 font-semibold'>
                  {experience.from ? formatDate(experience.from) : 'N/A'} - {experience.to ? formatDate(experience.to) : 'Present'}
                </span>

                <p className='text-[16px] leading-6 font-medium text-textColor'>
                  {experience.position || 'Position not specified'}
                </p>

                <p className='text-[14px] leading-5 font-medium text-textColor'>
                  {experience.hospital || 'Hospital not specified'}
                </p>
              </li>
            ))
          ) : (
            <li className='text-[15px] leading-6 font-medium text-textColor'>
              No experiences listed
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}

export default DoctorAbout