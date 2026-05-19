import Complaint from '../models/Complaint.js';
import { analyzeComplaint } from '../utils/gemini.js';

export const createComplaint = async (req, res) => {
  try {
    const { name, email, title, description, category, location } = req.body;

    if (!name || !email || !title || !description || !category || !location) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // AI Analysis
    const aiData = await analyzeComplaint(title, description);

    const complaint = await Complaint.create({
      name,
      email,
      title,
      description,
      category,
      location,
      priority: aiData.priority,
      department: aiData.department,
      aiSummary: aiData.summary,
      aiResponse: aiData.autoReply
    });

    res.status(201).json(complaint);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({}).sort({ createdAt: -1 });
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateComplaintStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const complaint = await Complaint.findById(req.params.id);

    if (complaint) {
      complaint.status = status || complaint.status;
      const updatedComplaint = await complaint.save();
      res.json(updatedComplaint);
    } else {
      res.status(404).json({ message: 'Complaint not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findByIdAndDelete(req.params.id);
    if (complaint) {
      res.json({ message: 'Complaint removed' });
    } else {
      res.status(404).json({ message: 'Complaint not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const searchComplaintsByLocation = async (req, res) => {
  try {
    const { location } = req.query;
    if (!location) {
      return res.status(400).json({ message: 'Location query parameter is required' });
    }
    const complaints = await Complaint.find({ location: { $regex: location, $options: 'i' } });
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const filterComplaintsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const complaints = await Complaint.find({ category: { $regex: category, $options: 'i' } });
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
