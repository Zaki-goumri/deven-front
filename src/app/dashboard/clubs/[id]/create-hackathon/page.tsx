"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Plus,
  X,
  Calendar,
  Users,
  Trophy,
  FileText,
  Globe,
  Upload,
  Trash2,
  Save,
} from "lucide-react";

interface Club {
  id: number;
  name: string;
  logo: string;
  description: string;
  location: string;
}

interface RegistrationQuestion {
  id: number;
  question: string;
  type: "text" | "textarea" | "select" | "checkbox" | "file";
  required: boolean;
  options?: string[];
}

interface HackathonForm {
  title: string;
  description: string;
  tags: string[];
  maxTeams: number;
  maxMembersPerTeam: number;
  type: "online" | "in-person" | "hybrid";
  external: boolean;
  externalLinks: {
    notion?: string;
    github?: string;
    registrationForm?: string;
  };
  prize: string;
  rules: File | null;
  startDate: string;
  endDate: string;
  registrationDeadline: string;
  location: string;
  coverImage: File | null;
  registrationQuestions: RegistrationQuestion[];
}

export default function CreateHackathonPage() {
  const params = useParams();
  const router = useRouter();
  const [club, setClub] = useState<Club | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<HackathonForm>({
    title: "",
    description: "",
    tags: [],
    maxTeams: 100,
    maxMembersPerTeam: 4,
    type: "in-person",
    external: false,
    externalLinks: {},
    prize: "",
    rules: null,
    startDate: "",
    endDate: "",
    registrationDeadline: "",
    location: "",
    coverImage: null,
    registrationQuestions: [
      {
        id: 1,
        question: "What is your team name?",
        type: "text",
        required: true,
      },
      {
        id: 2,
        question: "Describe your team&apos;s experience and motivation",
        type: "textarea",
        required: true,
      },
    ],
  });

  const [newTag, setNewTag] = useState("");
  const [newQuestion, setNewQuestion] = useState<{
    question: string;
    type: "text" | "textarea" | "select" | "checkbox" | "file";
    required: boolean;
    options: string[];
  }>({
    question: "",
    type: "text",
    required: true,
    options: [],
  });

  useEffect(() => {
    const mockClub: Club = {
      id: 1,
      name: "Tech Club Algiers",
      logo: "TCA",
      description:
        "Leading technology club in Algiers, organizing innovative hackathons and tech events.",
      location: "Algiers, Algeria",
    };

    const fetchClub = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 500));
      setClub(mockClub);
      setLoading(false);
    };

    fetchClub();
  }, [params.id]);

  const handleInputChange = (
    field: keyof HackathonForm,
    value:
      | string
      | number
      | boolean
      | File
      | string[]
      | { notion?: string; github?: string; registrationForm?: string }
      | RegistrationQuestion[],
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleExternalLinkChange = (field: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      externalLinks: {
        ...prev.externalLinks,
        [field]: value,
      },
    }));
  };

  const addTag = () => {
    if (newTag.trim() && !form.tags.includes(newTag.trim())) {
      setForm((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }));
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setForm((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const addQuestion = () => {
    if (newQuestion.question.trim()) {
      setForm((prev) => ({
        ...prev,
        registrationQuestions: [
          ...prev.registrationQuestions,
          {
            ...newQuestion,
            id: Math.max(...prev.registrationQuestions.map((q) => q.id)) + 1,
          },
        ],
      }));
      setNewQuestion({
        question: "",
        type: "text",
        required: true,
        options: [],
      });
    }
  };

  const removeQuestion = (questionId: number) => {
    setForm((prev) => ({
      ...prev,
      registrationQuestions: prev.registrationQuestions.filter(
        (q) => q.id !== questionId,
      ),
    }));
  };

  const handleFileChange = (
    field: "coverImage" | "rules",
    file: File | null,
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: file,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    // Here you would typically send the data to your backend
    console.log("Creating hackathon:", form);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setSaving(false);

    // Redirect to hackathon management page
    router.push(`/dashboard/clubs/${club?.id}/manage?tab=hackathons`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#00CFFF] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white">Loading...</p>
        </div>
      </div>
    );
  }

  if (!club) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-xl font-bold text-white mb-2">Club not found</h3>
          <p className="text-[#A0A0A0] mb-6">
            The club you&apos;re looking for doesn&apos;t exist.
          </p>
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
              href={`/dashboard/clubs/${club.id}/manage`}
              className="flex items-center space-x-2 text-[#00CFFF] hover:text-white transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Back to Club Management</span>
            </Link>
            <div className="w-px h-6 bg-white/10"></div>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-[#1E3C72] to-[#00CFFF] rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">
                  {club.logo}
                </span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">
                  Create New Hackathon
                </h1>
                <p className="text-[#A0A0A0]">{club.name}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="p-6">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8">
          {/* Basic Information */}
          <div className="bg-[#121212] rounded-2xl p-6 border border-white/10">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center">
              <Trophy size={24} className="mr-3 text-[#00CFFF]" />
              Basic Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#C7C7C7] mb-2">
                  Hackathon Title *
                </label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  className="w-full px-4 py-3 bg-[#1A1A1A] border border-white/10 rounded-lg text-white placeholder-[#A0A0A0] focus:border-[#00CFFF] focus:outline-none transition-colors"
                  placeholder="Enter hackathon title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#C7C7C7] mb-2">
                  Location *
                </label>
                <input
                  type="text"
                  required
                  value={form.location}
                  onChange={(e) =>
                    handleInputChange("location", e.target.value)
                  }
                  className="w-full px-4 py-3 bg-[#1A1A1A] border border-white/10 rounded-lg text-white placeholder-[#A0A0A0] focus:border-[#00CFFF] focus:outline-none transition-colors"
                  placeholder="City, Country"
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-[#C7C7C7] mb-2">
                Description *
              </label>
              <textarea
                required
                value={form.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                rows={4}
                className="w-full px-4 py-3 bg-[#1A1A1A] border border-white/10 rounded-lg text-white placeholder-[#A0A0A0] focus:border-[#00CFFF] focus:outline-none transition-colors resize-none"
                placeholder="Describe your hackathon, themes, and objectives"
              />
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-[#C7C7C7] mb-2">
                Tags
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {form.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="flex items-center space-x-2 px-3 py-1 bg-[#1E3C72]/20 text-[#00CFFF] text-sm font-medium rounded-full border border-[#00CFFF]/20"
                  >
                    <span>{tag}</span>
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="text-[#00CFFF] hover:text-white transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) =>
                    e.key === "Enter" && (e.preventDefault(), addTag())
                  }
                  className="flex-1 px-4 py-2 bg-[#1A1A1A] border border-white/10 rounded-lg text-white placeholder-[#A0A0A0] focus:border-[#00CFFF] focus:outline-none transition-colors"
                  placeholder="Add tag (e.g., AI, Web3, Mobile)"
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="px-4 py-2 bg-[#00CFFF]/20 text-[#00CFFF] rounded-lg hover:bg-[#00CFFF]/30 transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Event Details */}
          <div className="bg-[#121212] rounded-2xl p-6 border border-white/10">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center">
              <Calendar size={24} className="mr-3 text-[#00CFFF]" />
              Event Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#C7C7C7] mb-2">
                  Start Date *
                </label>
                <input
                  type="datetime-local"
                  required
                  value={form.startDate}
                  onChange={(e) =>
                    handleInputChange("startDate", e.target.value)
                  }
                  className="w-full px-4 py-3 bg-[#1A1A1A] border border-white/10 rounded-lg text-white focus:border-[#00CFFF] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#C7C7C7] mb-2">
                  End Date *
                </label>
                <input
                  type="datetime-local"
                  required
                  value={form.endDate}
                  onChange={(e) => handleInputChange("endDate", e.target.value)}
                  className="w-full px-4 py-3 bg-[#1A1A1A] border border-white/10 rounded-lg text-white focus:border-[#00CFFF] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#C7C7C7] mb-2">
                  Registration Deadline *
                </label>
                <input
                  type="datetime-local"
                  required
                  value={form.registrationDeadline}
                  onChange={(e) =>
                    handleInputChange("registrationDeadline", e.target.value)
                  }
                  className="w-full px-4 py-3 bg-[#1A1A1A] border border-white/10 rounded-lg text-white focus:border-[#00CFFF] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#C7C7C7] mb-2">
                  Event Type *
                </label>
                <select
                  required
                  value={form.type}
                  onChange={(e) =>
                    handleInputChange(
                      "type",
                      e.target.value as "online" | "in-person" | "hybrid",
                    )
                  }
                  className="w-full px-4 py-3 bg-[#1A1A1A] border border-white/10 rounded-lg text-white focus:border-[#00CFFF] focus:outline-none transition-colors"
                >
                  <option value="in-person">In-Person</option>
                  <option value="online">Online</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>
            </div>
          </div>

          {/* Team Configuration */}
          <div className="bg-[#121212] rounded-2xl p-6 border border-white/10">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center">
              <Users size={24} className="mr-3 text-[#00CFFF]" />
              Team Configuration
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#C7C7C7] mb-2">
                  Maximum Number of Teams
                </label>
                <input
                  type="number"
                  min="1"
                  value={form.maxTeams}
                  onChange={(e) =>
                    handleInputChange("maxTeams", parseInt(e.target.value))
                  }
                  className="w-full px-4 py-3 bg-[#1A1A1A] border border-white/10 rounded-lg text-white focus:border-[#00CFFF] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#C7C7C7] mb-2">
                  Maximum Members per Team
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={form.maxMembersPerTeam}
                  onChange={(e) =>
                    handleInputChange(
                      "maxMembersPerTeam",
                      parseInt(e.target.value),
                    )
                  }
                  className="w-full px-4 py-3 bg-[#1A1A1A] border border-white/10 rounded-lg text-white focus:border-[#00CFFF] focus:outline-none transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Prize Information */}
          <div className="bg-[#121212] rounded-2xl p-6 border border-white/10">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center">
              <Trophy size={24} className="mr-3 text-[#00CFFF]" />
              Prize Information
            </h2>

            <div>
              <label className="block text-sm font-medium text-[#C7C7C7] mb-2">
                Prize Pool
              </label>
              <input
                type="text"
                value={form.prize}
                onChange={(e) => handleInputChange("prize", e.target.value)}
                className="w-full px-4 py-3 bg-[#1A1A1A] border border-white/10 rounded-lg text-white placeholder-[#A0A0A0] focus:border-[#00CFFF] focus:outline-none transition-colors"
                placeholder="e.g., $25,000 or 'Amazing prizes'"
              />
            </div>
          </div>

          {/* External Links */}
          <div className="bg-[#121212] rounded-2xl p-6 border border-white/10">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center">
              <Globe size={24} className="mr-3 text-[#00CFFF]" />
              External Links (Optional)
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#C7C7C7] mb-2">
                  Notion Page
                </label>
                <input
                  type="url"
                  value={form.externalLinks.notion || ""}
                  onChange={(e) =>
                    handleExternalLinkChange("notion", e.target.value)
                  }
                  className="w-full px-4 py-3 bg-[#1A1A1A] border border-white/10 rounded-lg text-white placeholder-[#A0A0A0] focus:border-[#00CFFF] focus:outline-none transition-colors"
                  placeholder="https://notion.so/..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#C7C7C7] mb-2">
                  GitHub Repository
                </label>
                <input
                  type="url"
                  value={form.externalLinks.github || ""}
                  onChange={(e) =>
                    handleExternalLinkChange("github", e.target.value)
                  }
                  className="w-full px-4 py-3 bg-[#1A1A1A] border border-white/10 rounded-lg text-white placeholder-[#A0A0A0] focus:border-[#00CFFF] focus:outline-none transition-colors"
                  placeholder="https://github.com/..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#C7C7C7] mb-2">
                  External Registration Form
                </label>
                <input
                  type="url"
                  value={form.externalLinks.registrationForm || ""}
                  onChange={(e) =>
                    handleExternalLinkChange("registrationForm", e.target.value)
                  }
                  className="w-full px-4 py-3 bg-[#1A1A1A] border border-white/10 rounded-lg text-white placeholder-[#A0A0A0] focus:border-[#00CFFF] focus:outline-none transition-colors"
                  placeholder="https://forms.google.com/..."
                />
              </div>
            </div>
          </div>

          {/* Files */}
          <div className="bg-[#121212] rounded-2xl p-6 border border-white/10">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center">
              <Upload size={24} className="mr-3 text-[#00CFFF]" />
              Files
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#C7C7C7] mb-2">
                  Cover Image
                </label>
                <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center hover:border-[#00CFFF]/50 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      handleFileChange(
                        "coverImage",
                        e.target.files?.[0] || null,
                      )
                    }
                    className="hidden"
                    id="coverImage"
                  />
                  <label htmlFor="coverImage" className="cursor-pointer">
                    <Upload size={32} className="text-[#A0A0A0] mx-auto mb-2" />
                    <p className="text-[#A0A0A0] text-sm">
                      Click to upload cover image
                    </p>
                    {form.coverImage && (
                      <p className="text-[#00CFFF] text-sm mt-2">
                        {form.coverImage.name}
                      </p>
                    )}
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#C7C7C7] mb-2">
                  Hackathon Rules (PDF)
                </label>
                <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center hover:border-[#00CFFF]/50 transition-colors">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) =>
                      handleFileChange("rules", e.target.files?.[0] || null)
                    }
                    className="hidden"
                    id="rules"
                  />
                  <label htmlFor="rules" className="cursor-pointer">
                    <FileText
                      size={32}
                      className="text-[#A0A0A0] mx-auto mb-2"
                    />
                    <p className="text-[#A0A0A0] text-sm">
                      Click to upload rules document
                    </p>
                    {form.rules && (
                      <p className="text-[#00CFFF] text-sm mt-2">
                        {form.rules.name}
                      </p>
                    )}
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Registration Questions */}
          <div className="bg-[#121212] rounded-2xl p-6 border border-white/10">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center">
              <FileText size={24} className="mr-3 text-[#00CFFF]" />
              Registration Questions
            </h2>

            <div className="space-y-4 mb-6">
              {form.registrationQuestions.map((question) => (
                <div
                  key={question.id}
                  className="flex items-center justify-between p-4 bg-[#1A1A1A] rounded-lg"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-white font-medium">
                        {question.question}
                      </span>
                      {question.required && (
                        <span className="px-2 py-1 bg-[#FF3B30]/20 text-[#FF3B30] text-xs rounded-full">
                          Required
                        </span>
                      )}
                    </div>
                    <span className="text-[#A0A0A0] text-sm capitalize">
                      {question.type}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeQuestion(question.id)}
                    className="p-2 text-[#FF3B30] hover:bg-[#FF3B30]/10 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#C7C7C7] mb-2">
                  Question
                </label>
                <input
                  type="text"
                  value={newQuestion.question}
                  onChange={(e) =>
                    setNewQuestion((prev) => ({
                      ...prev,
                      question: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-3 bg-[#1A1A1A] border border-white/10 rounded-lg text-white placeholder-[#A0A0A0] focus:border-[#00CFFF] focus:outline-none transition-colors"
                  placeholder="Enter your question"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#C7C7C7] mb-2">
                    Question Type
                  </label>
                  <select
                    value={newQuestion.type}
                    onChange={(e) =>
                      setNewQuestion((prev) => ({
                        ...prev,
                        type: e.target.value as
                          | "text"
                          | "textarea"
                          | "select"
                          | "checkbox"
                          | "file",
                      }))
                    }
                    className="w-full px-4 py-3 bg-[#1A1A1A] border border-white/10 rounded-lg text-white focus:border-[#00CFFF] focus:outline-none transition-colors"
                  >
                    <option value="text">Text</option>
                    <option value="textarea">Long Text</option>
                    <option value="select">Multiple Choice</option>
                    <option value="checkbox">Checkbox</option>
                    <option value="file">File Upload</option>
                  </select>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="required"
                    checked={newQuestion.required}
                    onChange={(e) =>
                      setNewQuestion((prev) => ({
                        ...prev,
                        required: e.target.checked,
                      }))
                    }
                    className="w-4 h-4 text-[#00CFFF] bg-[#1A1A1A] border-white/10 rounded focus:ring-[#00CFFF] focus:ring-2"
                  />
                  <label
                    htmlFor="required"
                    className="text-sm font-medium text-[#C7C7C7]"
                  >
                    Required
                  </label>
                </div>
              </div>

              <button
                type="button"
                onClick={addQuestion}
                className="flex items-center space-x-2 px-4 py-2 bg-[#00CFFF]/20 text-[#00CFFF] rounded-lg hover:bg-[#00CFFF]/30 transition-colors"
              >
                <Plus size={16} />
                <span>Add Question</span>
              </button>
            </div>
          </div>

          {/* Submit */}
          <div className="flex items-center justify-end space-x-4 pt-6">
            <Link
              href={`/dashboard/clubs/${club.id}/manage`}
              className="px-6 py-3 text-[#A0A0A0] hover:text-white transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-[#1E3C72] to-[#00CFFF] text-white rounded-lg font-medium hover:from-[#1E3C72]/90 hover:to-[#00CFFF]/90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Creating...</span>
                </>
              ) : (
                <>
                  <Save size={16} />
                  <span>Create Hackathon</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

