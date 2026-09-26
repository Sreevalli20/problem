import React from 'react';
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
  Loader2,
} from 'lucide-react';
import { WorkflowStageId } from '../types/brandforge';

interface StageMeta {
  id: WorkflowStageId;
  label: string;
  shortLabel: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

export const WORKFLOW_STAGES: StageMeta[] = [
  {
    id: 'DISCOVERY',
    label: 'Discovery Agent',
    shortLabel: 'DISCOVER',
    icon: Search,
    description: 'Founder motivation, facts & assumptions',
  },
  {
    id: 'POSITIONING',
    label: 'Positioning Agent',
    shortLabel: 'POSITION',
    icon: Compass,
    description: 'Category, value prop & wedge',
  },
  {
    id: 'PERSONALITY',
    label: 'Personality Agent',
    shortLabel: 'PERSONALITY',
    icon: Smile,
    description: 'Archetype, core traits & avoid list',
  },
  {
    id: 'CREATIVE_DIRECTION',
    label: 'Creative Director',
    shortLabel: 'CREATE',
    icon: Palette,
    description: 'Naming territories, palette & fonts',
  },
  {
    id: 'CRITIQUE',
    label: 'Anti-Generic Critic',
    shortLabel: 'CRITIQUE',
    icon: AlertTriangle,
    description: 'Buzzword purge & replacement rules',
  },
  {
    id: 'BRAND_DEBATE',
    label: 'Brand Debate Arena',
    shortLabel: 'DEBATE',
    icon: MessageSquareDiff,
    description: '4-Persona adversarial council',
  },
  {
    id: 'CONSISTENCY',
    label: 'Consistency Guardian',
    shortLabel: 'CONSISTENCY',
    icon: ShieldCheck,
    description: '8x8 Cross-element harmony matrix',
  },
  {
    id: 'FINAL_REPORT',
    label: 'Final Synthesizer',
    shortLabel: 'DELIVER',
    icon: Award,
    description: 'Brand Dossier & Launch Kit',
  },
];

interface WorkflowProgressBarProps {
  activeStage: WorkflowStageId | 'INTERVIEW';
  completedStages: WorkflowStageId[];
  isGenerating: boolean;
  onSelectStage: (stage: WorkflowStageId | 'INTERVIEW') => void;
}

export const WorkflowProgressBar: React.FC<WorkflowProgressBarProps> = ({
  activeStage,
  completedStages,
  isGenerating,
  onSelectStage,
}) => {
  return (
    <div className="w-full bg-zinc-900/60 border-b border-zinc-800 px-4 py-3 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between overflow-x-auto pb-1 gap-2 scrollbar-none">
          {/* Interview step */}
          <button
            onClick={() => onSelectStage('INTERVIEW')}
            className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-all border ${
              activeStage === 'INTERVIEW'
                ? 'bg-amber-500/10 text-amber-300 border-amber-500/40 shadow-sm'
                : 'text-zinc-400 border-transparent hover:text-zinc-200 hover:bg-zinc-800/60'
            }`}
          >
            <span
              className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${
                activeStage === 'INTERVIEW'
                  ? 'bg-amber-400 text-zinc-950'
                  : 'bg-zinc-800 text-zinc-300'
              }`}
            >
              0
            </span>
            <span>Adaptive Interview</span>
          </button>

          <span className="text-zinc-600 font-mono text-xs">➔</span>

          {/* 8 Agent Stages */}
          {WORKFLOW_STAGES.map((s, idx) => {
            const isCompleted = completedStages.includes(s.id);
            const isActive = activeStage === s.id;
            const isCurrentlyRunning = isGenerating && isActive;
            const Icon = s.icon;

            return (
              <React.Fragment key={s.id}>
                <button
                  onClick={() => onSelectStage(s.id)}
                  disabled={!isCompleted && !isActive}
                  className={`group flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs font-medium whitespace-nowrap transition-all border ${
                    isActive
                      ? 'bg-amber-500/10 text-amber-300 border-amber-500/40 shadow-sm'
                      : isCompleted
                      ? 'text-zinc-200 border-zinc-800/80 bg-zinc-900/40 hover:bg-zinc-800 hover:text-white'
                      : 'text-zinc-600 border-transparent cursor-not-allowed opacity-60'
                  }`}
                  title={s.description}
                >
                  <span
                    className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold transition-colors ${
                      isCurrentlyRunning
                        ? 'bg-amber-400 text-zinc-950 animate-pulse'
                        : isCompleted
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : isActive
                        ? 'bg-amber-400 text-zinc-950'
                        : 'bg-zinc-800 text-zinc-500'
                    }`}
                  >
                    {isCurrentlyRunning ? (
                      <Loader2 className="h-3 w-3 animate-spin" />
                    ) : isCompleted ? (
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                    ) : (
                      idx + 1
                    )}
                  </span>

                  <Icon
                    className={`h-3.5 w-3.5 ${
                      isActive
                        ? 'text-amber-400'
                        : isCompleted
                        ? 'text-emerald-400'
                        : 'text-zinc-500'
                    }`}
                  />

                  <span className="font-semibold tracking-wide">
                    {s.shortLabel}
                  </span>

                  {isCompleted && (
                    <span className="text-[10px] text-emerald-400 hidden lg:inline">
                      ✓
                    </span>
                  )}
                </button>

                {idx < WORKFLOW_STAGES.length - 1 && (
                  <span className="text-zinc-700 font-mono text-[10px] hidden sm:inline">
                    ➔
                  </span>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};
