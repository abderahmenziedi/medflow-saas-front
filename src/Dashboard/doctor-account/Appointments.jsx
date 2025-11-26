import { formatDate } from '../../utils/formateDate'

const Appointments = ({appointments}) => {
  return (
    <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="py-3 px-6">
                    Name
                </th>
                <th scope="col" className="py-3 px-6">
                    Gender
                </th>
                <th scope="col" className="py-3 px-6">
                    Payment
                </th>
                <th scope="col" className="py-3 px-6">
                    Price
                </th>
                <th scope="col" className="py-3 px-6">
                    Booked On
                </th>
            </tr>
        </thead>

        <tbody>
            {appointments?.map(item => <tr key={item._id}>
                <th scope="row" 
                className="flex items-center py-4 px-6 text-gray-900 whitespace-nowrap">
                    <img 
                    src={item.user.photo} 
                    alt="" 
                    className="w-10 h-10 rounded-full" 
                    />

                    <div className='pl-3'>
                        <div className='text-base font-semibold'>{item.user.name}</div>
                        <div className='text-sm text-gray-500'>{item.user.email}</div>
                    </div>
                


                </th>
                <td className="py-4 px-6">
                    {item.user.gender}
                </td>
                <td className="py-4 px-6">
                    {item.isPaid && (
                    <div className='flex items-center '> 
                        <div className='h-2.5 w-2.5 rounded-full bg-green-500 mr-2'></div>
                        Paid
                    </div>
                    )}

                    {!item.isPaid && (
                    <div className='flex items-center '> 
                        <div className='h-2.5 w-2.5 rounded-full bg-red-500 mr-2'></div>
                        Unpaid
                    </div>
                    )}
                </td>
                <td className="py-4 px-6">
                    {item.ticketPrice}
                </td>
                <td className="py-4 px-6">
                    {formatDate(item.createdAt)}
                </td>
             </tr> 
            )}
        </tbody>
    </table>
  )
}

export default Appointments
