import React, { useState, useEffect } from 'react';
import { teacherService } from '../../services/authService';
import { BookOpen, Users, TrendingUp, Clock } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [classes, setClasses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadClasses();
  }, []);

  const loadClasses = async () => {
    try {
      const data = await teacherService.getClasses();
      setClasses(data);
    } catch (error) {
      console.error('Error loading classes:', error);
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
        <h1 className="dashboard-title">Teacher Dashboard</h1>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <BookOpen className="w-8 h-8 mb-2 mx-auto" />
          <div className="stat-value">{classes.length}</div>
          <div className="stat-label">Classes</div>
        </div>

        <div className="stat-card">
          <Users className="w-8 h-8 mb-2 mx-auto" />
          <div className="stat-value">
            {classes.reduce((total, cls) => total + (cls.Assignments?.length || 0), 0)}
          </div>
          <div className="stat-label">Total Assignments</div>
        </div>

        <div className="stat-card">
          <TrendingUp className="w-8 h-8 mb-2 mx-auto" />
          <div className="stat-value">0</div>
          <div className="stat-label">Avg. Class Score</div>
        </div>

        <div className="stat-card">
          <Clock className="w-8 h-8 mb-2 mx-auto" />
          <div className="stat-value">0</div>
          <div className="stat-label">Pending Grades</div>
        </div>
      </div>

      <div className="card">
        <h2 className="text-xl font-semibold mb-4">My Classes</h2>
        
        {classes.length > 0 ? (
          <div className="space-y-4">
            {classes.map((cls) => (
              <div key={cls.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-800">{cls.class_name}</h3>
                    <p className="text-sm text-gray-600">
                      {cls.Assignments?.length || 0} assignments
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Grade {cls.grade_id}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">No classes assigned</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;