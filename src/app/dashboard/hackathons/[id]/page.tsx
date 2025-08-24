"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  Clock,
  Users,
  Trophy,
  Calendar,
  Star,
  Heart,
  Share2,
  Building,
  Tag,
  Award,
  CheckCircle,
  X,
  User,
  Users as TeamIcon,
} from "lucide-react";

interface Hackathon {
  id: number;
  title: string;
  organization: string;
  organizationLogo: string;
  description: string;
  participants: number;
  maxParticipants: number;
  prize: string;
  prizeBreakdown: Array<{ place: string; amount: string }>;
  tags: string[];
  status: string;
  startDate: string;
  endDate: string;
  registrationDeadline: string;
  location: string;
  isOnline: boolean;
  isExternal: boolean;
  difficulty: string;
  rating: number;
  likes: number;
  views: number;
  featured: boolean;
  timeLeft: string;
  coverImage: string;
  type: string;
  sponsors: Array<{
    name: string;
    logo: string;
    tier: string;
    description: string;
  }>;
  pricing: {
    registrationFee: string;
    earlyBirdFee?: string;
    earlyBirdDeadline?: string;
    includes: string[];
  };
  schedule: Array<{
    day: string;
    date: string;
    events: Array<{
      time: string;
      title: string;
      description: string;
      type: string;
    }>;
  }>;
}

export default function HackathonDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const [hackathon, setHackathon] = useState<Hackathon | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [registrationForm, setRegistrationForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    teamName: "",
    teamSize: "1",
    experience: "beginner",
    github: "",
    linkedin: "",
    portfolio: "",
    motivation: "",
    agreeToTerms: false,
  });

  // Mock data - in a real app, this would come from an API

  useEffect(() => {
    // Simulate API call
    const mockHackathons: Hackathon[] = [
      {
        id: 1,
        title: "AI Innovation Challenge 2024",
        organization: "Tech Club Algiers",
        organizationLogo: "TCA",
        description:
          "Build innovative AI solutions to solve real-world problems. Focus on machine learning, computer vision, and natural language processing. Join thousands of developers worldwide in this exciting challenge!",
        participants: 1247,
        maxParticipants: 2000,
        prize: "$25,000",
        prizeBreakdown: [
          { place: "1st", amount: "$10,000" },
          { place: "2nd", amount: "$7,000" },
          { place: "3rd", amount: "$5,000" },
          { place: "Special", amount: "$3,000" },
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
        coverImage:
          "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
        type: "hackathon",
        sponsors: [
          {
            name: "TechCorp",
            logo: "TC",
            tier: "Platinum",
            description: "Leading AI technology company",
          },
          {
            name: "Innovation Labs",
            logo: "IL",
            tier: "Gold",
            description: "Research and development firm",
          },
          {
            name: "StartupHub",
            logo: "SH",
            tier: "Silver",
            description: "Startup accelerator and incubator",
          },
        ],
        pricing: {
          registrationFee: "$50",
          earlyBirdFee: "$30",
          earlyBirdDeadline: "2024-01-31",
          includes: [
            "Access to all workshops and sessions",
            "Meals and refreshments",
            "Networking opportunities",
            "Swag bag with tech goodies",
            "Certificate of participation",
          ],
        },
        schedule: [
          {
            day: "Day 1",
            date: "2024-02-15",
            events: [
              {
                time: "09:00 AM",
                title: "Registration & Check-in",
                description: "Welcome desk opens for participant registration",
                type: "registration",
              },
              {
                time: "10:00 AM",
                title: "Opening Ceremony & Keynote",
                description: "Welcome speech and keynote from industry experts",
                type: "ceremony",
              },
              {
                time: "11:00 AM",
                title: "Team Formation & Networking",
                description: "Meet other participants and form teams",
                type: "networking",
              },
              {
                time: "12:00 PM",
                title: "Hackathon Begins",
                description: "Official start of the coding challenge",
                type: "hacking",
              },
              {
                time: "02:00 PM",
                title: "AI/ML Workshop",
                description: "Hands-on workshop on AI and machine learning",
                type: "workshop",
              },
              {
                time: "06:00 PM",
                title: "Dinner & Networking",
                description: "Evening meal and networking session",
                type: "networking",
              },
            ],
          },
          {
            day: "Day 2",
            date: "2024-02-16",
            events: [
              {
                time: "08:00 AM",
                title: "Breakfast",
                description: "Morning meal and team check-ins",
                type: "meal",
              },
              {
                time: "09:00 AM",
                title: "Mentorship Sessions",
                description: "One-on-one mentoring with industry experts",
                type: "mentorship",
              },
              {
                time: "12:00 PM",
                title: "Lunch & Team Check-ins",
                description: "Midday meal and progress updates",
                type: "meal",
              },
              {
                time: "03:00 PM",
                title: "Technical Workshops",
                description: "Advanced technical sessions",
                type: "workshop",
              },
              {
                time: "06:00 PM",
                title: "Dinner",
                description: "Evening meal",
                type: "meal",
              },
              {
                time: "08:00 PM",
                title: "Late Night Coding",
                description: "Extended hacking session",
                type: "hacking",
              },
            ],
          },
          {
            day: "Day 3",
            date: "2024-02-17",
            events: [
              {
                time: "08:00 AM",
                title: "Breakfast",
                description: "Final day breakfast",
                type: "meal",
              },
              {
                time: "10:00 AM",
                title: "Submission Deadline",
                description: "All projects must be submitted",
                type: "deadline",
              },
              {
                time: "11:00 AM",
                title: "Project Presentations",
                description: "Teams present their solutions",
                type: "presentation",
              },
              {
                time: "02:00 PM",
                title: "Judging & Deliberation",
                description: "Judges evaluate all projects",
                type: "judging",
              },
              {
                time: "04:00 PM",
                title: "Awards Ceremony",
                description: "Announcement of winners and prizes",
                type: "ceremony",
              },
              {
                time: "06:00 PM",
                title: "Closing & Networking",
                description: "Final networking and farewell",
                type: "networking",
              },
            ],
          },
        ],
      },
      {
        id: 2,
        title: "Mobile App Contest",
        organization: "Innovation Hub",
        organizationLogo: "IH",
        description:
          "Create innovative mobile applications for iOS and Android. Focus on user experience and modern design patterns. Show off your mobile development skills!",
        participants: 567,
        maxParticipants: 800,
        prize: "$20,000",
        prizeBreakdown: [
          { place: "1st", amount: "$8,000" },
          { place: "2nd", amount: "$5,000" },
          { place: "3rd", amount: "$4,000" },
          { place: "Special", amount: "$3,000" },
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
        coverImage:
          "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=400&fit=crop",
        type: "hackathon",
        sponsors: [
          {
            name: "MobileTech",
            logo: "MT",
            tier: "Platinum",
            description: "Mobile technology solutions",
          },
          {
            name: "AppWorks",
            logo: "AW",
            tier: "Gold",
            description: "Mobile app development platform",
          },
        ],
        pricing: {
          registrationFee: "$40",
          earlyBirdFee: "$25",
          earlyBirdDeadline: "2024-02-28",
          includes: [
            "Access to mobile development tools",
            "Workshop materials",
            "Lunch and snacks",
            "Networking opportunities",
            "Participation certificate",
          ],
        },
        schedule: [
          {
            day: "Day 1",
            date: "2024-03-10",
            events: [
              {
                time: "09:00 AM",
                title: "Registration & Welcome",
                description: "Check-in and welcome session",
                type: "registration",
              },
              {
                time: "10:00 AM",
                title: "Mobile Development Workshop",
                description: "Introduction to mobile app development",
                type: "workshop",
              },
              {
                time: "12:00 PM",
                title: "Contest Begins",
                description: "Start of the mobile app contest",
                type: "hacking",
              },
            ],
          },
          {
            day: "Day 2",
            date: "2024-03-11",
            events: [
              {
                time: "09:00 AM",
                title: "Development Continues",
                description: "Continued app development",
                type: "hacking",
              },
              {
                time: "02:00 PM",
                title: "UI/UX Workshop",
                description: "Mobile design best practices",
                type: "workshop",
              },
            ],
          },
          {
            day: "Day 3",
            date: "2024-03-12",
            events: [
              {
                time: "10:00 AM",
                title: "Submission Deadline",
                description: "All apps must be submitted",
                type: "deadline",
              },
              {
                time: "02:00 PM",
                title: "Presentations & Awards",
                description: "App demos and winner announcement",
                type: "presentation",
              },
            ],
          },
        ],
      },
    ];

    const fetchHackathon = async () => {
      setLoading(true);
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      const foundHackathon = mockHackathons.find(
        (h) => h.id === parseInt(params.id),
      );
      setHackathon(foundHackathon || null);
      setLoading(false);
    };

    fetchHackathon();
  }, [params.id]);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleRegister = () => {
    setShowRegistrationModal(true);
  };

  const handleRegistrationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the registration data to your backend
    console.log("Registration submitted:", {
      hackathon,
      form: registrationForm,
    });

    // Close modal and reset form
    setShowRegistrationModal(false);
    setIsRegistered(true);
    setRegistrationForm({
      fullName: "",
      email: "",
      phone: "",
      teamName: "",
      teamSize: "1",
      experience: "beginner",
      github: "",
      linkedin: "",
      portfolio: "",
      motivation: "",
      agreeToTerms: false,
    });

    // You could show a success message here
    alert("Registration submitted successfully!");
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setRegistrationForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const getEventTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "registration":
        return "bg-[#00C853]/20 text-[#00C853]";
      case "ceremony":
        return "bg-[#00CFFF]/20 text-[#00CFFF]";
      case "networking":
        return "bg-[#6A00FF]/20 text-[#6A00FF]";
      case "hacking":
        return "bg-[#FF3B30]/20 text-[#FF3B30]";
      case "workshop":
        return "bg-[#FF9500]/20 text-[#FF9500]";
      case "meal":
        return "bg-[#34C759]/20 text-[#34C759]";
      case "mentorship":
        return "bg-[#AF52DE]/20 text-[#AF52DE]";
      case "deadline":
        return "bg-[#FF3B30]/20 text-[#FF3B30]";
      case "presentation":
        return "bg-[#007AFF]/20 text-[#007AFF]";
      case "judging":
        return "bg-[#FF9500]/20 text-[#FF9500]";
      default:
        return "bg-[#A0A0A0]/20 text-[#A0A0A0]";
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: hackathon?.title,
        text: `Check out this amazing hackathon: ${hackathon?.title}!`,
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
          <p className="text-white">Loading hackathon details...</p>
        </div>
      </div>
    );
  }

  if (!hackathon) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-[#1E3C72] to-[#00CFFF] rounded-full flex items-center justify-center mx-auto mb-4">
            <Trophy size={32} className="text-white" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">
            Hackathon not found
          </h3>
          <p className="text-[#A0A0A0] mb-6">
            The hackathon you&apos;re looking for doesn&apos;t exist or has been
            removed.
          </p>
          <Link href="/dashboard/hackathons" className="btn-primary">
            Back to Hackathons
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
          href="/dashboard/hackathons"
          className="inline-flex items-center space-x-2 text-[#00CFFF] hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back to Hackathons</span>
        </Link>
      </div>

      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${hackathon.coverImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#1E3C72]/80 to-[#000000]/80"></div>
        </div>

        <div className="relative h-full flex items-end p-8">
          <div className="flex items-end space-x-6 w-full">
            {/* Organization Logo */}
            <div className="w-20 h-20 bg-gradient-to-r from-[#1E3C72] to-[#00CFFF] rounded-2xl flex items-center justify-center shadow-2xl">
              <span className="text-white font-bold text-2xl">
                {hackathon.organizationLogo}
              </span>
            </div>

            {/* Hackathon Info */}
            <div className="flex-1 text-white">
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-4xl font-bold">{hackathon.title}</h1>
                {hackathon.featured && (
                  <span className="px-3 py-1 bg-[#00CFFF]/20 text-[#00CFFF] text-sm font-medium rounded-full backdrop-blur-sm">
                    Featured
                  </span>
                )}
                <span
                  className={`px-3 py-1 text-sm font-medium rounded-full ${
                    hackathon.status === "upcoming"
                      ? "bg-[#00C853]/20 text-[#00C853]"
                      : "bg-[#A0A0A0]/20 text-[#A0A0A0]"
                  }`}
                >
                  {hackathon.status === "upcoming" ? "Upcoming" : "Completed"}
                </span>
              </div>
              <p className="text-xl text-[#C7C7C7] mb-4">
                {hackathon.organization}
              </p>

              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <MapPin size={20} className="text-[#A0A0A0]" />
                  <span className="text-[#C7C7C7]">{hackathon.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star
                    size={20}
                    className="text-[#00CFFF]"
                    fill="currentColor"
                  />
                  <span className="text-[#C7C7C7]">{hackathon.rating}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users size={20} className="text-[#A0A0A0]" />
                  <span className="text-[#C7C7C7]">
                    {hackathon.participants.toLocaleString()} participants
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              <button
                onClick={handleLike}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  isLiked
                    ? "bg-[#FF3B30] text-white hover:bg-[#E02E24]"
                    : "bg-[#1A1A1A] text-white border border-white/20 hover:bg-white/10"
                }`}
              >
                <Heart size={18} fill={isLiked ? "currentColor" : "none"} />
                <span>{isLiked ? "Liked" : "Like"}</span>
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
            {/* Description */}
            <div className="bg-[#121212] rounded-2xl p-6 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4">
                About This Hackathon
              </h2>
              <p className="text-[#C7C7C7] leading-relaxed text-lg">
                {hackathon.description}
              </p>
            </div>

            {/* Prize Breakdown */}
            <div className="bg-[#121212] rounded-2xl p-6 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Trophy size={24} className="mr-3 text-[#00CFFF]" />
                Prize Pool: {hackathon.prize}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {hackathon.prizeBreakdown.map((prize, index) => (
                  <div
                    key={index}
                    className="bg-[#1A1A1A] rounded-xl p-4 border border-white/5"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-lg font-semibold text-white">
                        {prize.place} Place
                      </span>
                      <span className="text-2xl font-bold text-[#00CFFF]">
                        {prize.amount}
                      </span>
                    </div>
                    <div className="w-full bg-[#2A2A2A] rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-[#1E3C72] to-[#00CFFF] h-2 rounded-full"
                        style={{ width: `${100 - index * 15}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="bg-[#121212] rounded-2xl p-6 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <Tag size={24} className="mr-3 text-[#00CFFF]" />
                Technologies & Skills
              </h2>
              <div className="flex flex-wrap gap-3">
                {hackathon.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-[#1E3C72]/20 text-[#00CFFF] text-sm font-medium rounded-full border border-[#00CFFF]/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Event Type */}
            <div className="bg-[#121212] rounded-2xl p-6 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <Award size={24} className="mr-3 text-[#00CFFF]" />
                Event Type
              </h2>
              <div className="flex items-center space-x-3">
                <span className="px-4 py-2 bg-gradient-to-r from-[#1E3C72] to-[#00CFFF] text-white text-sm font-medium rounded-full">
                  {hackathon.type.charAt(0).toUpperCase() +
                    hackathon.type.slice(1)}
                </span>
                <span className="text-[#C7C7C7] text-sm">
                  {hackathon.type === "hackathon" &&
                    "Build innovative solutions in a time-limited environment"}
                  {hackathon.type === "ideathon" &&
                    "Focus on generating and developing innovative ideas"}
                  {hackathon.type === "ctf" &&
                    "Capture The Flag - cybersecurity challenges and competitions"}
                  {hackathon.type === "datathon" &&
                    "Data science and analytics focused competition"}
                </span>
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-[#121212] rounded-2xl p-6 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <Trophy size={24} className="mr-3 text-[#00CFFF]" />
                Registration & Pricing
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#1A1A1A] rounded-xl p-4 border border-white/5">
                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold text-white mb-2">
                      {hackathon.pricing.registrationFee}
                    </div>
                    <div className="text-[#A0A0A0] text-sm">
                      Regular Registration
                    </div>
                  </div>
                  {hackathon.pricing.earlyBirdFee && (
                    <div className="text-center mb-4 p-3 bg-[#00C853]/10 rounded-lg">
                      <div className="text-2xl font-bold text-[#00C853] mb-1">
                        {hackathon.pricing.earlyBirdFee}
                      </div>
                      <div className="text-[#00C853] text-sm">
                        Early Bird (Until{" "}
                        {new Date(
                          hackathon.pricing.earlyBirdDeadline!,
                        ).toLocaleDateString()}
                        )
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">
                    What&apos;s Included:
                  </h3>
                  <ul className="space-y-2">
                    {hackathon.pricing.includes.map((item, index) => (
                      <li
                        key={index}
                        className="flex items-center space-x-2 text-[#C7C7C7]"
                      >
                        <div className="w-2 h-2 bg-[#00CFFF] rounded-full"></div>
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Schedule */}
            <div className="bg-[#121212] rounded-2xl p-6 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Calendar size={24} className="mr-3 text-[#00CFFF]" />
                Event Schedule
              </h2>

              <div className="space-y-6">
                {hackathon.schedule.map((day, dayIndex) => (
                  <div
                    key={dayIndex}
                    className="border-l-4 border-[#00CFFF] pl-6"
                  >
                    <h3 className="text-xl font-bold text-white mb-2">
                      {day.day} - {new Date(day.date).toLocaleDateString()}
                    </h3>
                    <div className="space-y-4">
                      {day.events.map((event, eventIndex) => (
                        <div
                          key={eventIndex}
                          className="bg-[#1A1A1A] rounded-lg p-4 border border-white/5"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center space-x-3">
                              <div className="w-12 text-[#00CFFF] font-semibold text-sm">
                                {event.time}
                              </div>
                              <h4 className="text-white font-semibold">
                                {event.title}
                              </h4>
                            </div>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${getEventTypeColor(event.type)}`}
                            >
                              {event.type.charAt(0).toUpperCase() +
                                event.type.slice(1)}
                            </span>
                          </div>
                          <p className="text-[#A0A0A0] text-sm ml-15">
                            {event.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sponsors */}
            <div className="bg-[#121212] rounded-2xl p-6 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Building size={24} className="mr-3 text-[#00CFFF]" />
                Our Sponsors
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {hackathon.sponsors.map((sponsor, index) => (
                  <div
                    key={index}
                    className="bg-[#1A1A1A] rounded-xl p-4 border border-white/5 hover:border-[#00CFFF]/20 transition-colors"
                  >
                    <div className="text-center space-y-3">
                      <div
                        className={`w-16 h-16 rounded-xl flex items-center justify-center mx-auto ${
                          sponsor.tier === "Platinum"
                            ? "bg-gradient-to-r from-[#E5E4E2] to-[#B8860B]"
                            : sponsor.tier === "Gold"
                              ? "bg-gradient-to-r from-[#FFD700] to-[#FFA500]"
                              : "bg-gradient-to-r from-[#C0C0C0] to-[#808080]"
                        }`}
                      >
                        <span className="text-white font-bold text-lg">
                          {sponsor.logo}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">
                          {sponsor.name}
                        </h3>
                        <div
                          className={`text-sm font-medium ${
                            sponsor.tier === "Platinum"
                              ? "text-[#E5E4E2]"
                              : sponsor.tier === "Gold"
                                ? "text-[#FFD700]"
                                : "text-[#C0C0C0]"
                          }`}
                        >
                          {sponsor.tier} Sponsor
                        </div>
                        <p className="text-[#A0A0A0] text-xs mt-1">
                          {sponsor.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Registration Card */}
            <div className="bg-[#121212] rounded-2xl p-6 border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-4">
                Registration
              </h3>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-[#A0A0A0]">Participants</span>
                  <span className="text-white font-semibold">
                    {hackathon.participants.toLocaleString()}/
                    {hackathon.maxParticipants.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#A0A0A0]">Difficulty</span>
                  <span className="text-white font-semibold">
                    {hackathon.difficulty}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#A0A0A0]">Format</span>
                  <span className="text-white font-semibold">
                    {hackathon.isOnline ? "Online" : "In-Person"}
                  </span>
                </div>
              </div>

              <button
                onClick={handleRegister}
                className={`w-full py-4 rounded-xl font-semibold transition-all duration-200 ${
                  isRegistered
                    ? "bg-[#00C853] text-white hover:bg-[#00A843]"
                    : "btn-primary"
                }`}
              >
                {isRegistered ? (
                  <div className="flex items-center justify-center space-x-2">
                    <CheckCircle size={18} />
                    <span>Registered</span>
                  </div>
                ) : (
                  <span>Register Now</span>
                )}
              </button>
            </div>

            {/* Important Dates */}
            <div className="bg-[#121212] rounded-2xl p-6 border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-4">
                Important Dates
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Calendar size={18} className="text-[#A0A0A0]" />
                  <div>
                    <div className="text-white font-medium">
                      Registration Deadline
                    </div>
                    <div className="text-[#A0A0A0] text-sm">
                      {new Date(
                        hackathon.registrationDeadline,
                      ).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock size={18} className="text-[#A0A0A0]" />
                  <div>
                    <div className="text-white font-medium">Event Dates</div>
                    <div className="text-[#A0A0A0] text-sm">
                      {new Date(hackathon.startDate).toLocaleDateString()} -{" "}
                      {new Date(hackathon.endDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="bg-[#121212] rounded-2xl p-6 border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-4">
                Statistics
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[#A0A0A0]">Views</span>
                  <span className="text-white font-semibold">
                    {hackathon.views.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#A0A0A0]">Likes</span>
                  <span className="text-white font-semibold">
                    {hackathon.likes.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#A0A0A0]">Rating</span>
                  <div className="flex items-center space-x-1">
                    <Star
                      size={16}
                      className="text-[#00CFFF]"
                      fill="currentColor"
                    />
                    <span className="text-white font-semibold">
                      {hackathon.rating}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Organization Info */}
            <div className="bg-[#121212] rounded-2xl p-6 border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-4">
                Organized by
              </h3>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-[#1E3C72] to-[#00CFFF] rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">
                    {hackathon.organizationLogo}
                  </span>
                </div>
                <div>
                  <div className="text-white font-medium">
                    {hackathon.organization}
                  </div>
                  <Link
                    href={`/dashboard/clubs/1`}
                    className="text-[#00CFFF] hover:text-white transition-colors text-sm"
                  >
                    View Organization
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Registration Modal */}
      {showRegistrationModal && hackathon && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#121212] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/10">
            {/* Modal Header */}
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-[#1E3C72] to-[#00CFFF] rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      {hackathon.organizationLogo}
                    </span>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">
                      Register for Hackathon
                    </h2>
                    <p className="text-sm text-[#A0A0A0]">{hackathon.title}</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowRegistrationModal(false)}
                  className="p-2 text-[#A0A0A0] hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <form onSubmit={handleRegistrationSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white flex items-center">
                    <User size={18} className="mr-2 text-[#00CFFF]" />
                    Personal Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#C7C7C7] mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={registrationForm.fullName}
                        onChange={(e) =>
                          handleInputChange("fullName", e.target.value)
                        }
                        className="w-full px-4 py-3 bg-[#1A1A1A] border border-white/10 rounded-lg text-white placeholder-[#A0A0A0] focus:outline-none focus:ring-2 focus:ring-[#00CFFF] focus:border-transparent"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#C7C7C7] mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={registrationForm.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        className="w-full px-4 py-3 bg-[#1A1A1A] border border-white/10 rounded-lg text-white placeholder-[#A0A0A0] focus:outline-none focus:ring-2 focus:ring-[#00CFFF] focus:border-transparent"
                        placeholder="Enter your email"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#C7C7C7] mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={registrationForm.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        className="w-full px-4 py-3 bg-[#1A1A1A] border border-white/10 rounded-lg text-white placeholder-[#A0A0A0] focus:outline-none focus:ring-2 focus:ring-[#00CFFF] focus:border-transparent"
                        placeholder="Enter your phone number"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#C7C7C7] mb-2">
                        Experience Level
                      </label>
                      <select
                        value={registrationForm.experience}
                        onChange={(e) =>
                          handleInputChange("experience", e.target.value)
                        }
                        className="w-full px-4 py-3 bg-[#1A1A1A] border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#00CFFF] focus:border-transparent"
                      >
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Team Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white flex items-center">
                    <TeamIcon size={18} className="mr-2 text-[#00CFFF]" />
                    Team Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#C7C7C7] mb-2">
                        Team Name
                      </label>
                      <input
                        type="text"
                        value={registrationForm.teamName}
                        onChange={(e) =>
                          handleInputChange("teamName", e.target.value)
                        }
                        className="w-full px-4 py-3 bg-[#1A1A1A] border border-white/10 rounded-lg text-white placeholder-[#A0A0A0] focus:outline-none focus:ring-2 focus:ring-[#00CFFF] focus:border-transparent"
                        placeholder="Enter team name (optional)"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#C7C7C7] mb-2">
                        Team Size
                      </label>
                      <select
                        value={registrationForm.teamSize}
                        onChange={(e) =>
                          handleInputChange("teamSize", e.target.value)
                        }
                        className="w-full px-4 py-3 bg-[#1A1A1A] border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#00CFFF] focus:border-transparent"
                      >
                        <option value="1">1 person</option>
                        <option value="2">2 people</option>
                        <option value="3">3 people</option>
                        <option value="4">4 people</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">
                    Social Links (Optional)
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#C7C7C7] mb-2">
                        GitHub Profile
                      </label>
                      <input
                        type="url"
                        value={registrationForm.github}
                        onChange={(e) =>
                          handleInputChange("github", e.target.value)
                        }
                        className="w-full px-4 py-3 bg-[#1A1A1A] border border-white/10 rounded-lg text-white placeholder-[#A0A0A0] focus:outline-none focus:ring-2 focus:ring-[#00CFFF] focus:border-transparent"
                        placeholder="https://github.com/username"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#C7C7C7] mb-2">
                        LinkedIn Profile
                      </label>
                      <input
                        type="url"
                        value={registrationForm.linkedin}
                        onChange={(e) =>
                          handleInputChange("linkedin", e.target.value)
                        }
                        className="w-full px-4 py-3 bg-[#1A1A1A] border border-white/10 rounded-lg text-white placeholder-[#A0A0A0] focus:outline-none focus:ring-2 focus:ring-[#00CFFF] focus:border-transparent"
                        placeholder="https://linkedin.com/in/username"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-[#C7C7C7] mb-2">
                        Portfolio/Website
                      </label>
                      <input
                        type="url"
                        value={registrationForm.portfolio}
                        onChange={(e) =>
                          handleInputChange("portfolio", e.target.value)
                        }
                        className="w-full px-4 py-3 bg-[#1A1A1A] border border-white/10 rounded-lg text-white placeholder-[#A0A0A0] focus:outline-none focus:ring-2 focus:ring-[#00CFFF] focus:border-transparent"
                        placeholder="https://your-portfolio.com"
                      />
                    </div>
                  </div>
                </div>

                {/* Motivation */}
                <div>
                  <label className="block text-sm font-medium text-[#C7C7C7] mb-2">
                    Why do you want to join this hackathon?
                  </label>
                  <textarea
                    value={registrationForm.motivation}
                    onChange={(e) =>
                      handleInputChange("motivation", e.target.value)
                    }
                    rows={4}
                    className="w-full px-4 py-3 bg-[#1A1A1A] border border-white/10 rounded-lg text-white placeholder-[#A0A0A0] focus:outline-none focus:ring-2 focus:ring-[#00CFFF] focus:border-transparent resize-none"
                    placeholder="Tell us about your motivation and what you hope to achieve..."
                  />
                </div>

                {/* Terms and Conditions */}
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="agreeToTerms"
                    checked={registrationForm.agreeToTerms}
                    onChange={(e) =>
                      handleInputChange("agreeToTerms", e.target.checked)
                    }
                    className="mt-1 w-4 h-4 text-[#00CFFF] bg-[#1A1A1A] border-white/10 rounded focus:ring-[#00CFFF] focus:ring-2"
                  />
                  <label
                    htmlFor="agreeToTerms"
                    className="text-sm text-[#C7C7C7]"
                  >
                    I agree to the hackathon&apos;s terms and conditions and
                    code of conduct. I understand that all work must be original
                    and completed during the hackathon period.
                  </label>
                </div>

                {/* Submit Button */}
                <div className="flex space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowRegistrationModal(false)}
                    className="flex-1 btn-secondary py-3"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={
                      !registrationForm.agreeToTerms ||
                      !registrationForm.fullName ||
                      !registrationForm.email
                    }
                    className="flex-1 btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Submit Registration
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
