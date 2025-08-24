"use client";

import { useState } from "react";
import { Search, Filter, MapPin, Clock, Users, Trophy, Calendar, Star, ExternalLink, Heart, Share2, Eye, Zap, Globe, Building, TrendingUp, Flame, X, ChevronDown, CalendarDays } from "lucide-react";

export default function FeedPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("trending");

  // Mock hackathon data with more details
  const hackathons = [
    {
      id: 1,
      title: "AI Innovation Challenge 2024",
      organization: "Tech Club Algiers",
      organizationLogo: "TCA",
      description: "Build innovative AI solutions to solve real-world problems. Focus on machine learning, computer vision, and natural language processing. Join thousands of developers worldwide!",
      participants: 1247,
      maxParticipants: 2000,
      prize: "$25,000",
      prizeBreakdown: [
        { place: "1st", amount: "$10,000" },
        { place: "2nd", amount: "$7,000" },
        { place: "3rd", amount: "$5,000" },
        { place: "Special", amount: "$3,000" }
      ],
      tags: ["AI", "Machine Learning", "Python", "Computer Vision", "NLP"],
      status: "upcoming",
      startDate: "2024-02-15",
      endDate: "2024-02-17",
      registrationDeadline: "2024-02-10",
      location: "Algiers, Algeria",
      isOnline: false,
      isExternal: false,
      difficulty: "Intermediate",
      rating: 4.8,
      likes: 342,
      views: 2156,
      featured: true,
      timeLeft: "5 days left",
      coverImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
    },
    {
      id: 2,
      title: "Mobile App Contest",
      organization: "Innovation Hub",
      organizationLogo: "IH",
      description: "Create innovative mobile applications for iOS and Android. Focus on user experience and modern design patterns. Show off your mobile development skills!",
      participants: 567,
      maxParticipants: 800,
      prize: "$20,000",
      prizeBreakdown: [
        { place: "1st", amount: "$8,000" },
        { place: "2nd", amount: "$5,000" },
        { place: "3rd", amount: "$4,000" },
        { place: "Special", amount: "$3,000" }
      ],
      tags: ["React Native", "Flutter", "Mobile", "UI/UX", "iOS", "Android"],
      status: "upcoming",
      startDate: "2024-03-10",
      endDate: "2024-03-12",
      registrationDeadline: "2024-03-05",
      location: "Constantine, Algeria",
      isOnline: false,
      isExternal: false,
      difficulty: "Advanced",
      rating: 4.9,
      likes: 289,
      views: 1456,
      featured: true,
      timeLeft: "3 weeks left",
      coverImage: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=400&fit=crop",
    },
    {
      id: 3,
      title: "Blockchain & DeFi Hackathon",
      organization: "Crypto Club",
      organizationLogo: "CC",
      description: "Explore the world of blockchain and cryptocurrency. Build decentralized applications and smart contracts. The future of finance is here!",
      participants: 234,
      maxParticipants: 500,
      prize: "$30,000",
      prizeBreakdown: [
        { place: "1st", amount: "$12,000" },
        { place: "2nd", amount: "$8,000" },
        { place: "3rd", amount: "$6,000" },
        { place: "Special", amount: "$4,000" }
      ],
      tags: ["Blockchain", "Solidity", "Web3", "DeFi", "Smart Contracts"],
      status: "upcoming",
      startDate: "2024-04-05",
      endDate: "2024-04-07",
      registrationDeadline: "2024-04-01",
      location: "Online",
      isOnline: true,
      isExternal: true,
      difficulty: "Advanced",
      rating: 4.7,
      likes: 178,
      views: 892,
      featured: false,
      timeLeft: "1 month left",
      coverImage: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=400&fit=crop",
    },
    {
      id: 4,
      title: "Web Development Sprint",
      organization: "Code Masters",
      organizationLogo: "CM",
      description: "A fast-paced web development competition. Build modern, responsive web applications using the latest technologies. Perfect for beginners and experts alike!",
      participants: 892,
      maxParticipants: 1000,
      prize: "$15,000",
      prizeBreakdown: [
        { place: "1st", amount: "$6,000" },
        { place: "2nd", amount: "$4,000" },
        { place: "3rd", amount: "$3,000" },
        { place: "Special", amount: "$2,000" }
      ],
      tags: ["React", "Node.js", "JavaScript", "Full Stack", "TypeScript"],
      status: "upcoming",
      startDate: "2024-02-25",
      endDate: "2024-02-27",
      registrationDeadline: "2024-02-20",
      location: "Oran, Algeria",
      isOnline: true,
      isExternal: false,
      difficulty: "Beginner",
      rating: 4.5,
      likes: 156,
      views: 892,
      featured: false,
      timeLeft: "2 weeks left",
      coverImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop",
    },
  ];

  const categories = [
    { id: "all", label: "All", icon: Globe, count: hackathons.length },
    { id: "hackathons", label: "Hackathons", icon: Trophy, count: hackathons.length },
    { id: "trending", label: "Trending", icon: TrendingUp, count: hackathons.filter(h => h.featured).length },
    { id: "upcoming", label: "Upcoming", icon: Calendar, count: hackathons.filter(h => h.status === "upcoming").length },
  ];

  const allTags = Array.from(new Set(hackathons.flatMap(h => h.tags)));

  const sortOptions = [
    { value: "trending", label: "Trending" },
    { value: "newest", label: "Newest" },
    { value: "deadline", label: "Registration Deadline" },
    { value: "participants", label: "Most Participants" },
    { value: "prize", label: "Highest Prize" },
  ];

  const filteredHackathons = hackathons.filter(hackathon => {
    const matchesSearch = hackathon.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hackathon.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hackathon.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === "all" ||
                           (selectedCategory === "trending" && hackathon.featured) ||
                           (selectedCategory === "upcoming" && hackathon.status === "upcoming") ||
                           selectedCategory === "hackathons";
    
    const matchesTags = selectedTags.length === 0 || 
                       selectedTags.some(tag => hackathon.tags.includes(tag));
    
    const matchesDateRange = !dateRange.start || !dateRange.end || 
                           (hackathon.startDate >= dateRange.start && hackathon.startDate <= dateRange.end);
    
    return matchesSearch && matchesCategory && matchesTags && matchesDateRange;
  });

  const sortedHackathons = [...filteredHackathons].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
      case "deadline":
        return new Date(a.registrationDeadline).getTime() - new Date(b.registrationDeadline).getTime();
      case "participants":
        return b.participants - a.participants;
      case "prize":
        return parseInt(b.prize.replace(/[^0-9]/g, '')) - parseInt(a.prize.replace(/[^0-9]/g, ''));
      default:
        return b.likes - a.likes;
    }
  });

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSelectedTags([]);
    setDateRange({ start: "", end: "" });
    setSortBy("trending");
  };

  return (
    <div className="space-y-8 p-6">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#1E3C72] via-[#2A5298] to-[#000000] p-8">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#6A00FF]/10 to-[#00CFFF]/10"></div>
        <div className="relative z-10">
          <h1 className="text-4xl font-bold text-white mb-4 animate-fade-in">
            Discover Amazing Opportunities
          </h1>
          <p className="text-xl text-[#C7C7C7] mb-8 max-w-2xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Explore hackathons, join tech clubs, and attend events. Connect with the developer community and build your network!
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-2xl animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#A0A0A0]" size={24} />
            <input
              type="text"
              placeholder="Search hackathons, clubs, events, or technologies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-[#A0A0A0] focus:outline-none focus:ring-2 focus:ring-[#00CFFF] focus:border-transparent transition-all duration-300"
            />
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="space-y-4">
        {/* Category Filters */}
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-[#1E3C72] to-[#00CFFF] text-white shadow-lg'
                  : 'bg-[#1A1A1A] text-[#C7C7C7] hover:bg-white/5 hover:text-white border border-white/10'
              }`}
            >
              <category.icon size={16} />
              <span>{category.label}</span>
              <span className={`px-2 py-0.5 rounded-full text-xs ${
                selectedCategory === category.id ? 'bg-white/20' : 'bg-[#00CFFF]/20 text-[#00CFFF]'
              }`}>
                {category.count}
              </span>
            </button>
          ))}
        </div>

        {/* Advanced Filters */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-4 py-2 bg-[#1A1A1A] text-[#C7C7C7] hover:text-white border border-white/10 rounded-lg transition-colors"
          >
            <Filter size={16} />
            <span>Advanced Filters</span>
            <ChevronDown size={16} className={`transition-transform duration-200 ${showFilters ? 'rotate-180' : ''}`} />
          </button>

          <div className="flex items-center space-x-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 bg-[#1A1A1A] text-[#C7C7C7] border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00CFFF] focus:border-transparent"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>

            {(selectedTags.length > 0 || dateRange.start || dateRange.end) && (
              <button
                onClick={clearFilters}
                className="flex items-center space-x-2 px-3 py-2 text-[#FF3B30] hover:bg-[#FF3B30]/10 rounded-lg transition-colors"
              >
                <X size={16} />
                <span>Clear Filters</span>
              </button>
            )}
          </div>
        </div>

        {/* Expanded Filters */}
        {showFilters && (
          <div className="bg-[#1A1A1A] rounded-xl p-6 border border-white/10 animate-slide-down">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Date Range */}
              <div>
                <h3 className="text-white font-medium mb-3 flex items-center">
                  <CalendarDays size={16} className="mr-2" />
                  Date Range
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="date"
                    value={dateRange.start}
                    onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                    className="px-3 py-2 bg-[#2A2A2A] text-white border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00CFFF] focus:border-transparent"
                  />
                  <input
                    type="date"
                    value={dateRange.end}
                    onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                    className="px-3 py-2 bg-[#2A2A2A] text-white border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00CFFF] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Tags */}
              <div>
                <h3 className="text-white font-medium mb-3">Technologies & Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {allTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                        selectedTags.includes(tag)
                          ? 'bg-[#00CFFF] text-white'
                          : 'bg-[#2A2A2A] text-[#C7C7C7] hover:bg-[#00CFFF]/20 hover:text-[#00CFFF]'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-[#A0A0A0]">
          Showing {sortedHackathons.length} of {hackathons.length} hackathons
        </p>
        {selectedTags.length > 0 && (
          <div className="flex items-center space-x-2">
            <span className="text-sm text-[#A0A0A0]">Active filters:</span>
            {selectedTags.map((tag) => (
              <span key={tag} className="px-2 py-1 bg-[#00CFFF]/20 text-[#00CFFF] text-xs rounded-full">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Hackathons Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {sortedHackathons.map((hackathon, index) => (
          <div 
            key={hackathon.id} 
            className="group relative overflow-hidden rounded-2xl bg-[#121212] border border-white/10 hover:border-[#00CFFF]/30 transition-all duration-300 hover:shadow-2xl hover:shadow-[#00CFFF]/10 animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Cover Image */}
            <div className="relative h-48 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#1E3C72]/80 to-[#000000]/80"></div>
              {hackathon.featured && (
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-[#00CFFF]/20 text-[#00CFFF] text-xs font-medium rounded-full backdrop-blur-sm">
                    Featured
                  </span>
                </div>
              )}
              <div className="absolute top-4 right-4">
                <button className="p-2 rounded-full backdrop-blur-sm bg-black/20 text-white hover:bg-[#FF3B30]/20 hover:text-[#FF3B30] transition-all">
                  <Heart size={16} />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-[#1E3C72] to-[#00CFFF] rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{hackathon.organizationLogo}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-[#00CFFF] transition-colors">
                      {hackathon.title}
                    </h3>
                    <p className="text-sm text-[#A0A0A0]">{hackathon.organization}</p>
                  </div>
                </div>
                {hackathon.isExternal && (
                  <ExternalLink size={16} className="text-[#A0A0A0]" />
                )}
              </div>

              <p className="text-[#C7C7C7] text-sm mb-4 line-clamp-2">{hackathon.description}</p>

              {/* Prize */}
              <div className="bg-gradient-to-r from-[#00C853]/10 to-[#00CFFF]/10 rounded-lg p-3 mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Trophy size={16} className="text-[#00CFFF]" />
                    <span className="text-lg font-bold text-white">{hackathon.prize}</span>
                  </div>
                  <span className="px-2 py-1 bg-[#00C853]/20 text-[#00C853] text-xs font-medium rounded-full">
                    {hackathon.difficulty}
                  </span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {hackathon.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="px-2 py-1 bg-[#1A1A1A] text-[#00CFFF] text-xs rounded-full">
                    {tag}
                  </span>
                ))}
                {hackathon.tags.length > 3 && (
                  <span className="px-2 py-1 bg-[#1A1A1A] text-[#A0A0A0] text-xs rounded-full">
                    +{hackathon.tags.length - 3} more
                  </span>
                )}
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between text-sm text-[#A0A0A0] mb-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Users size={14} />
                    <span>{hackathon.participants.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Eye size={14} />
                    <span>{hackathon.views.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Heart size={14} />
                    <span>{hackathon.likes.toLocaleString()}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Star size={14} className="text-[#00CFFF]" fill="currentColor" />
                  <span>{hackathon.rating}</span>
                </div>
              </div>

              {/* Time and Location */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Clock size={14} className="text-[#A0A0A0]" />
                  <span className="text-sm text-[#C7C7C7]">{hackathon.timeLeft}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin size={14} className="text-[#A0A0A0]" />
                  <span className="text-sm text-[#C7C7C7]">{hackathon.location}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button className="flex-1 btn-primary text-sm py-3">
                  Join Hackathon
                </button>
                <button className="btn-secondary text-sm py-3 px-4">
                  <Share2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {sortedHackathons.length === 0 && (
        <div className="card p-12 text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-[#1E3C72] to-[#00CFFF] rounded-full flex items-center justify-center mx-auto mb-4">
            <Search size={32} className="text-white" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">No hackathons found</h3>
          <p className="text-[#A0A0A0] mb-6">
            Try adjusting your search terms or filters to find what you're looking for.
          </p>
          <button 
            onClick={clearFilters}
            className="btn-primary"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
} 