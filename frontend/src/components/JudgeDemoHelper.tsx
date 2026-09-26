import React, { useState } from 'react';
import {
  Play,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  X,
  Sparkles,
  Flame,
  Swords,
  ShieldCheck,
  Award,
} from 'lucide-react';

interface JudgeDemoHelperProps {
  isOpen: boolean;
  onClose: () => void;
  onStepChange: (stepIndex: number) => void;
}

export const JUDGE_STEPS = [
  {
    title: '1. Raw Idea & Founder Hypothesis',
    summary: 'The founder enters raw idea. AI extracts domain and prepares adaptive questions.',
    talkingPoint:
      '"Most tools start with generic logo templates. BrandForge starts with raw founder intent."',
  },
  {
    title: '2. Adaptive Interview Probing',
    summary: 'Dynamic probing questions with "Why this matters" strategic explanations.',
    talkingPoint:
      '"Notice the sufficiency meter and the explanation of why each question matters for positioning."',
  },
  {
    title: '3. 9-Agent Pipeline Execution',
    summary: 'Isolated agents reason over structured JSON payloads in sequence.',
    talkingPoint:
      '"No single monolithic prompt. 9 specialized agents pass immutable JSON state capsules."',
  },
  {
    title: '4. Discovery & Positioning Wedge',
    summary: 'Clear market category, value prop, and strict Anti-Positioning boundaries.',
    talkingPoint:
      '"Look at the Anti-Positioning box: defining what you are strictly NOT prevents scope creep."',
  },
  {
    title: '5. Anti-Generic Critic (Core Differentiator)',
    summary: 'Purges clichés like "Empowering innovation" and provides surgical replacements.',
    talkingPoint:
      '"Our core differentiator: the Anti-Generic engine attacks startup buzzwords with surgical replacements."',
  },
  {
    title: '6. AI Brand Debate Arena',
    summary: '4-way council (Strategist, Audience, Creative, Critic) debating trade-offs.',
    talkingPoint:
      '"The Skeptical Critic and Audience fight over technical reality before the Synthesizer reaches consensus."',
  },
  {
    title: '7. Consistency Guardian',
    summary: '8-element cross-reinforcement matrix audits tone, palette, and audience.',
    talkingPoint:
      '"Guarantees zero internal contradiction between visual direction, voice, and pricing."',
  },
  {
    title: '8. Final Dossier & Launch Kit',
    summary: 'Master brand book + copyable hero headlines, pitches, and social posts.',
    talkingPoint:
      '"The founder receives battle-tested brand intelligence and deployment-ready launch copy in 3 minutes."',
  },
];

export const JudgeDemoHelper: React.FC<JudgeDemoHelperProps> = ({
  isOpen,
  onClose,
  onStepChange,
}) => {
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOpen) return null;

  const step = JUDGE_STEPS[currentStep];

  const handleNext = () => {
    if (currentStep < JUDGE_STEPS.length - 1) {
      const next = currentStep + 1;
      setCurrentStep(next);
      onStepChange(next);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      const prev = currentStep - 1;
      setCurrentStep(prev);
      onStepChange(prev);
    }
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:w-[480px] z-50 rounded-2xl border border-orange-500/40 bg-zinc-950/95 p-4 sm:p-5 shadow-2xl backdrop-blur-xl">
      <div className="flex items-center justify-between border-b border-zinc-800 pb-2.5">
        <div className="flex items-center gap-2">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-zinc-950 text-[10px] font-black">
            ▶
          </span>
          <span className="text-xs font-bold text-orange-400 uppercase tracking-wider">
            3-Minute Hackathon Judge Tour
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-zinc-400">
            {currentStep + 1} / {JUDGE_STEPS.length}
          </span>
          <button onClick={onClose} className="text-zinc-500 hover:text-white">
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mt-3 space-y-2">
        <h4 className="text-sm font-extrabold text-white">{step.title}</h4>
        <p className="text-xs text-zinc-300 leading-relaxed">{step.summary}</p>

        <div className="rounded-xl border border-orange-500/30 bg-orange-500/10 p-2.5 text-xs text-orange-200">
          <strong className="text-orange-400 block mb-0.5">Judge Talking Point:</strong>
          {step.talkingPoint}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-zinc-800/80 pt-3">
        <button
          onClick={handlePrev}
          disabled={currentStep === 0}
          className="flex items-center gap-1 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs font-semibold text-zinc-300 hover:bg-zinc-800 disabled:opacity-40"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          <span>Previous</span>
        </button>

        <button
          onClick={handleNext}
          disabled={currentStep === JUDGE_STEPS.length - 1}
          className="flex items-center gap-1 rounded-lg bg-orange-500 hover:bg-orange-400 px-4 py-1.5 text-xs font-bold text-zinc-950 transition-colors shadow-md disabled:opacity-40"
        >
          <span>Next Step</span>
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
};
