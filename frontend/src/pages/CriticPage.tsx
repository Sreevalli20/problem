import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiService } from "../services/api";
import type { Project, CritiqueOutput } from "../types";

interface CriticPageProps {
  project: Project;
}

export default function CriticPage({ project }: CriticPageProps) {
  const [critiqueData, setCritiqueData] = useState<CritiqueOutput | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loadCritiqueData = async () => {
      try {
        const data = await apiService.runCritique(project.id);
        setCritiqueData(data);
      } catch (err) {
        setError("Failed to load critique data");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadCritiqueData();
  }, [project.id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Loading critique analysis...</div>
      </div>
    );
  }

  if (error || !critiqueData) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-red-400 text-xl">{error || "No data available"}</div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-500/20 border-green-500/50 text-green-200";
      case "needs_revision":
        return "bg-yellow-500/20 border-yellow-500/50 text-yellow-200";
      case "rejected":
        return "bg-red-500/20 border-red-500/50 text-red-200";
      default:
        return "bg-gray-500/20 border-gray-500/50 text-gray-200";
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-500/30 text-red-200";
      case "medium":
        return "bg-yellow-500/30 text-yellow-200";
      case "low":
        return "bg-blue-500/30 text-blue-200";
      default:
        return "bg-gray-500/30 text-gray-200";
    }
  };

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Anti-Generic Critic</h1>
          <p className="text-gray-400">
            Analysis of clichés, vague claims, and generic language
          </p>
        </div>

        {/* Overall Status */}
        <div className={`mb-6 px-6 py-4 rounded-lg border ${getStatusColor(critiqueData.status)}`}>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-1">
                Status: {critiqueData.status.toUpperCase()}
              </h2>
              <p className="text-sm">Overall Score: {critiqueData.overall_score}</p>
            </div>
          </div>
        </div>

        {/* Issues */}
        {critiqueData.issues.length > 0 && (
          <div className="bg-white/10 backdrop-blur-sm border border-purple-500/30 rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-bold text-white mb-4">Issues Found</h2>
            <div className="space-y-4">
              {critiqueData.issues.map((issue, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg ${getSeverityColor(issue.severity)}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-lg">{issue.type}</h3>
                    <span className="text-xs uppercase px-2 py-1 rounded bg-black/20">
                      {issue.severity}
                    </span>
                  </div>
                  <p className="mb-2">{issue.description}</p>
                  <p className="text-sm opacity-80 mb-2">
                    <strong>Evidence:</strong> {issue.evidence}
                  </p>
                  <p className="text-sm">
                    <strong>Replacement:</strong> {issue.replacement_direction}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Key Concerns */}
        {critiqueData.key_concerns.length > 0 && (
          <div className="bg-white/10 backdrop-blur-sm border border-purple-500/30 rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-bold text-white mb-4">Key Concerns</h2>
            <ul className="text-white list-disc list-inside space-y-2">
              {critiqueData.key_concerns.map((concern, index) => (
                <li key={index}>{concern}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Strengths */}
        {critiqueData.strengths.length > 0 && (
          <div className="bg-white/10 backdrop-blur-sm border border-purple-500/30 rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-bold text-white mb-4">Strengths</h2>
            <ul className="text-white list-disc list-inside space-y-2">
              {critiqueData.strengths.map((strength, index) => (
                <li key={index}>{strength}</li>
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
            onClick={() => navigate("/debate")}
            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors duration-200"
          >
            View Debate
          </button>
        </div>
      </div>
    </div>
  );
}
