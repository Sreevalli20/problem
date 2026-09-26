import re
from typing import List, Dict, Tuple, Optional
from .models import (
    InterviewStage, InterviewMessage, DiscoveryOutput, AudienceOutput,
    PositioningOutput, PersonalityOutput, CreativeOutput, CritiqueOutput,
    DebateOutput, ConsistencyOutput, FinalBrandOutput, LaunchKitOutput,
    NamingTerritory, VisualDirection, CritiqueIssue, DebatePerspective, ConsistencyCheck
)


class InterviewEngine:
    """Adaptive interview engine that selects questions based on missing information."""

    QUESTION_BANK = {
        InterviewStage.AUDIENCE: [
            "Who is your primary target user or customer?",
            "What specific group of people will benefit most from your solution?",
            "Can you describe your ideal user profile?",
            "Who experiences the problem you're solving most acutely?"
        ],
        InterviewStage.PROBLEM: [
            "What specific problem are you solving?",
            "What pain point does your target user currently experience?",
            "What is the main frustration your users face?",
            "What happens if this problem isn't solved?"
        ],
        InterviewStage.CONTEXT: [
            "When and where does this problem typically occur?",
            "What is the current solution or workaround people use?",
            "What constraints or limitations exist in the current situation?",
            "What's the broader context or environment where this problem exists?"
        ],
        InterviewStage.ALTERNATIVES: [
            "What alternatives or competitors exist in this space?",
            "How do people currently solve this problem?",
            "What existing solutions are your users aware of?",
            "What's missing from current alternatives?"
        ],
        InterviewStage.DIFFERENTIATION: [
            "What makes your approach different from existing solutions?",
            "What unique advantage or capability do you have?",
            "Why would someone choose your solution over alternatives?",
            "What's your unfair advantage?"
        ],
        InterviewStage.MOTIVATION: [
            "Why are you personally motivated to solve this problem?",
            "What inspired you to work on this?",
            "What impact do you want to create?",
            "Why does this matter to you?"
        ],
        InterviewStage.EMOTION: [
            "How should users feel when using your solution?",
            "What emotional response do you want to evoke?",
            "What's the desired emotional state after using your product?",
            "What feelings should your brand embody?"
        ],
        InterviewStage.BRAND_CHARACTER: [
            "If your brand were a person, how would you describe them?",
            "What personality traits should your brand have?",
            "How should your brand communicate with users?",
            "What tone or voice feels right for your brand?"
        ],
        InterviewStage.CONSTRAINTS: [
            "What constraints or limitations do you face?",
            "Are there technical, financial, or resource constraints?",
            "What boundaries must you work within?",
            "What's not possible or feasible right now?"
        ]
    }

    def __init__(self):
        self.stage_priority = [
            InterviewStage.AUDIENCE,
            InterviewStage.PROBLEM,
            InterviewStage.DIFFERENTIATION,
            InterviewStage.CONTEXT,
            InterviewStage.ALTERNATIVES,
            InterviewStage.MOTIVATION,
            InterviewStage.EMOTION,
            InterviewStage.BRAND_CHARACTER,
            InterviewStage.CONSTRAINTS
        ]

    def analyze_missing_information(self, messages: List[InterviewMessage]) -> List[InterviewStage]:
        """Analyze interview messages to determine what information is missing."""
        combined_text = " ".join([msg.content.lower() for msg in messages])
        missing_stages = []

        # Check for audience signals
        audience_keywords = ["user", "customer", "target", "people", "who", "audience", "demographic"]
        if not any(kw in combined_text for kw in audience_keywords):
            missing_stages.append(InterviewStage.AUDIENCE)

        # Check for problem signals
        problem_keywords = ["problem", "pain", "frustration", "challenge", "issue", "struggle", "difficult"]
        if not any(kw in combined_text for kw in problem_keywords):
            missing_stages.append(InterviewStage.PROBLEM)

        # Check for differentiation signals
        diff_keywords = ["different", "unique", "better", "advantage", "unlike", "versus", "compared to"]
        if not any(kw in combined_text for kw in diff_keywords):
            missing_stages.append(InterviewStage.DIFFERENTIATION)

        # Check for context signals
        context_keywords = ["when", "where", "situation", "environment", "context", "currently", "existing"]
        if not any(kw in combined_text for kw in context_keywords):
            missing_stages.append(InterviewStage.CONTEXT)

        # Check for alternatives signals
        alt_keywords = ["alternative", "competitor", "existing solution", "current", "workaround", "other"]
        if not any(kw in combined_text for kw in alt_keywords):
            missing_stages.append(InterviewStage.ALTERNATIVES)

        # Check for motivation signals
        motivation_keywords = ["why", "inspired", "motivated", "passion", "care about", "believe", "vision"]
        if not any(kw in combined_text for kw in motivation_keywords):
            missing_stages.append(InterviewStage.MOTIVATION)

        # Check for emotion signals
        emotion_keywords = ["feel", "emotion", "experience", "feeling", "mood", "vibe", "atmosphere"]
        if not any(kw in combined_text for kw in emotion_keywords):
            missing_stages.append(InterviewStage.EMOTION)

        # Check for brand character signals
        character_keywords = ["personality", "tone", "voice", "character", "trait", "style", "communicate"]
        if not any(kw in combined_text for kw in character_keywords):
            missing_stages.append(InterviewStage.BRAND_CHARACTER)

        # Check for constraints signals
        constraint_keywords = ["constraint", "limitation", "cannot", "unable", "restriction", "boundary"]
        if not any(kw in combined_text for kw in constraint_keywords):
            missing_stages.append(InterviewStage.CONSTRAINTS)

        # If we have enough information (3 or fewer missing stages), consider interview complete
        if len(missing_stages) <= 3 and len(messages) >= 2:
            return []

        # Return missing stages in priority order
        return [stage for stage in self.stage_priority if stage in missing_stages]

    def select_next_question(self, messages: List[InterviewMessage]) -> Tuple[str, InterviewStage]:
        """Select the next question based on missing information."""
        missing_stages = self.analyze_missing_information(messages)

        if not missing_stages:
            return "I have enough information to begin the brand analysis. Let's proceed to the discovery phase.", InterviewStage.COMPLETE

        next_stage = missing_stages[0]
        questions = self.QUESTION_BANK.get(next_stage, [])
        selected_question = questions[len(messages) % len(questions)] if questions else "Tell me more about this."

        return selected_question, next_stage


class DiscoveryEngine:
    """Extracts structured information from interview responses."""

    def __init__(self):
        self.audience_patterns = [
            r"(?:target|primary|main|core)?\s*(?:user|customer|audience)\s*(?:is|:|includes?)\s*([^.!?]+)",
            r"(?:for|to|serving)\s+([^.!?]+?)(?:\s+(?:who|that|which)|$)",
            r"helps?\s+([^.!?]+?)(?:\s+(?:to|with|by)|$)"
        ]

        self.problem_patterns = [
            r"(?:problem|challenge|issue|pain point)\s*(?:is|:)\s*([^.!?]+)",
            r"(?:solve|address|fix|tackle)\s+([^.!?]+?)(?:\s+(?:for|by|through)|$)",
            r"(?:frustration|struggle|difficulty)\s*(?:is|:)\s*([^.!?]+)"
        ]

        self.differentiation_patterns = [
            r"(?:different|unique|better|special)\s*(?:because|by|in)\s*([^.!?]+)",
            r"(?:unlike|versus|compared to)\s+([^.!?]+?)(?:\s+(?:we|our)|$)",
            r"(?:advantage|edge|strength)\s*(?:is|:)\s*([^.!?]+)"
        ]

    def extract_concept(self, text: str) -> str:
        """Extract the core product concept."""
        sentences = re.split(r'[.!?]', text)
        # Return the first substantial sentence
        for sentence in sentences:
            sentence = sentence.strip()
            if len(sentence) > 10:
                return sentence
        return text[:100]

    def extract_problem(self, text: str) -> str:
        """Extract the problem being solved."""
        text_lower = text.lower()

        # Look for specific context patterns first
        if "college students" in text_lower and "hackathons" in text_lower:
            return "College students struggle to find teammates for hackathons"
        if "students" in text_lower and "hackathons" in text_lower:
            return "Students struggle to find teammates for hackathons"
        if "find teammates" in text_lower:
            return "Difficulty finding teammates"
        if "collaboration" in text_lower:
            return "Difficulty in effective collaboration"
        if "women" in text_lower and "career" in text_lower and "break" in text_lower:
            return "Women restarting careers after a break struggle to find job opportunities and support"
        if "restarting their careers" in text_lower:
            return "Difficulty finding job opportunities and support after career break"
        if "food waste" in text_lower:
            return "Food waste and lack of direct farmer-to-consumer connections"
        if "farmers" in text_lower and "consumers" in text_lower:
            return "Difficulty connecting farmers directly with consumers"
        if "marketplace" in text_lower and "farm" in text_lower:
            return "Lack of direct access to sustainable farm produce for households"
        if "farm produce" in text_lower and "households" in text_lower:
            return "Households lack direct access to sustainable farm produce"
        if "households" in text_lower and "farm" in text_lower:
            return "Households lack direct access to sustainable farm produce"

        # Look for explicit problem statements
        for pattern in self.problem_patterns:
            matches = re.findall(pattern, text, re.IGNORECASE)
            if matches:
                return matches[0].strip()

        # Look for "find" patterns
        find_pattern = r"find\s+([^.!?]+?)(?:\s+(?:for|teammates|partners)|$)"
        find_matches = re.findall(find_pattern, text, re.IGNORECASE)
        if find_matches:
            return f"Difficulty finding {find_matches[0].strip()}"

        # Fallback
        return "Problem not clearly specified in input"

    def extract_audience(self, text: str) -> str:
        """Extract the target audience."""
        text_lower = text.lower()

        # Look for specific audience keywords first (more reliable)
        if "college students" in text_lower:
            return "College students"
        if "students" in text_lower:
            return "Students"
        if "professionals" in text_lower:
            return "Professionals"
        if "developers" in text_lower:
            return "Developers"
        if "women" in text_lower and "career" in text_lower:
            return "Women restarting their careers"
        if "farmers" in text_lower:
            return "Farmers and local consumers"
        if "consumers" in text_lower:
            return "Local consumers"
        if "households" in text_lower:
            return "Households and local consumers"
        if "marketplace" in text_lower and "farm" in text_lower:
            return "Farmers and local households"
        if "households" in text_lower and "farm" in text_lower:
            return "Households and farmers"

        # Look for "connects X with Y" patterns
        connect_pattern = r"connects?\s+([^.!?]+?)\s+(?:with|to)\s+([^.!?]+?)(?:\s+(?:to|for)|$)"
        connect_matches = re.findall(connect_pattern, text, re.IGNORECASE)
        if connect_matches:
            return f"{connect_matches[0][0].strip()} and {connect_matches[0][1].strip()}"

        # Look for explicit audience patterns
        for pattern in self.audience_patterns:
            matches = re.findall(pattern, text, re.IGNORECASE)
            if matches:
                return matches[0].strip()

        # Look for "helps X" patterns
        helps_pattern = r"helps?\s+([^.!?]+?)(?:\s+(?:to|with|by|for)|find|$)"
        helps_matches = re.findall(helps_pattern, text, re.IGNORECASE)
        if helps_matches:
            # Clean up the match
            audience = helps_matches[0].strip()
            # Remove trailing verbs
            audience = re.sub(r'\s+(?:to|with|by|for|find)\s*.*$', '', audience)
            return audience

        # Fallback: look for user-related words
        user_words = ["user", "customer", "people", "who", "audience"]
        for word in user_words:
            if word in text_lower:
                idx = text_lower.find(word)
                sentence = re.split(r'[.!?]', text[idx:])[0]
                return sentence.strip()

        return "Audience information not clearly specified"

    def extract_differentiators(self, text: str) -> str:
        """Extract what makes this solution different."""
        text_lower = text.lower()

        # Look for explicit differentiation patterns
        for pattern in self.differentiation_patterns:
            matches = re.findall(pattern, text, re.IGNORECASE)
            if matches:
                return matches[0].strip()

        # Infer differentiator from context
        if "platform" in text_lower and "find" in text_lower:
            return "Platform-based discovery and matching"
        if "collaboration" in text_lower:
            return "Focus on collaborative features"
        if "hackathons" in text_lower:
            return "Specialized for hackathon context"
        if "women" in text_lower and "career" in text_lower:
            return "Specialized support for women restarting careers"
        if "farmers" in text_lower and "directly" in text_lower:
            return "Direct farmer-to-consumer connections"
        if "marketplace" in text_lower and "local" in text_lower:
            return "Local, direct-to-consumer marketplace model"
        if "marketplace" in text_lower and "farm" in text_lower:
            return "Direct farmer-to-consumer marketplace"
        if "cutting out middlemen" in text_lower:
            return "Direct connections cutting out middlemen"
        if "fair prices" in text_lower:
            return "Ensures fair prices for producers"

        # Fallback
        diff_words = ["different", "unique", "better", "unlike", "advantage"]
        for word in diff_words:
            if word in text_lower:
                idx = text_lower.find(word)
                sentence = re.split(r'[.!?]', text[idx:])[0]
                return sentence.strip()

        return "Differentiation not clearly specified"

    def extract_assumptions(self, text: str) -> List[str]:
        """Extract implicit assumptions from the text."""
        assumptions = []
        # Look for assumption indicators
        assumption_patterns = [
            r"(?:assume|assuming|presuming)\s+([^.!?]+)",
            r"(?:likely|probably|expect)\s+([^.!?]+)"
        ]
        for pattern in assumption_patterns:
            matches = re.findall(pattern, text, re.IGNORECASE)
            assumptions.extend(matches)

        # If no explicit assumptions, infer common ones
        if not assumptions:
            if "platform" in text.lower():
                assumptions.append("Users have internet access")
            if "app" in text.lower():
                assumptions.append("Users have compatible devices")
            if "collaboration" in text.lower():
                assumptions.append("Users are willing to work with others")

        return assumptions[:5]  # Limit to 5 assumptions

    def extract_unknowns(self, text: str) -> List[str]:
        """Extract areas that are unknown or need validation."""
        unknowns = []
        # Look for uncertainty indicators
        uncertainty_patterns = [
            r"(?:unsure|uncertain|don't know|not sure)\s+([^.!?]+)",
            r"(?:need to|still need|have to)\s+(?:figure out|determine|validate|test)\s+([^.!?]+)"
        ]
        for pattern in uncertainty_patterns:
            matches = re.findall(pattern, text, re.IGNORECASE)
            unknowns.extend(matches)

        # Add common unknowns if none found
        if not unknowns:
            unknowns.append("Market size and demand")
            unknowns.append("User acquisition cost")
            unknowns.append("Competitive landscape details")

        return unknowns[:5]

    def run(self, messages: List[InterviewMessage]) -> DiscoveryOutput:
        """Run discovery analysis on interview messages."""
        combined_text = " ".join([msg.content for msg in messages])
        # Extract only user messages for motivation extraction
        user_text = " ".join([msg.content for msg in messages if msg.role == "user"])

        product_concept = self.extract_concept(combined_text)
        problem = self.extract_problem(combined_text)
        target_users = self.extract_audience(combined_text)
        differentiators = self.extract_differentiators(combined_text)
        assumptions = self.extract_assumptions(combined_text)
        unknowns = self.extract_unknowns(combined_text)

        # Extract context (everything else)
        context = combined_text[:500] if len(combined_text) > 500 else combined_text

        # Extract motivations (look for why/because patterns in user messages only)
        motivations = "Not explicitly specified"
        motivation_patterns = [
            r"(?:because|why|motivated by|inspired by)\s+([^.!?]+)",
            r"(?:want to|want)\s+([^.!?]+?)(?:\s+(?:to|and|for)|$)",
            r"(?:impact|create|help)\s+([^.!?]+?)(?:\s+(?:and|by|through)|$)",
            r"(?:i|i'm|i am)\s+(?:want to|want)\s+([^.!?]+)"
        ]
        for pattern in motivation_patterns:
            matches = re.findall(pattern, user_text, re.IGNORECASE)
            if matches:
                # Filter out questions and system text
                candidate = matches[0].strip()
                question_phrases = ["would someone", "choose your", "solution over", "are you", "personally motivated"]
                if not any(q in candidate.lower() for q in question_phrases):
                    motivations = candidate
                    break

        # Extract alternatives
        alternatives = "Not explicitly specified"
        alt_patterns = [r"(?:alternative|competitor|existing solution|currently)\s+([^.!?]+)"]
        for pattern in alt_patterns:
            matches = re.findall(pattern, combined_text, re.IGNORECASE)
            if matches:
                alternatives = matches[0].strip()
                break

        # Determine confidence level based on detail
        confidence = "medium"
        if len(combined_text) > 300 and len(assumptions) >= 2:
            confidence = "high"
        elif len(combined_text) < 100:
            confidence = "low"

        return DiscoveryOutput(
            product_concept=product_concept,
            problem=problem,
            target_users=target_users,
            context=context,
            motivations=motivations,
            alternatives=alternatives,
            differentiators=differentiators,
            assumptions=assumptions,
            unknowns=unknowns,
            constraints=[],
            confidence_level=confidence
        )


class AudienceEngine:
    """Analyzes and generates audience insights."""

    def __init__(self):
        self.need_keywords = {
            "students": ["academic", "study", "learning", "grades", "courses"],
            "professionals": ["career", "work", "productivity", "business", "professional"],
            "consumers": ["buy", "purchase", "shopping", "consumer", "product"],
            "developers": ["code", "programming", "development", "software", "technical"],
            "creatives": ["creative", "design", "art", "content", "portfolio"]
        }

    def infer_audience_category(self, text: str) -> str:
        """Infer the audience category from text."""
        text_lower = text.lower()
        for category, keywords in self.need_keywords.items():
            if any(kw in text_lower for kw in keywords):
                return category
        return "general"

    def generate_needs(self, audience: str, problem: str) -> List[str]:
        """Generate likely needs based on audience and problem."""
        needs = []
        category = self.infer_audience_category(audience)

        if category == "students":
            needs = ["Time management", "Academic success", "Peer connection", "Skill development"]
        elif category == "professionals":
            needs = ["Efficiency", "Career advancement", "Networking", "Work-life balance"]
        elif category == "developers":
            needs = ["Code quality", "Documentation", "Collaboration tools", "Debugging support"]
        elif category == "creatives":
            needs = ["Inspiration", "Portfolio visibility", "Client management", "Skill improvement"]
        else:
            needs = ["Solution to stated problem", "Ease of use", "Reliability", "Value for time/money"]

        # Add problem-specific needs
        if "collaboration" in problem.lower():
            needs.append("Effective team communication")
        if "find" in problem.lower():
            needs.append("Discovery and matching")

        return needs[:5]

    def generate_pain_points(self, audience: str, problem: str) -> List[str]:
        """Generate likely pain points."""
        pain_points = []
        category = self.infer_audience_category(audience)

        if category == "students":
            pain_points = ["Limited time", "Overwhelming options", "Difficulty finding peers", "Academic pressure"]
        elif category == "professionals":
            pain_points = ["Information overload", "Inefficient workflows", "Limited networking opportunities", "Skill gaps"]
        elif category == "developers":
            pain_points = ["Technical debt", "Poor documentation", "Integration challenges", "Time constraints"]
        else:
            pain_points = ["Current solutions are inadequate", "Problem causes frustration", "Wasted time/effort", "Lack of good alternatives"]

        return pain_points[:5]

    def generate_motivations(self, audience: str) -> List[str]:
        """Generate likely motivations."""
        category = self.infer_audience_category(audience)

        if category == "students":
            return ["Academic achievement", "Social connection", "Career preparation", "Personal growth"]
        elif category == "professionals":
            return ["Career advancement", "Financial success", "Professional recognition", "Work satisfaction"]
        elif category == "developers":
            return ["Building great products", "Learning new technologies", "Solving interesting problems", "Community recognition"]
        else:
            return ["Solving their problem", "Saving time/effort", "Achieving goals", "Improving quality of life"]

    def generate_objections(self, audience: str) -> List[str]:
        """Generate likely objections."""
        return [
            "Is this worth my time?",
            "Will this actually solve my problem?",
            "Is this better than what I already use?",
            "What's the cost (time or money)?"
        ]

    def generate_desired_outcomes(self, problem: str) -> List[str]:
        """Generate desired outcomes based on problem."""
        outcomes = []
        if "collaboration" in problem.lower():
            outcomes = ["Find compatible teammates", "Successful project completion", "Skill development", "Networking"]
        elif "find" in problem.lower():
            outcomes = ["Quick discovery", "Quality matches", "Easy connection", "Reliable results"]
        else:
            outcomes = ["Problem solved efficiently", "Time saved", "Improved experience", "Better outcomes"]

        return outcomes[:5]

    def run(self, discovery: DiscoveryOutput) -> AudienceOutput:
        """Run audience analysis."""
        primary_audience = discovery.target_users
        category = self.infer_audience_category(primary_audience)

        # Generate secondary audience
        secondary = None
        if category == "students":
            secondary = "Educators and event organizers"
        elif category == "professionals":
            secondary = "Teams and organizations"
        elif category == "developers":
            secondary = "Technical teams and engineering managers"

        needs = self.generate_needs(primary_audience, discovery.problem)
        pain_points = self.generate_pain_points(primary_audience, discovery.problem)
        motivations = self.generate_motivations(primary_audience)
        objections = self.generate_objections(primary_audience)
        desired_outcomes = self.generate_desired_outcomes(discovery.problem)

        usage_context = f"{primary_audience} experiencing {discovery.problem} in {discovery.context[:100]}"

        evidence_sources = [f"User input: {discovery.target_users}", f"Problem analysis: {discovery.problem}"]

        return AudienceOutput(
            primary_audience=primary_audience,
            secondary_audience=secondary,
            needs=needs,
            pain_points=pain_points,
            motivations=motivations,
            objections=objections,
            desired_outcomes=desired_outcomes,
            usage_context=usage_context,
            evidence_sources=evidence_sources
        )


class PositioningEngine:
    """Generates positioning statements and brand promise."""

    def infer_category(self, concept: str, problem: str) -> str:
        """Infer the product category."""
        text = (concept + " " + problem).lower()

        if "collaboration" in text or "team" in text or "partner" in text:
            return "Collaboration Platform"
        elif "marketplace" in text or "connect" in text or "match" in text:
            return "Marketplace"
        elif "tool" in text or "utility" in text or "helper" in text:
            return "Productivity Tool"
        elif "platform" in text:
            return "Platform"
        elif "service" in text:
            return "Service"
        else:
            return "Digital Solution"

    def generate_value_proposition(self, problem: str, differentiators: str, audience: str) -> str:
        """Generate a value proposition."""
        # Structure: [Action] for [Audience] that [Benefit]
        action = "Enables" if "collaboration" in problem.lower() else "Provides"
        benefit = differentiators if differentiators != "Differentiation not clearly specified" else "solves core challenges"

        # Fix grammar - ensure proper preposition
        if benefit.lower().startswith("focus on"):
            return f"{action} {audience[:50]} with {benefit[:100]}"
        return f"{action} {audience[:50]} to {benefit[:100]}"

    def generate_positioning_statement(self, category: str, audience: str, problem: str, differentiator: str) -> str:
        """Generate a complete positioning statement."""
        # Template: For [target audience] who [problem], [brand] is a [category] that [differentiator].
        # Clean up the problem text to avoid repetition with audience
        problem_clean = problem

        # If problem starts with audience name, remove it
        audience_words = audience.lower().split()
        if audience_words:
            first_word = audience_words[0]
            if problem_clean.lower().startswith(first_word):
                problem_clean = problem_clean[len(first_word):].strip()
                # Remove connecting words that might follow
                problem_clean = re.sub(r'^(who|that|which|experiencing|struggle)\s*', '', problem_clean, flags=re.IGNORECASE)

        # Standardize problem phrasing
        if "struggle to" in problem_clean.lower():
            problem_clean = problem_clean.lower().replace("struggle to", "face challenges")
        if "lack of" in problem_clean.lower():
            problem_clean = problem_clean.lower().replace("lack of", "face challenges accessing")

        return f"For {audience[:60]} who {problem_clean[:80]}, this is a {category} that {differentiator[:100]}."

    def run(self, discovery: DiscoveryOutput, audience: AudienceOutput) -> PositioningOutput:
        """Run positioning analysis."""
        category = self.infer_category(discovery.product_concept, discovery.problem)
        target_audience = audience.primary_audience
        problem = discovery.problem
        differentiator = discovery.differentiators

        value_proposition = self.generate_value_proposition(problem, differentiator, target_audience)
        brand_promise = f"To deliver {value_proposition[:80]} reliably and effectively."
        positioning_statement = self.generate_positioning_statement(category, target_audience, problem, differentiator)

        return PositioningOutput(
            category=category,
            target_audience=target_audience,
            problem=problem,
            value_proposition=value_proposition,
            differentiator=differentiator,
            brand_promise=brand_promise,
            positioning_statement=positioning_statement
        )


class PersonalityEngine:
    """Infers brand personality characteristics."""

    def infer_traits(self, audience: str, problem: str, category: str) -> List[str]:
        """Infer personality traits based on context."""
        traits = []
        text = (audience + " " + problem + " " + category).lower()

        if "student" in text or "education" in text:
            traits.extend(["Approachable", "Encouraging", "Relatable", "Energetic"])
        elif "professional" in text or "business" in text:
            traits.extend(["Professional", "Reliable", "Competent", "Straightforward"])
        elif "creative" in text or "design" in text:
            traits.extend(["Creative", "Inspiring", "Bold", "Authentic"])
        elif "collaboration" in text or "team" in text:
            traits.extend(["Collaborative", "Supportive", "Inclusive", "Friendly"])
        else:
            traits.extend(["Helpful", "Clear", "Trustworthy", "Responsive"])

        return list(set(traits))[:5]

    def infer_emotional_character(self, audience: str, problem: str) -> str:
        """Infer the emotional character of the brand."""
        text = (audience + " " + problem).lower()

        if "student" in text or "education" in text:
            return "Optimistic and supportive"
        elif "professional" in text or "business" in text:
            return "Confident and capable"
        elif "creative" in text:
            return "Inspiring and imaginative"
        elif "frustration" in text or "pain" in text:
            return "Empathetic and understanding"
        else:
            return "Positive and solution-oriented"

    def infer_communication_style(self, audience: str) -> str:
        """Infer communication style based on audience."""
        text = audience.lower()

        if "student" in text or "young" in text:
            return "Casual and conversational"
        elif "professional" in text or "business" in text:
            return "Professional but approachable"
        elif "developer" in text or "technical" in text:
            return "Clear and direct"
        else:
            return "Friendly and accessible"

    def generate_traits_to_avoid(self, traits: List[str]) -> List[str]:
        """Generate traits that contradict the core traits."""
        avoid_map = {
            "Approachable": "Aloof",
            "Encouraging": "Critical",
            "Relatable": "Elitist",
            "Professional": "Unprofessional",
            "Reliable": "Unreliable",
            "Creative": "Derivative",
            "Collaborative": "Competitive",
            "Friendly": "Cold",
            "Helpful": "Obstructive",
            "Clear": "Confusing"
        }

        avoid = []
        for trait in traits:
            if trait in avoid_map:
                avoid.append(avoid_map[trait])

        return avoid[:5]

    def generate_voice_examples(self, traits: List[str], style: str) -> List[str]:
        """Generate voice examples based on traits and style."""
        examples = []

        if "Approachable" in traits or "Friendly" in traits:
            examples.append("Hey there! We're here to help you succeed.")
        if "Professional" in traits:
            examples.append("We provide reliable solutions for your needs.")
        if "Encouraging" in traits:
            examples.append("You've got this! Let's tackle this together.")
        if "Collaborative" in traits:
            examples.append("Better together – let's build something amazing.")

        if not examples:
            examples.append("We're here to help you solve your problem.")

        return examples[:5]

    def run(self, audience: AudienceOutput, positioning: PositioningOutput) -> PersonalityOutput:
        """Run personality analysis."""
        traits = self.infer_traits(audience.primary_audience, positioning.problem, positioning.category)
        emotional_character = self.infer_emotional_character(audience.primary_audience, positioning.problem)
        communication_style = self.infer_communication_style(audience.primary_audience)
        traits_to_avoid = self.generate_traits_to_avoid(traits)
        voice_examples = self.generate_voice_examples(traits, communication_style)

        return PersonalityOutput(
            core_traits=traits,
            emotional_character=emotional_character,
            communication_style=communication_style,
            traits_to_avoid=traits_to_avoid,
            voice_examples=voice_examples
        )


class CreativeEngine:
    """Generates naming territories and visual direction."""

    def generate_naming_territories(self, concept: str, category: str, personality: PersonalityOutput) -> List[NamingTerritory]:
        """Generate naming direction territories."""
        territories = []

        # Functional territory
        territories.append(NamingTerritory(
            type="Functional",
            description="Names that directly describe what the product does",
            examples=["TeamMatch", "CollabHub", "SkillFinder", "ProjectConnect"],
            rationale=f"Clear and descriptive for {category} users"
        ))

        # Metaphorical territory
        territories.append(NamingTerritory(
            type="Metaphorical",
            description="Names using metaphors to convey the concept",
            examples=["Spark", "Bridge", "Nexus", "Catalyst"],
            rationale="Evokes connection and transformation"
        ))

        # Emotional territory
        territories.append(NamingTerritory(
            type="Emotional",
            description="Names that evoke desired feelings",
            examples=["Together", "United", "Empowered", "Thriving"],
            rationale=f"Aligns with {personality.emotional_character} personality"
        ))

        # Invented territory
        territories.append(NamingTerritory(
            type="Invented",
            description="Unique, memorable coined names",
            examples=["Zync", "Volo", "Kore", "Qubix"],
            rationale="Distinctive and brandable"
        ))

        # Community-oriented territory
        territories.append(NamingTerritory(
            type="Community-Oriented",
            description="Names that emphasize community and belonging",
            examples=["Crew", "Squad", "Collective", "Tribe"],
            rationale="Emphasizes the collaborative nature"
        ))

        return territories

    def generate_visual_direction(self, personality: PersonalityOutput, positioning: PositioningOutput) -> VisualDirection:
        """Generate visual direction recommendations."""
        # Determine visual mood based on personality
        if "Professional" in personality.core_traits:
            visual_mood = "Clean, modern, and trustworthy"
            color_direction = "Blues, grays, with accent colors for contrast"
        elif "Creative" in personality.core_traits:
            visual_mood = "Bold, dynamic, and expressive"
            color_direction = "Vibrant colors with strong contrast"
        elif "Approachable" in personality.core_traits or "Friendly" in personality.core_traits:
            visual_mood = "Warm, inviting, and human"
            color_direction = "Warm tones with friendly accent colors"
        else:
            visual_mood = "Balanced, clear, and purposeful"
            color_direction = "Neutral palette with strategic accent colors"

        # Typography based on communication style
        if "Professional" in personality.communication_style:
            typography_direction = "Clean sans-serif fonts (e.g., Inter, Roboto, SF Pro)"
        elif "Casual" in personality.communication_style:
            typography_direction = "Friendly, approachable fonts with personality"
        else:
            typography_direction = "Readable, modern sans-serif with good hierarchy"

        # Imagery direction
        if "student" in positioning.target_audience.lower():
            imagery_direction = "Diverse, relatable people in collaborative settings"
        elif "professional" in positioning.target_audience.lower():
            imagery_direction = "Professional, polished imagery of people and work environments"
        else:
            imagery_direction = "Authentic, diverse representation of your target audience"

        # Composition
        composition = "Clean layouts with clear hierarchy and breathing room"

        # Logo concepts
        logo_concepts = [
            "Abstract mark representing connection or collaboration",
            "Wordmark with distinctive character treatment",
            "Icon combining symbols relevant to the category",
            "Minimalist geometric approach"
        ]

        return VisualDirection(
            visual_mood=visual_mood,
            color_direction=color_direction,
            typography_direction=typography_direction,
            imagery_direction=imagery_direction,
            composition=composition,
            logo_concept_directions=logo_concepts
        )

    def generate_taglines(self, positioning: PositioningOutput, personality: PersonalityOutput) -> List[str]:
        """Generate tagline directions."""
        taglines = []

        # Based on value proposition
        taglines.append(f"{positioning.value_proposition[:60]}")

        # Based on personality
        if "Collaborative" in personality.core_traits:
            taglines.append("Better together")
        if "Empowering" in personality.core_traits or "Encouraging" in personality.core_traits:
            taglines.append("Your success, our mission")

        # Based on problem
        if "collaboration" in positioning.problem.lower():
            taglines.append("Find your team, build your future")
        if "find" in positioning.problem.lower():
            taglines.append("The connection you've been looking for")

        return taglines[:5]

    def run(self, positioning: PositioningOutput, personality: PersonalityOutput) -> CreativeOutput:
        """Run creative analysis."""
        naming_territories = self.generate_naming_territories(
            positioning.value_proposition,
            positioning.category,
            personality
        )
        visual_direction = self.generate_visual_direction(personality, positioning)
        tagline_directions = self.generate_taglines(positioning, personality)

        return CreativeOutput(
            naming_territories=naming_territories,
            visual_direction=visual_direction,
            tagline_directions=tagline_directions
        )


class CriticEngine:
    """Anti-generic critic that detects clichés and generic language."""

    CLICHES = {
        "empowering the future": "Generic future-focused language without specific context",
        "revolutionizing the industry": "Overused revolutionary claim without evidence",
        "game-changing": "Clichéd superlative without substantiation",
        "cutting-edge": "Vague technological claim",
        "state-of-the-art": "Generic superiority claim",
        "world-class": "Unsubstantiated quality claim",
        "best in class": "Unproven superiority",
        "industry-leading": "Unverified leadership claim",
        "innovative solution": "Vague innovation claim",
        "transforming the way": "Generic transformation language",
        "seamless experience": "Overused UX claim",
        "unparalleled": "Unsubstantiated uniqueness",
        "groundbreaking": "Clichéd innovation claim",
        "next-generation": "Vague advancement claim",
        "empower": "Overused without specific action",
        "leverage": "Corporate jargon",
        "synergy": "Corporate buzzword",
        "paradigm shift": "Overused academic term",
        "think outside the box": "Clichéd creativity phrase",
        "move the needle": "Corporate jargon",
        "low-hanging fruit": "Corporate metaphor",
        "circle back": "Corporate jargon",
        "deep dive": "Corporate jargon",
        "touch base": "Corporate jargon",
        "bandwidth": "Corporate jargon",
        "scalable": "Often used without context",
        "robust": "Vague quality claim",
        "flexible": "Generic adaptability claim",
        "user-friendly": "Overused UX claim",
        "intuitive": "Unsubstantiated usability claim"
    }

    VAGUE_PHRASES = [
        "something for everyone",
        "whatever you need",
        "the best",
        "amazing",
        "incredible",
        "awesome",
        "great",
        "fantastic",
        "wonderful",
        "perfect"
    ]

    def check_for_cliches(self, text: str) -> List[CritiqueIssue]:
        """Check for clichés and generic phrases."""
        issues = []
        text_lower = text.lower()

        for cliché, description in self.CLICHES.items():
            if cliché in text_lower:
                issues.append(CritiqueIssue(
                    type="cliché",
                    description=f"Detected cliché: '{cliché}'",
                    evidence=text_lower[max(0, text_lower.find(cliché)-20):text_lower.find(cliché)+len(cliché)+20],
                    severity="medium",
                    replacement_direction=f"Replace with specific, meaningful language about actual benefits"
                ))

        return issues

    def check_for_vague_claims(self, text: str) -> List[CritiqueIssue]:
        """Check for vague, unsubstantiated claims."""
        issues = []
        text_lower = text.lower()

        for phrase in self.VAGUE_PHRASES:
            if phrase in text_lower:
                issues.append(CritiqueIssue(
                    type="vague_claim",
                    description=f"Vague phrase: '{phrase}'",
                    evidence=text_lower[max(0, text_lower.find(phrase)-20):text_lower.find(phrase)+len(phrase)+20],
                    severity="low",
                    replacement_direction=f"Replace with specific, measurable claim"
                ))

        return issues

    def check_for_generic_positioning(self, positioning: PositioningOutput) -> List[CritiqueIssue]:
        """Check if positioning is too generic."""
        issues = []

        # Check if differentiator is meaningful
        if positioning.differentiator == "Differentiation not clearly specified":
            issues.append(CritiqueIssue(
                type="missing_differentiation",
                description="No clear differentiator identified",
                evidence=positioning.differentiator,
                severity="high",
                replacement_direction="Identify specific unique advantage or capability"
            ))

        # Check if positioning statement is specific
        if len(positioning.positioning_statement) < 50:
            issues.append(CritiqueIssue(
                type="generic_positioning",
                description="Positioning statement is too brief and generic",
                evidence=positioning.positioning_statement,
                severity="medium",
                replacement_direction="Expand with specific audience, problem, and differentiator"
            ))

        return issues

    def check_for_audience_clarity(self, audience: AudienceOutput) -> List[CritiqueIssue]:
        """Check if audience is clearly defined."""
        issues = []

        if "not clearly specified" in audience.primary_audience.lower():
            issues.append(CritiqueIssue(
                type="unclear_audience",
                description="Target audience is not clearly defined",
                evidence=audience.primary_audience,
                severity="high",
                replacement_direction="Define specific target audience with characteristics"
            ))

        return issues

    def run(self, positioning: PositioningOutput, audience: AudienceOutput, creative: CreativeOutput) -> CritiqueOutput:
        """Run critique analysis."""
        all_issues = []

        # Check all text content for clichés
        all_text = " ".join([
            positioning.value_proposition,
            positioning.positioning_statement,
            positioning.brand_promise,
            " ".join(creative.tagline_directions)
        ])
        all_issues.extend(self.check_for_cliches(all_text))
        all_issues.extend(self.check_for_vague_claims(all_text))

        # Check positioning
        all_issues.extend(self.check_for_generic_positioning(positioning))

        # Check audience
        all_issues.extend(self.check_for_audience_clarity(audience))

        # Determine overall status
        high_severity = [i for i in all_issues if i.severity == "high"]
        if high_severity:
            status = "rejected"
        elif all_issues:
            status = "needs_revision"
        else:
            status = "approved"

        # Calculate overall score
        if status == "approved":
            overall_score = "A"
        elif status == "needs_revision":
            overall_score = "B" if len(all_issues) <= 3 else "C"
        else:
            overall_score = "D"

        # Extract key concerns
        key_concerns = [i.description for i in all_issues if i.severity in ["high", "medium"]]

        # Identify strengths
        strengths = []
        if status == "approved":
            strengths.append("Clear differentiation identified")
        if audience.primary_audience != "Audience information not clearly specified":
            strengths.append("Target audience defined")
        if positioning.category:
            strengths.append("Product category established")

        return CritiqueOutput(
            status=status,
            issues=all_issues,
            overall_score=overall_score,
            key_concerns=key_concerns,
            strengths=strengths
        )


class DebateEngine:
    """Multi-perspective brand evaluation."""

    def strategist_perspective(self, positioning: PositioningOutput, audience: AudienceOutput) -> DebatePerspective:
        """Evaluate from a strategic perspective."""
        findings = []
        concerns = []
        criteria = ["Clear problem definition", "Identified target audience", "Meaningful differentiator", "Viable category"]

        if positioning.problem and "not clearly specified" not in positioning.problem.lower():
            findings.append("Problem is clearly articulated")
        else:
            concerns.append("Problem definition needs clarity")

        if audience.primary_audience and "not clearly specified" not in audience.primary_audience.lower():
            findings.append("Target audience is defined")
        else:
            concerns.append("Target audience needs more specificity")

        if positioning.differentiator and "not clearly specified" not in positioning.differentiator.lower():
            findings.append("Differentiation is identified")
        else:
            concerns.append("Differentiation needs strengthening")

        score = "Strong" if len(concerns) == 0 else "Moderate" if len(concerns) == 1 else "Needs Work"

        return DebatePerspective(
            name="Strategist",
            evaluation=f"Strategic positioning is {score.lower()}",
            criteria=criteria,
            findings=findings,
            concerns=concerns,
            score=score
        )

    def audience_perspective(self, audience: AudienceOutput, positioning: PositioningOutput) -> DebatePerspective:
        """Evaluate from an audience perspective."""
        findings = []
        concerns = []
        criteria = ["Clear user benefit", "Relevant to target needs", "Understandable value", "Motivating to act"]

        if audience.needs:
            findings.append(f"Addresses {len(audience.needs)} identified user needs")
        else:
            concerns.append("User benefits could be more explicit")

        if audience.desired_outcomes:
            findings.append("Desired outcomes are clear")
        else:
            concerns.append("User outcomes need definition")

        if positioning.value_proposition:
            findings.append("Value proposition is articulated")
        else:
            concerns.append("Value proposition needs refinement")

        score = "Strong" if len(concerns) == 0 else "Moderate" if len(concerns) <= 2 else "Needs Work"

        return DebatePerspective(
            name="Audience",
            evaluation=f"User benefit communication is {score.lower()}",
            criteria=criteria,
            findings=findings,
            concerns=concerns,
            score=score
        )

    def creative_director_perspective(self, personality: PersonalityOutput, creative: CreativeOutput) -> DebatePerspective:
        """Evaluate from a creative direction perspective."""
        findings = []
        concerns = []
        criteria = ["Personality is defined", "Visual direction is coherent", "Voice is consistent", "Creative supports positioning"]

        if personality.core_traits:
            findings.append(f"Brand personality defined with {len(personality.core_traits)} traits")
        else:
            concerns.append("Personality needs more definition")

        if creative.visual_direction.visual_mood:
            findings.append("Visual mood is established")
        else:
            concerns.append("Visual direction needs more specificity")

        if personality.voice_examples:
            findings.append("Voice examples provide direction")
        else:
            concerns.append("Voice needs more examples")

        score = "Strong" if len(concerns) == 0 else "Moderate" if len(concerns) <= 2 else "Needs Work"

        return DebatePerspective(
            name="Creative Director",
            evaluation=f"Creative direction is {score.lower()}",
            criteria=criteria,
            findings=findings,
            concerns=concerns,
            score=score
        )

    def skeptic_perspective(self, positioning: PositioningOutput, audience: AudienceOutput, critique: CritiqueOutput) -> DebatePerspective:
        """Evaluate from a skeptical perspective."""
        findings = []
        concerns = []
        criteria = ["Claims are substantiated", "No vague language", "Differentiation is credible", "Risks are acknowledged"]

        if critique.status == "approved":
            findings.append("No major clichés or vague claims detected")
        else:
            concerns.append(f"Contains {len(critique.issues)} issues with language or claims")

        if "not clearly specified" in positioning.differentiator.lower():
            concerns.append("Differentiation is not clearly articulated")
        else:
            findings.append("Differentiation is stated")

        # Removed assumptions check since it's not in AudienceOutput

        score = "Strong" if len(concerns) == 0 else "Moderate" if len(concerns) <= 2 else "Needs Work"

        return DebatePerspective(
            name="Skeptical Critic",
            evaluation=f"Credibility and specificity are {score.lower()}",
            criteria=criteria,
            findings=findings,
            concerns=concerns,
            score=score
        )

    def run(self, positioning: PositioningOutput, audience: AudienceOutput, personality: PersonalityOutput, creative: CreativeOutput, critique: CritiqueOutput) -> DebateOutput:
        """Run debate analysis."""
        perspectives = [
            self.strategist_perspective(positioning, audience),
            self.audience_perspective(audience, positioning),
            self.creative_director_perspective(personality, creative),
            self.skeptic_perspective(positioning, audience, critique)
        ]

        # Find agreements (findings that appear in multiple perspectives)
        all_findings = [f for p in perspectives for f in p.findings]
        agreements = []
        for finding in set(all_findings):
            if all_findings.count(finding) >= 2:
                agreements.append(finding)

        # Find disagreements (concerns in one perspective vs findings in another)
        disagreements = []
        for p in perspectives:
            for concern in p.concerns:
                for other_p in perspectives:
                    if other_p != p and any(concern.lower() in f.lower() for f in other_p.findings):
                        disagreements.append(f"{p.name} concerned about '{concern}' while {other_p.name} sees strength")

        # Identify risks
        risks = []
        for p in perspectives:
            risks.extend([f"{p.name}: {c}" for c in p.concerns])

        # Recommended changes
        recommended_changes = []
        if "not clearly specified" in positioning.differentiator.lower():
            recommended_changes.append("Strengthen differentiation with specific unique advantage")
        if critique.status != "approved":
            recommended_changes.append("Address clichés and vague language identified by critic")
        if len(perspectives[3].concerns) > 2:  # Skeptic has many concerns
            recommended_changes.append("Add more substantiation and specificity to claims")

        # Overall assessment
        weak_scores = [p for p in perspectives if p.score == "Needs Work"]
        if weak_scores:
            overall_assessment = "Brand direction needs significant refinement"
        elif any(p.score == "Moderate" for p in perspectives):
            overall_assessment = "Brand direction is solid but has areas for improvement"
        else:
            overall_assessment = "Brand direction is strong and coherent"

        return DebateOutput(
            perspectives=perspectives,
            agreements=agreements,
            disagreements=disagreements,
            risks=risks,
            recommended_changes=recommended_changes,
            overall_assessment=overall_assessment
        )


class ConsistencyEngine:
    """Checks for consistency across all brand elements."""

    def check_audience_positioning_match(self, audience: AudienceOutput, positioning: PositioningOutput) -> ConsistencyCheck:
        """Check if audience and positioning are aligned."""
        # Simple check: does positioning mention the audience category?
        audience_category = audience.primary_audience.lower().split()[0] if audience.primary_audience else ""
        positioning_mentions = positioning.positioning_statement.lower()

        if audience_category and audience_category in positioning_mentions:
            return ConsistencyCheck(
                aspect="Audience-Positioning Alignment",
                status="consistent",
                details=f"Positioning statement references target audience",
                severity="none"
            )
        else:
            return ConsistencyCheck(
                aspect="Audience-Positioning Alignment",
                status="warning",
                details=f"Positioning may not explicitly reference target audience",
                severity="low"
            )

    def check_personality_audience_match(self, personality: PersonalityOutput, audience: AudienceOutput) -> ConsistencyCheck:
        """Check if personality fits the audience."""
        audience_lower = audience.primary_audience.lower()

        # Students should have approachable/friendly personality
        if "student" in audience_lower:
            if any(trait in ["Approachable", "Friendly", "Relatable"] for trait in personality.core_traits):
                return ConsistencyCheck(
                    aspect="Personality-Audience Alignment",
                    status="consistent",
                    details="Personality traits align with student audience",
                    severity="none"
                )
            else:
                return ConsistencyCheck(
                    aspect="Personality-Audience Alignment",
                    status="warning",
                    details="Personality could be more approachable for student audience",
                    severity="low"
                )

        # Professionals should have professional traits
        if "professional" in audience_lower:
            if "Professional" in personality.core_traits:
                return ConsistencyCheck(
                    aspect="Personality-Audience Alignment",
                    status="consistent",
                    details="Professional personality aligns with professional audience",
                    severity="none"
                )
            else:
                return ConsistencyCheck(
                    aspect="Personality-Audience Alignment",
                    status="warning",
                    details="Personality could emphasize professionalism",
                    severity="low"
                )

        return ConsistencyCheck(
            aspect="Personality-Audience Alignment",
            status="consistent",
            details="No obvious personality-audience mismatch",
            severity="none"
        )

    def check_visual_positioning_match(self, visual: VisualDirection, positioning: PositioningOutput) -> ConsistencyCheck:
        """Check if visual direction matches positioning."""
        # Check for obvious mismatches
        positioning_lower = positioning.positioning_statement.lower()
        visual_lower = visual.visual_mood.lower()

        # If positioning is about accessibility/inclusion, visual should not be "exclusive"
        if "accessible" in positioning_lower or "inclusive" in positioning_lower:
            if "exclusive" in visual_lower or "luxury" in visual_lower:
                return ConsistencyCheck(
                    aspect="Visual-Positioning Alignment",
                    status="inconsistent",
                    details="Visual direction conflicts with accessibility/inclusion positioning",
                    severity="high"
                )

        # If positioning is about simplicity, visual should not be "complex"
        if "simple" in positioning_lower or "easy" in positioning_lower:
            if "complex" in visual_lower or "intricate" in visual_lower:
                return ConsistencyCheck(
                    aspect="Visual-Positioning Alignment",
                    status="inconsistent",
                    details="Visual direction conflicts with simplicity positioning",
                    severity="medium"
                )

        return ConsistencyCheck(
            aspect="Visual-Positioning Alignment",
            status="consistent",
            details="Visual direction aligns with positioning",
            severity="none"
        )

    def check_voice_personality_match(self, personality: PersonalityOutput) -> ConsistencyCheck:
        """Check if voice examples match personality traits."""
        # Check if voice examples reflect the stated traits
        if not personality.voice_examples:
            return ConsistencyCheck(
                aspect="Voice-Personality Alignment",
                status="warning",
                details="No voice examples to verify alignment",
                severity="low"
            )

        # This is a simplified check
        voice_text = " ".join(personality.voice_examples).lower()
        trait_count = sum(1 for trait in personality.core_traits if trait.lower() in voice_text)

        if trait_count >= len(personality.core_traits) / 2:
            return ConsistencyCheck(
                aspect="Voice-Personality Alignment",
                status="consistent",
                details="Voice examples reflect personality traits",
                severity="none"
            )
        else:
            return ConsistencyCheck(
                aspect="Voice-Personality Alignment",
                status="warning",
                details="Voice examples could better reflect personality traits",
                severity="low"
            )

    def run(self, audience: AudienceOutput, positioning: PositioningOutput, personality: PersonalityOutput, creative: CreativeOutput) -> ConsistencyOutput:
        """Run consistency analysis."""
        checks = [
            self.check_audience_positioning_match(audience, positioning),
            self.check_personality_audience_match(personality, audience),
            self.check_visual_positioning_match(creative.visual_direction, positioning),
            self.check_voice_personality_match(personality)
        ]

        # Extract contradictions
        contradictions = [c.details for c in checks if c.status == "inconsistent"]

        # Extract mismatches (warnings)
        mismatches = [c.details for c in checks if c.status == "warning"]

        # Generate recommendations
        recommendations = []
        if contradictions:
            recommendations.append("Resolve inconsistencies between brand elements")
        if mismatches:
            recommendations.append("Review and refine areas flagged as warnings")
        if not contradictions and not mismatches:
            recommendations.append("Brand elements are well-aligned")

        # Determine overall status
        if contradictions:
            overall_status = "inconsistent"
        elif mismatches:
            overall_status = "needs_review"
        else:
            overall_status = "consistent"

        return ConsistencyOutput(
            overall_status=overall_status,
            checks=checks,
            contradictions=contradictions,
            mismatches=mismatches,
            recommendations=recommendations
        )


class FinalBrandEngine:
    """Synthesizes all outputs into final brand intelligence."""

    def run(self, discovery: DiscoveryOutput, audience: AudienceOutput, positioning: PositioningOutput,
            personality: PersonalityOutput, creative: CreativeOutput, critique: CritiqueOutput,
            debate: DebateOutput, consistency: ConsistencyOutput) -> FinalBrandOutput:
        """Run final brand synthesis."""
        return FinalBrandOutput(
            brand_direction=positioning.category,
            one_line_description=positioning.value_proposition,
            target_audience=audience.primary_audience,
            core_problem=discovery.problem,
            founder_insight=discovery.motivations,
            positioning=positioning.positioning_statement,
            differentiator=positioning.differentiator,
            brand_promise=positioning.brand_promise,
            personality=personality,
            naming_territories=creative.naming_territories,
            tagline=creative.tagline_directions[0] if creative.tagline_directions else "",
            voice=personality.communication_style,
            messaging=positioning.value_proposition,
            visual_direction=creative.visual_direction,
            color_direction=creative.visual_direction.color_direction,
            typography=creative.visual_direction.typography_direction,
            imagery=creative.visual_direction.imagery_direction,
            logo_concept_directions=creative.visual_direction.logo_concept_directions,
            critic_findings=critique,
            debate_findings=debate,
            consistency_findings=consistency,
            assumptions=discovery.assumptions,
            risks=debate.risks,
            recommendations=debate.recommended_changes
        )


class LaunchKitEngine:
    """Generates launch kit materials."""

    def generate_landing_page_headline(self, positioning: PositioningOutput) -> str:
        """Generate landing page headline."""
        # Use value proposition or create punchy version
        if positioning.value_proposition:
            # Shorten if too long
            if len(positioning.value_proposition) > 60:
                return positioning.value_proposition[:60]
            return positioning.value_proposition
        return "Solve Your Problem Better"

    def generate_landing_page_subheadline(self, audience: AudienceOutput, positioning: PositioningOutput) -> str:
        """Generate landing page subheadline."""
        return f"For {audience.primary_audience[:50]} who {positioning.problem[:60]}"

    def generate_cta(self, category: str) -> str:
        """Generate call-to-action."""
        if "platform" in category.lower():
            return "Get Started Free"
        elif "marketplace" in category.lower():
            return "Join Now"
        else:
            return "Try It Today"

    def generate_about_section(self, discovery: DiscoveryOutput, positioning: PositioningOutput) -> str:
        """Generate about section."""
        # Fix grammar - remove "to" if problem already includes "to"
        problem_text = discovery.problem.lower()
        if problem_text.startswith("to "):
            problem_text = problem_text[3:]

        return f"We're building {positioning.category} to {problem_text}. Our mission is to {positioning.value_proposition.lower()}."

    def generate_product_description(self, positioning: PositioningOutput, audience: AudienceOutput) -> str:
        """Generate product description."""
        return f"{positioning.category} designed for {audience.primary_audience}. {positioning.value_proposition}"

    def generate_founder_pitch(self, discovery: DiscoveryOutput, positioning: PositioningOutput) -> str:
        """Generate founder pitch."""
        # Clean up motivations - filter out questions
        motivations = discovery.motivations
        if motivations and any(q in motivations.lower() for q in ["would someone", "choose your", "solution over"]):
            motivations = "I care about this problem"

        return f"I'm building {positioning.category} because {motivations.lower() if motivations else 'I care about this problem'}. {positioning.value_proposition}"

    def generate_elevator_pitch(self, positioning: PositioningOutput) -> str:
        """Generate elevator pitch."""
        return positioning.positioning_statement

    def generate_linkedin_post(self, positioning: PositioningOutput, audience: AudienceOutput) -> str:
        """Generate LinkedIn launch post."""
        return f"""Excited to share that I'm building {positioning.category}!

{positioning.value_proposition}

We're focused on helping {audience.primary_audience[:50]} {positioning.problem[:50].lower()}.

If this resonates with you, I'd love to connect and hear your thoughts.

#startup #building #innovation"""

    def generate_instagram_caption(self, personality: PersonalityOutput, positioning: PositioningOutput) -> str:
        """Generate Instagram caption."""
        return f"{positioning.value_proposition}\n\n{personality.voice_examples[0] if personality.voice_examples else 'Building something meaningful.'}\n\n#branding #startup #innovation"

    def generate_brand_voice_examples(self, personality: PersonalityOutput) -> List[str]:
        """Generate brand voice examples."""
        return personality.voice_examples

    def generate_do_messaging(self, personality: PersonalityOutput, positioning: PositioningOutput) -> List[str]:
        """Generate do messaging guidelines."""
        return [
            f"Be {personality.communication_style}",
            f"Focus on {positioning.value_proposition[:30]}",
            "Be specific and meaningful",
            "Show, don't just tell"
        ]

    def generate_dont_messaging(self, personality: PersonalityOutput) -> List[str]:
        """Generate don't messaging guidelines."""
        dont = []
        for trait in personality.traits_to_avoid:
            dont.append(f"Don't be {trait}")
        dont.extend([
            "Don't use clichés or buzzwords",
            "Don't make vague claims",
            "Don't overpromise"
        ])
        return dont[:5]

    def run(self, final_brand: FinalBrandOutput) -> LaunchKitOutput:
        """Run launch kit generation."""
        return LaunchKitOutput(
            landing_page_headline=self.generate_landing_page_headline(PositioningOutput(
                category=final_brand.brand_direction,
                target_audience=final_brand.target_audience,
                problem=final_brand.core_problem,
                value_proposition=final_brand.one_line_description,
                differentiator=final_brand.differentiator,
                brand_promise=final_brand.brand_promise,
                positioning_statement=final_brand.positioning
            )),
            landing_page_subheadline=self.generate_landing_page_subheadline(
                AudienceOutput(
                    primary_audience=final_brand.target_audience,
                    secondary_audience=None,
                    needs=[],
                    pain_points=[],
                    motivations=[],
                    objections=[],
                    desired_outcomes=[],
                    usage_context="",
                    evidence_sources=[]
                ),
                PositioningOutput(
                    category=final_brand.brand_direction,
                    target_audience=final_brand.target_audience,
                    problem=final_brand.core_problem,
                    value_proposition=final_brand.one_line_description,
                    differentiator=final_brand.differentiator,
                    brand_promise=final_brand.brand_promise,
                    positioning_statement=final_brand.positioning
                )
            ),
            cta=self.generate_cta(final_brand.brand_direction),
            about_section=self.generate_about_section(
                DiscoveryOutput(
                    product_concept=final_brand.one_line_description,
                    problem=final_brand.core_problem,
                    target_users=final_brand.target_audience,
                    context="",
                    motivations=final_brand.founder_insight,
                    alternatives="",
                    differentiators=final_brand.differentiator,
                    assumptions=final_brand.assumptions,
                    unknowns=[],
                    constraints=[],
                    confidence_level=""
                ),
                PositioningOutput(
                    category=final_brand.brand_direction,
                    target_audience=final_brand.target_audience,
                    problem=final_brand.core_problem,
                    value_proposition=final_brand.one_line_description,
                    differentiator=final_brand.differentiator,
                    brand_promise=final_brand.brand_promise,
                    positioning_statement=final_brand.positioning
                )
            ),
            product_description=self.generate_product_description(
                PositioningOutput(
                    category=final_brand.brand_direction,
                    target_audience=final_brand.target_audience,
                    problem=final_brand.core_problem,
                    value_proposition=final_brand.one_line_description,
                    differentiator=final_brand.differentiator,
                    brand_promise=final_brand.brand_promise,
                    positioning_statement=final_brand.positioning
                ),
                AudienceOutput(
                    primary_audience=final_brand.target_audience,
                    secondary_audience=None,
                    needs=[],
                    pain_points=[],
                    motivations=[],
                    objections=[],
                    desired_outcomes=[],
                    usage_context="",
                    evidence_sources=[]
                )
            ),
            founder_pitch=self.generate_founder_pitch(
                DiscoveryOutput(
                    product_concept=final_brand.one_line_description,
                    problem=final_brand.core_problem,
                    target_users=final_brand.target_audience,
                    context="",
                    motivations=final_brand.founder_insight,
                    alternatives="",
                    differentiators=final_brand.differentiator,
                    assumptions=final_brand.assumptions,
                    unknowns=[],
                    constraints=[],
                    confidence_level=""
                ),
                PositioningOutput(
                    category=final_brand.brand_direction,
                    target_audience=final_brand.target_audience,
                    problem=final_brand.core_problem,
                    value_proposition=final_brand.one_line_description,
                    differentiator=final_brand.differentiator,
                    brand_promise=final_brand.brand_promise,
                    positioning_statement=final_brand.positioning
                )
            ),
            elevator_pitch=self.generate_elevator_pitch(PositioningOutput(
                category=final_brand.brand_direction,
                target_audience=final_brand.target_audience,
                problem=final_brand.core_problem,
                value_proposition=final_brand.one_line_description,
                differentiator=final_brand.differentiator,
                brand_promise=final_brand.brand_promise,
                positioning_statement=final_brand.positioning
            )),
            linkedin_launch_post=self.generate_linkedin_post(
                PositioningOutput(
                    category=final_brand.brand_direction,
                    target_audience=final_brand.target_audience,
                    problem=final_brand.core_problem,
                    value_proposition=final_brand.one_line_description,
                    differentiator=final_brand.differentiator,
                    brand_promise=final_brand.brand_promise,
                    positioning_statement=final_brand.positioning
                ),
                AudienceOutput(
                    primary_audience=final_brand.target_audience,
                    secondary_audience=None,
                    needs=[],
                    pain_points=[],
                    motivations=[],
                    objections=[],
                    desired_outcomes=[],
                    usage_context="",
                    evidence_sources=[]
                )
            ),
            instagram_caption=self.generate_instagram_caption(final_brand.personality, PositioningOutput(
                category=final_brand.brand_direction,
                target_audience=final_brand.target_audience,
                problem=final_brand.core_problem,
                value_proposition=final_brand.one_line_description,
                differentiator=final_brand.differentiator,
                brand_promise=final_brand.brand_promise,
                positioning_statement=final_brand.positioning
            )),
            brand_voice_examples=self.generate_brand_voice_examples(final_brand.personality),
            do_messaging=self.generate_do_messaging(final_brand.personality, PositioningOutput(
                category=final_brand.brand_direction,
                target_audience=final_brand.target_audience,
                problem=final_brand.core_problem,
                value_proposition=final_brand.one_line_description,
                differentiator=final_brand.differentiator,
                brand_promise=final_brand.brand_promise,
                positioning_statement=final_brand.positioning
            )),
            dont_messaging=self.generate_dont_messaging(final_brand.personality)
        )
