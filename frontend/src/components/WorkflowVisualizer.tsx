import React, { useState } from 'react';
import {
  WorkflowStageId,
  DiscoveryAgentOutput,
  PositioningAgentOutput,
  PersonalityAgentOutput,
  CreativeDirectorOutput,
  AntiGenericCriticOutput,
  BrandDebateOutput,
  ConsistencyGuardianOutput,
  FinalBrandIntelligenceReport,
  LaunchKitOutput,
  FounderInterviewState,
} from '../types/brandforge';
import {
  Search,
  Compass,
  Smile,
  Palette,
  AlertTriangle,
  MessageSquareDiff,
  ShieldCheck,
  Award,
  CheckCircle2,
  Clock,
  Loader2,
  Code2,
  ArrowRight,
  Database,
  Layers,
  Sparkles,
  GitBranch,
  Eye,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

export interface WorkflowVisualizerProps {
  activeStage: WorkflowStageId | 'INTERVIEW';
  completedStages: WorkflowStageId[];
  isGenerating: boolean;
  interviewState: FounderInterviewState;
  discovery?: DiscoveryAgentOutput;
  positioning?: PositioningAgentOutput;
  personality?: PersonalityAgentOutput;
  creative?: CreativeDirectorOutput;
  critique?: AntiGenericCriticOutput;
  debate?: BrandDebateOutput;
  consistency?: ConsistencyGuardianOutput;
  finalReport?: FinalBrandIntelligenceReport;
  launchKit?: LaunchKitOutput;
  onSelectStage: (stage: WorkflowStageId | 'INTERVIEW') => void;
  onInspectJson: (title: string, data: any) => void;
}

interface AgentNodeSpec {
  id: WorkflowStageId | 'INTERVIEW';
  agentName: string;
  roleTitle: string;
  shortLabel: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  inputDescription: string;
  outputDescription: string;
  getData: (props: WorkflowVisualizerProps) => any;
}

const AGENT_NODES: AgentNodeSpec[] = [
  {
    id: 'INTERVIEW',
    agentName: 'Adaptive Founder Interview',
    roleTitle: 'Context Extraction Engine',
    shortLabel: 'STAGE 0',
    icon: Sparkles,
    description: 'Probes founder idea to uncover acute wedge, alternatives, and avoidance traits.',
    inputDescription: 'Founder Raw Concept & Interactive Probes',
    outputDescription: 'Structured facts, assumptions, constraints, and sufficiency score',
    getData: (p) => ({
      rawIdea: p.interviewState.initialIdea,
      extractedFacts: p.interviewState.extractedFacts,
      extractedAssumptions: p.interviewState.extractedAssumptions,
      sufficiencyScore: p.interviewState.sufficiencyScore,
      conversationTurns: p.interviewState.conversation.length,
      isComplete: p.interviewState.isComplete,
    }),
  },
  {
    id: 'DISCOVERY',
    agentName: 'Discovery Agent',
    roleTitle: 'Problem & Motivation Analyst',
    shortLabel: 'STAGE 1',
    icon: Search,
    description: 'Deconstructs founder hypothesis into verified core problem and workflow friction.',
    inputDescription: 'Founder interview answers and initial concept',
    outputDescription: 'DiscoveryAgentOutput: problem statement, wedge, urgency score, assumptions',
    getData: (p) => p.discovery,
  },
  {
    id: 'POSITIONING',
    agentName: 'Positioning Agent',
    roleTitle: 'Category & Value Prop Strategist',
    shortLabel: 'STAGE 2',
    icon: Compass,
    description: 'Carves out defensible category niche, target buyer wedge, and contrarian truth.',
    inputDescription: 'Discovery Agent output (problem, urgency, wedge)',
    outputDescription: 'PositioningAgentOutput: category, target, value prop, differentiation',
    getData: (p) => p.positioning,
  },
  {
    id: 'PERSONALITY',
    agentName: 'Brand Personality Agent',
    roleTitle: 'Voice & Character Architect',
    shortLabel: 'STAGE 3',
    icon: Smile,
    description: 'Defines psychological archetype, communication tone, and unforgivable anti-traits.',
    inputDescription: 'Positioning Agent output (category, value proposition)',
    outputDescription: 'PersonalityAgentOutput: archetypes, traits, avoid list, tonal spectrum',
    getData: (p) => p.personality,
  },
  {
    id: 'CREATIVE_DIRECTION',
    agentName: 'Creative Director Agent',
    roleTitle: 'Aesthetic & Naming Studio',
    shortLabel: 'STAGE 4',
    icon: Palette,
    description: 'Generates evocative naming territories, color tokens, font stacks, and logo directions.',
    inputDescription: 'Positioning + Brand Personality structured outputs',
    outputDescription: 'CreativeDirectorOutput: 3 naming territories, color palette, typography, visual concepts',
    getData: (p) => p.creative,
  },
  {
    id: 'CRITIQUE',
    agentName: 'Anti-Generic Critic',
    roleTitle: 'Startup Cliché Adversary',
    shortLabel: 'STAGE 5',
    icon: AlertTriangle,
    description: 'Flags vague startup tropes, ungrounded buzzwords, and mandates concrete replacements.',
    inputDescription: 'Positioning statements + Creative naming candidates',
    outputDescription: 'AntiGenericCriticOutput: rejected clichés, reasons, replacements, specificity score',
    getData: (p) => p.critique,
  },
  {
    id: 'BRAND_DEBATE',
    agentName: 'Brand Debate Arena',
    roleTitle: '4-Persona Strategic Council',
    shortLabel: 'STAGE 6',
    icon: MessageSquareDiff,
    description: 'Simulates debate between Strategist, Target User, Creative Director, and Skeptical Critic.',
    inputDescription: 'Positioning, Personality, Creative concepts, and Critic flags',
    outputDescription: 'BrandDebateOutput: tension transcripts, disagreements, consensus resolutions',
    getData: (p) => p.debate,
  },
  {
    id: 'CONSISTENCY',
    agentName: 'Consistency Guardian',
    roleTitle: 'Cross-Element Matrix Auditor',
    shortLabel: 'STAGE 7',
    icon: ShieldCheck,
    description: 'Calculates 8x8 harmony matrix across Audience, Problem, Positioning, Voice, and Aesthetics.',
    inputDescription: 'Outputs from all previous 7 reasoning agents',
    outputDescription: 'ConsistencyGuardianOutput: 8x8 matrix, overall score, conflicts, remediation guidance',
    getData: (p) => p.consistency,
  },
  {
    id: 'FINAL_REPORT',
    agentName: 'Final Synthesizer & Launch Kit',
    roleTitle: 'Executive Dossier & Kit Generator',
    shortLabel: 'STAGE 8',
    icon: Award,
    description: 'Synthesizes battle-tested brand intelligence report and production-ready launch copy.',
    inputDescription: 'Validated outputs from Consistency Guardian & Debate Arena',
    outputDescription: 'FinalBrandIntelligenceReport & LaunchKitOutput (landing copy, social launch, brand book)',
    getData: (p) => (p.finalReport ? { report: p.finalReport, launchKit: p.launchKit } : undefined),
  },
];

export const WorkflowVisualizer: React.FC<WorkflowVisualizerProps> = (props) => {
  const {
    activeStage,
    completedStages,
    isGenerating,
    onSelectStage,
    onInspectJson,
  } = props;

  const [isExpanded, setIsExpanded] = useState(true);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const completedCount = completedStages.length;
  const totalStages = 8;
  const progressPct = Math.round((completedCount / totalStages) * 100);

  return (
    <div className="w-full bg-zinc-900/80 border-b border-zinc-800">
      <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
        {/* Header bar with collapse toggle and status metrics */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <GitBranch className="h-4 w-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-200">
                  Agent Pipeline DAG & Data Flow
                </span>
                <span className="rounded bg-zinc-800 px-2 py-0.5 text-[10px] font-semibold text-zinc-400 border border-zinc-700">
                  Sequential Context Passing
                </span>
                {isGenerating && (
                  <span className="flex items-center gap-1 text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/30 animate-pulse">
                    <Loader2 className="h-3 w-3 animate-spin" />
                    Executing DAG...
                  </span>
                )}
              </div>
              <p className="text-[11px] text-zinc-400 mt-0.5">
                Each agent transforms structured input JSON into validated output schemas passed downstream.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            {/* Completion Meter */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-zinc-400 font-mono">
                {completedCount}/{totalStages} Stages Done
              </span>
              <div className="w-24 h-2 bg-zinc-800 rounded-full overflow-hidden border border-zinc-700">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 transition-all duration-300"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>

            {/* Toggle DAG view */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-1 text-xs text-zinc-400 hover:text-white bg-zinc-800/80 px-2.5 py-1 rounded-lg border border-zinc-700/80 transition-colors"
            >
              <Layers className="h-3.5 w-3.5 text-amber-400" />
              <span>{isExpanded ? 'Collapse Architecture' : 'Expand Architecture'}</span>
              {isExpanded ? (
                <ChevronUp className="h-3.5 w-3.5 ml-0.5" />
              ) : (
                <ChevronDown className="h-3.5 w-3.5 ml-0.5" />
              )}
            </button>
          </div>
        </div>

        {/* Collapsible Architecture DAG Graph */}
        {isExpanded && (
          <div className="mt-4 pt-3 border-t border-zinc-800/60">
            {/* Horizontal Flow Container */}
            <div className="overflow-x-auto pb-3 pt-1 scrollbar-thin scrollbar-thumb-zinc-700">
              <div className="flex items-stretch gap-2.5 min-w-max">
                {AGENT_NODES.map((node, index) => {
                  const Icon = node.icon;
                  const data = node.getData(props);
                  const hasData = !!data;
                  const isCompleted =
                    node.id === 'INTERVIEW'
                      ? props.interviewState.conversation.length > 0
                      : completedStages.includes(node.id as WorkflowStageId);
                  const isActive = activeStage === node.id;
                  const isNodeRunning = isGenerating && isActive;

                  return (
                    <div key={node.id} className="flex items-center gap-2.5">
                      {/* Node Card */}
                      <div
                        className={`w-64 rounded-xl border p-3.5 transition-all flex flex-col justify-between ${
                          isActive
                            ? 'bg-zinc-900 border-amber-500/60 shadow-lg shadow-amber-500/10 ring-1 ring-amber-500/30'
                            : isCompleted
                            ? 'bg-zinc-900/70 border-emerald-500/30 hover:border-emerald-500/50'
                            : 'bg-zinc-950/60 border-zinc-800 opacity-70 hover:opacity-100'
                        }`}
                      >
                        {/* Top: Header & Badges */}
                        <div>
                          <div className="flex items-center justify-between gap-1 mb-2">
                            <span className="text-[10px] font-mono font-bold tracking-wider text-zinc-400 uppercase">
                              {node.shortLabel}
                            </span>

                            {/* Status Indicator */}
                            {isNodeRunning ? (
                              <span className="flex items-center gap-1 rounded bg-amber-500/20 px-1.5 py-0.5 text-[9px] font-bold text-amber-300 border border-amber-500/30 animate-pulse">
                                <Loader2 className="h-2.5 w-2.5 animate-spin" />
                                RUNNING
                              </span>
                            ) : isCompleted ? (
                              <span className="flex items-center gap-1 rounded bg-emerald-500/10 px-1.5 py-0.5 text-[9px] font-bold text-emerald-400 border border-emerald-500/20">
                                <CheckCircle2 className="h-2.5 w-2.5" />
                                COMPLETED
                              </span>
                            ) : (
                              <span className="flex items-center gap-1 rounded bg-zinc-800 px-1.5 py-0.5 text-[9px] font-medium text-zinc-500">
                                <Clock className="h-2.5 w-2.5" />
                                PENDING
                              </span>
                            )}
                          </div>

                          {/* Agent Name & Icon */}
                          <div className="flex items-center gap-2 mb-1.5">
                            <div
                              className={`flex h-7 w-7 items-center justify-center rounded-lg border ${
                                isActive
                                  ? 'bg-amber-400/10 border-amber-400/40 text-amber-400'
                                  : isCompleted
                                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                                  : 'bg-zinc-800 border-zinc-700 text-zinc-400'
                              }`}
                            >
                              <Icon className="h-3.5 w-3.5" />
                            </div>
                            <div className="leading-tight">
                              <h4 className="text-xs font-bold text-zinc-100 truncate max-w-[170px]">
                                {node.agentName}
                              </h4>
                              <p className="text-[10px] text-zinc-400">{node.roleTitle}</p>
                            </div>
                          </div>

                          <p className="text-[11px] text-zinc-400 line-clamp-2 mt-1 leading-snug">
                            {node.description}
                          </p>

                          {/* Input/Output Contracts */}
                          <div className="mt-2.5 pt-2 border-t border-zinc-800/80 space-y-1">
                            <div className="text-[10px] text-zinc-400">
                              <span className="font-semibold text-zinc-400">Input:</span>{' '}
                              <span className="text-zinc-400 line-clamp-1">{node.inputDescription}</span>
                            </div>
                            <div className="text-[10px] text-zinc-400">
                              <span className="font-semibold text-zinc-400">Output:</span>{' '}
                              <span className="text-zinc-400 line-clamp-1">{node.outputDescription}</span>
                            </div>
                          </div>
                        </div>

                        {/* Bottom Action Buttons */}
                        <div className="mt-3 pt-2.5 border-t border-zinc-800 flex items-center justify-between gap-1.5">
                          <button
                            onClick={() => onSelectStage(node.id)}
                            className={`flex-1 rounded-md py-1 px-2 text-[11px] font-semibold text-center transition-colors ${
                              isActive
                                ? 'bg-amber-400 text-zinc-950 font-bold'
                                : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white'
                            }`}
                          >
                            {isActive ? 'Current View' : 'Navigate'}
                          </button>

                          <button
                            onClick={() => {
                              if (hasData) {
                                onInspectJson(`${node.agentName} — Structured JSON Output`, data);
                              } else {
                                onInspectJson(`${node.agentName} — Pending Schema Specification`, {
                                  stage: node.id,
                                  agentName: node.agentName,
                                  status: 'Pending execution of upstream dependencies',
                                  requiredInputs: node.inputDescription,
                                  expectedOutputs: node.outputDescription,
                                });
                              }
                            }}
                            className={`rounded-md py-1 px-2 text-[11px] font-medium flex items-center gap-1 transition-colors border ${
                              hasData
                                ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20'
                                : 'bg-zinc-800/60 border-zinc-700/60 text-zinc-400 hover:text-zinc-200'
                            }`}
                            title="Inspect Structured JSON Output"
                          >
                            <Code2 className="h-3 w-3" />
                            <span>JSON</span>
                          </button>
                        </div>
                      </div>

                      {/* Connection arrow between nodes */}
                      {index < AGENT_NODES.length - 1 && (
                        <div className="flex flex-col items-center justify-center px-1 text-zinc-600">
                          <ArrowRight
                            className={`h-4 w-4 transition-colors ${
                              isCompleted ? 'text-emerald-500/60' : 'text-zinc-700'
                            }`}
                          />
                          <span className="text-[9px] font-mono text-zinc-400 mt-0.5">JSON</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
