import React, { useState, useEffect } from 'react';
import { studentService } from '../../services/authService';
import { BookOpen, Calendar, CheckCircle, Clock } from 'lucide-react';

const Subjects: React.FC = () => {
  const [subjects, setSubjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSubjects();
  }, []);

  const loadSubjects = async () => {
    try {
      const data = await studentService.getSubjects();
      setSubjects(data);
    } catch (error) {
      console.error('Error loading subjects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitAssignment = async (assignmentId: number) => {
    try {
      await studentService.submitAssignment(assignmentId);
      loadSubjects(); // Refresh data
    } catch (error) {
      console.error('Error submitting assignment:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-blue-500">Loading subjects...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="dashboard-header">
        <h1 className="dashboard-title">My Subjects</h1>
      </div>

      <div className="grid gap-6">
        {subjects.map((subject) => (
          <div key={subject.id} className="card">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="w-6 h-6 text-blue-500" />
              <h2 className="text-xl font-semibold">{subject.subject_name}</h2>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-800">Assignments</h3>
              
              {subject.Assignments && subject.Assignments.length > 0 ? (
                <div className="space-y-3">
                  {subject.Assignments.map((assignment: any) => {
                    const submission = assignment.AssignmentSubmissions?.[0];
                    return (
                      <div
                        key={assignment.id}
                        className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-800">
                              {assignment.assignment_name}
                            </h4>
                            <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                              <Calendar className="w-4 h-4" />
                              Due: {new Date(assignment.due_date).toLocaleDateString()}
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            {submission && (
                              <span className={`status-badge status-${submission.submission_status}`}>
                                {submission.submission_status}
                              </span>
                            )}
                            
                            {submission?.submission_status === 'pending' && (
                              <button
                                onClick={() => handleSubmitAssignment(assignment.id)}
                                className="btn btn-primary btn-sm"
                              >
                                <CheckCircle className="w-4 h-4" />
                                Submit
                              </button>
                            )}
                            
                            {submission?.submission_status === 'graded' && submission.assignment_score && (
                              <div className="text-lg font-semibold text-blue-600">
                                {submission.assignment_score}/100
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">No assignments yet</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {subjects.length === 0 && (
        <div className="text-center py-16">
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No subjects available</p>
        </div>
      )}
    </div>
  );
};

export default Subjects;