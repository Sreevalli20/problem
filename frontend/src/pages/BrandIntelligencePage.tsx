import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiService } from "../services/api";
import type { Project, FinalBrandOutput } from "../types";

interface BrandIntelligencePageProps {
  project: Project;
}

export default function BrandIntelligencePage({
  project,
}: BrandIntelligencePageProps) {
  const [brandData, setBrandData] = useState<FinalBrandOutput | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loadBrandData = async () => {
      try {
        const data = await apiService.runFinalize(project.id);
        setBrandData(data);
      } catch (err) {
        setError("Failed to load brand intelligence");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadBrandData();
  }, [project.id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Loading brand intelligence...</div>
      </div>
    );
  }

  if (error || !brandData) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-red-400 text-xl">{error || "No data available"}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Brand Intelligence
          </h1>
          <p className="text-gray-400">
            Complete brand analysis and recommendations
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Brand Direction */}
          <div className="bg-white/10 backdrop-blur-sm border border-purple-500/30 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-4">
              Brand Direction
            </h2>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-gray-400">One-Line Description</label>
                <p className="text-white">{brandData.one_line_description}</p>
              </div>
              <div>
                <label className="text-sm text-gray-400">Category</label>
                <p className="text-white">{brandData.brand_direction}</p>
              </div>
              <div>
                <label className="text-sm text-gray-400">Positioning</label>
                <p className="text-white">{brandData.positioning}</p>
              </div>
            </div>
          </div>

          {/* Target & Problem */}
          <div className="bg-white/10 backdrop-blur-sm border border-purple-500/30 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-4">
              Target & Problem
            </h2>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-gray-400">Target Audience</label>
                <p className="text-white">{brandData.target_audience}</p>
              </div>
              <div>
                <label className="text-sm text-gray-400">Core Problem</label>
                <p className="text-white">{brandData.core_problem}</p>
              </div>
              <div>
                <label className="text-sm text-gray-400">Differentiator</label>
                <p className="text-white">{brandData.differentiator}</p>
              </div>
            </div>
          </div>

          {/* Personality */}
          <div className="bg-white/10 backdrop-blur-sm border border-purple-500/30 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Personality</h2>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-gray-400">Core Traits</label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {brandData.personality.core_traits.map((trait, i) => (
                    <span
                      key={i}
                      className="bg-purple-600/50 text-white px-3 py-1 rounded-full text-sm"
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-400">Emotional Character</label>
                <p className="text-white">{brandData.personality.emotional_character}</p>
              </div>
              <div>
                <label className="text-sm text-gray-400">Communication Style</label>
                <p className="text-white">{brandData.personality.communication_style}</p>
              </div>
            </div>
          </div>

          {/* Voice & Messaging */}
          <div className="bg-white/10 backdrop-blur-sm border border-purple-500/30 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-4">
              Voice & Messaging
            </h2>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-gray-400">Tagline</label>
                <p className="text-white text-lg font-semibold">
                  {brandData.tagline}
                </p>
              </div>
              <div>
                <label className="text-sm text-gray-400">Voice Examples</label>
                <ul className="text-white list-disc list-inside mt-1">
                  {brandData.personality.voice_examples.map((example, i) => (
                    <li key={i}>{example}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Visual Direction */}
          <div className="bg-white/10 backdrop-blur-sm border border-purple-500/30 rounded-lg p-6 lg:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-4">Visual Direction</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-400">Visual Mood</label>
                <p className="text-white">{brandData.visual_direction.visual_mood}</p>
              </div>
              <div>
                <label className="text-sm text-gray-400">Color Direction</label>
                <p className="text-white">{brandData.color_direction}</p>
              </div>
              <div>
                <label className="text-sm text-gray-400">Typography</label>
                <p className="text-white">{brandData.typography}</p>
              </div>
              <div>
                <label className="text-sm text-gray-400">Imagery</label>
                <p className="text-white">{brandData.imagery}</p>
              </div>
              <div className="md:col-span-2">
                <label className="text-sm text-gray-400">Logo Concepts</label>
                <ul className="text-white list-disc list-inside mt-1">
                  {brandData.logo_concept_directions.map((concept, i) => (
                    <li key={i}>{concept}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Naming Territories */}
          <div className="bg-white/10 backdrop-blur-sm border border-purple-500/30 rounded-lg p-6 lg:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-4">Naming Territories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {brandData.naming_territories.map((territory, i) => (
                <div
                  key={i}
                  className="bg-white/5 border border-purple-500/20 rounded-lg p-4"
                >
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {territory.type}
                  </h3>
                  <p className="text-sm text-gray-400 mb-2">
                    {territory.description}
                  </p>
                  <div className="mb-2">
                    <label className="text-xs text-gray-500">Examples:</label>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {territory.examples.map((example, j) => (
                        <span
                          key={j}
                          className="bg-purple-600/30 text-white px-2 py-0.5 rounded text-xs"
                        >
                          {example}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-gray-400">{territory.rationale}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Assumptions & Risks */}
          <div className="bg-white/10 backdrop-blur-sm border border-purple-500/30 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Assumptions</h2>
            <ul className="text-white list-disc list-inside space-y-1">
              {brandData.assumptions.map((assumption, i) => (
                <li key={i}>{assumption}</li>
              ))}
            </ul>
          </div>

          <div className="bg-white/10 backdrop-blur-sm border border-purple-500/30 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Risks</h2>
            <ul className="text-white list-disc list-inside space-y-1">
              {brandData.risks.map((risk, i) => (
                <li key={i}>{risk}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => navigate("/launch-kit")}
            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Generate Launch Kit
          </button>
          <button
            onClick={() => navigate("/workflow")}
            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors duration-200"
          >
            Back to Workflow
          </button>
        </div>
      </div>
    </div>
  );
}
