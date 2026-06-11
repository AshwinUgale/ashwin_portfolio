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

// Build grounding context for the LLM. Always include the identity summary so the
// model knows who Ashwin is, then the top topical matches (deduped).
function buildContext(query: string): { context: string; sources: string[] } {
  const hits = retrieve(query, 5);
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

export function answerLocally(query: string): { text: string; sources: string[] } {
  const hits = retrieve(query, 3);
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

  const { context, sources } = buildContext(q);
  const trimmedHistory = history.filter((m) => m && m.content).slice(-6);

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

  return { ...answerLocally(q), mode: 'local' };
}
