import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiService } from "../services/api";
import type { Project } from "../types";

interface StartPageProps {
  onProjectCreate: (project: Project) => void;
}

export default function StartPage({ onProjectCreate }: StartPageProps) {
  const [idea, setIdea] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!idea.trim()) {
      setError("Please enter your idea");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const project = await apiService.createProject(idea);
      onProjectCreate(project);
      navigate("/interview");
    } catch (err) {
      setError("Failed to create project. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-white mb-4 tracking-tight">
            BrandForge AI
          </h1>
          <p className="text-2xl text-purple-200 mb-2">
            From Idea to Brand Intelligence
          </p>
          <p className="text-gray-400">
            Transform your raw startup idea into a complete brand intelligence system
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="idea"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              What's your startup idea?
            </label>
            <textarea
              id="idea"
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              placeholder="I want to build a platform that helps college students find teammates for hackathons..."
              className="w-full h-40 px-4 py-3 bg-white/10 backdrop-blur-sm border border-purple-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              disabled={isLoading}
            />
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Creating Project..." : "Start Brand Analysis"}
          </button>
        </form>

        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>Powered by brand intelligence engine</p>
        </div>
      </div>
    </div>
  );
}
