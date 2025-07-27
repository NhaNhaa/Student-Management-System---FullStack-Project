import React, { useState, useEffect } from 'react';
import { teacherService } from '../../services/authService';
import { BookOpen, Plus, Calendar, Users } from 'lucide-react';

const Classes: React.FC = () => {
  const [classes, setClasses] = useState<any[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newAssignment, setNewAssignment] = useState({
    class_id: '',
    subject_id: '',
    assignment_name: '',
    due_date: '',
  });
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

  const handleCreateAssignment = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await teacherService.createAssignment(newAssignment);
      setShowCreateModal(false);
      setNewAssignment({
        class_id: '',
        subject_id: '',
        assignment_name: '',
        due_date: '',
      });
      loadClasses();
    } catch (error) {
      console.error('Error creating assignment:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-blue-500">Loading classes...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="dashboard-header">
        <h1 className="dashboard-title">My Classes</h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="btn btn-primary"
        >
          <Plus className="w-4 h-4" />
          Create Assignment
        </button>
      </div>

      <div className="grid gap-6">
        {classes.map((cls) => (
          <div key={cls.id} className="card">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="w-6 h-6 text-blue-500" />
              <h2 className="text-xl font-semibold">{cls.class_name}</h2>
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                Grade {cls.grade_id}
              </span>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-800">Assignments</h3>
              
              {cls.Assignments && cls.Assignments.length > 0 ? (
                <div className="space-y-3">
                  {cls.Assignments.map((assignment: any) => (
                    <div
                      key={assignment.id}
                      className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-gray-800">
                            {assignment.assignment_name}
                          </h4>
                          <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                            <Calendar className="w-4 h-4" />
                            Due: {new Date(assignment.due_date).toLocaleDateString()}
                          </div>
                          {assignment.Subject && (
                            <div className="text-sm text-gray-500 mt-1">
                              Subject: {assignment.Subject.subject_name}
                            </div>
                          )}
                        </div>
                        
                        <div className="text-right">
                          <div className="text-sm text-gray-500">
                            <Users className="w-4 h-4 inline mr-1" />
                            Submissions: 0
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">No assignments yet</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {classes.length === 0 && (
        <div className="text-center py-16">
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No classes assigned</p>
        </div>
      )}

      {showCreateModal && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">Create Assignment</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="close-btn"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleCreateAssignment}>
              <div className="form-group">
                <label className="form-label">Class</label>
                <select
                  value={newAssignment.class_id}
                  onChange={(e) => setNewAssignment({
                    ...newAssignment,
                    class_id: e.target.value
                  })}
                  className="form-select"
                  required
                >
                  <option value="">Select a class</option>
                  {classes.map((cls) => (
                    <option key={cls.id} value={cls.id}>
                      {cls.class_name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Subject ID</label>
                <input
                  type="number"
                  value={newAssignment.subject_id}
                  onChange={(e) => setNewAssignment({
                    ...newAssignment,
                    subject_id: e.target.value
                  })}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Assignment Name</label>
                <input
                  type="text"
                  value={newAssignment.assignment_name}
                  onChange={(e) => setNewAssignment({
                    ...newAssignment,
                    assignment_name: e.target.value
                  })}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Due Date</label>
                <input
                  type="date"
                  value={newAssignment.due_date}
                  onChange={(e) => setNewAssignment({
                    ...newAssignment,
                    due_date: e.target.value
                  })}
                  className="form-input"
                  required
                />
              </div>

              <div className="flex gap-2">
                <button type="submit" className="btn btn-primary">
                  Create Assignment
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Classes;