import { X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useBlogStore } from "../store/useBlogStore";
import { motion } from "framer-motion";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [categories, setCategories] = useState([]);
  const [description, setDescription] = useState("");
  const [createBlog, setCreateBlog] = useState(true);

  const fileInputRef = useRef(null);
  const { sendBlog, ceateBlog, setceateBlog } = useBlogStore();

  useEffect(() => {
    setCreateBlog(ceateBlog);
  }, [ceateBlog]);

  // Handle category selection
  const handleCategoryChange = (e) => {
    const category = e.target.id;
    setCategories((prevCategories) =>
      e.target.checked
        ? [...prevCategories, category]
        : prevCategories.filter((item) => item !== category)
    );
  };

  // Handle image upload and preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !description)
      return toast.error("Title or Description is Missing");

    try {
      await sendBlog({
        title: title.trim(),
        text: description.trim(),
        categories: categories,
        image: imagePreview, // Assuming it's a base64 string or URL
      });

      if (fileInputRef.current) fileInputRef.current.value = "";

      // Reset form after submission
      setTitle("");
      setImagePreview(null);
      setCategories([]);
      setDescription("");
    } catch (error) {
      console.error(error);
    }
  };

  const toggleCreateBlog = () => {
    setCreateBlog(!createBlog);
  };

  return (
    <motion.aside
      initial={{ opacity: 0, x: -1 }}
      animate={{ opacity: createBlog ? 1 : 0, x: createBlog ? 0 : -1 }}
      transition={{ duration: 0.5 }}
      className={`absolute z-50 bg-primary-content mb-4 w-[90vw] lg:max-w-96 border-r border-base-300 flex-col duration-200 p-5 ${
        createBlog ? "flex" : "hidden"
      }`}
    >
      <X size={32} onClick={toggleCreateBlog} className="cursor-pointer" />

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Title Label */}
        <label
          htmlFor="title"
          className="text-primary font-semibold text-2xl flex items-center justify-center"
        >
          Create Blog
        </label>

        {/* Title Input */}
        <input
          type="text"
          id="title"
          placeholder="Enter the blog title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-4 mt-3 border-b border-base-300 focus:outline-none focus:ring-2 focus:ring-primary rounded-lg text-lg"
        />

        {/* Category Selection */}
        <div className="flex flex-col gap-2">
          <label className="text-base-content font-bold">Select Categories</label>

          {["tech", "health", "lifestyle", "education"].map((cat) => (
            <div key={cat} className="flex items-center gap-3">
              <input
                type="checkbox"
                id={cat}
                className="checkbox checkbox-sm"
                onChange={handleCategoryChange}
              />
              <label htmlFor={cat} className="text-sm capitalize">
                {cat}
              </label>
            </div>
          ))}
        </div>

        {/* Image Input */}
        <div className="flex gap-5">

        <input
          type="file"
          accept="image/*"
          className="file-input file-input-bordered file-input-primary w-full"
          onChange={handleImageChange}
          ref={fileInputRef}
        />

        {/* Image Preview */}
        {imagePreview && (
          <div className="mt-3">
            <img src={imagePreview} alt="Image Preview" className="w-auto h-10 object-cover rounded-lg " />
          </div>
        )}

        </ div>
        {/* Description Textarea */}
        <textarea
          id="description"
          placeholder="Write your description here"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full h-[20vh] p-4 mt-3 border-b border-base-300 focus:outline-none focus:ring-2 focus:ring-primary rounded-lg text-lg"
        ></textarea>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary w-full">
          Submit
        </button>
      </form>
    </motion.aside>
  );
};

export default CreateBlog;
