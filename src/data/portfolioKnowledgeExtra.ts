import { KnowledgeChunk } from './portfolioKnowledge';

// Extra coverage so more questions land. Public-safe, same format.
export const EXTRA: KnowledgeChunk[] = [
  {
    id: 'muteval',
    title: 'Muteval (mutation testing for evals)',
    keywords: 'muteval mutation testing evals eval suite coverage survivors deepeval ragas promptfoo pypi npm mutation score',
    text:
      "Muteval is mutation testing for LLM eval suites, published to PyPI. It deliberately degrades the thing under test — the prompt, retrieved context, tool outputs, or model — reruns your existing evals against each degraded 'mutant', and reports a mutation score: the share of injected regressions your evals actually caught. The ones they miss are survivors — concrete blind spots in your eval coverage. Its killer property is absence detection: it can tell you that you have no eval for a behavior at all. It ships adapters for DeepEval, RAGAS, and promptfoo and can gate CI with a --fail-under threshold. One-sentence question: would your eval suite actually catch a regression?",
  },
  {
    id: 'tracelint',
    title: 'tracelint (linter for agent runs)',
    keywords: 'tracelint linter agent trace tool calling structural defects deterministic rules langfuse otel opentelemetry openinference trail fault injector recovery scorecard pypi ci exit code hallucinated arguments loops',
    text:
      "tracelint is a deterministic linter for agent execution traces, on PyPI. After a tool-calling agent runs, it reads the trace and flags structural defects — schema-violating calls, ignored tool errors, hallucinated arguments, loops, redundant calls — each with the exact trace lines as evidence and a CI exit code. No model ever judges it; the checks are structurally decidable. It has adapters for OpenAI messages, Langfuse, and OpenTelemetry/OpenInference, and was validated on real Langfuse v4 runs and real TRAIL benchmark traces. It also ships a fault injector and a per-fault recovery scorecard. One-sentence question: did the agent run violate structural expectations?",
  },
  {
    id: 'goldset',
    title: 'goldset (Golden-Set Builder)',
    keywords: 'goldset golden set builder regression test suite curation traffic logs clustering dedup coverage drift pii redaction promptfoo human confirmation nli memory scenarios bitext',
    text:
      "goldset turns real traffic and traces into a versioned regression test suite — deduplicated, coverage-tracked, and drift-aware — with a mandatory human or oracle confirmation step. Its spine: you can't bootstrap ground truth from ungraded logs, so nothing is exported as 'golden' until a human confirms it and it carries a contract. It clusters inputs into intents, mines failures and rare cases, redacts PII before storing, and exports a promptfoo suite. Validated on the Bitext support corpus at 0.99 category purity and 96% coverage. It's a curation accelerator, not a gold factory, and is installed from GitHub. One-sentence question: are our regression cases representative and trustworthy?",
  },
  {
    id: 'retrieval-lab',
    title: 'Retrieval Lab (RAG retrieval benchmark)',
    keywords: 'retrieval lab rag benchmark chunking embeddings dense bm25 hybrid rerank reranking hnsw ann failure attribution stage hit mrr squad beir pypi',
    text:
      "Retrieval Lab benchmarks RAG retrieval configurations on your own corpus and, for every failed query, attributes the miss to the exact pipeline stage that lost the evidence — representation, ANN index, candidate generation, fusion, reranker demotion, or the final/budget cutoff. It compares chunking strategies, embedding models, dense/BM25/hybrid retrieval, reranking, and exact-vs-HNSW indexes, and produces a self-contained HTML report with ranked configs, hit@k, MRR, confidence intervals, and latency. Gold answers use source-document character spans so evaluation stays stable as chunking changes. It's on PyPI. One-sentence question: which retrieval config wins, and where did the misses get lost?",
  },
  {
    id: 'current-role',
    title: 'Current role',
    keywords: 'where do you work currently current company employer job role now present which company who do you work for currently working position title',
    text:
      "I currently work at Enidus USA as a Software Engineer on the AI/LLM platform team (since August 2025). I'm building a multi-tenant LLM agent platform for T-Mobile for Business reseller operations.",
  },
  {
    id: 'proudest',
    title: 'Proudest / strongest project',
    keywords: 'best proud proudest strongest impressive flagship highlight standout which project showcase',
    text:
      "The work I'm proudest of is DocChat. What makes it stand out isn't the demo — it's the iteration discipline: a public CHANGELOG that documents two regressions I measured and reverted, with the eval numbers attached. It lands at 0.943 version-correctness and a 1.000 refusal rate on out-of-scope questions across a 48-pair eval, and it dogfoods two libraries I shipped (Mneme and ToolPicker).",
  },
  {
    id: 'differentiator',
    title: 'What makes me different',
    keywords: 'why hire you different stand out unique strength strengths sell pitch value add edge special why you',
    text:
      "Two things. First, eval discipline: I treat AI like production software — every release is gated by a labeled eval, and I measure and revert regressions instead of hiding them. Second, I ship the whole system: the LLM agent layer plus the backend it runs on (multi-tenant auth, SQL state machines, an OAuth 2.0 + Proof-of-Possession integration), and the open-source libraries underneath.",
  },
  {
    id: 'availability',
    title: 'Availability & roles',
    keywords: 'available availability hire hiring open roles role relocation remote hybrid onsite start opportunity opportunities looking job interview reach sponsorship visa location based where',
    text:
      "I'm open to opportunities in AI/LLM engineering, applied agent platforms, and backend roles. I'm based in NY (US) and open to remote or hybrid. The fastest way to start a conversation is email — ugaleashwin@gmail.com.",
  },
  {
    id: 'pop-explainer',
    title: 'Proof-of-Possession explainer',
    keywords: 'proof of possession pop what is pop rs256 pkcs8 dpop signed jwt token binding security how does auth work',
    text:
      "Proof-of-Possession means every outbound request — not just the login handshake — carries a JWT signed with a private key, proving the caller actually holds the key bound to the access token (not just a stolen bearer token). I implemented this in TypeScript with RS256 and a PKCS8 key for T-Mobile's PIL carrier API, with token caching and refresh.",
  },
  {
    id: 'contact-extra',
    title: 'How to get in touch',
    keywords: 'contact email reach connect get in touch message linkedin github resume cv',
    text:
      "Email is best: ugaleashwin@gmail.com. I'm also on LinkedIn (linkedin.com/in/ashwin-ugale) and GitHub (github.com/AshwinUgale), and my résumé is linked at the top of the page.",
  },
];
