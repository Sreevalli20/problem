# BrandForge AI

**From Idea to Brand Intelligence**

BrandForge AI transforms a founder's raw idea into a structured brand intelligence system using a self-contained rule-based engine. No external AI APIs required.

## Features

- **Adaptive Interview**: Context-aware question selection based on missing information
- **Discovery Engine**: Extracts product concept, problem, audience, and differentiators
- **Audience Analysis**: Generates user needs, pain points, motivations, and objections
- **Positioning Engine**: Creates category, value proposition, and positioning statements
- **Brand Personality**: Infers traits, emotional character, and communication style
- **Creative Direction**: Generates naming territories and visual direction recommendations
- **Anti-Generic Critic**: Detects clichés, vague claims, and generic language
- **Brand Debate**: Multi-perspective evaluation (Strategist, Audience, Creative Director, Skeptic)
- **Consistency Guardian**: Checks for contradictions across brand elements
- **Launch Kit**: Generates landing page copy, pitches, and social media content

## Tech Stack

### Backend
- Python 3.14.6
- FastAPI
- Pydantic v2
- Uvicorn

### Frontend
- React
- Vite
- TypeScript
- Tailwind CSS
- React Router

## Local Development

### Backend Setup

```bash
cd backend
pip install -r requirements.txt
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:5173` (or the next available port).

## Environment Variables

### Backend (.env)
```
FRONTEND_URL=http://localhost:5173
```

### Frontend (frontend/.env)
```
VITE_API_URL=http://localhost:8000
```

## API Endpoints

- `GET /api/health` - Health check
- `POST /api/projects` - Create a new project
- `GET /api/projects/{id}` - Get project details
- `POST /api/interview/message?project_id={id}` - Send interview message
- `POST /api/workflow/discovery?project_id={id}` - Run discovery analysis
- `POST /api/workflow/audience?project_id={id}` - Run audience analysis
- `POST /api/workflow/positioning?project_id={id}` - Run positioning analysis
- `POST /api/workflow/personality?project_id={id}` - Run personality analysis
- `POST /api/workflow/creative?project_id={id}` - Run creative analysis
- `POST /api/workflow/critique?project_id={id}` - Run critique analysis
- `POST /api/workflow/debate?project_id={id}` - Run debate analysis
- `POST /api/workflow/consistency?project_id={id}` - Run consistency analysis
- `POST /api/workflow/finalize?project_id={id}` - Generate final brand intelligence
- `POST /api/launch-kit?project_id={id}` - Generate launch kit

## Deployment

### Backend (Render)
The backend is configured for Render deployment via `render.yaml`.

### Frontend (Vercel)
The frontend is configured for Vercel deployment.

## Zero-API Intelligence Engine

BrandForge uses a self-contained rule-based engine that processes user input through:

1. **Text Normalization**: Clean and standardize input text
2. **Pattern Matching**: Extract entities using regex patterns
3. **Context Analysis**: Infer missing information from available context
4. **Rule-Based Critique**: Detect clichés and generic language using configurable dictionaries
5. **Multi-Perspective Evaluation**: Apply different evaluation criteria from multiple viewpoints
6. **Consistency Checking**: Compare outputs across stages for contradictions
7. **Template Composition**: Generate outputs based on extracted context

The engine operates entirely on the user's actual input without requiring external AI services.

## License

MIT
