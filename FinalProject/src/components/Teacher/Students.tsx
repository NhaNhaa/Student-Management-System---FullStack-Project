import React, { useState, useEffect } from 'react';
import { teacherService } from '../../services/authService';
import { Users, TrendingUp, Calendar, BookOpen } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Students: React.FC = () => {
  const [students, setStudents] = useState<any[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [studentAnalysis, setStudentAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      // For demo purposes, we'll load students from class 1
      const data = await teacherService.getStudents(1);
      setStudents(data);
    } catch (error) {
      console.error('Error loading students:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadStudentAnalysis = async (studentId: number) => {
    try {
      const analysis = await teacherService.getStudentAnalysis(studentId);
      setStudentAnalysis(analysis);
    } catch (error) {
      console.error('Error loading student analysis:', error);
    }
  };

  const handleGradeAssignment = async (submissionId: number, score: number) => {
    try {
      await teacherService.gradeAssignment(submissionId, score);
      if (selectedStudent) {
        loadStudentAnalysis(selectedStudent.id);
      }
    } catch (error) {
      console.error('Error grading assignment:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-blue-500">Loading students...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="dashboard-header">
        <h1 className="dashboard-title">Student Management</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">
            <Users className="w-5 h-5 inline mr-2" />
            Students
          </h2>
          
          {students.length > 0 ? (
            <div className="space-y-3">
              {students.map((student) => (
                <div
                  key={student.id}
                  className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => {
                    setSelectedStudent(student);
                    loadStudentAnalysis(student.id);
                  }}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium text-gray-800">
                        {student.first_name} {student.last_name}
                      </h3>
                      <p className="text-sm text-gray-600">{student.email}</p>
                    </div>
                    <div className="text-right text-sm text-gray-500">
                      <div>Submissions: {student.AssignmentSubmissions?.length || 0}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No students found</p>
          )}
        </div>

        <div className="card">
          <h2 className="text-xl font-semibold mb-4">
            <TrendingUp className="w-5 h-5 inline mr-2" />
            Student Analysis
          </h2>
          
          {selectedStudent && studentAnalysis ? (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-lg font-medium">
                  {selectedStudent.first_name} {selectedStudent.last_name}
                </h3>
                <p className="text-gray-600">{selectedStudent.email}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <Calendar className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-600">
                    {studentAnalysis.attendanceStats.present || 0}
                  </div>
                  <div className="text-sm text-gray-600">Present Days</div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <BookOpen className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-600">
                    {studentAnalysis.submissionStats.submitted || 0}
                  </div>
                  <div className="text-sm text-gray-600">Submitted</div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">Assignment Submissions</h4>
                <div className="space-y-2">
                  {studentAnalysis.student.AssignmentSubmissions?.map((submission: any) => (
                    <div
                      key={submission.id}
                      className="flex justify-between items-center p-3 bg-gray-50 rounded"
                    >
                      <div>
                        <div className="font-medium">
                          {submission.Assignment?.assignment_name}
                        </div>
                        <div className="text-sm text-gray-600">
                          {submission.Assignment?.Subject?.subject_name}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`status-badge status-${submission.submission_status}`}>
                          {submission.submission_status}
                        </span>
                        {submission.submission_status === 'submitted' && (
                          <div className="flex items-center gap-1">
                            <input
                              type="number"
                              min="0"
                              max="100"
                              placeholder="Score"
                              className="w-16 p-1 border rounded text-sm"
                              onBlur={(e) => {
                                const score = parseInt(e.target.value);
                                if (score >= 0 && score <= 100) {
                                  handleGradeAssignment(submission.id, score);
                                }
                              }}
                            />
                            <span className="text-sm text-gray-500">/100</span>
                          </div>
                        )}
                        {submission.assignment_score && (
                          <span className="font-bold text-blue-600">
                            {submission.assignment_score}/100
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">
              Select a student to view analysis
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Students;