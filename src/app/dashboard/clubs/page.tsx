"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, MapPin, Share2, Building, Globe, Star } from "lucide-react";

export default function ClubsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const clubs = [
    {
      id: 1,
      name: "Tech Club Algiers",
      logo: "TCA",
      description:
        "Leading technology club in Algiers, organizing innovative hackathons and tech events. We focus on AI, web development, and mobile technologies.",
      memberCount: 1245,
      hackathonCount: 8,
      rating: 4.8,
      location: "Algiers, Algeria",
      isVerified: true,
      coverImage:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop",
      website: "https://techclub-algiers.com",
      socialMedia: {
        twitter: "@techclub_algiers",
        linkedin: "tech-club-algiers",
        github: "techclub-algiers",
      },
      hackathons: [
        {
          id: 1,
          title: "AI Innovation Challenge 2024",
          description:
            "Build innovative AI solutions to solve real-world problems. Focus on machine learning, computer vision, and natural language processing.",
          participants: 1247,
          maxParticipants: 2000,
          prize: "$25,000",
          startDate: "2024-02-15",
          endDate: "2024-02-17",
          registrationDeadline: "2024-02-10",
          status: "upcoming",
          tags: ["AI", "Machine Learning", "Python", "Computer Vision", "NLP"],
          likes: 342,
          views: 2156,
          featured: true,
        },
        {
          id: 2,
          title: "Web Development Sprint",
          description:
            "A fast-paced web development competition. Build modern, responsive web applications using the latest technologies.",
          participants: 892,
          maxParticipants: 1000,
          prize: "$15,000",
          startDate: "2024-02-25",
          endDate: "2024-02-27",
          registrationDeadline: "2024-02-20",
          status: "upcoming",
          tags: ["React", "Node.js", "JavaScript", "Full Stack", "TypeScript"],
          likes: 156,
          views: 892,
          featured: false,
        },
      ],
    },
    {
      id: 2,
      name: "Code Masters",
      logo: "CM",
      description:
        "Web development focused club with expertise in modern frameworks and technologies. We organize workshops, hackathons, and networking events.",
      memberCount: 892,
      hackathonCount: 5,
      rating: 4.5,
      location: "Oran, Algeria",
      isVerified: true,
      coverImage:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop",
      website: "https://codemasters-oran.com",
      socialMedia: {
        twitter: "@codemasters_oran",
        linkedin: "code-masters-oran",
        github: "codemasters-oran",
      },
      hackathons: [
        {
          id: 3,
          title: "Mobile App Contest",
          description:
            "Create innovative mobile applications for iOS and Android. Focus on user experience and modern design patterns.",
          participants: 567,
          maxParticipants: 800,
          prize: "$20,000",
          startDate: "2024-03-10",
          endDate: "2024-03-12",
          registrationDeadline: "2024-03-05",
          status: "upcoming",
          tags: [
            "React Native",
            "Flutter",
            "Mobile",
            "UI/UX",
            "iOS",
            "Android",
          ],
          likes: 289,
          views: 1456,
          featured: true,
        },
      ],
    },
    {
      id: 3,
      name: "AI Enthusiasts",
      logo: "AIE",
      description:
        "Artificial Intelligence and Machine Learning focused community. We explore cutting-edge AI technologies and organize specialized hackathons.",
      memberCount: 567,
      hackathonCount: 12,
      rating: 4.9,
      location: "Algiers, Algeria",
      isVerified: true,
      coverImage:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
      website: "https://ai-enthusiasts.dz",
      socialMedia: {
        twitter: "@ai_enthusiasts_dz",
        linkedin: "ai-enthusiasts-algeria",
        github: "ai-enthusiasts-dz",
      },
      hackathons: [
        {
          id: 4,
          title: "Deep Learning Challenge",
          description:
            "Explore deep learning techniques and build neural networks for real-world applications. Perfect for AI enthusiasts!",
          participants: 234,
          maxParticipants: 500,
          prize: "$18,000",
          startDate: "2024-04-15",
          endDate: "2024-04-17",
          registrationDeadline: "2024-04-10",
          status: "upcoming",
          tags: [
            "Deep Learning",
            "Neural Networks",
            "TensorFlow",
            "PyTorch",
            "Computer Vision",
          ],
          likes: 178,
          views: 892,
          featured: false,
        },
      ],
    },
    {
      id: 4,
      name: "Crypto Club",
      logo: "CC",
      description:
        "Blockchain and cryptocurrency enthusiasts. We organize hackathons focused on DeFi, smart contracts, and Web3 technologies.",
      memberCount: 345,
      hackathonCount: 6,
      rating: 4.7,
      location: "Online",
      isVerified: true,
      coverImage:
        "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=400&fit=crop",
      website: "https://cryptoclub.dz",
      socialMedia: {
        twitter: "@cryptoclub_dz",
        linkedin: "crypto-club-algeria",
        github: "cryptoclub-dz",
      },
      hackathons: [
        {
          id: 5,
          title: "Blockchain & DeFi Hackathon",
          description:
            "Explore the world of blockchain and cryptocurrency. Build decentralized applications and smart contracts.",
          participants: 234,
          maxParticipants: 500,
          prize: "$30,000",
          startDate: "2024-04-05",
          endDate: "2024-04-07",
          registrationDeadline: "2024-04-01",
          status: "upcoming",
          tags: ["Blockchain", "Solidity", "Web3", "DeFi", "Smart Contracts"],
          likes: 178,
          views: 892,
          featured: false,
        },
      ],
    },
  ];

  const filters = [
    { id: "all", label: "All Clubs", count: clubs.length },
    {
      id: "verified",
      label: "Verified",
      count: clubs.filter((c) => c.isVerified).length,
    },
    {
      id: "trending",
      label: "Trending",
      count: clubs.filter((c) => c.rating >= 4.5).length,
    },
    {
      id: "local",
      label: "Local",
      count: clubs.filter((c) => c.location !== "Online").length,
    },
  ];

  const filteredClubs = clubs.filter((club) => {
    const matchesSearch =
      club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      club.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      selectedFilter === "all" ||
      (selectedFilter === "verified" && club.isVerified) ||
      (selectedFilter === "trending" && club.rating >= 4.5) ||
      (selectedFilter === "local" && club.location !== "Online");

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-8 p-6">
      {/* Page Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-white">Tech Clubs</h1>
        <p className="text-xl text-[#C7C7C7] max-w-2xl mx-auto">
          Discover hackathons organized by leading tech clubs and communities
        </p>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        {/* Search */}
        <div className="relative max-w-2xl mx-auto">
          <Search
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#A0A0A0]"
            size={20}
          />
          <input
            type="text"
            placeholder="Search clubs, technologies, or locations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-[#1A1A1A] border border-white/10 rounded-xl text-white placeholder-[#A0A0A0] focus:outline-none focus:ring-2 focus:ring-[#00CFFF] focus:border-transparent transition-all duration-300"
          />
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedFilter === filter.id
                  ? "bg-gradient-to-r from-[#1E3C72] to-[#00CFFF] text-white shadow-lg"
                  : "bg-[#1A1A1A] text-[#C7C7C7] hover:bg-white/5 hover:text-white border border-white/10"
              }`}
            >
              <span>{filter.label}</span>
              <span
                className={`px-2 py-0.5 rounded-full text-xs ${
                  selectedFilter === filter.id
                    ? "bg-white/20"
                    : "bg-[#00CFFF]/20 text-[#00CFFF]"
                }`}
              >
                {filter.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="text-center">
        <p className="text-[#A0A0A0]">
          Showing {filteredClubs.length} of {clubs.length} clubs
        </p>
      </div>

      {/* Clubs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredClubs.map((club, index) => (
          <div
            key={club.id}
            className="group relative overflow-hidden rounded-2xl bg-[#121212] border border-white/10 hover:border-[#00CFFF]/30 transition-all duration-300 hover:shadow-2xl hover:shadow-[#00CFFF]/10 animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Club Header */}
            <div className="relative h-48 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#1E3C72]/80 to-[#000000]/80"></div>
              <div className="absolute top-4 left-4">
                <div className="w-12 h-12 bg-gradient-to-r from-[#1E3C72] to-[#00CFFF] rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">
                    {club.logo}
                  </span>
                </div>
              </div>
              {club.isVerified && (
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-[#00C853]/20 text-[#00C853] text-xs font-medium rounded-full backdrop-blur-sm">
                    Verified
                  </span>
                </div>
              )}
            </div>

            {/* Club Info */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-white group-hover:text-[#00CFFF] transition-colors mb-2">
                    {club.name}
                  </h3>
                  <p className="text-[#C7C7C7] text-sm mb-3">
                    {club.description}
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">
                    {club.memberCount.toLocaleString()}
                  </div>
                  <div className="text-xs text-[#A0A0A0]">Members</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">
                    {club.hackathonCount}
                  </div>
                  <div className="text-xs text-[#A0A0A0]">Hackathons</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">
                    {club.rating}
                  </div>
                  <div className="text-xs text-[#A0A0A0]">Rating</div>
                </div>
              </div>

              {/* Location and Rating */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <MapPin size={16} className="text-[#A0A0A0]" />
                  <span className="text-sm text-[#C7C7C7]">
                    {club.location}
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star
                    size={16}
                    className="text-[#00CFFF]"
                    fill="currentColor"
                  />
                  <span className="text-sm text-[#C7C7C7]">{club.rating}</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex items-center space-x-3 mb-6">
                {club.website && (
                  <a
                    href={club.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#00CFFF] hover:text-white transition-colors"
                  >
                    <Globe size={16} />
                  </a>
                )}
                {club.socialMedia.twitter && (
                  <a
                    href={`https://twitter.com/${club.socialMedia.twitter.replace("@", "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#00CFFF] hover:text-white transition-colors"
                  >
                    <span className="text-sm">Twitter</span>
                  </a>
                )}
                {club.socialMedia.linkedin && (
                  <a
                    href={`https://linkedin.com/company/${club.socialMedia.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#00CFFF] hover:text-white transition-colors"
                  >
                    <span className="text-sm">LinkedIn</span>
                  </a>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 mt-6">
                <Link
                  href={`/dashboard/clubs/${club.id}`}
                  className="flex-1 btn-primary text-sm py-3 text-center"
                >
                  View Club Details
                </Link>
                <button className="btn-secondary text-sm py-3 px-4">
                  <Share2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredClubs.length === 0 && (
        <div className="card p-12 text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-[#1E3C72] to-[#00CFFF] rounded-full flex items-center justify-center mx-auto mb-4">
            <Building size={32} className="text-white" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">No clubs found</h3>
          <p className="text-[#A0A0A0] mb-6">
            Try adjusting your search terms or filters to find what you&apos;re
            looking for.
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
