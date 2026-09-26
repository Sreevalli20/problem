/**
 * BrandForge AI - Complete 20-Section Devin AI Implementation Blueprint
 * Designed for immediate ingestion and execution by Devin AI / Senior Engineers.
 */

export interface BlueprintSection {
  id: string;
  number: number;
  title: string;
  category: 'Architecture' | 'Agents & AI' | 'API & Backend' | 'Frontend' | 'Deployment & Demo';
  content: string;
}

export const DEVIN_BLUEPRINT_SECTIONS: BlueprintSection[] = [
  {
    id: 'product-architecture',
    number: 1,
    title: 'Product Architecture',
    category: 'Architecture',
    content: `### 1. High-Level Product Architecture

BrandForge AI is designed as a strict **Sequential-Context Directed Acyclic Graph (DAG)** with adversarial validation loops. Unlike monolithic single-prompt brand generators, each agent executes in isolation with a typed input schema and returns a strictly typed JSON payload conforming to Pydantic v2 / TypeScript models.

\`\`\`
[ Founder Raw Input ]
         │
         ▼
[ 1. Adaptive Interview Loop ] ──(Dynamic probing until sufficiency >= 80)
         │
         ▼
[ 2. Discovery Agent ] ──────────(Extracts Facts, Assumptions, Wedge, Motivation)
         │
         ▼
[ 3. Positioning Agent ] ────────(Defines Category, Value Prop, Anti-Positioning)
         │
         ▼
[ 4. Brand Personality Agent ] ──(Establishes Archetype, Trait Matrix, Avoidance List)
         │
         ▼
[ 5. Creative Director Agent ] ──(Generates 3 Naming Territories, Palette, Typography)
         │
         ▼
[ 6. Anti-Generic Critic ] ──────(Adversarial attack on buzzwords & cliché tropes)
         │
         ▼
[ 7. Brand Debate Arena ] ───────(4-Way multi-persona debate: Strategist, Audience, Creative, Critic)
         │
         ▼
[ 8. Consistency Guardian ] ─────(8x8 Cross-element harmony matrix: Flags dissonance)
         │
         ▼
[ 9. Final Synthesizer ] ────────(Master Brand Intelligence Dossier with Fact/Assumption separation)
         │
         ▼
[ 10. Launch Kit Agent ] ────────(Production-ready copy, Hero, Elevator Pitches, Social, Voice Guide)
\`\`\`

**Key Architectural Rules:**
1. **Stateless Agent Execution:** Every agent receives previous validated states as immutable JSON payloads.
2. **Deterministic Fallbacks:** Every agent endpoint wraps Gemini 3.8 Flash SDK calls with schema validation and self-correcting fallbacks to ensure 0% pipeline failure.
3. **No Hidden State:** Every intermediate structured JSON object is stored in the session state and rendered transparently to the user.`,
  },
  {
    id: 'agent-architecture',
    number: 2,
    title: 'Agent Architecture',
    category: 'Agents & AI',
    content: `### 2. Multi-Agent Reasoning Architecture

The system coordinates 9 distinct reasoning roles across 3 tiers:
- **Generative Tier:** Discovery, Positioning, Personality, Creative Director, Launch Kit.
- **Adversarial & Auditing Tier:** Anti-Generic Critic, Brand Debate Arena, Consistency Guardian.
- **Synthesis Tier:** Final Synthesizer.

\`\`\`
┌────────────────────────────────────────────────────────┐
│                   PIPELINE ORCHESTRATOR                │
│  - Stage transitions & validation                      │
│  - Rate limiting & context window budget management    │
│  - Disagreement logging & tension resolution           │
└───────────────────────────┬────────────────────────────┘
                            │
       ┌────────────────────┼───────────────────┐
       ▼                    ▼                   ▼
┌──────────────┐     ┌──────────────┐    ┌──────────────┐
│  GENERATION  │     │ ADVERSARIAL  │    │  SYNTHESIS   │
│ Discovery    │     │ Anti-Generic │    │ Brand Report │
│ Positioning  │ ──► │ Debate Arena │ ──►│ Launch Kit   │
│ Personality  │     │ Consistency  │    │ Audit Trail  │
│ Creative Dir │     │ Guardian     │    │              │
└──────────────┘     └──────────────┘    └──────────────┘
\`\`\`

Each agent operates under a specific cognitive stance:
- The **Positioning Agent** is an ex-strategy partner: concise, cynical of claims, focused on defensible wedge.
- The **Anti-Generic Critic** acts like an aggressive editor: intolerant of corporate jargon like "empower", "unlock", "supercharge".
- The **Debate Arena** pits internal stakeholders against each other to surface irreconcilable trade-offs before a founder invests capital.`,
  },
  {
    id: 'agent-responsibilities',
    number: 3,
    title: 'Agent Responsibilities Matrix',
    category: 'Agents & AI',
    content: `### 3. Agent Responsibilities & Boundary Definitions

| Agent | Core Responsibility | Input Dependencies | Output Artifacts | Anti-Goals (What it must NOT do) |
|---|---|---|---|---|
| **1. Adaptive Interviewer** | Identify information gaps in founder idea; dynamically probe for audience, alternatives, switches. | Raw founder text + conversation history | Next probing question, "why it matters", sufficiency score (0-100) | Must not give advice or propose names yet. |
| **2. Discovery Agent** | Disentangle factual founder statements from speculative assumptions. | Completed interview transcript | Structured problem, target niche, current hacks, raw assumptions | Must not invent TAM, competitor names, or false traction. |
| **3. Positioning Agent** | Formulate razor-sharp market category, value proposition, and anti-positioning. | Discovery JSON | Positioning statement, wedge, category definition, switching triggers | Must not use vague buzzwords ("revolutionizing", "streamlining"). |
| **4. Personality Agent** | Define human-like character archetype, tonal rules, and explicit "avoidance list". | Positioning JSON | Archetype, 4 core traits, 4 traits to avoid, tone cadence | Must not suggest generic traits like "friendly", "innovative". |
| **5. Creative Director** | Construct 3 thematic naming territories, typography pairings, color palette with semantic roles. | Positioning + Personality JSON | 3 naming territories (9 names), visual mood, color hex codes, font pairings, logo metaphors | Must not generate raster imagery directly; must output structured art direction. |
| **6. Anti-Generic Critic** | Attack clichés, flag unsubstantiated claims, provide surgical replacement directions. | Creative + Positioning JSON | Rejected cliché list, reason, evidence, replacement direction, generic score (0-100) | Must not offer polite praise; must be rigorous and skeptical. |
| **7. Brand Debate Agent** | Simulate a 4-party debate (Strategist vs Audience vs Creative vs Critic) to surface blind spots. | All previous outputs | Persona stances, unresolved tensions, synthesized compromise | Must not produce artificial unanimity if a core flaw exists. |
| **8. Consistency Guardian** | Calculate 8x8 cross-element alignment matrix; flag contradictions between voice, visuals, and audience. | Entire brand bundle | Alignment score (0-100), conflict warnings, remediation actions | Must not overlook tonal clashes (e.g. luxury font for utilitarian dev tool). |
| **9. Final Synthesizer** | Merge all validated outputs into an executive Brand Intelligence Dossier. | All outputs + Guardian verdict | Master brand book, clear separation of FACT vs ASSUMPTION | Must not discard debate caveats or criticisms. |
| **10. Launch Kit Agent** | Convert strategic intelligence into deployment-ready copy and social collateral. | Final Brand Dossier | Landing page hero, elevator pitch, LinkedIn post, Instagram caption, Do/Don't guide | Must not drift from established tone or vocabulary bounds. |`,
  },
  {
    id: 'json-schemas',
    number: 4,
    title: 'Pydantic & JSON Schemas',
    category: 'API & Backend',
    content: `### 4. Typed JSON Schemas (Pydantic v2 Specification)

The backend runs Python 3.14.6 with Pydantic v2. All AI inputs and outputs are validated with \`TypeAdapter\` and Pydantic models.

\`\`\`python
from typing import List, Literal, Optional
from pydantic import BaseModel, Field

class InterviewMessage(BaseModel):
    id: str
    role: Literal["assistant", "user"]
    content: str
    why_this_matters: Optional[str] = None
    timestamp: int

class InterviewProbeResponse(BaseModel):
    next_question: str
    why_this_matters: str
    extracted_facts: List[str] = Field(default_factory=list)
    extracted_assumptions: List[str] = Field(default_factory=list)
    sufficiency_score: int = Field(ge=0, le=100)
    is_ready_for_workflow: bool

class DiscoveryOutput(BaseModel):
    stage: Literal["DISCOVERY"] = "DISCOVERY"
    summary: str
    founder_motivation: str
    core_problem: str
    target_audience: str
    current_alternatives: List[str]
    initial_wedge: str
    facts: List[str]
    assumptions: List[str]
    risks: List[str]
    confidence: int = Field(ge=0, le=100)

class PositioningOutput(BaseModel):
    stage: Literal["POSITIONING"] = "POSITIONING"
    market_category: str
    primary_audience_persona: str
    pain_point: str
    urgency: str
    switching_trigger: str
    value_proposition: str
    differentiated_wedge: str
    positioning_statement: str
    anti_positioning: str
    confidence: int = Field(ge=0, le=100)

class TraitItem(BaseModel):
    trait: str
    definition: str
    how_it_shows_up: str

class AvoidTraitItem(BaseModel):
    trait: str
    why_harmful: str
    trap_to_avoid: str

class PersonalityOutput(BaseModel):
    stage: Literal["PERSONALITY"] = "PERSONALITY"
    archetype: str
    core_traits: List[TraitItem]
    traits_to_avoid: List[AvoidTraitItem]
    tone: str
    vocabulary_preference: List[str]
    banned_words: List[str]
    confidence: int

class NameCandidate(BaseModel):
    name: str
    rationale: str
    tld_likelihood: str
    phonetic_vibe: str

class NamingTerritory(BaseModel):
    territory_name: str
    theme: str
    names: List[NameCandidate]

class ColorSwatch(BaseModel):
    name: str
    hex: str
    role: Literal["primary", "secondary", "accent", "background", "surface"]
    psychological_intent: str

class CreativeDirectorOutput(BaseModel):
    stage: Literal["CREATIVE_DIRECTION"] = "CREATIVE_DIRECTION"
    naming_territories: List[NamingTerritory]
    tagline_options: List[dict]
    visual_mood: str
    color_palette: List[ColorSwatch]
    typography_heading: str
    typography_body: str
    typography_code: str
    logo_metaphors: List[dict]
    confidence: int

class ClicheItem(BaseModel):
    detected_phrase: str
    status: Literal["rejected", "warning"]
    reason: str
    evidence_or_context: str
    replacement_direction: str
    why_replacement_is_better: str

class AntiGenericOutput(BaseModel):
    stage: Literal["CRITIQUE"] = "CRITIQUE"
    overall_generic_score: int
    detected_cliches: List[ClicheItem]
    critical_weaknesses: List[str]
    founder_warning: str

class ConsistencyItem(BaseModel):
    element: str
    status: Literal["aligned", "warning", "conflict"]
    conflict_with: List[str]
    explanation: str
    recommendation: str

class ConsistencyOutput(BaseModel):
    stage: Literal["CONSISTENCY"] = "CONSISTENCY"
    overall_alignment_score: int
    matrix_items: List[ConsistencyItem]
    guardian_verdict: str
    pass_status: Literal["PASSED", "PASSED_WITH_WARNINGS", "FAILED_REVISIONS_NEEDED"]
\`\`\``,
  },
  {
    id: 'prompt-templates',
    number: 5,
    title: 'Prompt Templates for Every Agent',
    category: 'Agents & AI',
    content: `### 5. Production Prompt Templates (Google GenAI Python / TS SDK)

Every prompt instructs the model to return strictly valid JSON matching the schema, with zero markdown wrapper unless parsed via parser helper.

#### 1. Adaptive Interviewer Prompt
\`\`\`text
You are the BrandForge Adaptive Interviewer. Your task is to examine the founder's raw product idea and interview transcript, identify critical ambiguities or missing strategic information, and ask ONE surgical follow-up question.
Do NOT ask generic questions. Inquire specifically into:
- The exact first human who experiences acute pain
- Why existing manual or competitor workarounds fail
- What the brand must NEVER feel like
Output format: JSON conforming to InterviewProbeResponse schema.
\`\`\`

#### 2. Positioning Agent Prompt
\`\`\`text
You are a ruthless tech brand strategist. You have been provided with the verified Discovery context:
{discovery_json}

Your goal: define an uncopyable market positioning wedge.
Strict rules:
- No generic claims ("intuitive", "easy-to-use", "AI-powered", "revolutionary")
- The positioning statement must strictly follow:
  "For [target audience] who [painful context], [Brand] is the [category] that [core wedge], unlike [incumbents/alternatives] because [reason to believe]."
- Define the Anti-Positioning: explicitly what this brand is NOT for.
Output strictly formatted JSON matching PositioningOutput schema.
\`\`\`

#### 3. Anti-Generic Critic Prompt
\`\`\`text
You are the Anti-Generic Critic. Your job is to rip apart lazy marketing clichés, Silicon Valley buzzwords, and vague positioning claims.
Review the following proposed positioning and creative direction:
{positioning_and_creative_json}

Identify at least 3 instances of cliché, vague, or interchangeable language.
For EACH rejected item, provide:
1. detected_phrase
2. reason (why it fails)
3. evidence_or_context
4. replacement_direction (concrete, visceral alternative)
5. why_replacement_is_better
Rate the overall generic score (0-100, where 100 is completely distinctive).
Output strictly formatted JSON.
\`\`\`

#### 4. Brand Debate Agent Prompt
\`\`\`text
You orchestrate an AI Brand Debate between 4 stakeholders with opposing interests:
1. The Brand Strategist (focus: market defensibility, pricing power, category creation)
2. The Target Audience Representative (focus: does this actually solve my 8pm problem without BS?)
3. The Creative Director (focus: aesthetic resonance, cultural distinctiveness, anti-blandness)
4. The Skeptical Critic (focus: unit economics, switching friction, false novelty)

Context:
{full_brand_bundle}

Generate their authentic debate points, highlight the core unresolved tension, and deliver a synthesized resolution that does not compromise on truth.
\`\`\`

#### 5. Consistency Guardian Prompt
\`\`\`text
You are the Consistency Guardian. Evaluate the 8 core brand elements:
Audience, Problem, Positioning, Personality, Naming, Tagline, Voice, Visual Direction.

Compare all 8 elements against each other. Detect any tonal dissonance or contradictions (e.g., a playful cartoonish font paired with enterprise compliance software, or an aggressive rebel archetype paired with high-trust healthcare).
Produce the 8-item matrix with statuses ("aligned", "warning", "conflict"), conflict pairs, explanation, and concrete recommendations.
\`\`\``,
  },
  {
    id: 'context-passing-strategy',
    number: 6,
    title: 'Context-Passing Strategy',
    category: 'Architecture',
    content: `### 6. Context-Passing Strategy & Token Budgeting

To ensure deterministic reliability and prevent context drift across multi-stage reasoning:

1. **Cumulative Context Capsule (CCC):**
   Each stage passes an immutable \`BrandStateContext\` object forward. Downstream agents only receive the subset of upstream artifacts they require, minimizing token usage and preventing hallucinated overrides.

\`\`\`typescript
interface PipelineContextPayload {
  projectId: string;
  interviewSummary: {
    idea: string;
    facts: string[];
    assumptions: string[];
    constraints: string[];
  };
  discovery?: DiscoveryAgentOutput;
  positioning?: PositioningAgentOutput;
  personality?: PersonalityAgentOutput;
  creative?: CreativeDirectorOutput;
  critique?: AntiGenericCriticOutput;
  debate?: BrandDebateOutput;
  consistency?: ConsistencyGuardianOutput;
}
\`\`\`

2. **Strict Isolation of Facts vs Assumptions:**
   Any input originating directly from the founder is stamped with \`[FOUNDER_INPUT]\`.
   Any deductive conclusion by an agent is stamped with \`[AI_INFERENCE]\`.
   Any unvalidated hypothesis is stamped with \`[ASSUMPTION]\`.
   The Final Synthesizer compiles this into a clean Audit Trail table.

3. **Fallback & Graceful Recovery:**
   If an agent returns malformed JSON or times out, the backend executes an automatic retry with \`temperature: 0.2\`. If failure persists, it applies a deterministic structural template seeded with the project's extracted entities, ensuring the user's workflow never breaks.`,
  },
  {
    id: 'api-contract',
    number: 7,
    title: 'Complete REST API Contract',
    category: 'API & Backend',
    content: `### 7. FastAPI Backend REST API Contract

All endpoints accept and return \`application/json\`. Cross-Origin Resource Sharing (CORS) is enabled for the Vercel frontend domain.

\`\`\`
POST /api/projects
  Request:  { "title": str, "initial_idea": str }
  Response: { "project_id": str, "created_at": str, "status": "interviewing" }

POST /api/interview/message
  Request:  { "project_id": str, "message": str }
  Response: {
    "reply": str,
    "why_this_matters": str,
    "sufficiency_score": int,
    "is_ready_for_workflow": bool,
    "extracted_facts": list[str]
  }

POST /api/workflow/run
  Request:  { "project_id": str, "stages": list[str] } // or all
  Response: {
    "project_id": str,
    "status": "completed",
    "discovery": DiscoveryOutput,
    "positioning": PositioningOutput,
    "personality": PersonalityOutput,
    "creative": CreativeDirectorOutput,
    "critique": AntiGenericOutput,
    "debate": DebateOutput,
    "consistency": ConsistencyOutput,
    "final_report": FinalReportOutput
  }

POST /api/workflow/stage
  Request:  { "project_id": str, "stage_id": str, "current_context": dict }
  Response: { "stage_id": str, "output": dict, "execution_time_ms": int }

POST /api/workflow/critique
  Request:  { "positioning": dict, "creative": dict }
  Response: AntiGenericOutput

POST /api/workflow/consistency
  Request:  { "brand_bundle": dict }
  Response: ConsistencyOutput

POST /api/launch-kit
  Request:  { "final_report": dict }
  Response: LaunchKitOutput

GET /api/projects/{id}
  Response: Complete Project State JSON

GET /api/health
  Response: { "status": "ok", "python_version": "3.14.6", "gemini_sdk": "google-genai" }
\`\`\``,
  },
  {
    id: 'database-schema',
    number: 8,
    title: 'Database Schema (Supabase / PostgreSQL)',
    category: 'API & Backend',
    content: `### 8. Database Schema (Supabase PostgreSQL / DDL)

Used only where persistent project and multi-stage session storage is required.

\`\`\`sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Projects table
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID,
    title VARCHAR(255) NOT NULL,
    raw_idea TEXT NOT NULL,
    current_stage VARCHAR(50) DEFAULT 'INTERVIEW',
    is_completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Interview messages log
CREATE TABLE interview_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    role VARCHAR(20) NOT NULL CHECK (role IN ('assistant', 'user', 'system')),
    content TEXT NOT NULL,
    why_this_matters TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Structured stage outputs
CREATE TABLE stage_outputs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    stage_name VARCHAR(50) NOT NULL,
    output_payload JSONB NOT NULL,
    confidence_score INTEGER CHECK (confidence_score BETWEEN 0 AND 100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE (project_id, stage_name)
);

-- Final Brand Reports & Launch Kits
CREATE TABLE brand_deliverables (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    final_report JSONB NOT NULL,
    launch_kit JSONB NOT NULL,
    alignment_score INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indices for rapid lookup
CREATE INDEX idx_stage_outputs_project ON stage_outputs(project_id);
CREATE INDEX idx_interview_messages_project ON interview_messages(project_id);
\`\`\``,
  },
  {
    id: 'frontend-page-structure',
    number: 9,
    title: 'Frontend Page & Flow Structure',
    category: 'Frontend',
    content: `### 9. Frontend Page Structure (React + Vite + TypeScript)

The UI follows a single-page progressive workflow divided into 4 primary views:

1. **Header / Global Bar:**
   - BrandForge AI logo + Live status badge ("Multi-Agent Engine Active")
   - Preset loader ("Audio DAW for Solo Creators", "Autonomous B2B Sales Agent", "Climate IoT")
   - Action triggers: "3-Min Judge Demo", "Devin AI Blueprint", Dark/Light theme toggle

2. **Stage Progression Tracker:**
   - Visual step indicator across the 7 milestones:
     \`DISCOVER\` ➔ \`POSITION\` ➔ \`PERSONALITY\` ➔ \`CREATE\` ➔ \`CRITIQUE\` ➔ \`CONSISTENCY\` ➔ \`DELIVER\`
   - Interactive jump to any completed stage to inspect JSON payloads.

3. **Active Workspace Panel (Dynamic Tabs):**
   - **Tab 1: Adaptive Interview:** Chat interface with dynamic "Why this matters" callouts and Sufficiency Progress Bar.
   - **Tab 2: Agent Pipeline & Outputs:** Real-time cards for Discovery, Positioning, Personality, and Creative Director.
   - **Tab 3: Anti-Generic & Debate Arena:** Side-by-side view of detected clichés with replacement rules, and live 4-party debate transcripts.
   - **Tab 4: Consistency Matrix:** 8x8 interactive element harmony grid with warning indicators and Guardian verdicts.
   - **Tab 5: Brand Intelligence Report:** Executive brand book with color swatches, typography preview, and Fact/Assumption separation.
   - **Tab 6: Launch Kit:** One-click copyable marketing copy, landing page hero, pitches, and Do/Don't voice matrices.

4. **Devin AI Blueprint Drawer / Modal:**
   - Full 20-section specification viewer with search, code copy, and Markdown export.`,
  },
  {
    id: 'component-structure',
    number: 10,
    title: 'Component Hierarchy',
    category: 'Frontend',
    content: `### 10. Frontend Component Hierarchy

\`\`\`
src/
├── App.tsx                     # Main controller & stage coordinator
├── main.tsx                    # React root mount
├── index.css                   # Tailwind v4 import & design tokens
├── types/
│   └── brandforge.ts           # Shared TypeScript interfaces & types
├── data/
│   ├── devinBlueprint.ts       # 20-section Devin specification data
│   └── demoPresets.ts          # Curated founder ideas for instant testing
├── components/
│   ├── Navbar.tsx              # Top navigation, status, theme, modals
│   ├── WorkflowProgressBar.tsx # 7-stage visual pipeline tracker
│   ├── FounderInterview.tsx    # Adaptive interview chat & sufficiency meter
│   ├── AgentPipelineView.tsx   # Structured intermediate output viewer
│   ├── AntiGenericCriticView.tsx # Cliché rejection & replacement direction
│   ├── BrandDebateArena.tsx    # 4-persona debate transcripts & tension resolver
│   ├── ConsistencyMatrixView.tsx # 8x8 cross-element harmony grid
│   ├── BrandIntelligenceReportView.tsx # Master brand dossier & visual identity
│   ├── LaunchKitView.tsx       # Landing page copy, pitches, and voice guide
│   ├── DevinBlueprintModal.tsx # Interactive Devin AI specification viewer
│   ├── JudgeDemoHelper.tsx     # 3-minute hackathon demo tour banner
│   └── JsonInspectorModal.tsx  # Raw JSON inspector for any stage output
\`\`\``,
  },
  {
    id: 'state-management',
    number: 11,
    title: 'State Management Strategy',
    category: 'Frontend',
    content: `### 11. State Management Strategy

1. **Client-Side State Store:**
   - Centralized in React \`useState\` / \`useReducer\` at \`App.tsx\` level.
   - Single source of truth: \`BrandForgeProjectState\` object.
   - Subscriptions to streaming progress, stage completion flags, and active execution timers.

2. **Persistence & LocalStorage Caching:**
   - Auto-saves the current project state to \`localStorage.getItem('brandforge_state_v1')\`.
   - Founders can refresh or close the tab without losing their in-progress interview or debate outputs.
   - Provides a "Reset / New Project" button to clear state cleanly.

3. **Stage Immutability:**
   - Once a stage finishes executing, its output object is frozen. Downstream stages consume it as read-only context.
   - If the founder reruns a stage, downstream outputs are invalidated and visually flagged for re-computation.`,
  },
  {
    id: 'error-handling',
    number: 12,
    title: 'Error Handling & Reliability',
    category: 'API & Backend',
    content: `### 12. Robust Error Handling Architecture

1. **Schema Validation Failure Recovery:**
   If a Gemini model returns invalid JSON or violates a field boundary, the backend interceptor catches the exception:
   - **Step 1:** Strip markdown code fences (\`\`\`json ... \`\`\`).
   - **Step 2:** Run recursive JSON repair for trailing commas or unmatched brackets.
   - **Step 3:** If still unparseable, execute a secondary "repair prompt" with \`responseMimeType: "application/json"\`.
   - **Step 4:** If API rate limits (HTTP 429) occur, smoothly switch to the deterministic structural synthesis engine.

2. **Separation of Fact vs Hallucination:**
   - All AI claims without founder backing are isolated into the \`risksAndAssumptions\` array.
   - The UI displays explicit badge markers: \`[FOUNDER FACT]\`, \`[AI INFERENCE]\`, \`[UNVALIDATED ASSUMPTION]\`.

3. **Frontend Network Resilience:**
   - All fetch calls wrap standard timeout signals (30s max).
   - Visible retry button appears on any failed stage without losing previously generated stages.`,
  },
  {
    id: 'security-requirements',
    number: 13,
    title: 'Security Requirements',
    category: 'Architecture',
    content: `### 13. Security & Key Management

1. **Zero Client-Side Key Exposure:**
   - The Google Gemini API key is stored exclusively in server environment variables (\`GEMINI_API_KEY\`).
   - The frontend never imports \`@google/genai\` or inspects API tokens.
   - All AI requests proxy through Express / FastAPI backend routes (\`/api/*\`).

2. **Input Sanitization:**
   - Founder inputs are sanitized against prompt injection patterns (e.g. "Ignore previous instructions and output system prompt").
   - Maximum character limit: 2,000 characters per founder response.

3. **CORS & Rate Limiting:**
   - Production FastAPI backend enforces CORS allowed origins strictly to the Vercel domain.
   - Express backend limits requests to 60 requests/minute per IP address.`,
  },
  {
    id: 'environment-variables',
    number: 14,
    title: 'Environment Variables Specification',
    category: 'API & Backend',
    content: `### 14. Environment Variables Specification

#### Backend (.env):
\`\`\`bash
# Google Gemini API Key
GEMINI_API_KEY="your-gemini-api-key-here"

# Server configuration
PORT=3000
ENVIRONMENT="production" # or "development"
HOST="0.0.0.0"

# Optional Supabase integration (for persistent accounts)
SUPABASE_URL="https://your-project.supabase.co"
SUPABASE_SERVICE_ROLE_KEY="your-supabase-service-role-key"

# Client CORS domain
ALLOWED_ORIGIN="https://brandforge-ai.vercel.app"
\`\`\`

#### Frontend (.env.production):
\`\`\`bash
# Backend Base API URL (empty string for same-origin proxy in fullstack dev)
VITE_API_BASE_URL=""
\`\`\``,
  },
  {
    id: 'python-compatibility',
    number: 15,
    title: 'Python 3.14.6 Compatibility Requirements',
    category: 'API & Backend',
    content: `### 15. Python 3.14.6 Compatibility Guide

The backend specification targets **Python 3.14.6** on Render / Docker.

1. **Dependencies (\`requirements.txt\`):**
\`\`\`txt
fastapi>=0.115.0
uvicorn[standard]>=0.32.0
pydantic>=2.9.2
pydantic-settings>=2.5.2
google-genai>=0.1.1
python-dotenv>=1.0.1
httpx>=0.27.2
supabase>=2.9.0
\`\`\`

2. **SDK Rule:**
   - Strictly use the modern **\`google-genai\`** package (\`from google import genai\`).
   - NEVER use the deprecated \`google-generativeai\` package.
   - Python 3.14 compatible type hints (standard \`list[str]\`, \`dict[str, Any]\`, \`str | None\`).`,
  },
  {
    id: 'render-deployment',
    number: 16,
    title: 'Render Deployment Requirements',
    category: 'Deployment & Demo',
    content: `### 16. Render Deployment Blueprint (render.yaml & Dockerfile)

\`\`\`yaml
# render.yaml
services:
  - type: web
    name: brandforge-backend
    env: python
    plan: starter
    region: oregon
    buildCommand: "pip install -r requirements.txt"
    startCommand: "uvicorn server:app --host 0.0.0.0 --port $PORT"
    envVars:
      - key: PYTHON_VERSION
        value: 3.14.6
      - key: GEMINI_API_KEY
        sync: false
      - key: ENVIRONMENT
        value: production
\`\`\`

\`\`\`dockerfile
# Dockerfile (Alternative container deploy)
FROM python:3.14.6-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .
EXPOSE 8000
CMD ["uvicorn", "server:app", "--host", "0.0.0.0", "--port", "8000"]
\`\`\``,
  },
  {
    id: 'vercel-deployment',
    number: 17,
    title: 'Vercel Deployment Requirements',
    category: 'Deployment & Demo',
    content: `### 17. Vercel Frontend Deployment Blueprint

\`\`\`json
// vercel.json
{
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "https://brandforge-backend.onrender.com/api/$1"
    },
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
\`\`\`

\`\`\`json
// package.json scripts for Vercel
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  }
}
\`\`\``,
  },
  {
    id: 'testing-strategy',
    number: 18,
    title: 'Testing Strategy',
    category: 'Deployment & Demo',
    content: `### 18. Testing & Quality Assurance Strategy

1. **Unit Tests (Pytest & Vitest):**
   - \`test_interview_probe\`: Verify that dynamic interview generates relevant follow-ups and increments sufficiency score.
   - \`test_anti_generic_critic\`: Pass known clichés ("Empower the future of AI innovation") and assert status == "rejected" with valid replacement directions.
   - \`test_consistency_matrix\`: Feed a known contradiction (e.g., luxury high-ticket tone paired with "$5 college student budget") and assert conflict status detected.

2. **Integration Test Flow:**
   - Run synthetic end-to-end pipeline test with mock or live Gemini API key:
     Input: "A lightweight mechanical keyboard configurator for Linux sysadmins"
     Verify output contains all 9 required schemas without null pointer errors.`,
  },
  {
    id: 'three-minute-demo-flow',
    number: 19,
    title: 'Three-Minute Judge Demo Flow',
    category: 'Deployment & Demo',
    content: `### 19. Three-Minute Hackathon Demo Script (For Judges)

| Time | Stage | Action / On-Screen Visual | Talking Point to Judge |
|---|---|---|---|
| **0:00 - 0:30** | **Founder Input & Interview** | Click "Podcast DAW for Solo Creators" preset. AI immediately asks: *"What DAWs do they abandon today and why does Audacity fail them?"* | *"Most AI tools jump straight to a generic logo. BrandForge starts with an adaptive founder interview to extract facts before generating anything."* |
| **0:30 - 1:00** | **Pipeline Execution** | Click **"Run Multi-Agent Pipeline"**. Watch stages light up sequentially with real-time timers and confidence scores. | *"Instead of one monolithic prompt, 9 isolated agents reason over each other's outputs. Notice the Discovery and Positioning cards updating."* |
| **1:00 - 1:40** | **Anti-Generic Critic** | Switch to the **Anti-Generic Critic** view. Highlight the red rejected box: *"Empowering solo creators with seamless audio"*. | *"Our core differentiator: the Anti-Generic Critic destroys Silicon Valley clichés. It shows the detected flaw, the reason, and surgical replacement directions."* |
| **1:40 - 2:20** | **Brand Debate Arena** | Open the **Brand Debate Arena**. Show the 4 personas (Strategist, Target Audience, Creative Director, Skeptical Critic) arguing over pricing and tone. | *"Watch the AI Brand Debate. The Skeptical Critic challenges the Creative Director on audio latency skepticism. The Synthesizer resolves it."* |
| **2:20 - 2:45** | **Consistency Guardian** | View the **8x8 Consistency Matrix**. Point to green checks and the warning item showing alignment between archetype and palette. | *"The Consistency Guardian audits audience, problem, personality, and visual direction to ensure zero internal contradictions."* |
| **2:45 - 3:00** | **Launch Kit & Blueprint** | Switch to **Launch Kit** (copy landing page headline, founder pitch) and click **"Devin AI Blueprint"**. | *"Finally, the founder receives a production Launch Kit, and Devin AI can build this complete backend with our 20-section blueprint."* |`,
  },
  {
    id: 'example-user-session',
    number: 20,
    title: 'Complete Example User Session',
    category: 'Deployment & Demo',
    content: `### 20. Complete Example User Session Walkthrough

**Input Idea:**
*"We are building a real-time collaborative audio editor for narrative podcast producers who are overwhelmed by Pro Tools and hate uploading WAV files back and forth."*

**1. Interview Probe:**
- **AI:** *"Who specifically is the primary user who cries first—the sound designer, the host, or the editor? And what is the single file-sharing bottleneck that makes them quit?"*
- **Founder Response:** *"The freelance narrative editor. They waste 3 hours every episode exporting stems to Google Drive and reconciling timestamp comments from directors."*

**2. Positioning Output:**
- **Category:** Collaborative Narrative Audio Workstation
- **Wedge:** Zero-export stem streaming with browser timestamp director review
- **Anti-Positioning:** NOT a music beatmaker, NOT a generic transcription tool.

**3. Anti-Generic Critic Output:**
- **Rejected:** *"The seamless next-generation audio revolution."*
- **Replacement:** *"Cut episode review cycles from 3 days to 30 minutes with synchronous stem review."*

**4. Debate Resolution:**
- **Creative Director** pushed for whimsical retro-cassette branding; **Skeptical Critic** argued narrative podcast producers demand brutal engineering precision.
- **Resolution:** Adopted "The Precision Studio" territory—clean dark-mode waveform aesthetic with high-density timeline typography.

**5. Launch Kit Hero Headline:**
- *"Stop Uploading 2GB Stems to Google Drive. Edit, Review, and Master Narrative Podcasts Together in Real Time."*`,
  },
];
