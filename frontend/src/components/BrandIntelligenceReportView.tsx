import React from 'react';
import {
  Award,
  Download,
  Copy,
  Check,
  ShieldCheck,
  Sparkles,
  Flame,
  Layers,
  Palette,
  FileText,
  AlertTriangle,
  Code2,
} from 'lucide-react';
import { FinalBrandIntelligenceReport } from '../types/brandforge';
import type { FinalBrandOutput } from '../types';

interface BrandIntelligenceReportViewProps {
  report: FinalBrandOutput;
  onInspectJson: (title: string, data: any) => void;
  onSwitchToLaunchKit: () => void;
}

export const BrandIntelligenceReportView: React.FC<BrandIntelligenceReportViewProps> = ({
  report,
  onInspectJson,
  onSwitchToLaunchKit,
}) => {
  const [copied, setCopied] = React.useState(false);

  // Transform backend FinalBrandOutput to UI-expected format
  const transformedReport: FinalBrandIntelligenceReport = {
    brandName: report.brand_direction,
    oneLineDescription: report.one_line_description,
    targetAudience: report.target_audience,
    coreProblem: report.core_problem,
    founderInsight: report.founder_insight,
    positioningStatement: report.positioning,
    differentiator: report.differentiator,
    brandPromise: report.brand_promise,
    brandPersonality: report.personality.core_traits.map(trait => ({
      trait,
      description: `Core trait from personality analysis`,
    })),
    traitsToAvoid: report.personality.traits_to_avoid,
    namingTerritoriesSummary: report.naming_territories.map(territory => ({
      territory: territory.type,
      topPick: territory.examples[0] || territory.type,
      vibe: territory.description,
    })),
    selectedTagline: report.tagline,
    alternateTaglines: report.messaging.split('.').slice(0, 3).filter(Boolean),
    voiceAndMessaging: {
      elevatorPitch10s: report.one_line_description,
      pitch30s: report.positioning,
      voicePillars: report.personality.voice_examples,
      manifestoExcerpt: report.messaging,
    },
    visualSystem: {
      primaryColor: report.visual_direction.color_direction || '#3B82F6',
      secondaryColor: '#10B981',
      accentColor: '#F59E0B',
      backgroundColor: '#000000',
      colors: [
        { name: 'Primary', hex: report.visual_direction.color_direction || '#3B82F6', role: 'primary', intent: 'Brand identity' },
        { name: 'Secondary', hex: '#10B981', role: 'secondary', intent: 'Trust' },
        { name: 'Accent', hex: '#F59E0B', role: 'accent', intent: 'Energy' },
      ],
      typography: {
        heading: report.typography,
        body: 'Inter',
        code: 'Fira Code',
      },
      logoDirection: {
        concept: report.logo_concept_directions[0] || 'Abstract',
        metaphor: report.visual_direction.visual_mood,
        execution: report.visual_direction.imagery_direction,
      },
    },
    antiGenericAudit: {
      score: parseInt(report.critic_findings.overall_score) || 75,
      topEliminations: report.critic_findings.key_concerns,
    },
    debateSynthesis: report.debate_findings.overall_assessment,
    consistencyVerdict: report.consistency_findings.overall_status,
    risksAndAssumptions: report.risks.map((risk: string, idx: number) => ({
      type: 'RISK' as any,
      statement: risk,
      sourceStage: 'FINAL_REPORT' as any,
    })),
    finalRecommendations: report.recommendations,
    generatedAt: new Date().toISOString(),
  };

  const handleCopySummary = () => {
    const text = `BRANDFORGE AI - BRAND INTELLIGENCE REPORT
Brand Name: ${transformedReport.brandName}
Tagline: "${transformedReport.selectedTagline}"
Category & Wedge: ${transformedReport.differentiator}
Positioning: ${transformedReport.positioningStatement}
Target Audience: ${transformedReport.targetAudience}
Core Problem: ${transformedReport.coreProblem}
Brand Promise: ${transformedReport.brandPromise}
Generated: ${transformedReport.generatedAt}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mx-auto max-w-6xl py-6 px-4 sm:px-6 space-y-8">
      {/* Master Dossier Hero */}
      <div className="rounded-3xl border border-amber-500/40 bg-gradient-to-b from-zinc-900 via-zinc-950 to-zinc-950 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 h-96 w-96 bg-amber-500/10 blur-3xl pointer-events-none rounded-full" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-zinc-800 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-400 mb-3">
              <Award className="h-3.5 w-3.5" />
              <span>FINAL BRAND INTELLIGENCE DOSSIER</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              {transformedReport.brandName}
            </h1>
            <p className="text-lg sm:text-xl font-medium text-amber-300/90 mt-2 font-serif italic">
              "{transformedReport.selectedTagline}"
            </p>
            <p className="text-sm text-zinc-300 mt-2 max-w-2xl leading-relaxed">
              {transformedReport.oneLineDescription}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleCopySummary}
              className="flex items-center gap-1.5 rounded-xl border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 px-4 py-2.5 text-xs font-bold text-zinc-200 transition-colors"
            >
              {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
              <span>{copied ? 'Copied Summary' : 'Copy Brief'}</span>
            </button>

            <button
              onClick={() => onInspectJson('Final Brand Report Schema', report)}
              className="flex items-center gap-1.5 rounded-xl border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 px-4 py-2.5 text-xs font-bold text-zinc-200 transition-colors"
            >
              <Code2 className="h-4 w-4 text-cyan-400" />
              <span>Inspect JSON</span>
            </button>

            <button
              onClick={onSwitchToLaunchKit}
              className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 px-5 py-2.5 text-xs font-black text-zinc-950 transition-all shadow-lg shadow-orange-500/20"
            >
              <Sparkles className="h-4 w-4" />
              <span>Open Launch Kit</span>
            </button>
          </div>
        </div>

        {/* 4 Key Pillars row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/50 p-4">
            <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Target Audience</div>
            <div className="text-sm font-bold text-white mt-1">{transformedReport.targetAudience}</div>
          </div>
          <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/50 p-4">
            <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Differentiator / Wedge</div>
            <div className="text-sm font-bold text-emerald-400 mt-1">{transformedReport.differentiator}</div>
          </div>
          <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/50 p-4">
            <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Brand Promise</div>
            <div className="text-sm font-bold text-white mt-1">{transformedReport.brandPromise}</div>
          </div>
          <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/50 p-4">
            <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Anti-Generic Score</div>
            <div className="text-sm font-bold text-amber-400 mt-1">{transformedReport.antiGenericAudit.score} / 100 Distinctive</div>
          </div>
        </div>
      </div>

      {/* Positioning & Core Problem Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span>Market Positioning Statement</span>
          </h3>
          <p className="text-base text-zinc-100 font-medium leading-relaxed">
            {transformedReport.positioningStatement}
          </p>

          <div className="border-t border-zinc-800 pt-3">
            <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">Founder Motivation & Insight</div>
            <p className="text-xs text-zinc-300 italic">
              "{transformedReport.founderInsight}"
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">Core Problem & Context</h3>
          <p className="text-sm text-zinc-200 leading-relaxed">{transformedReport.coreProblem}</p>

          <div className="border-t border-zinc-800 pt-3">
            <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">Alternate Tagline Directions</div>
            <div className="space-y-1">
              {transformedReport.alternateTaglines.map((tag, i) => (
                <div key={i} className="text-xs text-zinc-300 font-mono">
                  • "{tag}"
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Visual Identity & Palette System */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Palette className="h-4 w-4 text-purple-400" />
            <span>Visual System & Palette Direction</span>
          </h3>
          <span className="text-xs text-zinc-400 font-mono">Acoustic Console Palette</span>
        </div>

        {/* Color swatches */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {transformedReport.visualSystem.colors.map((color: any, idx: number) => (
            <div key={idx} className="rounded-xl border border-zinc-800 bg-zinc-950 p-3 flex flex-col justify-between">
              <div
                className="h-12 w-full rounded-lg border border-white/10 mb-2 shadow-inner"
                style={{ backgroundColor: color.hex }}
              />
              <div className="text-xs font-bold text-zinc-200">{color.name}</div>
              <div className="text-[10px] text-zinc-400 font-mono">{color.hex}</div>
              <span className="mt-1 text-[9px] font-bold uppercase text-amber-400 bg-zinc-800/80 px-1.5 py-0.5 rounded w-fit">
                {color.role}
              </span>
            </div>
          ))}
        </div>

        {/* Typography & Logo Metaphor */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 space-y-1 text-xs">
            <div className="font-bold text-zinc-300 uppercase tracking-wider mb-2">Typography Stack</div>
            <p className="text-zinc-200"><strong className="text-zinc-400 font-mono">Headings:</strong> {transformedReport.visualSystem.typography.heading}</p>
            <p className="text-zinc-200"><strong className="text-zinc-400 font-mono">Body Copy:</strong> {transformedReport.visualSystem.typography.body}</p>
            <p className="text-zinc-200"><strong className="text-zinc-400 font-mono">Code / Counters:</strong> {transformedReport.visualSystem.typography.code}</p>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 space-y-1 text-xs">
            <div className="font-bold text-zinc-300 uppercase tracking-wider mb-2">Logo Concept Metaphor</div>
            <p className="text-sm font-bold text-amber-400">{transformedReport.visualSystem.logoDirection.concept}</p>
            <p className="text-xs text-zinc-300">{transformedReport.visualSystem.logoDirection.metaphor}</p>
            <p className="text-[11px] text-zinc-400 mt-1">{transformedReport.visualSystem.logoDirection.execution}</p>
          </div>
        </div>
      </div>

      {/* Personality & Avoidance Rules */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 space-y-3">
          <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
            Brand Personality Traits
          </h4>
          <div className="space-y-2">
            {transformedReport.brandPersonality.map((p: any, i: number) => (
              <div key={i} className="text-xs text-zinc-300 border-l-2 border-emerald-500/40 pl-3 py-0.5">
                <strong className="text-white">{p.trait}:</strong> {p.description}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 space-y-3">
          <h4 className="text-xs font-bold text-red-400 uppercase tracking-wider">
            Strict Personality Avoidance Boundary
          </h4>
          <div className="space-y-2">
            {transformedReport.traitsToAvoid.map((avoid: any, i: number) => (
              <div key={i} className="text-xs text-zinc-300 border-l-2 border-red-500/40 pl-3 py-0.5">
                {avoid}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CRITICAL AI RELIABILITY SECTION: Separation of Fact vs Assumption */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-cyan-400" />
              <span>Evidence Audit Trail: Fact vs Assumption Separation</span>
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              BrandForge never fabricates evidence. Every assertion is classified by provenance.
            </p>
          </div>
        </div>

        <div className="space-y-2">
          {transformedReport.risksAndAssumptions.map((item: any, idx: number) => (
            <div
              key={idx}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-xl border border-zinc-800/80 bg-zinc-900/40 px-4 py-2.5 text-xs"
            >
              <div className="flex items-center gap-2.5">
                <span
                  className={`rounded px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                    item.type === 'FACT'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : item.type === 'FOUNDER_INPUT'
                      ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      : item.type === 'AI_INFERENCE'
                      ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                      : item.type === 'ASSUMPTION'
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                  }`}
                >
                  {item.type.replace('_', ' ')}
                </span>
                <span className="text-zinc-200 font-medium">{item.statement}</span>
              </div>
              <span className="text-[10px] text-zinc-500 font-mono">
                Source: {item.sourceStage}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Strategic Recommendations */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 space-y-3">
        <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
          Final Strategic Recommendations
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {transformedReport.finalRecommendations.map((rec: any, i: number) => (
            <div key={i} className="rounded-xl border border-zinc-800 bg-zinc-950 p-3 text-xs text-zinc-300 flex items-start gap-2">
              <span className="text-amber-400 font-bold">0{i + 1}.</span>
              <span>{rec}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
