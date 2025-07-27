const { User, Class, Assignment, AssignmentSubmission, Attendance, Subject, Exam, ExamResult } = require('../models/associations');
const { Op } = require('sequelize');

const teacherController = {
  // Get teacher profile
  getProfile: async (req, res) => {
    try {
      const teacher = await User.findByPk(req.user.id, {
        attributes: ['id', 'first_name', 'last_name', 'email'],
      });

      res.json(teacher);
    } catch (error) {
      console.error('Error getting teacher profile:', error);
      res.status(500).json({ error: 'Server error' });
    }
  },

  // Get teacher's classes
  getClasses: async (req, res) => {
    try {
      const classes = await Class.findAll({
        include: [
          {
            model: Assignment,
            include: [Subject],
          },
        ],
      });

      res.json(classes);
    } catch (error) {
      console.error('Error getting classes:', error);
      res.status(500).json({ error: 'Server error' });
    }
  },

  // Get students in a class
  getStudents: async (req, res) => {
    try {
      const { classId } = req.params;
      
      const students = await User.findAll({
        where: { role: 'student' },
        include: [
          {
            model: AssignmentSubmission,
            include: [
              {
                model: Assignment,
                where: { class_id: classId },
              },
            ],
          },
        ],
      });

      res.json(students);
    } catch (error) {
      console.error('Error getting students:', error);
      res.status(500).json({ error: 'Server error' });
    }
  },

  // Create assignment
  createAssignment: async (req, res) => {
    try {
      const { class_id, subject_id, assignment_name, due_date } = req.body;

      const assignment = await Assignment.create({
        class_id,
        subject_id,
        assignment_name,
        due_date,
      });

      // Create submissions for all students in the class
      const students = await User.findAll({
        where: { role: 'student' },
      });

      for (const student of students) {
        await AssignmentSubmission.create({
          assignment_id: assignment.id,
          student_id: student.id,
          submission_status: 'pending',
        });
      }

      res.json({ message: 'Assignment created successfully', assignment });
    } catch (error) {
      console.error('Error creating assignment:', error);
      res.status(500).json({ error: 'Server error' });
    }
  },

  // Grade assignment
  gradeAssignment: async (req, res) => {
    try {
      const { submission_id, score } = req.body;

      await AssignmentSubmission.update(
        {
          assignment_score: score,
          submission_status: 'graded',
        },
        {
          where: { id: submission_id },
        }
      );

      res.json({ message: 'Assignment graded successfully' });
    } catch (error) {
      console.error('Error grading assignment:', error);
      res.status(500).json({ error: 'Server error' });
    }
  },

  // Get student analysis
  getStudentAnalysis: async (req, res) => {
    try {
      const { studentId } = req.params;

      const student = await User.findByPk(studentId, {
        include: [
          {
            model: AssignmentSubmission,
            include: [
              {
                model: Assignment,
                include: [Subject],
              },
            ],
          },
          {
            model: Attendance,
          },
        ],
      });

      const attendanceStats = student.Attendances.reduce((acc, record) => {
        acc[record.attendance_status] = (acc[record.attendance_status] || 0) + 1;
        return acc;
      }, {});

      const submissionStats = student.AssignmentSubmissions.reduce((acc, submission) => {
        acc[submission.submission_status] = (acc[submission.submission_status] || 0) + 1;
        return acc;
      }, {});

      res.json({
        student,
        attendanceStats,
        submissionStats,
      });
    } catch (error) {
      console.error('Error getting student analysis:', error);
      res.status(500).json({ error: 'Server error' });
    }
  },

  // Create exam
  createExam: async (req, res) => {
    try {
      const { class_id, subject_id, exam_name, exam_date } = req.body;

      const exam = await Exam.create({
        class_id,
        subject_id,
        exam_name,
        exam_date,
      });

      // Create exam results for all students in the class
      const students = await User.findAll({
        where: { role: 'student' },
      });

      for (const student of students) {
        await ExamResult.create({
          exam_id: exam.id,
          student_id: student.id,
        });
      }

      res.json({ message: 'Exam created successfully', exam });
    } catch (error) {
      console.error('Error creating exam:', error);
      res.status(500).json({ error: 'Server error' });
    }
  },

  // Grade exam
  gradeExam: async (req, res) => {
    try {
      const { result_id, score } = req.body;

      await ExamResult.update(
        { exam_score: score },
        { where: { id: result_id } }
      );

      res.json({ message: 'Exam graded successfully' });
    } catch (error) {
      console.error('Error grading exam:', error);
      res.status(500).json({ error: 'Server error' });
    }
  }
};

module.exports = teacherController;