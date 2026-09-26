import React, { useState } from 'react';
import {
  Send,
  HelpCircle,
  Lightbulb,
  ArrowRight,
  Sparkles,
  ShieldAlert,
  CheckCircle,
  Loader2,
  FileQuestion,
  Code2,
} from 'lucide-react';
import { FounderInterviewState, InterviewMessage } from '../types/brandforge';

interface FounderInterviewProps {
  interviewState: FounderInterviewState;
  onSendAnswer: (answer: string) => void;
  onStartInterview: (rawIdea: string) => void;
  onExecuteWorkflow: () => void;
  isProcessing: boolean;
  onSelectPresetIdea: (idea: string) => void;
  onInspectJson?: (title: string, data: any) => void;
}

export const FounderInterview: React.FC<FounderInterviewProps> = ({
  interviewState,
  onSendAnswer,
  onStartInterview,
  onExecuteWorkflow,
  isProcessing,
  onSelectPresetIdea,
  onInspectJson,
}) => {
  const [ideaInput, setIdeaInput] = useState(interviewState.initialIdea || '');
  const [answerInput, setAnswerInput] = useState('');

  const isStarted = interviewState.conversation.length > 0;
  const lastMessage = interviewState.conversation[interviewState.conversation.length - 1];

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ideaInput.trim()) return;
    onStartInterview(ideaInput.trim());
  };

  const handleAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!answerInput.trim() || isProcessing) return;
    onSendAnswer(answerInput.trim());
    setAnswerInput('');
  };

  return (
    <div className="mx-auto max-w-5xl py-6 px-4 sm:px-6">
      {!isStarted ? (
        /* Step 1: Initial Idea Entry */
        <div className="rounded-2xl border border-zinc-800 bg-gradient-to-b from-zinc-900/90 to-zinc-950 p-6 sm:p-10 shadow-2xl">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-400 mb-4">
              <Sparkles className="h-3.5 w-3.5" />
              <span>STAGE 0: FOUNDER INPUT & ADAPTIVE INTERVIEW</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              Turn your raw idea into a defensible brand system.
            </h1>
            <p className="mt-3 text-sm sm:text-base text-zinc-400 leading-relaxed">
              BrandForge is not a generic logo generator or cliché landing page builder.
              Our 9-agent pipeline analyzes your wedge, critiques startup tropes, and
              simulates an AI Brand Debate to forge an uncopyable identity.
            </p>
          </div>

          <form onSubmit={handleStart} className="mt-8">
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
              Describe your raw product concept or founder hypothesis
            </label>
            <textarea
              rows={4}
              value={ideaInput}
              onChange={(e) => setIdeaInput(e.target.value)}
              placeholder="e.g. We are building a browser-native collaborative audio workstation specifically for narrative podcast editors who hate exporting stems to Google Drive..."
              className="w-full rounded-xl border border-zinc-700 bg-zinc-950/80 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400 transition-all font-mono"
            />

            <div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-zinc-400">
                <Lightbulb className="h-4 w-4 text-amber-400 shrink-0" />
                <span>Need inspiration? Try a curated hackathon preset idea.</span>
              </div>

              <button
                type="submit"
                disabled={!ideaInput.trim() || isProcessing}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-3 text-sm font-bold text-zinc-950 hover:from-amber-400 hover:to-orange-400 transition-all shadow-lg shadow-amber-500/20 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Analyzing Concept...</span>
                  </>
                ) : (
                  <>
                    <span>Begin Adaptive Interview</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Quick preset chips */}
          <div className="mt-8 border-t border-zinc-800/80 pt-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-3">
              Or quick-load a founder scenario:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                onClick={() => {
                  const val =
                    'We are building a browser-native collaborative audio workstation specifically for narrative podcast producers who are overwhelmed by Pro Tools and waste hours exporting stems to Google Drive for director review.';
                  setIdeaInput(val);
                  onSelectPresetIdea(val);
                }}
                className="text-left rounded-xl border border-zinc-800 bg-zinc-900/50 p-3 hover:border-zinc-700 hover:bg-zinc-850 transition-all group"
              >
                <div className="text-xs font-bold text-zinc-200 group-hover:text-amber-400">
                  🎧 Narrative Audio DAW
                </div>
                <p className="text-[11px] text-zinc-400 mt-1 line-clamp-2">
                  Zero-export stem streaming for narrative podcast sound editors.
                </p>
              </button>

              <button
                onClick={() => {
                  const val =
                    'An autonomous conversational AI agent that handles technical inbound RFPs and parts specifications for industrial equipment manufacturers and valve distributors.';
                  setIdeaInput(val);
                  onSelectPresetIdea(val);
                }}
                className="text-left rounded-xl border border-zinc-800 bg-zinc-900/50 p-3 hover:border-zinc-700 hover:bg-zinc-850 transition-all group"
              >
                <div className="text-xs font-bold text-zinc-200 group-hover:text-amber-400">
                  ⚙️ Industrial Sales AI
                </div>
                <p className="text-[11px] text-zinc-400 mt-1 line-clamp-2">
                  Parse 800-page vendor spec sheets to quote valves in 90 seconds.
                </p>
              </button>

              <button
                onClick={() => {
                  const val =
                    'Sub-surface soil sensor probes and micro-climate forecasting stations tailored for high-end boutique winemakers facing sudden drought and frost spikes.';
                  setIdeaInput(val);
                  onSelectPresetIdea(val);
                }}
                className="text-left rounded-xl border border-zinc-800 bg-zinc-900/50 p-3 hover:border-zinc-700 hover:bg-zinc-850 transition-all group"
              >
                <div className="text-xs font-bold text-zinc-200 group-hover:text-amber-400">
                  🍇 Boutique Vineyard IoT
                </div>
                <p className="text-[11px] text-zinc-400 mt-1 line-clamp-2">
                  Terroir micro-parcel telemetry protecting Pinot Noir from frost.
                </p>
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Step 2: Active Adaptive Interview */
        <div className="space-y-6">
          {/* Header & Sufficiency meter */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/90 p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                  Adaptive Strategic Probing
                </h2>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">
                Questions adapt dynamically based on gaps in your wedge, alternatives, and avoidance traits.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
              {onInspectJson && (
                <button
                  onClick={() =>
                    onInspectJson('Founder Interview — Structured Context & Probe State', {
                      stage: 'INTERVIEW',
                      status: interviewState.isComplete ? 'Complete' : 'In Progress',
                      sufficiencyScore: interviewState.sufficiencyScore,
                      initialIdea: interviewState.initialIdea,
                      extractedFacts: interviewState.extractedFacts,
                      extractedAssumptions: interviewState.extractedAssumptions,
                      founderConstraints: interviewState.founderConstraints,
                      totalTurns: interviewState.conversation.length,
                      conversationHistory: interviewState.conversation,
                    })
                  }
                  className="flex items-center justify-center gap-1.5 rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-3 py-1.5 text-xs font-semibold text-cyan-300 hover:bg-cyan-500/20 transition-colors"
                >
                  <Code2 className="h-3.5 w-3.5" />
                  <span>Inspect Structured Interview (JSON)</span>
                </button>
              )}

              <div className="w-full sm:w-56 bg-zinc-950 p-2.5 rounded-lg border border-zinc-800">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold text-zinc-300">Strategy Sufficiency</span>
                  <span className="font-bold text-amber-400">
                    {interviewState.sufficiencyScore}%
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-zinc-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 transition-all duration-500 rounded-full"
                    style={{ width: `${interviewState.sufficiencyScore}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Chat transcript */}
          <div className="space-y-4">
            {interviewState.conversation.map((msg) => (
              <div
                key={msg.id}
                className={`rounded-2xl p-4 sm:p-6 transition-all ${
                  msg.role === 'assistant'
                    ? 'border border-zinc-800 bg-zinc-900/70 text-zinc-100 shadow-md'
                    : 'border border-amber-500/20 bg-amber-500/5 text-amber-100 ml-4 sm:ml-12'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                        msg.role === 'assistant'
                          ? 'bg-zinc-800 text-zinc-300 border border-zinc-700'
                          : 'bg-amber-400 text-zinc-950'
                      }`}
                    >
                      {msg.role === 'assistant' ? 'BrandForge Strategist' : 'Founder'}
                    </span>
                  </div>
                  <span className="text-[10px] text-zinc-500 font-mono">
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                <p className="text-sm sm:text-base leading-relaxed whitespace-pre-line">
                  {msg.content}
                </p>

                {/* Why This Question Matters Callout */}
                {msg.whyThisMatters && (
                  <div className="mt-4 rounded-xl border border-cyan-500/30 bg-cyan-500/10 p-3 sm:p-4 text-xs">
                    <div className="flex items-center gap-2 text-cyan-300 font-bold mb-1">
                      <HelpCircle className="h-3.5 w-3.5 text-cyan-400" />
                      <span>WHY THIS QUESTION MATTERS TO BRAND POSITIONING:</span>
                    </div>
                    <p className="text-cyan-100/90 leading-normal">
                      {msg.whyThisMatters}
                    </p>
                  </div>
                )}
              </div>
            ))}

            {isProcessing && (
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4 flex items-center gap-3 text-zinc-400 text-sm">
                <Loader2 className="h-4 w-4 animate-spin text-amber-400" />
                <span>Interviewer is analyzing gaps in your positioning...</span>
              </div>
            )}
          </div>

          {/* Extracted Facts & Assumptions Drawer */}
          {(interviewState.extractedFacts.length > 0 || interviewState.extractedAssumptions.length > 0) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-xl border border-zinc-800 bg-zinc-950/70">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 mb-2">
                  <CheckCircle className="h-3.5 w-3.5" />
                  <span>VERIFIED FOUNDER FACTS:</span>
                </div>
                <ul className="space-y-1">
                  {interviewState.extractedFacts.map((fact, idx) => (
                    <li key={idx} className="text-[11px] text-zinc-300 flex items-start gap-1.5">
                      <span className="text-emerald-500 shrink-0">•</span>
                      <span>{fact}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 mb-2">
                  <ShieldAlert className="h-3.5 w-3.5" />
                  <span>UNVALIDATED ASSUMPTIONS:</span>
                </div>
                <ul className="space-y-1">
                  {interviewState.extractedAssumptions.map((assump, idx) => (
                    <li key={idx} className="text-[11px] text-zinc-300 flex items-start gap-1.5">
                      <span className="text-amber-500 shrink-0">•</span>
                      <span>{assump}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Answer Form or Final Run CTA */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4 sm:p-5">
            {interviewState.sufficiencyScore < 100 && (
              <form onSubmit={handleAnswer} className="space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300">
                  Your Answer
                </label>
                <textarea
                  rows={3}
                  value={answerInput}
                  onChange={(e) => setAnswerInput(e.target.value)}
                  placeholder="Type your response here to give the agents sharper positioning context..."
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400 font-mono"
                />

                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
                  <span className="text-xs text-zinc-400">
                    Be specific: mention actual roles, alternative tools, and emotions.
                  </span>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      type="submit"
                      disabled={!answerInput.trim() || isProcessing}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-400 px-5 py-2.5 text-xs font-bold text-zinc-950 hover:bg-amber-300 transition-colors disabled:opacity-50 cursor-pointer w-full sm:w-auto"
                    >
                      <Send className="h-3.5 w-3.5" />
                      <span>Submit Response</span>
                    </button>
                  </div>
                </div>
              </form>
            )}

            {/* Launch Pipeline Bar */}
            <div className="mt-4 pt-4 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs text-zinc-400">
                {interviewState.sufficiencyScore >= 65 ? (
                  <span className="text-emerald-400 font-semibold">
                    ✓ High sufficiency achieved ({interviewState.sufficiencyScore}%). You can run the multi-agent pipeline now.
                  </span>
                ) : (
                  <span>
                    Answer 1–2 questions, or jump straight to multi-agent reasoning.
                  </span>
                )}
              </div>

              <button
                onClick={onExecuteWorkflow}
                disabled={isProcessing}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-3 text-xs sm:text-sm font-extrabold text-zinc-950 hover:from-orange-400 hover:to-amber-400 transition-all shadow-lg shadow-orange-500/20 disabled:opacity-50 cursor-pointer"
              >
                <Sparkles className="h-4 w-4" />
                <span>Run 7-Stage Multi-Agent Workflow</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
