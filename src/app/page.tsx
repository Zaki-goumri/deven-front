"use client";

import { useState } from "react";
import { Eye, EyeOff, Github, Mail, Users, Calendar, Trophy, MessageSquare } from "lucide-react";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would handle authentication
    console.log("Form submitted:", formData);
    // For demo purposes, just show success
    alert("Authentication successful! Redirecting to dashboard...");
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0A0A] via-[#1E3C72] to-[#000000]">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#6A00FF] rounded-full blur-3xl opacity-20"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#00CFFF] rounded-full blur-3xl opacity-20"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
          
          {/* Left Side - Hero Content */}
          <div className="text-white space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white to-[#00CFFF] bg-clip-text text-transparent">
                Deven
              </h1>
              <p className="text-xl text-[#C7C7C7] max-w-md">
                The ultimate platform for sharing tech events and hackathons. Connect, collaborate, and create amazing projects.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Users className="w-6 h-6 text-[#00CFFF]" />
                <span className="text-[#C7C7C7]">Join Algerian tech clubs</span>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="w-6 h-6 text-[#00CFFF]" />
                <span className="text-[#C7C7C7]">Discover hackathons</span>
              </div>
              <div className="flex items-center space-x-3">
                <Trophy className="w-6 h-6 text-[#00CFFF]" />
                <span className="text-[#C7C7C7]">Win amazing prizes</span>
              </div>
              <div className="flex items-center space-x-3">
                <MessageSquare className="w-6 h-6 text-[#00CFFF]" />
                <span className="text-[#C7C7C7]">Connect with participants</span>
              </div>
            </div>

            {/* Trust Logos */}
            <div className="pt-8">
              <p className="text-sm text-[#A0A0A0] mb-4">Trusted by leading tech clubs</p>
              <div className="flex space-x-6 opacity-60">
                <div className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center">
                  <span className="text-xs font-semibold">Club 1</span>
                </div>
                <div className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center">
                  <span className="text-xs font-semibold">Club 2</span>
                </div>
                <div className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center">
                  <span className="text-xs font-semibold">Club 3</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Auth Form */}
          <div className="card p-8 max-w-md mx-auto w-full">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">
                {isLogin ? "Welcome Back" : "Create Account"}
              </h2>
              <p className="text-[#A0A0A0]">
                {isLogin ? "Sign in to your account" : "Join the community"}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-[#C7C7C7] mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    className="input-field w-full px-4 py-3"
                    placeholder="Enter your full name"
                    required={!isLogin}
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-[#C7C7C7] mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="input-field w-full px-4 py-3"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#C7C7C7] mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    className="input-field w-full px-4 py-3 pr-12"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#A0A0A0] hover:text-white"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {isLogin && (
                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm text-[#A0A0A0]">Remember me</span>
                  </label>
                  <button type="button" className="text-sm text-[#00CFFF] hover:underline">
                    Forgot password?
                  </button>
                </div>
              )}

              <button type="submit" className="btn-primary w-full">
                {isLogin ? "Sign In" : "Create Account"}
              </button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#A0A0A0]/30"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-[#121212] text-[#A0A0A0]">Or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button type="button" className="btn-secondary flex items-center justify-center space-x-2">
                  <Github size={20} />
                  <span>GitHub</span>
                </button>
                <button type="button" className="btn-secondary flex items-center justify-center space-x-2">
                  <Mail size={20} />
                  <span>Google</span>
                </button>
              </div>
            </form>

            <div className="mt-8 text-center">
              <p className="text-[#A0A0A0]">
                {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-[#00CFFF] hover:underline font-medium"
                >
                  {isLogin ? "Sign up" : "Sign in"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
