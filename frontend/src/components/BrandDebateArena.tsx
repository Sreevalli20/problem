import React from 'react';
import {
  MessageSquareDiff,
  Users,
  ShieldAlert,
  CheckCircle2,
  Code2,
  Clock,
  Swords,
  Scale,
} from 'lucide-react';
import { BrandDebateOutput, DebatePersona } from '../types/brandforge';
import type { DebateOutput as BackendDebateOutput } from '../types';

interface BrandDebateArenaProps {
  debate: BackendDebateOutput;
  onInspectJson: (title: string, data: any) => void;
}

export const BrandDebateArena: React.FC<BrandDebateArenaProps> = ({
  debate,
  onInspectJson,
}) => {
  // Transform backend DebateOutput to UI-expected format
  const transformedDebate: BrandDebateOutput = {
    stage: 'BRAND_DEBATE',
    agentName: 'Brand Debate Agent',
    summary: debate.overall_assessment,
    confidence: 85,
    reasoningTimeMs: 0,
    debateTopic: debate.overall_assessment,
    personas: debate.perspectives.map((perspective, i) => ({
      role: i === 0 ? 'strategist' : i === 1 ? 'target_audience' : i === 2 ? 'creative_director' : 'skeptical_critic',
      name: perspective.name,
      title: 'Debate Participant',
      avatarColor: i === 0 ? '#3B82F6' : i === 1 ? '#10B981' : i === 2 ? '#F59E0B' : '#EF4444',
      stance: perspective.evaluation,
      keyArgument: perspective.findings.join(' '),
      critiqueOfOthers: perspective.concerns.join(' '),
      uncompromisingDemand: perspective.criteria.join(' '),
    })),
    tensionsIdentified: debate.disagreements,
    synthesisResolution: debate.overall_assessment,
    consensusAgreed: debate.agreements.length > 0,
  };

  return (
    <div className="mx-auto max-w-6xl py-6 px-4 sm:px-6 space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-blue-500/30 bg-gradient-to-r from-blue-500/10 via-zinc-900 to-zinc-900 p-6 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded bg-blue-500/20 px-2 py-0.5 text-xs font-bold text-blue-400 border border-blue-500/30 flex items-center gap-1">
              <Swords className="h-3 w-3" />
              <span>CORE DIFFERENTIATOR: AI BRAND DEBATE</span>
            </span>
            <span className="text-xs text-zinc-400 font-mono flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {transformedDebate.reasoningTimeMs}ms
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
            4-Stakeholder Adversarial Consensus Arena
          </h2>
          <p className="text-xs text-zinc-400 mt-1 max-w-2xl">
            {transformedDebate.summary}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-2 text-right">
            <div className="text-[10px] text-zinc-500 font-semibold uppercase">Council Consensus</div>
            <div className="text-xs font-black text-emerald-400 flex items-center gap-1 mt-0.5">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>AGREED & RESOLVED</span>
            </div>
          </div>
          <button
            onClick={() => onInspectJson('Brand Debate Output Schema', debate)}
            className="flex items-center gap-1.5 rounded-xl border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 px-3 py-2.5 text-xs font-bold text-zinc-200 transition-colors"
          >
            <Code2 className="h-3.5 w-3.5 text-cyan-400" />
            <span>Inspect JSON</span>
          </button>
        </div>
      </div>

      {/* Debate Topic Banner */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/90 p-5 shadow-lg">
        <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
          <Scale className="h-4 w-4" />
          <span>Core Strategic Debate Tension</span>
        </div>
        <h3 className="text-base sm:text-lg font-bold text-white">
          "{transformedDebate.debateTopic}"
        </h3>
      </div>

      {/* 4 Persona Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {transformedDebate.personas.map((persona, idx) => (
          <div
            key={idx}
            className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5 flex flex-col justify-between shadow-lg space-y-4"
          >
            <div>
              {/* Persona header */}
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <div className="flex items-center gap-3">
                  <div
                    className="h-10 w-10 rounded-xl flex items-center justify-center font-bold text-white text-sm shadow-md"
                    style={{ backgroundColor: persona.avatarColor }}
                  >
                    {persona.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{persona.name}</h4>
                    <p className="text-[11px] text-zinc-400">{persona.title}</p>
                  </div>
                </div>

                <span className="rounded bg-zinc-800 px-2 py-0.5 text-[10px] font-bold uppercase text-zinc-300 border border-zinc-700">
                  {persona.role.replace('_', ' ')}
                </span>
              </div>

              {/* Stance */}
              <div className="mt-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                  Stance:
                </span>
                <p className="text-xs text-zinc-200 font-semibold mt-0.5">
                  "{persona.stance}"
                </p>
              </div>

              {/* Key argument */}
              <div className="mt-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                  Key Strategic Argument:
                </span>
                <p className="text-xs text-zinc-300 mt-0.5 leading-relaxed">
                  {persona.keyArgument}
                </p>
              </div>

              {/* Critique of other roles */}
              <div className="mt-3 rounded-xl border border-zinc-800 bg-zinc-950/60 p-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-red-400">
                  Critique of Peers:
                </span>
                <p className="text-xs text-zinc-400 mt-0.5 italic">
                  "{persona.critiqueOfOthers}"
                </p>
              </div>
            </div>

            {/* Uncompromising demand */}
            <div className="border-t border-zinc-800 pt-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">
                Uncompromising Demand:
              </span>
              <p className="text-xs font-semibold text-cyan-200 mt-0.5">
                {persona.uncompromisingDemand}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Unresolved Tensions Callout */}
      <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-5 space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
          <ShieldAlert className="h-4 w-4" />
          <span>Frictions Surfaced During Debate</span>
        </div>
        <ul className="space-y-1">
          {transformedDebate.tensionsIdentified.map((tension, i) => (
            <li key={i} className="text-xs text-zinc-300 flex items-start gap-2">
              <span className="text-amber-500 font-bold">•</span>
              <span>{tension}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Final Synthesized Resolution */}
      <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-emerald-500/10 via-zinc-900 to-zinc-900 p-6 shadow-xl space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
          <CheckCircle2 className="h-4 w-4" />
          <span>Debate Synthesis & Unified Direction</span>
        </div>
        <p className="text-sm sm:text-base font-medium text-zinc-100 leading-relaxed">
          {transformedDebate.synthesisResolution}
        </p>
      </div>
    </div>
  );
};
