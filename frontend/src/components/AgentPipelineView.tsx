import React from 'react';
import {
  Search,
  Compass,
  Smile,
  Palette,
  Code2,
  CheckCircle2,
  Clock,
  Sparkles,
  ExternalLink,
  ShieldAlert,
  HelpCircle,
} from 'lucide-react';
import type {
  DiscoveryOutput,
  PositioningOutput,
  PersonalityOutput,
  CreativeOutput,
} from '../types';

interface AgentPipelineViewProps {
  discovery?: DiscoveryOutput;
  positioning?: PositioningOutput;
  personality?: PersonalityOutput;
  creative?: CreativeOutput;
  onInspectJson: (title: string, data: any) => void;
  activeStageTab: 'DISCOVERY' | 'POSITIONING' | 'PERSONALITY' | 'CREATIVE_DIRECTION';
  onSelectStageTab: (tab: 'DISCOVERY' | 'POSITIONING' | 'PERSONALITY' | 'CREATIVE_DIRECTION') => void;
}

export const AgentPipelineView: React.FC<AgentPipelineViewProps> = ({
  discovery,
  positioning,
  personality,
  creative,
  onInspectJson,
  activeStageTab,
  onSelectStageTab,
}) => {
  // Transform backend data to UI-expected format
  const transformedDiscovery = discovery ? {
    ...discovery,
    targetAudience: discovery.target_users,
    coreProblem: discovery.problem,
    founderMotivation: discovery.motivations,
    currentAlternatives: discovery.alternatives ? [discovery.alternatives] : [],
    initialWedge: discovery.differentiators,
    risks: discovery.constraints || [],
    reasoningTimeMs: 0,
    confidence: parseInt(discovery.confidence_level) || 85,
    summary: discovery.product_concept,
  } : undefined;

  const transformedPositioning = positioning ? {
    ...positioning,
    marketCategory: positioning.category,
    valueProposition: positioning.value_proposition,
    differentiatedWedge: positioning.differentiator,
    positioningStatement: positioning.positioning_statement,
    antiPositioning: positioning.brand_promise,
    primaryAudienceProfile: {
      persona: positioning.target_audience,
      painPoint: positioning.problem,
      urgency: 'High',
      switchingTrigger: positioning.differentiator,
    },
    competitiveMoatHypothesis: positioning.positioning_statement,
    reasoningTimeMs: 0,
    confidence: 85,
    summary: positioning.positioning_statement,
  } : undefined;

  const transformedPersonality = personality ? {
    ...personality,
    archetype: personality.emotional_character,
    coreTraits: personality.core_traits.map((trait, i) => ({
      trait,
      definition: `Core trait ${i + 1}`,
      howItShowsUp: personality.communication_style,
    })),
    traitsToAvoid: personality.traits_to_avoid.map((trait, i) => ({
      trait,
      whyHarmful: `Trait ${i + 1} harmful`,
      trapToAvoid: `Avoid ${trait}`,
    })),
    communicationStyle: {
      tone: personality.communication_style,
      rhythm: 'Consistent',
      vocabularyPreference: personality.voice_examples,
      bannedWords: personality.traits_to_avoid,
    },
    reasoningTimeMs: 0,
    confidence: 85,
    summary: personality.emotional_character,
  } : undefined;

  const transformedCreative = creative ? {
    ...creative,
    namingTerritories: creative.naming_territories.map((territory, i) => ({
      territoryName: territory.type,
      theme: territory.description,
      names: territory.examples.map((name, j) => ({
        name,
        rationale: territory.rationale,
        tldLikelihood: 'High',
        phoneticVibe: 'Professional',
      })),
    })),
    taglineOptions: creative.tagline_directions.map((tagline, i) => ({
      tagline,
      angle: `Option ${i + 1}`,
      punchinessScore: 85,
    })),
    visualDirection: {
      mood: creative.visual_direction.visual_mood,
      colorPalette: [
        {
          name: 'Primary',
          hex: creative.visual_direction.color_direction || '#3B82F6',
          role: 'primary',
          psychologicalIntent: creative.visual_direction.visual_mood,
        },
        {
          name: 'Secondary',
          hex: '#10B981',
          role: 'secondary',
          psychologicalIntent: 'Trust',
        },
        {
          name: 'Accent',
          hex: '#F59E0B',
          role: 'accent',
          psychologicalIntent: 'Energy',
        },
      ],
      typographyPairing: {
        headingFont: creative.visual_direction.typography_direction || 'Inter',
        bodyFont: 'Inter',
        codeFont: 'Fira Code',
        rationale: creative.visual_direction.composition,
      },
      imageryStyle: creative.visual_direction.imagery_direction,
      logoConceptDirections: creative.visual_direction.logo_concept_directions.map((concept, i) => ({
        conceptName: `Concept ${i + 1}`,
        visualMetaphor: concept,
        description: creative.visual_direction.imagery_direction,
        svgGlyphIdea: 'Abstract',
      })),
    },
    reasoningTimeMs: 0,
    confidence: 85,
    summary: 'Creative direction generated',
  } : undefined;
  return (
    <div className="mx-auto max-w-6xl py-6 px-4 sm:px-6">
      {/* Stage sub-nav tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 border-b border-zinc-800 scrollbar-none">
        <button
          onClick={() => onSelectStageTab('DISCOVERY')}
          className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all border ${
            activeStageTab === 'DISCOVERY'
              ? 'bg-amber-500/10 text-amber-300 border-amber-500/40 shadow-sm'
              : 'text-zinc-400 border-zinc-800 bg-zinc-900/60 hover:text-white hover:bg-zinc-800'
          }`}
        >
          <Search className="h-3.5 w-3.5" />
          <span>1. Discovery Output</span>
          {discovery && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />}
        </button>

        <button
          onClick={() => onSelectStageTab('POSITIONING')}
          className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all border ${
            activeStageTab === 'POSITIONING'
              ? 'bg-amber-500/10 text-amber-300 border-amber-500/40 shadow-sm'
              : 'text-zinc-400 border-zinc-800 bg-zinc-900/60 hover:text-white hover:bg-zinc-800'
          }`}
        >
          <Compass className="h-3.5 w-3.5" />
          <span>2. Positioning Output</span>
          {positioning && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />}
        </button>

        <button
          onClick={() => onSelectStageTab('PERSONALITY')}
          className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all border ${
            activeStageTab === 'PERSONALITY'
              ? 'bg-amber-500/10 text-amber-300 border-amber-500/40 shadow-sm'
              : 'text-zinc-400 border-zinc-800 bg-zinc-900/60 hover:text-white hover:bg-zinc-800'
          }`}
        >
          <Smile className="h-3.5 w-3.5" />
          <span>3. Personality Output</span>
          {personality && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />}
        </button>

        <button
          onClick={() => onSelectStageTab('CREATIVE_DIRECTION')}
          className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all border ${
            activeStageTab === 'CREATIVE_DIRECTION'
              ? 'bg-amber-500/10 text-amber-300 border-amber-500/40 shadow-sm'
              : 'text-zinc-400 border-zinc-800 bg-zinc-900/60 hover:text-white hover:bg-zinc-800'
          }`}
        >
          <Palette className="h-3.5 w-3.5" />
          <span>4. Creative Direction</span>
          {creative && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />}
        </button>
      </div>

      {/* Content panel */}
      <div className="mt-6">
        {/* STAGE 1: DISCOVERY */}
        {activeStageTab === 'DISCOVERY' && transformedDiscovery && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/80 p-5">
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded bg-amber-500/20 px-2 py-0.5 text-xs font-bold text-amber-400 border border-amber-500/30">
                    STAGE 1: DISCOVERY
                  </span>
                  <span className="text-xs text-zinc-400 font-mono flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {transformedDiscovery.reasoningTimeMs}ms
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mt-1">
                  Founder Intent & Operational Wedge
                </h3>
                <p className="text-xs text-zinc-400 mt-1 max-w-2xl">
                  {transformedDiscovery.summary}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <div className="rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-1.5 text-right">
                  <div className="text-[10px] text-zinc-500 font-semibold uppercase">Confidence</div>
                  <div className="text-sm font-black text-emerald-400">{transformedDiscovery.confidence}%</div>
                </div>
                <button
                  onClick={() => onInspectJson('Discovery Agent Output Schema', discovery)}
                  className="flex items-center gap-1.5 rounded-xl border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 px-3 py-2 text-xs font-bold text-zinc-200 transition-colors"
                >
                  <Code2 className="h-3.5 w-3.5 text-cyan-400" />
                  <span>Inspect JSON</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5 space-y-4">
                <div>
                  <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Target Wedge Audience</h4>
                  <p className="text-sm text-zinc-100 font-medium mt-1">{transformedDiscovery.targetAudience}</p>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Core Problem Statement</h4>
                  <p className="text-sm text-zinc-100 mt-1 leading-relaxed">{transformedDiscovery.coreProblem}</p>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Founder Motivation</h4>
                  <p className="text-sm text-amber-200/90 mt-1 italic">"{transformedDiscovery.founderMotivation}"</p>
                </div>
              </div>

              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5 space-y-4">
                <div>
                  <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Current Broken Alternatives</h4>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {transformedDiscovery.currentAlternatives.map((alt, i) => (
                      <span key={i} className="rounded-lg bg-zinc-800 border border-zinc-700 px-2.5 py-1 text-xs text-zinc-300">
                        {alt}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Initial Differentiated Wedge</h4>
                  <p className="text-sm text-emerald-300 font-semibold mt-1">{transformedDiscovery.initialWedge}</p>
                </div>

                <div className="border-t border-zinc-800 pt-3">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 mb-1.5">
                    <ShieldAlert className="h-3.5 w-3.5" />
                    <span>Identified Execution Risks:</span>
                  </div>
                  <ul className="space-y-1">
                    {transformedDiscovery.risks.map((r, i) => (
                      <li key={i} className="text-xs text-zinc-400 flex items-start gap-1.5">
                        <span className="text-amber-500">•</span>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STAGE 2: POSITIONING */}
        {activeStageTab === 'POSITIONING' && transformedPositioning && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/80 p-5">
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded bg-blue-500/20 px-2 py-0.5 text-xs font-bold text-blue-400 border border-blue-500/30">
                    STAGE 2: POSITIONING
                  </span>
                  <span className="text-xs text-zinc-400 font-mono flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {transformedPositioning.reasoningTimeMs}ms
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mt-1">
                  Defensible Category Wedge & Anti-Positioning
                </h3>
                <p className="text-xs text-zinc-400 mt-1 max-w-2xl">
                  {transformedPositioning.summary}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <div className="rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-1.5 text-right">
                  <div className="text-[10px] text-zinc-500 font-semibold uppercase">Confidence</div>
                  <div className="text-sm font-black text-emerald-400">{transformedPositioning.confidence}%</div>
                </div>
                <button
                  onClick={() => onInspectJson('Positioning Agent Output Schema', positioning)}
                  className="flex items-center gap-1.5 rounded-xl border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 px-3 py-2 text-xs font-bold text-zinc-200 transition-colors"
                >
                  <Code2 className="h-3.5 w-3.5 text-cyan-400" />
                  <span>Inspect JSON</span>
                </button>
              </div>
            </div>

            {/* Master Positioning Statement Card */}
            <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-zinc-900 to-zinc-900 p-6 shadow-xl">
              <div className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
                Definitive Positioning Statement
              </div>
              <p className="text-base sm:text-lg font-medium text-zinc-100 leading-relaxed font-sans">
                {transformedPositioning.positioningStatement}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5 space-y-4">
                <div>
                  <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Defined Market Category</h4>
                  <p className="text-base font-bold text-white mt-1">{transformedPositioning.marketCategory}</p>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Core Value Proposition</h4>
                  <p className="text-sm text-zinc-200 mt-1 font-medium">{transformedPositioning.valueProposition}</p>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Differentiated Wedge</h4>
                  <p className="text-sm text-emerald-400 mt-1 font-semibold">{transformedPositioning.differentiatedWedge}</p>
                </div>
              </div>

              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5 space-y-4">
                {/* Anti-positioning: CRITICAL DIFFERENTIATOR */}
                <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-red-400 mb-1">
                    <ShieldAlert className="h-3.5 w-3.5" />
                    <span>ANTI-POSITIONING (WHAT THIS BRAND STRICTLY IS NOT):</span>
                  </div>
                  <p className="text-xs text-red-200 font-semibold leading-relaxed">
                    {transformedPositioning.antiPositioning}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Switching Trigger & Urgency</h4>
                  <p className="text-xs text-zinc-300 mt-1">
                    <strong className="text-white">Trigger:</strong> {transformedPositioning.primaryAudienceProfile.switchingTrigger}
                  </p>
                  <p className="text-xs text-zinc-300 mt-1">
                    <strong className="text-white">Urgency:</strong> {transformedPositioning.primaryAudienceProfile.urgency}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Competitive Moat Hypothesis</h4>
                  <p className="text-xs text-zinc-300 mt-1 font-mono">
                    {transformedPositioning.competitiveMoatHypothesis}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STAGE 3: PERSONALITY */}
        {activeStageTab === 'PERSONALITY' && transformedPersonality && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/80 p-5">
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-xs font-bold text-emerald-400 border border-emerald-500/30">
                    STAGE 3: PERSONALITY
                  </span>
                  <span className="text-xs text-zinc-400 font-mono flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {transformedPersonality.reasoningTimeMs}ms
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mt-1">
                  Brand Archetype & Communication Cadence
                </h3>
                <p className="text-xs text-zinc-400 mt-1 max-w-2xl">
                  {transformedPersonality.summary}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <div className="rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-1.5 text-right">
                  <div className="text-[10px] text-zinc-500 font-semibold uppercase">Confidence</div>
                  <div className="text-sm font-black text-emerald-400">{transformedPersonality.confidence}%</div>
                </div>
                <button
                  onClick={() => onInspectJson('Personality Agent Output Schema', personality)}
                  className="flex items-center gap-1.5 rounded-xl border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 px-3 py-2 text-xs font-bold text-zinc-200 transition-colors"
                >
                  <Code2 className="h-3.5 w-3.5 text-cyan-400" />
                  <span>Inspect JSON</span>
                </button>
              </div>
            </div>

            {/* Archetype banner */}
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Core Archetype
              </span>
              <h2 className="text-xl font-extrabold text-white mt-1">
                {transformedPersonality.archetype}
              </h2>
              <p className="text-xs text-emerald-200/80 mt-1">
                Tone: {transformedPersonality.communicationStyle.tone}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 4 Core Traits */}
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5 space-y-3">
                <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>4 Core Personality Traits</span>
                </h4>
                <div className="space-y-3">
                  {transformedPersonality.coreTraits.map((t, i) => (
                    <div key={i} className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-3">
                      <div className="text-xs font-bold text-white">{t.trait}</div>
                      <p className="text-xs text-zinc-400 mt-0.5">{t.definition}</p>
                      <div className="text-[11px] text-emerald-400/90 mt-1 font-mono">
                        Shows up as: {t.howItShowsUp}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4 Traits to Strictly Avoid */}
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5 space-y-3">
                <h4 className="text-xs font-bold text-red-400 uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldAlert className="h-3.5 w-3.5" />
                  <span>4 Traits the Brand Must Strictly Avoid</span>
                </h4>
                <div className="space-y-3">
                  {transformedPersonality.traitsToAvoid.map((t, i) => (
                    <div key={i} className="rounded-xl border border-red-500/20 bg-red-500/5 p-3">
                      <div className="text-xs font-bold text-red-300">{t.trait}</div>
                      <p className="text-xs text-zinc-400 mt-0.5">{t.whyHarmful}</p>
                      <div className="text-[11px] text-red-400 mt-1">
                        Trap to avoid: {t.trapToAvoid}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Banned Words & Vocabulary */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Preferred Vocabulary</h4>
                <div className="flex flex-wrap gap-1.5">
                  {transformedPersonality.communicationStyle.vocabularyPreference.map((word, i) => (
                    <span key={i} className="rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 text-xs font-mono">
                      {word}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Banned Buzzwords</h4>
                <div className="flex flex-wrap gap-1.5">
                  {transformedPersonality.communicationStyle.bannedWords.map((word, i) => (
                    <span key={i} className="rounded bg-red-500/10 text-red-400 border border-red-500/30 px-2 py-0.5 text-xs line-through font-mono">
                      {word}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STAGE 4: CREATIVE DIRECTION */}
        {activeStageTab === 'CREATIVE_DIRECTION' && transformedCreative && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/80 p-5">
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded bg-purple-500/20 px-2 py-0.5 text-xs font-bold text-purple-400 border border-purple-500/30">
                    STAGE 4: CREATIVE DIRECTION
                  </span>
                  <span className="text-xs text-zinc-400 font-mono flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {transformedCreative.reasoningTimeMs}ms
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mt-1">
                  Naming Territories, Palette & Art Direction
                </h3>
                <p className="text-xs text-zinc-400 mt-1 max-w-2xl">
                  {transformedCreative.summary}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <div className="rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-1.5 text-right">
                  <div className="text-[10px] text-zinc-500 font-semibold uppercase">Confidence</div>
                  <div className="text-sm font-black text-emerald-400">{transformedCreative.confidence}%</div>
                </div>
                <button
                  onClick={() => onInspectJson('Creative Director Output Schema', creative)}
                  className="flex items-center gap-1.5 rounded-xl border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 px-3 py-2 text-xs font-bold text-zinc-200 transition-colors"
                >
                  <Code2 className="h-3.5 w-3.5 text-cyan-400" />
                  <span>Inspect JSON</span>
                </button>
              </div>
            </div>

            {/* 3 Naming Territories */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                Vetted Naming Territories & Candidates
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {transformedCreative.namingTerritories.map((territory, idx) => (
                  <div key={idx} className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 flex flex-col justify-between">
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-purple-400 mb-1">
                        Territory {String.fromCharCode(65 + idx)}
                      </div>
                      <h5 className="text-sm font-bold text-white">{territory.territoryName}</h5>
                      <p className="text-xs text-zinc-400 mt-1">{territory.theme}</p>

                      <div className="mt-4 space-y-3">
                        {territory.names.map((cand, ci) => (
                          <div key={ci} className="rounded-xl border border-zinc-800 bg-zinc-950 p-3">
                            <div className="flex items-center justify-between">
                              <span className="text-base font-extrabold text-white font-mono">{cand.name}</span>
                              <span className="text-[10px] text-amber-400 font-medium">{cand.phoneticVibe}</span>
                            </div>
                            <p className="text-xs text-zinc-400 mt-1">{cand.rationale}</p>
                            <div className="text-[10px] text-emerald-400 mt-1.5 font-mono">
                              TLD: {cand.tldLikelihood}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Color Palette & Typography */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Color Swatches */}
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5 space-y-3">
                <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
                  Color System & Semantic Roles
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {transformedCreative.visualDirection.colorPalette.map((swatch, si) => (
                    <div key={si} className="rounded-xl border border-zinc-800 bg-zinc-950 p-2.5 flex flex-col justify-between">
                      <div
                        className="h-10 w-full rounded-lg border border-white/10 mb-2 shadow-inner"
                        style={{ backgroundColor: swatch.hex }}
                      />
                      <div className="text-xs font-bold text-zinc-200">{swatch.name}</div>
                      <div className="text-[10px] text-zinc-400 font-mono">{swatch.hex}</div>
                      <span className="mt-1 inline-block rounded bg-zinc-800 px-1.5 py-0.5 text-[9px] font-semibold uppercase text-zinc-300 w-fit">
                        {swatch.role}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Typography & Logo Metaphors */}
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5 space-y-4">
                <div>
                  <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2">
                    Typography Pairing
                  </h4>
                  <div className="space-y-1 text-xs">
                    <p className="text-zinc-200"><strong className="text-zinc-400 font-mono">Headings:</strong> {transformedCreative.visualDirection.typographyPairing.headingFont}</p>
                    <p className="text-zinc-200"><strong className="text-zinc-400 font-mono">Body:</strong> {transformedCreative.visualDirection.typographyPairing.bodyFont}</p>
                    <p className="text-zinc-200"><strong className="text-zinc-400 font-mono">Monospace:</strong> {transformedCreative.visualDirection.typographyPairing.codeFont}</p>
                    <p className="text-zinc-400 italic pt-1">{transformedCreative.visualDirection.typographyPairing.rationale}</p>
                  </div>
                </div>

                <div className="border-t border-zinc-800 pt-3">
                  <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2">
                    Logo Concept Directions
                  </h4>
                  <div className="space-y-2">
                    {transformedCreative.visualDirection.logoConceptDirections.map((logo, li) => (
                      <div key={li} className="rounded-xl border border-zinc-800 bg-zinc-950 p-3">
                        <div className="text-xs font-bold text-amber-400">{logo.conceptName}</div>
                        <p className="text-xs text-zinc-300 mt-0.5 font-medium">{logo.visualMetaphor}</p>
                        <p className="text-[11px] text-zinc-400 mt-1">{logo.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
