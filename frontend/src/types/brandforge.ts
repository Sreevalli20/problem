/**
 * BrandForge AI - Type Definitions & Schemas
 * Multi-stage AI Brand Intelligence Architecture
 */

export type WorkflowStageId =
  | 'DISCOVERY'
  | 'POSITIONING'
  | 'PERSONALITY'
  | 'CREATIVE_DIRECTION'
  | 'CRITIQUE'
  | 'BRAND_DEBATE'
  | 'CONSISTENCY'
  | 'FINAL_REPORT'
  | 'LAUNCH_KIT';

export interface InterviewMessage {
  id: string;
  role: 'assistant' | 'user';
  content: string;
  whyThisMatters?: string;
  timestamp: number;
}

export interface FounderInterviewState {
  initialIdea: string;
  conversation: InterviewMessage[];
  extractedFacts: string[];
  extractedAssumptions: string[];
  founderConstraints: string[];
  isComplete: boolean;
  sufficiencyScore: number; // 0 to 100
}

export interface BaseAgentMetadata {
  stage: WorkflowStageId;
  agentName: string;
  summary: string;
  confidence: number; // 0 to 100
  reasoningTimeMs?: number;
  openQuestions?: string[];
}

export interface DiscoveryAgentOutput extends BaseAgentMetadata {
  stage: 'DISCOVERY';
  founderMotivation: string;
  coreProblem: string;
  targetAudience: string;
  currentAlternatives: string[];
  initialWedge: string;
  facts: string[];
  assumptions: string[];
  risks: string[];
}

export interface PositioningAgentOutput extends BaseAgentMetadata {
  stage: 'POSITIONING';
  marketCategory: string;
  primaryAudienceProfile: {
    persona: string;
    painPoint: string;
    urgency: string;
    switchingTrigger: string;
  };
  valueProposition: string;
  differentiatedWedge: string;
  positioningStatement: string;
  antiPositioning: string;
  competitiveMoatHypothesis: string;
}

export interface PersonalityAgentOutput extends BaseAgentMetadata {
  stage: 'PERSONALITY';
  archetype: string;
  coreTraits: {
    trait: string;
    definition: string;
    howItShowsUp: string;
  }[];
  traitsToAvoid: {
    trait: string;
    whyHarmful: string;
    trapToAvoid: string;
  }[];
  communicationStyle: {
    tone: string;
    rhythm: string;
    vocabularyPreference: string[];
    bannedWords: string[];
  };
}

export interface CreativeDirectorOutput extends BaseAgentMetadata {
  stage: 'CREATIVE_DIRECTION';
  namingTerritories: {
    territoryName: string;
    theme: string;
    names: {
      name: string;
      rationale: string;
      tldLikelihood: string;
      phoneticVibe: string;
    }[];
  }[];
  taglineOptions: {
    tagline: string;
    angle: string;
    punchinessScore: number;
  }[];
  visualDirection: {
    mood: string;
    colorPalette: {
      name: string;
      hex: string;
      role: 'primary' | 'secondary' | 'accent' | 'background' | 'surface';
      psychologicalIntent: string;
    }[];
    typographyPairing: {
      headingFont: string;
      bodyFont: string;
      codeFont: string;
      rationale: string;
    };
    imageryStyle: string;
    logoConceptDirections: {
      conceptName: string;
      visualMetaphor: string;
      description: string;
      svgGlyphIdea: string;
    }[];
  };
}

export interface AntiGenericClicheItem {
  detectedPhraseOrConcept: string;
  status: 'rejected' | 'warning';
  reason: string;
  problems?: string[];
  evidenceOrContext: string;
  replacementDirection: string;
  whyReplacementIsBetter: string;
}

export interface AntiGenericCriticOutput extends BaseAgentMetadata {
  stage: 'CRITIQUE';
  detectedCliches: AntiGenericClicheItem[];
  overallGenericScore: number; // 0 (pure cliché) to 100 (razor sharp unique)
  criticalWeaknesses: string[];
  founderWarning: string;
}

export interface AntiGenericCustomAuditResult {
  inputText: string;
  detectedIssues: AntiGenericClicheItem[];
  distinctivenessScore: number;
  critiqueSummary: string;
  strengthsIdentified: string[];
  recommendedWedge: string;
}

export interface DebatePersona {
  role: 'strategist' | 'target_audience' | 'creative_director' | 'skeptical_critic';
  name: string;
  title: string;
  avatarColor: string;
  stance: string;
  keyArgument: string;
  critiqueOfOthers: string;
  uncompromisingDemand: string;
}

export interface BrandDebateOutput extends BaseAgentMetadata {
  stage: 'BRAND_DEBATE';
  debateTopic: string;
  personas: DebatePersona[];
  tensionsIdentified: string[];
  synthesisResolution: string;
  consensusAgreed: boolean;
}

export interface ConsistencyMatrixItem {
  element:
    | 'audience'
    | 'problem'
    | 'positioning'
    | 'personality'
    | 'naming'
    | 'tagline'
    | 'voice'
    | 'visual_direction';
  status: 'aligned' | 'warning' | 'conflict';
  conflictWith: string[];
  explanation: string;
  recommendation: string;
}

export interface ConsistencyGuardianOutput extends BaseAgentMetadata {
  stage: 'CONSISTENCY';
  overallAlignmentScore: number; // 0 to 100
  matrixItems: ConsistencyMatrixItem[];
  guardianVerdict: string;
  passStatus: 'PASSED' | 'PASSED_WITH_WARNINGS' | 'FAILED_REVISIONS_NEEDED';
}

export interface FactAssumptionsItem {
  type: 'FACT' | 'ASSUMPTION' | 'FOUNDER_INPUT' | 'AI_INFERENCE' | 'RECOMMENDATION';
  statement: string;
  sourceStage: WorkflowStageId;
}

export interface FinalBrandIntelligenceReport {
  brandName: string;
  oneLineDescription: string;
  targetAudience: string;
  coreProblem: string;
  founderInsight: string;
  positioningStatement: string;
  differentiator: string;
  brandPromise: string;
  brandPersonality: { trait: string; description: string }[];
  traitsToAvoid: string[];
  namingTerritoriesSummary: { territory: string; topPick: string; vibe: string }[];
  selectedTagline: string;
  alternateTaglines: string[];
  voiceAndMessaging: {
    elevatorPitch10s: string;
    pitch30s: string;
    voicePillars: string[];
    manifestoExcerpt: string;
  };
  visualSystem: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    backgroundColor: string;
    colors: { name: string; hex: string; role: string; intent: string }[];
    typography: { heading: string; body: string; code: string };
    logoDirection: { concept: string; metaphor: string; execution: string };
  };
  antiGenericAudit: {
    score: number;
    topEliminations: string[];
  };
  debateSynthesis: string;
  consistencyVerdict: string;
  risksAndAssumptions: FactAssumptionsItem[];
  finalRecommendations: string[];
  generatedAt: string;
}

export interface LaunchKitOutput {
  landingPage: {
    headline: string;
    subheadline: string;
    primaryCta: string;
    secondaryCta: string;
    problemSection: string;
    solutionSection: string;
    aboutSection: string;
    productDescriptionShort: string;
  };
  socialContent: {
    linkedInLaunchPost: string;
    twitterXThread: string[];
    instagramCaption: string;
  };
  pitches: {
    shortFounderPitch: string;
    elevatorPitch: string;
    investorOneLiner: string;
  };
  brandVoiceGuide: {
    voicePrinciples: string[];
    doSay: string[];
    dontSay: string[];
    exampleSentences: {
      context: string;
      sayThis: string;
      notThis: string;
      why: string;
    }[];
  };
}

export interface BrandForgeProjectState {
  id: string;
  title: string;
  createdAt: string;
  currentStep: 'INTERVIEW' | 'WORKFLOW' | 'FINAL_REPORT' | 'LAUNCH_KIT';
  interview: FounderInterviewState;
  activeStageIndex: number;
  stagesCompleted: WorkflowStageId[];
  isGenerating: boolean;
  activeAgentRunning?: string;
  discovery?: DiscoveryAgentOutput;
  positioning?: PositioningAgentOutput;
  personality?: PersonalityAgentOutput;
  creative?: CreativeDirectorOutput;
  critique?: AntiGenericCriticOutput;
  debate?: BrandDebateOutput;
  consistency?: ConsistencyGuardianOutput;
  finalReport?: FinalBrandIntelligenceReport;
  launchKit?: LaunchKitOutput;
}
