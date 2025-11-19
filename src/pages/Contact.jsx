import React from 'react'

const Contact = () => {
  return (
    <section className='px-5 xl:px-0'>
      <div className='max-w-[1170px] mx-auto'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
          
          {/* Contact Information */}
          <div className='lg:pr-10'>
            <h2 className='text-headingColor text-[32px] leading-9 font-bold mb-8'>
              Get in <span className='text-primaryColor'>Touch</span>
            </h2>
            
            <p className='text-textColor text-[16px] leading-7 mb-10'>
              Have a question or need assistance? We're here to help. Fill out the form and our team will get back to you as soon as possible.
            </p>

            <div className='space-y-6'>
              <div className='flex items-start gap-4'>
                <div className='w-[50px] h-[50px] rounded-full bg-primaryColor bg-opacity-10 flex items-center justify-center flex-shrink-0'>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primaryColor" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className='text-headingColor font-bold text-[18px] mb-2'>Address</h4>
                  <p className='text-textColor text-[16px]'>123 Medical Center Drive<br />Tunis, Tunisia</p>
                </div>
              </div>

              <div className='flex items-start gap-4'>
                <div className='w-[50px] h-[50px] rounded-full bg-primaryColor bg-opacity-10 flex items-center justify-center flex-shrink-0'>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primaryColor" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className='text-headingColor font-bold text-[18px] mb-2'>Email</h4>
                  <p className='text-textColor text-[16px]'>support@healthcare.com</p>
                </div>
              </div>

              <div className='flex items-start gap-4'>
                <div className='w-[50px] h-[50px] rounded-full bg-primaryColor bg-opacity-10 flex items-center justify-center flex-shrink-0'>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primaryColor" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h4 className='text-headingColor font-bold text-[18px] mb-2'>Phone</h4>
                  <p className='text-textColor text-[16px]'>+216 12 345 678</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className='rounded-lg bg-white shadow-lg p-8'>
            <h3 className='text-headingColor text-[26px] leading-9 font-bold mb-8'>
              Send us a Message
            </h3>

            <form>
              <div className="mb-5">
                <input 
                  type="text" 
                  placeholder="Your Name"
                  name="name"
                  id="name"
                  autoComplete="name"
                  className='w-full py-3 border-b border-solid border-[#0066ff61] focus:outline-none
                  focus:border-b-primaryColor text-[18px] leading-7 text-headingColor
                  placeholder:text-textColor cursor-pointer'
                  required
                />
              </div>

              <div className="mb-5">
                <input 
                  type="email" 
                  placeholder="Your Email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  className='w-full py-3 border-b border-solid border-[#0066ff61] focus:outline-none
                  focus:border-b-primaryColor text-[18px] leading-7 text-headingColor
                  placeholder:text-textColor cursor-pointer'
                  required
                />
              </div>

              <div className="mb-5">
                <input 
                  type="text" 
                  placeholder="Subject"
                  name="subject"
                  id="subject"
                  autoComplete="off"
                  className='w-full py-3 border-b border-solid border-[#0066ff61] focus:outline-none
                  focus:border-b-primaryColor text-[18px] leading-7 text-headingColor
                  placeholder:text-textColor cursor-pointer'
                  required
                />
              </div>

              <div className="mb-5">
                <textarea 
                  placeholder="Your Message"
                  name="message"
                  id="message"
                  rows="5"
                  autoComplete="off"
                  className='w-full py-3 border-b border-solid border-[#0066ff61] focus:outline-none
                  focus:border-b-primaryColor text-[18px] leading-7 text-headingColor
                  placeholder:text-textColor cursor-pointer resize-none'
                  required
                />
              </div>

              <div className='mt-7'>
                <button 
                  type='submit' 
                  className='w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3 hover:bg-opacity-90 transition-all'
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Contact