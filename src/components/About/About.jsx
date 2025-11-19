import React from 'react'
import aboutImg from '../../assets/images/about.png'
import aboutcardImg from '../../assets/images/about-card.png'
import { Link } from 'react-router-dom'

const About = () => {
  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="flex justify-between gap-[50px] lg:gap-[130px] xl:gap-0 flex-col lg:flex-row items-center">
          {/* About Image */}
          <div className='relative w-3/4 lg:w-1/2 xl:w-[770px] z-10 order-2 lg:order-1 '>
            <img 
              src={aboutImg} 
              alt="Healthcare professionals providing quality care" 
              className=""
            />
            <div className="absolute z-20 bottom-4 w-[200px] md:w-[500px] right-[-15%] md:right-[-7%] lg:right-[-10%]">
              <img 
                src={aboutcardImg} 
                alt="Award recognition" 
                className=""
              />
            </div>
          </div>

          {/* About Content */}
          <div className="w-full lg:w-1/2 xl:w-[670px] order-1 lg:order-2">
            <h2 className="heading text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Proud to be one of the nation's best
            </h2>
            
            <p className="text__para text-gray-700 text-base md:text-lg leading-relaxed">
              At MedFlow, we are dedicated to providing exceptional healthcare services that prioritize patient well-being and satisfaction. 
              Our team of experienced professionals works tirelessly to ensure that every patient receives personalized care tailored to their unique needs.
            </p>

            <p className="text__para text-gray-700 text-base md:text-lg leading-relaxed mt-[30px]">
              We believe in a holistic approach to healthcare, focusing not only on treating illnesses but also on promoting overall wellness and preventive care.
            </p>

            <Link to="/about">
              <button className="btn mt-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-md">
                Learn More
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About