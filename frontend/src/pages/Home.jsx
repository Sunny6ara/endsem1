import React from 'react';
import { Link } from 'react-router-dom';
import { Bot, Zap, ShieldCheck, Activity } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, desc }) => (
  <div className="glass-panel p-6 flex flex-col items-center text-center group hover:scale-[1.02] transition-transform duration-300">
    <div className="bg-gradient-to-br from-blue-500/20 to-purple-600/20 p-4 rounded-2xl mb-4 group-hover:from-blue-500/40 group-hover:to-purple-600/40 transition-colors">
      <Icon className="w-8 h-8 text-blue-400" />
    </div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-400">{desc}</p>
  </div>
);

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
      {/* Hero Section */}
      <div className="text-center max-w-4xl mx-auto mb-16 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-600/30 rounded-full blur-[100px] -z-10"></div>
        <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-600/30 rounded-full blur-[100px] -z-10"></div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
          Next-Gen <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">AI Complaint</span> Resolution
        </h1>
        <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
          Experience the future of civic management. Our AI-driven system automatically analyzes, categorizes, and routes complaints to the correct department with zero human delay.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/register-complaint" className="btn-primary text-lg">
            Report an Issue
          </Link>
          <Link to="/login" className="btn-secondary text-lg">
            Access Portal
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl">
        <FeatureCard 
          icon={Bot} 
          title="AI Analysis" 
          desc="Google Gemini powered natural language understanding for automatic issue categorization." 
        />
        <FeatureCard 
          icon={Zap} 
          title="Instant Routing" 
          desc="Zero-delay routing to the exact department responsible based on semantic context." 
        />
        <FeatureCard 
          icon={ShieldCheck} 
          title="Secure & Reliable" 
          desc="Enterprise-grade JWT authentication and role-based access controls." 
        />
        <FeatureCard 
          icon={Activity} 
          title="Real-time Tracking" 
          desc="Track the exact status of your complaint with live admin updates." 
        />
      </div>
    </div>
  );
};

export default Home;
