export interface DemoPreset {
  id: string;
  name: string;
  badge: string;
  rawIdea: string;
  suggestedAnswers: {
    question: string;
    answer: string;
  }[];
}

export const DEMO_PRESETS: DemoPreset[] = [
  {
    id: 'podcast-daw',
    name: 'Narrative Audio DAW',
    badge: 'Creator Tech',
    rawIdea:
      'We are building a browser-native collaborative audio workstation specifically for narrative podcast producers who are overwhelmed by Pro Tools and waste hours exporting stems to Google Drive for director review.',
    suggestedAnswers: [
      {
        question: 'Who is the first person who needs this today?',
        answer:
          'Freelance narrative podcast editors working with remote directors, sound designers, and audio documentary storytellers.',
      },
      {
        question: 'What alternatives do they currently use and why switch?',
        answer:
          'They juggle Pro Tools or Reaper, Bounce WAV stems, upload to Google Drive or Frame.io, and manually translate timestamped email comments back into their timeline.',
      },
      {
        question: 'What should the brand feel like, and what must it never feel like?',
        answer:
          'It should feel like an elite, razor-sharp mastering suite built by obsessive acoustic engineers. It must NEVER feel like a playful cartoon podcast toy or a generic transcription AI app.',
      },
    ],
  },
  {
    id: 'b2b-sales-agent',
    name: 'Industrial Sales AI',
    badge: 'B2B Enterprise',
    rawIdea:
      'An autonomous conversational AI agent that handles technical inbound RFPs and parts specifications for industrial equipment manufacturers and valve distributors.',
    suggestedAnswers: [
      {
        question: 'Who is the first person who needs this today?',
        answer:
          'Head of Sales and Technical Applications Engineers at mid-market fluid power and electrical equipment distributors.',
      },
      {
        question: 'What alternatives do they currently use and why switch?',
        answer:
          'Junior sales coordinators manually cross-referencing 800-page PDF spec catalogs and taking 48 hours to return quote bids, losing deals to fast competitors.',
      },
      {
        question: 'What should the brand feel like, and what must it never feel like?',
        answer:
          'Rock-solid reliability, engineering precision, DIN-spec industrial certitude. Never fluffy Silicon Valley SaaS hype or a cheerful consumer chatbot.',
      },
    ],
  },
  {
    id: 'climate-iot',
    name: 'Boutique Vineyard IoT',
    badge: 'Hardware & Climate',
    rawIdea:
      'Sub-surface soil sensor probes and micro-climate forecasting stations tailored for high-end boutique winemakers facing sudden drought and frost spikes.',
    suggestedAnswers: [
      {
        question: 'Who is the first person who needs this today?',
        answer:
          'Estate vineyard viticulturists and winemakers managing 20-100 acre high-value Pinot Noir and Cabernet parcels.',
      },
      {
        question: 'What alternatives do they currently use and why switch?',
        answer:
          'Physical pressure chambers (scholander bombs) used once a week and coarse public weather stations that miss 5-degree temperature inversions in low hollows.',
      },
      {
        question: 'What should the brand feel like, and what must it never feel like?',
        answer:
          'Terroir-respecting agronomic wisdom married to defense-grade sensor optics. Never cheap plastic consumer gadgetry or abstract corporate ESG greenwashing.',
      },
    ],
  },
];
