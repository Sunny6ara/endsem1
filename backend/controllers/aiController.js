import { analyzeComplaint } from '../utils/gemini.js';

export const analyzeManual = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required for analysis' });
    }
    
    const result = await analyzeComplaint(title, description);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
