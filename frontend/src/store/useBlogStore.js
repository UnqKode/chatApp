import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import axios from "axios";
import { useAuthStore } from "./useAuthStore";

export const useBlogStore = create((set, get) => ({
    blogs: [],
    isBlogLoading: false,
    ceateBlog:false,
    getBlogs: async () => {
        set({ isBlogLoading: true });
        try {
            const res = await axiosInstance.get(`/blog/getBlog`);
            set({ blogs: res.data });
        } catch (error) {
            toast.error(error.response?.data?.message || "Error fetching blogs");
        } finally {
            set({ isBlogLoading: false });
        }
    },

    setceateBlog:()=>{
        const {ceateBlog} = get()
        set({ceateBlog:!ceateBlog})
    },

    sendBlog: async (messageData) => {
        const { blogs } = get();
        try {
            console.log("masnassssss");
            const res = await axiosInstance.post(`/blog/send`, messageData); // Corrected URL
            set({ blogs: [...blogs, res.data] }); // Updating 'blogs' instead of 'messages'
            toast.success("Blog Posted");
        } catch (error) {
            toast.error(error.response?.data?.message || "Error posting blog");
        }
    },

    subscribeToBlog: () => {
        const socket = useAuthStore.getState().socket;
        socket.on("newBlog", (newBlog) => {
            if (newBlog) {
                set({
                    blogs: [...get().blogs, newBlog],
                });
            }
        });
    },

    unsubscribeFromBlog: () => {
        const socket = useAuthStore.getState().socket;
        socket.off("newBlog");
    },
}));
