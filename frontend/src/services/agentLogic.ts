/**
 * BrandForge AI - Agent Reasoning Engines & Structural Synthesis
 * Provides deterministic and generative multi-agent stage execution.
 */

import {
  DiscoveryAgentOutput,
  PositioningAgentOutput,
  PersonalityAgentOutput,
  CreativeDirectorOutput,
  AntiGenericCriticOutput,
  BrandDebateOutput,
  ConsistencyGuardianOutput,
  FinalBrandIntelligenceReport,
  LaunchKitOutput,
  InterviewMessage,
  AntiGenericCustomAuditResult,
  AntiGenericClicheItem,
} from '../types/brandforge';

export function analyzeInterviewSufficiency(
  idea: string,
  history: InterviewMessage[],
): {
  nextQuestion: string;
  whyThisMatters: string;
  extractedFacts: string[];
  extractedAssumptions: string[];
  sufficiencyScore: number;
  isReady: boolean;
} {
  const userAnswers = history.filter((m) => m.role === 'user');
  const answerCount = userAnswers.length;

  const facts: string[] = [];
  const assumptions: string[] = [];

  // Extract key clues from idea and conversation
  const combinedText = `${idea} ${userAnswers.map((a) => a.content).join(' ')}`.toLowerCase();

  if (combinedText.includes('audio') || combinedText.includes('podcast') || combinedText.includes('sound')) {
    facts.push('Domain: Narrative audio and podcast production workflow.');
    if (combinedText.includes('stem') || combinedText.includes('export')) {
      facts.push('Critical bottleneck: Stem exporting and file handoff friction.');
    }
  } else if (combinedText.includes('sales') || combinedText.includes('rfp') || combinedText.includes('equipment')) {
    facts.push('Domain: B2B industrial sales and technical specification matching.');
    facts.push('Critical bottleneck: 48-hour manual PDF spec lookup and quote latency.');
  } else if (combinedText.includes('vineyard') || combinedText.includes('wine') || combinedText.includes('soil')) {
    facts.push('Domain: Precision viticulture and micro-climate soil monitoring.');
    facts.push('Critical bottleneck: Coarse regional weather data missing localized frost pockets.');
  } else {
    facts.push(`Core premise submitted: "${idea.slice(0, 80)}..."`);
  }

  // Probe progression based on count
  if (answerCount === 0) {
    return {
      nextQuestion:
        'Who is the single primary human who suffers the most from this problem today—what is their specific role, and what happens to their day when this goes wrong?',
      whyThisMatters:
        'Brand strategy requires a visceral wedge audience. If you target "everyone in the industry", your positioning collapses into meaningless generalities.',
      extractedFacts: facts,
      extractedAssumptions: ['Assumes target users are actively seeking modern software replacements.'],
      sufficiencyScore: 35,
      isReady: false,
    };
  } else if (answerCount === 1) {
    return {
      nextQuestion:
        'What broken manual workarounds, spreadsheets, or competitor tools are they currently duct-taping together, and why haven’t existing players solved this?',
      whyThisMatters:
        'Positioning is defined by contrast. To forge an uncopyable brand promise, we must define the exact enemy or status quo habit they are abandoning.',
      extractedFacts: [...facts, 'Target user role and workflow stress points clarified.'],
      extractedAssumptions: [
        'Assumes switching costs are low enough to overcome incumbent inertia.',
        'Assumes users trust cloud/AI tooling with their proprietary assets.',
      ],
      sufficiencyScore: 65,
      isReady: false,
    };
  } else if (answerCount === 2) {
    return {
      nextQuestion:
        'When this customer uses your product, what emotional state should the brand invoke—and crucially, what must the brand NEVER feel like?',
      whyThisMatters:
        'A brand’s "avoidance boundary" prevents generic startup tone drift. Knowing what you hate is as critical as knowing what you stand for.',
      extractedFacts: [...facts, 'Competitor differentiation and switching friction mapped.'],
      extractedAssumptions: [
        'Assumes pricing model aligns with the buyer’s departmental budget authority.',
      ],
      sufficiencyScore: 85,
      isReady: true,
    };
  } else {
    return {
      nextQuestion: 'Information gathering complete. The brand strategy context is defensible and validated.',
      whyThisMatters: 'We have enough high-fidelity evidence to execute all 7 reasoning agents.',
      extractedFacts: [...facts, 'Founder aesthetic & tonal guardrails established.'],
      extractedAssumptions: ['Market window is open for a specialized, verticalized entrant.'],
      sufficiencyScore: 100,
      isReady: true,
    };
  }
}

export function generateDiscoveryOutput(idea: string, answers: string[]): DiscoveryAgentOutput {
  const combined = `${idea} ${answers.join(' ')}`.toLowerCase();
  const isAudio = combined.includes('audio') || combined.includes('podcast');
  const isSales = combined.includes('sales') || combined.includes('rfp');
  const isVineyard = combined.includes('wine') || combined.includes('vineyard') || combined.includes('soil');

  if (isAudio) {
    return {
      stage: 'DISCOVERY',
      agentName: 'Discovery Agent',
      summary:
        'Discovered a high-urgency vertical niche in narrative audio production where collaborative stem review causes severe timeline delays.',
      confidence: 94,
      reasoningTimeMs: 420,
      founderMotivation:
        'Eradicate the tedious 3-hour export-and-upload cycle that pulls sound editors out of their creative flow.',
      coreProblem:
        'Narrative podcast editors waste hours manually exporting stems, sending Google Drive links, and reconciling disjointed director email feedback against timeline playheads.',
      targetAudience:
        'Independent narrative podcast producers, documentary audio editors, and boutique sound design studios.',
      currentAlternatives: [
        'Pro Tools & Reaper bounce exports',
        'Google Drive / Dropbox link sharing',
        'Frame.io (video-first, clumsy for audio stems)',
        'Email thread timestamp comments',
      ],
      initialWedge:
        'Browser-native multitrack stem streaming with synchronous timeline commentary and non-destructive DAW roundtripping.',
      facts: [
        'Stem export and re-import is a universally despised friction point in podcast post-production.',
        'Editors currently lose billable hours to file management rather than acoustic craft.',
      ],
      assumptions: [
        'Audio editors will trust web audio engine fidelity for professional mastering.',
        'Studio directors are willing to review within a web interface.',
      ],
      risks: [
        'Audio latency and browser memory limits when handling 30+ simultaneous WAV tracks.',
        'Deep incumbent inertia around Pro Tools industry keyboard shortcuts.',
      ],
    };
  } else if (isSales) {
    return {
      stage: 'DISCOVERY',
      agentName: 'Discovery Agent',
      summary:
        'Discovered acute margin leak in B2B technical equipment distribution caused by slow, manual RFP spec lookup.',
      confidence: 91,
      reasoningTimeMs: 440,
      founderMotivation:
        'Free technical sales engineers from grueling 800-page PDF catalog searches and accelerate quote velocity.',
      coreProblem:
        'Industrial distributors take 48-72 hours to match technical buyer specifications to valve and pump SKUs, losing 30% of bids to faster competitors.',
      targetAudience:
        'Heads of Technical Sales and Applications Engineers at fluid power, electrical, and industrial supply distributors.',
      currentAlternatives: [
        'Manual PDF spec sheet search',
        'Legacy ERP lookup screens (SAP/Epicor)',
        'Junior quote coordinators',
      ],
      initialWedge:
        'Autonomous technical spec parsing agent that ingests raw customer RFPs and generates validated SKU bills of materials in 90 seconds.',
      facts: [
        'First-to-quote distributors win over 40% more competitive RFP bids.',
        'Catalog data is messy, non-standardized, and trapped in scanned vendor documentation.',
      ],
      assumptions: [
        'Distributors have digitized catalog PDFs accessible via internal drives.',
        'Engineers will accept AI recommendations if OEM tolerance certs are cited.',
      ],
      risks: [
        'Severe liability if the agent hallucinates a pressure tolerance on a mission-critical valve.',
      ],
    };
  } else if (isVineyard) {
    return {
      stage: 'DISCOVERY',
      agentName: 'Discovery Agent',
      summary:
        'Discovered critical climate vulnerability in boutique estate viticulture requiring micro-parcel agronomic sensing.',
      confidence: 89,
      reasoningTimeMs: 410,
      founderMotivation:
        'Arm premium winemakers with real-time terroir micro-sensing to defend crop yields against erratic climate extremes.',
      coreProblem:
        'High-value grape parcels experience 4-6°F temperature inversions that public weather forecasts miss, resulting in avoidable frost wipeouts.',
      targetAudience:
        'Estate vineyard viticulturists, head winemakers, and boutique agricultural parcel managers ($40+/bottle tier).',
      currentAlternatives: [
        'Manual Scholander pressure chamber leaf tests',
        'Coarse regional weather apps',
        'Infrequent visual canopy inspection',
      ],
      initialWedge:
        'Sub-surface capacitance probe arrays paired with low-power LoRaWAN telemetry and localized frost inversion prediction.',
      facts: [
        'A single frost event can wipe out $150k+ of ultra-premium Pinot Noir fruit in 4 hours.',
        'Winemakers spend immense manual effort driving ATVs to inspect cold hollows.',
      ],
      assumptions: [
        'Vineyard managers have adequate LoRaWAN or cellular gateway coverage.',
        'Estate owners are willing to pay upfront hardware capex for peace of mind.',
      ],
      risks: [
        'Field sensor battery longevity and pest chewing on cable runs.',
      ],
    };
  } else {
    return {
      stage: 'DISCOVERY',
      agentName: 'Discovery Agent',
      summary: `Analyzed core founder proposition: "${idea.slice(0, 90)}..." with disciplined factual extraction.`,
      confidence: 88,
      reasoningTimeMs: 390,
      founderMotivation: 'Solve acute operational inefficiency for underserved domain specialists.',
      coreProblem:
        'Target practitioners rely on fragmented legacy software and manual hacks that introduce errors and slow execution.',
      targetAudience: 'Early-adopter domain specialists seeking purpose-built operational autonomy.',
      currentAlternatives: ['Spreadsheet workarounds', 'Bloated legacy horizontal platforms', 'Manual coordination'],
      initialWedge: 'Hyper-focused vertical workflow that delivers 10x speed on the primary critical path.',
      facts: ['Legacy horizontal tools fail to address specialized vertical domain nuances.'],
      assumptions: ['Target users have budget authority or discretionary expense capacity.'],
      risks: ['Educating the market on a novel workflow paradigm.'],
    };
  }
}

export function generatePositioningOutput(discovery: DiscoveryAgentOutput): PositioningAgentOutput {
  const isAudio = discovery.targetAudience.includes('audio') || discovery.coreProblem.includes('podcast');
  const isSales = discovery.targetAudience.includes('Sales') || discovery.coreProblem.includes('valve');
  const isVineyard = discovery.targetAudience.includes('vineyard') || discovery.targetAudience.includes('viticulturists');

  if (isAudio) {
    return {
      stage: 'POSITIONING',
      agentName: 'Positioning Agent',
      summary:
        'Crafted a high-leverage category wedge: The "Synchronous Narrative Audio Workstation". Defiantly separate from casual beatmaking and generic podcast recorders.',
      confidence: 95,
      reasoningTimeMs: 460,
      marketCategory: 'Collaborative Narrative Audio Workstation (C-DAW)',
      primaryAudienceProfile: {
        persona: 'The Overwhelmed Narrative Audio Editor',
        painPoint:
          'Drowning in 10-track stem bounces and ambiguous email timestamps from non-technical showrunners.',
        urgency: 'Acute — every weekly episode release cycle is an 18-hour scramble.',
        switchingTrigger: 'Missing a broadcast deadline due to a corrupted 4GB stem upload.',
      },
      valueProposition:
        'Zero-export stem streaming with synchronous browser playhead review for narrative sound teams.',
      differentiatedWedge:
        'Direct DAW playhead synchronization: directors leave comments directly on waveform tracks in their browser without touching a mixer.',
      positioningStatement:
        'For narrative podcast sound editors who waste billable hours exporting stems to cloud folders, BrandForge is the collaborative audio workstation that unifies multitrack editing with live client timeline review, unlike Pro Tools or Frame.io, because it streams uncompressed stems directly in-browser with zero bounce delays.',
      antiPositioning:
        'NOT a consumer voice memo recorder, NOT an AI voice cloner, and NOT a bedroom EDM beatmaker.',
      competitiveMoatHypothesis:
        'Proprietary high-density WebAssembly DSP engine with sub-5ms collaborative playhead lock.',
    };
  } else if (isSales) {
    return {
      stage: 'POSITIONING',
      agentName: 'Positioning Agent',
      summary:
        'Positioned as an "Autonomous Technical Quoting Engine" for high-consequence industrial distribution.',
      confidence: 93,
      reasoningTimeMs: 430,
      marketCategory: 'Autonomous Industrial Quoting Intelligence',
      primaryAudienceProfile: {
        persona: 'Head of Technical Applications & Inside Sales',
        painPoint:
          'Losing high-margin bids because engineers spend 6 hours manually cross-referencing vendor tolerance catalogs.',
        urgency: 'High — customer procurement teams demand 2-hour response turnarounds.',
        switchingTrigger: 'Losing a $250k municipal pump tender due to a 3-day quoting lag.',
      },
      valueProposition:
        'Convert complex industrial RFPs into verified SKU bills of materials in under 90 seconds.',
      differentiatedWedge:
        'Deterministic OEM spec validation engine: guarantees pressure, temperature, and thread tolerance matching with zero hallucination.',
      positioningStatement:
        'For industrial equipment distributors who lose competitive bids to quoting latency, BrandForge is the autonomous technical quoting platform that converts messy RFP documents into manufacturer-certified quotes in minutes, unlike generic CRM AI or manual catalog lookups, because its reasoning engine is hard-coded against DIN/ANSI industrial tolerances.',
      antiPositioning:
        'NOT a generic conversational sales bot, NOT a spam outbound emailer, and NOT a standard CRM plugin.',
      competitiveMoatHypothesis:
        'Proprietary graph database of 2M+ industrial engineering OEM cross-references and CAD spec sheets.',
    };
  } else if (isVineyard) {
    return {
      stage: 'POSITIONING',
      agentName: 'Positioning Agent',
      summary:
        'Established category positioning as "Precision Terroir Defense" for ultra-premium estate viticulture.',
      confidence: 92,
      reasoningTimeMs: 440,
      marketCategory: 'Hyper-Local Terroir Climate Intelligence',
      primaryAudienceProfile: {
        persona: 'Estate Viticulturist & Master Winemaker',
        painPoint:
          'Blind spots in localized canopy micro-climates that expose vintage yields to catastrophic frost damage.',
        urgency: 'Seasonal & extreme — a single night of frost destroys an entire vintage year.',
        switchingTrigger: 'A 29°F frost hollow destroying 40% of their estate reserve harvest.',
      },
      valueProposition:
        'Defend million-dollar vintage yields with micro-parcel sub-surface telemetry and predictive inversion warnings.',
      differentiatedWedge:
        'Parabolic canopy sensors combined with deep-root capacitance probes deliver 10-meter precision warnings 6 hours before frost hits.',
      positioningStatement:
        'For estate winemakers who risk seven-figure vintage losses to unpredictable frost pockets, BrandForge is the micro-parcel terroir defense system that alerts vineyard teams hours before critical temperature inversions occur, unlike regional weather apps or coarse satellite imagery, because it monitors sub-canopy root physics at individual vine row resolution.',
      antiPositioning:
        'NOT a generic garden gadget, NOT an abstract carbon offset platform, and NOT a commodity ag-drone service.',
      competitiveMoatHypothesis:
        'Patented low-power LoRa soil canopy sensor nodes with 5-year hermetic field longevity.',
    };
  } else {
    return {
      stage: 'POSITIONING',
      agentName: 'Positioning Agent',
      summary: 'Constructed an uncopyable vertical category position with sharp contrast against legacy horizontals.',
      confidence: 90,
      reasoningTimeMs: 410,
      marketCategory: 'Vertical Operations Intelligence Engine',
      primaryAudienceProfile: {
        persona: 'The Pragmatic Operational Specialist',
        painPoint: 'Tired of forcing generic software tools to solve deeply domain-specific bottlenecks.',
        urgency: 'Immediate — compounding daily friction threatens team delivery capacity.',
        switchingTrigger: 'A critical workflow failure during peak customer demand.',
      },
      valueProposition: 'Uncompromising domain precision engineered for zero-friction daily execution.',
      differentiatedWedge: 'Purpose-built workflow primitives that eliminate manual data bridging entirely.',
      positioningStatement: `For domain practitioners who suffer from fragmented legacy tooling, BrandForge delivers dedicated operational intelligence that automates their critical path, unlike generic SaaS horizontals, because it is engineered natively for their domain nuances.`,
      antiPositioning: 'NOT a generic all-in-one suite, NOT a bloated enterprise middleware platform.',
      competitiveMoatHypothesis: 'Proprietary domain data model with proprietary workflow integration primitives.',
    };
  }
}

export function generatePersonalityOutput(pos: PositioningAgentOutput): PersonalityAgentOutput {
  const isAudio = pos.marketCategory.includes('Audio') || pos.marketCategory.includes('C-DAW');
  const isSales = pos.marketCategory.includes('Industrial');
  const isVineyard = pos.marketCategory.includes('Terroir');

  if (isAudio) {
    return {
      stage: 'PERSONALITY',
      agentName: 'Brand Personality Agent',
      summary:
        'Defined the archetype as "The Master Acoustic Craftsman" — relentless, obsessive, low-noise, and deeply respectful of sound fidelity.',
      confidence: 96,
      reasoningTimeMs: 430,
      archetype: 'The Relentless Acoustic Craftsman (Creator-Engineer Hybrid)',
      coreTraits: [
        {
          trait: 'Acoustic Purist',
          definition: 'Deep reverence for lossless waveforms, transparent gain staging, and zero-compression fidelity.',
          howItShowsUp: 'In-app copy discusses stems and dynamic headroom with technical precision.',
        },
        {
          trait: 'Friction Intolerant',
          definition: 'An almost physical hatred for loading bars, export spinners, and file dialogue boxes.',
          howItShowsUp: 'Features are branded around immediate action: "Live Timeline", "Zero Bounce".',
        },
        {
          trait: 'Understated Mastery',
          definition: 'Confidence derived from uncompromising performance rather than loud neon marketing.',
          howItShowsUp: 'Minimalist dark-slate UI, calm microcopy, no animated confetti.',
        },
        {
          trait: 'Empathetic to the 3 AM Crunch',
          definition: 'Understands the frantic adrenaline of mixing an audio episode before morning distribution.',
          howItShowsUp: 'Fail-safe autosave messaging that reassures the editor at all times.',
        },
      ],
      traitsToAvoid: [
        {
          trait: 'Playful Cartoon Whimsy',
          whyHarmful: 'Demoralizes serious sound designers who consider audio an elite acoustic craft.',
          trapToAvoid: 'No emoji-heavy buttons, no bubbly colorful mascots.',
        },
        {
          trait: 'Generic Silicon Valley Tech-Brob',
          whyHarmful: 'Feels like an AI wrapper built by people who have never heard room reverb.',
          trapToAvoid: 'Never use "supercharge your audio" or "10x your podcast game".',
        },
        {
          trait: 'Elitist Hostility',
          whyHarmful: 'Alienates ambitious indie storytellers who lack a vintage Neve mixing console.',
          trapToAvoid: 'Do not insult simpler tools; explain objectively why stem synchronization matters.',
        },
        {
          trait: 'Feature Bloat Grandiosity',
          whyHarmful: 'Drowns the core value proposition in peripheral noise.',
          trapToAvoid: 'Avoid claiming to do video editing, newsletter publishing, and social clips all at once.',
        },
      ],
      communicationStyle: {
        tone: 'Precise, tactile, focused, and acoustically literate.',
        rhythm: 'Short, declarative sentences. Punchy verbs. Zero fluff.',
        vocabularyPreference: ['Stems', 'Timeline sync', 'Lossless', 'Latency-free', 'Dynamic range', 'Playhead'],
        bannedWords: ['Supercharge', 'Disrupt', 'Magic', 'Seamless', 'Next-gen', 'AI-powered'],
      },
    };
  } else if (isSales) {
    return {
      stage: 'PERSONALITY',
      agentName: 'Brand Personality Agent',
      summary:
        'Defined the archetype as "The Industrial Field Inspector" — stoic, unyielding, certified, and mathematically exact.',
      confidence: 94,
      reasoningTimeMs: 410,
      archetype: 'The Precision Industrial Certifier (Ruler-Sage Hybrid)',
      coreTraits: [
        {
          trait: 'Tolerance Exacting',
          definition: 'Treats engineering dimensions and pressure PSI as inviolable truths.',
          howItShowsUp: 'Every quote display shows certified source documents and tolerance checks.',
        },
        {
          trait: 'Industrial Pragmatist',
          definition: 'Values machine uptime and margin preservation over Silicon Valley hype.',
          howItShowsUp: 'Language mirrors engineering spec sheets and technical procurement guidelines.',
        },
        {
          trait: 'Speed as Armor',
          definition: 'Recognizes that velocity in quoting protects margins and closes accounts.',
          howItShowsUp: 'Displays elapsed quote latency down to the tenth of a second.',
        },
        {
          trait: 'Accountability First',
          definition: 'Stands behind every SKU match with audit trails and manufacturer validation.',
          howItShowsUp: 'Clear provenance citations for every recommended flange or gasket.',
        },
      ],
      traitsToAvoid: [
        {
          trait: 'Casual Conversational Chatbot Tone',
          whyHarmful: 'Destroys trust in mission-critical industrial procurement.',
          trapToAvoid: 'Never say "Hey there! How can I help you quote today?"',
        },
        {
          trait: 'Vague SaaS Buzzwords',
          whyHarmful: 'Industrial buyers immediately disqualify hype-heavy vendors.',
          trapToAvoid: 'Avoid "unlock revenue synergy" and "smart AI copilot".',
        },
        {
          trait: 'Abstract Fluff',
          whyHarmful: 'Engineers look for DIN, ANSI, and ISO standards, not inspirational philosophy.',
          trapToAvoid: 'Never make claims without verifiable metric data.',
        },
        {
          trait: 'Consumer Toy Visuals',
          whyHarmful: 'Makes enterprise distributors fear data compliance leaks.',
          trapToAvoid: 'No soft pastel gradients or consumer smartphone aesthetics.',
        },
      ],
      communicationStyle: {
        tone: 'Authoritative, DIN-spec certified, calm, and mathematically direct.',
        rhythm: 'High informational density. Bulleted specs. Zero marketing embellishment.',
        vocabularyPreference: ['Tolerance', 'BOM', 'ANSI certified', 'Quote turnaround', 'Margin capture', 'SKU match'],
        bannedWords: ['Empower', 'Revolutionize', 'Copilot', 'Magic', 'Game-changer'],
      },
    };
  } else {
    return {
      stage: 'PERSONALITY',
      agentName: 'Brand Personality Agent',
      summary:
        'Defined the archetype as "The Master Agronomist & Field Physicist" — deeply rooted in terroir, rigorous, and vigilant.',
      confidence: 93,
      reasoningTimeMs: 400,
      archetype: 'The Terroir Sentinel (Guardian-Sage Hybrid)',
      coreTraits: [
        {
          trait: 'Soil Reverence',
          definition: 'Understands that wine quality is forged in the vineyard canopy, not in boardroom slide decks.',
          howItShowsUp: 'Imagery honors physical soil, vine root architecture, and atmospheric physics.',
        },
        {
          trait: 'Predictive Vigilance',
          definition: 'Anticipates temperature micro-inversions hours before they freeze canopy buds.',
          howItShowsUp: 'Alerting copy is calm, urgent, and specifies exact physical coordinates.',
        },
        {
          trait: 'Field Durability',
          definition: 'Built to endure tractor mud, winter frosts, and baking summer heat.',
          howItShowsUp: 'Hardware specifications emphasize hermetic sealing and rugged longevity.',
        },
        {
          trait: 'Winemaker Peer',
          definition: 'Communicates with the nuanced agronomic vocabulary of master viticulturists.',
          howItShowsUp: 'Uses terms like phenolic maturity, diurnal shift, and sap flow pressure.',
        },
      ],
      traitsToAvoid: [
        {
          trait: 'Silicon Valley Climate Greenwashing',
          whyHarmful: 'Estate winemakers are sick of carbon offset marketing that does not save crops.',
          trapToAvoid: 'Never use corporate ESG buzzwords or stock photos of hands holding soil.',
        },
        {
          trait: 'Fragile Consumer Gadgetry',
          whyHarmful: 'Cheap plastic sensors break under agricultural conditions and ruin reputation.',
          trapToAvoid: 'Never present hardware as a "smart home" toy.',
        },
        {
          trait: 'Alarmist Panic',
          whyHarmful: 'Winemakers need steady operational guidance, not screaming notification spam.',
          trapToAvoid: 'Keep alert language analytical and actionable.',
        },
        {
          trait: 'Academic Detachment',
          whyHarmful: 'Research papers do not rescue a parcel from 3 AM frost.',
          trapToAvoid: 'Focus on immediate operational actions (turn on wind machines, ignite heaters).',
        },
      ],
      communicationStyle: {
        tone: 'Grounded, vigilant, agronomic, and quietly resolute.',
        rhythm: 'Measured cadence. Clear physical units (°F, bars of water potential, canopy elevation).',
        vocabularyPreference: ['Terroir', 'Diurnal shift', 'Capacitance', 'Canopy inversion', 'Frost threshold'],
        bannedWords: ['Eco-friendly', 'Green tech revolution', 'Save the planet', 'Disrupting farming'],
      },
    };
  }
}

export function generateCreativeDirectorOutput(
  pos: PositioningAgentOutput,
  per: PersonalityAgentOutput,
): CreativeDirectorOutput {
  const isAudio = pos.marketCategory.includes('Audio') || pos.marketCategory.includes('C-DAW');
  const isSales = pos.marketCategory.includes('Industrial');

  if (isAudio) {
    return {
      stage: 'CREATIVE_DIRECTION',
      agentName: 'Creative Director Agent',
      summary:
        'Established 3 distinct naming territories spanning Acoustic Physics, Studio Mechanics, and Temporal Precision, complete with dark-spectrum color science.',
      confidence: 95,
      reasoningTimeMs: 480,
      namingTerritories: [
        {
          territoryName: 'Territory A: Acoustic Architecture & Physics',
          theme: 'Rooted in acoustic engineering, frequency balance, and physical audio clarity.',
          names: [
            {
              name: 'Resonote',
              rationale: 'Evokes natural resonant frequencies married to collaborative editorial notes.',
              tldLikelihood: 'resonote.studio or resonote.audio available',
              phoneticVibe: 'Crisp, technical, modern studio vibe',
            },
            {
              name: 'Stemforge',
              rationale: 'Directly addresses the raw stem multitrack file unit and active craftsmanship.',
              tldLikelihood: 'stemforge.app or stemforge.io available',
              phoneticVibe: 'Industrial strength, resolute, definitive',
            },
            {
              name: 'Vektor Audio',
              rationale: 'Signals mathematical direction, multitrack routing, and modern digital signal processing.',
              tldLikelihood: 'vektoraudio.com available',
              phoneticVibe: 'Sleek, minimalist, European hardware feel',
            },
          ],
        },
        {
          territoryName: 'Territory B: Temporal Flow & Playhead Sync',
          theme: 'Focuses on real-time synchronous review, zero latency, and narrative timeline flow.',
          names: [
            {
              name: 'Playhead.live',
              rationale: 'The universal icon of audio editing, elevated to a synchronous collaborative space.',
              tldLikelihood: 'playhead.live available',
              phoneticVibe: 'Immediate, action-oriented, industry standard',
            },
            {
              name: 'Lockstep Sound',
              rationale: 'Communicates the feeling of editor and director moving in perfect timeline synchronization.',
              tldLikelihood: 'lockstepsound.com available',
              phoneticVibe: 'Authoritative, dependable, rhythmic',
            },
            {
              name: 'Epoch DAW',
              rationale: 'Marks a clean temporal break from 90s desktop software paradigms.',
              tldLikelihood: 'epochdaw.com or epoch.audio available',
              phoneticVibe: 'Bold, monumental, visionary',
            },
          ],
        },
        {
          territoryName: 'Territory C: The Sound Architect’s Studio',
          theme: 'Evokes the calm atmosphere of an elite mastering console at 2 AM.',
          names: [
            {
              name: 'Monolith Audio',
              rationale: 'Suggests unshakeable stability and pristine acoustic authority.',
              tldLikelihood: 'monolithaudio.io available',
              phoneticVibe: 'Deep, cinematic, heavyweight',
            },
            {
              name: 'Aperture Sound',
              rationale: 'Opening up narrative audio files to seamless collaborative light.',
              tldLikelihood: 'aperturesound.co available',
              phoneticVibe: 'Precise, calibrated, optic-acoustic crossover',
            },
            {
              name: 'NullBounce',
              rationale: 'The ultimate anti-export inside joke: you never bounce a stem file again.',
              tldLikelihood: 'nullbounce.com available',
              phoneticVibe: 'Cult developer/engineer credibility, insider status',
            },
          ],
        },
      ],
      taglineOptions: [
        {
          tagline: 'Never Bounce a Stem Again.',
          angle: 'Friction Eradication (Visceral Pain Killer)',
          punchinessScore: 98,
        },
        {
          tagline: 'Multitrack Editing at the Speed of Conversation.',
          angle: 'Collaborative Velocity',
          punchinessScore: 92,
        },
        {
          tagline: 'The Narrative Audio Workstation for Storytellers Who Hate File Management.',
          angle: 'Sharp Customer Wedge',
          punchinessScore: 90,
        },
      ],
      visualDirection: {
        mood: 'Precision mastering suite in dark slate, obsidian glass, and phosphorescent amber waveform accents.',
        colorPalette: [
          {
            name: 'Obsidian Studio',
            hex: '#0A0D12',
            role: 'background',
            psychologicalIntent: 'Eliminates eye fatigue during 12-hour mixing marathons.',
          },
          {
            name: 'Console Slate',
            hex: '#161B22',
            role: 'surface',
            psychologicalIntent: 'Evokes tactile brushed aluminum audio interface hardware.',
          },
          {
            name: 'Phosphor Amber',
            hex: '#F59E0B',
            role: 'primary',
            psychologicalIntent: 'Classic analog VU meter glow: signals active gain without harsh digital red.',
          },
          {
            name: 'Acoustic Cyan',
            hex: '#06B6D4',
            role: 'accent',
            psychologicalIntent: 'Crisp waveform transients and active playhead location.',
          },
          {
            name: 'Pristine White',
            hex: '#F8FAFC',
            role: 'secondary',
            psychologicalIntent: 'Razor sharp typographic legibility against dark slate.',
          },
        ],
        typographyPairing: {
          headingFont: 'Plus Jakarta Sans (Weight 700/800)',
          bodyFont: 'Inter (Weight 400/500)',
          codeFont: 'JetBrains Mono (For timecodes and samplerates: 00:42:18:04)',
          rationale:
            'Plus Jakarta Sans provides geometric authority without looking sterile, while JetBrains Mono ensures zero tabular jump on real-time scrubbing counters.',
        },
        imageryStyle:
          'High-contrast macro photography of tactile analog faders, illuminated vacuum tubes, and vector oscilloscope waveforms.',
        logoConceptDirections: [
          {
            conceptName: 'The Interlocking Waveform',
            visualMetaphor: 'Two sinusoidal sound waves crossing each other to form a secure infinite link.',
            description:
              'A geometric minimalist mark that reads as both audio frequency lines and collaborative linkage.',
            svgGlyphIdea: 'Path with two intersecting sine waves in phosphor amber against obsidian ground.',
          },
          {
            conceptName: 'The Synchronous Playhead',
            visualMetaphor: 'A vertical precision needle slicing through dynamic multitrack bars.',
            description: 'Symbolizes zero latency and instant shared timeline positioning.',
            svgGlyphIdea: 'Single crisp vertical beam with subtle amber halo cutting through three staggered stems.',
          },
          {
            conceptName: 'The Acoustic Tuning Fork & Node',
            visualMetaphor: 'A minimalist tuning fork where the tines connect to digital network vertices.',
            description: 'Blends ancient acoustic pure tone with modern browser streaming nodes.',
            svgGlyphIdea: 'Clean monoline glyph with dual prongs terminating in circular data nodes.',
          },
        ],
      },
    };
  } else if (isSales) {
    return {
      stage: 'CREATIVE_DIRECTION',
      agentName: 'Creative Director Agent',
      summary:
        'Constructed heavy industrial visual architecture centered on DIN engineering standards, steel blues, and high-contrast data visualization.',
      confidence: 94,
      reasoningTimeMs: 460,
      namingTerritories: [
        {
          territoryName: 'Territory A: Engineering Tolerance & Precision',
          theme: 'Speaks to technical certainty, DIN specifications, and zero margin for error.',
          names: [
            {
              name: 'SpecForge',
              rationale: 'Forging complex customer specifications into actionable manufacturer quotes.',
              tldLikelihood: 'specforge.ai or specforge.com available',
              phoneticVibe: 'Direct, heavy, authoritative',
            },
            {
              name: 'Toleranz',
              rationale: 'Germanic engineering precision, signaling zero tolerance for loose guesswork.',
              tldLikelihood: 'toleranz.io available',
              phoneticVibe: 'Exacting, industrial, elite',
            },
            {
              name: 'CertiQuote',
              rationale: 'Instantly communicates certified quote accuracy for OEM parts.',
              tldLikelihood: 'certiquote.net available',
              phoneticVibe: 'Clear, enterprise-friendly, risk-reducing',
            },
          ],
        },
        {
          territoryName: 'Territory B: Velocity & Flow Dynamics',
          theme: 'Highlights the acceleration of industrial commerce and quote turnaround.',
          names: [
            {
              name: 'Vane AI',
              rationale: 'Industrial mechanical term referencing fluid direction and aerodynamics.',
              tldLikelihood: 'vane.tech available',
              phoneticVibe: 'Compact, modern, aerodynamic',
            },
            {
              name: 'TurnKey Spec',
              rationale: 'Delivering completely finished, quote-ready bills of materials instantaneously.',
              tldLikelihood: 'turnkeyspec.com available',
              phoneticVibe: 'Commercial, dependable, actionable',
            },
            {
              name: 'FlowQuote',
              rationale: 'Unblocking the clogged pipe of manual engineering catalog lookups.',
              tldLikelihood: 'flowquote.io available',
              phoneticVibe: 'Dynamic, fluid, streamlined',
            },
          ],
        },
        {
          territoryName: 'Territory C: Industrial Graph Intelligence',
          theme: 'Focuses on the massive technical cross-reference graph connecting suppliers and buyers.',
          names: [
            {
              name: 'BOMGrid',
              rationale: 'Direct reference to Bill of Materials and interconnected distributor inventory grids.',
              tldLikelihood: 'bomgrid.com available',
              phoneticVibe: 'Technical, systematic, infrastructure-grade',
            },
            {
              name: 'Apex Caliper',
              rationale: 'The fundamental measuring instrument of precision manufacturing.',
              tldLikelihood: 'apexcaliper.com available',
              phoneticVibe: 'Metrological, disciplined, sharp',
            },
            {
              name: 'ValveLogic',
              rationale: 'Uncompromising vertical authority in fluid power and mechanical control.',
              tldLikelihood: 'valvelogic.com available',
              phoneticVibe: 'Categorical, definitive, robust',
            },
          ],
        },
      ],
      taglineOptions: [
        {
          tagline: 'From 800-Page Spec to Certified Quote in 90 Seconds.',
          angle: 'Concrete Metric & Speed',
          punchinessScore: 97,
        },
        {
          tagline: 'Zero Hallucination Quoting for Critical Infrastructure.',
          angle: 'Trust & Risk Mitigation',
          punchinessScore: 93,
        },
        {
          tagline: 'Stop Losing Bids to Response Latency.',
          angle: 'Revenue Protection',
          punchinessScore: 91,
        },
      ],
      visualDirection: {
        mood: 'Precision CNC machining floor meeting aerospace telemetry: steel gray, blueprint cobalt, safety orange.',
        colorPalette: [
          {
            name: 'Industrial Carbon',
            hex: '#0F172A',
            role: 'background',
            psychologicalIntent: 'Solid, high-density slate suggesting cast iron durability.',
          },
          {
            name: 'Machined Steel',
            hex: '#334155',
            role: 'surface',
            psychologicalIntent: 'Cold-rolled steel texture for technical tables and quote cards.',
          },
          {
            name: 'Blueprint Cobalt',
            hex: '#2563EB',
            role: 'primary',
            psychologicalIntent: 'Architectural blueprint authority and engineering certitude.',
          },
          {
            name: 'Safety Caliper Orange',
            hex: '#EA580C',
            role: 'accent',
            psychologicalIntent: 'High-contrast indicator for verified tolerance matches and fast CTAs.',
          },
          {
            name: 'Galvanized Silver',
            hex: '#E2E8F0',
            role: 'secondary',
            psychologicalIntent: 'Pure high-contrast legibility for complex alphanumeric part numbers.',
          },
        ],
        typographyPairing: {
          headingFont: 'Space Grotesk (Weight 700)',
          bodyFont: 'IBM Plex Sans (Weight 400/500)',
          codeFont: 'IBM Plex Mono (For DIN part numbers: DIN-EN-1092-1)',
          rationale:
            'IBM Plex was engineered specifically for technical clarity and industrial information systems, rendering complex tables with zero ambiguity.',
        },
        imageryStyle:
          'Exploded 3D CAD schematic assemblies, cross-section technical valve drawings, and micro-photographs of calibrated thread pitch.',
        logoConceptDirections: [
          {
            conceptName: 'The Caliper & Checkmark',
            visualMetaphor: 'A precision vernier caliper jaws enclosing a verified tolerance check.',
            description: 'Communicates both physical dimensional measurement and instantaneous algorithmic verification.',
            svgGlyphIdea: 'Dual caliper prongs with angled precision millimeter ticks.',
          },
          {
            conceptName: 'The Isometric Hex Nut',
            visualMetaphor: 'A 3D isometric hex flange transforming into a data flow cube.',
            description: 'Honors mechanical hardware roots while signaling algorithmic computing speed.',
            svgGlyphIdea: 'Geometric hexagon with interior isometric facets.',
          },
        ],
      },
    };
  } else {
    return {
      stage: 'CREATIVE_DIRECTION',
      agentName: 'Creative Director Agent',
      summary:
        'Synthesized a rich, grounded visual identity marrying geological earth tones with military-grade telemetry.',
      confidence: 93,
      reasoningTimeMs: 440,
      namingTerritories: [
        {
          territoryName: 'Territory A: Terroir Physics & Geology',
          theme: 'Rooted in deep soil layers, geological strata, and root hydrology.',
          names: [
            {
              name: 'TerroirSense',
              rationale: 'Direct link between French viticultural wisdom and modern sensory hardware.',
              tldLikelihood: 'terroirsense.com available',
              phoneticVibe: 'Noble, grounded, sensory',
            },
            {
              name: 'StrataVine',
              rationale: 'References the geological soil strata that define grand cru vineyard parcels.',
              tldLikelihood: 'stratavine.io available',
              phoneticVibe: 'Geological, disciplined, elevated',
            },
            {
              name: 'Sapflow',
              rationale: 'The literal pulse of water potential moving through vine xylem.',
              tldLikelihood: 'sapflow.ag available',
              phoneticVibe: 'Organic, vital, exact',
            },
          ],
        },
        {
          territoryName: 'Territory B: Atmospheric Sentinel',
          theme: 'Emphasizes predictive frost warnings and aerial micro-climate vigilance.',
          names: [
            {
              name: 'Inversion Agro',
              rationale: 'Addresses the exact physical phenomenon that causes cold hollow frost damage.',
              tldLikelihood: 'inversionagro.com available',
              phoneticVibe: 'Scientific, authoritative, preventive',
            },
            {
              name: 'CanopyGuard',
              rationale: 'Direct, unambiguous protection of high-value grape fruit zones.',
              tldLikelihood: 'canopyguard.co available',
              phoneticVibe: 'Resolute, protective, reliable',
            },
            {
              name: 'Nocturne Agri',
              rationale: 'Guarding the vineyard during the dangerous 3 AM frost hours.',
              tldLikelihood: 'nocturneagri.com available',
              phoneticVibe: 'Poetic yet vigilant, premium tier',
            },
          ],
        },
      ],
      taglineOptions: [
        {
          tagline: 'Defend Your Vintage Before the Freeze Sets In.',
          angle: 'Urgent Yield Protection',
          punchinessScore: 96,
        },
        {
          tagline: '10-Meter Terroir Telemetry for Grand Cru Estates.',
          angle: 'Elite Precision & Luxury Tier',
          punchinessScore: 92,
        },
      ],
      visualDirection: {
        mood: 'Dark alluvial soil, copper vine wire, and twilight indigo sky: organic majesty married to sensor precision.',
        colorPalette: [
          {
            name: 'Alluvial Earth',
            hex: '#1C1917',
            role: 'background',
            psychologicalIntent: 'Deep volcanic soil bedrock.',
          },
          {
            name: 'Vineyard Bark',
            hex: '#292524',
            role: 'surface',
            psychologicalIntent: 'Grounded estate warmth.',
          },
          {
            name: 'Verasion Emerald',
            hex: '#059669',
            role: 'primary',
            psychologicalIntent: 'Vibrant canopy health and living chlorophyll.',
          },
          {
            name: 'Copper Trellis',
            hex: '#D97706',
            role: 'accent',
            psychologicalIntent: 'Physical vineyard wire and sensor probe hardware.',
          },
          {
            name: 'Limestone Chalk',
            hex: '#FAFAF9',
            role: 'secondary',
            psychologicalIntent: 'Mineral elegance and contrast.',
          },
        ],
        typographyPairing: {
          headingFont: 'Cinzel Decorative or Instrument Serif',
          bodyFont: 'Inter',
          codeFont: 'Fira Code',
          rationale: 'Serif headings reflect centuries of wine pedigree, balanced by crisp telemetry typography.',
        },
        imageryStyle: 'Macro dew drops on cabernet vines, mist settling in valley hollows, and telemetry maps.',
        logoConceptDirections: [
          {
            conceptName: 'The Deep Taproot & Radio Wave',
            visualMetaphor: 'A vertical vine taproot diving deep into soil while sending concentric radio arcs.',
            description: 'Symbolizes sub-surface sensing communicating with cloud intelligence.',
            svgGlyphIdea: 'Vertical root line branching into three stylized radio frequency ripples.',
          },
        ],
      },
    };
  }
}

export function analyzeCustomTextInput(
  text: string,
  context?: { domain?: string; targetAudience?: string },
): AntiGenericCustomAuditResult {
  const lower = text.toLowerCase();
  const issues: AntiGenericClicheItem[] = [];

  // Rules database for clichés, vague claims, and buzzwords
  const rules = [
    {
      patterns: ['empower', 'empowering', 'unlock', 'unlocking your potential', 'future of innovation'],
      status: 'rejected' as const,
      reason: 'Vague aspirational corporate cliché',
      problems: [
        'Does not identify the audience or concrete problem',
        'Interchangeable with thousands of unrelated companies',
        'Lacks tangible operational outcomes',
      ],
      replacementDirection: 'Anchor to the exact mechanical workflow obstacle and the specific measurable relief.',
      whyBetter: 'Grounds the value proposition in immediate utility rather than empty philosophical abstraction.',
    },
    {
      patterns: ['next-generation', 'next-gen', 'next gen', 'revolutionize', 'revolutionizing'],
      status: 'rejected' as const,
      reason: 'Unsubstantiated chronological hype',
      problems: [
        'Overused buzzword that creates cynicism among practitioners',
        'Explains zero technical differentiation',
        'Fails to explain why today’s incumbent paradigm fails',
      ],
      replacementDirection: 'Describe the concrete architecture (e.g., "browser-native", "zero-export", "deterministic DIN-spec").',
      whyBetter: 'Allows practitioners to mentally evaluate technical credibility in under 5 seconds.',
    },
    {
      patterns: ['seamless', 'seamlessly', 'all-in-one', 'one-stop-shop', 'one stop shop'],
      status: 'rejected' as const,
      reason: 'Unbelievable utility claim & dilutive scope',
      problems: [
        'Professionals know no complex software workflow is truly seamless',
        '"All-in-one" signals shallow features across many jobs rather than excellence at the core job',
        'Alienates power users who prefer best-of-breed specialized tools',
      ],
      replacementDirection: 'Focus on frictionless critical-path bridging (e.g. "Eliminate 3-hour stem bounce cycles").',
      whyBetter: 'Positions hyper-specialization as an elite feature rather than a limitation.',
    },
    {
      patterns: ['ai-powered', 'ai powered', 'powered by ai', 'ai platform', 'smart copilot'],
      status: 'warning' as const,
      reason: 'Low-differentiation technology wrapper framing',
      problems: [
        'Signals generic API wrapper instead of native domain intelligence',
        'Focuses on the tool’s internal mechanism rather than user outcome',
        'Invites skepticism regarding hallucinations and data privacy',
      ],
      replacementDirection: 'Highlight the domain intelligence output (e.g. "Instant OEM SKU matching with DIN tolerance verification").',
      whyBetter: 'Builds buyer confidence in accuracy, safety, and specific domain mastery.',
    },
    {
      patterns: ['supercharge', '10x', '10x your', 'streamline your workflow', 'streamlining'],
      status: 'rejected' as const,
      reason: 'Generic startup hyperbole',
      problems: [
        'Empty velocity claim without units of measurement',
        'Appears on over 30% of YC and venture-backed landing pages',
        'Fails to name the exact workflow step being accelerated',
      ],
      replacementDirection: 'State the exact before-and-after baseline (e.g. "From 48-hour quote turnaround to 90 seconds").',
      whyBetter: 'Supplies quantifiable proof points that buyers can use in internal budget justification.',
    },
    {
      patterns: ['simple and easy', 'easy to use', 'intuitive', 'effortless'],
      status: 'warning' as const,
      reason: 'Subjective claim that contradicts professional domain complexity',
      problems: [
        'Domain experts expect sophisticated capabilities, not a "dumbed down" toy',
        'Every software product claims to be intuitive regardless of reality',
        'Fails to specify how high power is balanced with clarity',
      ],
      replacementDirection: 'Highlight ergonomic layout or muscle-memory preservation (e.g. "Native DAW shortcut mappings with sub-5ms playhead latency").',
      whyBetter: 'Speaks with genuine peer fluency to specialized craftsmen.',
    },
  ];

  for (const rule of rules) {
    const matched = rule.patterns.find((p) => lower.includes(p));
    if (matched) {
      issues.push({
        detectedPhraseOrConcept: matched,
        status: rule.status,
        reason: rule.reason,
        problems: rule.problems,
        evidenceOrContext: `Detected inside input text: "${text.length > 90 ? text.slice(0, 90) + '...' : text}"`,
        replacementDirection: rule.replacementDirection,
        whyReplacementIsBetter: rule.whyBetter,
      });
    }
  }

  // If no issue found, add a specificity or wedge check
  if (issues.length === 0) {
    if (text.split(' ').length < 5) {
      issues.push({
        detectedPhraseOrConcept: text,
        status: 'warning',
        reason: 'Insufficient informational density',
        problems: ['Too brief to convey unique category, target audience, or wedge'],
        evidenceOrContext: 'Input contains fewer than 5 words.',
        replacementDirection: 'Expand to state: For [Target Audience], [Product] is the [Category] that [Core Wedge].',
        whyReplacementIsBetter: 'Ensures immediate category clarity and defensibility.',
      });
    } else {
      // Clean, distinctive input
      issues.push({
        detectedPhraseOrConcept: text.slice(0, 30) + '...',
        status: 'warning',
        reason: 'Passes basic cliché filters; verify metric proof points',
        problems: ['Ensure claims are backed by founder facts or reproducible benchmarks'],
        evidenceOrContext: 'Phrase is largely devoid of common clichés.',
        replacementDirection: 'Add concrete customer validation or specific timeframe metrics if possible.',
        whyReplacementIsBetter: 'Turns good positioning into an uncopyable claim.',
      });
    }
  }

  const rejectedCount = issues.filter((i) => i.status === 'rejected').length;
  const score = Math.max(20, Math.min(95, 95 - rejectedCount * 22 - (issues.length - rejectedCount) * 8));

  return {
    inputText: text,
    detectedIssues: issues,
    distinctivenessScore: score,
    critiqueSummary:
      rejectedCount > 0
        ? `Detected ${rejectedCount} high-risk cliché tropes that dilute positioning into interchangeable startup noise.`
        : 'Text demonstrates commendable restraint against Silicon Valley buzzwords.',
    strengthsIdentified: [
      'Concrete domain references identified',
      'Avoids lowest-common-denominator consumer marketing fluff',
    ],
    recommendedWedge:
      issues[0]?.replacementDirection || 'Lead with the mechanical bottleneck and verified operational relief.',
  };
}

export function generateAntiGenericCriticOutput(
  pos: PositioningAgentOutput,
  cd: CreativeDirectorOutput,
): AntiGenericCriticOutput {
  const isAudio = pos.marketCategory.includes('Audio') || pos.marketCategory.includes('C-DAW');
  const isSales = pos.marketCategory.includes('Industrial');

  if (isAudio) {
    return {
      stage: 'CRITIQUE',
      agentName: 'Anti-Generic Critic',
      summary:
        'Audited proposed messaging against 1,000+ venture-backed startup landing pages. Discovered 3 acute cliché vulnerabilities and formulated surgical replacement rules.',
      confidence: 97,
      reasoningTimeMs: 490,
      overallGenericScore: 88, // Out of 100 (high distinctiveness after filtering)
      detectedCliches: [
        {
          detectedPhraseOrConcept: 'Empowering narrative creators to unlock their full potential',
          status: 'rejected',
          reason: 'Universal corporate cliché. Completely interchangeable across 10,000 SaaS apps.',
          problems: [
            'Does not identify what creators are actually doing (mixing stems, timeline review)',
            'Empty philosophical aspiration without operational outcome',
            'Could be used verbatim by a photo editor, canvas drawing app, or gym membership',
          ],
          evidenceOrContext:
            'Appeared in initial tagline explorations. Fails to identify what creators are actually doing.',
          replacementDirection:
            'Replace with concrete, visceral workflow mechanics: "Stop uploading 4GB ZIP files to Google Drive; review stems directly in-browser."',
          whyReplacementIsBetter:
            'States the exact mechanical pain point and desired operational outcome rather than an empty philosophical aspiration.',
        },
        {
          detectedPhraseOrConcept: 'The next-generation AI-powered platform for modern teams',
          status: 'rejected',
          reason:
            'Tells the customer nothing about what the product actually does. "Next-gen" and "AI-powered" are now perceived as low-effort wrapper buzzwords.',
          problems: [
            'Obscures the true engineering breakthrough (WebAssembly multitrack streaming)',
            'Creates cynicism among professional sound engineers who mistrust AI wrappers',
            'Completely interchangeable with general office productivity software',
          ],
          evidenceOrContext: 'Common placeholder trap in early B2B SaaS positioning copy.',
          replacementDirection:
            'Anchor to the category wedge: "Browser-native collaborative audio workstation with zero-export stem streaming."',
          whyReplacementIsBetter:
            'A practitioner understands the functional architecture in 3 seconds instead of guessing what "next-gen" means.',
        },
        {
          detectedPhraseOrConcept: 'Seamless all-in-one collaborative workspace',
          status: 'warning',
          reason:
            'Every failed tool claims to be "seamless" and "all-in-one". Audio professionals hate all-in-one tools because they usually do everything poorly.',
          problems: [
            'Audio engineers know multitrack mixing is never seamless',
            'Suggests compromise on acoustic headroom and precision controls',
          ],
          evidenceOrContext: 'Observed in draft value proposition copy.',
          replacementDirection:
            'Highlight dedicated specialization: "Built exclusively for narrative sound teams who refuse to compromise on multitrack acoustic headroom."',
          whyReplacementIsBetter:
            'Demonstrates respect for domain specialization and positions focus as a premium competitive advantage.',
        },
      ],
      criticalWeaknesses: [
        'Risk of being perceived as a toy DAW if web audio engine latency claims are not immediately proved with benchmark numbers.',
        'Must avoid marketing to generic hobbyist podcasters; stay relentlessly focused on the narrative storytelling editor.',
      ],
      founderWarning:
        'Do NOT allow your launch copy to soften into friendly generalities. Keep the edge sharp and the vocabulary technical.',
    };
  } else if (isSales) {
    return {
      stage: 'CRITIQUE',
      agentName: 'Anti-Generic Critic',
      summary:
        'Audited industrial sales messaging. Eradicated conversational bot clichés in favor of DIN-spec technical certitude.',
      confidence: 96,
      reasoningTimeMs: 460,
      overallGenericScore: 91,
      detectedCliches: [
        {
          detectedPhraseOrConcept: 'Supercharge your B2B sales quoting with magical AI',
          status: 'rejected',
          reason: 'Industrial buyers disqualify hype-heavy vendors who use words like "magical".',
          problems: [
            'Engineers demand ISO/DIN tolerance certs, not magic',
            'Signals unvetted hallucinations on high-consequence valve SKUs',
            'Does not communicate the 90-second turnaround speed',
          ],
          evidenceOrContext: 'Early draft tagline generated by generic marketing tools.',
          replacementDirection:
            'State verifiable industrial metrics: "Convert 800-page vendor spec catalogs into verified SKU quotes in 90 seconds."',
          whyReplacementIsBetter:
            'Quantifies the exact mechanical time savings and proves respect for engineering rigor.',
        },
        {
          detectedPhraseOrConcept: 'Smart conversational copilot for modern distributors',
          status: 'rejected',
          reason: 'Procurement teams do not want a chatty bot; they want an infallible parts lookup engine.',
          problems: [
            'Invites liability questions about pressure rating mismatches',
            'Sounds like an off-the-shelf OpenAI wrapper',
          ],
          evidenceOrContext: 'Value proposition draft.',
          replacementDirection:
            'Highlight hard-coded tolerance validation: "Deterministic OEM spec validation engine: guarantees pressure, temperature, and thread tolerance matching."',
          whyReplacementIsBetter:
            'Directly eliminates the single biggest risk preventing distributor purchase.',
        },
      ],
      criticalWeaknesses: [
        'Liability risks if a flange or valve SKU recommendation fails in the field.',
        'Distributor fear of exposing confidential wholesale margin data to cloud models.',
      ],
      founderWarning:
        'Never use Silicon Valley SaaS slang with industrial distributors. Use DIN, ANSI, and ASME engineering units.',
    };
  } else {
    return {
      stage: 'CRITIQUE',
      agentName: 'Anti-Generic Critic',
      summary:
        'Audited environmental sensor messaging. Purged ESG greenwashing clichés in favor of physical micro-parcel agronomics.',
      confidence: 95,
      reasoningTimeMs: 450,
      overallGenericScore: 89,
      detectedCliches: [
        {
          detectedPhraseOrConcept: 'Revolutionizing eco-friendly agriculture to save the planet',
          status: 'rejected',
          reason: 'Grand cru estate winemakers despise abstract environmental marketing.',
          problems: [
            'Does not save grapes from 3 AM frost hollows',
            'Sounds like a corporate carbon offset fund rather than a viticulture tool',
          ],
          evidenceOrContext: 'Observed in placeholder product description.',
          replacementDirection:
            'Focus on concrete harvest economics: "Defend million-dollar vintage yields with 10-meter sub-surface telemetry and predictive frost warnings."',
          whyReplacementIsBetter:
            'Ties the product directly to vintage preservation and cash revenue defensibility.',
        },
      ],
      criticalWeaknesses: [
        'Field sensor battery survival through damp, muddy winter inversions.',
        'Convincing traditional multi-generation winemakers to trust telemetry over ancestral intuition.',
      ],
      founderWarning:
        'Speak the agronomic dialect of terroir, diurnal shift, and sap pressure. Never utter generic green-tech slogans.',
    };
  }
}

export function generateBrandDebateOutput(
  pos: PositioningAgentOutput,
  per: PersonalityAgentOutput,
  cd: CreativeDirectorOutput,
  crit: AntiGenericCriticOutput,
): BrandDebateOutput {
  return {
    stage: 'BRAND_DEBATE',
    agentName: 'Brand Debate Agent',
    summary:
      'Convened a 4-way adversarial council between the Brand Strategist, Target Audience Representative, Creative Director, and Skeptical Critic to stress-test market friction.',
    confidence: 96,
    reasoningTimeMs: 510,
    debateTopic:
      'Should the brand position as a complete Pro Tools replacement, or as a zero-export collaborative companion layer?',
    personas: [
      {
        role: 'strategist',
        name: 'Elena Rostova',
        title: 'Partner, High-Alpha Brand Ventures',
        avatarColor: '#2563EB',
        stance: 'Position as a new category wedge that forces incumbents to look obsolete.',
        keyArgument:
          'If we brand as a mere "plugin" or "companion", our ACV will be capped at $15/month and we will be trapped in Dropbox pricing hell. We must claim the category: "Collaborative Narrative Workstation".',
        critiqueOfOthers:
          'The Skeptical Critic is terrified of incumbent legacy, but that exact fear prevents bold pricing power.',
        uncompromisingDemand:
          'The positioning statement must position stem export as an embarrassing relic of the 20th century.',
      },
      {
        role: 'target_audience',
        name: 'Marcus Vance',
        title: 'Lead Audio Producer, Serial Mystery Documentaries',
        avatarColor: '#F59E0B',
        stance: 'I cannot throw away my $4,000 custom Pro Tools plugins, but I will pay anything to stop stem email hell.',
        keyArgument:
          'If you tell me I have to abandon my Izotope RX de-noiser and custom hardware routing on day one, I will close your tab. Sell me on the fact that your tool bridges the gap between my timeline and my non-technical director.',
        critiqueOfOthers:
          'The Strategist lives in slide decks. In the real world, a freelance editor cannot risk missing a Sunday night client drop.',
        uncompromisingDemand:
          'Show me non-destructive roundtrip export back into my DAW, or you do not have a product I can buy.',
      },
      {
        role: 'creative_director',
        name: 'Julian Thorne',
        title: 'Global Head of Design & Typography',
        avatarColor: '#10B981',
        stance: 'Aesthetic restraint is our moat. The interface must feel like an analog mastering console.',
        keyArgument:
          'Pro Tools looks like Windows 95. Audacity looks like a high school science lab. Our dark slate obsidian palette and phosphor amber playhead create immediate lust among audio purists.',
        critiqueOfOthers:
          'Both Marcus and Elena are ignoring the irrational emotional power of an interface that feels like high-end McIntosh audio hardware.',
        uncompromisingDemand:
          'Zero cartoon illustrations. Monospace timecode displays. Absolute dark mode purity.',
      },
      {
        role: 'skeptical_critic',
        name: 'Dr. Aris Thorne',
        title: 'Principal Systems Auditor & Audio DSP Engineer',
        avatarColor: '#EF4444',
        stance: 'Browser WebAssembly cannot handle 40 simultaneous uncompressed 24-bit 96kHz WAV tracks without dropouts.',
        keyArgument:
          'If you market "zero latency multitrack" and an editor experiences a single buffer underrun during a client playback meeting, your brand is permanently dead.',
        critiqueOfOthers:
          'Julian’s pretty amber glow will not save you when Chrome tab memory crashes on a 90-minute documentary episode.',
        uncompromisingDemand:
          'Publish transparent latency benchmarks and throttle initial file streaming rather than making magical claims.',
      },
    ],
    tensionsIdentified: [
      'Strategic Ambition (Category Replacement) vs Customer Reality (Incumbent Plugin Lock-in).',
      'Aesthetic Luxury (Dark Minimalist Hardware) vs Harsh Technical Limits (Browser DSP Buffering).',
    ],
    synthesisResolution:
      'The council reached strategic consensus: The brand will position as the "First Collaborative Narrative Audio Workstation with Native DAW Roundtripping". This preserves the big category vision while offering zero risk for Marcus to adopt on his next episode. The Skeptical Critic’s latency warning is converted into a marketing wedge: "Engineered with native WASM buffering for guaranteed glitch-free playback."',
    consensusAgreed: true,
  };
}

export function generateConsistencyGuardianOutput(
  pos: PositioningAgentOutput,
  per: PersonalityAgentOutput,
  cd: CreativeDirectorOutput,
): ConsistencyGuardianOutput {
  return {
    stage: 'CONSISTENCY',
    agentName: 'Consistency Guardian',
    summary:
      'Conducted an exhaustive 8x8 cross-element harmony audit comparing Audience, Problem, Positioning, Personality, Naming, Tagline, Voice, and Visual Direction.',
    confidence: 98,
    reasoningTimeMs: 470,
    overallAlignmentScore: 94, // 0 to 100
    passStatus: 'PASSED_WITH_WARNINGS',
    guardianVerdict:
      'Exceptional structural cohesion. The acoustic engineer personality reinforces the dark slate visual palette, and the anti-generic guardrails successfully shield the positioning from buzzword dilution.',
    matrixItems: [
      {
        element: 'audience',
        status: 'aligned',
        conflictWith: [],
        explanation:
          'The target persona (narrative podcast sound editor) is consistently maintained across all strategic outputs without mission drift.',
        recommendation: 'Maintain strict focus on narrative podcast teams; resist temptation to court EDM producers.',
      },
      {
        element: 'problem',
        status: 'aligned',
        conflictWith: [],
        explanation:
          'The core problem (stem file export and review friction) directly drives the value proposition and tagline.',
        recommendation: 'Keep highlighting the 3-hour time loss metric in all pitch materials.',
      },
      {
        element: 'positioning',
        status: 'aligned',
        conflictWith: [],
        explanation:
          'Positioning statement clearly contrasts against Pro Tools and Frame.io with a credible technological reason to believe.',
        recommendation: 'Ensure landing page copy mirrors the "Zero Bounce" formulation.',
      },
      {
        element: 'personality',
        status: 'aligned',
        conflictWith: [],
        explanation:
          'The "Relentless Acoustic Craftsman" archetype pairs naturally with the friction-intolerant tone.',
        recommendation: 'Enforce the banned word list strictly during copy generation.',
      },
      {
        element: 'naming',
        status: 'aligned',
        conflictWith: [],
        explanation:
          'Top name recommendations (Resonote, Stemforge, NullBounce) resonate with the acoustic engineer persona.',
        recommendation: 'NullBounce is recommended for developer/tech cred; Resonote for broader boutique studio adoption.',
      },
      {
        element: 'tagline',
        status: 'aligned',
        conflictWith: [],
        explanation:
          '"Never Bounce a Stem Again" achieves maximum punch and directly reflects the founder’s core motivation.',
        recommendation: 'Feature as the H1 headline without decorative modifier words.',
      },
      {
        element: 'voice',
        status: 'warning',
        conflictWith: ['creative_director'],
        explanation:
          'Slight risk of voice sounding overly cold or intimidating if technical DSP jargon is not balanced with editor empathy.',
        recommendation:
          'Include relatable narrative storytelling terms ("episode drop", "table read notes") alongside technical audio specs.',
      },
      {
        element: 'visual_direction',
        status: 'aligned',
        conflictWith: [],
        explanation:
          'Obsidian background (#0A0D12) and phosphor amber accents (#F59E0B) visually manifest the acoustic mastering console concept.',
        recommendation: 'Ensure 4.5:1 WCAG contrast ratio for all secondary timecode labels.',
      },
    ],
  };
}

export function generateFinalBrandReport(
  idea: string,
  disc: DiscoveryAgentOutput,
  pos: PositioningAgentOutput,
  per: PersonalityAgentOutput,
  cd: CreativeDirectorOutput,
  crit: AntiGenericCriticOutput,
  deb: BrandDebateOutput,
  cons: ConsistencyGuardianOutput,
): FinalBrandIntelligenceReport {
  return {
    brandName: 'Stemforge' in cd.namingTerritories[0]?.names ? 'Stemforge' : cd.namingTerritories[0]?.names[0]?.name || 'Stemforge',
    oneLineDescription:
      'The browser-native collaborative audio workstation that eliminates multitrack stem exports for narrative podcast teams.',
    targetAudience: pos.primaryAudienceProfile.persona,
    coreProblem: disc.coreProblem,
    founderInsight: disc.founderMotivation,
    positioningStatement: pos.positioningStatement,
    differentiator: pos.differentiatedWedge,
    brandPromise: 'Zero-bounce collaborative stem review with pristine acoustic fidelity.',
    brandPersonality: per.coreTraits.map((t) => ({ trait: t.trait, description: t.definition })),
    traitsToAvoid: per.traitsToAvoid.map((t) => `${t.trait}: ${t.whyHarmful}`),
    namingTerritoriesSummary: cd.namingTerritories.map((t) => ({
      territory: t.territoryName,
      topPick: t.names[0]?.name || '',
      vibe: t.theme,
    })),
    selectedTagline: cd.taglineOptions[0]?.tagline || 'Never Bounce a Stem Again.',
    alternateTaglines: cd.taglineOptions.slice(1).map((t) => t.tagline),
    voiceAndMessaging: {
      elevatorPitch10s:
        'Stemforge is the collaborative audio workstation that lets narrative podcast editors and directors review multitrack sessions live in-browser with zero stem bouncing.',
      pitch30s:
        'If you produce narrative podcasts, you lose 3 hours every week exporting stems, uploading 4GB zips to Google Drive, and deciphering confusing timestamp emails from directors. Stemforge moves your multitrack timeline into a collaborative web session. Your director leaves pin-point notes on waveforms in real time, and you master without ever leaving your creative flow.',
      voicePillars: [
        'Acoustic Purity Over Gimmicks',
        'Friction-Intolerant Speed',
        'Tactile Engineering Mastery',
        'Zero Marketing Jargon',
      ],
      manifestoExcerpt:
        'We believe sound design is an elite craft, not a file management chore. When inspiration strikes at 2 AM, the last thing between your ears and the timeline should be an operating system export spinner. We built this for the obsessive storytellers who demand acoustic headroom and zero friction.',
    },
    visualSystem: {
      primaryColor: cd.visualDirection.colorPalette[2]?.hex || '#F59E0B',
      secondaryColor: cd.visualDirection.colorPalette[4]?.hex || '#F8FAFC',
      accentColor: cd.visualDirection.colorPalette[3]?.hex || '#06B6D4',
      backgroundColor: cd.visualDirection.colorPalette[0]?.hex || '#0A0D12',
      colors: cd.visualDirection.colorPalette.map((c) => ({
        name: c.name,
        hex: c.hex,
        role: c.role,
        intent: c.psychologicalIntent,
      })),
      typography: {
        heading: cd.visualDirection.typographyPairing.headingFont,
        body: cd.visualDirection.typographyPairing.bodyFont,
        code: cd.visualDirection.typographyPairing.codeFont,
      },
      logoDirection: {
        concept: cd.visualDirection.logoConceptDirections[0]?.conceptName || 'The Interlocking Waveform',
        metaphor: cd.visualDirection.logoConceptDirections[0]?.visualMetaphor || 'Synchronous acoustic linkage',
        execution: cd.visualDirection.logoConceptDirections[0]?.description || 'Geometric minimalist sine vector mark',
      },
    },
    antiGenericAudit: {
      score: crit.overallGenericScore,
      topEliminations: crit.detectedCliches.map((c) => `Rejected: "${c.detectedPhraseOrConcept}" -> ${c.replacementDirection}`),
    },
    debateSynthesis: deb.synthesisResolution,
    consistencyVerdict: cons.guardianVerdict,
    risksAndAssumptions: [
      {
        type: 'FOUNDER_INPUT',
        statement: 'Founder confirms stem export friction causes severe weekly deadline stress.',
        sourceStage: 'DISCOVERY',
      },
      {
        type: 'FACT',
        statement: 'Pro Tools and legacy DAWs do not support native real-time web browser timeline streaming.',
        sourceStage: 'POSITIONING',
      },
      {
        type: 'AI_INFERENCE',
        statement: 'Narrative audio teams will pay 3x premium for tools that preserve roundtrip Pro Tools compatibility.',
        sourceStage: 'BRAND_DEBATE',
      },
      {
        type: 'ASSUMPTION',
        statement: 'Target studios have reliable 50Mbps+ internet connections for uncompressed stem streaming.',
        sourceStage: 'DISCOVERY',
      },
      {
        type: 'RECOMMENDATION',
        statement: 'Launch with a free roundtrip DAW exporter plugin to lower adoption friction on day one.',
        sourceStage: 'CONSISTENCY',
      },
    ],
    finalRecommendations: [
      'Lead every marketing message with the concrete "3 hours lost to stem exporting" statistic.',
      'Ship an interactive browser latency demo on your landing page so sound designers can test playback buffering immediately.',
      'Maintain the dark obsidian console aesthetic across all marketing collateral to reinforce pro-audio credibility.',
      'Never describe the product as an "AI podcast generator"; emphasize human acoustic craftsmanship and collaborative velocity.',
    ],
    generatedAt: new Date().toISOString(),
  };
}

export function generateLaunchKitOutput(report: FinalBrandIntelligenceReport): LaunchKitOutput {
  return {
    landingPage: {
      headline: 'Never Bounce a Stem Again.',
      subheadline:
        'The collaborative audio workstation for narrative podcast teams. Edit multitrack sessions, stream stems directly in-browser, and review timestamped director notes in real time.',
      primaryCta: 'Start Your Free Studio Session',
      secondaryCta: 'Watch 60-Second Timeline Demo',
      problemSection:
        'You spent 4 hours cutting dialogue, only to spend the next 2 hours bouncing 12 separate WAV stems, uploading a 3GB ZIP to Google Drive, and waiting for an email with confusing timestamps like "around 14:22 sound is weird". Every episode release is an unnecessary file management marathon.',
      solutionSection:
        'Stemforge synchronizes your audio timeline directly into a secure browser link. Your showrunner and sound director click play, hear uncompressed 24-bit audio, and leave pin-point markers directly on the waveform. Changes update instantly. No exports. No lost comments. No 2 AM panic.',
      aboutSection:
        'Built by former radio documentarians and audio DSP engineers who grew tired of watching acoustic craft get bogged down in operating system file dialogs.',
      productDescriptionShort:
        'Stemforge is a browser-native multitrack digital audio workstation designed specifically for narrative podcast and audio documentary teams.',
    },
    socialContent: {
      linkedInLaunchPost: `We spent the last 6 months interviewing 40+ narrative podcast editors.

One universal nightmare came up in every single conversation:

"I spend more time bouncing stems and waiting for Google Drive uploads than I do actually mixing audio."

Today we are launching Stemforge: the first collaborative audio workstation with zero-export stem streaming.

🎧 What it solves:
- Zero bounce delays: share a live timeline link with your director in 1 click
- Lossless 24-bit playback in any modern browser
- Pin-point waveform annotations that stay locked to the playhead
- Non-destructive roundtrip export back into Pro Tools and Reaper

We believe your billable hours should go toward acoustic storytelling, not babysitting progress bars.

Try the interactive timeline demo today (link in comments). 👇`,
      twitterXThread: [
        '1/ Why do narrative podcast editors still waste 3 hours every week exporting stems to Google Drive in 2026? A thread on the broken state of audio post-production (and what we built to fix it) 🧵👇',
        '2/ Video editing had its collaborative revolution years ago with Frame.io and Figma. Audio editing is still stuck in 2004: bouncing 12 WAV files, making a ZIP, and hoping your director understands an email timestamp.',
        '3/ Meet Stemforge. Multitrack audio editing with instant browser timeline review. Your clients hear uncompressed audio directly in their browser and leave notes right on the playhead.',
        '4/ No plugins to install. No 4GB uploads. Just pure acoustic flow. Check it out at stemforge.app.',
      ],
      instagramCaption:
        'The era of "Wait 45 minutes for the stems to bounce" is officially over. 🎙️⚡️ Meet Stemforge: Collaborative multitrack audio built for storytellers who hate file management. Hit the link in bio to try the interactive web console. #podcastproduction #sounddesign #audioengineer #podcasting #protools',
    },
    pitches: {
      shortFounderPitch:
        'Stemforge is a collaborative audio workstation that lets narrative podcast editors share live multitrack sessions with directors in a browser link, eliminating the 3-hour weekly export-and-upload cycle.',
      elevatorPitch:
        'We help narrative audio teams finish episodes 3x faster by moving stem review from disconnected Google Drive folders into a live, browser-native timeline with synchronous waveform commentary.',
      investorOneLiner:
        'Stemforge is the Figma for narrative audio post-production: capturing the $4B podcast and documentary creator market with synchronous multitrack streaming.',
    },
    brandVoiceGuide: {
      voicePrinciples: [
        'Acoustically Literate: We speak the precise language of gain staging, headroom, and transient response.',
        'Anti-Blandness: We never use fluffy corporate buzzwords like "supercharge" or "next-gen".',
        'Tactile Urgency: We treat the editor’s release deadline as sacred and communicate with high-density velocity.',
      ],
      doSay: [
        'Lossless 24-bit stem streaming',
        'Direct playhead commentary',
        'Zero bounce latency',
        'Acoustic headroom',
        'Mastering suite precision',
      ],
      dontSay: [
        'Supercharge your podcast journey',
        'AI magic audio solution',
        'Seamless all-in-one content platform',
        'Disrupting the voice ecosystem',
      ],
      exampleSentences: [
        {
          context: 'Describing the primary product feature',
          sayThis: 'Review multitrack stems synchronously in your browser with zero bounce delays.',
          notThis: 'Unlock your full creative potential with our innovative audio platform.',
          why: 'The first sentence informs the practitioner about exact workflow mechanics; the second is empty marketing noise.',
        },
        {
          context: 'Answering a question about competitor software',
          sayThis: 'Pro Tools is an unmatched mixing engine, but it was never built for real-time web collaboration. We bridge that gap without disrupting your plugins.',
          notThis: 'Pro Tools is an obsolete dinosaur and we are completely replacing it.',
          why: 'Audio professionals distrust arrogant startups that dismiss their incumbent tools; pragmatic respect earns trust.',
        },
      ],
    },
  };
}
