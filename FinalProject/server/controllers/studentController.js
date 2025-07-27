const { User, Assignment, AssignmentSubmission, Attendance, Subject, Exam, ExamResult } = require('../models/associations');
const { Op } = require('sequelize');

const studentController = {
  // Get student profile
  getProfile: async (req, res) => {
    try {
      const student = await User.findByPk(req.user.id, {
        attributes: ['id', 'first_name', 'last_name', 'email'],
      });

      res.json(student);
    } catch (error) {
      console.error('Error getting student profile:', error);
      res.status(500).json({ error: 'Server error' });
    }
  },

  // Get attendance data
  getAttendance: async (req, res) => {
    try {
      const { period } = req.query;
      let startDate;
      const endDate = new Date();

      switch (period) {
        case 'week':
          startDate = new Date();
          startDate.setDate(startDate.getDate() - 7);
          break;
        case 'month':
          startDate = new Date();
          startDate.setMonth(startDate.getMonth() - 1);
          break;
        case 'year':
          startDate = new Date();
          startDate.setFullYear(startDate.getFullYear() - 1);
          break;
        default:
          startDate = new Date();
          startDate.setDate(startDate.getDate() - 7);
      }

      const attendance = await Attendance.findAll({
        where: {
          student_id: req.user.id,
          attendance_date: {
            [Op.between]: [startDate, endDate],
          },
        },
        order: [['attendance_date', 'DESC']],
      });

      const attendanceStats = attendance.reduce((acc, record) => {
        acc[record.attendance_status] = (acc[record.attendance_status] || 0) + 1;
        return acc;
      }, {});

      res.json({
        attendance,
        stats: attendanceStats,
      });
    } catch (error) {
      console.error('Error getting attendance:', error);
      res.status(500).json({ error: 'Server error' });
    }
  },

  // Get assignment submissions
  getAssignments: async (req, res) => {
    try {
      const submissions = await AssignmentSubmission.findAll({
        where: { student_id: req.user.id },
        include: [
          {
            model: Assignment,
            include: [Subject],
          },
        ],
      });

      const submissionStats = submissions.reduce((acc, submission) => {
        acc[submission.submission_status] = (acc[submission.submission_status] || 0) + 1;
        return acc;
      }, {});

      res.json({
        submissions,
        stats: submissionStats,
      });
    } catch (error) {
      console.error('Error getting assignments:', error);
      res.status(500).json({ error: 'Server error' });
    }
  },

  // Get subject scores
  getScores: async (req, res) => {
    try {
      const submissions = await AssignmentSubmission.findAll({
        where: {
          student_id: req.user.id,
          submission_status: 'graded',
          assignment_score: { [Op.not]: null },
        },
        include: [
          {
            model: Assignment,
            include: [Subject],
          },
        ],
      });

      const subjectScores = submissions.reduce((acc, submission) => {
        const subjectName = submission.Assignment.Subject.subject_name;
        if (!acc[subjectName]) {
          acc[subjectName] = { total: 0, count: 0 };
        }
        acc[subjectName].total += submission.assignment_score;
        acc[subjectName].count += 1;
        return acc;
      }, {});

      const averageScores = Object.keys(subjectScores).map(subject => ({
        subject,
        average: Math.round(subjectScores[subject].total / subjectScores[subject].count),
      }));

      res.json(averageScores);
    } catch (error) {
      console.error('Error getting scores:', error);
      res.status(500).json({ error: 'Server error' });
    }
  },

  // Get subjects with assignments
  getSubjects: async (req, res) => {
    try {
      const subjects = await Subject.findAll({
        include: [
          {
            model: Assignment,
            include: [
              {
                model: AssignmentSubmission,
                where: { student_id: req.user.id },
                required: false,
              },
            ],
          },
        ],
      });

      res.json(subjects);
    } catch (error) {
      console.error('Error getting subjects:', error);
      res.status(500).json({ error: 'Server error' });
    }
  },

  // Submit assignment
  submitAssignment: async (req, res) => {
    try {
      const { assignment_id } = req.body;

      const submission = await AssignmentSubmission.findOne({
        where: {
          assignment_id,
          student_id: req.user.id,
        },
      });

      if (submission) {
        await submission.update({
          submission_date: new Date(),
          submission_status: 'submitted',
        });
      }

      res.json({ message: 'Assignment submitted successfully' });
    } catch (error) {
      console.error('Error submitting assignment:', error);
      res.status(500).json({ error: 'Server error' });
    }
  },

  // Get exams
  getExams: async (req, res) => {
    try {
      const exams = await Exam.findAll({
        include: [
          {
            model: Subject,
          },
          {
            model: ExamResult,
            where: { student_id: req.user.id },
            required: false,
          },
        ],
      });

      res.json(exams);
    } catch (error) {
      console.error('Error getting exams:', error);
      res.status(500).json({ error: 'Server error' });
    }
  }
};

module.exports = studentController;