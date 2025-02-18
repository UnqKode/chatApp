import React, { useEffect, useRef, useState } from "react";
import { useBlogStore } from "../store/useBlogStore.js";
import BlogSkeleton from "./skeleton/BlogSkeleton.jsx";
import axios from "axios";
import { Eye, PenLine, ThumbsUp } from "lucide-react";

const BlogContainer = () => {
  const { blogs, getBlogs, isBlogLoading, subscribeToBlog, unsubscribeFromBlog, ceateBlog, setceateBlog } = useBlogStore();
  const [OpenImage, setOpenImage] = useState(null);
  const [showImage, setshowImage] = useState(false);
  const [creaeBlog, setcreateBlog] = useState(true);
  const messagesEndRef = useRef(null);

  // Scroll into view for the first blog in reversed order
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [blogs]); // Run when blogs change

  // Fetch blogs and subscribe to updates (run only once when the component mounts)
  useEffect(() => {
    const fetchBlogs = async () => {
      await getBlogs(); // Ensure that getBlogs is an async function
      console.log("Fetched blogs: ", blogs); // Log blogs after fetching
    };

    fetchBlogs(); // Call fetchBlogs when the component mounts
    subscribeToBlog(); // Subscribe to real-time blog updates

    return () => unsubscribeFromBlog(); // Cleanup when the component unmounts
  }, [getBlogs, subscribeToBlog, unsubscribeFromBlog]); // Removed 'blogs' from the dependency array

  // If the blogs are still loading, show skeleton
  if (isBlogLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <BlogSkeleton />
      </div>
    );
  }

  const openImage = (src) => {
    setshowImage(true);
    setOpenImage(src);
  };

  const toggleImageModal = () => {
    setshowImage(!showImage);
  };

  const handleDownload = async (url) => {
    try {
      const response = await axios.get(url, {
        responseType: "blob",
      });

      const blobUrl = URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `imageFromBlog.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl); // Clean up memory
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  const createBlog = () => {
    setcreateBlog(!creaeBlog);
    setceateBlog();
    console.log("createBlog State:", ceateBlog); // Log the state change
  };

  const generateRandomNumber = () => Math.floor(Math.random() * (1000 - 500 + 1)) + 500;

  return (
    <div className="flex-1 flex flex-col overflow-auto p-6">
      <button className="bg-primary rounded-full absolute right-5 bottom-5 p-5" onClick={() => createBlog()}>
        <PenLine className="text-primary-content" />
      </button>

      {/* Display blogs in reverse order */}
      {blogs.length > 0 ? (
        <div className="flex flex-col items-center justify-center gap-5">
          {blogs.reverse().map((blog, index) => (
            <div
              className="card bg-base-100 h-[70vh] w-[40vw] shadow-xl"
              key={index}
              ref={index === 0 ? messagesEndRef : null} // Apply ref only to the first blog in reversed order
            >
              <figure>
                <img
                  src={`https://picsum.photos/${generateRandomNumber()}/${generateRandomNumber()}`}
                  alt="Shoes"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{blog.title}</h2>
                <p>{blog.text}</p>
                <div className="card-actions justify-end">
                  <button className="badge badge-outline hover:bg-primary-content p-4 flex justify-center items-center gap-2">
                    <ThumbsUp size={15} />
                    Like
                  </button>
                  <button className="badge badge-outline hover:bg-primary-content p-4 flex justify-center items-center gap-2">
                    <Eye size={15} /> Views:
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No blogs available.</p>
      )}
    </div>
  );
};

export default BlogContainer;
