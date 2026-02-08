import React, { useEffect, useState } from 'react'
import { blog_data } from '../../assets/assets';
import BlogtableItem from '../../components/admin/BlogtableItem';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

function ListBlog() {
  const [blogs, setBlogs] = useState([]);
  const { axios } = useAppContext();

  const fetchBlogs = async () => {
    // setBlogs(blog_data);   //fetch     data dummy data  ;
    try {
      const { data } = await axios.get('/api/admin/blogs');
      if (data.success) {
        setBlogs(data.blogs)
      } else {
        toast.error(data.message);
      }

      
    } catch (error) {
      toast.error(error.message);

      
     }
    
  }
  useEffect(() => {
    fetchBlogs();
  },[]);


  return (
    <div className='flex-1  pt-5  px-4 sm:pl-15  sm:pt-12 bg-blue-50/50  '>
      <h1>All  Blogs </h1>
         
      
      <div  className=' relative  h-4/5   mt-5 max-w-4xl shadow overflow-x-auto  rounded-lg  scrollbar-hide bg-white'>
           <table className=" w-full text-sm text-gray-500  ">
           <thead   className='text-xs text-gray-600 text-left-uppercase'>

            <tr>
              <th scope='col'  className='px-2 p-4 xl:px-6'>#</th>
              <th scope='col'  className='px-2 p-4'>Blog Title</th>
              <th scope='col'  className='px-2 p-4 max-sm:hidden '>Date</th>
              <th scope='col'  className='px-2 p-4  max-sm:hidden '>status</th>
              <th scope='col'  className='px-2 p-4'>Action</th>
               </tr>
            </thead>
            <tbody> 
                   {blogs.map((blog, index) => (
                    <BlogtableItem
                    key={blog._id || index}
                     blog={blog}
                     fetchBlogs={fetchBlogs}
                       index={index + 1}
                        />
                       ))}
                  </tbody>
           </table>

      </div>



    </div>
  )
}

export default ListBlog