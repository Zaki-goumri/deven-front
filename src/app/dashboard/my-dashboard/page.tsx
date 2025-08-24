import {
  Calendar,
  Users,
  Trophy,
  TrendingUp,
  Clock,
  MapPin,
  AlertCircle,
} from "lucide-react";

export default function MyDashboardPage() {
  // Mock user data for personal dashboard
  const stats = [
    {
      name: "Active Hackathons",
      value: "3",
      icon: Calendar,
      change: "+1",
      changeType: "positive",
    },
    {
      name: "Joined Teams",
      value: "2",
      icon: Users,
      change: "+1",
      changeType: "positive",
    },
    {
      name: "Projects Submitted",
      value: "1",
      icon: Trophy,
      change: "+1",
      changeType: "positive",
    },
    {
      name: "Total Points",
      value: "850",
      icon: TrendingUp,
      change: "+150",
      changeType: "positive",
    },
  ];

  const myHackathons = [
    {
      id: 1,
      title: "AI Innovation Challenge 2024",
      organization: "Tech Club Algiers",
      status: "active",
      team: "Team Innovators",
      progress: 75,
      startDate: "2024-02-15",
      endDate: "2024-02-17",
      timeLeft: "2 days left",
      location: "Algiers, Algeria",
      prize: "$25,000",
      projectSubmitted: false,
      teamMembers: ["John Doe", "Alice Johnson", "Bob Smith"],
    },
    {
      id: 2,
      title: "Web Development Sprint",
      organization: "Code Masters",
      status: "completed",
      team: "Web Warriors",
      progress: 100,
      startDate: "2024-01-20",
      endDate: "2024-01-22",
      timeLeft: "Completed",
      location: "Oran, Algeria",
      prize: "$15,000",
      projectSubmitted: true,
      teamMembers: ["John Doe", "Carol Davis"],
      result: "2nd Place",
      points: 750,
    },
    {
      id: 3,
      title: "Mobile App Contest",
      organization: "Innovation Hub",
      status: "upcoming",
      team: null,
      progress: 0,
      startDate: "2024-03-10",
      endDate: "2024-03-12",
      timeLeft: "3 weeks left",
      location: "Constantine, Algeria",
      prize: "$20,000",
      projectSubmitted: false,
      teamMembers: [],
    },
  ];

  const recentActivity = [
    {
      id: 1,
      type: "hackathon_joined",
      title: "Joined AI Innovation Challenge",
      description: "You joined the AI Innovation Challenge hackathon",
      date: "2024-01-15",
      icon: "🎯",
      color: "text-[#00CFFF]",
    },
    {
      id: 2,
      type: "project_submitted",
      title: "Submitted EcoTracker Project",
      description:
        "Your team submitted the EcoTracker project for Web Development Sprint",
      date: "2024-01-10",
      icon: "🚀",
      color: "text-[#00C853]",
    },
    {
      id: 3,
      type: "team_joined",
      title: "Joined Team Innovators",
      description: "You became a member of Team Innovators",
      date: "2024-01-05",
      icon: "👥",
      color: "text-[#6A00FF]",
    },
    {
      id: 4,
      type: "achievement",
      title: "Second Place Winner",
      description: "Your team won second place in the Web Development Sprint",
      date: "2024-01-22",
      icon: "🏆",
      color: "text-[#FFD700]",
    },
  ];

  const upcomingDeadlines = [
    {
      title: "AI Challenge Project Submission",
      date: "2024-02-17",
      type: "submission",
      hackathon: "AI Innovation Challenge 2024",
      urgent: true,
    },
    {
      title: "Mobile Contest Registration",
      date: "2024-03-05",
      type: "registration",
      hackathon: "Mobile App Contest",
      urgent: false,
    },
    {
      title: "Team Formation Deadline",
      date: "2024-03-08",
      type: "team",
      hackathon: "Mobile App Contest",
      urgent: false,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-[#00CFFF]/20 text-[#00CFFF]";
      case "upcoming":
        return "bg-[#00C853]/20 text-[#00C853]";
      case "completed":
        return "bg-[#A0A0A0]/20 text-[#A0A0A0]";
      default:
        return "bg-[#A0A0A0]/20 text-[#A0A0A0]";
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "bg-[#00C853]";
    if (progress >= 50) return "bg-[#00CFFF]";
    return "bg-[#FF3B30]";
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">My Dashboard</h1>
        <p className="text-[#A0A0A0] mt-2">
          Track your hackathon progress and achievements
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#A0A0A0]">
                  {stat.name}
                </p>
                <p className="text-2xl font-bold text-white mt-1">
                  {stat.value}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-[#1E3C72] to-[#00CFFF] rounded-lg flex items-center justify-center">
                <stat.icon size={24} className="text-white" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span
                className={`text-sm font-medium ${
                  stat.changeType === "positive"
                    ? "text-[#00C853]"
                    : "text-[#FF3B30]"
                }`}
              >
                {stat.change}
              </span>
              <span className="text-sm text-[#A0A0A0] ml-1">
                from last month
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* My Hackathons */}
        <div className="lg:col-span-2">
          <div className="card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">My Hackathons</h2>
              <button className="text-[#00CFFF] hover:underline text-sm">
                View all
              </button>
            </div>

            <div className="space-y-4">
              {myHackathons.map((hackathon) => (
                <div
                  key={hackathon.id}
                  className="bg-[#1A1A1A] rounded-lg p-4 border border-white/5"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-white mb-1">
                        {hackathon.title}
                      </h3>
                      <p className="text-sm text-[#A0A0A0]">
                        {hackathon.organization}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(hackathon.status)}`}
                      >
                        {hackathon.status}
                      </span>
                      {hackathon.result && (
                        <span className="px-2 py-1 bg-[#FFD700]/20 text-[#FFD700] text-xs font-medium rounded-full">
                          {hackathon.result}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    <div className="flex items-center space-x-2">
                      <Clock size={14} className="text-[#A0A0A0]" />
                      <span className="text-sm text-[#C7C7C7]">
                        {hackathon.timeLeft}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin size={14} className="text-[#A0A0A0]" />
                      <span className="text-sm text-[#C7C7C7]">
                        {hackathon.location}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Trophy size={14} className="text-[#A0A0A0]" />
                      <span className="text-sm text-[#C7C7C7]">
                        {hackathon.prize}
                      </span>
                    </div>
                    {hackathon.team && (
                      <div className="flex items-center space-x-2">
                        <Users size={14} className="text-[#A0A0A0]" />
                        <span className="text-sm text-[#C7C7C7]">
                          {hackathon.team}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between text-xs text-[#A0A0A0] mb-1">
                      <span>Progress</span>
                      <span>{hackathon.progress}%</span>
                    </div>
                    <div className="w-full bg-[#2A2A2A] rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${getProgressColor(hackathon.progress)}`}
                        style={{ width: `${hackathon.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Team Members */}
                  {hackathon.teamMembers.length > 0 && (
                    <div className="mb-3">
                      <p className="text-xs text-[#A0A0A0] mb-1">
                        Team Members:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {hackathon.teamMembers.map((member, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-[#2A2A2A] text-[#C7C7C7] text-xs rounded"
                          >
                            {member}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    {hackathon.status === "active" &&
                      !hackathon.projectSubmitted && (
                        <button className="btn-primary text-sm py-2 px-4">
                          Submit Project
                        </button>
                      )}
                    {hackathon.status === "upcoming" && !hackathon.team && (
                      <button className="btn-primary text-sm py-2 px-4">
                        Join Team
                      </button>
                    )}
                    <button className="btn-secondary text-sm py-2 px-4">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Deadlines */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-white mb-4">
              Upcoming Deadlines
            </h3>

            <div className="space-y-3">
              {upcomingDeadlines.map((deadline, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 p-3 bg-[#1A1A1A] rounded-lg border border-white/5"
                >
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${
                      deadline.urgent ? "bg-[#FF3B30]" : "bg-[#00CFFF]"
                    }`}
                  ></div>
                  <div className="flex-1">
                    <h4 className="font-medium text-white text-sm">
                      {deadline.title}
                    </h4>
                    <p className="text-xs text-[#A0A0A0] mt-1">
                      {deadline.hackathon}
                    </p>
                    <p className="text-xs text-[#A0A0A0]">{deadline.date}</p>
                  </div>
                  {deadline.urgent && (
                    <AlertCircle size={16} className="text-[#FF3B30] mt-1" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-white mb-4">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <button className="w-full btn-primary text-sm py-3">
                Join New Hackathon
              </button>
              <button className="w-full btn-secondary text-sm py-3">
                Create Team
              </button>
              <button className="w-full btn-secondary text-sm py-3">
                Browse Projects
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card p-6">
        <h2 className="text-xl font-bold text-white mb-6">Recent Activity</h2>

        <div className="space-y-4">
          {recentActivity.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start space-x-4 p-4 bg-[#1A1A1A] rounded-lg"
            >
              <div className={`text-2xl ${activity.color}`}>
                {activity.icon}
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-white">{activity.title}</h4>
                <p className="text-sm text-[#A0A0A0]">{activity.description}</p>
                <p className="text-xs text-[#A0A0A0] mt-1">{activity.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

