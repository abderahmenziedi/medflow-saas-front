import React from 'react'
import { formatDate } from '../../utils/formateDate'

const DoctorAbout = () => {
  return (
    <div>
      {/* About Section */}
      <div>
        <h3 className='text-[20px] leading-[30px] font-semibold text-headingColor flex items-center gap-2'>
          About Us
          <span className='text-irisBlueColor text-[28px] leading-9 font-bold'>
            Muzhir
          </span>
        </h3>

        <p className='text__para'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Sed euismod, nisl nec ultricies lacinia, nisl nisl aliquam nisl,
          eget aliquam nisl nisl sit amet nisl.
        </p>
      </div>

      {/* Education Section */}
      <div className='mt-12'>
        <h3 className='text-[20px] leading-[30px] font-semibold text-headingColor'>
          Education
        </h3>

        <ul className='pt-4 md:p-5'>
          {/* Item 1 */}
          <li className='flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]'>
            <div>
              <span className='text-irisBlueColor text-[15px] leading-6 font-semibold'>
                {formatDate('01-13-2008')} - {formatDate('09-13-2011')}
              </span>
              <p className='text-[15px] leading-6 font-medium text-textColor'>
                PHD in Surgeon
              </p>
            </div>
            <p className='text-[14px] leading-5 font-medium text-textColor'>
              New Apollo Hospital, New York.
            </p>
          </li>

          {/* Item 2 */}
          <li className='flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]'>
            <div>
              <span className='text-irisBlueColor text-[15px] leading-6 font-semibold'>
                {formatDate('07-04-2010')} - {formatDate('05-05-2013')}
              </span>
              <p className='text-[15px] leading-6 font-medium text-textColor'>
                PHD in Surgeon
              </p>
            </div>
            <p className='text-[14px] leading-5 font-medium text-textColor'>
              New Apollo Hospital, New York.
            </p>
          </li>

        </ul>
      </div>

      {/* Experience Section */}
      <div className='mt-12'>
        <h3 className='text-[20px] leading-[30px] font-semibold text-headingColor'>
          Experience
        </h3>

        <ul className='grid sm:grid-cols-2 gap-[30px] pt-4 md:p-5'>
          <li className='p-4 rounded bg-[#ff9]'>
            <span className='text-yellowColor text-[15px] leading-6 font-semibold'>
              {formatDate('07-04-2010')} - {formatDate('05-05-2013')}
            </span>

            <p className='text-[16px] leading-6 font-medium text-textColor'>
              General Surgeon
            </p>

            <p className='text-[14px] leading-5 font-medium text-textColor'>
              Apollo Hospital, Delhi.
            </p>
            
          </li>
            <li className='p-4 rounded bg-[#ff9]'>
            <span className='text-yellowColor text-[15px] leading-6 font-semibold'>
              {formatDate('07-04-2010')} - {formatDate('05-05-2013')}
            </span>

            <p className='text-[16px] leading-6 font-medium text-textColor'>
              General Surgeon
            </p>

            <p className='text-[14px] leading-5 font-medium text-textColor'>
              Apollo Hospital, Delhi.
            </p>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default DoctorAbout
