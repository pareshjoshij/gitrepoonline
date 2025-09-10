import express from 'express';
import { getIssues } from '../services/githubService.js';

const router = express.Router();

// @route   GET /api/issues
// @desc    Get curated issues from GitHub
// @access  Public
router.get('/issues', async (req, res) => {
    try {
        const { lang } = req.query;
        // Basic validation
        if (!lang) {
            return res.status(400).json({ msg: 'Language parameter is required.' });
        }
        
        const issues = await getIssues(lang);
        res.json(issues);

    } catch (error) {
        console.error('Error in /api/issues:', error.message);
        res.status(500).send('Server Error');
    }
});

export default router;

