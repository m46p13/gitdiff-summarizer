import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY || '',
  defaultHeaders: {
    'HTTP-Referer': 'https://gitdiff-summarizer.vercel.app',
    'X-Title': 'GitDiff Summarizer',
  },
});

const formatPrompts: Record<string, string> = {
  changelog: `Summarize the following git diff as a changelog entry. Focus on:
- What changed (features, fixes, improvements)
- Why it matters to users
- Use clear, concise language
Format as bullet points suitable for a changelog.`,
  
  commit: `Write a conventional commit message for the following git diff. Follow the format:
type(scope): subject

body (optional)

- Use present tense ("Add feature" not "Added feature")
- Keep the subject line under 72 characters
- Use types like feat:, fix:, docs:, style:, refactor:, test:, chore:`,
  
  pr: `Write a PR description for the following git diff. Include:
- Summary of changes
- Motivation / Why this change was made
- Type of change (feature, bugfix, etc.)
- Testing done
Format it professionally for a pull request description.`,
};

export async function POST(req: NextRequest) {
  try {
    const { diff, format } = await req.json();

    if (!diff || typeof diff !== 'string') {
      return NextResponse.json(
        { error: 'Git diff is required' },
        { status: 400 }
      );
    }

    if (!process.env.OPENROUTER_API_KEY) {
      return NextResponse.json(
        { error: 'OpenRouter API key not configured' },
        { status: 500 }
      );
    }

    const systemPrompt = formatPrompts[format] || formatPrompts.changelog;

    const response = await openai.chat.completions.create({
      model: 'openai/gpt-oss-120b:free',
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        {
          role: 'user',
          content: `Git diff:\n\n${diff}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    const summary = response.choices[0]?.message?.content || 'No summary generated';

    return NextResponse.json({ summary });
  } catch (error) {
    console.error('Summarization error:', error);
    return NextResponse.json(
      { error: 'Failed to generate summary' },
      { status: 500 }
    );
  }
}
