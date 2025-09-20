'use client';

import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

interface GitHubTokenWarningProps {
  showDismiss?: boolean;
}

export function GitHubTokenWarning({ showDismiss = true }: GitHubTokenWarningProps) {
  const [dismissed, setDismissed] = React.useState(false);

  if (dismissed) {
    return null;
  }

  return (
    <Alert variant="warning" className="mb-4">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>GitHub API Token Missing</AlertTitle>
      <AlertDescription className="flex items-start justify-between">
        <div>
          <p>
            GitHub data is currently mocked because a valid GitHub token was not found. To see real
            GitHub data, add your GitHub token to the <code>.env.local</code> file.
          </p>
          <p className="mt-2 text-sm">
            Check the <code>.env.local</code> file for instructions on how to create a GitHub token.
          </p>
        </div>
        {showDismiss && (
          <button onClick={() => setDismissed(true)} className="ml-2 text-xs underline">
            Dismiss
          </button>
        )}
      </AlertDescription>
    </Alert>
  );
}
