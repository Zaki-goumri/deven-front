"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Plus, 
  Building, 
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
  MoreVertical
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
  hackathons: Array<{
    id: number;
    title: string;
    status: 'upcoming' | 'ongoing' | 'completed';
    startDate: string;
    endDate: string;
    participants: number;
  }>;
}

export default function MyClubsPage() {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createForm, setCreateForm] = useState({
    name: "",
    description: "",
    location: "",
    website: "",
    github: "",
    linkedin: "",
    logo: ""
  });

  // Mock data - in a real app, this would come from an API
  const mockClubs: Club[] = [
    {
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
      createdAt: "2024-01-15",
      hackathons: [
        {
          id: 1,
          title: "AI Innovation Challenge 2024",
          status: "upcoming",
          startDate: "2024-02-15",
          endDate: "2024-02-17",
          participants: 1247
        },
        {
          id: 2,
          title: "Mobile App Development Contest",
          status: "upcoming",
          startDate: "2024-03-10",
          endDate: "2024-03-12",
          participants: 856
        }
      ]
    },
    {
      id: 2,
      name: "Constantine Tech Hub",
      logo: "CTH",
      description: "Innovative tech community in Constantine, fostering creativity and collaboration.",
      location: "Constantine, Algeria",
      memberCount: 89,
      hackathonCount: 3,
      isVerified: false,
      role: 'organizer',
      coverImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop",
      createdAt: "2024-02-01",
      hackathons: [
        {
          id: 3,
          title: "Web Development Marathon",
          status: "completed",
          startDate: "2024-01-20",
          endDate: "2024-01-22",
          participants: 234
        }
      ]
    }
  ];

  useEffect(() => {
    // Simulate API call
    const fetchClubs = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      setClubs(mockClubs);
      setLoading(false);
    };

    fetchClubs();
  }, []);

  const handleCreateClub = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log("Creating club:", createForm);
    
    // Close modal and reset form
    setShowCreateModal(false);
    setCreateForm({
      name: "",
      description: "",
      location: "",
      website: "",
      github: "",
      linkedin: "",
      logo: ""
    });
    
    // You could show a success message here
    alert("Club created successfully!");
  };

  const handleInputChange = (field: string, value: string) => {
    setCreateForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'owner':
        return <span className="px-2 py-1 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-white text-xs font-medium rounded-full flex items-center"><Crown size={12} className="mr-1" />Owner</span>;
      case 'organizer':
        return <span className="px-2 py-1 bg-gradient-to-r from-[#00CFFF] to-[#1E3C72] text-white text-xs font-medium rounded-full flex items-center"><UserCheck size={12} className="mr-1" />Organizer</span>;
      case 'member':
        return <span className="px-2 py-1 bg-[#A0A0A0]/20 text-[#A0A0A0] text-xs font-medium rounded-full flex items-center"><UserX size={12} className="mr-1" />Member</span>;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#00CFFF] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white">Loading your clubs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">My Clubs & Organizations</h1>
            <p className="text-[#A0A0A0]">Manage your clubs and create new ones</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-[#1E3C72] to-[#00CFFF] text-white rounded-xl font-medium hover:from-[#1E3C72]/90 hover:to-[#00CFFF]/90 transition-all duration-200"
          >
            <Plus size={20} />
            <span>Create New Club</span>
          </button>
        </div>
      </div>

      {/* Clubs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clubs.map((club) => (
          <div key={club.id} className="bg-[#121212] rounded-2xl border border-white/10 overflow-hidden hover:border-[#00CFFF]/20 transition-all duration-200">
            {/* Cover Image */}
            <div className="relative h-48">
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${club.coverImage})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#1E3C72]/80 to-[#000000]/80"></div>
              </div>
              
              {/* Club Logo */}
              <div className="absolute top-4 left-4 w-16 h-16 bg-gradient-to-r from-[#1E3C72] to-[#00CFFF] rounded-xl flex items-center justify-center shadow-2xl">
                <span className="text-white font-bold text-xl">{club.logo}</span>
              </div>
              
              {/* Role Badge */}
              <div className="absolute top-4 right-4">
                {getRoleBadge(club.role)}
              </div>
              
              {/* Verification Badge */}
              {club.isVerified && (
                <div className="absolute bottom-4 right-4">
                  <span className="px-2 py-1 bg-[#00C853]/20 text-[#00C853] text-xs font-medium rounded-full">
                    ✓ Verified
                  </span>
                </div>
              )}
            </div>

            {/* Club Info */}
            <div className="p-6">
              <div className="mb-4">
                <h3 className="text-xl font-bold text-white mb-2">{club.name}</h3>
                <p className="text-[#A0A0A0] text-sm mb-3">{club.description}</p>
                <div className="flex items-center space-x-2 text-[#C7C7C7] text-sm">
                  <Building size={16} />
                  <span>{club.location}</span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{club.memberCount}</div>
                  <div className="text-[#A0A0A0] text-sm">Members</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{club.hackathonCount}</div>
                  <div className="text-[#A0A0A0] text-sm">Hackathons</div>
                </div>
              </div>

              {/* Recent Hackathons */}
              {club.hackathons.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-white mb-2">Recent Hackathons</h4>
                  <div className="space-y-2">
                    {club.hackathons.slice(0, 2).map((hackathon) => (
                      <div key={hackathon.id} className="flex items-center justify-between p-2 bg-[#1A1A1A] rounded-lg">
                        <div className="flex-1">
                          <div className="text-white text-sm font-medium">{hackathon.title}</div>
                          <div className="text-[#A0A0A0] text-xs">
                            {new Date(hackathon.startDate).toLocaleDateString()} - {hackathon.participants} participants
                          </div>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          hackathon.status === 'upcoming' ? 'bg-[#00C853]/20 text-[#00C853]' :
                          hackathon.status === 'ongoing' ? 'bg-[#00CFFF]/20 text-[#00CFFF]' :
                          'bg-[#A0A0A0]/20 text-[#A0A0A0]'
                        }`}>
                          {hackathon.status.charAt(0).toUpperCase() + hackathon.status.slice(1)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center space-x-2">
                <Link
                  href={`/dashboard/clubs/${club.id}`}
                  className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-[#1A1A1A] text-white border border-white/20 rounded-lg hover:bg-white/10 transition-all duration-200"
                >
                  <Eye size={16} />
                  <span>View Details</span>
                </Link>
                
                {(club.role === 'owner' || club.role === 'organizer') && (
                  <Link
                    href={`/dashboard/clubs/${club.id}/manage`}
                    className="flex items-center justify-center px-4 py-2 bg-gradient-to-r from-[#1E3C72] to-[#00CFFF] text-white rounded-lg hover:from-[#1E3C72]/90 hover:to-[#00CFFF]/90 transition-all duration-200"
                  >
                    <Settings size={16} />
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {clubs.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gradient-to-r from-[#1E3C72] to-[#00CFFF] rounded-full flex items-center justify-center mx-auto mb-6">
            <Building size={48} className="text-white" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">No clubs yet</h3>
          <p className="text-[#A0A0A0] mb-6">
            Create your first club to start organizing hackathons and events
          </p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-[#1E3C72] to-[#00CFFF] text-white rounded-xl font-medium hover:from-[#1E3C72]/90 hover:to-[#00CFFF]/90 transition-all duration-200 mx-auto"
          >
            <Plus size={20} />
            <span>Create Your First Club</span>
          </button>
        </div>
      )}

      {/* Create Club Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#121212] rounded-2xl border border-white/10 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Create New Club</h2>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="p-2 text-[#A0A0A0] hover:text-white transition-colors"
                >
                  <Plus size={24} className="rotate-45" />
                </button>
              </div>
            </div>

            <form onSubmit={handleCreateClub} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#C7C7C7] mb-2">
                    Club Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={createForm.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-4 py-3 bg-[#1A1A1A] border border-white/10 rounded-lg text-white placeholder-[#A0A0A0] focus:border-[#00CFFF] focus:outline-none transition-colors"
                    placeholder="Enter club name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#C7C7C7] mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    required
                    value={createForm.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="w-full px-4 py-3 bg-[#1A1A1A] border border-white/10 rounded-lg text-white placeholder-[#A0A0A0] focus:border-[#00CFFF] focus:outline-none transition-colors"
                    placeholder="City, Country"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#C7C7C7] mb-2">
                  Description *
                </label>
                <textarea
                  required
                  value={createForm.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 bg-[#1A1A1A] border border-white/10 rounded-lg text-white placeholder-[#A0A0A0] focus:border-[#00CFFF] focus:outline-none transition-colors resize-none"
                  placeholder="Describe your club's mission and activities"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#C7C7C7] mb-2">
                    Website
                  </label>
                  <input
                    type="url"
                    value={createForm.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    className="w-full px-4 py-3 bg-[#1A1A1A] border border-white/10 rounded-lg text-white placeholder-[#A0A0A0] focus:border-[#00CFFF] focus:outline-none transition-colors"
                    placeholder="https://example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#C7C7C7] mb-2">
                    GitHub
                  </label>
                  <input
                    type="text"
                    value={createForm.github}
                    onChange={(e) => handleInputChange('github', e.target.value)}
                    className="w-full px-4 py-3 bg-[#1A1A1A] border border-white/10 rounded-lg text-white placeholder-[#A0A0A0] focus:border-[#00CFFF] focus:outline-none transition-colors"
                    placeholder="username/repo"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#C7C7C7] mb-2">
                    LinkedIn
                  </label>
                  <input
                    type="text"
                    value={createForm.linkedin}
                    onChange={(e) => handleInputChange('linkedin', e.target.value)}
                    className="w-full px-4 py-3 bg-[#1A1A1A] border border-white/10 rounded-lg text-white placeholder-[#A0A0A0] focus:border-[#00CFFF] focus:outline-none transition-colors"
                    placeholder="company/org"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end space-x-4 pt-6 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-6 py-3 text-[#A0A0A0] hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-[#1E3C72] to-[#00CFFF] text-white rounded-lg font-medium hover:from-[#1E3C72]/90 hover:to-[#00CFFF]/90 transition-all duration-200"
                >
                  Create Club
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 