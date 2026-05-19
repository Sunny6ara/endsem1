import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { DonutChart, ProgressBar } from '../components/DashboardCharts';
import { Trash2, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

const AdminDashboard = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ pending: 0, progress: 0, resolved: 0 });

  const fetchComplaints = async () => {
    try {
      const res = await api.get('/complaints');
      setComplaints(res.data);
      
      const p = res.data.filter(c => c.status === 'Pending').length;
      const pr = res.data.filter(c => c.status === 'In Progress').length;
      const r = res.data.filter(c => c.status === 'Resolved').length;
      setStats({ pending: p, progress: pr, resolved: r });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const updateStatus = async (id, newStatus) => {
    try {
      await api.put(`/complaints/${id}`, { status: newStatus });
      fetchComplaints();
    } catch (err) {
      alert("Failed to update status");
    }
  };

  const deleteComplaint = async (id) => {
    if(window.confirm("Are you sure you want to delete this complaint?")) {
      try {
        await api.delete(`/complaints/${id}`);
        fetchComplaints();
      } catch (err) {
        alert("Failed to delete");
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Control Center</h1>
      
      {/* Analytics Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        <div className="glass-panel p-6 flex items-center justify-between">
          <div>
            <p className="text-gray-400 font-medium">Pending Issues</p>
            <h2 className="text-4xl font-bold text-red-400 mt-2">{stats.pending}</h2>
          </div>
          <AlertTriangle className="w-12 h-12 text-red-500/20" />
        </div>
        <div className="glass-panel p-6 flex items-center justify-between">
          <div>
            <p className="text-gray-400 font-medium">In Progress</p>
            <h2 className="text-4xl font-bold text-yellow-400 mt-2">{stats.progress}</h2>
          </div>
          <Clock className="w-12 h-12 text-yellow-500/20" />
        </div>
        <div className="glass-panel p-6 flex items-center justify-between">
          <div>
            <p className="text-gray-400 font-medium">Resolved</p>
            <h2 className="text-4xl font-bold text-green-400 mt-2">{stats.resolved}</h2>
          </div>
          <CheckCircle className="w-12 h-12 text-green-500/20" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        <div className="glass-panel p-6 lg:col-span-1">
          <h3 className="text-xl font-semibold mb-6 text-center">Status Distribution</h3>
          <DonutChart pending={stats.pending} progress={stats.progress} resolved={stats.resolved} />
        </div>
        <div className="glass-panel p-6 lg:col-span-2 flex flex-col justify-center">
          <h3 className="text-xl font-semibold mb-6">AI Department Routing Load</h3>
          <ProgressBar label="Water Department" value={complaints.filter(c=>c.department.includes('Water')).length} max={complaints.length||1} colorClass="bg-blue-500" />
          <ProgressBar label="Electricity Department" value={complaints.filter(c=>c.department.includes('Electric')).length} max={complaints.length||1} colorClass="bg-yellow-500" />
          <ProgressBar label="Sanitation / Civic" value={complaints.filter(c=>(c.department.includes('Sanitation')||c.department.includes('Civic'))).length} max={complaints.length||1} colorClass="bg-green-500" />
        </div>
      </div>

      {/* Management Table */}
      <div className="glass-panel overflow-hidden">
        <div className="p-6 border-b border-white/10">
          <h3 className="text-xl font-semibold">Active Complaints</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 text-gray-300 text-sm uppercase tracking-wider">
                <th className="p-4">Complaint</th>
                <th className="p-4">AI Priority</th>
                <th className="p-4">Department</th>
                <th className="p-4">Status Update</th>
                <th className="p-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map(c => (
                <tr key={c._id} className="border-b border-white/5 hover:bg-white/[0.02]">
                  <td className="p-4">
                    <p className="font-semibold">{c.title}</p>
                    <p className="text-xs text-gray-400">{c.location}</p>
                  </td>
                  <td className="p-4">
                    <span className={`text-sm ${c.priority === 'Critical' ? 'text-red-400 font-bold' : 'text-gray-300'}`}>{c.priority}</span>
                  </td>
                  <td className="p-4 text-sm text-blue-300">{c.department}</td>
                  <td className="p-4">
                    <select 
                      className={`text-sm rounded p-1 bg-slate-900 border ${c.status==='Pending'?'border-red-500/50 text-red-300':c.status==='In Progress'?'border-yellow-500/50 text-yellow-300':'border-green-500/50 text-green-300'}`}
                      value={c.status}
                      onChange={(e) => updateStatus(c._id, e.target.value)}
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Resolved">Resolved</option>
                    </select>
                  </td>
                  <td className="p-4 text-center">
                    <button onClick={() => deleteComplaint(c._id)} className="p-2 text-gray-400 hover:text-red-400 transition-colors rounded-lg hover:bg-red-500/10">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
