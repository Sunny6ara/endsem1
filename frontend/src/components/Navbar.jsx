import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ShieldAlert, LogOut, User, LayoutDashboard, PlusCircle, List, ArrowRight } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex justify-center w-full pt-6 px-4 absolute top-0 z-50">
      <nav className="w-full max-w-5xl bg-slate-900/60 backdrop-blur-2xl border border-slate-700/50 rounded-full px-6 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-all duration-300">
        <div className="flex justify-between items-center">
          
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="bg-gradient-to-tr from-blue-500 to-purple-600 p-2 rounded-full group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(59,130,246,0.5)]">
              <ShieldAlert className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-slate-100 to-slate-400 hidden sm:block">
              SmartComplain
            </span>
          </Link>
          
          <div className="flex items-center space-x-1 sm:space-x-4">
            {user ? (
              <>
                <Link to="/complaints" className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${isActive('/complaints') ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'}`}>
                  <List className="w-4 h-4" />
                  <span className="hidden md:block font-medium text-sm">Portal</span>
                </Link>
                
                <Link to="/register-complaint" className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${isActive('/register-complaint') ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'}`}>
                  <PlusCircle className="w-4 h-4" />
                  <span className="hidden md:block font-medium text-sm">New Request</span>
                </Link>
                
                {user.role === 'admin' && (
                  <Link to="/admin" className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${isActive('/admin') ? 'bg-purple-500/20 text-purple-300' : 'text-purple-400/70 hover:text-purple-300 hover:bg-purple-500/10'}`}>
                    <LayoutDashboard className="w-4 h-4" />
                    <span className="hidden md:block font-medium text-sm">Dashboard</span>
                  </Link>
                )}
                
                <div className="h-6 w-px bg-slate-700 mx-2 hidden sm:block"></div>
                
                <div className="flex items-center space-x-3 pl-2">
                  <div className="hidden sm:flex items-center space-x-2 bg-slate-800/50 px-3 py-1.5 rounded-full border border-slate-700/50">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span className="text-xs font-semibold text-slate-300">{user.name.split(' ')[0]}</span>
                  </div>
                  <button onClick={handleLogout} className="p-2 text-slate-400 hover:text-red-400 bg-slate-800/50 hover:bg-red-500/10 border border-slate-700/50 rounded-full transition-all duration-300" title="Logout">
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login" className="text-sm font-medium text-slate-300 hover:text-white transition-colors px-4 py-2">Sign in</Link>
                <Link to="/signup" className="flex items-center gap-2 bg-slate-100 hover:bg-white text-slate-900 font-bold py-2 px-5 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all duration-300 hover:scale-[1.02]">
                  Get Started <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>
          
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
