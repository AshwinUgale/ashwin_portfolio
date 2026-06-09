import { KNOWLEDGE, KnowledgeChunk } from '@/data/portfolioKnowledge';

const STOPWORDS = new Set([
  'the', 'a', 'an', 'and', 'or', 'is', 'are', 'was', 'were', 'do', 'does', 'did', 'you', 'your',
  'me', 'my', 'i', 'to', 'of', 'in', 'on', 'for', 'with', 'about', 'what', 'how', 'why', 'tell',
  'can', 'could', 'would', 'have', 'has', 'at', 'it', 'this', 'that', 'as', 'be', 'so', 'any',
  'some', 'give', 'show', 'whats', "what's", 'into', 'their', 'them', 'they', 'whos', "who's",
  'know', 'more', 'work', 'working', 'use', 'using', 'used',
  // the subject's own name carries no topical signal — don't let it match the bio
  'ashwin', 'ugale',
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

function scoreChunk(chunk: KnowledgeChunk, terms: string[]): number {
  const kw = ' ' + chunk.keywords.toLowerCase() + ' ';
  const title = ' ' + chunk.title.toLowerCase() + ' ';
  const body = ' ' + chunk.text.toLowerCase() + ' ';
  let score = 0;
  for (const term of terms) {
    let best = 0;
    for (const v of variants(term)) {
      if (kw.includes(v)) best = Math.max(best, 3);
      else if (title.includes(v)) best = Math.max(best, 2);
      else if (body.includes(v)) best = Math.max(best, 1);
    }
    score += best;
  }
  return score;
}

export function retrieve(query: string, k = 3): { chunk: KnowledgeChunk; score: number }[] {
  const terms = tokenize(query);
  if (terms.length === 0) return [];
  return KNOWLEDGE.map((chunk) => ({ chunk, score: scoreChunk(chunk, terms) }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, k);
}

const FALLBACK =
  "I can answer questions about Ashwin's current work at Enidus (the T-Mobile LLM agent platform), his open-source AI projects (DocChat, Mneme, ToolPicker, docchat-server), his eval methodology, hybrid retrieval, tech stack, prior experience, and how to get in touch — but I don't have anything on that. Try asking about one of those.";

export function answerLocally(query: string): { text: string; sources: string[] } {
  const hits = retrieve(query, 3);
  if (hits.length === 0 || hits[0].score < 2) {
    return { text: FALLBACK, sources: [] };
  }
  const top = hits[0];
  const parts = [top.chunk.text];
  const sources = [top.chunk.title];
  if (hits[1] && hits[1].score >= top.score * 0.6 && hits[1].chunk.id !== top.chunk.id) {
    parts.push(hits[1].chunk.text);
    sources.push(hits[1].chunk.title);
  }
  return { text: parts.join('\n\n'), sources };
}

type ChatMessage = { role: 'user' | 'assistant'; content: string };

const ENV = (import.meta as unknown as { env?: Record<string, string | boolean> }).env || {};
// Same-origin /api/chat: Vercel function in prod, Vite dev plugin locally. Override with VITE_CHAT_API_URL.
const CHAT_API_URL: string =
  (ENV.VITE_CHAT_API_URL as string) || '/api/chat';

export async function askPortfolio(
  query: string,
  history: ChatMessage[] = []
): Promise<{ text: string; sources: string[]; mode: 'llm' | 'local' }> {
  const hits = retrieve(query, 4);
  const context = hits.map((h) => `## ${h.chunk.title}\n${h.chunk.text}`).join('\n\n');

  if (CHAT_API_URL) {
    try {
      const res = await fetch(CHAT_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, context, history }),
      });
      if (res.ok) {
        const data = await res.json();
        const text: string = data.answer ?? data.text ?? '';
        if (text) return { text, sources: hits.map((h) => h.chunk.title), mode: 'llm' };
      }
    } catch {
      /* fall through to local */
    }
  }

  const local = answerLocally(query);
  return { ...local, mode: 'local' };
}
