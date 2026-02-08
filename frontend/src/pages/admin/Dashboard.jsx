import React from 'react'
import { assets ,dashboard_data } from '../../assets/assets'
import {useState ,useEffect}  from  'react'
import BlogtableItem from '../../components/admin/BlogtableItem';
import { useAppContext } from '../../context/AppContext';

function Dashboard() {
  const[dasboardData ,setDashboardData]=useState({
    blogs:0,
    comments:0,
    drafts:0,
    recentBlogs:0,

  });

  const { axios } = useAppContext();

  const fetchDashboard= async ()=>{
    // setDashboardData(dashboard_data);
    try {
      const { data } = await axios.get('/api/admin/dashboard');

      data.success ? setDashboardData(data.dashboardData) : toast.error(data.message);


      
    } catch (error) {
      toast.error(error.message);
      
    }

    
  } 
   useEffect(()=>{
    fetchDashboard();

   },[])

   

  return (
    <div className="   flex-1 p-4 md:p-10  bg-blue-50/50" >
         <div className='flex flex-wrap  gap-4'>
            <div   className='flex  gap-4  bg-white p-4  min-w-58 rounded shadow  cursor-pointer  hover:scale-105  transition-all'>
            <img  src={assets.dashboard_icon_1}    className='' />
             <div>
             <p className='text-xl font-semibold text-gray-600 '>{dasboardData.blogs}</p>
            <p className='text-gray-400 font-light '>Blogs</p>
           </div> 
         </div>
       <div   className='flex   gap-4  bg-white p-4  min-w-58 rounded shadow cursor-pointer  hover:scale-105  transition-all'>
        <img  src={assets.dashboard_icon_2}    className='' />
        <div>
          <p className='text-xl font-semibold text-gray-600 '>{dasboardData.comments}</p>
          <p className='text-gray-400 font-light '>comments</p>
           </div> 
       </div>

       <div   className='flex  item-center   gap-4  bg-white p-4  min-w-58 rounded shadow cursor-pointer  hover:scale-105  transition-all'>
        <img  src={assets.dashboard_icon_3}    className='' />
        <div>
          <p className='text-xl font-semibold text-gray-600 '>{dasboardData.drafts}</p>
          <p className='text-gray-400 font-light '>Drafts</p>
           </div> 
        </div>
       
         </div>

       <div>
      <div  className="  flex  item-center  gap-3  m-4 mt-6 text-gray-600  ">
        <img  src={assets.dashboard_icon_4}  alt=""/>
        <p>Lastest Blogs </p>

      </div>

        

      <div  className=' relative max-w-4xl shadow overflow-x-auto  rounded-lg  scrollbar-hide bg-white'>
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
                {Array.isArray(dasboardData?.recentBlogs) &&
                   dasboardData.recentBlogs.map((blog, index) => (
                  <BlogtableItem
                    key={blog._id || index}
                     blog={blog}
                     fetchBlogs={fetchDashboard}
                       index={index + 1}
                        />
                       ))}



            </tbody>


         </table>

      </div>

     </div>


      

         

    </div>
  )
}

export default Dashboard