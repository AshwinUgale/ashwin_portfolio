// Single source of truth for the featured work.
// Each project fills the SAME token contract (theme + section blocks) so the
// detail pages stay cohesive while each one carries its own identity.

export type LinkKind = 'repo' | 'pkg' | 'docs' | 'demo' | 'ext';
export type ProjLink = { label: string; href: string; kind: LinkKind };
export type Stat = { value: string; label: string };
export type MotifId =
  | 'muteval' | 'tracelint' | 'goldset' | 'retrieval'
  | 'docchat' | 'mcp' | 'mneme' | 'toolpicker';

export type Project = {
  slug: string;
  name: string;
  group: 'reliability' | 'apps';
  channel: string;            // where it ships
  question: string;           // the one-sentence question it answers
  tagline: string;            // short card line
  theme: { accent: string; motif: MotifId }; // accent = "H S% L%"
  whatItIs: string[];         // 1-2 short paragraphs
  howItWorks: string[];       // bullet points
  install?: string;           // one command
  demo?: { note?: string; code: string }; // a runnable snippet
  stats: Stat[];              // headline metrics
  findings: string[];         // narrative results
  doesntCover: string[];      // the candor section
  related: string[];          // slugs
  tags: string[];
  links: ProjLink[];
  license?: string;
};

export const PROJECTS: Project[] = [
  // ---------------------------------------------------------------- muteval
  {
    slug: 'muteval',
    name: 'muteval',
    group: 'reliability',
    channel: 'PyPI',
    question: 'Would your eval suite actually catch a regression?',
    tagline:
      'Mutation testing for LLM evals. It degrades your system on purpose, reruns your existing suite, and reports which regressions your evals miss.',
    theme: { accent: '40 74% 62%', motif: 'muteval' },
    whatItIs: [
      'muteval is mutmut / Stryker, but for evals. It deliberately degrades the system under test — prompt, retrieved context, tool outputs, or model — reruns your existing eval suite against each degraded "mutant", and reports a mutation score: the share of injected regressions your evals caught.',
      'The regressions your evals miss are "survivors" — concrete blind spots, each flagged with a suggested fix. Its killer property is absence detection: it tells you when you have no eval for a behavior at all.',
    ],
    howItWorks: [
      'Baseline — confirms your suite passes on the original system; if it doesn’t, it refuses to score (fails closed).',
      'Mutate — degrades the prompt, retrieved context, tool outputs, or model (22 operators).',
      'Grade — reruns your suite against each mutant. Killed = caught; survived = a gap.',
      'Score — the share of injected regressions your evals caught, with severity ranking and a suggested fix per survivor.',
      'Adapters for promptfoo, DeepEval, and RAGAS; a probe layer audits eval-suite quality.',
    ],
    install: 'pip install muteval',
    demo: {
      note: 'Offline demo — no API key. Finds a rule the promptfoo suite forgot.',
      code: `muteval init --template rag
muteval run --config examples/promptfoo_offline/muteval_config.py --no-color
# Mutation score: 33% (2/6 mutants killed, 95% CI 10-70%)
muteval show 0        # a survivor + suggested fix + baseline→mutant diff`,
    },
    stats: [
      { value: '22', label: 'mutation operators' },
      { value: '3', label: 'eval frameworks supported' },
      { value: '~190', label: 'tests' },
    ],
    findings: [
      'Runs offline with no API key: the demo degrades a support-bot prompt and surfaces the exact safety rule the eval suite forgot to assert — a real coverage gap, with the fix it suggests.',
      'In a controlled, CI-enforced experiment across four domains (support bot, code review, RAG, HR policy), the mutation score climbed in step with eval-suite coverage — 0% with no evals, 100% with full coverage.',
    ],
    doesntCover: [
      'Not another metric library or eval runner — it tests the evals, not the outputs.',
      'Not red-teaming (that mutates inputs) and not metric calibration (that mutates outputs). muteval mutates the system to test the evals.',
      'A per-suite diagnostic, not a universal flaw-finder. The mutant ↔ real-regression correlation is stated as unproven, not oversold.',
    ],
    related: ['goldset', 'tracelint'],
    tags: ['Python', 'Evals', 'CI', 'promptfoo', 'DeepEval', 'RAGAS'],
    links: [
      { label: 'PyPI', href: 'https://pypi.org/project/muteval/', kind: 'pkg' },
      { label: 'Docs', href: 'https://ashwinugale.github.io/muteval/', kind: 'docs' },
      { label: 'Code', href: 'https://github.com/AshwinUgale/muteval', kind: 'repo' },
    ],
    license: 'Apache-2.0',
  },

  // -------------------------------------------------------------- tracelint
  {
    slug: 'tracelint',
    name: 'tracelint',
    group: 'reliability',
    channel: 'PyPI',
    question: 'Did your agent run violate structural expectations?',
    tagline:
      'A linter for agent runs. It reads a tool-calling trace and flags structural defects deterministically — with evidence and a CI exit code. No model judges it.',
    theme: { accent: '190 65% 55%', motif: 'tracelint' },
    whatItIs: [
      'tracelint runs after a tool-calling agent finishes, on its execution trace. It flags structural defects — schema-violating calls, ignored tool errors, hallucinated arguments, loops, redundant calls — each with the exact trace lines as evidence and a CI exit code.',
      'The premise: model-as-judge trace checking is unreliable, but many of these defects are structurally decidable and need no judge at all. It also ships a fault injector and a per-fault recovery scorecard.',
    ],
    howItWorks: [
      '8 deterministic rules (R1–R7) against one canonical trace schema; thin adapters translate each source format in — the rules never change.',
      'Tiers: hard_defect (provable, fails CI, exit 2), hard_event, and candidate (heuristic, never fails CI alone).',
      'When a required field is missing, a rule suppresses with a stated reason rather than linting a partial trace as complete.',
      'Adapters: from_openai_messages, from_langfuse_trace, from_otel_spans (OpenTelemetry / OpenInference).',
    ],
    install: 'pip install tracelint',
    demo: {
      note: 'Keyless validation suite + recovery scorecard — no model download.',
      code: `tracelint demo --html demo.html
tracelint check ./trace.json --tools ./tools.json   # exit 2 on a hard_defect
tracelint scorecard --demo --faults timeout,error,rate_limit --runs 5`,
    },
    stats: [
      { value: '8', label: 'structural checks' },
      { value: '3', label: 'trace formats supported' },
      { value: '0', label: 'LLM calls to run' },
    ],
    findings: [
      'Featured in a guest post on the Arize AI engineering blog (makers of Phoenix) — tracelint on Phoenix / OpenInference spans catches a LangGraph release agent that shipped a failed build, and fails CI with no LLM judge.',
      'Adapters validated on live data, not just spec — from_langfuse_trace on real Langfuse v4 runs, and from_otel_spans on real TRAIL benchmark traces (PatronusAI/TRAIL).',
      'On TRAIL it deterministically localized real tool errors, a malformed tool call, and excessive-retry loops — with no model in the loop.',
      'The recovery scorecard reports a correctness-recovery rate per fault type with a Wilson confidence interval.',
    ],
    doesntCover: [
      'Only structurally-decidable defects — it deliberately does not judge answer quality.',
      'The candidate tier is heuristic and never fails CI on its own.',
      'High-confidence hallucination detection needs the tool schema to declare field origins.',
    ],
    related: ['muteval', 'retrieval-lab'],
    tags: ['Python', 'Agents', 'OpenTelemetry', 'Langfuse', 'CI'],
    links: [
      { label: 'Arize blog', href: 'https://arize.com/blog/agent-traces-without-llm-judge/', kind: 'ext' },
      { label: 'Live demo', href: 'https://ashwinugale.github.io/tracelint/', kind: 'demo' },
      { label: 'PyPI', href: 'https://pypi.org/project/tracelint/', kind: 'pkg' },
      { label: 'Code', href: 'https://github.com/AshwinUgale/tracelint', kind: 'repo' },
    ],
    license: 'MIT',
  },

  // ---------------------------------------------------------------- goldset
  {
    slug: 'goldset',
    name: 'goldset',
    group: 'reliability',
    channel: 'GitHub',
    question: 'Are your regression cases representative and trustworthy?',
    tagline:
      'Turns real traffic into a versioned regression suite — deduped, coverage-tracked, drift-aware — with a mandatory human confirmation step. A curation accelerator, not a gold factory.',
    theme: { accent: '150 48% 56%', motif: 'goldset' },
    whatItIs: [
      'goldset reads a log of real inputs and past model outputs, clusters them into intents, mines the failures and rare cases that frequency sampling misses, dedupes the rest, and walks a human through confirming an expected outcome for each — then exports a golden suite your eval runner can execute.',
      'Its spine: you cannot bootstrap gold from ungraded logs. Logged outputs are shown only as suggestions; nothing is exported as golden until a human or trusted oracle confirms it.',
    ],
    howItWorks: [
      'ingest → cluster → select → label → roles → export, all in one resumable JSON workspace.',
      'PII is detected and redacted before anything is stored.',
      'The golden gate: a case is golden only when confirmed AND carrying a contract (assertions, or exact output for deterministic tasks). Export fails closed if nothing is confirmed.',
      'A v2 module builds stateful multi-turn memory scenarios — recall, freshness, attribution, and isolation — with an optional NLI entailment tier.',
    ],
    install: 'pip install git+https://github.com/AshwinUgale/goldset.git',
    demo: {
      note: 'Keyless, self-checking demo — plants known problems and proves it recovers each.',
      code: `goldset demo --html demo.html
goldset ingest ./logs.jsonl --out ws.json
goldset cluster --workspace ws.json
goldset label   --workspace ws.json      # required: confirm each case
goldset export  --workspace ws.json --out suite.yaml`,
    },
    stats: [
      { value: '0.99', label: 'cluster purity' },
      { value: '96%', label: 'intent coverage' },
      { value: '156', label: 'tests' },
    ],
    findings: [
      'Validated on the public Bitext support corpus: real embeddings reach 0.99 category purity and collapse 94 keyless clusters to 47, at 96% coverage against the 27-intent spec.',
      'A held-out category is correctly surfaced as novel traffic (drift), not silently absorbed.',
      'Composes with muteval: goldset builds a suite → exports promptfoo → muteval stress-tests its coverage.',
    ],
    doesntCover: [
      'It will not invent ground truth — a human or oracle must confirm, by design.',
      'Coverage is labeled "relative" to observed traffic unless you supply an external taxonomy.',
      'Failure-mining is disabled and disclosed when outcome signals are absent.',
    ],
    related: ['muteval', 'tracelint'],
    tags: ['Python', 'Clustering', 'PII redaction', 'promptfoo', 'NLI'],
    links: [
      { label: 'Live demo', href: 'https://ashwinugale.github.io/goldset/', kind: 'demo' },
      { label: 'Code', href: 'https://github.com/AshwinUgale/goldset', kind: 'repo' },
    ],
    license: 'MIT',
  },

  // ----------------------------------------------------------- retrieval-lab
  {
    slug: 'retrieval-lab',
    name: 'Retrieval Lab',
    group: 'reliability',
    channel: 'PyPI',
    question: 'Which retrieval config wins — and where did the misses get lost?',
    tagline:
      'Benchmarks RAG retrieval on your corpus and attributes every failed query to the exact pipeline stage that dropped the evidence.',
    theme: { accent: '265 55% 68%', motif: 'retrieval' },
    whatItIs: [
      'Retrieval Lab compares chunking, embeddings, dense / BM25 / hybrid retrieval, reranking, token budgets, and exact-vs-HNSW indexes — then produces one self-contained HTML report with ranked configs, confidence intervals, cost, and failure attribution.',
      'Its differentiator: rather than only naming the winning config, it attributes every miss to the earliest stage that lost the required evidence.',
    ],
    howItWorks: [
      'Attribution walks the pipeline: representation → ann_index → candidate_generation → fusion → reranker_demotion → final_cutoff → budget_cutoff.',
      'Gold answers are source-document character spans, not chunk IDs, so evaluation stays stable as chunking changes.',
      'For HNSW it measures candidate recall vs exact search and attributes approximation-only misses to ann_index.',
      'Ships SQuAD and BEIR importers and a --fail-under CI gate.',
    ],
    install: 'pip install retrieval-lab',
    demo: {
      note: 'Offline, deterministic embedder — no API key, no model download.',
      code: `retrieval-lab demo
retrieval-lab run --corpus docs.jsonl --queries queries.jsonl \\
  --retrieval dense,sparse,hybrid --rerank none,ce --html report.html
retrieval-lab explain --json results.json --query-id Q17   # where it was lost`,
    },
    stats: [
      { value: '50', label: 'configs benchmarked' },
      { value: '7', label: 'pipeline stages traced' },
      { value: '3', label: 'retrieval methods' },
    ],
    findings: [
      'Ships a live 50-configuration benchmark report with per-config hit@k, MRR, confidence intervals, stage attribution, and p50/p95 latency.',
      'Handles SQuAD (answer offsets map straight to span gold) and BEIR (passage-level) imports.',
    ],
    doesntCover: [
      'Currently beta — internal submodules may change between minor releases.',
      'Results are per-corpus; there is no universal winning config, which is the point.',
      'Needs span-level gold, so bring a labeled query set (or author one with make-gold).',
    ],
    related: ['muteval', 'docchat'],
    tags: ['Python', 'RAG', 'BM25', 'HNSW', 'Reranking'],
    links: [
      { label: 'Live report', href: 'https://ashwinugale.github.io/Retrieval-Lab/', kind: 'demo' },
      { label: 'PyPI', href: 'https://pypi.org/project/retrieval-lab/', kind: 'pkg' },
      { label: 'Code', href: 'https://github.com/AshwinUgale/Retrieval-Lab', kind: 'repo' },
    ],
  },

  // ---------------------------------------------------------------- docchat
  {
    slug: 'docchat',
    name: 'DocChat',
    group: 'apps',
    channel: 'VS Code Marketplace',
    question: 'Can your AI answer for the exact library version you pin?',
    tagline:
      'A VS Code extension that answers questions from the docs of the exact version your lockfile pins — and refuses instead of hallucinating.',
    theme: { accent: '25 80% 62%', motif: 'docchat' },
    whatItIs: [
      'DocChat parses your lockfiles, indexes the docs for the exact pinned versions, and answers only against those docs. Ask about React 18.2 and you get 18.2 answers; ask something out of scope and it refuses cleanly.',
      'A TypeScript extension talks to a Python sidecar that runs a multi-iteration ReAct loop over Qdrant, streaming tokens back with clickable citations. It is the portfolio’s proving ground — where the reliability tools get exercised.',
    ],
    howItWorks: [
      'Two-process design: the TS extension (chat UI, file watching, citations) talks to a Python sidecar over a local token-gated WebSocket.',
      'Lockfile-pinned retrieval routing for Node and Python; per-library cosine floors; a pre-retrieval topic classifier.',
      'Dogfoods two of the libraries below: mneme (per-workspace memory) and toolpicker (routing across the agent’s tools).',
      'Indexes React 18.2, FastAPI 0.95 and 0.100 side-by-side, and Vue 3.4.',
    ],
    install: 'code --install-extension AshwinUgale.docchat',
    demo: {
      note: 'Ask in scope, then out of scope — watch it refuse.',
      code: `# "how do I use useEffect with a cleanup function?"
→ grounded in react@18.2.0 docs, with a clickable [react@18.2.0:useEffect] citation
# "how do I configure CORS in Flask?"
→ refuses cleanly (Flask isn't indexed)`,
    },
    stats: [
      { value: '85%', label: 'version-correct answers' },
      { value: '88%', label: 'out-of-scope refusal' },
      { value: '48', label: 'eval question pairs' },
    ],
    findings: [
      'The eval harness caught a bug in itself: an early release reported a perfect 1.000 refusal rate because scope was derived from the agent’s behavior, not the ground-truth label. Fixing it dropped the number to an honest 0.875 and surfaced a hidden cross-framework failure.',
      'A self-critique pass was added, measured, found harmful (accuracy 0.824→0.667), and reverted — documented in the changelog.',
    ],
    doesntCover: [
      'Built as a proving ground for the reliability tools — not a product in its own right.',
      'The agent is intentionally shallow (roughly one read-only tool).',
      'Three libraries indexed today; bring your own OpenAI key.',
    ],
    related: ['docchat-mcp', 'mneme', 'toolpicker'],
    tags: ['TypeScript', 'FastAPI', 'Qdrant', 'ReAct', 'RAG'],
    links: [
      { label: 'Marketplace', href: 'https://marketplace.visualstudio.com/items?itemName=AshwinUgale.docchat', kind: 'ext' },
      { label: 'Code', href: 'https://github.com/AshwinUgale/docchat', kind: 'repo' },
    ],
    license: 'MIT',
  },

  // ------------------------------------------------------------- docchat-mcp
  {
    slug: 'docchat-mcp',
    name: 'docchat-server',
    group: 'apps',
    channel: 'PyPI · MCP',
    question: 'Version-pinned docs for your MCP client — without a chat panel?',
    tagline:
      'DocChat’s retrieval engine as a Model Context Protocol server — grounded, version-pinned answers for Claude Code, Cursor, and any MCP client.',
    theme: { accent: '15 72% 60%', motif: 'mcp' },
    whatItIs: [
      'docchat-server is the sibling of the DocChat extension: the same version-pinned retrieval pipeline exposed as an MCP server instead of a chat UI. It exposes search_docs and list_indexed to any MCP client, with a hard refusal when a question is out of scope.',
      'Qdrant runs embedded — no Docker, no separate server.',
    ],
    howItWorks: [
      'Two MCP tools: search_docs(library, version, query) returns top chunks from the pinned version; list_indexed() reports what is available.',
      'Per-tag docs: fastapi@0.95 gets Pydantic-v1-era docs, fastapi@0.100 gets Pydantic-v2 — two collections, two different answers.',
      'Indexing is CLI-only by design, so a connected LLM can never trigger arbitrary embedding cost.',
    ],
    install: 'uv tool install docchat-server',
    demo: {
      note: 'Index a couple of versions, then wire it into Cursor / Claude Desktop.',
      code: `docchat-server index react 18.2.0
docchat-server index fastapi 0.100.0
docchat-server list
# react_18_2_0 (192 chunks) · fastapi_0_100_0 (38 chunks)`,
    },
    stats: [
      { value: '2', label: 'MCP tools' },
      { value: '3', label: 'libraries indexed' },
      { value: '0', label: 'Docker containers needed' },
    ],
    findings: [
      'Registers cleanly in Cursor, Claude Desktop, Cline, and Continue.dev as a first-class tool.',
      'Demonstrates version-pinned grounding: the same query returns different, version-correct answers for two pinned FastAPI releases.',
    ],
    doesntCover: [
      'Alpha (v0.0.x) — one MCP client at a time, because embedded Qdrant holds a file lock.',
      'Bring your own OpenAI key.',
      'Indexing stays a CLI operation, never an MCP tool.',
    ],
    related: ['docchat'],
    tags: ['Python', 'MCP', 'FastMCP', 'Qdrant'],
    links: [
      { label: 'PyPI', href: 'https://pypi.org/project/docchat-server/', kind: 'pkg' },
      { label: 'Code', href: 'https://github.com/AshwinUgale/docchat-mcp', kind: 'repo' },
    ],
    license: 'MIT',
  },

  // ------------------------------------------------------------------ mneme
  {
    slug: 'mneme',
    name: 'mneme',
    group: 'apps',
    channel: 'PyPI · smolAmem',
    question: 'How does an agent remember across weeks — and forget?',
    tagline:
      'Multi-tier long-term memory for LLM agents — working / episodic / semantic — with pluggable backends and decay-based forgetting.',
    theme: { accent: '210 70% 66%', motif: 'mneme' },
    whatItIs: [
      'mneme gives an agent real long-term memory instead of a last-N-messages buffer: three cognitive tiers — working, episodic, and semantic — with semantic + lexical retrieval, scheduled consolidation, and explicit TTL / decay forgetting.',
      'It ships on PyPI as smolAmem but imports as mneme (the same dual-name pattern as Pillow / PIL). DocChat dogfoods it.',
    ],
    howItWorks: [
      'Working (last N turns), episodic (every interaction, timestamped, with TTL/decay), semantic (durable extracted facts merged across runs).',
      'Retrieval fuses semantic + lexical signals with authority weighting and freshness decay.',
      'Pluggable backends — InMemory, SQLite, Qdrant, pgvector — and adapters for LangChain, LlamaIndex, and raw OpenAI.',
    ],
    install: 'pip install "smolAmem[sqlite,openai]"',
    demo: {
      code: `from mneme import MemoryManager, SQLiteBackend, OpenAIEmbeddings
m = MemoryManager(agent_id="alice",
    backend=SQLiteBackend(path="mneme.db", dimensions=1536),
    embedder=OpenAIEmbeddings())
m.episodic.add("user mostly works in TypeScript")
m.retrieve("what language does the user prefer?", k=3)`,
    },
    stats: [
      { value: '100%', label: 'answer recall' },
      { value: '<50%', label: 'token cost vs full history' },
      { value: '4', label: 'storage backends' },
    ],
    findings: [
      'On the eval harness, mneme matches the full-history oracle’s recall@5 of 1.000 at 67.7 tokens per test point versus 141 for full history — under half the cost.',
      'A deterministic hash embedder (no API key) still reaches recall@5 of 0.833, so the pipeline is testable offline.',
    ],
    doesntCover: [
      'Semantic-tier quality depends on the fact-extraction step.',
      'The published eval corpus is a small starter set — suggestive, not a benchmark.',
      'Ships as smolAmem on PyPI; import as mneme.',
    ],
    related: ['docchat', 'toolpicker'],
    tags: ['Python', 'Qdrant', 'pgvector', 'LangChain', 'Memory'],
    links: [
      { label: 'PyPI', href: 'https://pypi.org/project/smolAmem/', kind: 'pkg' },
      { label: 'Docs', href: 'https://ashwinugale.github.io/mneme/', kind: 'docs' },
      { label: 'Code', href: 'https://github.com/AshwinUgale/smolAmem', kind: 'repo' },
    ],
    license: 'MIT',
  },

  // -------------------------------------------------------------- toolpicker
  {
    slug: 'toolpicker',
    name: 'ToolPicker',
    group: 'apps',
    channel: 'PyPI',
    question: 'Which tools should the agent even see for this query?',
    tagline:
      'Hybrid lexical + semantic tool routing for agents with too many tools to fit in context — BM25 + embeddings + optional intent, fused with RRF and a token-budget packer.',
    theme: { accent: '330 58% 66%', motif: 'toolpicker' },
    whatItIs: [
      'When an agent has more tools than fit in context and accuracy collapses, toolpicker routes to just the K most relevant tools per query. It combines BM25 (lexical) and embeddings (semantic) with an optional intent classifier, fused via Reciprocal Rank Fusion, plus a budget-aware packer.',
      'It returns tools — not a runner, not a framework, not a vector DB — so it drops into LangChain, LlamaIndex, raw OpenAI, or the Claude Agent SDK.',
    ],
    howItWorks: [
      'Three-stage router: BM25 + embeddings + optional intent classifier, combined with RRF.',
      'Budget-aware packer selects K tools within a token_budget (accurate counting via tiktoken).',
      'Tool sources: function schemas, OpenAPI specs, and MCP-server introspection.',
      'Lexical-heavy queries (e.g. an account number) that pure-semantic search misses are the reason the hybrid exists.',
    ],
    install: 'pip install "toolpicker[openai]"',
    demo: {
      code: `from toolpicker import FunctionSchemaSource, OpenAIEmbeddings, ToolPicker
picker = ToolPicker(FunctionSchemaSource(tools), embedder=OpenAIEmbeddings())
picker.select("send a message to bob about the demo", k=5, token_budget=2000)
# -> the 5 tools worth showing the LLM`,
    },
    stats: [
      { value: '89%', label: 'top-1 accuracy' },
      { value: '1,726', label: 'tools benchmarked' },
      { value: '5', label: 'routing strategies' },
    ],
    findings: [
      'Benchmarked five strategies on a synthetic set (200 cases, 25 tools) and on Gorilla (500 cases, 1,726 tools), with all weights and knobs exposed.',
      'The README reports the result plainly: under uniform-weight RRF, pure semantic beats every hybrid on these corpora — intent narrows the gap but does not close it. The library ships every strategy so you can measure on your own tools.',
    ],
    doesntCover: [
      'Returns tools, not an agent runtime.',
      'Semantic embeddings live in-process — the sweet spot is under ~10k tools.',
      'Uniform-weight RRF is not a free win; tune weights on your own corpus.',
    ],
    related: ['docchat', 'mneme'],
    tags: ['Python', 'BM25', 'RRF', 'OpenAPI', 'MCP'],
    links: [
      { label: 'PyPI', href: 'https://pypi.org/project/toolpicker/', kind: 'pkg' },
      { label: 'Docs', href: 'https://ashwinugale.github.io/toolpicker/', kind: 'docs' },
      { label: 'Code', href: 'https://github.com/AshwinUgale/toolpicker', kind: 'repo' },
    ],
    license: 'MIT',
  },
];

export const bySlug = (slug: string) => PROJECTS.find((p) => p.slug === slug);

export const GROUPS: { id: Project['group']; label: string; blurb: string }[] = [
  {
    id: 'reliability',
    label: 'Reliability toolkit',
    blurb:
      'One question ties these together: would your system — or your evals — actually catch a regression? Depth and stated limits over feature count.',
  },
  {
    id: 'apps',
    label: 'Applications & libraries',
    blurb:
      'A shipped application and the reusable pieces it composes — retrieval, memory, and tool routing.',
  },
];
