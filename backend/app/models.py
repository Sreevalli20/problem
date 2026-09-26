from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
from datetime import datetime
from enum import Enum


class InterviewStage(str, Enum):
    INITIAL = "initial"
    AUDIENCE = "audience"
    PROBLEM = "problem"
    CONTEXT = "context"
    ALTERNATIVES = "alternatives"
    DIFFERENTIATION = "differentiation"
    MOTIVATION = "motivation"
    EMOTION = "emotion"
    BRAND_CHARACTER = "brand_character"
    CONSTRAINTS = "constraints"
    COMPLETE = "complete"


class InterviewMessage(BaseModel):
    id: str
    role: str  # "user" or "system"
    content: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    stage: Optional[InterviewStage] = None


class Project(BaseModel):
    id: str
    initial_idea: str
    interview_messages: List[InterviewMessage] = []
    current_stage: InterviewStage = InterviewStage.INITIAL
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)


class DiscoveryOutput(BaseModel):
    product_concept: str
    problem: str
    target_users: str
    context: str
    motivations: str
    alternatives: str
    differentiators: str
    assumptions: List[str]
    unknowns: List[str]
    constraints: List[str]
    confidence_level: str


class AudienceOutput(BaseModel):
    primary_audience: str
    secondary_audience: Optional[str]
    needs: List[str]
    pain_points: List[str]
    motivations: List[str]
    objections: List[str]
    desired_outcomes: List[str]
    usage_context: str
    evidence_sources: List[str]


class PositioningOutput(BaseModel):
    category: str
    target_audience: str
    problem: str
    value_proposition: str
    differentiator: str
    brand_promise: str
    positioning_statement: str


class PersonalityOutput(BaseModel):
    core_traits: List[str]
    emotional_character: str
    communication_style: str
    traits_to_avoid: List[str]
    voice_examples: List[str]
    founder_preferences: Optional[str] = None


class NamingTerritory(BaseModel):
    type: str
    description: str
    examples: List[str]
    rationale: str


class VisualDirection(BaseModel):
    visual_mood: str
    color_direction: str
    typography_direction: str
    imagery_direction: str
    composition: str
    logo_concept_directions: List[str]


class CreativeOutput(BaseModel):
    naming_territories: List[NamingTerritory]
    visual_direction: VisualDirection
    tagline_directions: List[str]


class CritiqueIssue(BaseModel):
    type: str
    description: str
    evidence: str
    severity: str  # "low", "medium", "high"
    replacement_direction: str


class CritiqueOutput(BaseModel):
    status: str  # "approved", "rejected", "needs_revision"
    issues: List[CritiqueIssue]
    overall_score: str
    key_concerns: List[str]
    strengths: List[str]


class DebatePerspective(BaseModel):
    name: str
    evaluation: str
    criteria: List[str]
    findings: List[str]
    concerns: List[str]
    score: str


class DebateOutput(BaseModel):
    perspectives: List[DebatePerspective]
    agreements: List[str]
    disagreements: List[str]
    risks: List[str]
    recommended_changes: List[str]
    overall_assessment: str


class ConsistencyCheck(BaseModel):
    aspect: str
    status: str  # "consistent", "warning", "inconsistent"
    details: str
    severity: str


class ConsistencyOutput(BaseModel):
    overall_status: str  # "consistent", "needs_review", "inconsistent"
    checks: List[ConsistencyCheck]
    contradictions: List[str]
    mismatches: List[str]
    recommendations: List[str]


class FinalBrandOutput(BaseModel):
    brand_direction: str
    one_line_description: str
    target_audience: str
    core_problem: str
    founder_insight: str
    positioning: str
    differentiator: str
    brand_promise: str
    personality: PersonalityOutput
    naming_territories: List[NamingTerritory]
    tagline: str
    voice: str
    messaging: str
    visual_direction: VisualDirection
    color_direction: str
    typography: str
    imagery: str
    logo_concept_directions: List[str]
    critic_findings: CritiqueOutput
    debate_findings: DebateOutput
    consistency_findings: ConsistencyOutput
    assumptions: List[str]
    risks: List[str]
    recommendations: List[str]


class LaunchKitOutput(BaseModel):
    landing_page_headline: str
    landing_page_subheadline: str
    cta: str
    about_section: str
    product_description: str
    founder_pitch: str
    elevator_pitch: str
    linkedin_launch_post: str
    instagram_caption: str
    brand_voice_examples: List[str]
    do_messaging: List[str]
    dont_messaging: List[str]
