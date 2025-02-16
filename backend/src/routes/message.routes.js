import express from 'express'
import { protecRoute } from '../middleware/auth.middleware.js'
import { getMessages, getUserForSidebar, sendMessage } from '../controllers/message.controller.js'


const router = express.Router()

router.get("/users",protecRoute,getUserForSidebar)
router.get("/:id",protecRoute,getMessages)
router.post("/send/:id",protecRoute,sendMessage)

export default router