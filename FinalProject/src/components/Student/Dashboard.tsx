import React, { useState, useEffect } from 'react';
import { studentService } from '../../services/authService';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Calendar, BookOpen, TrendingUp, Clock } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [attendanceData, setAttendanceData] = useState<any>(null);
  const [assignmentData, setAssignmentData] = useState<any>(null);
  const [scoresData, setScoresData] = useState<any[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, [selectedPeriod]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [attendance, assignments, scores] = await Promise.all([
        studentService.getAttendance(selectedPeriod),
        studentService.getAssignments(),
        studentService.getScores(),
      ]);

      setAttendanceData(attendance);
      setAssignmentData(assignments);
      setScoresData(scores);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatAttendanceForChart = (stats: any) => {
    return Object.entries(stats).map(([key, value]) => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      value: value as number,
    }));
  };

  const formatAssignmentForChart = (stats: any) => {
    return Object.entries(stats).map(([key, value]) => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      value: value as number,
    }));
  };

  const COLORS = ['#3b82f6', '#1e40af', '#60a5fa', '#93c5fd'];

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
        <h1 className="dashboard-title">Student Dashboard</h1>
        <div className="flex gap-4 items-center">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="form-select"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <Calendar className="w-8 h-8 mb-2 mx-auto" />
          <div className="stat-value">
            {attendanceData?.attendance?.length || 0}
          </div>
          <div className="stat-label">Attendance Records</div>
        </div>

        <div className="stat-card">
          <BookOpen className="w-8 h-8 mb-2 mx-auto" />
          <div className="stat-value">
            {assignmentData?.submissions?.length || 0}
          </div>
          <div className="stat-label">Total Assignments</div>
        </div>

        <div className="stat-card">
          <TrendingUp className="w-8 h-8 mb-2 mx-auto" />
          <div className="stat-value">
            {scoresData?.length || 0}
          </div>
          <div className="stat-label">Graded Subjects</div>
        </div>

        <div className="stat-card">
          <Clock className="w-8 h-8 mb-2 mx-auto" />
          <div className="stat-value">
            {assignmentData?.stats?.pending || 0}
          </div>
          <div className="stat-label">Pending Assignments</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="chart-container">
          <h3 className="chart-title">Attendance Overview</h3>
          {attendanceData?.stats && (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={formatAttendanceForChart(attendanceData.stats)}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {formatAttendanceForChart(attendanceData.stats).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="chart-container">
          <h3 className="chart-title">Assignment Submissions</h3>
          {assignmentData?.stats && (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={formatAssignmentForChart(assignmentData.stats)}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {formatAssignmentForChart(assignmentData.stats).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      <div className="chart-container">
        <h3 className="chart-title">Subject Scores</h3>
        {scoresData.length > 0 ? (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={scoresData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="subject" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Legend />
              <Bar dataKey="average" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-gray-500 text-center py-8">No graded assignments yet</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;