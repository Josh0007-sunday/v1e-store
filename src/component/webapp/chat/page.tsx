"use client";
import React, { useState, useEffect } from 'react';
import { PublicKey } from "@solana/web3.js";

interface ChatProps {
  adId: string;
  buyer: PublicKey;
  seller: PublicKey;
  currentUser: PublicKey;
  onClose: () => void;
}

interface Message {
  sender: string;
  content: string;
  timestamp: number;
}

const Chat: React.FC<ChatProps> = ({ adId, buyer,  currentUser, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(`/api/chat?adId=${adId}`);
        const data = await response.json();
        setMessages(data.messages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [adId]);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    const message = {
      sender: currentUser.toString(),
      content: newMessage,
      timestamp: Date.now(),
    };

    try {
      await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          adId,
          sender: message.sender,
          content: message.content,
        }),
      });

      setMessages((prevMessages) => [...prevMessages, message]);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg text-black font-semibold">Chat</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          Close
        </button>
      </div>
      <div className="flex-grow overflow-y-auto mb-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-2 p-2 rounded ${
              message.sender === currentUser.toString() ? "bg-blue-100 text-right" : "bg-gray-100"
            }`}
          >
            <p className='text-black'>{message.content}</p>
            <small className="text-gray-500">
              {message.sender === buyer.toString() ? "Buyer" : "Seller"} -{" "}
              {new Date(message.timestamp).toLocaleTimeString()}
            </small>
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-grow text-black border rounded-l-lg p-2"
          placeholder="Type your message..."
        />
        <button onClick={sendMessage} className="bg-blue-500 text-white px-4 py-2 rounded-r-lg">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
