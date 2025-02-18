import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import avatar from "/avatar.png"
import { Camera, Mail, User } from 'lucide-react'

const ProfilePage = () => {

  const {authUser,isUpdatingProfile,updateProfile} = useAuthStore()
  const [selectedImage , setSelectedImage ] = useState(null)


  const handleImageUpdate = async(e)=>{
    
    const file = e.target.files[0];
    if(!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file)
    reader.onload = async ()=>{
      const base64Image = reader.result;
      setSelectedImage(base64Image)
      await updateProfile({profilePic : base64Image})
    }

  }

  return (
    
    <div className='h-screen pt-20'>
      <div className='max-w-2xl mx-auto p-4 space-y-8'>
        <div className='bg-base-300 rounded-xl p-6 space-y-8'>
          <div className='text-center'>
            <h1 className='text-2xl font-semibold'>Profile</h1>
            <p className='mt-2'>Your profile information</p>
          </div>

          <div className='flex flex-col items-center gap-4'>
            <div className='relative'>
              <img src={selectedImage ||authUser.profilePic || avatar} alt="profile" className='size-32 rounded-full object-cover border-4'/>
              <label htmlFor='avatar-upload' className={`absolute bottom-0 right-0 bg-base-content hover:scale-105 p-2 rounded-full cursor-pointer transition-all duration-200 ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}`}>
                <Camera className='size-5 text-base-200' />
                <input type='file' id='avatar-upload' className='hidden' accept='image/*' onChange={handleImageUpdate} disabled={isUpdatingProfile}/>
              </label>
            </div>  
            <p className='text-sm text-primary-content'>
              {isUpdatingProfile ? "Uploading" : "Click on camera icon to update your photo"}
            </p>
          </div>

          <div className='space-y-6'>
            <div className='space-y-1.5'>
              <div className='text-sm text-primary-content flex items-center gap-2'>
                <User className="size-4" />
                Full Name
              </div>
              <p className='px-4 py-2.5 bg-base-200 rounded-lg border'>{authUser?.fullName}</p>
            </div>

            <div className='space-y-1.5'>
              <div className='text-sm text-primary-content flex items-center gap-2'>
                <Mail className="size-4" />
                Email Address
              </div>
              <p className='px-3 py-2.5 bg-base-200 rounded-lg border'>{authUser?.email}</p>
            </div>
          </div>

          <div className='mt-6 bg-base-300 rouded-xl p-5'>
          <h2 className='text-lg font-medium mb-4'>Account Information</h2>
          <div className='space-y-3 text-sm'>
            <div className='flex items-center justify-between py-2 border-b border-zinc-700'>
              <span>Member since</span>
              <span>{authUser.createdAt?.split("T")[0]}</span>
            </div>
            <div className='flex item-center justify-between py-1'>
              <span>Account Status</span>
              <span className='text-primary  bg-primary-content rounded p-1'>Active</span>
            </div>
          </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ProfilePage