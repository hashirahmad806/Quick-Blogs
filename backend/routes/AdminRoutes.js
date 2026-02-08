import adminLogin, { approveCommentById, deleteCommentById, getAllBlogsAdmin, getAllComment, getDashboard } from "../Controllers/adminControler.js";
import { Router } from "express";
import verifyAdmin from './../Middlewares/verifyAdmin.js';

const adminRouter = Router();

adminRouter.post("/login", adminLogin);
adminRouter.get("/comment", verifyAdmin,getAllComment);
adminRouter.get("/blogs", verifyAdmin,getAllBlogsAdmin);
adminRouter.post("/delete-comment", verifyAdmin, deleteCommentById);
adminRouter.post("/approve-comment", verifyAdmin, approveCommentById);
// adminRouter.post("/approve-comment", verifyAdmin, approveCommentById);
adminRouter.get("/dashboard", verifyAdmin, getDashboard);




export default adminRouter;
