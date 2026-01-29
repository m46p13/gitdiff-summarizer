'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
// Tabs components available for future use
import { Copy, Check, Sparkles, Github, FileText, GitCommit } from 'lucide-react';

const formats = [
  { value: 'changelog', label: 'Changelog', icon: FileText },
  { value: 'commit', label: 'Commit Message', icon: GitCommit },
  { value: 'pr', label: 'PR Description', icon: Github },
];

export default function Home() {
  const [diff, setDiff] = useState('');
  const [format, setFormat] = useState('changelog');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const handleSummarize = async () => {
    if (!diff.trim()) {
      setError('Please paste a git diff first');
      return;
    }

    setLoading(true);
    setError('');
    setSummary('');

    try {
      const response = await fetch('/api/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ diff, format }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate summary');
      }

      setSummary(data.summary);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setDiff('');
    setSummary('');
    setError('');
  };

  const sampleDiff = `diff --git a/src/components/Button.tsx b/src/components/Button.tsx
index 1234567..abcdefg 100644
--- a/src/components/Button.tsx
+++ b/src/components/Button.tsx
@@ -10,7 +10,12 @@ interface ButtonProps {
 export const Button = ({ children, onClick, variant = 'primary' }: ButtonProps) => {
   return (
     <button
-      className={\`btn btn-\${variant}\`}
+      className={cn(
+        'px-4 py-2 rounded-lg font-medium transition-colors',
+        variant === 'primary' && 'bg-blue-600 text-white hover:bg-blue-700',
+        variant === 'secondary' && 'bg-gray-200 text-gray-800 hover:bg-gray-300',
+        variant === 'danger' && 'bg-red-600 text-white hover:bg-red-700'
+      )}
       onClick={onClick}
     >
       {children}`;

  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-950">
      {/* Hero Section */}
      <div className="border-b border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 mb-4">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-3">
              GitDiff Summarizer
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              Transform git diffs into human-readable changelog entries, commit messages, and PR descriptions using AI.
            </p>
          </div>
        </div>
      </div>

      {/* Main Tool */}
      <div className="max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <Card className="shadow-sm border-zinc-200 dark:border-zinc-800">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Git Diff</CardTitle>
                  <CardDescription>Paste your git diff here</CardDescription>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setDiff(sampleDiff)}
                  className="text-xs"
                >
                  Load Example
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder={`Paste your git diff here...

Example:
diff --git a/file.txt b/file.txt
index 123..456 789
--- a/file.txt
+++ b/file.txt
@@ -1,3 +1,3 @@
 line 1
-line 2
+line 2 modified
 line 3`}
                value={diff}
                onChange={(e) => setDiff(e.target.value)}
                className="min-h-[300px] font-mono text-sm resize-none"
              />
              
              {error && (
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              )}
              
              <div className="flex items-center gap-3">
                <Select value={format} onValueChange={setFormat}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    {formats.map((f) => (
                      <SelectItem key={f.value} value={f.value}>
                        <div className="flex items-center gap-2">
                          <f.icon className="w-4 h-4" />
                          {f.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Button
                  onClick={handleSummarize}
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  {loading ? (
                    <>
                      <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Summarize
                    </>
                  )}
                </Button>
                
                <Button
                  variant="outline"
                  onClick={handleClear}
                  disabled={!diff && !summary}
                >
                  Clear
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Output Section */}
          <Card className="shadow-sm border-zinc-200 dark:border-zinc-800">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Summary</CardTitle>
                  <CardDescription>
                    {formats.find(f => f.value === format)?.label} format
                  </CardDescription>
                </div>
                {summary && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopy}
                    className="gap-2"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy
                      </>
                    )}
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {summary ? (
                <div className="min-h-[300px] max-h-[400px] overflow-auto">
                  <pre className="whitespace-pre-wrap font-sans text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed">
                    {summary}
                  </pre>
                </div>
              ) : (
                <div className="min-h-[300px] flex items-center justify-center text-zinc-400 dark:text-zinc-600">
                  <div className="text-center">
                    <Sparkles className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Your summary will appear here</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <div className="mt-12 grid sm:grid-cols-3 gap-6">
          <Card className="border-zinc-200 dark:border-zinc-800">
            <CardContent className="pt-6">
              <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-3">
                <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">Changelog</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Generate user-friendly changelog entries that highlight what changed and why it matters.
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-zinc-200 dark:border-zinc-800">
            <CardContent className="pt-6">
              <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-3">
                <GitCommit className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">Commit Messages</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Create conventional commit messages that follow best practices and are clear and concise.
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-zinc-200 dark:border-zinc-800">
            <CardContent className="pt-6">
              <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-3">
                <Github className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">PR Descriptions</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Write professional pull request descriptions with summaries, motivation, and testing notes.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-sm text-zinc-500 dark:text-zinc-600">
          <p>Powered by OpenRouter AI • Built with Next.js</p>
        </footer>
      </div>
    </main>
  );
}
