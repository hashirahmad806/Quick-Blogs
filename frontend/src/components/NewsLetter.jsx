import React from 'react'

function NewsLetter() {
  return (
    <div  className='bg-gray-50 flex flex-col items-center justify-center text-center gap-6 py-10 px-4 mx-8 sm:mx-20 xl:mx-32 rounded-lg mb-20 '> 
      <h1 className='md:text-4xl text-2xl  font-semibold '>Never Miss a Blog!</h1>
      <p  className='md:text-lg text-gray-500/70 pb-8'> subscribe to get our Blog for the latest updates  and tech , design and more.. </p>
      <form  className='flex items-center justify-between max-w-2xl w-full  md:h-13 h-12'>

        <input type='text' placeholder='Enter your email id' className='border border-gray-300 rounded-r-md rounded-r-0  h-full rounded-md  px-3 py-2 text-gray-500  w-full outline-none' required />
        <button type='submit' className='bg-primary text-white rounded-l-md rounded-l-0  h-full rounded-md px-3 py-2 '> Subscribe </button>
      </form>

    </div>
  )
}

export default NewsLetter