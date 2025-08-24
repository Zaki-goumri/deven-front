"use client";

import { useState } from "react";
import { Search, Filter, Trophy, Users, Calendar, Star, ExternalLink, Eye, Edit, Download } from "lucide-react";

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  // Mock projects data
  const projects = [
    {
      id: 1,
      title: "EcoTracker",
      description: "A mobile app that helps users track their carbon footprint and suggests eco-friendly alternatives for daily activities.",
      hackathon: "Web Development Sprint",
      team: "Team Innovators",
      members: ["John Doe", "Alice Johnson", "Bob Smith"],
      techStack: ["React Native", "Node.js", "MongoDB"],
      status: "submitted",
      submittedDate: "2024-01-18",
      demoLink: "https://demo.ecotracker.com",
      repoLink: "https://github.com/team-innovators/ecotracker",
      score: 95,
      ranking: 1,
      prize: "$3,000",
      tags: ["Mobile", "Sustainability", "AI"],
    },
    {
      id: 2,
      title: "SmartCity Dashboard",
      description: "Real-time dashboard for monitoring city infrastructure and providing insights to urban planners.",
      hackathon: "AI Innovation Challenge",
      team: "Data Wizards",
      members: ["John Doe", "Carol Davis"],
      techStack: ["React", "Python", "TensorFlow", "PostgreSQL"],
      status: "in_progress",
      submittedDate: null,
      demoLink: null,
      repoLink: "https://github.com/data-wizards/smartcity",
      score: null,
      ranking: null,
      prize: null,
      tags: ["AI", "IoT", "Data Visualization"],
    },
    {
      id: 3,
      title: "DeFi Portfolio Manager",
      description: "Decentralized finance portfolio management tool with automated trading strategies.",
      hackathon: "Blockchain Hackathon",
      team: "Crypto Masters",
      members: ["John Doe", "David Wilson", "Emma Brown"],
      techStack: ["Solidity", "React", "Web3.js", "Hardhat"],
      status: "completed",
      submittedDate: "2023-12-15",
      demoLink: "https://demo.defi-portfolio.com",
      repoLink: "https://github.com/crypto-masters/defi-portfolio",
      score: 88,
      ranking: 3,
      prize: "$1,000",
      tags: ["Blockchain", "DeFi", "Smart Contracts"],
    },
  ];

  const filters = [
    { id: "all", label: "All Projects" },
    { id: "in_progress", label: "In Progress" },
    { id: "submitted", label: "Submitted" },
    { id: "completed", label: "Completed" },
  ];

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.techStack.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = selectedFilter === "all" || project.status === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "in_progress": return "bg-[#00CFFF]/20 text-[#00CFFF]";
      case "submitted": return "bg-[#00C853]/20 text-[#00C853]";
      case "completed": return "bg-[#A0A0A0]/20 text-[#A0A0A0]";
      default: return "bg-[#A0A0A0]/20 text-[#A0A0A0]";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "in_progress": return "In Progress";
      case "submitted": return "Submitted";
      case "completed": return "Completed";
      default: return status;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">My Projects</h1>
          <p className="text-[#A0A0A0] mt-2">Track your hackathon projects and submissions</p>
        </div>
        <button className="btn-primary mt-4 sm:mt-0">
          Submit New Project
        </button>
      </div>

      {/* Search and Filters */}
      <div className="card p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#A0A0A0]" size={20} />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field w-full pl-10 pr-4 py-3"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center space-x-2">
            <Filter size={20} className="text-[#A0A0A0]" />
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter.id)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    selectedFilter === filter.id
                      ? 'bg-gradient-to-r from-[#1E3C72] to-[#00CFFF] text-white'
                      : 'bg-[#1A1A1A] text-[#C7C7C7] hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredProjects.map((project) => (
          <div key={project.id} className="card p-6 hover:glow-cyan transition-all duration-300">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-[#A0A0A0] text-sm">{project.hackathon}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                {getStatusLabel(project.status)}
              </span>
            </div>

            {/* Description */}
            <p className="text-[#C7C7C7] text-sm mb-4 line-clamp-3">{project.description}</p>

            {/* Team Info */}
            <div className="flex items-center space-x-2 mb-4">
              <Users size={16} className="text-[#A0A0A0]" />
              <span className="text-sm text-[#C7C7C7]">{project.team}</span>
              <span className="text-[#A0A0A0]">•</span>
              <span className="text-sm text-[#C7C7C7]">{project.members.length} members</span>
            </div>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.techStack.map((tech) => (
                <span key={tech} className="px-2 py-1 bg-[#1A1A1A] text-[#00CFFF] text-xs rounded">
                  {tech}
                </span>
              ))}
            </div>

            {/* Project Details */}
            <div className="space-y-3 mb-6">
              {project.submittedDate && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Calendar size={16} className="text-[#A0A0A0]" />
                    <span className="text-sm text-[#C7C7C7]">Submitted: {project.submittedDate}</span>
                  </div>
                </div>
              )}

              {project.score && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Star size={16} className="text-[#00CFFF]" fill="currentColor" />
                    <span className="text-sm text-[#C7C7C7]">Score: {project.score}/100</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Trophy size={16} className="text-[#A0A0A0]" />
                    <span className="text-sm text-[#C7C7C7]">Rank: #{project.ranking}</span>
                  </div>
                </div>
              )}

              {project.prize && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Trophy size={16} className="text-[#A0A0A0]" />
                    <span className="text-sm font-medium text-[#00CFFF]">{project.prize}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Links */}
            <div className="flex space-x-2 mb-6">
              {project.demoLink && (
                <a
                  href={project.demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 text-[#00CFFF] hover:underline text-sm"
                >
                  <Eye size={14} />
                  <span>Demo</span>
                </a>
              )}
              {project.repoLink && (
                <a
                  href={project.repoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 text-[#00CFFF] hover:underline text-sm"
                >
                  <ExternalLink size={14} />
                  <span>Repository</span>
                </a>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              {project.status === "in_progress" ? (
                <button className="flex-1 btn-primary text-sm py-2">
                  Continue Working
                </button>
              ) : (
                <button className="flex-1 btn-secondary text-sm py-2">
                  View Details
                </button>
              )}
              
              {project.status === "submitted" && (
                <button className="btn-secondary text-sm py-2 px-4">
                  <Edit size={14} />
                </button>
              )}
              
              {project.status === "completed" && (
                <button className="btn-secondary text-sm py-2 px-4">
                  <Download size={14} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="card p-12 text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-[#1E3C72] to-[#00CFFF] rounded-full flex items-center justify-center mx-auto mb-4">
            <Trophy size={32} className="text-white" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">No projects found</h3>
          <p className="text-[#A0A0A0] mb-6">
            {searchTerm || selectedFilter !== "all" 
              ? "Try adjusting your search terms or filters to find what you're looking for."
              : "You haven't created any projects yet. Start by joining a hackathon!"
            }
          </p>
          <button className="btn-primary">
            Join Hackathon
          </button>
        </div>
      )}

      {/* Stats Summary */}
      {filteredProjects.length > 0 && (
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Project Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-[#1A1A1A] rounded-lg">
              <div className="text-2xl font-bold text-white">{projects.length}</div>
              <div className="text-xs text-[#A0A0A0]">Total Projects</div>
            </div>
            <div className="text-center p-4 bg-[#1A1A1A] rounded-lg">
              <div className="text-2xl font-bold text-white">
                {projects.filter(p => p.status === "completed").length}
              </div>
              <div className="text-xs text-[#A0A0A0]">Completed</div>
            </div>
            <div className="text-center p-4 bg-[#1A1A1A] rounded-lg">
              <div className="text-2xl font-bold text-white">
                {projects.filter(p => p.prize).reduce((sum, p) => sum + parseInt(p.prize?.replace(/[^0-9]/g, '') || '0'), 0)}
              </div>
              <div className="text-xs text-[#A0A0A0]">Total Prizes ($)</div>
            </div>
            <div className="text-center p-4 bg-[#1A1A1A] rounded-lg">
              <div className="text-2xl font-bold text-white">
                {Math.round(projects.filter(p => p.score).reduce((sum, p) => sum + (p.score || 0), 0) / projects.filter(p => p.score).length)}
              </div>
              <div className="text-xs text-[#A0A0A0]">Avg Score</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 