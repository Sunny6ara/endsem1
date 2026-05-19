import mongoose from 'mongoose';

const ComplaintSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  location: { type: String, required: true },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Resolved'],
    default: 'Pending'
  },
  priority: { type: String, default: 'Low' },
  department: { type: String, default: 'General' },
  aiSummary: { type: String },
  aiResponse: { type: String },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Complaint', ComplaintSchema);
