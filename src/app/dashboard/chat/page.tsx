"use client";

import { useState } from "react";
import { Send, Users, MessageSquare, Hash, MoreVertical, Search } from "lucide-react";

export default function ChatPage() {
  const [selectedRoom, setSelectedRoom] = useState("general");
  const [message, setMessage] = useState("");

  // Mock chat data
  const rooms = [
    { id: "general", name: "General", type: "public", unread: 3 },
    { id: "ai-challenge", name: "AI Challenge", type: "hackathon", unread: 0 },
    { id: "team-innovators", name: "Team Innovators", type: "team", unread: 1 },
    { id: "organizers", name: "Organizers", type: "private", unread: 0 },
  ];

  const messages = [
    {
      id: 1,
      sender: "Alice Johnson",
      content: "Hey everyone! How's the hackathon going?",
      timestamp: "10:30 AM",
      avatar: "AJ",
    },
    {
      id: 2,
      sender: "Bob Smith",
      content: "Great! Just finished setting up our development environment. Anyone want to collaborate?",
      timestamp: "10:32 AM",
      avatar: "BS",
    },
    {
      id: 3,
      sender: "You",
      content: "I'm working on the frontend. Looking for a backend developer to join our team!",
      timestamp: "10:35 AM",
      avatar: "JD",
      isOwn: true,
    },
    {
      id: 4,
      sender: "Carol Davis",
      content: "I'm a backend developer! What tech stack are you using?",
      timestamp: "10:37 AM",
      avatar: "CD",
    },
    {
      id: 5,
      sender: "You",
      content: "We're using React + Node.js + MongoDB. Interested?",
      timestamp: "10:38 AM",
      avatar: "JD",
      isOwn: true,
    },
  ];

  const getRoomIcon = (type: string) => {
    switch (type) {
      case "public": return <Hash size={16} />;
      case "hackathon": return <MessageSquare size={16} />;
      case "team": return <Users size={16} />;
      case "private": return <MessageSquare size={16} />;
      default: return <Hash size={16} />;
    }
  };

  const getRoomColor = (type: string) => {
    switch (type) {
      case "public": return "text-[#00CFFF]";
      case "hackathon": return "text-[#00C853]";
      case "team": return "text-[#6A00FF]";
      case "private": return "text-[#A0A0A0]";
      default: return "text-[#A0A0A0]";
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  return (
    <div className="h-[calc(100vh-120px)] flex bg-[#0A0A0A]">
      {/* Sidebar */}
      <div className="w-80 bg-[#121212] border-r border-white/10 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-white/10">
          <h2 className="text-lg font-bold text-white">Chat Rooms</h2>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-white/10">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#A0A0A0]" size={16} />
            <input
              type="text"
              placeholder="Search rooms..."
              className="input-field w-full pl-10 pr-4 py-2 text-sm"
            />
          </div>
        </div>

        {/* Room List */}
        <div className="flex-1 overflow-y-auto">
          {rooms.map((room) => (
            <button
              key={room.id}
              onClick={() => setSelectedRoom(room.id)}
              className={`w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors ${
                selectedRoom === room.id ? 'bg-white/10' : ''
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={getRoomColor(room.type)}>
                  {getRoomIcon(room.type)}
                </div>
                <div className="text-left">
                  <p className="text-white font-medium">{room.name}</p>
                  <p className="text-xs text-[#A0A0A0] capitalize">{room.type}</p>
                </div>
              </div>
              {room.unread > 0 && (
                <span className="bg-[#00CFFF] text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                  {room.unread}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="bg-[#121212] border-b border-white/10 p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={getRoomColor(rooms.find(r => r.id === selectedRoom)?.type || "public")}>
              {getRoomIcon(rooms.find(r => r.id === selectedRoom)?.type || "public")}
            </div>
            <div>
              <h3 className="text-white font-semibold">
                {rooms.find(r => r.id === selectedRoom)?.name}
              </h3>
              <p className="text-xs text-[#A0A0A0]">
                {rooms.find(r => r.id === selectedRoom)?.type} room
              </p>
            </div>
          </div>
          <button className="text-[#A0A0A0] hover:text-white">
            <MoreVertical size={20} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex items-start space-x-3 max-w-[70%] ${msg.isOwn ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${
                  msg.isOwn 
                    ? 'bg-gradient-to-r from-[#1E3C72] to-[#00CFFF]' 
                    : 'bg-gradient-to-r from-[#6A00FF] to-[#00CFFF]'
                }`}>
                  {msg.avatar}
                </div>
                <div className={`${msg.isOwn ? 'text-right' : 'text-left'}`}>
                  <div className={`inline-block p-3 rounded-lg ${
                    msg.isOwn 
                      ? 'bg-gradient-to-r from-[#1E3C72] to-[#00CFFF] text-white' 
                      : 'bg-[#1A1A1A] text-[#C7C7C7]'
                  }`}>
                    <p className="text-sm">{msg.content}</p>
                  </div>
                  <p className="text-xs text-[#A0A0A0] mt-1">{msg.timestamp}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="bg-[#121212] border-t border-white/10 p-4">
          <form onSubmit={handleSendMessage} className="flex space-x-3">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="input-field flex-1 px-4 py-3"
            />
            <button
              type="submit"
              disabled={!message.trim()}
              className="btn-primary px-6 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
} 