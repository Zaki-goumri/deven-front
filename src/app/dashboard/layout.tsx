"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
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
  Building,
  CheckCircle,
  Clock,
  AlertCircle,
  X,
  Users as TeamIcon,
  Award,
  Calendar as EventIcon,
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
  const [notificationMenuOpen, setNotificationMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const notificationMenuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Close menus when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setProfileMenuOpen(false);
      }
      if (
        notificationMenuRef.current &&
        !notificationMenuRef.current.contains(event.target as Node)
      ) {
        setNotificationMenuOpen(false);
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
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#00CFFF] rounded-full blur-3xl opacity-10 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#1E3C72] rounded-full blur-3xl opacity-5 animate-pulse"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#121212]/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Navigation */}
            <div className="flex items-center space-x-8">
              {/* Logo */}
              <Link
                href="/dashboard"
                className="flex items-center space-x-2 group"
              >
                <div className="relative">
                  <div className="w-8 h-8 bg-gradient-to-r from-[#1E3C72] to-[#00CFFF] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white font-bold text-sm">D</span>
                  </div>
                  <div className="absolute inset-0 w-8 h-8 bg-gradient-to-r from-[#6A00FF] to-[#00CFFF] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                </div>
                <span className="text-xl font-bold text-white group-hover:text-[#00CFFF] transition-colors">
                  Deven
                </span>
                <Sparkles
                  size={16}
                  className="text-[#00CFFF] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
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
                        ${
                          isActive
                            ? "text-white bg-gradient-to-r from-[#1E3C72]/20 to-[#00CFFF]/20"
                            : "text-[#C7C7C7] hover:text-white hover:bg-white/5"
                        }
                      `}
                    >
                      <div className="relative">
                        <item.icon
                          size={16}
                          className="group-hover:scale-110 transition-transform duration-300"
                        />
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
              <div
                className={`relative transition-all duration-300 ${searchFocused ? "w-80" : "w-64"}`}
              >
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#A0A0A0]"
                  size={18}
                />
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
              <div className="relative" ref={notificationMenuRef}>
                <button
                  onClick={() => setNotificationMenuOpen(!notificationMenuOpen)}
                  className="relative p-2 text-[#C7C7C7] hover:text-white transition-colors group"
                >
                  <Bell
                    size={20}
                    className="group-hover:scale-110 transition-transform duration-300"
                  />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-[#00C853] rounded-full animate-pulse"></span>
                  <div className="absolute inset-0 bg-[#00CFFF]/0 group-hover:bg-[#00CFFF]/10 rounded-lg transition-colors duration-300"></div>
                </button>

                {/* Notification Dropdown */}
                {notificationMenuOpen && (
                  <div className="absolute right-0 mt-2 w-96 bg-[#121212]/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl animate-in slide-in-from-top-2 duration-200 max-h-[32rem] overflow-hidden">
                    <div className="p-4 border-b border-white/10">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-white">
                          Notifications
                        </h3>
                        <button
                          onClick={() => setNotificationMenuOpen(false)}
                          className="text-[#A0A0A0] hover:text-white transition-colors"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </div>

                    <div className="max-h-96 overflow-y-auto">
                      {/* Notification Types */}
                      <div className="p-2 space-y-4">
                        {/* Unread Notifications */}
                        <div>
                          <div className="flex items-center justify-between mb-2 px-2">
                            <h4 className="text-sm font-semibold text-[#00CFFF] flex items-center">
                              <div className="w-2 h-2 bg-[#00CFFF] rounded-full mr-2"></div>
                              Unread (3)
                            </h4>
                            <button className="text-[#00CFFF] text-xs hover:text-white transition-colors">
                              Mark all read
                            </button>
                          </div>

                          <div className="space-y-2">
                            {/* Hackathon Registration Accepted */}
                            <div className="flex items-start space-x-3 p-3 bg-[#00C853]/10 border border-[#00C853]/20 rounded-lg hover:bg-[#00C853]/20 transition-colors cursor-pointer group">
                              <div className="w-8 h-8 bg-[#00C853]/20 rounded-full flex items-center justify-center flex-shrink-0">
                                <CheckCircle
                                  size={16}
                                  className="text-[#00C853]"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-white font-semibold text-sm">
                                  Registration Accepted!
                                </p>
                                <p className="text-[#A0A0A0] text-xs">
                                  Your team &quot;AI Pioneers&quot; has been accepted for
                                  AI Innovation Challenge 2024
                                </p>
                                <p className="text-[#A0A0A0] text-xs mt-1">
                                  2 hours ago
                                </p>
                              </div>
                              <button className="opacity-0 group-hover:opacity-100 p-1 text-[#FF3B30] hover:bg-[#FF3B30]/10 rounded transition-all duration-200">
                                <X size={12} />
                              </button>
                            </div>

                            {/* New Hackathon */}
                            <div className="flex items-start space-x-3 p-3 bg-[#00CFFF]/10 border border-[#00CFFF]/20 rounded-lg hover:bg-[#00CFFF]/20 transition-colors cursor-pointer group">
                              <div className="w-8 h-8 bg-[#00CFFF]/20 rounded-full flex items-center justify-center flex-shrink-0">
                                <EventIcon
                                  size={16}
                                  className="text-[#00CFFF]"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-white font-semibold text-sm">
                                  New Hackathon Available
                                </p>
                                <p className="text-[#A0A0A0] text-xs">
                                  Mobile App Development Contest is now open for
                                  registration
                                </p>
                                <p className="text-[#A0A0A0] text-xs mt-1">
                                  5 hours ago
                                </p>
                              </div>
                              <button className="opacity-0 group-hover:opacity-100 p-1 text-[#FF3B30] hover:bg-[#FF3B30]/10 rounded transition-all duration-200">
                                <X size={12} />
                              </button>
                            </div>

                            {/* Deadline Reminder */}
                            <div className="flex items-start space-x-3 p-3 bg-[#FF9500]/10 border border-[#FF9500]/20 rounded-lg hover:bg-[#FF9500]/20 transition-colors cursor-pointer group">
                              <div className="w-8 h-8 bg-[#FF9500]/20 rounded-full flex items-center justify-center flex-shrink-0">
                                <Clock size={16} className="text-[#FF9500]" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-white font-semibold text-sm">
                                  Deadline Reminder
                                </p>
                                <p className="text-[#A0A0A0] text-xs">
                                  Project submission deadline for AI Innovation
                                  Challenge is in 2 days
                                </p>
                                <p className="text-[#A0A0A0] text-xs mt-1">
                                  1 day ago
                                </p>
                              </div>
                              <button className="opacity-0 group-hover:opacity-100 p-1 text-[#FF3B30] hover:bg-[#FF3B30]/10 rounded transition-all duration-200">
                                <X size={12} />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Recent Notifications */}
                        <div>
                          <div className="flex items-center justify-between mb-2 px-2">
                            <h4 className="text-sm font-semibold text-[#A0A0A0] flex items-center">
                              <div className="w-2 h-2 bg-[#A0A0A0] rounded-full mr-2"></div>
                              Recent (4)
                            </h4>
                          </div>

                          <div className="space-y-2">
                            {/* Team Invitation */}
                            <div className="flex items-start space-x-3 p-3 bg-[#6A00FF]/10 border border-[#6A00FF]/20 rounded-lg hover:bg-[#6A00FF]/20 transition-colors cursor-pointer group opacity-75">
                              <div className="w-8 h-8 bg-[#6A00FF]/20 rounded-full flex items-center justify-center flex-shrink-0">
                                <TeamIcon
                                  size={16}
                                  className="text-[#6A00FF]"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-white font-semibold text-sm">
                                  Team Invitation
                                </p>
                                <p className="text-[#A0A0A0] text-xs">
                                  You&apos;ve been invited to join &quot;CodeCrafters&quot;
                                  team
                                </p>
                                <p className="text-[#A0A0A0] text-xs mt-1">
                                  1 day ago
                                </p>
                              </div>
                              <button className="opacity-0 group-hover:opacity-100 p-1 text-[#FF3B30] hover:bg-[#FF3B30]/10 rounded transition-all duration-200">
                                <X size={12} />
                              </button>
                            </div>

                            {/* Club Update */}
                            <div className="flex items-start space-x-3 p-3 bg-[#1E3C72]/10 border border-[#1E3C72]/20 rounded-lg hover:bg-[#1E3C72]/20 transition-colors cursor-pointer group opacity-75">
                              <div className="w-8 h-8 bg-[#1E3C72]/20 rounded-full flex items-center justify-center flex-shrink-0">
                                <Building
                                  size={16}
                                  className="text-[#1E3C72]"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-white font-semibold text-sm">
                                  Club Update
                                </p>
                                <p className="text-[#A0A0A0] text-xs">
                                  Tech Club Algiers has posted a new
                                  announcement
                                </p>
                                <p className="text-[#A0A0A0] text-xs mt-1">
                                  2 days ago
                                </p>
                              </div>
                              <button className="opacity-0 group-hover:opacity-100 p-1 text-[#FF3B30] hover:bg-[#FF3B30]/10 rounded transition-all duration-200">
                                <X size={12} />
                              </button>
                            </div>

                            {/* Winner Announcement */}
                            <div className="flex items-start space-x-3 p-3 bg-[#FFD700]/10 border border-[#FFD700]/20 rounded-lg hover:bg-[#FFD700]/20 transition-colors cursor-pointer group opacity-75">
                              <div className="w-8 h-8 bg-[#FFD700]/20 rounded-full flex items-center justify-center flex-shrink-0">
                                <Award size={16} className="text-[#FFD700]" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-white font-semibold text-sm">
                                  Winner Announcement
                                </p>
                                <p className="text-[#A0A0A0] text-xs">
                                  Results for Web Development Marathon are now
                                  available
                                </p>
                                <p className="text-[#A0A0A0] text-xs mt-1">
                                  3 days ago
                                </p>
                              </div>
                              <button className="opacity-0 group-hover:opacity-100 p-1 text-[#FF3B30] hover:bg-[#FF3B30]/10 rounded transition-all duration-200">
                                <X size={12} />
                              </button>
                            </div>

                            {/* System Message */}
                            <div className="flex items-start space-x-3 p-3 bg-[#A0A0A0]/10 border border-[#A0A0A0]/20 rounded-lg hover:bg-[#A0A0A0]/20 transition-colors cursor-pointer group opacity-75">
                              <div className="w-8 h-8 bg-[#A0A0A0]/20 rounded-full flex items-center justify-center flex-shrink-0">
                                <AlertCircle
                                  size={16}
                                  className="text-[#A0A0A0]"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-white font-semibold text-sm">
                                  System Update
                                </p>
                                <p className="text-[#A0A0A0] text-xs">
                                  New features have been added to the platform
                                </p>
                                <p className="text-[#A0A0A0] text-xs mt-1">
                                  1 week ago
                                </p>
                              </div>
                              <button className="opacity-0 group-hover:opacity-100 p-1 text-[#FF3B30] hover:bg-[#FF3B30]/10 rounded transition-all duration-200">
                                <X size={12} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="p-3 border-t border-white/10 bg-[#1A1A1A]/50">
                      <div className="flex items-center justify-between">
                        <button className="text-[#00CFFF] text-sm hover:text-white transition-colors">
                          Mark all as read
                        </button>
                        <Link
                          href="/dashboard/notifications"
                          className="text-[#00CFFF] text-sm hover:text-white transition-colors"
                        >
                          View all notifications
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

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
                    className={`text-[#A0A0A0] transition-transform duration-300 ${profileMenuOpen ? "rotate-180" : ""}`}
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
                        <BarChart3
                          size={18}
                          className="group-hover:scale-110 transition-transform duration-300"
                        />
                        <span>Dashboard</span>
                      </Link>
                      <Link
                        href="/dashboard/profile"
                        onClick={() => setProfileMenuOpen(false)}
                        className="flex items-center space-x-3 px-3 py-2 rounded-lg text-[#C7C7C7] hover:text-white hover:bg-white/5 transition-colors group"
                      >
                        <User
                          size={18}
                          className="group-hover:scale-110 transition-transform duration-300"
                        />
                        <span>Profile</span>
                      </Link>
                      <Link
                        href="/dashboard/my-clubs"
                        onClick={() => setProfileMenuOpen(false)}
                        className="flex items-center space-x-3 px-3 py-2 rounded-lg text-[#C7C7C7] hover:text-white hover:bg-white/5 transition-colors group"
                      >
                        <Building
                          size={18}
                          className="group-hover:scale-110 transition-transform duration-300"
                        />
                        <span>My Clubs</span>
                      </Link>
                      <Link
                        href="/dashboard/profile"
                        onClick={() => setProfileMenuOpen(false)}
                        className="flex items-center space-x-3 px-3 py-2 rounded-lg text-[#C7C7C7] hover:text-white hover:bg-white/5 transition-colors group"
                      >
                        <Settings
                          size={18}
                          className="group-hover:scale-110 transition-transform duration-300"
                        />
                        <span>Settings</span>
                      </Link>
                      <div className="border-t border-white/10 my-1"></div>
                      <button className="flex items-center space-x-3 px-3 py-2 rounded-lg text-[#FF3B30] hover:bg-[#FF3B30]/10 transition-colors group w-full">
                        <LogOut
                          size={18}
                          className="group-hover:scale-110 transition-transform duration-300"
                        />
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
      <main className="pt-16 min-h-screen">{children}</main>
    </div>
  );
}

