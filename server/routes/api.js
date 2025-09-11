import express from 'express';
import { getIssues } from '../services/githubService.js';
import { getCache, setCache } from '../services/cacheService.js';

const router = express.Router();

// This route handles requests for Hacktoberfest issues.
router.get('/issues', async (req, res) => {
  // This line is for debugging to see what query the server receives.
  console.log('Received request with query:', req.query);

  const { language } = req.query;

  // Ensure the language parameter is provided.
  if (!language) {
    return res.status(400).json({ msg: 'Language parameter is required.' });
  }

  const cacheKey = `issues:${language}`;

  try {
    // First, try to get data from the cache.
    const cachedData = await getCache(cacheKey);
    if (cachedData) {
      console.log(`Serving from cache for language: ${language}`);
      return res.json(cachedData);
    }

    // If not in cache, fetch from the GitHub API.
    console.log(`Fetching from GitHub API for language: ${language}`);
    const issues = await getIssues(language);

    // Store the new data in the cache for 1 hour.
    await setCache(cacheKey, issues, 3600);

    res.json(issues);
  } catch (error) {
    console.error('Error in /issues route:', error);
    res.status(500).json({ msg: 'Server error fetching issues from GitHub.' });
  }
});

// Use a named export for clarity and to avoid module conflicts.
export { router };

