import express, { response } from "express"
 import fs  from "fs"
import imagekit from "../Connection/Imagekit.js";
 import Blog  from  "../Models/Blog.js"
import Comment from "../Models/Comments.js";
import main from "../Connection/Gemini.js";
const app = express();
app.use(express.json());


// First: What is a parser?

// A parser is something that:

// 👉 reads incoming data
// 👉 converts it into a usable JavaScript object

// So your server can understand what the client sent.
// Frontend sends data:
// {
//   "email": "admin@gmail.com",
//   "password": "123456"
// }

// Backend (Express) tries:
// console.log(req.body);

// Output:
// undefined

//📦 Types of Parsers (Simple Table)
// Parser	Used For
// express.json()	JSON data (React, Postman)
// express.urlencoded()	HTML form data
// multer	File uploads
// cookie-parser	Cookies


export const addBlog = async ( req ,res) => {

  try {

    //req.body.blog  comes in the  form  of String    so  we  convert  it into  readalbe form  using  jason pare method
    const { title, subTitle, description, category, Published } = JSON.parse(req.body.blog);
    const imageFile = req.file; // for  image file

    if (!title || !description || !category || !imageFile) {
      return res.json({ success: false, message: "Missing  Fields are  Required " })
       

    }

    const fileBuffer = fs.readFileSync(imageFile.path);

    //  upload image  to Image Kit
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/blogs",
    });

    /// Optimization   Through   imageKit Url Transformation  
    const optimizedImageUrl = imagekit.url({
      path: response.filePath,
      transformation: [
        { quality: 'auto' },    // auto compression
        { format: "webp" },  //  covert  to  modern formate 
        { width: "1280" }   // Width Resizing ..

      ]
        
    });
    

    const image = optimizedImageUrl;
    //  save  this  data in  MONGO DB
    await Blog.create({ title, subTitle, description, category, image, Published });

    res.json({ success: true, message: "Blog added successfully " })
  
  } catch (error) {
    res.json({ success: false, message:  error.message });

  }

  }



export const  getAllBlogs = async (req, res) => {
   try {
    const blogs = await Blog.find({ Published: true })
    res.json({ success: true, blogs });
    
  } catch (error) {
    res.json({
      success: false, message: error.message
    });
    
  }
  
}






export const getBlogByID = async (req, res) => {
  try {
    const { blogId } = req.params;
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.json({success : false , message : "  Blog  not  found "})
    }
      
    res.json({ success: true ,   blog  });

   } catch (error) {
    res.json({ success: false, message: error.message });
   }
   
 }


// export const deleteBlogByID = async (req, res) => {
//   try {
//     const { Id } = req.body;
//     await Blog.findByIdAndDelete(Id);
//     //Delete  all comment associated  With the Blog ;
//     await Comment.deleteMany({ blog: Id });
      
//     res.json({ success: true ,   message : "Blog  deleted successfully  "  });

//    } catch (error) {
//     res.json({ success: false, message: error.message });
//    }
   
//  }
export const deleteBlogByID = async (req, res) => {
  try {
    const { id } = req.body;

    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found"
      });
    }

    // delete related comments
    await Comment.deleteMany({ blog: id });

    res.json({
      success: true,
      message: "Blog deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};




export const togglePublish = async (req, res) => {
  try {
    const { id } = req.body;

    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found"
      });
    }

 blog.Published = !blog.Published;
await blog.save();


    res.json({
      success: true,
      message: "Blog status updated successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};




export const addComment = async (req, res) =>
{
  try {
    const { blog, name, content } = req.body;
    await Comment.create({ blog, name, content });

    res.json({success : true , message :"Comment added  for  review "})



   } catch (error) {
     res.json({success :false  , message : error.message})
    
  }
} 
 




export const getBlogComment =  async (req, res) => {
  try {
    const { blogId } = req.body;
    const comment = await Comment.find({ blog: blogId, isApproved: true }).sort({ createdAt: -1 });

     res.json({success: true , comment})
   } catch (error) {
      res.json({success : false , message :error.message})
   }
}




export const generateContent = async (req, res) => {
  try {
    const { prompt } = req.body;
    const content = await main(prompt + 'Generate a  blog  Content  for this  topic  in simple text  formate ');
    res.json({success : true , content})
    
  } catch (error) {
        res.json({success : false ,  message:  error.message})

    
   }
 }