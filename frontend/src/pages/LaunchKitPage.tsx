import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiService } from "../services/api";
import type { Project, LaunchKitOutput } from "../types";

interface LaunchKitPageProps {
  project: Project;
}

export default function LaunchKitPage({ project }: LaunchKitPageProps) {
  const [launchKitData, setLaunchKitData] = useState<LaunchKitOutput | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loadLaunchKitData = async () => {
      try {
        const data = await apiService.generateLaunchKit(project.id);
        setLaunchKitData(data);
      } catch (err) {
        setError("Failed to load launch kit");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadLaunchKitData();
  }, [project.id]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="text-white text-xl">Loading launch kit...</div>
      </div>
    );
  }

  if (error || !launchKitData) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="text-red-400 text-xl">{error || "No data available"}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-8 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Launch Kit</h1>
          <p className="text-gray-400">
            Ready-to-use messaging and content for your brand launch
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Landing Page */}
          <div className="bg-white/10 backdrop-blur-sm border border-purple-500/30 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Landing Page</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Headline</label>
                <p className="text-white text-lg font-semibold">
                  {launchKitData.landing_page_headline}
                </p>
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Subheadline</label>
                <p className="text-white">{launchKitData.landing_page_subheadline}</p>
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-1 block">CTA</label>
                <p className="text-white">{launchKitData.cta}</p>
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="bg-white/10 backdrop-blur-sm border border-purple-500/30 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-4">About Section</h2>
            <p className="text-white">{launchKitData.about_section}</p>
          </div>

          {/* Product Description */}
          <div className="bg-white/10 backdrop-blur-sm border border-purple-500/30 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Product Description</h2>
            <p className="text-white">{launchKitData.product_description}</p>
          </div>

          {/* Pitches */}
          <div className="bg-white/10 backdrop-blur-sm border border-purple-500/30 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Pitches</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Founder Pitch</label>
                <p className="text-white">{launchKitData.founder_pitch}</p>
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Elevator Pitch</label>
                <p className="text-white">{launchKitData.elevator_pitch}</p>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="bg-white/10 backdrop-blur-sm border border-purple-500/30 rounded-lg p-6 lg:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-4">Social Media</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-400 mb-1 block">LinkedIn Launch Post</label>
                <div className="relative">
                  <textarea
                    readOnly
                    value={launchKitData.linkedin_launch_post}
                    className="w-full h-32 bg-white/5 border border-purple-500/20 rounded-lg p-3 text-white text-sm resize-none"
                  />
                  <button
                    onClick={() => copyToClipboard(launchKitData.linkedin_launch_post)}
                    className="absolute top-2 right-2 bg-purple-600 hover:bg-purple-700 text-white text-xs px-2 py-1 rounded"
                  >
                    Copy
                  </button>
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Instagram Caption</label>
                <div className="relative">
                  <textarea
                    readOnly
                    value={launchKitData.instagram_caption}
                    className="w-full h-32 bg-white/5 border border-purple-500/20 rounded-lg p-3 text-white text-sm resize-none"
                  />
                  <button
                    onClick={() => copyToClipboard(launchKitData.instagram_caption)}
                    className="absolute top-2 right-2 bg-purple-600 hover:bg-purple-700 text-white text-xs px-2 py-1 rounded"
                  >
                    Copy
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Brand Voice Examples */}
          <div className="bg-white/10 backdrop-blur-sm border border-purple-500/30 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Brand Voice Examples</h2>
            <ul className="text-white list-disc list-inside space-y-2">
              {launchKitData.brand_voice_examples.map((example, index) => (
                <li key={index}>{example}</li>
              ))}
            </ul>
          </div>

          {/* Messaging Guidelines */}
          <div className="bg-white/10 backdrop-blur-sm border border-purple-500/30 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Messaging Guidelines</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-green-400 mb-2 block">Do</label>
                <ul className="text-white list-disc list-inside space-y-1">
                  {launchKitData.do_messaging.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <label className="text-sm text-red-400 mb-2 block">Don't</label>
                <ul className="text-white list-disc list-inside space-y-1">
                  {launchKitData.dont_messaging.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => navigate("/brand-intelligence")}
            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Back to Brand Intelligence
          </button>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors duration-200"
          >
            Start New Project
          </button>
        </div>
      </div>
    </div>
  );
}
