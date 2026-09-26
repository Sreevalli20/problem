import React, { useState } from 'react';
import {
  X,
  FileCode2,
  Copy,
  Check,
  Download,
  Search,
  ExternalLink,
  Terminal,
  Server,
  Layers,
  Sparkles,
} from 'lucide-react';
import { DEVIN_BLUEPRINT_SECTIONS, BlueprintSection } from '../data/devinBlueprint';

interface DevinBlueprintModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DevinBlueprintModal: React.FC<DevinBlueprintModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedSectionId, setSelectedSectionId] = useState<string>(DEVIN_BLUEPRINT_SECTIONS[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copiedSection, setCopiedSection] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  if (!isOpen) return null;

  const categories = ['All', 'Architecture', 'Agents & AI', 'API & Backend', 'Frontend', 'Deployment & Demo'];

  const filteredSections = DEVIN_BLUEPRINT_SECTIONS.filter((sec) => {
    const matchesCategory = selectedCategory === 'All' || sec.category === selectedCategory;
    const matchesSearch =
      sec.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sec.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const activeSection =
    DEVIN_BLUEPRINT_SECTIONS.find((s) => s.id === selectedSectionId) || DEVIN_BLUEPRINT_SECTIONS[0];

  const handleCopySection = () => {
    navigator.clipboard.writeText(activeSection.content);
    setCopiedSection(true);
    setTimeout(() => setCopiedSection(false), 2000);
  };

  const handleDownloadFullBlueprint = () => {
    const header = `# BRANDFORGE AI - COMPLETE DEVIN AI IMPLEMENTATION BLUEPRINT\n*Specification for Python 3.14.6 + FastAPI + React + Vite + TypeScript*\n\n`;
    const fullMarkdown =
      header +
      DEVIN_BLUEPRINT_SECTIONS.map((sec) => `## ${sec.number}. ${sec.title}\n\n${sec.content}\n\n---\n`).join('\n');

    const blob = new Blob([fullMarkdown], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'BRANDFORGE_AI_DEVIN_BLUEPRINT.md';
    link.click();
    URL.revokeObjectURL(url);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md">
      <div className="flex h-[90vh] w-full max-w-6xl flex-col rounded-3xl border border-zinc-800 bg-zinc-950 shadow-2xl overflow-hidden">
        {/* Modal Top Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900/90 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/20 border border-cyan-500/30 text-cyan-400">
              <FileCode2 className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white">
                  Devin AI Implementation Blueprint
                </h2>
                <span className="rounded bg-cyan-500/20 px-1.5 py-0.5 text-[10px] font-mono font-bold text-cyan-300 border border-cyan-500/40">
                  20 SPEC SECTIONS
                </span>
              </div>
              <p className="text-xs text-zinc-400">
                Ready-to-execute Python 3.14.6 + FastAPI + Google GenAI architecture
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadFullBlueprint}
              className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 px-3.5 py-2 text-xs font-bold text-zinc-950 transition-all shadow-md"
            >
              {downloaded ? <Check className="h-3.5 w-3.5" /> : <Download className="h-3.5 w-3.5" />}
              <span>{downloaded ? 'Downloaded .md' : 'Download Full .md'}</span>
            </button>

            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Modal Body: Sidebar & Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className="w-80 border-r border-zinc-800 bg-zinc-900/40 flex flex-col">
            {/* Search */}
            <div className="p-3 border-b border-zinc-800">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-zinc-500" />
                <input
                  type="text"
                  placeholder="Filter 20 sections..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-lg border border-zinc-800 bg-zinc-950 pl-8 pr-3 py-1.5 text-xs text-zinc-200 placeholder:text-zinc-500 focus:border-cyan-400 focus:outline-none"
                />
              </div>

              {/* Category pills */}
              <div className="flex flex-wrap gap-1 mt-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`rounded px-1.5 py-0.5 text-[9px] font-semibold transition-colors ${
                      selectedCategory === cat
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                        : 'text-zinc-500 hover:text-zinc-300'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Section Item List */}
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              {filteredSections.map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => setSelectedSectionId(sec.id)}
                  className={`w-full text-left rounded-xl px-3 py-2 text-xs transition-all flex items-center justify-between ${
                    selectedSectionId === sec.id
                      ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 font-bold'
                      : 'text-zinc-400 hover:bg-zinc-800/60 hover:text-zinc-200'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <span className="font-mono text-[10px] text-zinc-500 w-4">
                      {sec.number}.
                    </span>
                    <span className="truncate">{sec.title}</span>
                  </div>
                  <span className="text-[8px] uppercase tracking-wider text-zinc-600 rounded bg-zinc-900 px-1 py-0.2 shrink-0">
                    {sec.category}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col bg-zinc-950 overflow-hidden">
            {/* Active section header */}
            <div className="flex items-center justify-between border-b border-zinc-800/80 px-6 py-3 bg-zinc-900/30">
              <div>
                <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider">
                  Section {activeSection.number} of 20
                </span>
                <h3 className="text-base font-bold text-white">
                  {activeSection.title}
                </h3>
              </div>

              <button
                onClick={handleCopySection}
                className="flex items-center gap-1.5 rounded-lg border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 px-3 py-1.5 text-xs font-semibold text-zinc-200 transition-colors"
              >
                {copiedSection ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copiedSection ? 'Copied Section' : 'Copy Markdown'}</span>
              </button>
            </div>

            {/* Markdown Viewer */}
            <div className="flex-1 overflow-y-auto p-6 text-zinc-200 space-y-4 font-sans text-xs sm:text-sm leading-relaxed">
              <pre className="whitespace-pre-wrap font-mono text-xs text-zinc-300 bg-zinc-900/90 p-5 rounded-2xl border border-zinc-800 leading-relaxed overflow-x-auto">
                {activeSection.content}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
