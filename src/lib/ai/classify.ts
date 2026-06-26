export const CATEGORY_KEYWORDS: Record<string, string[]> = {
  hollywood: [
    "hollywood", "los angeles", "oscar", "oscars", "academy awards",
    "golden globe", "golden globes", "sag awards", "sag aftra", "emmys", "emmy awards",
    "movie premiere", "film premiere", "box office", "opening weekend",
    "red carpet", "walk of fame", "a-list",
    "paramount", "warner bros", "warner bros discovery", "disney", "marvel",
    "universal pictures", "sony pictures", "lionsgate", "a24", "netflix film",
    "tom cruise", "brad pitt", "leonardo dicaprio", "george clooney",
    "jennifer lawrence", "meryl streep", "denzel washington",
    "matt damon", "julia roberts", "scarlett johansson", "margot robbie",
    "chris hemsworth", "chris evans", "robert downey", "ryan gosling",
    "academy award", "best picture", "best director", "best actor", "best actress",
    "sundance", "cannes film festival", "venice film festival", "tiff",
    "telluride", "tribeca film festival",
    "screenplay", "director", "screenwriter",
  ],
  bollywood: [
    "bollywood", "indian cinema", "hindi cinema", "hindi film", "indian film",
    "indian film industry", "indian actor", "indian actress", "indian director",
    "bollywood actor", "bollywood actress", "bollywood film", "bollywood movie",
    "box office india", "indian box office",
    "shah rukh khan", "srk", "salman khan", "amitabh bachchan",
    "deepika padukone", "ranveer singh", "alia bhatt", "ranbir kapoor",
    "katrina kaif", "priyanka chopra", "akshay kumar",
    "aishwarya rai", "madhubala", "rajesh khanna", "rekha",
    "karan johar", "yash chopra", "rajkumar hirani",
    "sanjay leela bhansali", "imtiaz ali", "zoya akhtar",
    "filmfare awards", "iifa", "zee cine awards", "screen awards",
    "national film awards india",
    "mumbai", "tollywood", "kollywood", "sandalwood",
    "shah rukh", "salman", "deepika", "alia bhatt", "ranveer",
    "shilpa shetty", "kareena kapoor", "karisma kapoor", "kajol", "rani mukerjee",
    "shahid kapoor", "varun dhawan", "tiger shroff",
    "anushka sharma", "sara ali khan", "janhvi kapoor",
    "ayesha khan", "mouni roy", "disha patani", "kriti sanon",
  ],
  kpop: [
    "k-pop", "kpop", "k pop", "korean pop",
    "korean idol", "korean entertainment", "idol group",
    "comeback", "debut", "korean debut",
    "sm entertainment", "jyp entertainment", "yg entertainment", "hybe", "cube entertainment",
    "kakao entertainment", "starship", "ist entertainment", "pledis",
    "bts", "bangtan boys", "bts army",
    "blackpink", "blink",
    "twice", "stray kids", "exo", "red velvet", "nct",
    "seventeen", "txt", "tomorrow x together", "ateez",
    "itzy", "aespa", "newjeans", "ive", "le sserafim",
    "babymonster", "riize", "boynextdoor", "zerobaseone", "zb1",
    "enhypen", "treasure", "nmixx", "stayc", "kiss of life",
    "jungkook", "jimin", "taehyung", "suga", "rm", "jhope",
    "jennie", "lisa", "rose", "jisoo", "minnie", "miyeon",
    "k-drama", "korean drama", "korean movie",
    "韩流", "韩剧",
  ],
  music: [
    "album release", "new album", "debut album", "album drop",
    "new song", "single release", "music video", "mv release", "music video premiere",
    "tour", "concert", "concert tour", "world tour",
    "festival", "coachella", "lollapalooza", "glastonbury", "rolling loud",
    "reading festival", "sxsw", "bonnaroo", "primavera sound",
    "grammy", "grammys", "billboard music awards", "vmas", "mtv vmas",
    "billboard hot 100", "billboard 200",
    "spotify", "apple music", "tidal", "youtube music", "deezer",
    "taylor swift", "beyonce", "drake", "kendrick lamar",
    "bad bunny", "dua lipa", "the weeknd", "rihanna",
    "adele", "ed sheeran", "justin bieber", "ariana grande",
    "billie eilish", "olivia rodrigo", "doja cat", "sza",
    "singer", "singer-songwriter", "rapper", "hip-hop", "pop star",
    "producer", "remix", "collaboration", "collab",
    "label", "record label", "platinum", "diamond certification",
  ],
  general: [
    "reality tv", "reality show", "streaming series",
    "streaming platform", "netflix series", "hbo max", "disney+", "paramount+",
    "apple tv+", "amazon prime video", "peacock", "max",
    "royal family", "british royal family", "windsor",
    "kate middleton", "princess of wales", "prince william",
    "princess diana", "king charles", "queen camilla",
    "harry", "meghan", "sussex",
    "viral", "trending", "celebrity scandal", "celebrity news",
    "celebrity divorce", "celebrity split", "celebrity breakup",
    "engagement", "pregnancy announcement", "baby announcement",
    "red carpet fashion", "met gala", "met ball",
    "oscars fashion", "grammy fashion", "cannes fashion",
    "influencer", "tiktoker", "instagram star", "youtube star",
    "celebrity chef", "kardashian", "jenner", "kardashians",
    "celebrity wedding", "celebrity death", "celebrity tribute",
    "talk show", "late night", "jimmy fallon", "jimmy kimmel", "stephen colbert",
    "ellen degeneres", "oprah", "golden globes red carpet",
  ],
};

export const SOURCE_CATEGORY_HINTS: Record<string, string[]> = {
  "Variety": ["hollywood"],
  "Hollywood Reporter": ["hollywood"],
  "Deadline": ["hollywood"],
  "Entertainment Weekly": ["hollywood"],
  "Just Jared": ["hollywood"],
  "Bollywood Hungama": ["bollywood"],
  "Pinkvilla": ["bollywood"],
  "Filmfare": ["bollywood"],
  "Bollywood Life": ["bollywood"],
  "Soompi": ["kpop"],
  "Allkpop": ["kpop"],
  "Koreaboo": ["kpop"],
  "Billboard": ["music"],
  "Rolling Stone": ["music"],
  "NME": ["music"],
  "Pitchfork": ["music"],
  "People": ["general"],
  "E! Online": ["general"],
  "Page Six": ["general"],
  "TMZ": ["general"],
};

function extractKeywords(title: string, content: string): string {
  return `${title} ${content}`.toLowerCase();
}

// Word-boundary keyword match. Substring matching (String.includes) was
// catching false positives on short keywords — e.g. the K-Pop group "ive"
// matched "active", "positive", "I've". Word boundaries fix that for all
// keywords, not just short ones, with negligible perf cost at our scale.
function kwMatches(text: string, kw: string): boolean {
  const escaped = kw.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`\\b${escaped}\\b`, "i").test(text);
}

export function classifyArticle(title: string, content: string): string[] {
  const text = extractKeywords(title, content);
  const matched: string[] = [];

  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    if (keywords.some((kw) => kwMatches(text, kw))) {
      matched.push(category);
    }
  }

  return [...new Set(matched)];
}

export function getPrimaryCategory(
  title: string,
  content: string,
  source: string
): string {
  const keywords = classifyArticle(title, content);
  const sourceHint = SOURCE_CATEGORY_HINTS[source];

  if (keywords.length === 0 && sourceHint) {
    return sourceHint[0];
  }

  // If a keyword matched, prefer the most specific single category.
  // For celebs the 5 categories are siblings — pick the first that matched.
  if (keywords.length > 0) {
    const priority = ["kpop", "bollywood", "hollywood", "music", "general"];
    for (const cat of priority) {
      if (keywords.includes(cat)) return cat;
    }
  }

  if (sourceHint) return sourceHint[0];

  return "general";
}

export const categoryMapping: Record<string, string> = {
  hollywood: "hollywood",
  bollywood: "bollywood",
  kpop: "kpop",
  music: "music",
  general: "general",
};
