import { useAppContext } from "./context/AppContext";



const BlogsTest = () => {
  const { blog } = useAppContext();

  return (
    <div>
      <h2>Total Blogs: {blog.length}</h2>

      {blog.length === 0 ? (
        <p>No blogs found</p>
      ) : (
        blog.map((item) => (
          <div key={item._id}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default BlogsTest;