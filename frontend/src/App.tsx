/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { WorkflowProgressBar } from './components/WorkflowProgressBar';
import { WorkflowVisualizer } from './components/WorkflowVisualizer';
import { FounderInterview } from './components/FounderInterview';
import { AgentPipelineView } from './components/AgentPipelineView';
import { AntiGenericCriticView } from './components/AntiGenericCriticView';
import { BrandDebateArena } from './components/BrandDebateArena';
import { ConsistencyMatrixView } from './components/ConsistencyMatrixView';
import { BrandIntelligenceReportView } from './components/BrandIntelligenceReportView';
import { LaunchKitView } from './components/LaunchKitView';
import { DevinBlueprintModal } from './components/DevinBlueprintModal';
import { JudgeDemoHelper } from './components/JudgeDemoHelper';
import { JsonInspectorModal } from './components/JsonInspectorModal';
import {
  WorkflowStageId,
  FounderInterviewState,
  DiscoveryAgentOutput,
  PositioningAgentOutput,
  PersonalityAgentOutput,
  CreativeDirectorOutput,
  AntiGenericCriticOutput,
  BrandDebateOutput,
  ConsistencyGuardianOutput,
  FinalBrandIntelligenceReport,
  LaunchKitOutput,
} from './types/brandforge';
import type {
  DiscoveryOutput,
  PositioningOutput,
  PersonalityOutput,
  CreativeOutput,
  CritiqueOutput,
  DebateOutput,
  ConsistencyOutput,
  FinalBrandOutput,
  LaunchKitOutput as BackendLaunchKitOutput,
} from './types';

// Type aliases for backend responses
type BackendDiscovery = DiscoveryOutput;
type BackendPositioning = PositioningOutput;
type BackendPersonality = PersonalityOutput;
type BackendCreative = CreativeOutput;
type BackendCritique = CritiqueOutput;
type BackendDebate = DebateOutput;
type BackendConsistency = ConsistencyOutput;
type BackendFinalReport = FinalBrandOutput;
type BackendLaunchKit = BackendLaunchKitOutput;
import { DEMO_PRESETS, DemoPreset } from './data/demoPresets';
import { apiService } from './services/api';

export default function App() {
  // Founder interview state
  const [interviewState, setInterviewState] = useState<FounderInterviewState>({
    initialIdea: '',
    conversation: [],
    extractedFacts: [],
    extractedAssumptions: [],
    founderConstraints: [],
    isComplete: false,
    sufficiencyScore: 0,
  });

  // Stage outputs (using backend types with type assertions for components)
  const [discovery, setDiscovery] = useState<DiscoveryOutput | undefined>();
  const [positioning, setPositioning] = useState<PositioningOutput | undefined>();
  const [personality, setPersonality] = useState<PersonalityOutput | undefined>();
  const [creative, setCreative] = useState<CreativeOutput | undefined>();
  const [critique, setCritique] = useState<CritiqueOutput | undefined>();
  const [debate, setDebate] = useState<DebateOutput | undefined>();
  const [consistency, setConsistency] = useState<ConsistencyOutput | undefined>();
  const [finalReport, setFinalReport] = useState<FinalBrandOutput | undefined>();
  const [launchKit, setLaunchKit] = useState<BackendLaunchKitOutput | undefined>();

  // Navigation & execution state
  const [activeStage, setActiveStage] = useState<WorkflowStageId | 'INTERVIEW'>('INTERVIEW');
  const [activePipelineTab, setActivePipelineTab] = useState<
    'DISCOVERY' | 'POSITIONING' | 'PERSONALITY' | 'CREATIVE_DIRECTION'
  >('DISCOVERY');
  const [completedStages, setCompletedStages] = useState<WorkflowStageId[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [projectId, setProjectId] = useState<string | null>(null);

  // Modals & Tour
  const [blueprintModalOpen, setBlueprintModalOpen] = useState(false);
  const [demoTourOpen, setDemoTourOpen] = useState(false);
  const [jsonModal, setJsonModal] = useState<{ isOpen: boolean; title: string; data: any }>({
    isOpen: false,
    title: '',
    data: null,
  });

  // Start interview with initial idea
  const handleStartInterview = async (rawIdea: string) => {
    setIsGenerating(true);
    try {
      const project = await apiService.createProject(rawIdea);
      setProjectId(project.id);
      
      const response = await apiService.sendInterviewMessage(project.id, rawIdea);
      
      setInterviewState({
        initialIdea: rawIdea,
        conversation: [
          {
            id: 'msg_1',
            role: 'assistant',
            content: response.reply,
            whyThisMatters: 'Understanding your core problem is essential for building a defensible brand.',
            timestamp: Date.now(),
          },
        ],
        extractedFacts: ['Initial idea submitted'],
        extractedAssumptions: [],
        founderConstraints: [],
        isComplete: response.is_complete,
        sufficiencyScore: response.is_complete ? 100 : 35,
      });
    } catch (err) {
      console.error('Interview start error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  // Send answer to interview probe
  const handleSendAnswer = async (answer: string) => {
    if (!projectId) return;
    
    setIsGenerating(true);
    const updatedHistory = [
      ...interviewState.conversation,
      {
        id: 'msg_' + Date.now(),
        role: 'user' as const,
        content: answer,
        timestamp: Date.now(),
      },
    ];

    try {
      const response = await apiService.sendInterviewMessage(projectId, answer);

      setInterviewState({
        ...interviewState,
        conversation: [
          ...updatedHistory,
          {
            id: 'msg_' + (Date.now() + 1),
            role: 'assistant',
            content: response.reply,
            whyThisMatters: 'Each answer refines our understanding of your brand positioning.',
            timestamp: Date.now(),
          },
        ],
        extractedFacts: [...interviewState.extractedFacts, 'Additional context provided'],
        extractedAssumptions: interviewState.extractedAssumptions,
        isComplete: response.is_complete,
        sufficiencyScore: response.is_complete ? 100 : 65,
      });
    } catch (err) {
      console.error('Interview message error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  // Execute full 7-stage workflow sequentially with visual progress
  const handleExecuteWorkflow = async () => {
    if (!projectId) return;
    
    setIsGenerating(true);

    try {
      // Stage 1: Discovery
      setActiveStage('DISCOVERY');
      setActivePipelineTab('DISCOVERY');
      const disc = await apiService.runDiscovery(projectId);
      setDiscovery(disc as any);
      setCompletedStages((prev) => Array.from(new Set([...prev, 'DISCOVERY'])));

      // Stage 2: Positioning
      setActiveStage('POSITIONING');
      setActivePipelineTab('POSITIONING');
      const pos = await apiService.runPositioning(projectId);
      setPositioning(pos as any);
      setCompletedStages((prev) => Array.from(new Set([...prev, 'POSITIONING'])));

      // Stage 3: Personality
      setActiveStage('PERSONALITY');
      setActivePipelineTab('PERSONALITY');
      const per = await apiService.runPersonality(projectId);
      setPersonality(per as any);
      setCompletedStages((prev) => Array.from(new Set([...prev, 'PERSONALITY'])));

      // Stage 4: Creative Direction
      setActiveStage('CREATIVE_DIRECTION');
      setActivePipelineTab('CREATIVE_DIRECTION');
      const cd = await apiService.runCreative(projectId);
      setCreative(cd as any);
      setCompletedStages((prev) => Array.from(new Set([...prev, 'CREATIVE_DIRECTION'])));

      // Stage 5: Anti-Generic Critic
      setActiveStage('CRITIQUE');
      const crit = await apiService.runCritique(projectId);
      setCritique(crit as any);
      setCompletedStages((prev) => Array.from(new Set([...prev, 'CRITIQUE'])));

      // Stage 6: Brand Debate
      setActiveStage('BRAND_DEBATE');
      const deb = await apiService.runDebate(projectId);
      setDebate(deb as any);
      setCompletedStages((prev) => Array.from(new Set([...prev, 'BRAND_DEBATE'])));

      // Stage 7: Consistency Guardian
      setActiveStage('CONSISTENCY');
      const cons = await apiService.runConsistency(projectId);
      setConsistency(cons as any);
      setCompletedStages((prev) => Array.from(new Set([...prev, 'CONSISTENCY'])));

      // Stage 8: Final Report & Launch Kit
      setActiveStage('FINAL_REPORT');
      const report = await apiService.runFinalize(projectId);
      setFinalReport(report as any);
      const kit = await apiService.generateLaunchKit(projectId);
      setLaunchKit(kit as any);
      setCompletedStages((prev) => Array.from(new Set([...prev, 'FINAL_REPORT', 'LAUNCH_KIT'])));
    } catch (err) {
      console.error('Workflow execution error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  // Load a demo preset
  const handleSelectPreset = (preset: DemoPreset) => {
    setInterviewState({
      initialIdea: preset.rawIdea,
      conversation: [
        {
          id: 'msg_1',
          role: 'assistant',
          content: preset.suggestedAnswers[0]?.question || 'Who is the primary person who needs this today?',
          whyThisMatters:
            'A defensible brand requires an acute wedge audience. If you target everyone, positioning collapses.',
          timestamp: Date.now() - 60000,
        },
        {
          id: 'msg_2',
          role: 'user',
          content: preset.suggestedAnswers[0]?.answer || '',
          timestamp: Date.now() - 40000,
        },
        {
          id: 'msg_3',
          role: 'assistant',
          content: preset.suggestedAnswers[1]?.question || 'What broken alternatives do they currently use?',
          whyThisMatters: 'Positioning is contrast. To make a defensible brand, we must define the habit they abandon.',
          timestamp: Date.now() - 20000,
        },
        {
          id: 'msg_4',
          role: 'user',
          content: preset.suggestedAnswers[1]?.answer || '',
          timestamp: Date.now() - 10000,
        },
      ],
      extractedFacts: [
        `Target Domain: ${preset.name}`,
        'High workflow urgency confirmed by founder.',
      ],
      extractedAssumptions: ['Assumes low switching friction against incumbent tools.'],
      founderConstraints: [],
      isComplete: true,
      sufficiencyScore: 85,
    });

    setActiveStage('INTERVIEW');
  };

  // Reset project
  const handleResetProject = () => {
    setInterviewState({
      initialIdea: '',
      conversation: [],
      extractedFacts: [],
      extractedAssumptions: [],
      founderConstraints: [],
      isComplete: false,
      sufficiencyScore: 0,
    });
    setDiscovery(undefined);
    setPositioning(undefined);
    setPersonality(undefined);
    setCreative(undefined);
    setCritique(undefined);
    setDebate(undefined);
    setConsistency(undefined);
    setFinalReport(undefined);
    setLaunchKit(undefined);
    setCompletedStages([]);
    setActiveStage('INTERVIEW');
  };

  // Step change from Judge Demo Tour
  const handleTourStepChange = (stepIndex: number) => {
    if (stepIndex === 0) {
      setActiveStage('INTERVIEW');
      if (!interviewState.initialIdea) {
        handleSelectPreset(DEMO_PRESETS[0]);
      }
    } else if (stepIndex === 1) {
      setActiveStage('INTERVIEW');
    } else if (stepIndex === 2) {
      if (!discovery) {
        handleExecuteWorkflow();
      }
    } else if (stepIndex === 3) {
      setActiveStage('POSITIONING');
      setActivePipelineTab('POSITIONING');
    } else if (stepIndex === 4) {
      setActiveStage('CRITIQUE');
    } else if (stepIndex === 5) {
      setActiveStage('BRAND_DEBATE');
    } else if (stepIndex === 6) {
      setActiveStage('CONSISTENCY');
    } else if (stepIndex === 7) {
      setActiveStage('FINAL_REPORT');
    }
  };

  const handleOpenJson = (title: string, data: any) => {
    setJsonModal({
      isOpen: true,
      title,
      data,
    });
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200">
      {/* Top Navbar */}
      <Navbar
        onOpenBlueprint={() => setBlueprintModalOpen(true)}
        onOpenDemoTour={() => setDemoTourOpen(true)}
        onSelectPreset={handleSelectPreset}
        onResetProject={handleResetProject}
        hasActiveProject={interviewState.conversation.length > 0 || completedStages.length > 0}
      />

      {/* Progress & Stage navigation */}
      <WorkflowProgressBar
        activeStage={activeStage}
        completedStages={completedStages}
        isGenerating={isGenerating}
        onSelectStage={(stage) => {
          setActiveStage(stage);
          if (
            stage === 'DISCOVERY' ||
            stage === 'POSITIONING' ||
            stage === 'PERSONALITY' ||
            stage === 'CREATIVE_DIRECTION'
          ) {
            setActivePipelineTab(stage);
          }
        }}
      />

      {/* Visual Agent Workflow DAG & Data Flow Inspector */}
      <WorkflowVisualizer
        activeStage={activeStage}
        completedStages={completedStages}
        isGenerating={isGenerating}
        interviewState={interviewState}
        discovery={discovery as any}
        positioning={positioning as any}
        personality={personality as any}
        creative={creative as any}
        critique={critique as any}
        debate={debate as any}
        consistency={consistency as any}
        finalReport={finalReport as any}
        launchKit={launchKit as any}
        onSelectStage={(stage) => {
          setActiveStage(stage);
          if (
            stage === 'DISCOVERY' ||
            stage === 'POSITIONING' ||
            stage === 'PERSONALITY' ||
            stage === 'CREATIVE_DIRECTION'
          ) {
            setActivePipelineTab(stage);
          }
        }}
        onInspectJson={handleOpenJson}
      />

      {/* Main Workspace Views */}
      <main className="flex-1 pb-16">
        {/* Stage 0: Founder Interview */}
        {activeStage === 'INTERVIEW' && (
          <FounderInterview
            interviewState={interviewState}
            onSendAnswer={handleSendAnswer}
            onStartInterview={handleStartInterview}
            onExecuteWorkflow={handleExecuteWorkflow}
            isProcessing={isGenerating}
            onSelectPresetIdea={(idea) => {
              setInterviewState((prev) => ({ ...prev, initialIdea: idea }));
            }}
            onInspectJson={handleOpenJson}
          />
        )}

        {/* Stages 1 to 4: Pipeline Outputs */}
        {(activeStage === 'DISCOVERY' ||
          activeStage === 'POSITIONING' ||
          activeStage === 'PERSONALITY' ||
          activeStage === 'CREATIVE_DIRECTION') && (
          <AgentPipelineView
            discovery={discovery}
            positioning={positioning}
            personality={personality}
            creative={creative}
            onInspectJson={handleOpenJson}
            activeStageTab={activePipelineTab}
            onSelectStageTab={(tab) => {
              setActivePipelineTab(tab);
              setActiveStage(tab);
            }}
          />
        )}

        {/* Stage 5: Anti-Generic Critic */}
        {activeStage === 'CRITIQUE' && (
          <AntiGenericCriticView
            critique={critique}
            onInspectJson={handleOpenJson}
            onRunWorkflow={handleExecuteWorkflow}
          />
        )}

        {/* Stage 6: Brand Debate Arena */}
        {activeStage === 'BRAND_DEBATE' && (
          debate ? (
            <BrandDebateArena
              debate={debate}
              onInspectJson={handleOpenJson}
            />
          ) : (
            <div className="mx-auto max-w-4xl py-12 px-4 text-center">
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-8 space-y-4">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
                  <span className="text-xl">⚔️</span>
                </div>
                <h3 className="text-lg font-bold text-white">Brand Debate Arena Pending</h3>
                <p className="text-xs sm:text-sm text-zinc-400 max-w-lg mx-auto">
                  The Brand Debate Council pits the Brand Strategist, Target User, Creative Director, and Skeptical Critic against one another to stress-test your wedge. Run the multi-agent pipeline to generate this debate.
                </p>
                <button
                  onClick={handleExecuteWorkflow}
                  disabled={isGenerating}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-2.5 text-xs font-bold text-zinc-950 hover:from-orange-400 hover:to-amber-400 transition-all shadow-lg shadow-orange-500/20"
                >
                  <span>Run Multi-Agent Pipeline</span>
                </button>
              </div>
            </div>
          )
        )}

        {/* Stage 7: Consistency Guardian */}
        {activeStage === 'CONSISTENCY' && (
          consistency ? (
            <ConsistencyMatrixView
              consistency={consistency}
              onInspectJson={handleOpenJson}
            />
          ) : (
            <div className="mx-auto max-w-4xl py-12 px-4 text-center">
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-8 space-y-4">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                  <span className="text-xl">🛡️</span>
                </div>
                <h3 className="text-lg font-bold text-white">Consistency Matrix Audit Pending</h3>
                <p className="text-xs sm:text-sm text-zinc-400 max-w-lg mx-auto">
                  The Consistency Guardian calculates an 8x8 harmony matrix across Audience, Problem, Positioning, Voice, and Aesthetics to detect hidden contradictions. Run the multi-agent pipeline to compute the audit.
                </p>
                <button
                  onClick={handleExecuteWorkflow}
                  disabled={isGenerating}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-2.5 text-xs font-bold text-zinc-950 hover:from-orange-400 hover:to-amber-400 transition-all shadow-lg shadow-orange-500/20"
                >
                  <span>Run Multi-Agent Pipeline</span>
                </button>
              </div>
            </div>
          )
        )}

        {/* Stage 8: Final Report */}
        {activeStage === 'FINAL_REPORT' && (
          finalReport ? (
            <BrandIntelligenceReportView
              report={finalReport as any}
              onInspectJson={handleOpenJson}
              onSwitchToLaunchKit={() => setActiveStage('LAUNCH_KIT')}
            />
          ) : (
            <div className="mx-auto max-w-4xl py-12 px-4 text-center">
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-8 space-y-4">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
                  <span className="text-xl">🏆</span>
                </div>
                <h3 className="text-lg font-bold text-white">Brand Intelligence Report Pending</h3>
                <p className="text-xs sm:text-sm text-zinc-400 max-w-lg mx-auto">
                  Complete the founder interview and execute the multi-agent pipeline to generate your full 23-element brand intelligence report.
                </p>
                <button
                  onClick={handleExecuteWorkflow}
                  disabled={isGenerating}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-2.5 text-xs font-bold text-zinc-950 hover:from-orange-400 hover:to-amber-400 transition-all shadow-lg shadow-orange-500/20"
                >
                  <span>Run Multi-Agent Pipeline</span>
                </button>
              </div>
            </div>
          )
        )}

        {/* Launch Kit */}
        {activeStage === 'LAUNCH_KIT' && launchKit && (
          <LaunchKitView launchKit={launchKit as any} />
        )}
      </main>

      {/* Footer bar */}
      <footer className="border-t border-zinc-800/80 bg-zinc-950 py-4 px-6 text-center text-xs text-zinc-500">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-bold text-zinc-300">BRANDFORGE AI</span>
            <span>• Multi-Agent Brand Intelligence Engine</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-zinc-400">
            <button
              onClick={() => setBlueprintModalOpen(true)}
              className="hover:text-cyan-400 underline transition-colors"
            >
              Devin AI Specification (20 Sections)
            </button>
            <button
              onClick={() => setDemoTourOpen(true)}
              className="hover:text-orange-400 underline transition-colors"
            >
              3-Min Judge Demo Script
            </button>
          </div>
        </div>
      </footer>

      {/* Devin AI Blueprint Modal (Full 20-Section specification) */}
      <DevinBlueprintModal
        isOpen={blueprintModalOpen}
        onClose={() => setBlueprintModalOpen(false)}
      />

      {/* 3-Minute Judge Demo Tour Floating Helper */}
      <JudgeDemoHelper
        isOpen={demoTourOpen}
        onClose={() => setDemoTourOpen(false)}
        onStepChange={handleTourStepChange}
      />

      {/* JSON Schema Inspector Modal */}
      <JsonInspectorModal
        isOpen={jsonModal.isOpen}
        title={jsonModal.title}
        data={jsonModal.data}
        onClose={() => setJsonModal({ isOpen: false, title: '', data: null })}
      />
    </div>
  );
}
