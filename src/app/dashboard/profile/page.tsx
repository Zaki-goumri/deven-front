"use client";

import { useState } from "react";
import { User, Mail, MapPin, Calendar, Github, Linkedin, Globe, Edit, Save, X, Bell, Shield, Palette, Download } from "lucide-react";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");

  // Mock user data
  const user = {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    username: "johndoe",
    location: "Algiers, Algeria",
    birthday: "1998-05-15",
    aboutMe: "Passionate software developer with expertise in React, Node.js, and AI. Love participating in hackathons and building innovative solutions.",
    skills: ["React", "Node.js", "Python", "Machine Learning", "TypeScript", "MongoDB"],
    github: "https://github.com/johndoe",
    linkedin: "https://linkedin.com/in/johndoe",
    website: "https://johndoe.dev",
    avatar: "JD",
    joinDate: "2023-01-15",
    hackathonsParticipated: 12,
    projectsSubmitted: 8,
    totalPoints: 1250,
  };

  const recentActivity = [
    {
      id: 1,
      type: "hackathon_joined",
      title: "Joined AI Innovation Challenge",
      description: "You joined the AI Innovation Challenge hackathon",
      date: "2024-01-15",
      icon: "🎯",
    },
    {
      id: 2,
      type: "project_submitted",
      title: "Submitted EcoTracker Project",
      description: "Your team submitted the EcoTracker project for Web Development Sprint",
      date: "2024-01-10",
      icon: "🚀",
    },
    {
      id: 3,
      type: "team_joined",
      title: "Joined Team Innovators",
      description: "You became a member of Team Innovators",
      date: "2024-01-05",
      icon: "👥",
    },
    {
      id: 4,
      type: "achievement",
      title: "First Place Winner",
      description: "Your team won first place in the Mobile App Contest",
      date: "2023-12-20",
      icon: "🏆",
    },
  ];

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "settings", label: "Settings", icon: Shield },
    { id: "activity", label: "Activity", icon: Bell },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Profile</h1>
        <p className="text-[#A0A0A0] mt-2">Manage your account and preferences</p>
      </div>

      {/* Profile Header */}
      <div className="card p-8">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
          <div className="flex items-start space-x-6">
            <div className="w-24 h-24 bg-gradient-to-r from-[#1E3C72] to-[#00CFFF] rounded-full flex items-center justify-center">
              <span className="text-white text-2xl font-bold">{user.avatar}</span>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h2 className="text-2xl font-bold text-white">
                  {user.firstName} {user.lastName}
                </h2>
                <span className="px-2 py-1 bg-[#00C853]/20 text-[#00C853] text-xs rounded-full">
                  Verified
                </span>
              </div>
              
              <p className="text-[#A0A0A0] mb-4">@{user.username}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center space-x-2">
                  <Calendar size={16} className="text-[#A0A0A0]" />
                  <span className="text-sm text-[#C7C7C7]">Joined {user.joinDate}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin size={16} className="text-[#A0A0A0]" />
                  <span className="text-sm text-[#C7C7C7]">{user.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail size={16} className="text-[#A0A0A0]" />
                  <span className="text-sm text-[#C7C7C7]">{user.email}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-3 bg-[#1A1A1A] rounded-lg">
                  <div className="text-2xl font-bold text-white">{user.hackathonsParticipated}</div>
                  <div className="text-xs text-[#A0A0A0]">Hackathons</div>
                </div>
                <div className="text-center p-3 bg-[#1A1A1A] rounded-lg">
                  <div className="text-2xl font-bold text-white">{user.projectsSubmitted}</div>
                  <div className="text-xs text-[#A0A0A0]">Projects</div>
                </div>
                <div className="text-center p-3 bg-[#1A1A1A] rounded-lg">
                  <div className="text-2xl font-bold text-white">{user.totalPoints}</div>
                  <div className="text-xs text-[#A0A0A0]">Points</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 lg:mt-0">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="btn-secondary flex items-center space-x-2"
            >
              {isEditing ? <X size={16} /> : <Edit size={16} />}
              <span>{isEditing ? "Cancel" : "Edit Profile"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="card p-6">
        <div className="flex space-x-1 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-[#1E3C72] to-[#00CFFF] text-white'
                  : 'text-[#C7C7C7] hover:bg-white/5 hover:text-white'
              }`}
            >
              <tab.icon size={16} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "profile" && (
          <div className="space-y-6">
            {/* About Me */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">About Me</h3>
              {isEditing ? (
                <textarea
                  className="input-field w-full px-4 py-3"
                  rows={4}
                  defaultValue={user.aboutMe}
                />
              ) : (
                <p className="text-[#C7C7C7]">{user.aboutMe}</p>
              )}
            </div>

            {/* Skills */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {user.skills.map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-[#1A1A1A] text-[#00CFFF] text-sm rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Social Links</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Github size={20} className="text-[#A0A0A0]" />
                  <a href={user.github} className="text-[#00CFFF] hover:underline" target="_blank" rel="noopener noreferrer">
                    {user.github}
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Linkedin size={20} className="text-[#A0A0A0]" />
                  <a href={user.linkedin} className="text-[#00CFFF] hover:underline" target="_blank" rel="noopener noreferrer">
                    {user.linkedin}
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Globe size={20} className="text-[#A0A0A0]" />
                  <a href={user.website} className="text-[#00CFFF] hover:underline" target="_blank" rel="noopener noreferrer">
                    {user.website}
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="space-y-6">
            {/* Account Settings */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Account Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-[#1A1A1A] rounded-lg">
                  <div>
                    <h4 className="font-medium text-white">Email Notifications</h4>
                    <p className="text-sm text-[#A0A0A0]">Receive email updates about hackathons</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-[#A0A0A0] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00CFFF]"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-[#1A1A1A] rounded-lg">
                  <div>
                    <h4 className="font-medium text-white">Push Notifications</h4>
                    <p className="text-sm text-[#A0A0A0]">Get notified about new hackathons</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-[#A0A0A0] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00CFFF]"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-[#1A1A1A] rounded-lg">
                  <div>
                    <h4 className="font-medium text-white">Public Profile</h4>
                    <p className="text-sm text-[#A0A0A0]">Allow others to see your profile</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-[#A0A0A0] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00CFFF]"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Data Export */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Data & Privacy</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-4 bg-[#1A1A1A] rounded-lg hover:bg-[#2A2A2A] transition-colors">
                  <div>
                    <h4 className="font-medium text-white">Export My Data</h4>
                    <p className="text-sm text-[#A0A0A0]">Download all your data in JSON format</p>
                  </div>
                  <Download size={20} className="text-[#A0A0A0]" />
                </button>

                <button className="w-full flex items-center justify-between p-4 bg-[#1A1A1A] rounded-lg hover:bg-[#2A2A2A] transition-colors">
                  <div>
                    <h4 className="font-medium text-white">Delete Account</h4>
                    <p className="text-sm text-[#A0A0A0]">Permanently delete your account and data</p>
                  </div>
                  <span className="text-[#FF3B30] text-sm">Delete</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "activity" && (
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-4 p-4 bg-[#1A1A1A] rounded-lg">
                  <div className="text-2xl">{activity.icon}</div>
                  <div className="flex-1">
                    <h4 className="font-medium text-white">{activity.title}</h4>
                    <p className="text-sm text-[#A0A0A0]">{activity.description}</p>
                    <p className="text-xs text-[#A0A0A0] mt-1">{activity.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Save Button for Edit Mode */}
      {isEditing && (
        <div className="flex justify-end">
          <button className="btn-primary flex items-center space-x-2">
            <Save size={16} />
            <span>Save Changes</span>
          </button>
        </div>
      )}
    </div>
  );
} 