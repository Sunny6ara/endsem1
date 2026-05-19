import React, { useState, useEffect, useRef } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';
import { Search, Filter, MapPin, Cpu, ChevronDown, CheckCircle2, AlertCircle, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const StatusBadge = ({ status }) => {
  const config = {
    'Pending': { color: 'text-yellow-400 bg-yellow-400/10 border-yellow-500/20', icon: Clock },
    'In Progress': { color: 'text-blue-400 bg-blue-400/10 border-blue-500/20', icon: AlertCircle },
    'Resolved': { color: 'text-green-400 bg-green-400/10 border-green-500/20', icon: CheckCircle2 }
  };
  const StatusIcon = config[status]?.icon || Clock;
  
  return (
    <div className={`px-3 py-1.5 rounded-full text-xs font-semibold border flex items-center gap-1.5 backdrop-blur-md ${config[status]?.color}`}>
      <StatusIcon className="w-3.5 h-3.5" />
      {status}
    </div>
  );
};

const PriorityIndicator = ({ priority }) => {
  const colors = {
    'Low': 'bg-slate-400 shadow-slate-400/50',
    'Medium': 'bg-yellow-400 shadow-yellow-400/50',
    'High': 'bg-orange-500 shadow-orange-500/50',
    'Critical': 'bg-red-500 shadow-red-500/80 animate-pulse'
  };
  return (
    <div className="flex items-center gap-2">
      <div className={`w-2.5 h-2.5 rounded-full shadow-[0_0_8px] ${colors[priority]}`}></div>
      <span className="text-sm font-medium text-slate-300">{priority}</span>
    </div>
  );
};

// Custom Premium Dropdown Component
const CustomDropdown = ({ value, onChange, options, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full sm:w-56" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 hover:border-slate-500/50 px-4 py-3 rounded-2xl text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50 shadow-lg"
      >
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className={value ? "text-white" : "text-slate-400"}>
            {value || placeholder}
          </span>
        </div>
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-2 w-full bg-slate-900/95 backdrop-blur-2xl border border-slate-700 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] z-50 overflow-hidden"
          >
            <div className="p-1">
              {options.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => {
                    onChange(opt.value);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 rounded-xl text-sm transition-colors duration-200 ${
                    value === opt.value 
                      ? 'bg-purple-500/20 text-purple-300 font-medium' 
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ComplaintList = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchLoc, setSearchLoc] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const fetchComplaints = async () => {
    try {
      setLoading(true);
      let endpoint = '/complaints';
      if (searchLoc) endpoint = `/complaints/search?location=${searchLoc}`;
      else if (categoryFilter) endpoint = `/complaints/category/${categoryFilter}`;
      
      const res = await api.get(endpoint);
      setComplaints(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchComplaints();
    }, 400); // Debounce search
    return () => clearTimeout(delayDebounce);
  }, [searchLoc, categoryFilter]);

  const categories = [
    { value: '', label: 'All Categories' },
    { value: 'Water', label: 'Water & Plumbing' },
    { value: 'Electricity', label: 'Electricity & Power' },
    { value: 'Roads', label: 'Roads & Infrastructure' },
    { value: 'Sanitation', label: 'Sanitation & Garbage' }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8 min-h-screen">
      
      {/* Header & Controls */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 gap-6 relative z-40">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-2">
            Issues <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">Portal</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-xl">Monitor, track, and resolve civic complaints enhanced by AI intelligence.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
          {/* Enhanced Search Bar */}
          <div className="relative w-full sm:w-72 group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-slate-500 group-focus-within:text-purple-400 transition-colors" />
            </div>
            <input 
              type="text" 
              placeholder="Search by location..." 
              className="w-full bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 hover:border-slate-500/50 focus:border-purple-500/50 pl-11 pr-4 py-3 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all duration-300 shadow-lg"
              value={searchLoc}
              onChange={(e) => { setSearchLoc(e.target.value); setCategoryFilter(''); }}
            />
          </div>
          
          <CustomDropdown 
            options={categories} 
            value={categoryFilter} 
            onChange={(val) => { setCategoryFilter(val); setSearchLoc(''); }} 
            placeholder="Filter Category"
          />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10">
        {loading ? (
          <div className="flex justify-center items-center py-32">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 rounded-full border-t-2 border-purple-500 animate-spin"></div>
              <div className="absolute inset-2 rounded-full border-t-2 border-blue-500 animate-spin border-opacity-70"></div>
            </div>
          </div>
        ) : complaints.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            className="flex flex-col items-center justify-center py-24 text-center bg-slate-900/30 border border-slate-800/50 rounded-3xl backdrop-blur-xl"
          >
            <div className="bg-slate-800/50 p-4 rounded-2xl mb-4">
              <Search className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No complaints found</h3>
            <p className="text-slate-400">Try adjusting your filters or search query.</p>
          </motion.div>
        ) : (
          <motion.div 
            variants={container} 
            initial="hidden" 
            animate="show" 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {complaints.map(c => (
              <motion.div 
                key={c._id} 
                variants={item}
                className="group flex flex-col bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-6 hover:scale-[1.02] hover:shadow-[0_10px_40px_-10px_rgba(124,58,237,0.2)] transition-all duration-300 cursor-default relative overflow-hidden"
              >
                {/* Subtle gradient background glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="flex justify-between items-start mb-4 relative z-10">
                  <StatusBadge status={c.status} />
                  <span className="text-xs text-slate-500 font-medium bg-slate-800/50 px-2.5 py-1 rounded-lg">
                    {new Date(c.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-100 mb-2 leading-tight line-clamp-2 relative z-10">{c.title}</h3>
                
                <div className="flex items-center gap-2 mb-6 text-sm text-slate-400 relative z-10">
                  <MapPin className="w-4 h-4 text-slate-500" />
                  <span className="truncate">{c.location}</span>
                </div>

                <div className="mt-auto space-y-4 relative z-10">
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-800/40 border border-slate-700/30">
                    <div className="flex items-center gap-2 text-sm">
                      <Cpu className="w-4 h-4 text-purple-400" />
                      <span className="text-slate-300 font-medium truncate max-w-[120px]">{c.department}</span>
                    </div>
                    <PriorityIndicator priority={c.priority} />
                  </div>

                  <Link 
                    to={`/complaint/${c._id}/analysis`} 
                    state={{ complaint: c }} 
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600/80 to-blue-600/80 hover:from-purple-500 hover:to-blue-500 text-white font-medium shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
                  >
                    View AI Report
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ComplaintList;
