# Ask-my-portfolio — chat backend

The **"Ask my portfolio"** terminal retrieves relevant facts in the browser (over
`src/data/portfolioKnowledge.ts`) and sends them to a small server endpoint that does the LLM
*generation* (`POST { query, context, history } -> { answer }`). The OpenAI key always stays
server-side. If the endpoint is unreachable, the chat falls back to grounded local answers, so it
never hard-fails.

## ✅ Primary: Vercel (whole site)

The repo is configured for Vercel — static site + the `/api/chat` function deploy together.

1. **Import the repo** at vercel.com → New Project (it auto-detects Vite; build `npm run build`, output `dist`).
2. **Add environment variables** (Project → Settings → Environment Variables):
   - `OPENAI_API_KEY = sk-...`   (no `VITE_` prefix → never shipped to the browser)
   - `OPENAI_MODEL = gpt-4o-mini`  (optional)
3. **Deploy.** The chat is now LLM-powered. The function lives at `/api/chat.js`; SPA routing is
   handled by `vercel.json`.

That's it — no key in the bundle, free Hobby tier, automatic HTTPS and preview deploys.

> The site base path is now `/` (root). If you ever go back to an S3 sub-path, restore
> `base` in `vite.config.ts` and the asset prefixes.

## Local development

```bash
cp .env.example .env.local      # gitignored
# OPENAI_API_KEY=sk-...
npm run dev
```

`vite.config.ts` serves `/api/chat` in dev using the key from `.env.local`, so local answers are
real LLM answers too. Without a key it falls back to grounded local answers.

## Alternative: AWS Lambda (if you stay on S3)

`handler.mjs` + `deploy.sh` deploy the same contract to a Lambda Function URL:

```bash
export OPENAI_API_KEY=sk-...
cd chat-api && ./deploy.sh          # creates role + function + public URL, prints the URL
```

Then set `VITE_CHAT_API_URL=<function-url>` for the production build (e.g. the GitHub Actions repo
secret already wired in `.github/workflows/deploy.yml`). Lambda stays within the always-free tier.

## Behaviour & safety

- System prompt forbids answering outside the provided context → off-topic questions get a polite
  decline instead of a hallucination.
- `max_tokens` capped (400), history trimmed to the last 6 turns to bound cost per call.
- Set a spend limit in the OpenAI dashboard as a hard cap.
