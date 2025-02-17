import React, { use, useEffect, useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore.js";
import ChatHeader from "./ChatHeader.jsx";
import MessageInput from "./MessageInput.jsx";
import MessageSkeleton from "./skeleton/MessageSkeleton.jsx";
import { useAuthStore } from "../store/useAuthStore.js";
import { formatMessageTime } from "../lib/utils.js";
import { X } from "lucide-react";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  4;
  const { authUser } = useAuthStore();
  const messagesEndRef = useRef(null);
  const [OpenImage, setOpenImage] = useState(null);
  const [showImage, setshowImage] = useState(false);

  useEffect(() => {
    if (selectedUser?._id) {
      // Ensure selectedUser exists before calling getMessages
      getMessages(selectedUser._id);
      subscribeToMessages();

      return () => unsubscribeFromMessages();
    }
  }, [
    selectedUser?._id,
    getMessages,
    subscribeToMessages,
    unsubscribeFromMessages,
  ]);

  useEffect(() => {
    if (messagesEndRef.current && messages) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading)
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );

  const openImage = (src) => {
    setshowImage(true);
    setOpenImage(src);
  };

  const toggleImageModal = () => {
    setshowImage(!showImage); // Toggle the visibility of the modal
  };

  

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />
      <div
        className={`bg-primary h-[80vh] w-3/5 z-10 m-5 absolute left-1/4 rounded-3xl p-4 transition-opacity duration-500 ${
          !showImage ? "opacity-0 pointer-events-none" : " opacity-100"
        }`}
      >
        <button onClick={toggleImageModal}>
          <X size={32} />
        </button>
        <div className="flex justify-center items-center h-full">
          <img
            src={OpenImage}
            className="h-auto w-2/3 max-w-[30vw] object-cover"
          />
        </div>
      </div>
      <div className="flex flex-col overflow-y-auto p-4 space-y-4">
        {messages.map((messages) => (
          <div
            key={messages._id}
            className={`chat ${
              messages.senderId === authUser._id ? "chat-end" : "chat-start"
            }`}
            ref={messagesEndRef}
          >
            <div className="chat-image avatar">
              <div className="size-10 rounded-full border ">
                <img
                  src={
                    messages.senderId === authUser._id
                      ? authUser.profilePic || "/avatar.png"
                      : selectedUser.profilePic || "/avatr.png"
                  }
                  alt="profile-pic"
                />
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {formatMessageTime(messages.createdAt)}
              </time>
            </div>
            <div className="chat-bubble flex flex-col">
              {messages.image && (
                <img
                  src={messages.image}
                  className="sm:max-w-[200px] rounded-md mb-2"
                  onClick={(e) => {
                    openImage(e.target.src);
                  }}
                />
              )}
              {messages.text && <p>{`${messages.text}`}</p>}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-auto">
        <MessageInput />
      </div>
    </div>
  );
};

export default ChatContainer;
