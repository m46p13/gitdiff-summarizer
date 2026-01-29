# Deploy GitDiff Summarizer to Vercel

## Quick Deploy (Recommended)

Click this button to deploy directly to Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/m46p13/gitdiff-summarizer&env=OPENROUTER_API_KEY&envDescription=API%20key%20for%20OpenRouter%20AI&envLink=https://openrouter.ai/keys)

## Steps:

1. Click the deploy button above
2. Create or log in to your Vercel account  
3. Get your free OpenRouter API key from https://openrouter.ai/keys
4. Enter the API key when prompted during deployment
5. Click "Deploy"

Your app will be live at `https://gitdiff-summarizer-*.vercel.app`

## Manual Deploy

If you prefer to deploy manually:

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
cd projects/gitdiff-summarizer
vercel --prod
```

Then add the `OPENROUTER_API_KEY` environment variable in the Vercel dashboard.

## Environment Variables

- `OPENROUTER_API_KEY` - Required. Get from https://openrouter.ai/keys (free tier available)

## GitHub Repository

https://github.com/m46p13/gitdiff-summarizer
