import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiService } from "../services/api";
import type { Project, DebateOutput } from "../types";

interface DebatePageProps {
  project: Project;
}

export default function DebatePage({ project }: DebatePageProps) {
  const [debateData, setDebateData] = useState<DebateOutput | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loadDebateData = async () => {
      try {
        const data = await apiService.runDebate(project.id);
        setDebateData(data);
      } catch (err) {
        setError("Failed to load debate data");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadDebateData();
  }, [project.id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="text-white text-xl">Loading brand debate...</div>
      </div>
    );
  }

  if (error || !debateData) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="text-red-400 text-xl">{error || "No data available"}</div>
      </div>
    );
  }

  const getScoreColor = (score: string) => {
    switch (score) {
      case "Strong":
        return "bg-green-500/20 border-green-500/50 text-green-200";
      case "Moderate":
        return "bg-yellow-500/20 border-yellow-500/50 text-yellow-200";
      case "Needs Work":
        return "bg-red-500/20 border-red-500/50 text-red-200";
      default:
        return "bg-gray-500/20 border-gray-500/50 text-gray-200";
    }
  };

  return (
    <div className="min-h-screen px-4 py-8 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Brand Debate</h1>
          <p className="text-gray-400">
            Multi-perspective evaluation of your brand direction
          </p>
        </div>

        {/* Overall Assessment */}
        <div className="bg-white/10 backdrop-blur-sm border border-purple-500/30 rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-white mb-4">
            Overall Assessment
          </h2>
          <p className="text-white text-lg">{debateData.overall_assessment}</p>
        </div>

        {/* Perspectives */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {debateData.perspectives.map((perspective, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm border border-purple-500/30 rounded-lg p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">
                  {perspective.name}
                </h3>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${getScoreColor(
                    perspective.score
                  )}`}
                >
                  {perspective.score}
                </span>
              </div>
              <p className="text-gray-300 mb-4">{perspective.evaluation}</p>

              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-400 mb-2">
                  Criteria
                </h4>
                <ul className="text-white text-sm list-disc list-inside">
                  {perspective.criteria.map((criterion, i) => (
                    <li key={i}>{criterion}</li>
                  ))}
                </ul>
              </div>

              {perspective.findings.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-green-400 mb-2">
                    Findings
                  </h4>
                  <ul className="text-white text-sm list-disc list-inside">
                    {perspective.findings.map((finding, i) => (
                      <li key={i}>{finding}</li>
                    ))}
                  </ul>
                </div>
              )}

              {perspective.concerns.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-red-400 mb-2">
                    Concerns
                  </h4>
                  <ul className="text-white text-sm list-disc list-inside">
                    {perspective.concerns.map((concern, i) => (
                      <li key={i}>{concern}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Agreements */}
        {debateData.agreements.length > 0 && (
          <div className="bg-white/10 backdrop-blur-sm border border-purple-500/30 rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-bold text-white mb-4">Agreements</h2>
            <ul className="text-white list-disc list-inside space-y-2">
              {debateData.agreements.map((agreement, index) => (
                <li key={index}>{agreement}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Disagreements */}
        {debateData.disagreements.length > 0 && (
          <div className="bg-white/10 backdrop-blur-sm border border-purple-500/30 rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-bold text-white mb-4">Disagreements</h2>
            <ul className="text-white list-disc list-inside space-y-2">
              {debateData.disagreements.map((disagreement, index) => (
                <li key={index}>{disagreement}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Risks */}
        {debateData.risks.length > 0 && (
          <div className="bg-white/10 backdrop-blur-sm border border-purple-500/30 rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-bold text-white mb-4">Risks</h2>
            <ul className="text-white list-disc list-inside space-y-2">
              {debateData.risks.map((risk, index) => (
                <li key={index}>{risk}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Recommended Changes */}
        {debateData.recommended_changes.length > 0 && (
          <div className="bg-white/10 backdrop-blur-sm border border-purple-500/30 rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-bold text-white mb-4">
              Recommended Changes
            </h2>
            <ul className="text-white list-disc list-inside space-y-2">
              {debateData.recommended_changes.map((change, index) => (
                <li key={index}>{change}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex gap-4">
          <button
            onClick={() => navigate("/workflow")}
            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Back to Workflow
          </button>
          <button
            onClick={() => navigate("/consistency")}
            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors duration-200"
          >
            View Consistency
          </button>
        </div>
      </div>
    </div>
  );
}
