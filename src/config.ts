export const siteConfig = {
  name: "DeepWire Celebs",
  description: "Celebrity & Entertainment News Intelligence",
  url: process.env.SITE_URL || "https://deepwire-celebs.app",
  author: "DeepWire Celebs",
  twitter: "@deepwire_celebs",
};

export const categories = [
  { id: "hollywood", label: "Hollywood", icon: "🎬" },
  { id: "bollywood", label: "Bollywood", icon: "🇮🇳" },
  { id: "kpop", label: "K-Pop", icon: "🎤" },
  { id: "music", label: "Music", icon: "🎵" },
  { id: "general", label: "General", icon: "🌟" },
];

export const navigation = [
  { title: "Trending", url: "/trending" },
  { title: "Hollywood", url: "/hollywood" },
  { title: "Bollywood", url: "/bollywood" },
  { title: "K-Pop", url: "/kpop" },
  { title: "Music", url: "/music" },
  { title: "General", url: "/general" },
];
