import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import { AiFillYoutube, AiFillGithub, AiFillInstagram, AiFillLinkedin } from 'react-icons/ai'

const Footer = () => {
  return (
    <footer className="bg-[#f8fafd] py-10 mt-10 border-t">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Logo + description */}
        <div>
          <img src={logo} alt="logo" className="w-32 mb-4" />
          <p className="text-gray-600 text-[14px] leading-6">
            We provide trusted medical services focused on quality and care.
            Your health and well-being are always our priority.
          </p>

          {/* Socials */}
          <div className="flex items-center gap-4 mt-4">
            <a href="#" className="text-[22px] text-gray-700 hover:text-blue-600">
              <AiFillLinkedin />
            </a>
            <a href="#" className="text-[22px] text-gray-700 hover:text-red-600">
              <AiFillYoutube />
            </a>
            <a href="#" className="text-[22px] text-gray-700 hover:text-black">
              <AiFillGithub />
            </a>
            <a href="#" className="text-[22px] text-gray-700 hover:text-pink-600">
              <AiFillInstagram />
            </a>
          </div>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-[18px] font-semibold mb-4">Explore</h3>
          <ul className="space-y-2 text-gray-600 text-[15px]">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/doctors">Find a Doctor</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-[18px] font-semibold mb-4">Contact</h3>
          <ul className="space-y-2 text-gray-600 text-[15px]">
            <li>Location: Tunisie</li>
            <li>Phone: +216 00 000 000</li>
            <li>Email: support@medflow.com</li>
          </ul>
        </div>

      </div>

      <div className="text-center text-gray-500 text-[13px] mt-8">
        © 2025 MedFlow — All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
