import React from 'react'
import { useChatStore } from '../store/useChatStore'
import NoChatSelected from '../components/NoChatSelected'
import Sidebar from '../components/SideBar'
import ChatContainer from '../components/ChatContainer'
import { motion } from 'framer-motion'

function HomePage() {

  const {selectedUser} = useChatStore()

  return (
    <div className='h-screen bg-base-200'>
      <motion.div initial={{ scale: 0  }} animate={{ scale: 1 }} transition={{ duration: 0.3, ease: "easeOut" }} className='flex items-center justify-center pt-20 px-4'>
        <div className='bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]'>
          <div className='flex h-full rounded-lg overflow-hidden'>
            <Sidebar />
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
        </div>
      </div>
          </motion.div>
    </div>
  )
}

export default HomePage