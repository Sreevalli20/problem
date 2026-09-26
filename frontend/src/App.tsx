import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import StartPage from "./pages/StartPage";
import InterviewPage from "./pages/InterviewPage";
import WorkflowPage from "./pages/WorkflowPage";
import BrandIntelligencePage from "./pages/BrandIntelligencePage";
import CriticPage from "./pages/CriticPage";
import DebatePage from "./pages/DebatePage";
import ConsistencyPage from "./pages/ConsistencyPage";
import LaunchKitPage from "./pages/LaunchKitPage";
import type { Project } from "./types";

function App() {
  const [project, setProject] = useState<Project | null>(null);

  return (
    <Router>
      <div className="min-h-screen bg-slate-900">
        <Routes>
          <Route
            path="/"
            element={<StartPage onProjectCreate={setProject} />}
          />
          <Route
            path="/interview"
            element={
              project ? (
                <InterviewPage project={project} setProject={setProject} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/workflow"
            element={
              project ? (
                <WorkflowPage project={project} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/brand-intelligence"
            element={
              project ? (
                <BrandIntelligencePage project={project} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/critic"
            element={
              project ? (
                <CriticPage project={project} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/debate"
            element={
              project ? (
                <DebatePage project={project} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/consistency"
            element={
              project ? (
                <ConsistencyPage project={project} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/launch-kit"
            element={
              project ? (
                <LaunchKitPage project={project} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
