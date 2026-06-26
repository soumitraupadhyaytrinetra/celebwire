import { describe, it, expect } from "vitest";
import { classifyArticle, getPrimaryCategory } from "../../src/lib/ai/classify";

describe("classifyArticle — celebrity categories", () => {
  it("tags a Hollywood article as hollywood", () => {
    const tags = classifyArticle(
      "Tom Cruise returns to the Oscars with a new Mission Impossible",
      "The Hollywood actor is set to walk the red carpet at the Academy Awards next month. Paramount produced the film."
    );
    expect(tags).toContain("hollywood");
  });

  it("tags a Bollywood article as bollywood", () => {
    const tags = classifyArticle(
      "Shah Rukh Khan announces new Bollywood film with Deepika Padukone",
      "The Indian actor is set to star in a Hindi film produced by a Mumbai studio. The Indian film industry is abuzz."
    );
    expect(tags).toContain("bollywood");
  });

  it("tags a K-Pop article as kpop", () => {
    const tags = classifyArticle(
      "BLACKPINK announces 2026 comeback world tour",
      "The K-pop girl group released a teaser for their new album on YouTube. YG Entertainment confirmed the news to fans."
    );
    expect(tags).toContain("kpop");
  });

  it("tags a Music article as music", () => {
    const tags = classifyArticle(
      "Taylor Swift announces surprise album drop with 16 new tracks",
      "The pop star surprised fans with a new album release on Spotify. The singer-songwriter co-produced every track."
    );
    expect(tags).toContain("music");
  });

  it("tags a General celeb article as general", () => {
    const tags = classifyArticle(
      "Kate Middleton makes first public appearance since summer break",
      "The Princess of Wales attended a royal family event at Windsor Castle. Prince William was also present."
    );
    expect(tags).toContain("general");
  });

  it("matches multiple categories when a story crosses domains", () => {
    const tags = classifyArticle(
      "BTS members attend the Grammy Awards red carpet",
      "The K-pop group appeared at the Grammy Awards red carpet alongside Hollywood celebrities."
    );
    expect(tags).toContain("kpop");
    expect(tags).toContain("music");
  });

  it("does NOT match finance keywords (regression guard)", () => {
    const tags = classifyArticle(
      "JPMorgan reports record quarterly profit on strong lending",
      "The bank's net interest margin expanded as deposits grew."
    );
    expect(tags).not.toContain("banking");
    expect(tags).not.toContain("finance");
  });
});

describe("getPrimaryCategory — celebrity source hints", () => {
  it("falls back to source hint when article text has no keywords", () => {
    const cat = getPrimaryCategory(
      "Untitled update",
      "no recognizable keywords here",
      "Variety"
    );
    expect(cat).toBe("hollywood");
  });

  it("returns kpop for a BTS article with kpop source", () => {
    const cat = getPrimaryCategory(
      "BTS comeback announced",
      "the korean idol group bts confirms new album",
      "Soompi"
    );
    expect(cat).toBe("kpop");
  });

  it("picks the highest-priority matched category", () => {
    const cat = getPrimaryCategory(
      "BTS members attend the Grammy Awards red carpet",
      "the k-pop group appeared at the grammy awards red carpet",
      "Billboard"
    );
    // Both kpop and music keywords match. Priority chain picks the first in [hollywood, bollywood, kpop, music, general].
    expect(cat).toBe("kpop");
  });

  it("does NOT match kpop on substring false-positives like 'active'/'positive'/'I\'ve' (regression)", () => {
    // The K-Pop group "ive" should only match when it stands as a word —
    // not as a substring of "active", "positive", "massive", "I\'ve", etc.
    const tags = classifyArticle(
      "Massive positive response to the new policy, officials say",
      "The reform has been widely praised. Active citizens and leaders alike have voiced approval. We\'ve seen broad support."
    );
    expect(tags).not.toContain("kpop");
  });

});
