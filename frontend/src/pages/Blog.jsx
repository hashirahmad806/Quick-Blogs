import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { assets, blog_data, comments_data } from '../assets/assets';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Moment from 'moment';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

function Blog() {
  const { id } = useParams();

  
  const { axios } = useAppContext();   
  const [name, setName] = useState('');
  const [content, setContent ] = useState('');

  
  const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);

  // ONE state for form
  const [comment, setComment] = useState({
    name: "",
    content: ""
  });

    // setComments(comments_data);  // fetch Comments  from data Base
const fetchComments = async () => {
  try {
    const { data } = await axios.post('/api/blog/comments', {
      blogId: id
    });

    if (data.success) {
      setComments(data.comment);


      
    } else {
      toast.error(data.message);
    }

  } catch (error) {
    toast.error(error.message);
  }
};

    // const blog = blog_data.find(item => item._id === id);
    // setData(blog);
   const fetchBlog = async () => {
  try {
    const { data } = await axios.get(`/api/blog/${id}`);

    if (data.success) {
      setData(data.blog); // ✅ EXACT match with backend
    } else {
      toast.error(data.message);
    }

  } catch (error) {
    toast.error(error.message);
  }
};


  // ✅ Correct change handler
  const handleChange = (e) => {
    const { name, value } = e.target;

    setComment(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addComment = async (e) => {
  e.preventDefault();

  if (!comment.name || !comment.content) {
    toast.error("All fields are required");
    return;
  }

  try {
    const { data } = await axios.post('/api/blog/add-comment', {
      blog: id,
      name: comment.name,
      content: comment.content
    });

    if (data.success) {
      toast.success(data.message);

      // clear form
      setComment({
        name: "",
        content: ""
      });

      fetchComments(); // refresh comments list
    } else {
      toast.error(data.message);
    }

  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
  }

  };

  useEffect(() => {
    fetchBlog();
    fetchComments();
  }, [id]);
  return data ? (
    <div className="relative">
      <img
        src={assets.gradientBackground}
        className="absolute -top-50 -z-1 opacity-50"
        alt=""
      />
      <Navbar />
      <div  className="mt-20 text-center justify-center text-gray-500">
        <p className='text-primary py-4 font-medium '> Publish on {Moment(data.createdAt).format('DD MMM YYYY')}</p>
         <h1  className=' text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto text-gray-800'>{data.title}</h1>
        <h2 className=' my-5 max-w-lg  truncate  mx-auto  '  dangerouslySetInnerHTML={{"__html": data.subTitle}}></h2>
        
        <p className='inline-block py-1 px-4 rounded-full mb-6 border text-sm border-primary/35  bg-primary/6 font font-medium  text-primary'>Michael Brown</p>
      </div>
      
      <div className="mx-5 max-w-5xl md:mx-auto mt-6 my-10">
        <img src={data.image} className='rounded-3xl mb-5' />
         <div  dangerouslySetInnerHTML={{"__html": data.description}} className='rich-text max-w-3xl  mx-auto'  ></div>
        
      </div>
       {/* Comments Section Placeholder */}
      <div className='mt-14  mb-10 max-w-3xl mx-auto items-center'>
        <p className='font-semibold mb-4'>Comments ( {comments.length})</p>

        <div className='flex flex-col gap-4'>{
          comments.map((item, index) => (
            <div key={index} className='border border-primary/5 mx-w-xl p-4 rounded text-gray-600  relative bg-primary/2'>

              <div className='flex items-center gap-2 mb-2'>
                <img src={assets.user_icon} alt="User" className='w-6' />
              <p className='font-medium text-gray-800'>{item.name}</p>
              </div>
              <p className='text-gray-600'>{item.content}</p>
              <div>
                <p className='text-xs text-gray-400 absolute top-4 right-4'>{Moment(item.createdAt).fromNow()}</p>
               </div>

            </div>
          ))}
              
        </div>
        {/* Comment Form Placeholder */}
        <div  className=' max-w-3xl mx-auto '>
          <h3 className='font-semibold mt-10 mb-4'>Leave a Comment</h3>
          <form className='flex flex-col gap-4' onSubmit={addComment}>
            <input  onChange={handleChange} value={comment.name} type="text" placeholder="Your Name" name='name' className='border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary' required />
            <textarea onChange={handleChange} value={comment.content} name='content' placeholder="Your Comment" className='border border-gray-300 rounded px-4 py-2 h-24 focus:outline-none focus:ring-2 focus:ring-primary' required></textarea>
            
            <button type="submit" className='bg-primary text-white px-8 p-2 rounded hover:scale-102  transition-all cursor-pointer'>Submit</button>
          </form>
          
          </div>

          <div className="my-24 max-w-3xl max-auto">
            <p className="font semi-bold my-4 "> Share  This articale on social media  </p>
              <div className=' flex'>
                <img  src={assets.facebook_icon} alt="facebook"  clasName="w-50"/>
                <img  src={assets.googleplus_icon} alt="facebook"  clasName="w-50"/>
                <img  src={assets.twitter_icon} alt="facebook"  clasName="w-50"/>

              </div>


          </div>





      </div>
      
        <Footer/>

    </div>
  ) : (
    <div>Loading...</div>
  );
}

export default Blog;
