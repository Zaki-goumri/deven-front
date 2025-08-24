"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { 
  ArrowLeft,
  Plus, 
  Users, 
  Calendar, 
  Trophy, 
  Settings, 
  Crown,
  UserCheck,
  UserX,
  Edit,
  Trash2,
  Eye,
  MoreVertical,
  CheckCircle,
  XCircle,
  Clock,
  Building,
  MapPin,
  Star,
  Filter,
  Search,
  Download,
  Mail,
  MessageSquare
} from "lucide-react";

interface Club {
  id: number;
  name: string;
  logo: string;
  description: string;
  location: string;
  memberCount: number;
  hackathonCount: number;
  isVerified: boolean;
  role: 'owner' | 'organizer' | 'member';
  coverImage: string;
  website?: string;
  github?: string;
  linkedin?: string;
  createdAt: string;
}

interface Hackathon {
  id: number;
  title: string;
  description: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  startDate: string;
  endDate: string;
  registrationDeadline: string;
  location: string;
  isOnline: boolean;
  maxParticipants: number;
  participants: number;
  maxTeams: number;
  teams: number;
  prize: string;
  coverImage: string;
  registrationForm: {
    questions: Array<{
      id: number;
      question: string;
      type: 'text' | 'textarea' | 'select' | 'checkbox';
      required: boolean;
      options?: string[];
    }>;
  };
}

interface Team {
  id: number;
  name: string;
  hackathonId: number;
  members: Array<{
    id: number;
    name: string;
    email: string;
    role: string;
    avatar: string;
  }>;
  status: 'pending' | 'accepted' | 'rejected' | 'waitlisted';
  submittedAt: string;
  responses: Record<string, string>;
}

interface Individual {
  id: number;
  name: string;
  email: string;
  hackathonId: number;
  status: 'pending' | 'accepted' | 'rejected' | 'waitlisted';
  submittedAt: string;
  motivation: string;
  responses: Record<string, string>;
  skills: string[];
  experience: string;
}

export default function ClubManagePage() {
  const params = useParams();
  const router = useRouter();
  const [club, setClub] = useState<Club | null>(null);
  const [hackathons, setHackathons] = useState<Hackathon[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [individuals, setIndividuals] = useState<Individual[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'hackathons' | 'participants' | 'settings'>('overview');
  const [selectedHackathon, setSelectedHackathon] = useState<number | null>(null);
  const [showCreateHackathon, setShowCreateHackathon] = useState(false);
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'accepted' | 'rejected' | 'waitlisted'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data
  const mockClub: Club = {
    id: 1,
    name: "Tech Club Algiers",
    logo: "TCA",
    description: "Leading technology club in Algiers, organizing innovative hackathons and tech events.",
    location: "Algiers, Algeria",
    memberCount: 156,
    hackathonCount: 8,
    isVerified: true,
    role: 'owner',
    coverImage: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=400&fit=crop",
    website: "https://techclubalgiers.com",
    github: "github.com/techclubalgiers",
    linkedin: "linkedin.com/company/techclubalgiers",
    createdAt: "2024-01-15"
  };

  const mockHackathons: Hackathon[] = [
    {
      id: 1,
      title: "AI Innovation Challenge 2024",
      description: "Build innovative AI solutions to solve real-world problems.",
      status: "upcoming",
      startDate: "2024-02-15",
      endDate: "2024-02-17",
      registrationDeadline: "2024-02-10",
      location: "Algiers, Algeria",
      isOnline: false,
      maxParticipants: 2000,
      participants: 1247,
      maxTeams: 500,
      teams: 312,
      prize: "$25,000",
      coverImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
      registrationForm: {
        questions: [
          {
            id: 1,
            question: "What is your team name?",
            type: "text",
            required: true
          },
          {
            id: 2,
            question: "Describe your team's experience with AI/ML",
            type: "textarea",
            required: true
          },
          {
            id: 3,
            question: "What technologies will you use?",
            type: "select",
            required: true,
            options: ["Python", "TensorFlow", "PyTorch", "React", "Node.js", "Other"]
          }
        ]
      }
    },
    {
      id: 2,
      title: "Mobile App Development Contest",
      description: "Create innovative mobile applications for modern challenges.",
      status: "upcoming",
      startDate: "2024-03-10",
      endDate: "2024-03-12",
      registrationDeadline: "2024-03-05",
      location: "Constantine, Algeria",
      isOnline: false,
      maxParticipants: 1000,
      participants: 856,
      maxTeams: 200,
      teams: 189,
      prize: "$20,000",
      coverImage: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=400&fit=crop",
      registrationForm: {
        questions: [
          {
            id: 1,
            question: "Team name",
            type: "text",
            required: true
          },
          {
            id: 2,
            question: "Mobile development experience",
            type: "textarea",
            required: true
          }
        ]
      }
    }
  ];

  const mockTeams: Team[] = [
    {
      id: 1,
      name: "AI Pioneers",
      hackathonId: 1,
      members: [
        { id: 1, name: "Ahmed Benali", email: "ahmed@example.com", role: "Team Lead", avatar: "AB" },
        { id: 2, name: "Fatima Zohra", email: "fatima@example.com", role: "Developer", avatar: "FZ" },
        { id: 3, name: "Karim Boudiaf", email: "karim@example.com", role: "Designer", avatar: "KB" }
      ],
      status: "accepted",
      submittedAt: "2024-01-20T10:30:00Z",
      responses: {
        "What is your team name?": "AI Pioneers",
        "Describe your team's experience with AI/ML": "We have 2+ years of experience in machine learning and have won several competitions.",
        "What technologies will you use?": "Python, TensorFlow, React"
      }
    },
    {
      id: 2,
      name: "CodeCrafters",
      hackathonId: 1,
      members: [
        { id: 4, name: "Sara Mansouri", email: "sara@example.com", role: "Team Lead", avatar: "SM" },
        { id: 5, name: "Youssef Khelifi", email: "youssef@example.com", role: "Developer", avatar: "YK" }
      ],
      status: "pending",
      submittedAt: "2024-01-22T14:15:00Z",
      responses: {
        "What is your team name?": "CodeCrafters",
        "Describe your team's experience with AI/ML": "Beginner level but very motivated to learn.",
        "What technologies will you use?": "Python, PyTorch"
      }
    }
  ];

  const mockIndividuals: Individual[] = [
    {
      id: 1,
      name: "Layla Hamidi",
      email: "layla@example.com",
      hackathonId: 1,
      status: "pending",
      submittedAt: "2024-01-21T09:45:00Z",
      motivation: "I'm passionate about AI and want to contribute to innovative solutions. I have experience in Python and machine learning.",
      responses: {
        "What is your team name?": "Looking for team",
        "Describe your team's experience with AI/ML": "2 years of experience in data science and ML",
        "What technologies will you use?": "Python, TensorFlow, Scikit-learn"
      },
      skills: ["Python", "Machine Learning", "Data Analysis"],
      experience: "Intermediate"
    },
    {
      id: 2,
      name: "Omar Toumi",
      email: "omar@example.com",
      hackathonId: 1,
      status: "accepted",
      submittedAt: "2024-01-19T16:20:00Z",
      motivation: "Experienced developer looking to join a strong team for this hackathon.",
      responses: {
        "What is your team name?": "Looking for team",
        "Describe your team's experience with AI/ML": "Advanced level with 4 years of experience",
        "What technologies will you use?": "Python, PyTorch, React, Node.js"
      },
      skills: ["Python", "React", "Node.js", "Machine Learning"],
      experience: "Advanced"
    }
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setClub(mockClub);
      setHackathons(mockHackathons);
      setTeams(mockTeams);
      setIndividuals(mockIndividuals);
      setLoading(false);
    };

    fetchData();
  }, [params.id]);

  const handleStatusUpdate = (type: 'team' | 'individual', id: number, status: string) => {
    if (type === 'team') {
      setTeams(prev => prev.map(team => 
        team.id === id ? { ...team, status: status as any } : team
      ));
    } else {
      setIndividuals(prev => prev.map(ind => 
        ind.id === id ? { ...ind, status: status as any } : team
      ));
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'accepted':
        return <span className="px-2 py-1 bg-[#00C853]/20 text-[#00C853] text-xs font-medium rounded-full flex items-center"><CheckCircle size={12} className="mr-1" />Accepted</span>;
      case 'rejected':
        return <span className="px-2 py-1 bg-[#FF3B30]/20 text-[#FF3B30] text-xs font-medium rounded-full flex items-center"><XCircle size={12} className="mr-1" />Rejected</span>;
      case 'waitlisted':
        return <span className="px-2 py-1 bg-[#FF9500]/20 text-[#FF9500] text-xs font-medium rounded-full flex items-center"><Clock size={12} className="mr-1" />Waitlisted</span>;
      case 'pending':
        return <span className="px-2 py-1 bg-[#00CFFF]/20 text-[#00CFFF] text-xs font-medium rounded-full flex items-center"><Clock size={12} className="mr-1" />Pending</span>;
      default:
        return null;
    }
  };

  const filteredTeams = teams.filter(team => {
    const matchesHackathon = !selectedHackathon || team.hackathonId === selectedHackathon;
    const matchesStatus = filterStatus === 'all' || team.status === filterStatus;
    const matchesSearch = team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         team.members.some(member => member.name.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesHackathon && matchesStatus && matchesSearch;
  });

  const filteredIndividuals = individuals.filter(individual => {
    const matchesHackathon = !selectedHackathon || individual.hackathonId === selectedHackathon;
    const matchesStatus = filterStatus === 'all' || individual.status === filterStatus;
    const matchesSearch = individual.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         individual.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesHackathon && matchesStatus && matchesSearch;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#00CFFF] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white">Loading club management...</p>
        </div>
      </div>
    );
  }

  if (!club) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-xl font-bold text-white mb-2">Club not found</h3>
          <p className="text-[#A0A0A0] mb-6">The club you're looking for doesn't exist.</p>
          <Link href="/dashboard/my-clubs" className="btn-primary">
            Back to My Clubs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* Header */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link 
              href="/dashboard/my-clubs" 
              className="flex items-center space-x-2 text-[#00CFFF] hover:text-white transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Back to My Clubs</span>
            </Link>
            <div className="w-px h-6 bg-white/10"></div>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-[#1E3C72] to-[#00CFFF] rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">{club.logo}</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">{club.name}</h1>
                <p className="text-[#A0A0A0]">Club Management</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              club.role === 'owner' ? 'bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-white' :
              'bg-gradient-to-r from-[#00CFFF] to-[#1E3C72] text-white'
            }`}>
              {club.role === 'owner' ? 'Owner' : 'Organizer'}
            </span>
            <button
              onClick={() => setShowCreateHackathon(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-[#1E3C72] to-[#00CFFF] text-white rounded-lg font-medium hover:from-[#1E3C72]/90 hover:to-[#00CFFF]/90 transition-all duration-200"
            >
              <Plus size={16} />
              <span>Create Hackathon</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-6 py-4 border-b border-white/10">
        <div className="flex space-x-8">
          {[
            { id: 'overview', label: 'Overview', icon: Building },
            { id: 'hackathons', label: 'Hackathons', icon: Trophy },
            { id: 'participants', label: 'Participants', icon: Users },
            { id: 'settings', label: 'Settings', icon: Settings }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-[#00CFFF]/20 text-[#00CFFF]'
                  : 'text-[#A0A0A0] hover:text-white hover:bg-white/5'
              }`}
            >
              <tab.icon size={16} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-[#121212] rounded-2xl p-6 border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#00C853] to-[#4CAF50] rounded-xl flex items-center justify-center">
                    <Trophy size={24} className="text-white" />
                  </div>
                  <span className="text-2xl font-bold text-white">{hackathons.length}</span>
                </div>
                <h3 className="text-white font-semibold mb-1">Total Hackathons</h3>
                <p className="text-[#A0A0A0] text-sm">Organized events</p>
              </div>

              <div className="bg-[#121212] rounded-2xl p-6 border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#00CFFF] to-[#1E3C72] rounded-xl flex items-center justify-center">
                    <Users size={24} className="text-white" />
                  </div>
                  <span className="text-2xl font-bold text-white">{teams.length + individuals.length}</span>
                </div>
                <h3 className="text-white font-semibold mb-1">Total Participants</h3>
                <p className="text-[#A0A0A0] text-sm">Teams & Individuals</p>
              </div>

              <div className="bg-[#121212] rounded-2xl p-6 border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#FF9500] to-[#FF5722] rounded-xl flex items-center justify-center">
                    <Clock size={24} className="text-white" />
                  </div>
                  <span className="text-2xl font-bold text-white">
                    {teams.filter(t => t.status === 'pending').length + individuals.filter(i => i.status === 'pending').length}
                  </span>
                </div>
                <h3 className="text-white font-semibold mb-1">Pending Reviews</h3>
                <p className="text-[#A0A0A0] text-sm">Awaiting approval</p>
              </div>

              <div className="bg-[#121212] rounded-2xl p-6 border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#9C27B0] to-[#673AB7] rounded-xl flex items-center justify-center">
                    <Calendar size={24} className="text-white" />
                  </div>
                  <span className="text-2xl font-bold text-white">
                    {hackathons.filter(h => h.status === 'upcoming').length}
                  </span>
                </div>
                <h3 className="text-white font-semibold mb-1">Upcoming Events</h3>
                <p className="text-[#A0A0A0] text-sm">Scheduled hackathons</p>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-[#121212] rounded-2xl p-6 border border-white/10">
              <h2 className="text-xl font-bold text-white mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {teams.slice(0, 3).map((team) => (
                  <div key={team.id} className="flex items-center justify-between p-4 bg-[#1A1A1A] rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-[#1E3C72] to-[#00CFFF] rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">{team.name.charAt(0)}</span>
                      </div>
                      <div>
                        <div className="text-white font-medium">{team.name}</div>
                        <div className="text-[#A0A0A0] text-sm">
                          {team.members.length} members • {new Date(team.submittedAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    {getStatusBadge(team.status)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'hackathons' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Hackathons</h2>
              <button
                onClick={() => setShowCreateHackathon(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-[#1E3C72] to-[#00CFFF] text-white rounded-lg font-medium hover:from-[#1E3C72]/90 hover:to-[#00CFFF]/90 transition-all duration-200"
              >
                <Plus size={16} />
                <span>Create New Hackathon</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hackathons.map((hackathon) => (
                <div key={hackathon.id} className="bg-[#121212] rounded-2xl border border-white/10 overflow-hidden hover:border-[#00CFFF]/20 transition-all duration-200">
                  <div className="relative h-48">
                    <div 
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${hackathon.coverImage})` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-[#1E3C72]/80 to-[#000000]/80"></div>
                    </div>
                    
                    <div className="absolute top-4 right-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        hackathon.status === 'upcoming' ? 'bg-[#00C853]/20 text-[#00C853]' :
                        hackathon.status === 'ongoing' ? 'bg-[#00CFFF]/20 text-[#00CFFF]' :
                        'bg-[#A0A0A0]/20 text-[#A0A0A0]'
                      }`}>
                        {hackathon.status.charAt(0).toUpperCase() + hackathon.status.slice(1)}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{hackathon.title}</h3>
                    <p className="text-[#A0A0A0] text-sm mb-4">{hackathon.description}</p>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-[#A0A0A0]">Participants:</span>
                        <span className="text-white">{hackathon.participants}/{hackathon.maxParticipants}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-[#A0A0A0]">Teams:</span>
                        <span className="text-white">{hackathon.teams}/{hackathon.maxTeams}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-[#A0A0A0]">Prize Pool:</span>
                        <span className="text-[#00CFFF] font-semibold">{hackathon.prize}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Link
                        href={`/dashboard/clubs/${club.id}/hackathons/${hackathon.id}`}
                        className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-[#1A1A1A] text-white border border-white/20 rounded-lg hover:bg-white/10 transition-all duration-200"
                      >
                        <Eye size={16} />
                        <span>Manage</span>
                      </Link>
                      
                      <button className="flex items-center justify-center px-4 py-2 bg-gradient-to-r from-[#1E3C72] to-[#00CFFF] text-white rounded-lg hover:from-[#1E3C72]/90 hover:to-[#00CFFF]/90 transition-all duration-200">
                        <Edit size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'participants' && (
          <div className="space-y-6">
            {/* Filters */}
            <div className="bg-[#121212] rounded-2xl p-6 border border-white/10">
              <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0 md:space-x-4">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#A0A0A0]" />
                    <input
                      type="text"
                      placeholder="Search participants..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 bg-[#1A1A1A] border border-white/10 rounded-lg text-white placeholder-[#A0A0A0] focus:border-[#00CFFF] focus:outline-none transition-colors"
                    />
                  </div>
                  
                  <select
                    value={selectedHackathon || ''}
                    onChange={(e) => setSelectedHackathon(e.target.value ? parseInt(e.target.value) : null)}
                    className="px-4 py-2 bg-[#1A1A1A] border border-white/10 rounded-lg text-white focus:border-[#00CFFF] focus:outline-none transition-colors"
                  >
                    <option value="">All Hackathons</option>
                    {hackathons.map(h => (
                      <option key={h.id} value={h.id}>{h.title}</option>
                    ))}
                  </select>
                  
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value as any)}
                    className="px-4 py-2 bg-[#1A1A1A] border border-white/10 rounded-lg text-white focus:border-[#00CFFF] focus:outline-none transition-colors"
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="accepted">Accepted</option>
                    <option value="rejected">Rejected</option>
                    <option value="waitlisted">Waitlisted</option>
                  </select>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button className="flex items-center space-x-2 px-4 py-2 bg-[#1A1A1A] text-white border border-white/20 rounded-lg hover:bg-white/10 transition-all duration-200">
                    <Download size={16} />
                    <span>Export</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-[#1A1A1A] text-white border border-white/20 rounded-lg hover:bg-white/10 transition-all duration-200">
                    <Mail size={16} />
                    <span>Send Email</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Teams */}
            <div className="bg-[#121212] rounded-2xl border border-white/10">
              <div className="p-6 border-b border-white/10">
                <h3 className="text-xl font-bold text-white">Teams ({filteredTeams.length})</h3>
              </div>
              
              <div className="divide-y divide-white/10">
                {filteredTeams.map((team) => (
                  <div key={team.id} className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-[#1E3C72] to-[#00CFFF] rounded-xl flex items-center justify-center">
                          <span className="text-white font-bold text-lg">{team.name.charAt(0)}</span>
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-white">{team.name}</h4>
                          <p className="text-[#A0A0A0] text-sm">
                            {team.members.length} members • {new Date(team.submittedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        {getStatusBadge(team.status)}
                        
                        {team.status === 'pending' && (
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleStatusUpdate('team', team.id, 'accepted')}
                              className="px-3 py-1 bg-[#00C853]/20 text-[#00C853] text-sm font-medium rounded-lg hover:bg-[#00C853]/30 transition-colors"
                            >
                              Accept
                            </button>
                            <button
                              onClick={() => handleStatusUpdate('team', team.id, 'rejected')}
                              className="px-3 py-1 bg-[#FF3B30]/20 text-[#FF3B30] text-sm font-medium rounded-lg hover:bg-[#FF3B30]/30 transition-colors"
                            >
                              Reject
                            </button>
                            <button
                              onClick={() => handleStatusUpdate('team', team.id, 'waitlisted')}
                              className="px-3 py-1 bg-[#FF9500]/20 text-[#FF9500] text-sm font-medium rounded-lg hover:bg-[#FF9500]/30 transition-colors"
                            >
                              Waitlist
                            </button>
                          </div>
                        )}
                        
                        <button className="p-2 text-[#A0A0A0] hover:text-white transition-colors">
                          <MoreVertical size={16} />
                        </button>
                      </div>
                    </div>
                    
                    {/* Team Members */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {team.members.map((member) => (
                        <div key={member.id} className="flex items-center space-x-3 p-3 bg-[#1A1A1A] rounded-lg">
                          <div className="w-8 h-8 bg-gradient-to-r from-[#1E3C72] to-[#00CFFF] rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-xs">{member.avatar}</span>
                          </div>
                          <div className="flex-1">
                            <div className="text-white text-sm font-medium">{member.name}</div>
                            <div className="text-[#A0A0A0] text-xs">{member.role}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Individuals */}
            <div className="bg-[#121212] rounded-2xl border border-white/10">
              <div className="p-6 border-b border-white/10">
                <h3 className="text-xl font-bold text-white">Individual Participants ({filteredIndividuals.length})</h3>
              </div>
              
              <div className="divide-y divide-white/10">
                {filteredIndividuals.map((individual) => (
                  <div key={individual.id} className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-[#1E3C72] to-[#00CFFF] rounded-xl flex items-center justify-center">
                          <span className="text-white font-bold text-lg">{individual.name.charAt(0)}</span>
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-white">{individual.name}</h4>
                          <p className="text-[#A0A0A0] text-sm">
                            {individual.email} • {individual.experience} • {new Date(individual.submittedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        {getStatusBadge(individual.status)}
                        
                        {individual.status === 'pending' && (
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleStatusUpdate('individual', individual.id, 'accepted')}
                              className="px-3 py-1 bg-[#00C853]/20 text-[#00C853] text-sm font-medium rounded-lg hover:bg-[#00C853]/30 transition-colors"
                            >
                              Accept
                            </button>
                            <button
                              onClick={() => handleStatusUpdate('individual', individual.id, 'rejected')}
                              className="px-3 py-1 bg-[#FF3B30]/20 text-[#FF3B30] text-sm font-medium rounded-lg hover:bg-[#FF3B30]/30 transition-colors"
                            >
                              Reject
                            </button>
                            <button
                              onClick={() => handleStatusUpdate('individual', individual.id, 'waitlisted')}
                              className="px-3 py-1 bg-[#FF9500]/20 text-[#FF9500] text-sm font-medium rounded-lg hover:bg-[#FF9500]/30 transition-colors"
                            >
                              Waitlist
                            </button>
                          </div>
                        )}
                        
                        <button className="p-2 text-[#A0A0A0] hover:text-white transition-colors">
                          <MoreVertical size={16} />
                        </button>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <h5 className="text-white font-medium mb-2">Motivation</h5>
                        <p className="text-[#A0A0A0] text-sm">{individual.motivation}</p>
                      </div>
                      
                      <div>
                        <h5 className="text-white font-medium mb-2">Skills</h5>
                        <div className="flex flex-wrap gap-2">
                          {individual.skills.map((skill, index) => (
                            <span key={index} className="px-2 py-1 bg-[#1E3C72]/20 text-[#00CFFF] text-xs font-medium rounded-full">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div className="bg-[#121212] rounded-2xl p-6 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-6">Club Settings</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">General Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-[#C7C7C7] mb-2">Club Name</label>
                      <input
                        type="text"
                        defaultValue={club.name}
                        className="w-full px-4 py-3 bg-[#1A1A1A] border border-white/10 rounded-lg text-white focus:border-[#00CFFF] focus:outline-none transition-colors"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-[#C7C7C7] mb-2">Description</label>
                      <textarea
                        defaultValue={club.description}
                        rows={4}
                        className="w-full px-4 py-3 bg-[#1A1A1A] border border-white/10 rounded-lg text-white focus:border-[#00CFFF] focus:outline-none transition-colors resize-none"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-[#C7C7C7] mb-2">Location</label>
                      <input
                        type="text"
                        defaultValue={club.location}
                        className="w-full px-4 py-3 bg-[#1A1A1A] border border-white/10 rounded-lg text-white focus:border-[#00CFFF] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Social Links</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-[#C7C7C7] mb-2">Website</label>
                      <input
                        type="url"
                        defaultValue={club.website}
                        className="w-full px-4 py-3 bg-[#1A1A1A] border border-white/10 rounded-lg text-white focus:border-[#00CFFF] focus:outline-none transition-colors"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-[#C7C7C7] mb-2">GitHub</label>
                      <input
                        type="text"
                        defaultValue={club.github}
                        className="w-full px-4 py-3 bg-[#1A1A1A] border border-white/10 rounded-lg text-white focus:border-[#00CFFF] focus:outline-none transition-colors"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-[#C7C7C7] mb-2">LinkedIn</label>
                      <input
                        type="text"
                        defaultValue={club.linkedin}
                        className="w-full px-4 py-3 bg-[#1A1A1A] border border-white/10 rounded-lg text-white focus:border-[#00CFFF] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-end space-x-4 pt-6 border-t border-white/10 mt-6">
                <button className="px-6 py-3 text-[#A0A0A0] hover:text-white transition-colors">
                  Cancel
                </button>
                <button className="px-6 py-3 bg-gradient-to-r from-[#1E3C72] to-[#00CFFF] text-white rounded-lg font-medium hover:from-[#1E3C72]/90 hover:to-[#00CFFF]/90 transition-all duration-200">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 