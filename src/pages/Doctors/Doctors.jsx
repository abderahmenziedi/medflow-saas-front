import { useState } from 'react';
import { doctors } from '../../assets/data/doctors';
import { BsSearch } from 'react-icons/bs';
import DoctorCard from '../../components/Doctors/DoctorCard'; 

const Doctors = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [specialtyFilter, setSpecialtyFilter] = useState('All');

  const specialties = ['All', ...new Set(doctors.map((doc) => doc.specialization))];

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = specialtyFilter === 'All' || doctor.specialization === specialtyFilter;
    return matchesSearch && matchesSpecialty;
  });

  return (
    <section className="bg-gradient-to-b from-[#f0f4ff] to-[#ffffff] py-24">
      <div className="container mx-auto px-6">
        {/* Title */}
        <h2 className="text-5xl sm:text-6xl font-bold text-center text-[#4a4aff] mb-16 drop-shadow-md">
          Find Your Perfect Doctor
        </h2>

        {/* Search & Filter */}
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row gap-4 mb-16">
          <div className="flex items-center flex-1 bg-white rounded-xl shadow-lg overflow-hidden border border-[#4a4aff33] transition-shadow hover:shadow-2xl">
            <span className="px-4 text-[#4a4aff]">
              <BsSearch size={22} />
            </span>
            <input
              type="search"
              className="flex-1 p-4 text-gray-700 placeholder-gray-400 outline-none"
              placeholder="Search by name or specialization..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            className="p-4 rounded-xl border border-[#4a4aff33] bg-white shadow-lg hover:border-[#3a3ad1] transition-colors text-gray-700"
            value={specialtyFilter}
            onChange={(e) => setSpecialtyFilter(e.target.value)}
          >
            {specialties.map((spec, idx) => (
              <option key={idx} value={spec}>
                {spec}
              </option>
            ))}
          </select>
        </div>

        {/* Doctors Grid */}
        {filteredDoctors.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredDoctors.map((doctor) => (
              <DoctorCard
                key={doctor.id}
                {...doctor}
                className="transition-transform transform hover:scale-105 hover:shadow-2xl"
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 text-xl mt-16">
            No doctors found matching your search.
          </p>
        )}
      </div>
    </section>
  );
};

export default Doctors;
