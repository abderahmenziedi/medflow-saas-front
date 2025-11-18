import React from 'react'
import logo from '../../assets/images/logo.png'


const Header = () => {
  return (
    <div>
      <header className="header flex items-center">
        <div className="container">
         <div className="flex items-center justify-between">
          {/* Logo */}
          <div>
            <img src={logo} alt="" />
          </div>

         </div>
         </div>
        </header>
    </div>
  )
}

export default Header
