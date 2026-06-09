// Public-safe knowledge base for the "Ask my portfolio" assistant.
// Each entry is a self-contained answer paragraph. Keep this public —
// it deliberately omits any private/internal framing.

export type KnowledgeChunk = {
  id: string;
  title: string;
  keywords: string;
  text: string;
};

export const PROFILE = {
  name: 'Ashwin Ugale',
  title: 'AI / LLM Engineer',
  email: 'ugaleashwin@gmail.com',
  github: 'https://github.com/AshwinUgale',
  linkedin: 'https://linkedin.com/in/ashwin-ugale/',
};

export const SUGGESTED_QUESTIONS = [
  'What are you working on at Enidus?',
  'Tell me about DocChat.',
  'How do you approach evals?',
  'Why raw OpenAI tool-calling over LangChain?',
  'What is your tech stack?',
];

export const KNOWLEDGE: KnowledgeChunk[] = [
  {
    id: 'summary',
    title: 'Summary',
    keywords: 'who are you about summary introduce yourself bio background overview elevator pitch ashwin',
    text:
      "I'm Ashwin Ugale, an AI/LLM engineer. I build production LLM agent platforms, eval-driven RAG systems, and the full-stack backends behind them. At Enidus USA I'm building a multi-tenant LLM tool-calling platform for T-Mobile for Business reseller operations. On the side I've shipped four production AI projects to PyPI, the VS Code Marketplace, and the MCP ecosystem. I hold an M.S. in Computer Science from Indiana University Bloomington.",
  },
  {
    id: 'enidus-overview',
    title: 'Enidus — current role',
    keywords: 'enidus current job work role working on now t-mobile tfb reseller telecom platform what do you do',
    text:
      "At Enidus USA (Software Engineer, Aug 2025–present) I build enterprise AI for T-Mobile for Business reseller operations. The headline is a multi-tenant LLM tool-calling platform on FastAPI / OpenAI / Qdrant / SQL Server, deployed on Azure with GitHub Actions + Azure OIDC for keyless deploys. It runs 50+ database-registered tools with server-side JWT tenant isolation and role-gated SQL, and orchestrates 9 ReAct workflows — line suspend/resume/activate, rate-plan change, bulk actions, eSIM and SIM ordering, and troubleshooting — each collapsing 10–12 legacy-portal clicks into a single chat command with human-in-the-loop confirmation before any carrier-side change.",
  },
  {
    id: 'multitenant',
    title: 'Multi-tenant isolation',
    keywords: 'multi-tenant tenant isolation security jwt rbac role access pii masking how secure',
    text:
      "Tenant scope is injected server-side and never trusted from the client: the auth layer pulls reseller_id and user_id from the JWT, and the dispatcher injects them as required parameters before any SQL runs — so a reseller literally can't ask the agent about someone else's account. Role-based access control gates which tools each role can see, and PII masking is applied at the output-schema/database boundary, not in app code. Isolation is enforced at the tool dispatcher, the SQL layer, and the output schema simultaneously.",
  },
  {
    id: 'eval',
    title: 'Eval methodology',
    keywords: 'eval evaluation testing metrics accuracy quality measure benchmark precision corpus how do you test',
    text:
      "My rule is the corpus is the spec — I don't write the agent loop until I have labeled queries. The Enidus platform is gated by a 442-query labeled eval across four buckets (intent, tool selection, parameter extraction, end-to-end), currently at 89% intent top-1 and 90.3% canonical tool-pick. A regression set runs in CI and blocks any PR that drops those metrics past a threshold. I track multiple metrics rather than just accuracy, because aggregate accuracy hides regressions where the right tool slips from rank 1 to rank 2.",
  },
  {
    id: 'retrieval',
    title: 'Hybrid retrieval',
    keywords: 'retrieval rag hybrid lexical semantic qdrant embeddings cache vector search how does search work',
    text:
      "The retrieval layer is hybrid because telecom queries split cleanly in two. Structured-identifier queries (phone numbers, BANs, ICCIDs, reference numbers) have known shapes, so lexical fast-path detectors resolve them deterministically in under a millisecond and skip embeddings entirely. Everything else goes through Qdrant semantic search over OpenAI text-embedding-3-small (1,536-dim) with an LRU embedding cache at roughly a 70% hit rate. The Qdrant client is hardened with health probes, retry-with-backoff, and a circuit breaker that degrades to lexical-only instead of hanging.",
  },
  {
    id: 'troubleshoot',
    title: 'Troubleshoot state machine',
    keywords: 'troubleshoot state machine hard problem stateful session migration scaling workers difficult challenge',
    text:
      "The hardest problem I'll point to is the troubleshoot workflow. It was originally stateful in process memory (Python dicts keyed by session ID), which failed three ways: deploys killed in-flight sessions, requests routed to another worker lost the state, and abandoned sessions piled up. I migrated it to a SQL-persisted state machine with typed transitions (each state has an enumerated valid-next-state set validated before commit), automatic TTL expiry via a last_activity_at sweep, and explicit resume/cancel/pivot lifecycle support. It scaled from 1 to 8 concurrent workers and sessions now survive deploys.",
  },
  {
    id: 'oauth-pop',
    title: 'OAuth 2.0 + Proof-of-Possession (pilBackend)',
    keywords: 'oauth proof of possession pop rs256 pkcs8 auth pilbackend carrier api typescript security token signing',
    text:
      "I built the TypeScript OAuth 2.0 + RS256 Proof-of-Possession layer (pilBackend) that sits between the Enidus platform and T-Mobile's new PIL carrier API. Every outbound request — not just the auth handshake — is signed with a PoP JWT using a PKCS8 private key proving the caller holds the key bound to the access token. It covers about 75% of the carrier API surface (20+ endpoints across order, billing, eligibility, and search) and includes a legacy-to-PIL compatibility shim that translates identifier conventions, request envelopes, and error shapes both directions, so existing resellers migrate without code changes.",
  },
  {
    id: 'langchain',
    title: 'Why raw OpenAI tool-calling over LangChain',
    keywords: 'langchain langgraph framework raw openai why not why choose decision architecture tradeoff',
    text:
      "I prototyped the orchestration in LangChain and LangGraph but shipped on raw FastAPI + OpenAI tool-calling for lifecycle control over multi-tenant security. The framework abstractions hid the exact steps I most needed to audit: per-tool JWT injection, retrieval ranking, sanitization, and persistence boundaries. With raw tool-calling, the path from user message → tool call → DB query → response is explicit, and every step is a place I can inject scope checks and emit audit logs. For a single-tenant prototype the framework wins on velocity; for a multi-tenant production platform the raw implementation wins on auditability.",
  },
  {
    id: 'docchat',
    title: 'DocChat (VS Code extension)',
    keywords: 'docchat vs code extension version pinned docs rag project marketplace lockfile sidecar',
    text:
      "DocChat is a VS Code extension that answers questions about your project's libraries using the docs for the exact version your lockfile pins — so a React 18.2 project doesn't get React 19 answers. It's a two-process design: a TypeScript extension plus a Python FastAPI sidecar running the agent loop over WebSocket, with multi-iteration ReAct over OpenAI tool-calling and eval-tuned per-library retrieval floors. It scores 0.943 version correctness and 1.000 refusal-on-out-of-scope across a 48-pair eval spanning 3 libraries × 4 version pins, and it dogfoods my Mneme and ToolPicker libraries internally. It's on the VS Code Marketplace as AshwinUgale.docchat.",
  },
  {
    id: 'mneme',
    title: 'Mneme (PyPI memory library)',
    keywords: 'mneme smolamem memory library pypi agent memory episodic semantic working backends forgetting',
    text:
      "Mneme is a multi-tier long-term memory library for LLM agents — working / episodic / semantic tiers from cognitive psychology — published to PyPI as smolAmem. It has four pluggable storage backends (in-memory, SQLite, Qdrant, pgvector) behind one Protocol, TTL + access-frequency decay forgetting with APScheduler background consolidation, and thin adapters for LangChain and LlamaIndex. On its bundled, reproducible eval it matches full-history recall (recall@5 = 1.000) at under half the token cost.",
  },
  {
    id: 'toolpicker',
    title: 'ToolPicker (PyPI tool router)',
    keywords: 'toolpicker tool router bm25 semantic rrf reciprocal rank fusion pypi tool selection routing',
    text:
      "ToolPicker is a hybrid tool router on PyPI that selects the top-K relevant tools out of N so large tool catalogs don't blow the prompt budget. It fuses lexical BM25, semantic embedding NN, and an optional intent classifier via Reciprocal Rank Fusion, then packs results into a token budget. It's evaluated against three corpora — ToolBench, Gorilla, and a synthetic 200-pair set — with a full strategy-comparison matrix.",
  },
  {
    id: 'docchat-server',
    title: 'docchat-server (MCP server)',
    keywords: 'docchat-server mcp server model context protocol claude code cursor cline fastmcp pypi',
    text:
      "docchat-server is DocChat's retrieval engine stripped down and exposed as a Model Context Protocol (MCP) server, so version-pinned doc grounding works in Claude Code, Cursor, Cline, and any MCP-aware client. It's a FastMCP server on PyPI with embedded Qdrant (zero Docker), per-library git-ref resolution, and two tools — search_docs and list_indexed. Indexing is kept CLI-only so no connected LLM can trigger arbitrary embedding cost.",
  },
  {
    id: 'portfolio-thesis',
    title: 'What makes the open-source portfolio different',
    keywords: 'portfolio thesis different stand out unique discipline reverts changelog eval-driven why hire',
    text:
      "The four open-source projects share one thesis: AI systems should be built with the same eval-driven discipline as any other production software, with metrics as first-class artifacts that gate every release. The differentiator is the iteration log — the public CHANGELOGs document two reverted regressions (a prompt-softening attempt and a self-critique pass) with full ablation tables. Almost anyone can ship a RAG demo; very few show a measured, version-by-version iteration history with documented reverts.",
  },
  {
    id: 'stack',
    title: 'Tech stack',
    keywords: 'tech stack technologies tools languages frameworks what do you use skills',
    text:
      "Core stack: Python 3.11+ (FastAPI, OpenAI SDK, Pydantic v2, APScheduler) and TypeScript (strict, Node/Express, jose for JWT/PoP). Retrieval and data: Qdrant, pgvector, SQL Server, PostgreSQL, Redis, MongoDB, BM25. AI: OpenAI tool-calling, ReAct, hybrid retrieval, embeddings, MCP/FastMCP, LangChain/LangGraph (prototyping), eval harnesses. Frontend: React, TypeScript, Redux, Vite, Tailwind. Cloud/CI: AWS, Azure, GCP, Docker, Kubernetes, Terraform, GitHub Actions with OIDC. Security/testing: CodeQL, Semgrep, Dependabot, TruffleHog, pytest, vitest.",
  },
  {
    id: 'experience-prior',
    title: 'Prior experience',
    keywords: 'live risk labs hyphenova previous experience past jobs internship terraform devops history before',
    text:
      "Before Enidus: at Live Risk Labs (Jun–Aug 2025) I wrote Terraform modules for GCP (VPCs, GKE, IAM), built CIS-hardened Ansible container images, and set up ArgoCD GitOps with Checkov policy scanning. At Hyphenova (Jun–Dec 2024, intern) I built reusable React + TypeScript components, implemented Redis caching/rate-limiting on a Node + MongoDB stack that cut DB load by 40%, and ran GitHub Actions + Docker CI with 85%+ coverage. Earlier I did data-science and ML internships.",
  },
  {
    id: 'cert',
    title: 'AWS certification',
    keywords: 'aws certified developer associate certification cert credential cloud amazon',
    text:
      "I hold the AWS Certified Developer – Associate certification (2025), which validates developing, deploying, and debugging cloud applications on AWS across IAM, Lambda, S3, EC2, and CI/CD. It's verifiable on Credly.",
  },
  {
    id: 'education',
    title: 'Education',
    keywords: 'education degree university school masters bachelors indiana gpa study college',
    text:
      "I have an M.S. in Computer Science from Indiana University Bloomington (2023–2025, GPA 3.61/4) and a B.Tech in Electronics & Telecommunication Engineering from K. J. Somaiya Institute of Technology (2019–2023, GPA 8.99/10).",
  },
  {
    id: 'contact',
    title: 'Contact & availability',
    keywords: 'contact hire email reach availability available opportunities work hiring connect resume get in touch',
    text:
      "I'm open to opportunities. The best way to reach me is email at ugaleashwin@gmail.com, or via LinkedIn (linkedin.com/in/ashwin-ugale) and GitHub (github.com/AshwinUgale). My resume is linked at the top of this page.",
  },
];
