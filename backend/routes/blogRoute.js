import express from "express";
import { addBlog, addComment, deleteBlogByID, generateContent, getAllBlogs, getBlogByID, getBlogComment, togglePublish } from "../Controllers/blogController.js";
import upload from "../Middlewares/Multer.js";
import verifyAdmin from "../Middlewares/verifyAdmin.js";
 
const blogRouter = express.Router();
 
blogRouter.post('/add', upload.single('image'), verifyAdmin, addBlog);


blogRouter.get("/all", getAllBlogs);
blogRouter.get("/:blogId", getBlogByID);

blogRouter.post("/delete", verifyAdmin ,deleteBlogByID);
blogRouter.post("/toggle-publish", verifyAdmin, togglePublish);

blogRouter.post('/comments', getBlogComment);
blogRouter.post('/add-comment', addComment);
blogRouter.post('/generate', verifyAdmin ,generateContent);



export default blogRouter;