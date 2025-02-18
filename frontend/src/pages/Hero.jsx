import React from "react";
import { motion } from "framer-motion";

function HomePage() {
  return (
    <div className="h-screen bg-base-200 pt-16">
      <div className="flex flex-col justify-center items-center h-full font-bold text-9xl gap-5">
        <motion.div
          initial={{ y: "200%", opacity: 0 }}
          animate={{ y: 0, opacity: 100 }}
          transition={{ duration: 1, ease: "easeOut" }}
         className="font-bold text-6xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl"

        >
          Chat.io
        </motion.div>
        <motion.div
          initial={{ y: "600%", opacity: 0 }}
          animate={{ y: 0, opacity: 100 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className=" font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl "
        >
          Simple, Instant, Seamless Messaging
        </motion.div>
        <motion.div
          initial={{ y: "600%", opacity: 0 }}
          animate={{ y: 0, opacity: 100 }}
          transition={{ duration: 1, ease: "easeOut" ,delay:8}}
          className=" font-bold text-2xl hidden pt-10 lg:block"
        >
          Even Jedi talk here
        </motion.div>
        <motion.div
          initial={{ y: "600%", opacity: 0 }}
          animate={{ y: 0, opacity: 100 }}
          transition={{ duration: 1, ease: "easeOut" ,delay:9}}
          className=" font-bold text-2xl hidden lg:block"
        >
          Where are you?
        </motion.div>
      </div>

      <div className="absolute left-0 top-0 w-full pt-28 px-5 hidden lg:block">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="chat chat-start"
        >
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img alt="Avatar" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
          <div className="chat-header">Obi-Wan Kenobi<time className="text-xs opacity-50">12:45</time></div>
          <div className="chat-bubble">You were the Chosen One!</div>
          <div className="chat-footer opacity-50">Delivered</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="chat chat-end"
        >
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img alt="Avatar" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
          <div className="chat-header">Anakin<time className="text-xs opacity-50">12:46</time></div>
          <div className="chat-bubble">I hate you!</div>
          <div className="chat-footer opacity-50">Seen at 12:46</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 3 }}
          className="chat chat-start"
        >
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img alt="Avatar" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
          <div className="chat-header">Obi-Wan Kenobi<time className="text-xs opacity-50">12:47</time></div>
          <div className="chat-bubble">You were my brother, Anakin!</div>
          <div className="chat-footer opacity-50">Delivered</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 4 }}
          className="chat chat-end"
        >
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img alt="Avatar" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
          <div className="chat-header">Anakin<time className="text-xs opacity-50">12:48</time></div>
          <div className="chat-bubble">I am sorry, Obi-Wan. I am lost.</div>
          <div className="chat-footer opacity-50">Seen at 12:48</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 5 }}
          className="chat chat-start"
        >
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img alt="Avatar" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
          <div className="chat-header">Obi-Wan Kenobi<time className="text-xs opacity-50">12:49</time></div>
          <div className="chat-bubble">There is still hope for you, Anakin.</div>
          <div className="chat-footer opacity-50">Delivered</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 6 }}
          className="chat chat-end"
        >
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img alt="Avatar" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
          <div className="chat-header">Anakin<time className="text-xs opacity-50">12:50</time></div>
          <div className="chat-bubble">I will try, Obi-Wan. I will try...</div>
          <div className="chat-footer opacity-50">Seen at 12:50</div>
        </motion.div>
      </div>
    </div>
  );
}

export default HomePage;
