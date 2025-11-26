import React from 'react'

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
    </table>
  )
}

export default Appointments
