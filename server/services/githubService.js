import { Octokit } from '@octokit/rest';
import 'dotenv/config';

// The Octokit instance
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export async function getIssues(language) {
  console.log(`Fetching from GitHub API for language: ${language}`);
  
  try {
    // FINAL FIX: Added "is:issue" to the query to meet GitHub API requirements.
    const q = `language:${language} is:issue label:"good first issue" state:open`;

    const response = await octokit.request('GET /search/issues', {
      q,
      sort: 'updated',
      order: 'desc',
      per_page: 50,
    });

    const issues = response.data.items
      .map(issue => {
        // Safeguard to ensure repository_url exists
        if (!issue.repository_url) {
          return null; 
        }
        return {
          id: issue.id,
          url: issue.html_url,
          title: issue.title,
          repo: issue.repository_url.split('/').slice(-2).join('/'),
          user: {
            login: issue.user.login,
            avatar_url: issue.user.avatar_url,
          },
        };
      })
      .filter(Boolean); // Remove any null entries

    return issues;
  } catch (error) {
    console.error('Error in /issues route:', error);
    // Re-throw a more generic error to the client
    throw new Error('Server error fetching issues from GitHub.');
  }
}

