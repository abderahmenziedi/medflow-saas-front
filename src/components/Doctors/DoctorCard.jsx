import React from 'react'
import starIcon from '../../assets/images/Star.png'
import { Link } from 'react-router-dom'
import { BsArrowRight } from 'react-icons/bs'

const Doctorcard = (props) => {
    // Handle both direct doctor object and appointment object with doctor data
    const doctorData = props.appointment ? props.appointment.doctor : props;
    
    const {
        _id: id,
        name,
        specialization,
        avgRating,
        totalRating,
        photo,
        totalPatients,
        hospital,
    } = doctorData;

    return (
        <div className='p-3 lg:p-5 shadow rounded-xl'>
            <div>
                <img src={photo} className="w-full rounded-xl" alt={name} />

                <h2 className='text-[18px] leading-[30px] lg:text-[26px] lg:leading-9 
                text-headingColor font-[700] mt-3 lg:mt-5'>
                    {name}
                </h2>

                <div className='mt-2 lg:mt-4 flex items-center justify-between'>
                    <span className='bg-[#CCF0F3] text-irisBlueColor px-2 py-1 lg:py-2 lg:px-6 
                    text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-[500] rounded-md'>
                        {specialization}
                    </span>
                </div>

                <div className='flex items-center gap-2 mt-3'>
                    <img src={starIcon} alt="star" className='w-4 h-4' />
                    <span className='text-[14px] font-[600]'>
                        {avgRating || 0} 
                    </span>
                    <span className='text-gray-500 text-[13px]'>
                        ({totalRating || 0} reviews)
                    </span>
                </div>

                <div className='mt-3 text-[14px] text-gray-600'>
                    <p><span className='font-semibold'>Patients:</span> {totalPatients || 0}</p>
                    <p><span className='font-semibold'>Hospital:</span> {hospital || 'Not specified'}</p>
                </div>

                <Link 
                    to={`/doctor/${id}`} 
                    className='flex items-center gap-1 mt-4 text-irisBlueColor font-[600]'
                >
                    View Profile <BsArrowRight />
                </Link>
            </div>
        </div>
    );
};

export default Doctorcard;