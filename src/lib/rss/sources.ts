export interface RSSSource {
  name: string;
  feedUrl: string;
  url: string;
  category: string;
  authority: number;
}

// 18 working feeds (verified 2026-06-26). Failed candidates pruned:
// - Entertainment Weekly (403), People (403), Bollywood Life (403) — likely bot-blocked
// - Allkpop (404), Pinkvilla (404), Filmfare (404) — RSS endpoints removed
// Bollywood expanded with Times of India, India Today, Koimoi, Bollywood Bubble as alternates.
export const defaultSources: RSSSource[] = [
  // Hollywood
  { name: "Variety", feedUrl: "https://variety.com/feed/", url: "https://variety.com", category: "hollywood", authority: 9 },
  { name: "Hollywood Reporter", feedUrl: "https://www.hollywoodreporter.com/feed/", url: "https://www.hollywoodreporter.com", category: "hollywood", authority: 9 },
  { name: "Deadline", feedUrl: "https://deadline.com/feed/", url: "https://deadline.com", category: "hollywood", authority: 9 },
  { name: "Just Jared", feedUrl: "https://www.justjared.com/feed/", url: "https://www.justjared.com", category: "hollywood", authority: 6 },

  // Bollywood
  { name: "Bollywood Hungama", feedUrl: "https://www.bollywoodhungama.com/rss/news.xml", url: "https://www.bollywoodhungama.com", category: "bollywood", authority: 8 },
  { name: "Times of India Entertainment", feedUrl: "https://timesofindia.indiatimes.com/rssfeeds/1081479906.cms", url: "https://timesofindia.indiatimes.com/entertainment", category: "bollywood", authority: 8 },
  { name: "India Today Entertainment", feedUrl: "https://www.indiatoday.in/rss/1206514", url: "https://www.indiatoday.in", category: "bollywood", authority: 7 },
  { name: "Koimoi", feedUrl: "https://www.koimoi.com/feed/", url: "https://www.koimoi.com", category: "bollywood", authority: 7 },
  { name: "Bollywood Bubble", feedUrl: "https://www.bollywoodbubble.com/feed/", url: "https://www.bollywoodbubble.com", category: "bollywood", authority: 6 },

  // K-Pop
  { name: "Soompi", feedUrl: "https://www.soompi.com/feed", url: "https://www.soompi.com", category: "kpop", authority: 8 },
  { name: "Koreaboo", feedUrl: "https://www.koreaboo.com/feed/", url: "https://www.koreaboo.com", category: "kpop", authority: 6 },

  // Music
  { name: "Billboard", feedUrl: "https://www.billboard.com/feed/", url: "https://www.billboard.com", category: "music", authority: 9 },
  { name: "Rolling Stone", feedUrl: "https://www.rollingstone.com/music/music-news/feed/", url: "https://www.rollingstone.com", category: "music", authority: 9 },
  { name: "NME", feedUrl: "https://www.nme.com/feed", url: "https://www.nme.com", category: "music", authority: 8 },
  { name: "Pitchfork", feedUrl: "https://pitchfork.com/feed/feed-news/rss", url: "https://pitchfork.com", category: "music", authority: 8 },

  // General
  { name: "E! Online", feedUrl: "https://www.eonline.com/syndication/feeds/rssfeeds/topstories.xml", url: "https://www.eonline.com", category: "general", authority: 8 },
  { name: "Page Six", feedUrl: "https://pagesix.com/feed/", url: "https://pagesix.com", category: "general", authority: 7 },
  { name: "TMZ", feedUrl: "https://www.tmz.com/rss.xml", url: "https://www.tmz.com", category: "general", authority: 7 },
];

export const categoryMapping: Record<string, string> = {
  hollywood: "hollywood",
  bollywood: "bollywood",
  kpop: "kpop",
  music: "music",
  general: "general",
};
