import React from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Code2,
  Clock,
  Grid3X3,
  ArrowRight,
} from 'lucide-react';
import { ConsistencyGuardianOutput, ConsistencyMatrixItem } from '../types/brandforge';
import type { ConsistencyOutput } from '../types';

interface ConsistencyMatrixViewProps {
  consistency: ConsistencyOutput;
  onInspectJson: (title: string, data: any) => void;
}

export const ConsistencyMatrixView: React.FC<ConsistencyMatrixViewProps> = ({
  consistency,
  onInspectJson,
}) => {
  // Transform backend ConsistencyOutput to UI-expected format
  const transformedConsistency: ConsistencyGuardianOutput = {
    overallAlignmentScore: consistency.overall_status === 'consistent' ? 85 : consistency.overall_status === 'needs_review' ? 65 : 40,
    matrixItems: consistency.checks.map((check, i) => {
      // Map backend aspect to frontend element type
      const elementMap: Record<string, 'audience' | 'problem' | 'positioning' | 'personality' | 'naming' | 'tagline' | 'voice' | 'visual_direction'> = {
        'audience': 'audience',
        'problem': 'problem',
        'positioning': 'positioning',
        'personality': 'personality',
        'naming': 'naming',
        'tagline': 'tagline',
        'voice': 'voice',
        'visual_direction': 'visual_direction',
      };
      return {
        element: elementMap[check.aspect.toLowerCase()] || 'positioning',
        status: check.status === 'consistent' ? 'aligned' as const : check.status === 'warning' ? 'warning' as const : 'conflict' as const,
        conflictWith: [],
        explanation: check.details,
        recommendation: check.details,
      };
    }),
    guardianVerdict: consistency.overall_status === 'consistent' ? 'All brand elements are properly aligned' : 'Some inconsistencies detected',
    passStatus: consistency.overall_status === 'consistent' ? 'PASSED' : consistency.overall_status === 'needs_review' ? 'PASSED_WITH_WARNINGS' : 'FAILED_REVISIONS_NEEDED',
    reasoningTimeMs: 0,
    summary: consistency.overall_status,
    stage: 'CONSISTENCY',
    agentName: 'Consistency Guardian',
    confidence: 85,
  };

  return (
    <div className="mx-auto max-w-6xl py-6 px-4 sm:px-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-emerald-500/10 via-zinc-900 to-zinc-900 p-6 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-xs font-bold text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
              <ShieldCheck className="h-3 w-3" />
              <span>CONSISTENCY GUARDIAN AUDIT</span>
            </span>
            <span className="text-xs text-zinc-400 font-mono flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {transformedConsistency.reasoningTimeMs}ms
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
            8-Element Cross-Reinforcement Matrix
          </h2>
          <p className="text-xs text-zinc-400 mt-1 max-w-2xl">
            {transformedConsistency.summary}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-2 text-right">
            <div className="text-[10px] text-zinc-500 font-semibold uppercase">Alignment Index</div>
            <div className="text-xl font-black text-emerald-400">
              {transformedConsistency.overallAlignmentScore} <span className="text-xs text-zinc-500 font-normal">/ 100</span>
            </div>
          </div>
          <button
            onClick={() => onInspectJson('Consistency Guardian Output Schema', consistency)}
            className="flex items-center gap-1.5 rounded-xl border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 px-3 py-2.5 text-xs font-bold text-zinc-200 transition-colors"
          >
            <Code2 className="h-3.5 w-3.5 text-cyan-400" />
            <span>Inspect JSON</span>
          </button>
        </div>
      </div>

      {/* Guardian Verdict Banner */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/90 p-5 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">
            Guardian Synthesis Verdict
          </div>
          <p className="text-sm font-medium text-zinc-200 leading-relaxed">
            {transformedConsistency.guardianVerdict}
          </p>
        </div>

        <span
          className={`shrink-0 rounded-xl px-3 py-1.5 text-xs font-black uppercase tracking-wider border ${
            transformedConsistency.passStatus === 'PASSED'
              ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
              : transformedConsistency.passStatus === 'PASSED_WITH_WARNINGS'
              ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
              : 'bg-red-500/20 text-red-400 border-red-500/40'
          }`}
        >
          {transformedConsistency.passStatus.replace(/_/g, ' ')}
        </span>
      </div>

      {/* 8-Element Grid */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Grid3X3 className="h-4 w-4 text-emerald-400" />
          <span>Cross-Element Alignment Verification</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {transformedConsistency.matrixItems.map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 space-y-3 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between border-b border-zinc-800 pb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-zinc-400 uppercase">
                      Element 0{idx + 1}:
                    </span>
                    <span className="text-sm font-black text-white capitalize">
                      {item.element.replace('_', ' ')}
                    </span>
                  </div>

                  <span
                    className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 ${
                      item.status === 'aligned'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : item.status === 'warning'
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        : 'bg-red-500/20 text-red-400 border border-red-500/30'
                    }`}
                  >
                    {item.status === 'aligned' && <CheckCircle2 className="h-3 w-3" />}
                    {item.status === 'warning' && <AlertTriangle className="h-3 w-3" />}
                    {item.status === 'conflict' && <XCircle className="h-3 w-3" />}
                    <span>{item.status}</span>
                  </span>
                </div>

                <p className="text-xs text-zinc-300 mt-3 leading-relaxed">
                  {item.explanation}
                </p>

                {item.conflictWith.length > 0 && (
                  <div className="mt-2 text-[11px] text-amber-400">
                    <strong>Friction with:</strong> {item.conflictWith.join(', ')}
                  </div>
                )}
              </div>

              <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-3 mt-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 block mb-0.5">
                  Remediation & Recommendation:
                </span>
                <p className="text-xs text-zinc-300">
                  {item.recommendation}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
