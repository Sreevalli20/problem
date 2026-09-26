import type {
  Project,
  InterviewStage,
  DiscoveryOutput,
  AudienceOutput,
  PositioningOutput,
  PersonalityOutput,
  CreativeOutput,
  CritiqueOutput,
  DebateOutput,
  ConsistencyOutput,
  FinalBrandOutput,
  LaunchKitOutput,
  NamingTerritory,
  VisualDirection,
  CritiqueIssue,
  DebatePerspective,
  ConsistencyCheck
} from "../types";

const API_URL = "https://brandforge-api-exxq.onrender.com/";

class ApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_URL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async healthCheck(): Promise<{ status: string; service: string }> {
    return this.request("/api/health");
  }

  async createProject(initialIdea: string): Promise<Project> {
    return this.request("/api/projects", {
      method: "POST",
      body: JSON.stringify({ initial_idea: initialIdea }),
    });
  }

  async getProject(projectId: string): Promise<Project> {
    return this.request(`/api/projects/${projectId}`);
  }

  async sendInterviewMessage(
    projectId: string,
    message: string
  ): Promise<{ reply: string; stage: InterviewStage; is_complete: boolean }> {
    const url = `${this.baseUrl}/api/interview/message?project_id=${projectId}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async runDiscovery(projectId: string): Promise<DiscoveryOutput> {
    const url = `${this.baseUrl}/api/workflow/discovery?project_id=${projectId}`;
    const response = await fetch(url, { method: "POST" });
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    const data = await response.json();
    // Transform backend response to frontend expected format
    return {
      product_concept: data.product_concept,
      problem: data.problem,
      target_users: data.target_users,
      context: data.context,
      motivations: data.motivations,
      alternatives: data.alternatives,
      differentiators: data.differentiators,
      assumptions: data.assumptions || [],
      unknowns: data.unknowns || [],
      constraints: data.constraints || [],
      confidence_level: data.confidence_level,
    };
  }

  async runAudience(projectId: string): Promise<AudienceOutput> {
    const url = `${this.baseUrl}/api/workflow/audience?project_id=${projectId}`;
    const response = await fetch(url, { method: "POST" });
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    const data = await response.json();
    return {
      primary_audience: data.primary_audience,
      secondary_audience: data.secondary_audience,
      needs: data.needs || [],
      pain_points: data.pain_points || [],
      motivations: data.motivations || [],
      objections: data.objections || [],
      desired_outcomes: data.desired_outcomes || [],
      usage_context: data.usage_context,
      evidence_sources: data.evidence_sources || [],
    };
  }

  async runPositioning(projectId: string): Promise<PositioningOutput> {
    const url = `${this.baseUrl}/api/workflow/positioning?project_id=${projectId}`;
    const response = await fetch(url, { method: "POST" });
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    const data = await response.json();
    return {
      category: data.category,
      target_audience: data.target_audience,
      problem: data.problem,
      value_proposition: data.value_proposition,
      differentiator: data.differentiator,
      brand_promise: data.brand_promise,
      positioning_statement: data.positioning_statement,
    };
  }

  async runPersonality(projectId: string): Promise<PersonalityOutput> {
    const url = `${this.baseUrl}/api/workflow/personality?project_id=${projectId}`;
    const response = await fetch(url, { method: "POST" });
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    const data = await response.json();
    return {
      core_traits: data.core_traits || [],
      emotional_character: data.emotional_character,
      communication_style: data.communication_style,
      traits_to_avoid: data.traits_to_avoid || [],
      voice_examples: data.voice_examples || [],
      founder_preferences: data.founder_preferences,
    };
  }

  async runCreative(projectId: string): Promise<CreativeOutput> {
    const url = `${this.baseUrl}/api/workflow/creative?project_id=${projectId}`;
    const response = await fetch(url, { method: "POST" });
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    const data = await response.json();
    return {
      naming_territories: data.naming_territories || [],
      visual_direction: data.visual_direction,
      tagline_directions: data.tagline_directions || [],
    };
  }

  async runCritique(projectId: string): Promise<CritiqueOutput> {
    const url = `${this.baseUrl}/api/workflow/critique?project_id=${projectId}`;
    const response = await fetch(url, { method: "POST" });
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    const data = await response.json();
    return {
      status: data.status,
      issues: data.issues || [],
      overall_score: data.overall_score,
      key_concerns: data.key_concerns || [],
      strengths: data.strengths || [],
    };
  }

  async runDebate(projectId: string): Promise<DebateOutput> {
    const url = `${this.baseUrl}/api/workflow/debate?project_id=${projectId}`;
    const response = await fetch(url, { method: "POST" });
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    const data = await response.json();
    return {
      perspectives: data.perspectives || [],
      agreements: data.agreements || [],
      disagreements: data.disagreements || [],
      risks: data.risks || [],
      recommended_changes: data.recommended_changes || [],
      overall_assessment: data.overall_assessment,
    };
  }

  async runConsistency(projectId: string): Promise<ConsistencyOutput> {
    const url = `${this.baseUrl}/api/workflow/consistency?project_id=${projectId}`;
    const response = await fetch(url, { method: "POST" });
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    const data = await response.json();
    return {
      overall_status: data.overall_status,
      checks: data.checks || [],
      contradictions: data.contradictions || [],
      mismatches: data.mismatches || [],
      recommendations: data.recommendations || [],
    };
  }

  async runFinalize(projectId: string): Promise<FinalBrandOutput> {
    const url = `${this.baseUrl}/api/workflow/finalize?project_id=${projectId}`;
    const response = await fetch(url, { method: "POST" });
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    const data = await response.json();
    return {
      brand_direction: data.brand_direction,
      one_line_description: data.one_line_description,
      target_audience: data.target_audience,
      core_problem: data.core_problem,
      founder_insight: data.founder_insight,
      positioning: data.positioning,
      differentiator: data.differentiator,
      brand_promise: data.brand_promise,
      personality: data.personality,
      naming_territories: data.naming_territories || [],
      tagline: data.tagline,
      voice: data.voice,
      messaging: data.messaging,
      visual_direction: data.visual_direction,
      color_direction: data.color_direction,
      typography: data.typography,
      imagery: data.imagery,
      logo_concept_directions: data.logo_concept_directions || [],
      critic_findings: data.critic_findings,
      debate_findings: data.debate_findings,
      consistency_findings: data.consistency_findings,
      assumptions: data.assumptions || [],
      risks: data.risks || [],
      recommendations: data.recommendations || [],
    };
  }

  async generateLaunchKit(projectId: string): Promise<LaunchKitOutput> {
    const url = `${this.baseUrl}/api/launch-kit?project_id=${projectId}`;
    const response = await fetch(url, { method: "POST" });
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    const data = await response.json();
    return {
      landing_page_headline: data.landing_page_headline,
      landing_page_subheadline: data.landing_page_subheadline,
      cta: data.cta,
      about_section: data.about_section,
      product_description: data.product_description,
      founder_pitch: data.founder_pitch,
      elevator_pitch: data.elevator_pitch,
      linkedin_launch_post: data.linkedin_launch_post,
      instagram_caption: data.instagram_caption,
      brand_voice_examples: data.brand_voice_examples || [],
      do_messaging: data.do_messaging || [],
      dont_messaging: data.dont_messaging || [],
    };
  }
}

export const apiService = new ApiService();
