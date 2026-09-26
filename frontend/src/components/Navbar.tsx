import React from 'react';
import {
  Sparkles,
  Flame,
  FileCode2,
  PlayCircle,
  RotateCcw,
  ShieldCheck,
  ChevronDown,
} from 'lucide-react';
import { DEMO_PRESETS, DemoPreset } from '../data/demoPresets';

interface NavbarProps {
  onOpenBlueprint: () => void;
  onOpenDemoTour: () => void;
  onSelectPreset: (preset: DemoPreset) => void;
  onResetProject: () => void;
  hasActiveProject: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBlueprint,
  onOpenDemoTour,
  onSelectPreset,
  onResetProject,
  hasActiveProject,
}) => {
  const [presetDropdownOpen, setPresetDropdownOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-500 via-orange-600 to-amber-400 p-0.5 shadow-lg shadow-orange-500/20">
            <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-zinc-950">
              <Flame className="h-5 w-5 text-amber-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold tracking-tight text-white text-lg">
                BRAND<span className="text-amber-400">FORGE</span>
              </span>
              <span className="rounded-md bg-amber-400/10 px-1.5 py-0.5 text-[10px] font-semibold tracking-wide text-amber-300 ring-1 ring-amber-400/30">
                MULTI-AGENT v2
              </span>
            </div>
            <p className="text-[11px] text-zinc-400">
              Raw Idea ➔ Battle-Tested Brand Intelligence
            </p>
          </div>
        </div>

        {/* Center / Action presets */}
        <div className="hidden md:flex items-center gap-2">
          {/* Preset selector */}
          <div className="relative">
            <button
              onClick={() => setPresetDropdownOpen(!presetDropdownOpen)}
              className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/80 px-3 py-1.5 text-xs font-medium text-zinc-300 hover:border-zinc-700 hover:bg-zinc-800 hover:text-white transition-colors"
            >
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              <span>Load Preset Idea</span>
              <ChevronDown className="h-3 w-3 text-zinc-400" />
            </button>

            {presetDropdownOpen && (
              <div className="absolute left-0 mt-2 w-72 rounded-xl border border-zinc-800 bg-zinc-900 p-1.5 shadow-2xl z-50">
                <div className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                  Curated Founder Ideas
                </div>
                {DEMO_PRESETS.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      onSelectPreset(p);
                      setPresetDropdownOpen(false);
                    }}
                    className="w-full text-left rounded-lg px-2.5 py-2 hover:bg-zinc-800 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-zinc-200">
                        {p.name}
                      </span>
                      <span className="rounded bg-zinc-800 px-1.5 py-0.5 text-[9px] text-amber-400 border border-zinc-700">
                        {p.badge}
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-400 line-clamp-1 mt-0.5">
                      {p.rawIdea}
                    </p>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick Demo Tour button */}
          <button
            onClick={onOpenDemoTour}
            className="flex items-center gap-1.5 rounded-lg border border-orange-500/30 bg-orange-500/10 px-3 py-1.5 text-xs font-semibold text-orange-300 hover:bg-orange-500/20 transition-colors"
          >
            <PlayCircle className="h-3.5 w-3.5 text-orange-400" />
            <span>3-Min Judge Demo</span>
          </button>
        </div>

        {/* Right tools */}
        <div className="flex items-center gap-2">
          {/* Blueprint button */}
          <button
            onClick={onOpenBlueprint}
            className="flex items-center gap-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 px-3 py-1.5 text-xs font-semibold text-zinc-100 border border-zinc-700 shadow-sm transition-all"
          >
            <FileCode2 className="h-3.5 w-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Devin AI Blueprint</span>
            <span className="rounded bg-cyan-500/20 px-1 py-0.2 text-[9px] text-cyan-300 border border-cyan-500/30">
              20 Specs
            </span>
          </button>

          {/* Reset button */}
          {hasActiveProject && (
            <button
              onClick={onResetProject}
              title="Reset Project"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200 transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
          )}

          {/* Live indicator */}
          <div className="hidden lg:flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-2.5 py-1 text-[11px] font-medium text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <ShieldCheck className="h-3 w-3" />
            <span>9 Reasoning Roles</span>
          </div>
        </div>
      </div>
    </header>
  );
};
