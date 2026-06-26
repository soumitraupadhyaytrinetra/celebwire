import OpenAI from "openai";

const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

export interface ArticleEnrichment {
  tldr: string;
  bulletSummary: string[];
  executiveSummary: string;
  whyItMatters: string;
  culturalImpact: string;
  businessImpact: string;
  category: string;
  tags: string[];
  celebrities: string[];
  projects: string[];
  brands: string[];
  companies: string[];
  importanceScore: number;
}

const SYSTEM_PROMPT = `You are a celebrity and entertainment news analyst. Analyze the given article and return a JSON object with:
- tldr: One sentence summary
- bulletSummary: Array of 3 key bullet points
- executiveSummary: 2-3 sentence overview of who/what/why
- whyItMatters: Why this matters in the broader entertainment/cultural context
- culturalImpact: Cultural or fan-reception implications
- businessImpact: Box-office, streaming, sales, or industry implications
- category: One of: hollywood, bollywood, kpop, music, general
- tags: Array of relevant tags (max 8)
- celebrities: Array of celebrities, actors, musicians, or public figures mentioned (full names)
- projects: Array of movies, shows, albums, tours, or other works mentioned
- brands: Array of studios, labels, agencies, or fashion brands mentioned
- companies: Array of companies or production houses mentioned
- importanceScore: 1-100 score based on source authority, entertainment significance, and cultural impact`;

export async function enrichArticle(
  title: string,
  content: string,
  source: string
): Promise<ArticleEnrichment | null> {
  if (!openai) {
    return getDefaultEnrichment(title, source);
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: `Title: ${title}\nSource: ${source}\n\nContent: ${content.slice(0, 4000)}`,
        },
      ],
      response_format: { type: "json_object" },
      temperature: 0.3,
      max_tokens: 1000,
    });

    const text = response.choices[0]?.message?.content;
    if (!text) return getDefaultEnrichment(title, source);

    return JSON.parse(text);
  } catch (error) {
    console.error("AI enrichment failed:", error);
    return getDefaultEnrichment(title, source);
  }
}

function getDefaultEnrichment(title: string, source: string): ArticleEnrichment {
  return {
    tldr: title,
    bulletSummary: [title],
    executiveSummary: title,
    whyItMatters: `Reported by ${source}`,
    culturalImpact: "Analysis pending",
    businessImpact: "Analysis pending",
    category: "general",
    tags: [source],
    celebrities: [],
    projects: [],
    brands: [],
    companies: [],
    importanceScore: 50,
  };
}
