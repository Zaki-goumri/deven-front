"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, 
  Calendar, 
  Users, 
  Trophy, 
  MessageSquare, 
  Settings, 
  Bell,
  Search,
  User,
  Compass,
  BarChart3,
  ChevronDown,
  LogOut,
  Sparkles,
  Building
} from "lucide-react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const navigation = [
  { name: "Feed", href: "/dashboard", icon: Compass },
  { name: "Hackathons", href: "/dashboard/hackathons", icon: Calendar },
  { name: "Clubs", href: "/dashboard/clubs", icon: Users },
  { name: "Projects", href: "/dashboard/projects", icon: Trophy },
  { name: "Chat", href: "/dashboard/chat", icon: MessageSquare },
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Close profile menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setProfileMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#6A00FF] rounded-full blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#00CFFF] rounded-full blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#1E3C72] rounded-full blur-3xl opacity-5 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#121212]/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Navigation */}
            <div className="flex items-center space-x-8">
              {/* Logo */}
              <Link href="/dashboard" className="flex items-center space-x-2 group">
                <div className="relative">
                  <div className="w-8 h-8 bg-gradient-to-r from-[#1E3C72] to-[#00CFFF] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white font-bold text-sm">D</span>
                  </div>
                  <div className="absolute inset-0 w-8 h-8 bg-gradient-to-r from-[#6A00FF] to-[#00CFFF] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                </div>
                <span className="text-xl font-bold text-white group-hover:text-[#00CFFF] transition-colors">
                  Deven
                </span>
                <Sparkles size={16} className="text-[#00CFFF] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>

              {/* Navigation Links */}
              <div className="hidden md:flex items-center space-x-1">
                {navigation.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`
                        flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 relative group overflow-hidden
                        ${isActive 
                          ? 'text-white bg-gradient-to-r from-[#1E3C72]/20 to-[#00CFFF]/20' 
                          : 'text-[#C7C7C7] hover:text-white hover:bg-white/5'
                        }
                      `}
                    >
                      <div className="relative">
                        <item.icon size={16} className="group-hover:scale-110 transition-transform duration-300" />
                        {isActive && (
                          <div className="absolute inset-0 bg-[#00CFFF] rounded-full opacity-20 animate-ping"></div>
                        )}
                      </div>
                      <span>{item.name}</span>
                      {isActive && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#1E3C72] to-[#00CFFF] rounded-full"></div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-r from-[#1E3C72]/0 to-[#00CFFF]/0 group-hover:from-[#1E3C72]/5 group-hover:to-[#00CFFF]/5 transition-all duration-300"></div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Search and Actions */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className={`relative transition-all duration-300 ${searchFocused ? 'w-80' : 'w-64'}`}>
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#A0A0A0]" size={18} />
                <input
                  type="text"
                  placeholder="Search hackathons, clubs, events..."
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  className="w-full pl-10 pr-4 py-2 bg-[#1A1A1A]/50 border border-white/10 rounded-lg text-white placeholder-[#A0A0A0] focus:outline-none focus:ring-2 focus:ring-[#00CFFF]/50 focus:border-[#00CFFF]/50 transition-all duration-300 backdrop-blur-sm"
                />
                {searchFocused && (
                  <div className="absolute inset-0 bg-gradient-to-r from-[#1E3C72]/20 to-[#00CFFF]/20 rounded-lg opacity-0 animate-pulse"></div>
                )}
              </div>

              {/* Notifications */}
              <button className="relative p-2 text-[#C7C7C7] hover:text-white transition-colors group">
                <Bell size={20} className="group-hover:scale-110 transition-transform duration-300" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#00C853] rounded-full animate-pulse"></span>
                <div className="absolute inset-0 bg-[#00CFFF]/0 group-hover:bg-[#00CFFF]/10 rounded-lg transition-colors duration-300"></div>
              </button>

              {/* Profile Menu */}
              <div className="relative" ref={profileMenuRef}>
                <button
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-white/5 transition-colors group"
                >
                  <div className="relative">
                    <div className="w-8 h-8 bg-gradient-to-r from-[#1E3C72] to-[#00CFFF] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <User size={16} className="text-white" />
                    </div>
                    <div className="absolute inset-0 w-8 h-8 bg-gradient-to-r from-[#6A00FF] to-[#00CFFF] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-medium text-white">John Doe</p>
                    <p className="text-xs text-[#A0A0A0]">john@example.com</p>
                  </div>
                  <ChevronDown 
                    size={16} 
                    className={`text-[#A0A0A0] transition-transform duration-300 ${profileMenuOpen ? 'rotate-180' : ''}`} 
                  />
                </button>

                {/* Profile Dropdown */}
                {profileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-[#121212]/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl animate-in slide-in-from-top-2 duration-200">
                    <div className="p-2">
                      <Link
                        href="/dashboard/my-dashboard"
                        onClick={() => setProfileMenuOpen(false)}
                        className="flex items-center space-x-3 px-3 py-2 rounded-lg text-[#C7C7C7] hover:text-white hover:bg-white/5 transition-colors group"
                      >
                        <BarChart3 size={18} className="group-hover:scale-110 transition-transform duration-300" />
                        <span>Dashboard</span>
                      </Link>
                      <Link
                        href="/dashboard/profile"
                        onClick={() => setProfileMenuOpen(false)}
                        className="flex items-center space-x-3 px-3 py-2 rounded-lg text-[#C7C7C7] hover:text-white hover:bg-white/5 transition-colors group"
                      >
                        <User size={18} className="group-hover:scale-110 transition-transform duration-300" />
                        <span>Profile</span>
                      </Link>
                      <Link
                        href="/dashboard/my-clubs"
                        onClick={() => setProfileMenuOpen(false)}
                        className="flex items-center space-x-3 px-3 py-2 rounded-lg text-[#C7C7C7] hover:text-white hover:bg-white/5 transition-colors group"
                      >
                        <Building size={18} className="group-hover:scale-110 transition-transform duration-300" />
                        <span>My Clubs</span>
                      </Link>
                      <Link
                        href="/dashboard/profile"
                        onClick={() => setProfileMenuOpen(false)}
                        className="flex items-center space-x-3 px-3 py-2 rounded-lg text-[#C7C7C7] hover:text-white hover:bg-white/5 transition-colors group"
                      >
                        <Settings size={18} className="group-hover:scale-110 transition-transform duration-300" />
                        <span>Settings</span>
                      </Link>
                      <div className="border-t border-white/10 my-1"></div>
                      <button className="flex items-center space-x-3 px-3 py-2 rounded-lg text-[#FF3B30] hover:bg-[#FF3B30]/10 transition-colors group w-full">
                        <LogOut size={18} className="group-hover:scale-110 transition-transform duration-300" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-16 min-h-screen">
        {children}
      </main>
    </div>
  );
} 