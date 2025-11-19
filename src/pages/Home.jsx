import React from 'react'
import heroImg01 from '../assets/images/hero-img01.png'
import heroImg02 from '../assets/images/hero-img02.png'
import heroImg03 from '../assets/images/hero-img03.png'
import icon01 from '../assets/images/icon01.png'
import icon02 from '../assets/images/icon02.png'
import icon03 from '../assets/images/icon03.png'
import featureImg from '../assets/images/feature-img.png'
import videoIcon from '../assets/images/video-icon.png'
import avatarIcon from '../assets/images/avatar-icon.png'

import { Link } from 'react-router-dom'
import { BsArrowRight } from 'react-icons/bs'

import About from '../components/About/About.jsx'
import ServiceList from '../components/Services/serviceList.jsx'
import DoctorList from '../components/Doctors/doctorList.jsx'

const Home = () => {
  return (
    <>
      {/* hero section */}
      <section className='hero__section pt-[60px] 2x1:h-[800px]'>
        <div className='container'>
          <div className='flex flex-col lg:flex-row gap-[90px] items-center justify-between'>
            {/* hero content */}
            <div>
              <div className='lg:w-[570px]'>
                <h1 className='text-[36px] leading-[46px] text-headingColor font-[800] md:text-[60px] md:leading-[70px]'>
                  We Help patients live a healthy, longer life.
                </h1>
                <p className='text__para'>
                  MedFlow is a comprehensive healthcare management platform designed to streamline patient care, enhance communication, and improve overall health outcomes.
                </p>
                <button className='btn'>Request an Appointment</button>
              </div>
              
              {/* hero counter */}
              <div className='mt-[30px] lg:mt-[70px] flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-[30px]'>
                <div>
                  <h2 className='text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor'>30+</h2>
                  <span className='w-[100px] h-2 bg-yellowColor rounded-full block mt-[-14px]'></span>
                  <p className='text__para'>Years of Experience</p>
                </div>

                <div>
                  <h2 className='text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor'>15+</h2>
                  <span className='w-[100px] h-2 bg-purpleColor rounded-full block mt-[-14px]'></span>
                  <p className='text__para'>Clinic Location</p>
                </div>

                <div>
                  <h2 className='text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor'>100%</h2>
                  <span className='w-[100px] h-2 bg-irisBlueColor rounded-full block mt-[-14px]'></span>
                  <p className='text__para'>Patient Satisfaction</p>
                </div>
              </div>
            </div>

            <div className='flex gap-[30px] justify-end'>
              <div>
                <img className='w-full' src={heroImg01} alt="" />
              </div>
              <div className='mt-[30px]'>
                <img src={heroImg02} alt="" className='w-full mb-[30px]' />
                <img src={heroImg03} alt="" className='w-full' />
              </div>
            </div>
          </div> 
        </div>
      </section>
      {/* hero section end */}

      <section>
        <div className='container'> 
          <div className='lg:w-[470px] mx-auto'>
            <h2 className='heading text-center'>Your Health, Our Priority</h2>
            <p className='text__para text-center'>
              At MedFlow, we are dedicated to providing exceptional healthcare services that prioritize your well-being. Our team of experienced professionals is committed to delivering personalized care tailored to your unique needs.
            </p> 
          </div>

        <div className='flex items-center justify-center gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]'>
            <div className='py-[20px] px-5'>
              <div className='flex items-center justify-center'>
                <img src={icon01} alt="" />
              </div>
              <div className='mt-[20px]'>
                <h2 className='text-[26px] leading-9 text-headingColor font-[700] text-center'>
                  Find a Doctor
                </h2>
                <p className='text-[16px] leading-7 text-center text-textColor font-[400] mt-4'>
                  Easily search and book appointments with top-rated healthcare professionals in your area.
                </p>
                <Link to="/doctors" className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none">
                  <BsArrowRight className='group-hover:text-white w-6 h-5'/>
                </Link>
              </div>
            </div>
            <div className='py-[20px] px-5'>
              <div className='flex items-center justify-center'>
                <img src={icon02} alt="" />
              </div>
              <div className='mt-[20px]'>
                <h2 className='text-[26px] leading-9 text-headingColor font-[700] text-center'>
                  Find a Location
                </h2>
                <p className='text-[16px] leading-7 text-center text-textColor font-[400] mt-4'>
                  Easily search and book appointments with top-rated healthcare professionals in your area.
                </p>
                <Link to="/doctors" className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none">
                  <BsArrowRight className='group-hover:text-white w-6 h-5'/>
                </Link>
              </div>
            </div>

            <div className='py-[20px] px-5'>
              <div className='flex items-center justify-center'>
                <img src={icon03} alt="" />
              </div>
              <div className='mt-[20px]'>
                <h2 className='text-[26px] leading-9 text-headingColor font-[700] text-center'>
                  Book Appointment
                </h2>
                <p className='text-[16px] leading-7 text-center text-textColor font-[400] mt-4'>
                  Easily search and book appointments with top-rated healthcare professionals in your area.
                </p>
                <Link to="/doctors" className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none">
                  <BsArrowRight className='group-hover:text-white w-6 h-5'/>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      <About />

      {/** service */}
      <section>
        <div className='container'>
        <div className='xl:w-[470px] mx-auto'>
          <h2 className='heading text-center'> Our Medical Services</h2>
          <p className='text__para text-center'>
            We offer a wide range of medical services to meet your healthcare needs.
             Our experienced team of professionals is dedicated to providing high-quality care in a compassionate and supportive environment.
          </p>
        </div>
        <ServiceList />
        </div>
      </section>
      {/** end service */}

      {/**  features section */}
      <section>
        <div className='container'> 
          <div className='flex items-center justify-between lg:flex-row flex-col '>
            <div className='xl:w-[670px]'>
              <h2 className='heading'> Get Virtual  Treatment  <br />from the comfort of your home</h2>

              <ul className='pl-4'>
                <li className='text__para'>
                  1.schedule a virtual consultation with one of our healthcare professionals.
                </li>
                <li className='text__para '>
                  2.During the consultation, our healthcare professional will assess your symptoms, provide a diagnosis, and recommend a treatment plan.
                </li>
                <li className='text__para '>
                  3.If necessary, our healthcare professional can prescribe medication or recommend further testing or follow-up appointments.
                </li>
              </ul>
              <Link to='/'> <button className='btn'>Get Started</button></Link>
            </div>
            <div className='relative z-10 xl:w-[770px] flex justify-end mt[50px] lg:mt-0'>
              <img src={featureImg} className='w-3/4' alt="" />
              <div className='w-[150px] lg:w-[248px] bg-white absolute bottom-[50px] left-0 mg:bottom-[100px] mg:left-5 
              z-20 p-2 pb-3 lg:pt-4 lg:px-4 lg:pb-[26px] rounded-[10px]'>
                <div  className='flex items-center justify-between'>
                  <div className='flex items-center gap-[6px] lg:gap-3'>
                    <p className='text-[10px] leading-[10px] lg:text-[14px] lg:leading-5 text-headingColor font-[600]'> Tue,06</p>
                    <p className='text-[10px] leading-[10px] lg:text-[14px] lg:leading-5 text-headingColor font-[500]'> 11:00AM</p>
                  </div>
                  <span className='w-5 h-5 lg:w-[34px] lg:h-[34px] flex items-center justify-center 
                  bg-yellowColor rounded py-1 px-[6px] lg:py-3 lg:px-[9px]'>
                  <img src={videoIcon} alt="" />
                  </span>

                </div>
              <div className='w-[65px] lg:w-[96px] bg-[#CCF0F3] py-1 px-2 lg:py-[6px] lg:px-[10px]
              text-[8px] leading-[10px] lg:text-[14px] lg:leading-5  font-[600] mt-2 lg:mt-4 rounded-full'>
              Consultation
              </div>
              <div className='flex items-center gap-[6px] lg:gap-[10px] mt-2 lg:mt-[18px]'>
                <img src={avatarIcon} alt="" />
                <h4 className='text-[10px] leading-[10px] lg:text-[14px] lg:leading-5 text-headingColor font-[600]'>Dr. Hama Kchaou </h4>
              </div>
              </div>
            </div>
         </div>

        </div>

      </section>
      {/**  End features section */}

      {/** doctor section */}
      <section>
        <div className='container'>
          <div className='xl:w-[470px] mx-auto'>
            <h2 className='heading text-center'>Our Doctors</h2>
            <p className='text__para text-center'>
              Our team of experienced and compassionate doctors is dedicated to providing high-quality healthcare services to our patients.
              Each doctor is highly trained and knowledgeable in their respective fields, and they work together to ensure that 
              our patients receive the best possible care.
            </p>
          </div>  
          <DoctorList />
        </div>
      </section>
    </>
  )
}
export default Home
