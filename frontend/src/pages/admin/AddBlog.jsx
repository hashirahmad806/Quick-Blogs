import React, { useEffect, useRef, useState } from 'react'
import { assets, blogCategories } from '../../assets/assets'
import Quill from 'quill';

function AddBlog() {
  const [image, setImage] = useState(false);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtite] = useState("");
  const [Publish, setPublish] = useState(false);
  const [category, setCategory] = useState("Startup");
   
  const editorRef = useRef(null);
  const quillRef = useRef(null);


  const SubmitHandeler = async (e) => {
     e.preventDefault()
  }


  const handelegenrate = async () => {
    
  }
  useEffect(() => {
    //initiate Quill only once { npm  install quill   page  used  for the  change  the  text  }
    if (!quillRef.current && editorRef.current) {
    quillRef.current = new Quill(editorRef.current, {theme:'snow'})
  }
    
  },[])

  return (
    <form    onSubmit={SubmitHandeler}  className=' flex-1 bg-blue-50/50 text-gray-600 h-full overflow-scroll '>
      <div className='bg-white   w-full  max-w-3xl md:p-10 p-4 sm:m-10 shadow rounded

      '>
        <p> Upload Thumbnail </p>
        <label htmlFor='image'>
          <img src={!image  ?  assets.upload_area  : URL.createObjectURL(image)} alt='' className='mt-2 h-16  rounded  cursor-pointer' />
          <input type="file" id='image'  hidden  required   on   onChange={(e)=>setImage(e.target.files[0])}/>

        </label>

        <p  className='mt-4 '>Blog Title</p>
        <input type='text' placeholder=' Type here ' value={title} onChange={(e) => setTitle(e.target.value)} className=' border border-gray-300  outline-none rounded  w-full  max-w-lg  mt-2 p-2 ' />
        <p  className='mt-4 '>Blog Subtitle</p>
        <input type='text' placeholder=' Type here ' value={subtitle} onChange={(e) => setSubtitle(e.target.value)} className=' border border-gray-300  outline-none rounded  w-full  max-w-lg  mt-2 p-2 ' />
        
        <p  className=' mt-4 '>   Blog Description</p>
        <div className='max-w-lg  h-74  pb-16  sm:pb-10 pt-2 relative'>
          <div ref={editorRef}></div>
          <button  onSubmit={handelegenrate}  className=' absolute bottom-1 right-2 ml-2 text-white bg-black/70  text-xs px-4 py-1.5  rounded hover:underline cursor-pointer  '>
            Generate with  AI
          </button>
        </div>
        <p className=' mt-4 '>   Blog Description </p>


        <select name='category' onChange={(e) => setCategory(e.target.value)}
         className='mt-2 px-3 py-2 border  text-gray-500  border-gray-300   outline-none  rounded '>
          <option>Select  Category </option>
          {blogCategories.map((item, index) => {
            return <option  key={index}   value={item}> {item} </option>
            
          })}
        </select>

        <div  className=' flex  gap-3 mt-4 '>
          <p>Publish  Now</p>
            
          <input type='checkbox'  checked={Publish}   onChange={(e)=>{setPublish(e.target.checked)}}   className=' scale-125   cursor-pointer'/>

            </div>

          <button  type='submit'  className='mt-8 w-40 bg-primary h-10  text-white  rounded cursor-pointer ' >Add  Blog </button>


      </div>

    </form>
  )
}

export default AddBlog