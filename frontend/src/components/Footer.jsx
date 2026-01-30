import React from 'react'
import { assets, footer_data } from '../assets/assets'

function Footer() {
  return (
    <div className=' px-6 md:px-16 lg:px-24 xl:px-32 bg-primary/3 '>
      <div className=' flex flex-col md:flex-row  justify-between items-center  border-b border-gray-500/30 gap-10  py-10 text-gray-500 '>
        <div className='md:w-[35%] text-center md:text-left  '>
          <img src={assets.logo} alt="QuickBlog Logo" className='w-32 sm:w-44' />
          <p className=' mt-6  mx-w-[410px] '>Your go-to platform for insightful blogs on tech, design, and more. Stay updated with QuickBlog! starting your blogging journey with us today.
          Finance and Business made simple and accessible for everyone. social media and marketing tips to boost your online presence.



          </p>
        </div>
        <div className='flex  justify-between w-full md:w-[45%] gap-5'>
          {footer_data.map((section, index) => (
            <div key={index} >
              <h4 className='font-semibold mb-4 text-gray-900'>{section.title}</h4>
              <ul  className='text-sm space-y-1'>
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex} className='mb-2 hover:text-primary hover:underline transition cursor-pointer text-sm'>
                    <a href="#">
                    {link}</a>
                  </li>
                ))}
              </ul>
           
           
            </div>
          ))}
        </div>
      </div>

      <p  className=' py-4  text-center text-sm md:text-base text-gray-500/800'>
        &Copyright  2025  QuickBlog . All rights reserved.</p>

    </div>
  )
}

export default Footer