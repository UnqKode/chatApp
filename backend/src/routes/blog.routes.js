import express from 'express'
import { protecRoute } from '../middleware/auth.middleware.js'
import { getBlogs, sendBlog } from '../controllers/blog.controller.js'



const router = express.Router()

router.get("/getBlog",protecRoute,getBlogs)
router.post("/send",protecRoute,sendBlog)

export default router