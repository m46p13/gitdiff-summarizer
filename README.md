# GitDiff Summarizer

Transform git diffs into human-readable changelog entries, commit messages, and PR descriptions using AI.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/m46p13/gitdiff-summarizer)

## Features

- **Paste git diff → Get summary** - Simply paste your git diff and get an AI-generated summary
- **Multiple output formats** - Choose from Changelog, Commit Message, or PR Description formats
- **Copy to clipboard** - One-click copying of generated summaries
- **Clean, minimal UI** - Professional interface built with Tailwind CSS

## Tech Stack

- Next.js 14 (App Router)
- Tailwind CSS
- shadcn/ui components
- OpenRouter AI (free model)

## Environment Variables

Create a `.env.local` file with:

```
OPENROUTER_API_KEY=your_openrouter_api_key
```

Get your free API key at [OpenRouter](https://openrouter.ai/).

## Local Development

```bash
npm install
npm run dev
```

## Deployment

Click the "Deploy with Vercel" button above or push to GitHub and import to Vercel.

Don't forget to add your `OPENROUTER_API_KEY` environment variable in the Vercel dashboard!
