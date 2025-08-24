"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ArrowLeft,
  CheckCircle,
  Clock,
  AlertCircle,
  X,
  Mail,
  Users as TeamIcon,
  Award,
  Calendar as EventIcon,
  Building,
  Filter,
  Search,
  Trash2,
  Check,
  Bell,
  BellOff
} from "lucide-react";

interface Notification {
  id: number;
  type: 'success' | 'info' | 'warning' | 'error' | 'reminder' | 'invitation' | 'announcement';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
  icon: React.ReactNode;
  color: string;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // Mock notifications data
  const mockNotifications: Notification[] = [
    {
      id: 1,
      type: 'success',
      title: 'Registration Accepted!',
      message: 'Your team "AI Pioneers" has been accepted for AI Innovation Challenge 2024',
      timestamp: '2 hours ago',
      read: false,
      actionUrl: '/dashboard/hackathons/1',
      icon: <CheckCircle size={16} />,
      color: '#00C853'
    },
    {
      id: 2,
      type: 'info',
      title: 'New Hackathon Available',
      message: 'Mobile App Development Contest is now open for registration',
      timestamp: '5 hours ago',
      read: false,
      actionUrl: '/dashboard/hackathons/2',
      icon: <EventIcon size={16} />,
      color: '#00CFFF'
    },
    {
      id: 3,
      type: 'invitation',
      title: 'Team Invitation',
      message: 'You\'ve been invited to join "CodeCrafters" team',
      timestamp: '1 day ago',
      read: true,
      actionUrl: '/dashboard/teams/invitations',
      icon: <TeamIcon size={16} />,
      color: '#6A00FF'
    },
    {
      id: 4,
      type: 'reminder',
      title: 'Deadline Reminder',
      message: 'Project submission deadline for AI Innovation Challenge is in 2 days',
      timestamp: '1 day ago',
      read: false,
      actionUrl: '/dashboard/hackathons/1',
      icon: <Clock size={16} />,
      color: '#FF9500'
    },
    {
      id: 5,
      type: 'announcement',
      title: 'Club Update',
      message: 'Tech Club Algiers has posted a new announcement',
      timestamp: '2 days ago',
      read: true,
      actionUrl: '/dashboard/clubs/1',
      icon: <Building size={16} />,
      color: '#1E3C72'
    },
    {
      id: 6,
      type: 'success',
      title: 'Winner Announcement',
      message: 'Results for Web Development Marathon are now available',
      timestamp: '3 days ago',
      read: true,
      actionUrl: '/dashboard/hackathons/3/results',
      icon: <Award size={16} />,
      color: '#FFD700'
    },
    {
      id: 7,
      type: 'info',
      title: 'System Update',
      message: 'New features have been added to the platform',
      timestamp: '1 week ago',
      read: true,
      actionUrl: '/dashboard/updates',
      icon: <AlertCircle size={16} />,
      color: '#A0A0A0'
    },
    {
      id: 8,
      type: 'warning',
      title: 'Registration Deadline',
      message: 'Don\'t forget to register for the upcoming hackathon',
      timestamp: '1 week ago',
      read: false,
      actionUrl: '/dashboard/hackathons/4',
      icon: <Clock size={16} />,
      color: '#FF3B30'
    }
  ];

  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      setNotifications(mockNotifications);
      setLoading(false);
    };

    fetchNotifications();
  }, []);

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const filteredNotifications = notifications.filter(notification => {
    const matchesFilter = filter === 'all' || 
      (filter === 'unread' && !notification.read) || 
      (filter === 'read' && notification.read);
    
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'success': return 'bg-[#00C853]/10 border-[#00C853]/20';
      case 'info': return 'bg-[#00CFFF]/10 border-[#00CFFF]/20';
      case 'warning': return 'bg-[#FF9500]/10 border-[#FF9500]/20';
      case 'error': return 'bg-[#FF3B30]/10 border-[#FF3B30]/20';
      case 'reminder': return 'bg-[#FF9500]/10 border-[#FF9500]/20';
      case 'invitation': return 'bg-[#6A00FF]/10 border-[#6A00FF]/20';
      case 'announcement': return 'bg-[#1E3C72]/10 border-[#1E3C72]/20';
      default: return 'bg-[#A0A0A0]/10 border-[#A0A0A0]/20';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#00CFFF] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white">Loading notifications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <Link 
              href="/dashboard" 
              className="flex items-center space-x-2 text-[#00CFFF] hover:text-white transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Back to Dashboard</span>
            </Link>
            <div className="w-px h-6 bg-white/10"></div>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-[#1E3C72] to-[#00CFFF] rounded-xl flex items-center justify-center">
                <Bell size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Notifications</h1>
                <p className="text-[#A0A0A0]">
                  {unreadCount} unread • {notifications.length} total
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={markAllAsRead}
              className="flex items-center space-x-2 px-4 py-2 bg-[#00C853]/20 text-[#00C853] rounded-lg hover:bg-[#00C853]/30 transition-colors"
            >
              <Check size={16} />
              <span>Mark all as read</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-[#121212] rounded-2xl p-6 border border-white/10 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#A0A0A0]" />
              <input
                type="text"
                placeholder="Search notifications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-[#1A1A1A] border border-white/10 rounded-lg text-white placeholder-[#A0A0A0] focus:border-[#00CFFF] focus:outline-none transition-colors"
              />
            </div>
            
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="px-4 py-2 bg-[#1A1A1A] border border-white/10 rounded-lg text-white focus:border-[#00CFFF] focus:outline-none transition-colors"
            >
              <option value="all">All Notifications</option>
              <option value="unread">Unread Only</option>
              <option value="read">Read Only</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-[#A0A0A0]">
            <span>Showing {filteredNotifications.length} of {notifications.length}</span>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gradient-to-r from-[#1E3C72] to-[#00CFFF] rounded-full flex items-center justify-center mx-auto mb-6">
              <Bell size={48} className="text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No notifications</h3>
            <p className="text-[#A0A0A0]">
              {filter === 'all' 
                ? "You're all caught up! No notifications to show."
                : filter === 'unread'
                ? "No unread notifications at the moment."
                : "No read notifications to show."
              }
            </p>
          </div>
        ) : (
          filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`flex items-start space-x-4 p-6 bg-[#121212] rounded-2xl border transition-all duration-200 hover:border-[#00CFFF]/20 ${
                notification.read 
                  ? 'border-white/5 opacity-75' 
                  : 'border-white/10'
              } ${getTypeColor(notification.type)}`}
            >
              {/* Icon */}
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${notification.color}20`, border: `1px solid ${notification.color}40` }}
              >
                <div style={{ color: notification.color }}>
                  {notification.icon}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <h3 className={`text-lg font-semibold ${notification.read ? 'text-[#A0A0A0]' : 'text-white'}`}>
                    {notification.title}
                  </h3>
                  <div className="flex items-center space-x-2">
                    {!notification.read && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="p-1 text-[#00C853] hover:bg-[#00C853]/10 rounded transition-colors"
                        title="Mark as read"
                      >
                        <Check size={14} />
                      </button>
                    )}
                    <button
                      onClick={() => deleteNotification(notification.id)}
                      className="p-1 text-[#FF3B30] hover:bg-[#FF3B30]/10 rounded transition-colors"
                      title="Delete notification"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
                
                <p className="text-[#C7C7C7] mb-3 leading-relaxed">
                  {notification.message}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-[#A0A0A0] text-sm">
                    {notification.timestamp}
                  </span>
                  
                  {notification.actionUrl && (
                    <Link
                      href={notification.actionUrl}
                      className="text-[#00CFFF] text-sm hover:text-white transition-colors"
                    >
                      View Details →
                    </Link>
                  )}
                </div>
              </div>

              {/* Read/Unread Indicator */}
              {!notification.read && (
                <div className="w-3 h-3 bg-[#00C853] rounded-full flex-shrink-0 mt-2"></div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Load More */}
      {filteredNotifications.length > 0 && (
        <div className="text-center mt-8">
          <button className="px-6 py-3 bg-[#1A1A1A] text-white border border-white/20 rounded-lg hover:bg-white/10 transition-all duration-200">
            Load More Notifications
          </button>
        </div>
      )}
    </div>
  );
} 