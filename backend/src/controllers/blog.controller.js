import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js"
import Blog from "../models/blog.model.js";



export const getBlogs = async (req, res) => {
    try {

        const twoDaysAgo = new Date();
        twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

        const blogs = await Blog.find({
            createdAt: { $gte: twoDaysAgo } 
        });


        res.status(200).json(blogs)
    } catch (error) {
        console.log("Error in getMessage Controller: ", error.message);
        res.status(500).json({ error: "Internal Server Error" })
    }
}

export const sendBlog = async (req, res) => {
    try {
        const { text, image ,title,category,likes,views} = req.body;
        const senderId = req.user._id
        console.log("succesfull till here sendBlog");
        

        let imageUrl;
        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        console.log("jellp tehre");
        
        const newBlog = new Blog({
            senderId,
            text,
            title,
            category,
            likes,
            views,
            image: imageUrl
        })



        await newBlog.save();


        
            io.emit("newBlog", newBlog)
        

        res.status(201).json(newBlog)

    } catch (error) {
        console.log("Error in BlogMessage Controller: ", error.message);
        res.status(500).json({ error: "Internal Server Error" })
    }
}