import React from 'react';

// Custom SVG Chart components to avoid heavy chart.js/recharts dependencies 
// while giving a highly premium, animated look.

export const ProgressBar = ({ label, value, max, colorClass }) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div className="w-full mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-300">{label}</span>
        <span className="text-sm font-bold text-white">{value}</span>
      </div>
      <div className="w-full bg-white/5 rounded-full h-2.5 overflow-hidden border border-white/10">
        <div 
          className={`h-2.5 rounded-full ${colorClass} shadow-[0_0_10px_currentColor] transition-all duration-1000 ease-out`} 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export const DonutChart = ({ pending, progress, resolved }) => {
  const total = pending + progress + resolved || 1;
  
  const pendingDeg = (pending / total) * 360;
  const progressDeg = (progress / total) * 360;
  // const resolvedDeg = (resolved / total) * 360;
  
  return (
    <div className="relative w-48 h-48 rounded-full flex items-center justify-center mx-auto shadow-2xl" 
         style={{
           background: `conic-gradient(
             #ef4444 0deg ${pendingDeg}deg, 
             #eab308 ${pendingDeg}deg ${pendingDeg + progressDeg}deg, 
             #22c55e ${pendingDeg + progressDeg}deg 360deg
           )`
         }}>
      <div className="w-32 h-32 bg-slate-900 rounded-full flex flex-col items-center justify-center z-10 border-4 border-white/5 shadow-inner">
        <span className="text-3xl font-bold text-white">{total}</span>
        <span className="text-xs text-gray-400">Total</span>
      </div>
      {/* Glow Effect */}
      <div className="absolute inset-0 rounded-full shadow-[0_0_30px_rgba(255,255,255,0.1)] -z-10"></div>
    </div>
  );
};
