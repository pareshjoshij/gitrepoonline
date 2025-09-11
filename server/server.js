import express from 'express';
import cors from 'cors';
// This is the corrected named import to match the export in api.js
import { router as apiRoutes } from './routes/api.js';

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api', apiRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

