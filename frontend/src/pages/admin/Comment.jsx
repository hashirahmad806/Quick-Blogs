import React, { useEffect, useState } from 'react'
import { comments_data } from '../../assets/assets';
import CommentTableItem from '../../components/admin/CommentTableItem';
import { useAppContext } from '../../context/AppContext';

function Comment() {
  const [comment, setComment] = useState([]);
  const [filter, setFilter] = useState("Not Approved")
   const {axios} = useAppContext()
 
  const fetchcomments = async () => {
    // setComment(comments_data);
    try {
      const { data } = await axios.get('/api/admin/comment');
      data.success ? setComment(data.comments) : toast.error(data.message);
      
    } catch (error) {
      toast.error(error.message);
      
    }

     
  }
   
  useEffect(() => {
    fetchcomments();
    
  }, []);
// console.log(comment);

  

  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50  '>
      <div   className='flex  justify-between  items-center max-w-3xl'>
        <h1>Comments </h1>
        <div className='flex gap-5'>
          <button onClick={()=>{setFilter("Approved")}}
            className={ `shadow-custom-sm border rounded-full px-4 py-1 cursor-pointer text-xs ${filter === "Approved" ? 'text-primary ' : "text-gray-700"}`}> Approved </button>
          <button  onClick={()=>{setFilter("Not Approved")}}  className={` shadow-custom-sm border rounded-full px-4 py-1 cursor-pointer text-xs  ${filter === "Not Approved" ? 'text-primary ' : "text-gray-700"}`}  >Not  Approved </button>
          
        </div>
      </div>

      <div className='relative h-4/5 max-w-3xl overflow-x-auto mt-4 bg-white shadow rounded-lg scrollbar-hide'>
        <table  className=' w-full text-sm text-gray-500 '>
          <thead  className='text-xs  text-gray-700 text-left-700 uppercase '>
            <tr>
              <th  scope='col'  className='px-6 py-3 '> Blog Title & Comments </th>
              <th scope='col'  className='px-6 py-3 '>Date  </th>
              <th scope='col'  className='px-6 py-3 '> Action </th>
             
            </tr>
          </thead>
          <tbody>
            {
              comment.filter((comment) => {
                if (filter === 'Approved') return comment.isApproved === true;
                return comment.isApproved === false;
              }).map((comment, index) => (
                <CommentTableItem comment={comment}
                  key={comment._id}
                  index={index + 1}
                  fetchComments={fetchcomments}
                />
              ))
            }
          </tbody>
        </table>

      </div>


    </div>
  )
}

export default Comment


