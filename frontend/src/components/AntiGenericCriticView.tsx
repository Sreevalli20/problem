import React, { useState } from 'react';
import {
  AlertOctagon,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Code2,
  Clock,
  Sparkles,
  Flame,
  Search,
  Send,
  Loader2,
  RotateCcw,
} from 'lucide-react';
import { AntiGenericCriticOutput, AntiGenericCustomAuditResult, AntiGenericClicheItem } from '../types/brandforge';
import { analyzeCustomTextInput } from '../services/agentLogic';
import type { CritiqueOutput } from '../types';

interface AntiGenericCriticViewProps {
  critique?: CritiqueOutput;
  onInspectJson: (title: string, data: any) => void;
  onRunWorkflow?: () => void;
}

const SAMPLE_CLICHES = [
  'Empowering narrative creators with an intuitive next-gen audio platform.',
  'Supercharge your sales with a magical AI-powered copilot.',
  'The seamless all-in-one collaborative workspace to 10x your team workflow.',
  'Revolutionizing the future of innovation for modern enterprises.',
];

export const AntiGenericCriticView: React.FC<AntiGenericCriticViewProps> = ({
  critique,
  onInspectJson,
  onRunWorkflow,
}) => {
  const [customInputText, setCustomInputText] = useState('');
  const [isAuditing, setIsAuditing] = useState(false);
  const [customAuditResult, setCustomAuditResult] = useState<AntiGenericCustomAuditResult | null>(null);

  // Transform backend CritiqueOutput to UI-expected format
  const transformedCritique = critique ? {
    detectedCliches: critique.issues.map((issue, i) => ({
      detectedPhraseOrConcept: issue.description,
      status: issue.severity === 'high' ? 'rejected' as const : 'warning' as const,
      reason: issue.type,
      problems: [issue.evidence],
      evidenceOrContext: issue.evidence,
      replacementDirection: issue.replacement_direction,
      whyReplacementIsBetter: `Severity: ${issue.severity}`,
    })),
    overallGenericScore: parseInt(critique.overall_score) || 75,
    criticalWeaknesses: critique.key_concerns,
    founderWarning: critique.key_concerns.length > 0 ? critique.key_concerns[0] : 'No major concerns detected.',
    reasoningTimeMs: 0,
    summary: critique.status === 'approved' ? 'Analysis complete - brand positioning approved' : 'Analysis complete - improvements recommended',
  } : undefined;

  const handleAuditText = async (e?: React.FormEvent, textToAudit?: string) => {
    if (e) e.preventDefault();
    const query = textToAudit !== undefined ? textToAudit : customInputText;
    if (!query.trim()) return;

    setIsAuditing(true);
    try {
      let result: AntiGenericCustomAuditResult | null = null;
      try {
        const res = await fetch('/api/critic/analyze-text', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: query.trim() }),
        });
        if (res.ok) {
          result = await res.json();
        }
      } catch (err) {
        console.warn('Backend critique fetch failed, using client rule engine:', err);
      }

      if (!result) {
        result = analyzeCustomTextInput(query.trim());
      }

      setCustomAuditResult(result);
    } finally {
      setIsAuditing(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl py-6 px-4 sm:px-6 space-y-8">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-red-500/30 bg-gradient-to-r from-red-500/10 via-zinc-900 to-zinc-900 p-6 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded bg-red-500/20 px-2 py-0.5 text-xs font-bold text-red-400 border border-red-500/30 flex items-center gap-1">
              <Flame className="h-3 w-3" />
              <span>CORE DIFFERENTIATOR: ANTI-GENERIC ENGINE</span>
            </span>
            <span className="text-xs text-zinc-400 font-mono flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {transformedCritique ? 'Completed' : 'Ready'}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
            Startup Cliché Purge & Precision Replacement Rules
          </h2>
          <p className="text-xs text-zinc-400 mt-1 max-w-2xl">
            {transformedCritique
              ? transformedCritique.summary
              : 'Interactive adversarial engine analyzing taglines and positioning statements for startup tropes, vague buzzwords, and providing surgical high-contrast replacements.'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-2 text-right">
            <div className="text-[10px] text-zinc-500 font-semibold uppercase">Distinctiveness Index</div>
            <div className="text-xl font-black text-emerald-400">
              {transformedCritique ? transformedCritique.overallGenericScore : '--'}{' '}
              <span className="text-xs text-zinc-500 font-normal">/ 100</span>
            </div>
          </div>
          {transformedCritique && (
            <button
              onClick={() => onInspectJson('Anti-Generic Critic Schema', critique)}
              className="flex items-center gap-1.5 rounded-xl border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 px-3 py-2.5 text-xs font-bold text-zinc-200 transition-colors"
            >
              <Code2 className="h-3.5 w-3.5 text-cyan-400" />
              <span>Inspect JSON</span>
            </button>
          )}
        </div>
      </div>

      {/* INTERACTIVE FEATURE: Custom Text Analyzer */}
      <div className="rounded-2xl border border-amber-500/30 bg-zinc-900/80 p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-zinc-800 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-amber-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Live Text Cliché Auditor
              </h3>
              <span className="rounded bg-amber-500/20 px-2 py-0.5 text-[10px] font-bold text-amber-300 border border-amber-500/30">
                Interactive Engine
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-1">
              Enter any tagline, positioning statement, or headline to detect startup clichés and receive surgical replacements.
            </p>
          </div>
        </div>

        <form onSubmit={handleAuditText} className="space-y-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={customInputText}
              onChange={(e) => setCustomInputText(e.target.value)}
              placeholder="e.g. Empowering narrative creators to unlock their full potential with next-gen AI..."
              className="flex-1 rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-2.5 text-xs sm:text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400 font-mono"
            />
            <button
              type="submit"
              disabled={!customInputText.trim() || isAuditing}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-400 hover:bg-amber-300 px-5 py-2.5 text-xs font-bold text-zinc-950 transition-colors shadow-md disabled:opacity-50 shrink-0 cursor-pointer"
            >
              {isAuditing ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  <span>Auditing...</span>
                </>
              ) : (
                <>
                  <Send className="h-3.5 w-3.5" />
                  <span>Audit Text</span>
                </>
              )}
            </button>
          </div>

          {/* Quick test prompt chips */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-zinc-400">
            <span className="font-semibold text-zinc-300">Quick Test:</span>
            {SAMPLE_CLICHES.map((cliche, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setCustomInputText(cliche);
                  handleAuditText(undefined, cliche);
                }}
                className="rounded-lg border border-zinc-800 bg-zinc-950 px-2 py-1 text-[11px] text-zinc-400 hover:border-zinc-700 hover:text-amber-300 transition-colors"
              >
                "{cliche.slice(0, 36)}..."
              </button>
            ))}
          </div>
        </form>

        {/* Live Audit Result Drawer */}
        {customAuditResult && (
          <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5 space-y-4 mt-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-zinc-800/80 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Audited Input</span>
                <p className="text-xs sm:text-sm font-semibold text-white font-mono mt-0.5">
                  "{customAuditResult.inputText}"
                </p>
              </div>

              <div className="flex items-center gap-2">
                <div className="rounded-lg bg-zinc-900 px-3 py-1.5 border border-zinc-800 text-right">
                  <span className="text-[9px] uppercase font-bold text-zinc-500 block">Score</span>
                  <span className="text-sm font-black text-amber-400">
                    {customAuditResult.distinctivenessScore} / 100
                  </span>
                </div>
                <button
                  onClick={() => onInspectJson('Custom Text Audit Schema', customAuditResult)}
                  className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
                  title="Inspect Result JSON"
                >
                  <Code2 className="h-4 w-4 text-cyan-400" />
                </button>
              </div>
            </div>

            <p className="text-xs text-zinc-300">
              <strong className="text-zinc-200">Critique Verdict:</strong> {customAuditResult.critiqueSummary}
            </p>

            {/* Custom detected issues */}
            <div className="space-y-3">
              {customAuditResult.detectedIssues.map((issue, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-zinc-800/80 bg-zinc-900/60 p-4 space-y-3"
                >
                  <div className="flex items-center justify-between border-b border-zinc-800/60 pb-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={`rounded px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                          issue.status === 'rejected'
                            ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                            : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        }`}
                      >
                        {issue.status.toUpperCase()}
                      </span>
                      <span className="text-xs font-bold text-zinc-300">{issue.reason}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="rounded-lg bg-red-500/5 border border-red-500/20 p-3 text-xs space-y-1">
                      <div className="font-bold text-red-400 flex items-center gap-1">
                        <XCircle className="h-3.5 w-3.5" />
                        <span>Problematic Concept:</span>
                      </div>
                      <p className="text-red-200 font-mono line-through decoration-red-500/80">
                        "{issue.detectedPhraseOrConcept}"
                      </p>
                      {issue.problems && issue.problems.length > 0 && (
                        <ul className="pt-1 space-y-0.5 text-[11px] text-zinc-400">
                          {issue.problems.map((p, pi) => (
                            <li key={pi} className="flex items-start gap-1">
                              <span className="text-red-500">•</span>
                              <span>{p}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/30 p-3 text-xs space-y-1">
                      <div className="font-bold text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        <span>Surgical Replacement Direction:</span>
                      </div>
                      <p className="text-emerald-100 font-medium">
                        {issue.replacementDirection}
                      </p>
                      <p className="text-[11px] text-emerald-300/80 pt-1">
                        <strong>Why it works:</strong> {issue.whyReplacementIsBetter}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Pipeline Cliché Breakdown or Pending State */}
      {transformedCritique ? (
        <>
          {/* Founder Warning Callout */}
          <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 sm:p-5 flex items-start gap-3">
            <AlertOctagon className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300">
                Adversarial Critic Warning to Founder
              </h4>
              <p className="text-xs sm:text-sm text-amber-100/90 mt-1 font-medium leading-relaxed">
                {transformedCritique.founderWarning}
              </p>
            </div>
          </div>

          {/* Pipeline Cliché Breakdown List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <span>Pipeline Detected Tropes & Replacement Rules</span>
                <span className="text-xs font-normal text-zinc-500 font-mono">
                  ({transformedCritique.detectedCliches.length} audit flags)
                </span>
              </h3>

              <button
                onClick={() => onInspectJson('Anti-Generic Critic — Pipeline Audit JSON', critique)}
                className="flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 bg-cyan-500/10 px-3 py-1.5 rounded-lg border border-cyan-500/30"
              >
                <Code2 className="h-3.5 w-3.5" />
                <span>Inspect Structured JSON</span>
              </button>
            </div>

            <div className="space-y-4">
              {transformedCritique?.detectedCliches.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-5 sm:p-6 space-y-4 shadow-lg"
                >
                  {/* Top row: Rejected phrase vs status */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-zinc-800 pb-3">
                    <div className="flex items-center gap-2">
                      <span
                        className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                          item.status === 'rejected'
                            ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                            : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        }`}
                      >
                        {item.status.toUpperCase()}
                      </span>
                      <span className="text-xs font-bold text-zinc-400">Issue Detected:</span>
                      <span className="text-xs font-bold text-zinc-200">{item.reason}</span>
                    </div>
                    <div className="text-[11px] text-zinc-500 italic">
                      Flag #{idx + 1}
                    </div>
                  </div>

                  {/* The Rejected Cliché */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4 space-y-2">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-red-400">
                        <XCircle className="h-4 w-4 shrink-0" />
                        <span>REJECTED CONCEPT / PHRASE:</span>
                      </div>
                      <p className="text-sm font-semibold text-red-200/90 font-mono line-through decoration-red-500/70">
                        "{item.detectedPhraseOrConcept}"
                      </p>
                      <p className="text-xs text-zinc-400 mt-2">
                        <strong className="text-zinc-300">Context & Evidence:</strong> {item.evidenceOrContext}
                      </p>
                      {item.problems && item.problems.length > 0 && (
                        <div className="mt-2 pt-2 border-t border-red-500/20">
                          <span className="text-[10px] font-bold uppercase text-red-400">Specific Problems:</span>
                          <ul className="mt-1 space-y-0.5 text-xs text-zinc-300">
                            {item.problems.map((prob, pi) => (
                              <li key={pi} className="flex items-start gap-1.5">
                                <span className="text-red-500">•</span>
                                <span>{prob}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* The Surgical Replacement */}
                    <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 space-y-2">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                        <CheckCircle2 className="h-4 w-4 shrink-0" />
                        <span>SURGICAL REPLACEMENT DIRECTION:</span>
                      </div>
                      <p className="text-sm font-semibold text-emerald-100 font-sans">
                        {item.replacementDirection}
                      </p>
                      <p className="text-xs text-emerald-200/80 mt-2">
                        <strong className="text-emerald-300">Why it is more specific:</strong> {item.whyReplacementIsBetter}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Critical Weaknesses Box */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5 space-y-3">
            <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-cyan-400" />
              <span>Vulnerability Guardrails To Defend Against</span>
            </h4>
            <ul className="space-y-1.5">
              {transformedCritique?.criticalWeaknesses.map((w, i) => (
                <li key={i} className="text-xs text-zinc-400 flex items-start gap-2">
                  <span className="text-cyan-500 shrink-0 font-bold">•</span>
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 text-center space-y-3">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <AlertOctagon className="h-5 w-5" />
          </div>
          <h4 className="text-sm font-bold text-zinc-200">
            Pipeline Audit Pending
          </h4>
          <p className="text-xs text-zinc-400 max-w-md mx-auto">
            Run the multi-agent pipeline to audit the generated brand artifacts against clichés, or use the interactive sandbox above to test any positioning statement right now!
          </p>
          {onRunWorkflow && (
            <button
              onClick={onRunWorkflow}
              className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-4 py-2 text-xs font-bold text-zinc-950 hover:bg-amber-300 transition-colors"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Run Pipeline to Generate Full Audit</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};
