import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiService } from "../services/api";
import type { Project, ConsistencyOutput } from "../types";

interface ConsistencyPageProps {
  project: Project;
}

export default function ConsistencyPage({ project }: ConsistencyPageProps) {
  const [consistencyData, setConsistencyData] = useState<ConsistencyOutput | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loadConsistencyData = async () => {
      try {
        const data = await apiService.runConsistency(project.id);
        setConsistencyData(data);
      } catch (err) {
        setError("Failed to load consistency data");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadConsistencyData();
  }, [project.id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Loading consistency analysis...</div>
      </div>
    );
  }

  if (error || !consistencyData) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-red-400 text-xl">{error || "No data available"}</div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "consistent":
        return "bg-green-500/20 border-green-500/50 text-green-200";
      case "warning":
        return "bg-yellow-500/20 border-yellow-500/50 text-yellow-200";
      case "inconsistent":
        return "bg-red-500/20 border-red-500/50 text-red-200";
      default:
        return "bg-gray-500/20 border-gray-500/50 text-gray-200";
    }
  };

  const getCheckStatusColor = (status: string) => {
    switch (status) {
      case "consistent":
        return "text-green-400";
      case "warning":
        return "text-yellow-400";
      case "inconsistent":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Consistency Guardian</h1>
          <p className="text-gray-400">
            Analysis of consistency across all brand elements
          </p>
        </div>

        {/* Overall Status */}
        <div className={`mb-6 px-6 py-4 rounded-lg border ${getStatusColor(consistencyData.overall_status)}`}>
          <h2 className="text-2xl font-bold mb-1">
            Overall Status: {consistencyData.overall_status.toUpperCase()}
          </h2>
        </div>

        {/* Consistency Checks */}
        <div className="bg-white/10 backdrop-blur-sm border border-purple-500/30 rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-white mb-4">Consistency Checks</h2>
          <div className="space-y-4">
            {consistencyData.checks.map((check, index) => (
              <div
                key={index}
                className="bg-white/5 border border-purple-500/20 rounded-lg p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-white">
                    {check.aspect}
                  </h3>
                  <span className={`text-sm font-semibold capitalize ${getCheckStatusColor(check.status)}`}>
                    {check.status}
                  </span>
                </div>
                <p className="text-gray-300 text-sm">{check.details}</p>
                {check.severity !== "none" && (
                  <p className="text-xs text-gray-400 mt-1">
                    Severity: {check.severity}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contradictions */}
        {consistencyData.contradictions.length > 0 && (
          <div className="bg-white/10 backdrop-blur-sm border border-purple-500/30 rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-bold text-white mb-4">Contradictions</h2>
            <ul className="text-white list-disc list-inside space-y-2">
              {consistencyData.contradictions.map((contradiction, index) => (
                <li key={index} className="text-red-300">{contradiction}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Mismatches */}
        {consistencyData.mismatches.length > 0 && (
          <div className="bg-white/10 backdrop-blur-sm border border-purple-500/30 rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-bold text-white mb-4">Mismatches</h2>
            <ul className="text-white list-disc list-inside space-y-2">
              {consistencyData.mismatches.map((mismatch, index) => (
                <li key={index} className="text-yellow-300">{mismatch}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Recommendations */}
        {consistencyData.recommendations.length > 0 && (
          <div className="bg-white/10 backdrop-blur-sm border border-purple-500/30 rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-bold text-white mb-4">Recommendations</h2>
            <ul className="text-white list-disc list-inside space-y-2">
              {consistencyData.recommendations.map((recommendation, index) => (
                <li key={index}>{recommendation}</li>
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
            onClick={() => navigate("/brand-intelligence")}
            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors duration-200"
          >
            View Brand Intelligence
          </button>
        </div>
      </div>
    </div>
  );
}
