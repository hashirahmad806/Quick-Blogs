import React from 'react'
import { blog_data, blogCategories } from '../assets/assets'
import { useState } from 'react'
import { motion } from 'motion/react'
import BlogCard from './BlogCard'


function Bloglist() {

   const [menu , setMenu] =useState('All');
  return (
    <>
      <div className='flex  justify-center sm:gap-8 my-10  gap-4   relative '>
        {blogCategories.map((category, index) => (
          <div key={index} className='relative '>
            <button onClick={() => setMenu(category)} className={`cursor-pointer text-gray-500 ${menu===category && 'text-white px-4  pt-0.5'}   `}>
            
              {category}
              { menu===category &&(  <motion.div   layoutId="underline"  transition={{type:"spring", stiffness:500  , damping:30}} className='absolute left-0 right-0  top-0 h-7 -z-1 bg-primary rounded-full '>

              </motion.div> ) }

            </button>
            
            <span className='text-sm font-medium'>{category.name}</span>
          </div>
        ))}

      </div>


      <div   className=' grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5  gap-8 mb-24 mx-8 sm:mx-16 xl:mx:40 '> 
        {/* Blog cards will go here based on selected category */}

        {blog_data.filter((blog)=> menu==='All'? true : blog.category === menu).map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
        
      </div>
       
    </>
  )
}

export default Bloglist