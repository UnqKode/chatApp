import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client"

const BASE_URL = "http://localhost:5001"

export const useAuthStore = create((set,get)=>({
    authUser:null,
    isSigningUP: false,
    isLoggingIn : false,
    isUpdatingProfile:false,
    isCheckingAuth:true,
    onlineUsers: [],
    socket:null,
    
    checkAuth:async()=>{
        try {
            const res = await axiosInstance.get("/auth/check")
            
            const socket = get().socket;
            set({authUser : res.data})
            if (!socket) {
                get().connectSocket()
                console.log("User Connected Succesfully");
            } 

        } catch (error) {
            console.log("Error in checkAuth: ",error);
            set({authUser:null})
        }finally{
            set({isCheckingAuth:false})
        }
    },
    
    signup: async(data)=>{
        set({isSigningUP:true});
        try {
            const res = await axiosInstance.post("/auth/signup",data)
            set({authUser : res.data})
            toast.success("Account created Successfully")
            get().connectSocket()
        } catch (error) {
            toast.error(error.response.data.message)
        } finally{
            set({isSigningUP:false})
        }
    },
    login: async(data)=>{
        set({isLoggingIn:true});
        try {
            const res = await axiosInstance.post("/auth/login",data)
            set({authUser : res.data})
            toast.success("Loged In Successfully")
            get().connectSocket()

        } catch (error) {
            const errorMessage = error.response?.data?.message || "Something went wrong. Please try again.";
            toast.error(errorMessage);
        } finally{
            set({isLoggingIn:false})
        }
    },

    logout: async()=>{
        try {
            console.log("loggin out");
            
            await axiosInstance.post("auth/logout");
            set({authUser:null})
            toast.success("Logged out Successfully")
            get().disconnectSocket()
        } catch (error) {
            toast.error(error.response.data.message)
        }
    },

    updateProfile: async(data)=>{
        set({isUpdatingProfile:true})
        try {
            const res = await axiosInstance.put("auth/update-profile",data)
            set({authUser: res.data})
            toast.success("Profile Updated Successfully")
        } catch (error) {
            console.log("Error in Update Profile:",error);
            toast.error(error.response.data.message)
        }finally{
            set({isUpdatingProfile:false})
        }
    },

    connectSocket :async()=>{
        const {authUser} = get()
        if(!authUser || get().socket?.connected) return
        const socket=io(BASE_URL,{
            query:{
                userId: authUser._id
            },
        })
        socket.connect()
        
        set({socket:socket})
        socket.on("getOnlineUser", (userIds)=>{
            set({onlineUsers:userIds})
        })
    },
    
    disconnectSocket: () => {
        const socket = get().socket;
        if (socket && socket.connected) {
            socket.disconnect();
            console.log("Socket disconnected successfully.");
        } 
    },
    
}))