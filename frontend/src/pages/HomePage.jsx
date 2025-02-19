import React, { useState, useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import NoChatSelected from "../components/NoChatSelected";
import Sidebar from "../components/SideBar";
import ChatContainer from "../components/ChatContainer";
import { motion } from "framer-motion";
import { Mails, Layers } from "lucide-react";
import toast from "react-hot-toast";
import BlogContainer from "../components/BlogContainers";
import CreateBlog from "../components/CreateBlog";

function HomePage() {
  const { selectedUser } = useChatStore();
  const [chatArea, setChatArea] = useState(true); 
  const [opacity, setOpacity] = useState(1); 
  const [chatPosition, setChatPosition] = useState(0); // Position for Messages
  const [blogPosition, setBlogPosition] = useState(-100); // Position for Blogs (initially offscreen)

  const handleButtonClick = (area) => {
    if (area === chatArea) {
      return toast(`Already on ${area ? "Messages" : "Blogs"}`, {
        icon: '😒',
      });
    }
    setChatArea(area);
    setOpacity(opacity === 1 ? 0 : 1); // Toggle opacity on button click
    
    if (area) {
      setChatPosition(0); // Chat is visible
      setBlogPosition(100); // Blog goes off-screen
    } else {
      setChatPosition(100); // Chat goes off-screen
      setBlogPosition(0); // Blog is visible
    }
  };

  return (
    <div className="h-screen bg-base-200 pt-16 overflow-hidden">
      <div className="flex justify-center items-center gap-6 m-2 w-auto">
        <button
          className={`flex justify-center items-center gap-2 text-primary font-bold ${
            chatArea ? "bg-primary-content rounded-lg p-2" : ""
          } hover:scale-105`}
          onClick={() => handleButtonClick(true)} // Messages button click
        >
          <Mails />
          <p>Messages</p>
        </button>
        <button
          className={`flex justify-center items-center gap-2 text-primary font-bold ${
            !chatArea ? "bg-primary-content rounded-lg p-2" : ""
          }`}
          onClick={() => handleButtonClick(false)} // Blogs button click
        >
          <Layers />
          <p>Blogs</p>
        </button>
      </div>

      {/* Chat Area */}
      <motion.div
        initial={{ scale: 0, opacity: 0, y: 0 }}
        animate={{
          scale: 1,
          opacity: opacity,
          y: chatPosition, // Control chat position dynamically
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`items-center justify-center mb-4 px-4 ${opacity === 0 ? "hidden" : "flex"}`}
      >
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </motion.div>

      {/* Blog Area */}
      <motion.div
        initial={{ scale: 0, opacity: 1, y: -100 }} // Initially off-screen
        animate={{
          scale: 1,
          opacity: opacity === 0 ? 1 : 0,
          y: blogPosition, // Control blog position dynamically
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`items-center justify-center pt-1 px-4 ${opacity === 1 ? "hidden" : "flex"}`}
      >
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <CreateBlog />
            <BlogContainer />
          </div>  
        </div>
      </motion.div>
    </div>
  );
}

export default HomePage;
