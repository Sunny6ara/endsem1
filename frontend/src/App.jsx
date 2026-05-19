import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import RegisterComplaint from './pages/RegisterComplaint';
import ComplaintList from './pages/ComplaintList';
import AdminDashboard from './pages/AdminDashboard';
import AIAnalysis from './pages/AIAnalysis';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) return <div>Loading...</div>;
  return user ? children : <Navigate to="/login" />;
};

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) return <div>Loading...</div>;
  return user && user.role === 'admin' ? children : <Navigate to="/" />;
};

function App() {
  return (
    <div className="min-h-screen relative">
      <Navbar />
      <div className="container mx-auto px-4 pt-28 pb-12">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route 
            path="/register-complaint" 
            element={
              <ProtectedRoute>
                <RegisterComplaint />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/complaints" 
            element={
              <ProtectedRoute>
                <ComplaintList />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/complaint/:id/analysis" 
            element={
              <ProtectedRoute>
                <AIAnalysis />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin" 
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            } 
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
