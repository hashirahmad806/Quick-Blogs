import React from 'react'
import { assets } from '../assets/assets'

function Header() {
  return (
    <div className='mx-8 sm:mx-16 xl:mx-24  relative'>

      <div className='text-center mt-20 mb-8'>
              
        <div className='  inline-flex items-center gap-4 text-sm  mb-4   px-6  py-1.5 border border-primary/40 rounded-full  text-primary 
        
        '>
          <p> New : AI  featured  integrated </p>
          <img src={assets.star_icon} alt="AI Feature" className="w-2.5  " />

        </div>
        <h1  className='text-3xl  sm:text-6xl font-semibold sm:leading-16  text-gray-700'>   Your  own  <span className='text-primary'> blogging </span>  <br /> platform </h1>
        <p className='text-gray-500  sm:my-8  max-w-2xl m-auto max-sm:text-xs '>Create and share your thoughts with our AI-powered platform
          , built for bloggers by bloggers.This is your  space  to  express  yourself.  weather  you're  a  seasoned  writer  or  just  starting  out.EVerything  you  need  to  craft,  edit,  and  publish  your  work  is  right  here.
        </p>
        <form>
          <input type="text" placeholder='Search for blogs, authors, topics...' className='mt-6  w-full sm:w-96  px-4 py-3  border border-gray-300 rounded-l-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'  required />
          <button type="submit" className='bg-primary text-white px-6 py-3 rounded-r-full hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'>Search</button>
        </form>
        
      </div>

      <img src={assets.gradientBackground} alt="Gradient Background" className="absolute -top-50 opacity-50 z-[-1]" />

    </div>
  )
}

export default Header