import { KnowledgeChunk } from './portfolioKnowledge';

// Extra coverage so more questions land. Public-safe, same format.
export const EXTRA: KnowledgeChunk[] = [
  {
    id: 'muteval',
    title: 'Muteval (mutation testing for evals)',
    keywords: 'muteval mutation testing evals eval suite coverage survivors deepeval ragas promptfoo pypi npm mutation score',
    text:
      "Muteval is mutation testing for LLM eval suites, published to PyPI and npm. It deliberately degrades the thing under test — the prompt, retrieved context, or model — reruns your existing evals against each degraded 'mutant', and reports a mutation score: the share of injected regressions your evals actually caught. The ones they miss are survivors — concrete blind spots in your eval coverage. It ships adapters for DeepEval, RAGAS, and promptfoo and can gate CI with a --fail-under threshold.",
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
