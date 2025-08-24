"use client";

import { useState, useEffect } from "react";
import {
  MapPin,
  Users,
  Trophy,
  Calendar,
  Star,
  ExternalLink,
  Heart,
  Share2,
  Building,
  Globe,
  Twitter,
  Linkedin,
  Github,
  ArrowLeft,
  Clock,
} from "lucide-react";
import Link from "next/link";

interface Club {
  id: number;
  name: string;
  logo: string;
  description: string;
  memberCount: number;
  hackathonCount: number;
  rating: number;
  location: string;
  isVerified: boolean;
  coverImage: string;
  website: string;
  socialMedia: {
    twitter: string;
    linkedin: string;
    github: string;
  };
  hackathons: Array<{
    id: number;
    title: string;
    description: string;
    participants: number;
    maxParticipants: number;
    prize: string;
    startDate: string;
    endDate: string;
    registrationDeadline: string;
    status: string;
    tags: string[];
    likes: number;
    views: number;
    featured: boolean;
  }>;
}

export default function ClubDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const [club, setClub] = useState<Club | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Mock data - in a real app, this would come from an API

  useEffect(() => {
    // Simulate API call
    const mockClubs: Club[] = [
      {
        id: 1,
        name: "Tech Club Algiers",
        logo: "TCA",
        description:
          "Leading technology club in Algiers, organizing innovative hackathons and tech events. We focus on AI, web development, and mobile technologies. Our mission is to foster innovation and create opportunities for tech enthusiasts to collaborate, learn, and build amazing projects together.",
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
            tags: [
              "AI",
              "Machine Learning",
              "Python",
              "Computer Vision",
              "NLP",
            ],
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
            tags: [
              "React",
              "Node.js",
              "JavaScript",
              "Full Stack",
              "TypeScript",
            ],
            likes: 156,
            views: 892,
            featured: false,
          },
          {
            id: 3,
            title: "Mobile App Development Contest",
            description:
              "Create innovative mobile applications for iOS and Android platforms. Focus on user experience and modern design patterns.",
            participants: 567,
            maxParticipants: 800,
            prize: "$20,000",
            startDate: "2024-01-15",
            endDate: "2024-01-17",
            registrationDeadline: "2024-01-10",
            status: "completed",
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
            id: 4,
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
    ];

    const fetchClub = async () => {
      setLoading(true);
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      const foundClub = mockClubs.find((c) => c.id === parseInt(params.id));
      setClub(foundClub || null);
      setFollowersCount(foundClub?.memberCount || 0);
      setLoading(false);
    };

    fetchClub();
  }, [params.id]);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    setFollowersCount((prev) => (isFollowing ? prev - 1 : prev + 1));
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: club?.name,
        text: `Check out ${club?.name} on our platform!`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      // You could add a toast notification here
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#00CFFF] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white">Loading club details...</p>
        </div>
      </div>
    );
  }

  if (!club) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-[#1E3C72] to-[#00CFFF] rounded-full flex items-center justify-center mx-auto mb-4">
            <Building size={32} className="text-white" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Club not found</h3>
          <p className="text-[#A0A0A0] mb-6">
            The club you&#39;re looking for doesn&#39;t exist or has been
            removed.
          </p>
          <Link href="/dashboard/clubs" className="btn-primary">
            Back to Clubs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* Back Button */}
      <div className="p-6">
        <Link
          href="/dashboard/clubs"
          className="inline-flex items-center space-x-2 text-[#00CFFF] hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back to Clubs</span>
        </Link>
      </div>

      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${club.coverImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#1E3C72]/80 to-[#000000]/80"></div>
        </div>

        <div className="relative h-full flex items-end p-8">
          <div className="flex items-end space-x-6 w-full">
            {/* Club Logo */}
            <div className="w-24 h-24 bg-gradient-to-r from-[#1E3C72] to-[#00CFFF] rounded-2xl flex items-center justify-center shadow-2xl">
              <span className="text-white font-bold text-3xl">{club.logo}</span>
            </div>

            {/* Club Info */}
            <div className="flex-1 text-white">
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-4xl font-bold">{club.name}</h1>
                {club.isVerified && (
                  <span className="px-3 py-1 bg-[#00C853]/20 text-[#00C853] text-sm font-medium rounded-full backdrop-blur-sm">
                    Verified
                  </span>
                )}
              </div>
              <p className="text-xl text-[#C7C7C7] mb-4 max-w-2xl">
                {club.description}
              </p>

              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <MapPin size={20} className="text-[#A0A0A0]" />
                  <span className="text-[#C7C7C7]">{club.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star
                    size={20}
                    className="text-[#00CFFF]"
                    fill="currentColor"
                  />
                  <span className="text-[#C7C7C7]">{club.rating}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users size={20} className="text-[#A0A0A0]" />
                  <span className="text-[#C7C7C7]">
                    {club.memberCount.toLocaleString()} members
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              <button
                onClick={handleFollow}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  isFollowing
                    ? "bg-[#00C853] text-white hover:bg-[#00A843]"
                    : "bg-[#1A1A1A] text-white border border-white/20 hover:bg-white/10"
                }`}
              >
                <Heart size={18} fill={isFollowing ? "currentColor" : "none"} />
                <span>{isFollowing ? "Following" : "Follow"}</span>
              </button>

              <button
                onClick={handleShare}
                className="p-3 bg-[#1A1A1A] text-white border border-white/20 rounded-xl hover:bg-white/10 transition-all duration-200"
              >
                <Share2 size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <div className="bg-[#121212] rounded-2xl p-6 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4">
                About {club.name}
              </h2>
              <p className="text-[#C7C7C7] leading-relaxed">
                {club.description}
              </p>
            </div>

            {/* Hackathons Section */}
            <div className="bg-[#121212] rounded-2xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center">
                  <Trophy size={24} className="mr-3 text-[#00CFFF]" />
                  Hackathons ({club.hackathonCount})
                </h2>
                <Link
                  href={`/dashboard/hackathons?club=${club.id}`}
                  className="text-[#00CFFF] hover:text-white transition-colors flex items-center space-x-2"
                >
                  <span>View All</span>
                  <ExternalLink size={16} />
                </Link>
              </div>

              <div className="space-y-4">
                {club.hackathons.map((hackathon) => (
                  <div
                    key={hackathon.id}
                    className="bg-[#1A1A1A] rounded-xl p-6 border border-white/5 hover:border-[#00CFFF]/20 transition-all duration-200"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-xl font-semibold text-white">
                            {hackathon.title}
                          </h3>
                          {hackathon.featured && (
                            <span className="px-2 py-1 bg-[#00CFFF]/20 text-[#00CFFF] text-xs font-medium rounded-full">
                              Featured
                            </span>
                          )}
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                              hackathon.status === "upcoming"
                                ? "bg-[#00C853]/20 text-[#00C853]"
                                : "bg-[#A0A0A0]/20 text-[#A0A0A0]"
                            }`}
                          >
                            {hackathon.status === "upcoming"
                              ? "Upcoming"
                              : "Completed"}
                          </span>
                        </div>
                        <p className="text-[#A0A0A0] mb-4">
                          {hackathon.description}
                        </p>
                      </div>
                    </div>

                    {/* Hackathon Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-lg font-bold text-white">
                          {hackathon.participants.toLocaleString()}
                        </div>
                        <div className="text-xs text-[#A0A0A0]">
                          Participants
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-white">
                          {hackathon.prize}
                        </div>
                        <div className="text-xs text-[#A0A0A0]">Prize Pool</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-white">
                          {hackathon.likes}
                        </div>
                        <div className="text-xs text-[#A0A0A0]">Likes</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-white">
                          {hackathon.views.toLocaleString()}
                        </div>
                        <div className="text-xs text-[#A0A0A0]">Views</div>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {hackathon.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-[#1E3C72]/20 text-[#00CFFF] text-xs font-medium rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Dates */}
                    <div className="flex items-center justify-between text-sm text-[#A0A0A0] mb-4">
                      <div className="flex items-center space-x-2">
                        <Calendar size={16} />
                        <span>
                          {new Date(hackathon.startDate).toLocaleDateString()} -{" "}
                          {new Date(hackathon.endDate).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock size={16} />
                        <span>
                          Registration:{" "}
                          {new Date(
                            hackathon.registrationDeadline,
                          ).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-3">
                      <Link
                        href={`/dashboard/hackathons/${hackathon.id}`}
                        className="flex-1 btn-primary text-center"
                      >
                        View Details
                      </Link>
                      <button className="btn-secondary px-4">
                        <Share2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Stats Card */}
            <div className="bg-[#121212] rounded-2xl p-6 border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-4">
                Club Statistics
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[#A0A0A0]">Total Members</span>
                  <span className="text-white font-semibold">
                    {club.memberCount.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#A0A0A0]">Hackathons Organized</span>
                  <span className="text-white font-semibold">
                    {club.hackathonCount}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#A0A0A0]">Average Rating</span>
                  <div className="flex items-center space-x-1">
                    <Star
                      size={16}
                      className="text-[#00CFFF]"
                      fill="currentColor"
                    />
                    <span className="text-white font-semibold">
                      {club.rating}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#A0A0A0]">Followers</span>
                  <span className="text-white font-semibold">
                    {followersCount.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Contact & Social */}
            <div className="bg-[#121212] rounded-2xl p-6 border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-4">
                Contact & Social
              </h3>
              <div className="space-y-4">
                {club.website && (
                  <a
                    href={club.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 text-[#00CFFF] hover:text-white transition-colors"
                  >
                    <Globe size={18} />
                    <span>Website</span>
                  </a>
                )}
                {club.socialMedia.twitter && (
                  <a
                    href={`https://twitter.com/${club.socialMedia.twitter.replace("@", "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 text-[#00CFFF] hover:text-white transition-colors"
                  >
                    <Twitter size={18} />
                    <span>Twitter</span>
                  </a>
                )}
                {club.socialMedia.linkedin && (
                  <a
                    href={`https://linkedin.com/company/${club.socialMedia.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 text-[#00CFFF] hover:text-white transition-colors"
                  >
                    <Linkedin size={18} />
                    <span>LinkedIn</span>
                  </a>
                )}
                {club.socialMedia.github && (
                  <a
                    href={`https://github.com/${club.socialMedia.github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 text-[#00CFFF] hover:text-white transition-colors"
                  >
                    <Github size={18} />
                    <span>GitHub</span>
                  </a>
                )}
              </div>
            </div>

            {/* Location */}
            <div className="bg-[#121212] rounded-2xl p-6 border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-4">
                Location
              </h3>
              <div className="flex items-center space-x-3 text-[#C7C7C7]">
                <MapPin size={18} className="text-[#A0A0A0]" />
                <span>{club.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
