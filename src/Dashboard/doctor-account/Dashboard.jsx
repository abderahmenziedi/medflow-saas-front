import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { authContext } from '../../context/AuthContext';
import { BASE_URL } from '../../config';
import useGetProfile from '../../hooks/useFetchData';
import Tabs from './Tabs';

const Dashboard = () => {
  const { data , loading, error } = useGetProfile(`${BASE_URL}/doctors/profile/me`);
  const [tab, setTab] = useState('overview');


  return (
    <section>
      <div className='mx-w-[1170px] px-5 mx-auto'>
        <div className='grid lg:grid-cols-5 gap-[30px] lg:gap-[50px]'>
          <Tabs tab={tab} setTab={setTab} />
        </div>
        
        
      </div>
    </section>
  )













}

export default Dashboard
