import { X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useBlogStore } from "../store/useBlogStore";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [categories, setCategories] = useState([]);
  const [description, setDescription] = useState("");
  const [creaeBlog , setcreateBlog] = useState(true)


  
  const fileInputRef = useRef(null)
  const { sendBlog , ceateBlog , setceateBlog} = useBlogStore();
  
  useEffect(() => {
    setcreateBlog(ceateBlog)
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
    
    // Log or submit form data
    console.log({
      title,
      text : description,
      categories,
      imagePreview,
    });

    // Reset form after submission
    setTitle("");
    setImagePreview(null);
    setCategories([]);
    setDescription("");
    if(!title.trim() || !description) return toast.error("Title or Description is Missing")
    try {
        await sendBlog({
            title: title.trim(),
            text: description.trim(),
            categories: categories, 
            image: imagePreview, // Assuming it's a base64 string or URL
        });
        if(fileInputRef.current) fileInputRef.current.value=""
          
    } catch (error) {
        
    }
  };

  const createBlog = ()=>{
    setcreateBlog(!creaeBlog)
    console.log(ceateBlog);
    
  }

  return (
    <aside className={`h-full w-[90vw] max-w-lg lg:w-72 border-r border-base-300 flex-col duration-200 p-5 transition-all ${creaeBlog ? "fles"  : "hidden"} `}>
        < X size={32}  onClick={()=>createBlog()} />
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

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="tech"
              className="checkbox checkbox-sm"
              onChange={handleCategoryChange}
            />
            <label htmlFor="tech" className="text-sm">
              Tech
            </label>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="health"
              className="checkbox checkbox-sm"
              onChange={handleCategoryChange}
            />
            <label htmlFor="health" className="text-sm">
              Health
            </label>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="lifestyle"
              className="checkbox checkbox-sm"
              onChange={handleCategoryChange}
            />
            <label htmlFor="lifestyle" className="text-sm">
              Lifestyle
            </label>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="education"
              className="checkbox checkbox-sm"
              onChange={handleCategoryChange}
            />
            <label htmlFor="education" className="text-sm">
              Education
            </label>
          </div>
        </div>

        {/* Image Input */}
        <input
          type="file"
          accept="image/*"
          className="file-input file-input-bordered file-input-primary w-full"
          onChange={handleImageChange}
        />

        {/* Image Preview */}
        {imagePreview && (
          <div className="mt-3">
            <img src={imagePreview} alt="Image Preview" className="w-full h-40 object-cover rounded-lg" />
          </div>
        )}

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
    </aside>
  );
};

export default CreateBlog;
