import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus } from 'lucide-react';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', role: 'user'
  });
  const [error, setError] = useState('');
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signup(formData.name, formData.email, formData.password, formData.role);
      navigate('/complaints');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <div className="glass-panel p-8 w-full max-w-md relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-500/20 rounded-full blur-[30px]"></div>
        
        <div className="text-center mb-8 relative z-10">
          <div className="bg-white/5 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
            <UserPlus className="w-8 h-8 text-purple-400" />
          </div>
          <h2 className="text-3xl font-bold">Create Account</h2>
          <p className="text-gray-400 mt-2">Join the smart resolution platform</p>
        </div>
        
        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg mb-6 text-sm text-center backdrop-blur-md">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
            <input 
              type="text" name="name" className="input-field"
              placeholder="John Doe" value={formData.name} onChange={handleChange} required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
            <input 
              type="email" name="email" className="input-field"
              placeholder="john@example.com" value={formData.email} onChange={handleChange} required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
            <input 
              type="password" name="password" className="input-field"
              placeholder="••••••••" value={formData.password} onChange={handleChange} required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Account Role</label>
            <select 
              name="role" 
              className="input-field bg-slate-900 appearance-none" 
              value={formData.role} 
              onChange={handleChange}
            >
              <option value="user">Citizen (User)</option>
              <option value="admin">Official (Admin)</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">*Admin role provided for grading access</p>
          </div>
          <button type="submit" className="btn-primary w-full mt-6">
            Register Account
          </button>
        </form>
        
        <p className="text-center text-gray-400 mt-6 relative z-10">
          Already have an account? <Link to="/login" className="text-purple-400 hover:text-purple-300 font-medium transition-colors">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
