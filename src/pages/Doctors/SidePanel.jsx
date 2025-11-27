import { useContext } from 'react';
import { BASE_URL } from '../../config';
import { toast } from 'react-toastify';
import { authContext } from '../../context/AuthContext';

const formatTime = (time) => {
  if (!time) return '';
  
  try {
    const [hours, minutes] = time.split(':');
    let hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    
    if (hour > 12) {
      hour -= 12;
    } else if (hour === 0) {
      hour = 12;
    }
    
    return `${hour}:${minutes} ${ampm}`;
  } catch (error) {
    return time; 
  }
};

const SidePanel = ({doctorId,ticketPrice,timeSlots}) => {
  const { token } = useContext(authContext);

  const bookingHandler = async () => {
    try {
        const res = await fetch(`${BASE_URL}/bookings/checkout-session/${doctorId}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        const data = await res.json();
        if (!res.ok) {
            throw new Error(data.message+'Please try again .');
        } 
        if (data.session.url) {
          window.location.href = data.session.url;
        }

    } catch (error) {
        toast.error(error.message)
    }
  };


  return (
    <div className='shadow-md p-3 rounded-md lg:p-5'>
        <div className='flex items-center justify-between'>
            <p className='text__para mt-0 font-semibold'>Ticket Price</p>
            <span className='text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor font-bold'>
                {ticketPrice}DT
            </span>
        </div>

        <div className='mt-[30px]'>
            <p className='text__para mt-0 font-semibold text-headingColor'>
                Available Time Slots:
            </p>
            <ul className='mt-3'>
                {timeSlots && timeSlots.map((item, index) => (
                    <li key={index} className='flex items-center justify-between mb-2'>
                        <p className='text-[15px] leading-6 text-textColor font-semibold'>
                            {item.startingTime && item.endingTime && (
                                <>
                                    {formatTime(item.startingTime)} - {formatTime(item.endingTime)}
                                </>
                            )}
                        </p>
                        <p className='text-[15px] leading-6 text-textColor font-semibold'>
                            {item.day}
                        </p>
                    </li>   
                ))}
            </ul>
        </div>
        <button onClick={bookingHandler} className='btn w-full px-2 rounded-md'>
            Book Appointment
        </button>
    </div>
  )
}

export default SidePanel