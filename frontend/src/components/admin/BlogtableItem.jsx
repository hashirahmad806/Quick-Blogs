



import React from "react";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

function BlogtableItem({ blog, fetchBlogs, index }) {
  const { title, createdAt, Published } = blog;
  const blogDate = new Date(createdAt);
  const { axios } = useAppContext();

  const deleteBlog = async () => {
    const confirm = window.confirm("Are you sure you want to delete this blog?");
    if (!confirm) return;

    try {
      const { data } = await axios.post("/api/blog/delete", {
        id: blog._id
      });

      if (data.success) {
        toast.success(data.message);
        fetchBlogs();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const togglePublish = async () => {
    try {
      const { data } = await axios.post("/api/blog/toggle-publish", {
        id: blog._id
      });

      if (data.success) {
        toast.success(data.message);
        fetchBlogs(); // 🔁 refresh UI
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <tr className="border-y border-gray-300">
      <th className="px-2 py-4">{index}</th>

      <td className="px-2 py-4">{title}</td>

      <td className="px-2 py-4 max-sm:hidden">
        {blogDate.toDateString()}
      </td>

      <td className="px-2 py-4 max-sm:hidden">
        <p className={Published ? "text-green-600" : "text-orange-700"}>
          {Published ? "Published" : "Unpublished"}
        </p>
      </td>

      <td className="px-2 py-4 flex gap-3 text-xs">
        <button
          onClick={togglePublish}
          className="border px-2 py-1 rounded cursor-pointer hover:bg-gray-100"
        >
          {Published ? "Unpublish" : "Publish"}
        </button>

        <img
          src={assets.cross_icon}
          alt="delete"
          onClick={deleteBlog}
          className="w-8 cursor-pointer hover:scale-110 transition-all"
        />
      </td>
    </tr>
  );
}

export default BlogtableItem;
