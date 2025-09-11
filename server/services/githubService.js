import { Octokit } from '@octokit/rest';
import 'dotenv/config';

// Initialize Octokit with your GitHub Personal Access Token.
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

/**
 * Fetches relevant Hacktoberfest issues from the GitHub API.
 * @param {string} language - The programming language to filter issues by.
 * @returns {Promise<Array>} - A promise that resolves to an array of issue objects.
 */
export async function getIssues(language) {
  try {
    // We've temporarily removed `topic:hacktoberfest` from the query.
    // This ensures we get results for development even before the event starts.
    // We can add it back in late September.
    const q = `language:${language} label:"good first issue" state:open`;

    const response = await octokit.request('GET /search/issues', {
      q,
      sort: 'updated',
      order: 'desc',
      per_page: 50, // Fetch up to 50 issues
    });

    // We only need specific fields, so we map over the results.
    const issues = response.data.items.map((issue) => ({
      id: issue.id,
      title: issue.title,
      url: issue.html_url,
      // This is the fix: We check if repository_url exists before trying to split it.
      // If it doesn't, we provide a safe fallback value.
      repo: issue.repository_url ? issue.repository_url.split('/').slice(-2).join('/') : 'N/A',
      user: {
        login: issue.user.login,
        avatar_url: issue.user.avatar_url,
      },
      labels: issue.labels.map(label => ({ name: label.name, color: label.color })),
      comments: issue.comments,
      created_at: issue.created_at,
      updated_at: issue.updated_at,
    }));

    return issues;
  } catch (error) {
    console.error('Error fetching issues from GitHub:', error);
    // Re-throw the error to be handled by the route.
    throw error;
  }
}

