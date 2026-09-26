import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiService } from "../services/api";
import type { Project, WorkflowStage } from "../types";

interface WorkflowPageProps {
  project: Project;
}

const STAGES = [
  { name: "Discovery", key: "discovery" },
  { name: "Audience", key: "audience" },
  { name: "Positioning", key: "positioning" },
  { name: "Personality", key: "personality" },
  { name: "Creative Direction", key: "creative" },
  { name: "Anti-Generic Critic", key: "critique" },
  { name: "Brand Debate", key: "debate" },
  { name: "Consistency Guardian", key: "consistency" },
  { name: "Final Intelligence", key: "finalize" },
];

export default function WorkflowPage({ project }: WorkflowPageProps) {
  const [stages, setStages] = useState<WorkflowStage[]>(
    STAGES.map((s) => ({ name: s.name, status: "idle" as const }))
  );
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const runStage = async (stageIndex: number) => {
    if (stageIndex >= STAGES.length) return;

    const stage = STAGES[stageIndex];
    setStages((prev) =>
      prev.map((s, i) =>
        i === stageIndex ? { ...s, status: "running" } : s
      )
    );

    try {
      let data;
      switch (stage.key) {
        case "discovery":
          data = await apiService.runDiscovery(project.id);
          break;
        case "audience":
          data = await apiService.runAudience(project.id);
          break;
        case "positioning":
          data = await apiService.runPositioning(project.id);
          break;
        case "personality":
          data = await apiService.runPersonality(project.id);
          break;
        case "creative":
          data = await apiService.runCreative(project.id);
          break;
        case "critique":
          data = await apiService.runCritique(project.id);
          break;
        case "debate":
          data = await apiService.runDebate(project.id);
          break;
        case "consistency":
          data = await apiService.runConsistency(project.id);
          break;
        case "finalize":
          data = await apiService.runFinalize(project.id);
          break;
        default:
          throw new Error(`Unknown stage: ${stage.key}`);
      }

      setStages((prev) =>
        prev.map((s, i) =>
          i === stageIndex ? { ...s, status: "completed", data } : s
        )
      );

      // Run next stage after a short delay
      setTimeout(() => runStage(stageIndex + 1), 500);
    } catch (err) {
      console.error(err);
      setStages((prev) =>
        prev.map((s, i) =>
          i === stageIndex ? { ...s, status: "failed" } : s
        )
      );
      setError(`Failed to run ${stage.name}. Please try again.`);
      setIsRunning(false);
    }
  };

  const startWorkflow = () => {
    setIsRunning(true);
    setError("");
    runStage(0);
  };

  const handleViewBrandIntelligence = () => {
    navigate("/brand-intelligence");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "idle":
        return "bg-gray-600";
      case "running":
        return "bg-yellow-500 animate-pulse";
      case "completed":
        return "bg-green-500";
      case "failed":
        return "bg-red-500";
      default:
        return "bg-gray-600";
    }
  };

  const allCompleted = stages.every((s) => s.status === "completed");

  return (
    <div className="min-h-screen flex flex-col px-4 py-8">
      <div className="max-w-4xl w-full mx-auto flex-1">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Brand Workflow</h1>
          <p className="text-gray-400">
            Running brand intelligence analysis on your idea
          </p>
        </div>

        <div className="space-y-4 mb-8">
          {stages.map((stage, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm border border-purple-500/30 rounded-lg p-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-4 h-4 rounded-full ${getStatusColor(
                      stage.status
                    )}`}
                  />
                  <h3 className="text-lg font-semibold text-white">
                    {stage.name}
                  </h3>
                </div>
                <div className="text-sm text-gray-400 capitalize">
                  {stage.status}
                </div>
              </div>
            </div>
          ))}
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <div className="flex gap-4">
          {!isRunning && !allCompleted && (
            <button
              onClick={startWorkflow}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              Start Workflow
            </button>
          )}

          {allCompleted && (
            <button
              onClick={handleViewBrandIntelligence}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              View Brand Intelligence
            </button>
          )}

          {isRunning && (
            <button
              disabled
              className="flex-1 bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg cursor-not-allowed"
            >
              Running Analysis...
            </button>
          )}
        </div>

        <div className="mt-8 grid grid-cols-3 gap-4">
          <button
            onClick={() => navigate("/critic")}
            disabled={!stages[5]?.data}
            className="bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            View Critic
          </button>
          <button
            onClick={() => navigate("/debate")}
            disabled={!stages[6]?.data}
            className="bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            View Debate
          </button>
          <button
            onClick={() => navigate("/consistency")}
            disabled={!stages[7]?.data}
            className="bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            View Consistency
          </button>
        </div>
      </div>
    </div>
  );
}
