
const SidePanel = () => {
  return (
    <div className='shadow-md p-3 rounded-md lg:p-5'>
        <div className='flex items-center justify-between'>
            <p className='text__para mt-0 font-semibold'>Ticket Price</p>
            <span className='text-[16px] leading-7 lg:text[22px] lg:leading-8 text-headingColor font-bold'>
                150DT
            </span>
        </div>

        <div className='mt-[30px]'>
            <p className='text__para mt-0 font-semibold text-headingColor'>
                Available Time Slots:
            </p>
            <ul className='mt-3'>
                <li className='flex items-center justify-between mb-2'>
                    <p className='text[15px] leading-6 text-Color font-semibold'>
                        sunday, 10 Jan 2024
                    </p>
                </li>   
                    <li className='flex items-center justify-between mb-2'>
                    <p className='text[15px] leading-6 text-Color font-semibold'>
                        sunday, 17 Jan 2024
                    </p>
                </li>  
                    <li className='flex items-center justify-between mb-2'>
                    <p className='text[15px] leading-6 text-Color font-semibold'>
                        sunday, 24 Jan 2024
                    </p>
                </li>  
            </ul>
        </div>
        <button className='btn w-full px-2 rounded-md'>
            Book Appointment
        </button>
    </div>
  )
}

export default SidePanel
