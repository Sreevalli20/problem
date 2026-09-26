import React, { useState } from 'react';
import {
  Sparkles,
  Copy,
  Check,
  Globe,
  Share2,
  Mic,
  BookOpen,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { LaunchKitOutput } from '../types/brandforge';
import type { LaunchKitOutput as BackendLaunchKitOutput } from '../types';

interface LaunchKitViewProps {
  launchKit: BackendLaunchKitOutput;
}

export const LaunchKitView: React.FC<LaunchKitViewProps> = ({ launchKit }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Transform backend LaunchKitOutput to UI-expected format
  const transformedLaunchKit: LaunchKitOutput = {
    landingPage: {
      headline: launchKit.landing_page_headline,
      subheadline: launchKit.landing_page_subheadline,
      primaryCta: launchKit.cta,
      secondaryCta: 'Learn More',
      problemSection: launchKit.about_section,
      solutionSection: launchKit.product_description,
      aboutSection: launchKit.about_section,
      productDescriptionShort: launchKit.product_description,
    },
    socialContent: {
      linkedInLaunchPost: launchKit.linkedin_launch_post,
      twitterXThread: launchKit.linkedin_launch_post.split('\n').slice(0, 5),
      instagramCaption: launchKit.instagram_caption,
    },
    pitches: {
      shortFounderPitch: launchKit.founder_pitch,
      elevatorPitch: launchKit.elevator_pitch,
      investorOneLiner: launchKit.landing_page_headline,
    },
    brandVoiceGuide: {
      voicePrinciples: launchKit.brand_voice_examples,
      doSay: launchKit.do_messaging,
      dontSay: launchKit.dont_messaging,
      exampleSentences: [],
    },
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="mx-auto max-w-6xl py-6 px-4 sm:px-6 space-y-8">
      {/* Header */}
      <div className="rounded-2xl border border-zinc-800 bg-gradient-to-r from-zinc-900 via-zinc-950 to-zinc-950 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-400 mb-2">
            <Sparkles className="h-3.5 w-3.5" />
            <span>DEPLOYMENT-READY ASSETS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Founder Launch Kit & Collateral
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-2xl leading-relaxed">
            Every asset is generated directly from your battle-tested brand intelligence report. Zero fluff, fully copyable.
          </p>
        </div>

        <button
          onClick={() => {
            const all = `BRAND LAUNCH KIT
HEADLINE: ${transformedLaunchKit.landingPage.headline}
SUBHEAD: ${transformedLaunchKit.landingPage.subheadline}
CTA: ${transformedLaunchKit.landingPage.primaryCta}
PITCH: ${transformedLaunchKit.pitches.elevatorPitch}
LINKEDIN:
${transformedLaunchKit.socialContent.linkedInLaunchPost}`;
            handleCopy(all, 'ALL_KIT');
          }}
          className="flex items-center gap-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 px-5 py-2.5 text-xs font-black text-zinc-950 transition-colors shadow-lg shadow-amber-400/20 shrink-0"
        >
          {copiedKey === 'ALL_KIT' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          <span>{copiedKey === 'ALL_KIT' ? 'Copied Full Kit' : 'Copy Entire Launch Kit'}</span>
        </button>
      </div>

      {/* 1. Landing Page Section */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Globe className="h-4 w-4 text-cyan-400" />
            <span>1. High-Conversion Landing Page Copy</span>
          </h3>
          <span className="text-xs text-zinc-400 font-mono">Hero & Core Sections</span>
        </div>

        {/* Hero Preview Box */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8 space-y-4 text-center max-w-3xl mx-auto shadow-inner relative">
          <span className="rounded-full bg-amber-500/10 border border-amber-500/30 px-3 py-1 text-[11px] font-bold text-amber-400 uppercase tracking-wider">
            Hero Viewport
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight mt-2">
            {transformedLaunchKit.landingPage.headline}
          </h1>
          <p className="text-sm sm:text-base text-zinc-300 max-w-2xl mx-auto leading-relaxed">
            {transformedLaunchKit.landingPage.subheadline}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button className="rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-3 text-xs font-bold text-zinc-950 shadow-lg shadow-orange-500/20">
              {transformedLaunchKit.landingPage.primaryCta}
            </button>
            <button className="rounded-xl border border-zinc-700 bg-zinc-850 px-5 py-3 text-xs font-bold text-zinc-200">
              {transformedLaunchKit.landingPage.secondaryCta}
            </button>
          </div>

          <div className="absolute top-4 right-4">
            <button
              onClick={() => handleCopy(`${transformedLaunchKit.landingPage.headline}\n${transformedLaunchKit.landingPage.subheadline}\nCTA: ${transformedLaunchKit.landingPage.primaryCta}`, 'HERO')}
              className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
              title="Copy Hero Copy"
            >
              {copiedKey === 'HERO' ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
            </button>
          </div>
        </div>

        {/* Problem & Solution copy */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5 space-y-2 relative">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase text-red-400">Problem Section Copy</span>
              <button
                onClick={() => handleCopy(transformedLaunchKit.landingPage.problemSection, 'PROBLEM')}
                className="text-zinc-500 hover:text-zinc-300"
              >
                {copiedKey === 'PROBLEM' ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              </button>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed font-sans">
              {transformedLaunchKit.landingPage.problemSection}
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5 space-y-2 relative">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase text-emerald-400">Solution Section Copy</span>
              <button
                onClick={() => handleCopy(transformedLaunchKit.landingPage.solutionSection, 'SOLUTION')}
                className="text-zinc-500 hover:text-zinc-300"
              >
                {copiedKey === 'SOLUTION' ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              </button>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed font-sans">
              {transformedLaunchKit.landingPage.solutionSection}
            </p>
          </div>
        </div>
      </div>

      {/* 2. Social Launch Posts */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Share2 className="h-4 w-4 text-blue-400" />
            <span>2. Viral Launch Social Distribution</span>
          </h3>
          <span className="text-xs text-zinc-400 font-mono">LinkedIn, X / Twitter & Instagram</span>
        </div>

        {/* LinkedIn Post */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5 space-y-3 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="rounded bg-blue-500/20 text-blue-400 border border-blue-500/30 px-2 py-0.5 text-xs font-bold">
                LinkedIn Launch Post
              </span>
            </div>
            <button
              onClick={() => handleCopy(transformedLaunchKit.socialContent.linkedInLaunchPost, 'LINKEDIN')}
              className="flex items-center gap-1 text-xs text-zinc-400 hover:text-white bg-zinc-800 px-3 py-1.5 rounded-lg border border-zinc-700 transition-colors"
            >
              {copiedKey === 'LINKEDIN' ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
              <span>{copiedKey === 'LINKEDIN' ? 'Copied' : 'Copy Post'}</span>
            </button>
          </div>
          <p className="text-xs text-zinc-200 whitespace-pre-line font-sans leading-relaxed">
            {transformedLaunchKit.socialContent.linkedInLaunchPost}
          </p>
        </div>

        {/* Twitter Thread & Instagram */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase text-zinc-300">Twitter / X Launch Thread</span>
              <button
                onClick={() => handleCopy(transformedLaunchKit.socialContent.twitterXThread.join('\n\n'), 'TWITTER')}
                className="text-zinc-500 hover:text-zinc-300"
              >
                {copiedKey === 'TWITTER' ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              </button>
            </div>
            <div className="space-y-2">
              {transformedLaunchKit.socialContent.twitterXThread.map((tweet, i) => (
                <div key={i} className="text-xs text-zinc-300 p-2.5 rounded-lg bg-zinc-900 border border-zinc-800/80">
                  {tweet}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase text-zinc-300">Instagram / Reels Caption</span>
              <button
                onClick={() => handleCopy(transformedLaunchKit.socialContent.instagramCaption, 'INSTA')}
                className="text-zinc-500 hover:text-zinc-300"
              >
                {copiedKey === 'INSTA' ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              </button>
            </div>
            <p className="text-xs text-zinc-300 p-3 rounded-lg bg-zinc-900 border border-zinc-800/80 leading-relaxed">
              {transformedLaunchKit.socialContent.instagramCaption}
            </p>
          </div>
        </div>
      </div>

      {/* 3. Founder Pitches */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Mic className="h-4 w-4 text-amber-400" />
            <span>3. Verbal Elevator Pitches & Soundbites</span>
          </h3>
          <span className="text-xs text-zinc-400 font-mono">10s, 30s & Investor</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 uppercase">10-Second Elevator Pitch</span>
              <button
                onClick={() => handleCopy(transformedLaunchKit.pitches.elevatorPitch, 'PITCH10')}
                className="text-zinc-500 hover:text-zinc-300"
              >
                {copiedKey === 'PITCH10' ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              </button>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed font-sans italic">
              "{transformedLaunchKit.pitches.elevatorPitch}"
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-cyan-400 uppercase">30-Second Founder Pitch</span>
              <button
                onClick={() => handleCopy(transformedLaunchKit.pitches.shortFounderPitch, 'PITCH30')}
                className="text-zinc-500 hover:text-zinc-300"
              >
                {copiedKey === 'PITCH30' ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              </button>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed font-sans italic">
              "{transformedLaunchKit.pitches.shortFounderPitch}"
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-purple-400 uppercase">Investor One-Liner</span>
              <button
                onClick={() => handleCopy(transformedLaunchKit.pitches.investorOneLiner, 'INVESTOR')}
                className="text-zinc-500 hover:text-zinc-300"
              >
                {copiedKey === 'INVESTOR' ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              </button>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed font-sans italic">
              "{transformedLaunchKit.pitches.investorOneLiner}"
            </p>
          </div>
        </div>
      </div>

      {/* 4. Brand Voice Do / Don't Matrix */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-emerald-400" />
            <span>4. Brand Voice Do / Don't Guide</span>
          </h3>
          <span className="text-xs text-zinc-400 font-mono">Tonal Guardrails</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
            <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">DO SAY:</h4>
            <div className="flex flex-wrap gap-1.5">
              {transformedLaunchKit.brandVoiceGuide.doSay.map((item, i) => (
                <span key={i} className="rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 px-2 py-1 text-xs font-medium">
                  ✓ {item}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4">
            <h4 className="text-xs font-bold text-red-400 uppercase tracking-wider mb-2">DO NOT SAY:</h4>
            <div className="flex flex-wrap gap-1.5">
              {transformedLaunchKit.brandVoiceGuide.dontSay.map((item, i) => (
                <span key={i} className="rounded bg-red-500/10 text-red-400 border border-red-500/30 px-2 py-1 text-xs font-medium line-through">
                  ✗ {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Real Context Examples */}
        <div className="space-y-3 pt-2">
          <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
            Contextual Sentence Transformations
          </h4>
          {transformedLaunchKit.brandVoiceGuide.exampleSentences.length > 0 ? (
            transformedLaunchKit.brandVoiceGuide.exampleSentences.map((ex, i) => (
              <div key={i} className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 space-y-2">
                <span className="text-[11px] font-bold uppercase text-zinc-400 tracking-wider">
                  Context: {ex.context}
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                  <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/30 p-2.5 text-xs text-emerald-200">
                    <strong className="text-emerald-400 block mb-0.5">✓ Say This:</strong>
                    "{ex.sayThis}"
                  </div>
                  <div className="rounded-lg bg-red-500/10 border border-red-500/30 p-2.5 text-xs text-red-300">
                    <strong className="text-red-400 block mb-0.5">✗ Not This:</strong>
                    "{ex.notThis}"
                  </div>
                </div>
                <p className="text-[11px] text-zinc-400 italic pt-0.5">
                  Why: {ex.why}
                </p>
              </div>
            ))
          ) : (
            <div className="text-xs text-zinc-500 italic">No contextual examples available</div>
          )}
        </div>
      </div>
    </div>
  );
};
