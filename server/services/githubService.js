import { Octokit } from 'octokit';
import { getCache, setCache } from './cacheService.js';

// Initialize Octokit
const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
});

// Hardcoded list for our "Community Vetted" secret sauce
const COMMUNITY_VETTED_REPOS = new Set([
    'facebook/react',
    'freeCodeCamp/freeCodeCamp',
    'microsoft/vscode'
    // ... we will add more trusted repos here
]);


export async function getIssues(language) {
    const cacheKey = `issues:${language}`;
    const cachedData = await getCache(cacheKey);

    if (cachedData) {
        console.log(`[Cache] HIT for ${cacheKey}`);
        return cachedData;
    }
    
    console.log(`[Cache] MISS for ${cacheKey}. Fetching from GitHub...`);

    // This is a simplified search query. We will refine this.
    const searchQuery = `language:${language} label:"good first issue" topic:hacktoberfest state:open`;

    const response = await octokit.rest.search.issuesAndPullRequests({
        q: searchQuery,
        sort: 'updated',
        order: 'desc',
        per_page: 50, // Fetch a good number to filter through
    });

    const issues = response.data.items.map(issue => ({
        id: issue.id,
        title: issue.title,
        url: issue.html_url,
        repo_url: issue.repository_url,
        repo_name: issue.repository_url.replace('https://api.github.com/repos/', ''),
        labels: issue.labels.map(label => label.name),
        author: issue.user.login,
        comments: issue.comments,
        created_at: issue.created_at,
        is_vetted: COMMUNITY_VETTED_REPOS.has(
            issue.repository_url.replace('https://api.github.com/repos/', '')
        ),
    }));

    // Set data in cache for 15 minutes
    await setCache(cacheKey, issues, 900);

    return issues;
}

