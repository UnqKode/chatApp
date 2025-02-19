import React, { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X } from "lucide-react";
import axios from "axios";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage, autoCorrect, setAutoCorrect } = useChatStore();
  const [correctedText, setCorrectedText] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file || !file.type.startsWith("image/")) {
      return toast.error("Please select an Image");
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      let sendingText = text.trim();
      setText(""); // Clear input immediately for better UI

      // Correct the text using LanguageTool API if autoCorrect is enabled
      if (autoCorrect) {
        const response = await axios.post(
          "https://api.languagetool.org/v2/check",
          new URLSearchParams({ text: sendingText, language: "en-US" })
        );

        let corrected = sendingText;
        let offsetDiff = 0; // Track character shifts due to replacements

        response.data.matches.forEach((match) => {
          if (match.replacements.length > 0) {
            const incorrectSegment = corrected.substring(
              match.offset + offsetDiff,
              match.offset + offsetDiff + match.length
            );
            const replacement = match.replacements[0].value;

            // Replace incorrect word with suggestion
            corrected =
              corrected.substring(0, match.offset + offsetDiff) +
              replacement +
              corrected.substring(match.offset + offsetDiff + match.length);

            // Adjust offset difference due to length change
            offsetDiff += replacement.length - match.length;
          }
        });

        sendingText = corrected; // Assign corrected text
      }

      setCorrectedText(sendingText);

      const sendingImage = imagePreview;
      setImagePreview(null);

      // Send the corrected text instead of the original
      await sendMessage({
        text: sendingText,
        Image: sendingImage,
      });

      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="p-4 w-full">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="size-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 size-5 rounded-full bg-base-300 flex items-center justify-center"
              type="button"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}

      <form className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            className="w-full input input-bordered rounded-lg input-sm sm:input-md"
            placeholder="Type a Message"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />
          <button
            type="button"
            className={`hidden sm:flex btn btn-circle ${
              imagePreview ? "text-emerald-500" : "text-zinc-400"
            }`}
            onClick={() => fileInputRef.current?.click()}
          >
            <Image size={20} />
          </button>
        </div>
        <button
          type="submit"
          className="btn btn-circle"
          disabled={!text.trim() && !imagePreview}
          onClick={handleSendMessage}
        >
          <Send size={22} />
        </button>
      </form>

      
    </div>
  );
};

export default MessageInput;
