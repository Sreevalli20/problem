import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { apiService } from "../services/api";
import type { Project } from "../types";
import { InterviewStage } from "../types";

interface InterviewPageProps {
  project: Project;
  setProject: (project: Project) => void;
}

export default function InterviewPage({ project, setProject }: InterviewPageProps) {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [project.interview_messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsLoading(true);
    setError("");

    try {
      const response = await apiService.sendInterviewMessage(project.id, message);

      // Update project with new messages
      const updatedProject = await apiService.getProject(project.id);
      setProject(updatedProject);

      setIsComplete(response.is_complete);
      setMessage("");

      if (response.is_complete) {
        // Allow user to see the completion message before redirecting
        setTimeout(() => {
          navigate("/workflow");
        }, 2000);
      }
    } catch (err) {
      setError("Failed to send message. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkipToEnd = () => {
    navigate("/workflow");
  };

  return (
    <div className="min-h-screen flex flex-col px-4 py-8 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-4xl w-full mx-auto flex-1">
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-white mb-2">Adaptive Interview</h1>
          <p className="text-gray-400">
            Help us understand your idea by answering a few questions
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm border border-purple-500/30 rounded-lg p-6 mb-6 h-[500px] overflow-y-auto">
          {project.interview_messages.map((msg) => (
            <div
              key={msg.id}
              className={`mb-4 ${
                msg.role === "user" ? "text-right" : "text-left"
              }`}
            >
              <div
                className={`inline-block max-w-[80%] px-4 py-3 rounded-lg ${
                  msg.role === "user"
                    ? "bg-purple-600 text-white"
                    : "bg-gray-700 text-gray-100"
                }`}
              >
                <p className="text-sm">{msg.content}</p>
                {msg.stage && msg.stage !== InterviewStage.INITIAL && (
                  <span className="text-xs text-purple-200 mt-1 block">
                    Stage: {msg.stage}
                  </span>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {!isComplete ? (
          <form onSubmit={handleSendMessage} className="space-y-4">
            <div>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your answer..."
                className="w-full h-24 px-4 py-3 bg-white/10 backdrop-blur-sm border border-purple-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                disabled={isLoading}
              />
            </div>
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Sending..." : "Send Answer"}
              </button>
              <button
                type="button"
                onClick={handleSkipToEnd}
                className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors duration-200"
              >
                Skip to Workflow
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center">
            <div className="bg-green-500/20 border border-green-500/50 text-green-200 px-4 py-3 rounded-lg mb-4">
              Interview complete! Redirecting to workflow...
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
