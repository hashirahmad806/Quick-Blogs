import React, { useEffect, useRef, useState } from "react";
import { assets, blogCategories } from "../../assets/assets";
import Quill from "quill";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { parse } from "marked";

function AddBlog() {
  const { axios } = useAppContext();
  const [isAdding, setIsAdding] = useState(false);

  const [image, setImage] = useState(false);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [Published, setPublished] = useState(false);
  const [category, setCategory] = useState("Startup");

  const [loading, setLoading] = useState(false);

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const SubmitHandeler = async (e) => {
    try {
      e.preventDefault();
      setIsAdding(true);

      const blog = {
        title,
        subTitle,
        description: quillRef.current.root.innerHTML,
        category,
        Published,
      };

      const formData = new FormData();
      formData.append("blog", JSON.stringify(blog));
      formData.append("image", image);
      //  Now send  this  data into  backend ;
      const { data } = await axios.post("/api/blog/add", formData);
      // Now  showing Status  weather  its  success  or not
      if (data.success) {
        toast.success(data.message);
        // Now   clear  Every  thing  after send  its Data  to  Backend  /
        setImage(false);
        setTitle("");
        quillRef.current.root.innerHTML = "";
        setCategory("Startup");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsAdding(false);
    }
  };

  const handelegenrate = async () => {
    if (!title) {
      return toast.error("Please Enter a title");
    }
    try {
      setLoading(true);
      const { data } = await axios.post("/api/blog/generate", {
        prompt: title,
      });
      if (data.success) {
        quillRef.current.root.innerHTML = parse(data.content);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    //initiate Quill only once { npm  install quill   page  used  for the  change  the  text  }
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, { theme: "snow" });
    }
  }, []);

  return (
    <form
      onSubmit={SubmitHandeler}
      className=" flex-1 bg-blue-50/50 text-gray-600 h-full overflow-scroll "
    >
      <div
        className="bg-white   w-full  max-w-3xl md:p-10 p-4 sm:m-10 shadow rounded

      "
      >
        <p> Upload Thumbnail </p>
        <label htmlFor="image">
          <img
            src={!image ? assets.upload_area : URL.createObjectURL(image)}
            alt=""
            className="mt-2 h-16  rounded  cursor-pointer"
          />
          <input
            type="file"
            id="image"
            hidden
            required
            onChange={(e) => setImage(e.target.files[0])}
          />
        </label>

        <p className="mt-4 ">Blog Title</p>
        <input
          type="text"
          placeholder=" Type here "
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className=" border border-gray-300  outline-none rounded  w-full  max-w-lg  mt-2 p-2 "
        />
        <p className="mt-4 ">Blog Subtitle</p>
        <input
          type="text"
          placeholder=" Type here "
          value={subTitle}
          onChange={(e) => setSubTitle(e.target.value)}
          className=" border border-gray-300  outline-none rounded  w-full  max-w-lg  mt-2 p-2 "
        />

        <p className=" mt-4 "> Blog Description</p>
        <div className="max-w-lg  h-74  pb-16  sm:pb-10 pt-2 relative">
          <div ref={editorRef}></div>

          {loading && (
            <div className="absolute  bottom-0  right-0  left-0  top-0  flex mt-2  justify-center items-center bg-black/10">
              <div className=" w-8 h-8    rounded-full border-2  border-t-white  animate-spin  "></div>
            </div>
          )}
          <button
            type="button"
            onClick={handelegenrate}
            disabled={loading}
            className="absolute bottom-1 right-2 ml-2 text-white bg-black/70 text-xs px-4 py-1.5 rounded hover:underline"
          >
            {loading ? "Generating ...." : "Generate with AI"}
          </button>
        </div>

        <p className=" mt-4 "> Blog Description </p>

        <select
          name="category"
          onChange={(e) => setCategory(e.target.value)}
          className="mt-2 px-3 py-2 border  text-gray-500  border-gray-300   outline-none  rounded "
        >
          <option>Select Category </option>
          {blogCategories.map((item, index) => {
            return (
              <option key={index} value={item}>
                {" "}
                {item}{" "}
              </option>
            );
          })}
        </select>

        <div className=" flex  gap-3 mt-4 ">
          <p>Publish Now</p>

          <input
            type="checkbox"
            checked={Published}
            onChange={(e) => {
              setPublished(e.target.checked);
            }}
            className=" scale-125   cursor-pointer"
          />
        </div>

        <button
          type="submit"
          disabled={isAdding}
          className="mt-8 w-40 bg-primary h-10  text-white  rounded cursor-pointer "
        >
          {isAdding ? "Adding ... " : " Add Blog"}{" "}
        </button>
      </div>
    </form>
  );
}

export default AddBlog;
