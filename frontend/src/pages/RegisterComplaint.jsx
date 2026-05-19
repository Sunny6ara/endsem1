import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { Send, Loader2 } from 'lucide-react';

const RegisterComplaint = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    title: '',
    description: '',
    category: 'Water',
    location: ''
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const res = await api.post('/complaints', formData);
      // Navigate to the AI Analysis result page for this newly created complaint
      navigate(`/complaint/${res.data._id}/analysis`, { state: { complaint: res.data } });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to register complaint');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="glass-panel p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[50px]"></div>
        
        <h2 className="text-3xl font-bold mb-2">Report an Issue</h2>
        <p className="text-gray-400 mb-8">Our AI will automatically categorize and route your complaint to the correct department.</p>

        {error && <div className="bg-red-500/20 text-red-200 p-4 rounded-xl mb-6">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Issue Title</label>
              <input 
                type="text" name="title" className="input-field" 
                placeholder="e.g. Major water pipe burst" value={formData.title} onChange={handleChange} required 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
              <select name="category" className="input-field bg-slate-900 appearance-none" value={formData.category} onChange={handleChange}>
                <option value="Water">Water & Plumbing</option>
                <option value="Electricity">Electricity & Power</option>
                <option value="Roads">Roads & Infrastructure</option>
                <option value="Sanitation">Sanitation & Garbage</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Detailed Description</label>
            <textarea 
              name="description" rows="5" className="input-field resize-none" 
              placeholder="Describe the issue in detail. Our AI will read this to assign priority..."
              value={formData.description} onChange={handleChange} required 
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Exact Location</label>
            <input 
              type="text" name="location" className="input-field" 
              placeholder="e.g. Sector 4, Main Street, near Central Park" value={formData.location} onChange={handleChange} required 
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className={`btn-primary w-full flex items-center justify-center gap-2 ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Processing via AI Agent...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Submit for AI Analysis
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterComplaint;
