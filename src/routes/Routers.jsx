import Home from '../pages/Home'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import Services from '../pages/Services'
import Contact from '../pages/Contact'
import Doctors from '../pages/Doctors/Doctors'
import DoctorDetails from '../pages/Doctors/DoctorDetails'
import MyAccount from '../Dashboard/user-account/MyAccount'
import Dashboard from '../Dashboard/user-account/Dashboard'


import {Routes, Route} from 'react-router-dom'


const AppRoutes = () => {
  return ( <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/home' element={<Home/>}/>
    <Route path='/register' element={<Signup/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/services' element={<Services/>}/>
    <Route path='/contact' element={<Contact/>}/>
    <Route path='/doctors' element={<Doctors/>}/>
    <Route path='/doctor/:id' element={<DoctorDetails/>}/>
    <Route path='/user/profile/me' element={<MyAccount/>}/>
    <Route path='/doctor/profile/me' element={<Dashboard/>}/>
  </Routes>
  );
};
export default AppRoutes;