


import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Blog from "../Models/Blog.js";
import Comment from "../Models/Comments.js";


dotenv.config();

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verify admin credentials
    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.status(401).json({
        success: false ,
        message: "Invalid credentials",
      });
    }

    // Create JWT token
    const token = jwt.sign(
      { email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Send response
    res.status(200).json({
      success: true,
      token,
      message :"Login SuccessFully "
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};

export default adminLogin;



// Controller  Function   admin  Admin  can see All Blogs

export const getAllBlogsAdmin = async(req, res) => {
  try {
    const blogs = await Blog.find({}).sort({ createdAt: -1 });

     res.json({success:true ,blogs })

  } catch (error) {
    res.json({ success: false, message: error.message });

    
  }
   
}
 
// Controller  Function     Admin  can see All Comments



export const getAllComment = async(req, res) => {
  try {
    const comments   = await Comment.find({}).populate("blog").sort({ createdAt: -1 });

     res.json({success:true , comments })

  } catch (error) {
    res.json({ success: false, message: error.message });

    
  }
   
}


export const getDashboard = async (req, res) => {
  try {
    const recentBlogs = await Blog.find({}).sort({ createdAt: -1 }).limit(5);
    const blogs = await Blog.countDocuments();
    const comments = await 
    Comment.countDocuments();
    const drafts = await Blog.countDocuments({ Published: false });

    const dashboardData = { blogs, comments, drafts, recentBlogs };

     res.json({success :true  , dashboardData})
      
  } catch (error) {
    res.json({ success: false, message: error.message });

      
    }
  }





export const deleteCommentById = async (req ,res) => {
  try {
    const { id } = req.body;
    await Comment.findByIdAndDelete(id);
    res.json({ success: true, message: "Comment  deleted successfully" });
      
  } catch (error) {
    res.json({ success: false, message: error.message });
      
     }
   }
export const approveCommentById = async (req, res) => {
  try {
    const { id } = req.body;

    await Comment.findByIdAndUpdate(
      id,
      { isApproved: true },
      { new: true }
    );

    res.json({ success: true, message: "Comment Approved Successfully" });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

