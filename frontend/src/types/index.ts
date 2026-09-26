export interface Project {
  id: string;
  initial_idea: string;
  interview_messages: InterviewMessage[];
  current_stage: InterviewStage;
  created_at: string;
  updated_at: string;
}

export interface InterviewMessage {
  id: string;
  role: 'user' | 'system' | 'assistant';
  content: string;
  stage: InterviewStage;
}

export enum InterviewStage {
  INITIAL = 'INITIAL',
  AUDIENCE = 'AUDIENCE',
  POSITIONING = 'POSITIONING',
  PERSONALITY = 'PERSONALITY',
  CREATIVE = 'CREATIVE',
  CRITIQUE = 'CRITIQUE',
  DEBATE = 'DEBATE',
  CONSISTENCY = 'CONSISTENCY',
  COMPLETE = 'COMPLETE'
}

export interface DiscoveryOutput {
  product_concept: string;
  problem: string;
  target_users: string;
  context: string;
  motivations: string;
  alternatives: string;
  differentiators: string;
  assumptions: string[];
  unknowns: string[];
  constraints: string[];
  confidence_level: string;
}

export interface AudienceOutput {
  primary_audience: string;
  secondary_audience?: string;
  needs: string[];
  pain_points: string[];
  motivations: string[];
  objections: string[];
  desired_outcomes: string[];
  usage_context: string;
  evidence_sources: string[];
}

export interface PositioningOutput {
  category: string;
  target_audience: string;
  problem: string;
  value_proposition: string;
  differentiator: string;
  brand_promise: string;
  positioning_statement: string;
}

export interface PersonalityOutput {
  core_traits: string[];
  emotional_character: string;
  communication_style: string;
  traits_to_avoid: string[];
  voice_examples: string[];
  founder_preferences?: string;
}

export interface NamingTerritory {
  type: string;
  description: string;
  examples: string[];
  rationale: string;
}

export interface VisualDirection {
  visual_mood: string;
  color_direction: string;
  typography_direction: string;
  imagery_direction: string;
  composition: string;
  logo_concept_directions: string[];
}

export interface CreativeOutput {
  naming_territories: NamingTerritory[];
  visual_direction: VisualDirection;
  tagline_directions: string[];
}

export interface CritiqueIssue {
  type: string;
  description: string;
  evidence: string;
  severity: string;
  replacement_direction: string;
}

export interface CritiqueOutput {
  status: string;
  issues: CritiqueIssue[];
  overall_score: string;
  key_concerns: string[];
  strengths: string[];
}

export interface DebatePerspective {
  name: string;
  evaluation: string;
  criteria: string[];
  findings: string[];
  concerns: string[];
  score: string;
}

export interface DebateOutput {
  perspectives: DebatePerspective[];
  agreements: string[];
  disagreements: string[];
  risks: string[];
  recommended_changes: string[];
  overall_assessment: string;
}

export interface ConsistencyCheck {
  aspect: string;
  status: string;
  details: string;
  severity: string;
}

export interface ConsistencyOutput {
  overall_status: string;
  checks: ConsistencyCheck[];
  contradictions: string[];
  mismatches: string[];
  recommendations: string[];
}

export interface FinalBrandOutput {
  brand_direction: string;
  one_line_description: string;
  target_audience: string;
  core_problem: string;
  founder_insight: string;
  positioning: string;
  differentiator: string;
  brand_promise: string;
  personality: PersonalityOutput;
  naming_territories: NamingTerritory[];
  tagline: string;
  voice: string;
  messaging: string;
  visual_direction: VisualDirection;
  color_direction: string;
  typography: string;
  imagery: string;
  logo_concept_directions: string[];
  critic_findings: CritiqueOutput;
  debate_findings: DebateOutput;
  consistency_findings: ConsistencyOutput;
  assumptions: string[];
  risks: string[];
  recommendations: string[];
}

export interface LaunchKitOutput {
  landing_page_headline: string;
  landing_page_subheadline: string;
  cta: string;
  about_section: string;
  product_description: string;
  founder_pitch: string;
  elevator_pitch: string;
  linkedin_launch_post: string;
  instagram_caption: string;
  brand_voice_examples: string[];
  do_messaging: string[];
  dont_messaging: string[];
}
