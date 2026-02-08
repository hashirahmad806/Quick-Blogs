import { useContext } from "react";
import { createContext } from "react";
import axios from 'axios';

const AppContext = createContext();
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import toast from "react-hot-toast";
import { useEffect } from "react";



export const AppProvider = ({ children }) => {
  
  const navigate = useNavigate();

  const [token, setToken] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [input, setInput] = useState("");
 

  const fetchBlogs = async () => {
  try {
    const response = await axios.get('/api/blog/all');
    
    console.log("Full Response:", response);
    console.log("Response Data:", response.data);

    if (response.data.success) {
      setBlogs(response.data.blogs);
      console.log("Blogs Stored in State:", response.data.blogs);
    } else {
      toast.error(response.data.message);
    }

  } catch (error) {
    console.error("API Error:", error);
    toast.error(error.message);
  }
};


 
  useEffect(() => {
    fetchBlogs();
    const token = localStorage.getItem('token');
    if (token) {
      setToken(token);
      axios.defaults.headers.common['Authorization'] = `${token}`;
    }
     
   },[])





  const value = {
    axios, navigate, token, setToken, blogs, setBlogs, input , setInput
    
  };
  return (
    <AppContext.Provider value={value}>
      {children}
    
    
    </AppContext.Provider>
    
  );
  
}


export const useAppContext = () => {
  return useContext(AppContext)
   
}