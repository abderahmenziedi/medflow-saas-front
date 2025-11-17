import React from 'react'
import { useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
const Navbar = () => {
    const [menu, setMenu] = useState("home")
  return (
    <div className='navbar'>
        <img src={assets.logo} alt="" className='logo' />
        <ul className='navbar-menu'>
            <li onClick={() => setMenu("home")} className={menu ==="home"?"active":""}>Home</li>
            <li onClick={() => setMenu("about")} className={menu ==="about"?"active":""}>About</li>
            <li onClick={() => setMenu("contact")} className={menu ==="contact"?"active":""}>Contact</li>
            <li onClick={() => setMenu("services")} className={menu ==="services"?"active":""}>Services</li>
        </ul>
        <div className='navbar-right'>
            <img src={assets.search_icon} alt="" />
            <div className='navbar-search-icon'>
                <img src={assets.basket_icon} alt="" />
                <div className='dot'></div>
            </div>
            <button>sign in</button>
        </div>
    </div>
  )
}

export default Navbar
