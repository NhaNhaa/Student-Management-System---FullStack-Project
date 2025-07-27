import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/authService';
import { Users, UserCheck, BookOpen, TrendingUp } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const data = await adminService.getDashboard();
      setDashboardData(data);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-blue-500">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="dashboard-header">
        <h1 className="dashboard-title">Admin Dashboard</h1>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <Users className="w-8 h-8 mb-2 mx-auto" />
          <div className="stat-value">{dashboardData?.totalStudents || 0}</div>
          <div className="stat-label">Total Students</div>
        </div>

        <div className="stat-card">
          <UserCheck className="w-8 h-8 mb-2 mx-auto" />
          <div className="stat-value">{dashboardData?.totalTeachers || 0}</div>
          <div className="stat-label">Total Teachers</div>
        </div>

        <div className="stat-card">
          <BookOpen className="w-8 h-8 mb-2 mx-auto" />
          <div className="stat-value">{dashboardData?.totalClasses || 0}</div>
          <div className="stat-label">Total Classes</div>
        </div>

        <div className="stat-card">
          <TrendingUp className="w-8 h-8 mb-2 mx-auto" />
          <div className="stat-value">
            {(dashboardData?.totalStudents || 0) + (dashboardData?.totalTeachers || 0)}
          </div>
          <div className="stat-label">Total Users</div>
        </div>
      </div>

      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Recent Users</h2>
        
        {dashboardData?.recentUsers && dashboardData.recentUsers.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>ID</th>
                </tr>
              </thead>
              <tbody>
                {dashboardData.recentUsers.map((user: any) => (
                  <tr key={user.id}>
                    <td>{user.first_name} {user.last_name}</td>
                    <td>{user.email}</td>
                    <td>
                      <span className={`status-badge status-${user.role}`}>
                        {user.role}
                      </span>
                    </td>
                    <td>{user.id}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">No recent users</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;