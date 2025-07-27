import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
};

export const studentService = {
  getProfile: async () => {
    const response = await api.get('/student/profile');
    return response.data;
  },
  
  getAttendance: async (period: string) => {
    const response = await api.get(`/student/attendance?period=${period}`);
    return response.data;
  },
  
  getAssignments: async () => {
    const response = await api.get('/student/assignments');
    return response.data;
  },
  
  getScores: async () => {
    const response = await api.get('/student/scores');
    return response.data;
  },
  
  getSubjects: async () => {
    const response = await api.get('/student/subjects');
    return response.data;
  },
  
  submitAssignment: async (assignmentId: number) => {
    const response = await api.post('/student/submit-assignment', { 
      assignment_id: assignmentId 
    });
    return response.data;
  },
};

export const teacherService = {
  getProfile: async () => {
    const response = await api.get('/teacher/profile');
    return response.data;
  },
  
  getClasses: async () => {
    const response = await api.get('/teacher/classes');
    return response.data;
  },
  
  getStudents: async (classId: number) => {
    const response = await api.get(`/teacher/students/${classId}`);
    return response.data;
  },
  
  createAssignment: async (assignmentData: any) => {
    const response = await api.post('/teacher/assignments', assignmentData);
    return response.data;
  },
  
  gradeAssignment: async (submissionId: number, score: number) => {
    const response = await api.put('/teacher/grade-assignment', {
      submission_id: submissionId,
      score,
    });
    return response.data;
  },
  
  getStudentAnalysis: async (studentId: number) => {
    const response = await api.get(`/teacher/student-analysis/${studentId}`);
    return response.data;
  },
};

export const adminService = {
  getProfile: async () => {
    const response = await api.get('/admin/profile');
    return response.data;
  },
  
  getUsers: async () => {
    const response = await api.get('/admin/users');
    return response.data;
  },
  
  createUser: async (userData: any) => {
    const response = await api.post('/admin/users', userData);
    return response.data;
  },
  
  updateUser: async (userId: number, userData: any) => {
    const response = await api.put(`/admin/users/${userId}`, userData);
    return response.data;
  },
  
  deleteUser: async (userId: number) => {
    const response = await api.delete(`/admin/users/${userId}`);
    return response.data;
  },
  
  getDashboard: async () => {
    const response = await api.get('/admin/dashboard');
    return response.data;
  },
};