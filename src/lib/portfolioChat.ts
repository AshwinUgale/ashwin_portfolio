import { KNOWLEDGE as BASE, KnowledgeChunk } from '@/data/portfolioKnowledge';
import { EXTRA } from '@/data/portfolioKnowledgeExtra';

const KNOWLEDGE: KnowledgeChunk[] = [...BASE, ...EXTRA];

const STOPWORDS = new Set([
  'the', 'a', 'an', 'and', 'or', 'is', 'are', 'was', 'were', 'do', 'does', 'did', 'you', 'your',
  'me', 'my', 'i', 'to', 'of', 'in', 'on', 'for', 'with', 'about', 'what', 'how', 'why', 'tell',
  'can', 'could', 'would', 'have', 'has', 'at', 'it', 'this', 'that', 'as', 'be', 'so', 'any',
  'some', 'give', 'show', 'whats', "what's", 'into', 'their', 'them', 'they', 'whos', "who's",
  'know', 'more', 'work', 'working', 'use', 'using', 'used', 'ashwin', 'ugale',
]);

function tokenize(s: string): string[] {
  return s
    .toLowerCase()
    .split(/[^a-z0-9+#.]+/)
    .map((t) => t.replace(/^[.+#]+|[.+#]+$/g, ''))
    .filter((t) => t.length > 1 && !STOPWORDS.has(t));
}

function variants(t: string): string[] {
  const v = [t];
  if (t.length > 3 && t.endsWith('s')) v.push(t.slice(0, -1));
  if (t.length > 4 && t.endsWith('es')) v.push(t.slice(0, -2));
  return v;
}

function hasMatch(hay: string, v: string): boolean {
  // whole-word match for plain tokens (so "eat" doesn't match "treat"); substring for tokens with symbols
  if (/^[a-z0-9]+$/.test(v)) return new RegExp('\\b' + v + '\\b').test(hay);
  return hay.includes(v);
}

function scoreChunk(chunk: KnowledgeChunk, terms: string[]): number {
  const kw = ' ' + chunk.keywords.toLowerCase() + ' ';
  const title = ' ' + chunk.title.toLowerCase() + ' ';
  const body = ' ' + chunk.text.toLowerCase() + ' ';
  let score = 0;
  for (const term of terms) {
    let best = 0;
    for (const v of variants(term)) {
      if (hasMatch(kw, v)) best = Math.max(best, 3);
      else if (hasMatch(title, v)) best = Math.max(best, 2);
      else if (hasMatch(body, v)) best = Math.max(best, 1);
    }
    score += best;
  }
  return score;
}

export function retrieve(query: string, k = 4): { chunk: KnowledgeChunk; score: number }[] {
  const terms = tokenize(query);
  if (terms.length === 0) return [];
  return KNOWLEDGE.map((chunk) => ({ chunk, score: scoreChunk(chunk, terms) }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, k);
}

// Generic intent words that carry no subject. A question made only of these ("what
// problem does it solve?", "how does it work?", "tell me more") is a follow-up about
// whatever was just discussed — not a new topic.
const GENERIC = new Set([
  'problem', 'problems', 'solve', 'solves', 'solved', 'solving', 'make', 'makes', 'made',
  'build', 'builds', 'built', 'thing', 'things', 'stuff', 'good', 'better', 'best', 'hard',
  'easy', 'mean', 'means', 'explain', 'detail', 'details', 'example', 'examples', 'point',
  'points', 'benefit', 'benefits', 'matter', 'important', 'special', 'unique',
  'different', 'difference', 'differ', 'apart', 'compare', 'comparison', 'versus',
  'limitation', 'limitations', 'downside', 'downsides', 'tradeoff', 'tradeoffs',
  'its', 'their', 'theirs', 'one', 'ones', 'work', 'works', 'working',
]);

function isFollowUp(query: string): boolean {
  // After tokenising (which already drops stopwords like how/what/does/it/use), a
  // follow-up has no remaining subject noun.
  return tokenize(query).filter((t) => !GENERIC.has(t)).length === 0;
}

// Build a retrieval query that stays on topic across turns. For a follow-up, anchor
// hard to the recent user turns (repeated so the topic dominates generic body matches);
// for a question that names its own subject, trust the question so new topics still win.
function retrievalText(query: string, history: ChatMessage[]): string {
  const recentUser = history
    .filter((m) => m.role === 'user')
    .slice(-2)
    .map((m) => m.content)
    .join(' ');
  if (recentUser && isFollowUp(query)) {
    return `${recentUser} ${recentUser} ${query}`.trim();
  }
  return query;
}

// Build grounding context for the LLM. Always include the identity summary so the
// model knows who Ashwin is, then the top topical matches (deduped).
function buildContext(query: string, history: ChatMessage[] = []): { context: string; sources: string[] } {
  const hits = retrieve(retrievalText(query, history), 6);
  const seen = new Set<string>();
  const chunks: KnowledgeChunk[] = [];
  const summary = KNOWLEDGE.find((c) => c.id === 'summary');
  if (summary) { chunks.push(summary); seen.add(summary.id); }
  for (const h of hits) {
    if (!seen.has(h.chunk.id)) { chunks.push(h.chunk); seen.add(h.chunk.id); }
  }
  const context = chunks.map((c) => `## ${c.title}\n${c.text}`).join('\n\n').slice(0, 7000);
  return { context, sources: hits.map((h) => h.chunk.title) };
}

const FALLBACK =
  "I can tell you about Ashwin's work at Enidus (the T-Mobile LLM agent platform), his open-source AI projects (DocChat, Mneme, ToolPicker, docchat-server), his eval methodology, hybrid retrieval, tech stack, experience, and how to reach him — but I don't have anything on that. Try one of those, or email ugaleashwin@gmail.com.";

export function answerLocally(query: string, history: ChatMessage[] = []): { text: string; sources: string[] } {
  const hits = retrieve(retrievalText(query, history), 3);
  if (hits.length === 0 || hits[0].score < 2) return { text: FALLBACK, sources: [] };
  // Return only the single best-matching chunk so the fallback reads as one coherent answer.
  return { text: hits[0].chunk.text, sources: [hits[0].chunk.title] };
}

type ChatMessage = { role: 'user' | 'assistant'; content: string };

const ENV = (import.meta as unknown as { env?: Record<string, string | boolean> }).env || {};
const CHAT_API_URL: string =
  (ENV.VITE_CHAT_API_URL as string) || '/api/chat';

async function fetchWithTimeout(url: string, body: unknown, ms: number): Promise<Response> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), ms);
  try {
    return await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: ctrl.signal,
    });
  } finally {
    clearTimeout(timer);
  }
}

export async function askPortfolio(
  query: string,
  history: ChatMessage[] = []
): Promise<{ text: string; sources: string[]; mode: 'llm' | 'local' }> {
  const q = (query || '').trim().slice(0, 1000);
  if (!q) return { text: FALLBACK, sources: [], mode: 'local' };

  const trimmedHistory = history.filter((m) => m && m.content).slice(-6);
  const { context, sources } = buildContext(q, trimmedHistory);

  if (CHAT_API_URL) {
    try {
      const res = await fetchWithTimeout(CHAT_API_URL, { query: q, context, history: trimmedHistory }, 20000);
      if (res.ok) {
        const data = await res.json().catch(() => null);
        const text: string = (data && (data.answer ?? data.text)) || '';
        if (text.trim()) return { text: text.trim(), sources, mode: 'llm' };
      }
    } catch {
      /* network / timeout / abort -> fall back */
    }
  }

  return { ...answerLocally(q, trimmedHistory), mode: 'local' };
}
