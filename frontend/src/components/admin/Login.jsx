
import React from 'react'
import { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
 import toast from 'react-hot-toast';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { axios, setToken } = useAppContext();

//   const handSubmit  = async (e) => {
//     e.preventDefault()
//     const { data } = await axios.post('/api/admin/login', { email, password });
//     try {
//       if (data.success) {
//         setToken(data.token)
//         axios.defaults.headers.common['Authorization'] = data.axios;
//        toast.success(data.message);

//       }else {
//         console.log(data);
//        toast.error(data.message);
// }
      
//     }
//     catch (error) {
//       toast.error(error.message);

      
  //     }
  
const handSubmit = async (e) => {
  e.preventDefault();

  try {
    const { data } = await axios.post('/api/admin/login', {
      email,
      password,
    });

    // success (200)
    setToken(data.token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
    toast.success(data.message);

  } catch (error) {
    // 🔥 PREVENT "Uncaught (in promise)"
    if (error.response) {
      // Backend responded (401, 500, etc.)
      toast.error(error.response.data.message);
    } else {
      // Network / unknown error
      toast.error("Something went wrong");
    }
  }
};

  return (
    <div className=' flex items-center justify-center h-screen'>
      <div className=' w-full max-w-sm p-6 max-md:m-6 border border-primary/30 shadow-xl shadow-primary/15 rounded-lg  ' > 
        <div className='flex flex-col items-center justify-center'> 
          <div className='py-6 w-full  text-center'>
            <h1 className='text-3xl  font-bold'>   <span className='text-primary '> Admin  </span> Login</h1>
           <p className='  font-light'>Enter Your credentials to access the  Admin panel </p>
          </div>
          <form onSubmit={handSubmit}   className='mt-6 w-full  sm:max-w-md text-gray-600 '>
            <div  className='flex  flex-col'>
              <label >Email </label>
              <input type='email' required   placeholder=' Enter Your Email Id  ' className='border-b-2 border-gray-300 p-2 outline-none mb-6   ' 
              onChange={e =>setEmail(e.target.value)}  value={email} />
            </div>
           
            <div  className='flex  flex-col'>
              <label >Password </label>
              <input type='password' required   placeholder=' Enter Your Password  ' className='border-b-2 border-gray-300 p-2 outline-none mb-6   '  onChange={e =>setPassword(e.target.value)}   value={password} />
            </div>
                  <button type='submit'   className='w-full py-3 font-medium bg-primary text-white rounded cursor-pointer  hover:bg-primary/90 transition-all '>  Login </button>
          </form>




        </div>
      </div>
    </div>
  )
}

export default Login