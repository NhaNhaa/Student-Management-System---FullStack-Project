import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { adminService } from '../../services/authService';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import Users from './Users';
import Profile from './Profile';

const AdminDashboard: React.FC = () => {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const profileData = await adminService.getProfile();
      setProfile(profileData);
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-blue-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/profile" element={<Profile profile={profile} />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;