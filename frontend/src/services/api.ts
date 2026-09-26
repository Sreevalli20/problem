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
  LaunchKitOutput
} from "../types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

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
    return response.json();
  }

  async runAudience(projectId: string): Promise<AudienceOutput> {
    const url = `${this.baseUrl}/api/workflow/audience?project_id=${projectId}`;
    const response = await fetch(url, { method: "POST" });
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    return response.json();
  }

  async runPositioning(projectId: string): Promise<PositioningOutput> {
    const url = `${this.baseUrl}/api/workflow/positioning?project_id=${projectId}`;
    const response = await fetch(url, { method: "POST" });
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    return response.json();
  }

  async runPersonality(projectId: string): Promise<PersonalityOutput> {
    const url = `${this.baseUrl}/api/workflow/personality?project_id=${projectId}`;
    const response = await fetch(url, { method: "POST" });
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    return response.json();
  }

  async runCreative(projectId: string): Promise<CreativeOutput> {
    const url = `${this.baseUrl}/api/workflow/creative?project_id=${projectId}`;
    const response = await fetch(url, { method: "POST" });
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    return response.json();
  }

  async runCritique(projectId: string): Promise<CritiqueOutput> {
    const url = `${this.baseUrl}/api/workflow/critique?project_id=${projectId}`;
    const response = await fetch(url, { method: "POST" });
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    return response.json();
  }

  async runDebate(projectId: string): Promise<DebateOutput> {
    const url = `${this.baseUrl}/api/workflow/debate?project_id=${projectId}`;
    const response = await fetch(url, { method: "POST" });
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    return response.json();
  }

  async runConsistency(projectId: string): Promise<ConsistencyOutput> {
    const url = `${this.baseUrl}/api/workflow/consistency?project_id=${projectId}`;
    const response = await fetch(url, { method: "POST" });
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    return response.json();
  }

  async runFinalize(projectId: string): Promise<FinalBrandOutput> {
    const url = `${this.baseUrl}/api/workflow/finalize?project_id=${projectId}`;
    const response = await fetch(url, { method: "POST" });
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    return response.json();
  }

  async generateLaunchKit(projectId: string): Promise<LaunchKitOutput> {
    const url = `${this.baseUrl}/api/launch-kit?project_id=${projectId}`;
    const response = await fetch(url, { method: "POST" });
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    return response.json();
  }
}

export const apiService = new ApiService();
