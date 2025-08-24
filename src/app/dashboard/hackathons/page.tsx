"use client";

import { useState } from "react";
import { Search, Filter, MapPin, Clock, Users, Trophy, Calendar, Star, ExternalLink, Heart, Share2, Eye, Zap, Award, Globe, Building } from "lucide-react";

export default function HackathonsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [likedHackathons, setLikedHackathons] = useState<Set<number>>(new Set([1, 3]));

  // Mock hackathon data with more social features
  const hackathons = [
    {
      id: 1,
      title: "AI Innovation Challenge 2024",
      organization: "Tech Club Algiers",
      organizationLogo: "TCA",
      description: "Build innovative AI solutions to solve real-world problems. Focus on machine learning, computer vision, and natural language processing. Join thousands of developers worldwide!",
      startDate: "2024-02-15",
      endDate: "2024-02-17",
      location: "Algiers, Algeria",
      isOnline: false,
      isExternal: false,
      participants: 1247,
      maxParticipants: 2000,
      prize: "$25,000",
      prizeBreakdown: [
        { place: "1st", amount: "$10,000" },
        { place: "2nd", amount: "$7,000" },
        { place: "3rd", amount: "$5,000" },
        { place: "Special", amount: "$3,000" }
      ],
      tags: ["AI", "Machine Learning", "Python", "Computer Vision"],
      status: "upcoming",
      registrationDeadline: "2024-02-10",
      difficulty: "Intermediate",
      rating: 4.8,
      registered: false,
      likes: 342,
      views: 2156,
      featured: true,
      timeLeft: "5 days left",
      coverImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
    },
    {
      id: 2,
      title: "Web Development Sprint",
      organization: "Code Masters",
      organizationLogo: "CM",
      description: "A fast-paced web development competition. Build modern, responsive web applications using the latest technologies. Perfect for beginners and experts alike!",
      startDate: "2024-01-20",
      endDate: "2024-01-22",
      location: "Oran, Algeria",
      isOnline: true,
      isExternal: false,
      participants: 892,
      maxParticipants: 1000,
      prize: "$15,000",
      prizeBreakdown: [
        { place: "1st", amount: "$6,000" },
        { place: "2nd", amount: "$4,000" },
        { place: "3rd", amount: "$3,000" },
        { place: "Special", amount: "$2,000" }
      ],
      tags: ["React", "Node.js", "JavaScript", "Full Stack"],
      status: "completed",
      registrationDeadline: "2024-01-15",
      difficulty: "Beginner",
      rating: 4.5,
      registered: true,
      likes: 156,
      views: 892,
      featured: false,
      timeLeft: "Completed",
      coverImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop",
    },
    {
      id: 3,
      title: "Mobile App Contest",
      organization: "Innovation Hub",
      organizationLogo: "IH",
      description: "Create innovative mobile applications for iOS and Android. Focus on user experience and modern design patterns. Show off your mobile development skills!",
      startDate: "2024-03-10",
      endDate: "2024-03-12",
      location: "Constantine, Algeria",
      isOnline: false,
      isExternal: false,
      participants: 567,
      maxParticipants: 800,
      prize: "$20,000",
      prizeBreakdown: [
        { place: "1st", amount: "$8,000" },
        { place: "2nd", amount: "$5,000" },
        { place: "3rd", amount: "$4,000" },
        { place: "Special", amount: "$3,000" }
      ],
      tags: ["React Native", "Flutter", "Mobile", "UI/UX"],
      status: "upcoming",
      registrationDeadline: "2024-03-05",
      difficulty: "Advanced",
      rating: 4.9,
      registered: false,
      likes: 289,
      views: 1456,
      featured: true,
      timeLeft: "3 weeks left",
      coverImage: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=400&fit=crop",
    },
    {
      id: 4,
      title: "Blockchain & DeFi Hackathon",
      organization: "Crypto Club",
      organizationLogo: "CC",
      description: "Explore the world of blockchain and cryptocurrency. Build decentralized applications and smart contracts. The future of finance is here!",
      startDate: "2024-04-05",
      endDate: "2024-04-07",
      location: "Online",
      isOnline: true,
      isExternal: true,
      participants: 234,
      maxParticipants: 500,
      prize: "$30,000",
      prizeBreakdown: [
        { place: "1st", amount: "$12,000" },
        { place: "2nd", amount: "$8,000" },
        { place: "3rd", amount: "$6,000" },
        { place: "Special", amount: "$4,000" }
      ],
      tags: ["Blockchain", "Solidity", "Web3", "DeFi"],
      status: "upcoming",
      registrationDeadline: "2024-04-01",
      difficulty: "Advanced",
      rating: 4.7,
      registered: false,
      likes: 178,
      views: 892,
      featured: false,
      timeLeft: "1 month left",
      coverImage: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=400&fit=crop",
    },
  ];

  const filters = [
    { id: "all", label: "All", count: hackathons.length },
    { id: "upcoming", label: "Upcoming", count: hackathons.filter(h => h.status === "upcoming").length },
    { id: "ongoing", label: "Ongoing", count: 0 },
    { id: "completed", label: "Completed", count: hackathons.filter(h => h.status === "completed").length },
    { id: "online", label: "Online", count: hackathons.filter(h => h.isOnline).length },
    { id: "in-person", label: "In-Person", count: hackathons.filter(h => !h.isOnline).length },
  ];

  const filteredHackathons = hackathons.filter(hackathon => {
    const matchesSearch = hackathon.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hackathon.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hackathon.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = selectedFilter === "all" ||
                         (selectedFilter === "upcoming" && hackathon.status === "upcoming") ||
                         (selectedFilter === "completed" && hackathon.status === "completed") ||
                         (selectedFilter === "online" && hackathon.isOnline) ||
                         (selectedFilter === "in-person" && !hackathon.isOnline);
    
    return matchesSearch && matchesFilter;
  });

  const handleLike = (hackathonId: number) => {
    const newLiked = new Set(likedHackathons);
    if (newLiked.has(hackathonId)) {
      newLiked.delete(hackathonId);
    } else {
      newLiked.add(hackathonId);
    }
    setLikedHackathons(newLiked);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming": return "bg-[#00C853]/20 text-[#00C853]";
      case "ongoing": return "bg-[#00CFFF]/20 text-[#00CFFF]";
      case "completed": return "bg-[#A0A0A0]/20 text-[#A0A0A0]";
      default: return "bg-[#A0A0A0]/20 text-[#A0A0A0]";
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-[#00C853]/20 text-[#00C853]";
      case "Intermediate": return "bg-[#00CFFF]/20 text-[#00CFFF]";
      case "Advanced": return "bg-[#FF3B30]/20 text-[#FF3B30]";
      default: return "bg-[#A0A0A0]/20 text-[#A0A0A0]";
    }
  };

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#1E3C72] via-[#2A5298] to-[#000000] p-8">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10">
          <h1 className="text-4xl font-bold text-white mb-4">Discover Amazing Hackathons</h1>
          <p className="text-xl text-[#C7C7C7] mb-8 max-w-2xl">
            Join thousands of developers, designers, and innovators in building the future. 
            Find your next challenge and win amazing prizes!
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#A0A0A0]" size={24} />
            <input
              type="text"
              placeholder="Search hackathons, technologies, or organizations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-[#A0A0A0] focus:outline-none focus:ring-2 focus:ring-[#00CFFF] focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setSelectedFilter(filter.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              selectedFilter === filter.id
                ? 'bg-gradient-to-r from-[#1E3C72] to-[#00CFFF] text-white shadow-lg'
                : 'bg-[#1A1A1A] text-[#C7C7C7] hover:bg-white/5 hover:text-white border border-white/10'
            }`}
          >
            <span>{filter.label}</span>
            <span className={`px-2 py-0.5 rounded-full text-xs ${
              selectedFilter === filter.id ? 'bg-white/20' : 'bg-[#00CFFF]/20 text-[#00CFFF]'
            }`}>
              {filter.count}
            </span>
          </button>
        ))}
      </div>

      {/* Featured Hackathons */}
      {filteredHackathons.filter(h => h.featured).length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
            <Zap className="mr-2 text-[#00CFFF]" />
            Featured Hackathons
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {filteredHackathons.filter(h => h.featured).map((hackathon) => (
              <div key={hackathon.id} className="group relative overflow-hidden rounded-2xl bg-[#121212] border border-white/10 hover:border-[#00CFFF]/30 transition-all duration-300 hover:shadow-2xl hover:shadow-[#00CFFF]/10">
                {/* Cover Image */}
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1E3C72]/80 to-[#000000]/80"></div>
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-[#00CFFF]/20 text-[#00CFFF] text-xs font-medium rounded-full backdrop-blur-sm">
                      Featured
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <button
                      onClick={() => handleLike(hackathon.id)}
                      className={`p-2 rounded-full backdrop-blur-sm transition-all ${
                        likedHackathons.has(hackathon.id)
                          ? 'bg-[#FF3B30]/20 text-[#FF3B30]'
                          : 'bg-black/20 text-white hover:bg-[#FF3B30]/20 hover:text-[#FF3B30]'
                      }`}
                    >
                      <Heart size={16} fill={likedHackathons.has(hackathon.id) ? 'currentColor' : 'none'} />
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
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(hackathon.difficulty)}`}>
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
                      {hackathon.isOnline ? (
                        <Globe size={14} className="text-[#A0A0A0]" />
                      ) : (
                        <MapPin size={14} className="text-[#A0A0A0]" />
                      )}
                      <span className="text-sm text-[#C7C7C7]">{hackathon.location}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    {hackathon.registered ? (
                      <button className="flex-1 btn-secondary text-sm py-3">
                        View Details
                      </button>
                    ) : (
                      <button className="flex-1 btn-primary text-sm py-3">
                        Join Hackathon
                      </button>
                    )}
                    <button className="btn-secondary text-sm py-3 px-4">
                      <Share2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All Hackathons */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">All Hackathons</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredHackathons.map((hackathon) => (
            <div key={hackathon.id} className="group relative overflow-hidden rounded-xl bg-[#121212] border border-white/10 hover:border-[#00CFFF]/30 transition-all duration-300 hover:shadow-xl hover:shadow-[#00CFFF]/5">
              {/* Header */}
              <div className="p-4 border-b border-white/5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-[#1E3C72] to-[#00CFFF] rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-xs">{hackathon.organizationLogo}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-[#00CFFF] transition-colors line-clamp-1">
                        {hackathon.title}
                      </h3>
                      <p className="text-xs text-[#A0A0A0]">{hackathon.organization}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleLike(hackathon.id)}
                    className={`p-1.5 rounded-full transition-all ${
                      likedHackathons.has(hackathon.id)
                        ? 'text-[#FF3B30]'
                        : 'text-[#A0A0A0] hover:text-[#FF3B30]'
                    }`}
                  >
                    <Heart size={14} fill={likedHackathons.has(hackathon.id) ? 'currentColor' : 'none'} />
                  </button>
                </div>

                <p className="text-[#C7C7C7] text-sm line-clamp-2 mb-3">{hackathon.description}</p>

                {/* Prize and Difficulty */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <Trophy size={14} className="text-[#00CFFF]" />
                    <span className="text-sm font-semibold text-white">{hackathon.prize}</span>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(hackathon.difficulty)}`}>
                    {hackathon.difficulty}
                  </span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {hackathon.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-[#1A1A1A] text-[#00CFFF] text-xs rounded">
                      {tag}
                    </span>
                  ))}
                  {hackathon.tags.length > 2 && (
                    <span className="px-2 py-1 bg-[#1A1A1A] text-[#A0A0A0] text-xs rounded">
                      +{hackathon.tags.length - 2}
                    </span>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="p-4">
                <div className="flex items-center justify-between text-xs text-[#A0A0A0] mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1">
                      <Users size={12} />
                      <span>{hackathon.participants.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Heart size={12} />
                      <span>{hackathon.likes.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star size={12} className="text-[#00CFFF]" fill="currentColor" />
                    <span>{hackathon.rating}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-1">
                    <Clock size={12} className="text-[#A0A0A0]" />
                    <span className="text-xs text-[#C7C7C7]">{hackathon.timeLeft}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    {hackathon.isOnline ? (
                      <Globe size={12} className="text-[#A0A0A0]" />
                    ) : (
                      <MapPin size={12} className="text-[#A0A0A0]" />
                    )}
                    <span className="text-xs text-[#C7C7C7]">{hackathon.location}</span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  {hackathon.registered ? (
                    <button className="flex-1 btn-secondary text-xs py-2">
                      View Details
                    </button>
                  ) : (
                    <button className="flex-1 btn-primary text-xs py-2">
                      Join Now
                    </button>
                  )}
                  <button className="btn-secondary text-xs py-2 px-3">
                    <Share2 size={12} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Empty State */}
      {filteredHackathons.length === 0 && (
        <div className="card p-12 text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-[#1E3C72] to-[#00CFFF] rounded-full flex items-center justify-center mx-auto mb-4">
            <Search size={32} className="text-white" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">No hackathons found</h3>
          <p className="text-[#A0A0A0] mb-6">
            Try adjusting your search terms or filters to find what you're looking for.
          </p>
          <button 
            onClick={() => {
              setSearchTerm("");
              setSelectedFilter("all");
            }}
            className="btn-primary"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
} 