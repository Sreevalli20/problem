from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import uuid
from datetime import datetime
import os

from .models import (
    Project, InterviewMessage, InterviewStage, DiscoveryOutput, AudienceOutput,
    PositioningOutput, PersonalityOutput, CreativeOutput, CritiqueOutput,
    DebateOutput, ConsistencyOutput, FinalBrandOutput, LaunchKitOutput
)
from .engines import (
    InterviewEngine, DiscoveryEngine, AudienceEngine, PositioningEngine,
    PersonalityEngine, CreativeEngine, CriticEngine, DebateEngine,
    ConsistencyEngine, FinalBrandEngine, LaunchKitEngine
)

# Initialize FastAPI app
app = FastAPI(title="BrandForge AI API", version="1.0.0")

# CORS configuration
frontend_url = os.getenv("FRONTEND_URL", "*")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory storage (in production, use a database)
projects_storage = {}

# Initialize engines
interview_engine = InterviewEngine()
discovery_engine = DiscoveryEngine()
audience_engine = AudienceEngine()
positioning_engine = PositioningEngine()
personality_engine = PersonalityEngine()
creative_engine = CreativeEngine()
critic_engine = CriticEngine()
debate_engine = DebateEngine()
consistency_engine = ConsistencyEngine()
final_brand_engine = FinalBrandEngine()
launch_kit_engine = LaunchKitEngine()


# Request/Response models
class CreateProjectRequest(BaseModel):
    initial_idea: str


class InterviewMessageRequest(BaseModel):
    message: str


class InterviewMessageResponse(BaseModel):
    reply: str
    stage: InterviewStage
    is_complete: bool


class HealthResponse(BaseModel):
    status: str
    service: str


# Endpoints
@app.get("/api/health", response_model=HealthResponse)
async def health_check():
    """Health check endpoint."""
    return HealthResponse(status="ok", service="brandforge-api")


@app.post("/api/projects", response_model=Project)
async def create_project(request: CreateProjectRequest):
    """Create a new project."""
    project_id = str(uuid.uuid4())
    project = Project(
        id=project_id,
        initial_idea=request.initial_idea,
        interview_messages=[
            InterviewMessage(
                id=str(uuid.uuid4()),
                role="user",
                content=request.initial_idea,
                stage=InterviewStage.INITIAL
            )
        ],
        current_stage=InterviewStage.INITIAL
    )
    projects_storage[project_id] = project
    return project


@app.get("/api/projects/{project_id}", response_model=Project)
async def get_project(project_id: str):
    """Get a project by ID."""
    if project_id not in projects_storage:
        raise HTTPException(status_code=404, detail="Project not found")
    return projects_storage[project_id]


@app.post("/api/interview/message", response_model=InterviewMessageResponse)
async def interview_message(project_id: str = Query(...), request: InterviewMessageRequest = ...):
    """Process an interview message and get the next question."""
    if project_id not in projects_storage:
        raise HTTPException(status_code=404, detail="Project not found")

    project = projects_storage[project_id]

    # Add user message
    user_message = InterviewMessage(
        id=str(uuid.uuid4()),
        role="user",
        content=request.message,
        stage=project.current_stage
    )
    project.interview_messages.append(user_message)

    # Get next question
    reply, next_stage = interview_engine.select_next_question(project.interview_messages)
    project.current_stage = next_stage

    # Add system message
    system_message = InterviewMessage(
        id=str(uuid.uuid4()),
        role="system",
        content=reply,
        stage=next_stage
    )
    project.interview_messages.append(system_message)

    project.updated_at = datetime.utcnow()

    is_complete = (next_stage == InterviewStage.COMPLETE)

    return InterviewMessageResponse(
        reply=reply,
        stage=next_stage,
        is_complete=is_complete
    )


@app.post("/api/workflow/discovery", response_model=DiscoveryOutput)
async def run_discovery(project_id: str = Query(...)):
    """Run discovery analysis."""
    if project_id not in projects_storage:
        raise HTTPException(status_code=404, detail="Project not found")

    project = projects_storage[project_id]
    return discovery_engine.run(project.interview_messages)


@app.post("/api/workflow/audience", response_model=AudienceOutput)
async def run_audience(project_id: str = Query(...)):
    """Run audience analysis."""
    if project_id not in projects_storage:
        raise HTTPException(status_code=404, detail="Project not found")

    project = projects_storage[project_id]
    discovery = discovery_engine.run(project.interview_messages)
    return audience_engine.run(discovery)


@app.post("/api/workflow/positioning", response_model=PositioningOutput)
async def run_positioning(project_id: str = Query(...)):
    """Run positioning analysis."""
    if project_id not in projects_storage:
        raise HTTPException(status_code=404, detail="Project not found")

    project = projects_storage[project_id]
    discovery = discovery_engine.run(project.interview_messages)
    audience = audience_engine.run(discovery)
    return positioning_engine.run(discovery, audience)


@app.post("/api/workflow/personality", response_model=PersonalityOutput)
async def run_personality(project_id: str = Query(...)):
    """Run personality analysis."""
    if project_id not in projects_storage:
        raise HTTPException(status_code=404, detail="Project not found")

    project = projects_storage[project_id]
    discovery = discovery_engine.run(project.interview_messages)
    audience = audience_engine.run(discovery)
    positioning = positioning_engine.run(discovery, audience)
    return personality_engine.run(audience, positioning)


@app.post("/api/workflow/creative", response_model=CreativeOutput)
async def run_creative(project_id: str = Query(...)):
    """Run creative analysis."""
    if project_id not in projects_storage:
        raise HTTPException(status_code=404, detail="Project not found")

    project = projects_storage[project_id]
    discovery = discovery_engine.run(project.interview_messages)
    audience = audience_engine.run(discovery)
    positioning = positioning_engine.run(discovery, audience)
    personality = personality_engine.run(audience, positioning)
    return creative_engine.run(positioning, personality)


@app.post("/api/workflow/critique", response_model=CritiqueOutput)
async def run_critique(project_id: str = Query(...)):
    """Run critique analysis."""
    if project_id not in projects_storage:
        raise HTTPException(status_code=404, detail="Project not found")

    project = projects_storage[project_id]
    discovery = discovery_engine.run(project.interview_messages)
    audience = audience_engine.run(discovery)
    positioning = positioning_engine.run(discovery, audience)
    personality = personality_engine.run(audience, positioning)
    creative = creative_engine.run(positioning, personality)
    return critic_engine.run(positioning, audience, creative)


@app.post("/api/workflow/debate", response_model=DebateOutput)
async def run_debate(project_id: str = Query(...)):
    """Run debate analysis."""
    if project_id not in projects_storage:
        raise HTTPException(status_code=404, detail="Project not found")

    project = projects_storage[project_id]
    discovery = discovery_engine.run(project.interview_messages)
    audience = audience_engine.run(discovery)
    positioning = positioning_engine.run(discovery, audience)
    personality = personality_engine.run(audience, positioning)
    creative = creative_engine.run(positioning, personality)
    critique = critic_engine.run(positioning, audience, creative)
    return debate_engine.run(positioning, audience, personality, creative, critique)


@app.post("/api/workflow/consistency", response_model=ConsistencyOutput)
async def run_consistency(project_id: str = Query(...)):
    """Run consistency analysis."""
    if project_id not in projects_storage:
        raise HTTPException(status_code=404, detail="Project not found")

    project = projects_storage[project_id]
    discovery = discovery_engine.run(project.interview_messages)
    audience = audience_engine.run(discovery)
    positioning = positioning_engine.run(discovery, audience)
    personality = personality_engine.run(audience, positioning)
    creative = creative_engine.run(positioning, personality)
    return consistency_engine.run(audience, positioning, personality, creative)


@app.post("/api/workflow/finalize", response_model=FinalBrandOutput)
async def run_finalize(project_id: str = Query(...)):
    """Run final brand synthesis."""
    if project_id not in projects_storage:
        raise HTTPException(status_code=404, detail="Project not found")

    project = projects_storage[project_id]
    discovery = discovery_engine.run(project.interview_messages)
    audience = audience_engine.run(discovery)
    positioning = positioning_engine.run(discovery, audience)
    personality = personality_engine.run(audience, positioning)
    creative = creative_engine.run(positioning, personality)
    critique = critic_engine.run(positioning, audience, creative)
    debate = debate_engine.run(positioning, audience, personality, creative, critique)
    consistency = consistency_engine.run(audience, positioning, personality, creative)
    return final_brand_engine.run(discovery, audience, positioning, personality, creative, critique, debate, consistency)


@app.post("/api/launch-kit", response_model=LaunchKitOutput)
async def generate_launch_kit(project_id: str = Query(...)):
    """Generate launch kit."""
    if project_id not in projects_storage:
        raise HTTPException(status_code=404, detail="Project not found")

    project = projects_storage[project_id]
    discovery = discovery_engine.run(project.interview_messages)
    audience = audience_engine.run(discovery)
    positioning = positioning_engine.run(discovery, audience)
    personality = personality_engine.run(audience, positioning)
    creative = creative_engine.run(positioning, personality)
    critique = critic_engine.run(positioning, audience, creative)
    debate = debate_engine.run(positioning, audience, personality, creative, critique)
    consistency = consistency_engine.run(audience, positioning, personality, creative)
    final_brand = final_brand_engine.run(discovery, audience, positioning, personality, creative, critique, debate, consistency)
    return launch_kit_engine.run(final_brand)





if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
