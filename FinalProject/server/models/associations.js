const User = require('./User');
const Grade = require('./Grade');
const Subject = require('./Subject');
const Class = require('./Class');
const Assignment = require('./Assignment');
const AssignmentSubmission = require('./AssignmentSubmission');
const Attendance = require('./Attendance');
const ClassTeacher = require('./ClassTeacher');
const Enrollment = require('./Enrollment');
const Exam = require('./Exam');
const ExamResult = require('./ExamResult');

// Grade and Class associations
Grade.hasMany(Class, { foreignKey: 'grade_id' });
Class.belongsTo(Grade, { foreignKey: 'grade_id' });

// Class and Assignment associations
Class.hasMany(Assignment, { foreignKey: 'class_id' });
Assignment.belongsTo(Class, { foreignKey: 'class_id' });

// Subject and Assignment associations
Subject.hasMany(Assignment, { foreignKey: 'subject_id' });
Assignment.belongsTo(Subject, { foreignKey: 'subject_id' });

// Assignment and AssignmentSubmission associations
Assignment.hasMany(AssignmentSubmission, { foreignKey: 'assignment_id' });
AssignmentSubmission.belongsTo(Assignment, { foreignKey: 'assignment_id' });

// User and AssignmentSubmission associations
User.hasMany(AssignmentSubmission, { foreignKey: 'student_id' });
AssignmentSubmission.belongsTo(User, { foreignKey: 'student_id' });

// User and Attendance associations
User.hasMany(Attendance, { foreignKey: 'student_id' });
Attendance.belongsTo(User, { foreignKey: 'student_id' });

// Class and Attendance associations
Class.hasMany(Attendance, { foreignKey: 'class_id' });
Attendance.belongsTo(Class, { foreignKey: 'class_id' });

// Class Teacher associations (Many-to-Many)
User.belongsToMany(Class, { 
  through: ClassTeacher, 
  foreignKey: 'teacher_id',
  otherKey: 'class_id',
  as: 'TeachingClasses'
});
Class.belongsToMany(User, { 
  through: ClassTeacher, 
  foreignKey: 'class_id',
  otherKey: 'teacher_id',
  as: 'Teachers'
});

// Student Enrollment associations (Many-to-Many)
User.belongsToMany(Class, { 
  through: Enrollment, 
  foreignKey: 'student_id',
  otherKey: 'class_id',
  as: 'EnrolledClasses'
});
Class.belongsToMany(User, { 
  through: Enrollment, 
  foreignKey: 'class_id',
  otherKey: 'student_id',
  as: 'Students'
});

// Exam associations
Class.hasMany(Exam, { foreignKey: 'class_id' });
Exam.belongsTo(Class, { foreignKey: 'class_id' });

Subject.hasMany(Exam, { foreignKey: 'subject_id' });
Exam.belongsTo(Subject, { foreignKey: 'subject_id' });

// Exam Result associations
Exam.hasMany(ExamResult, { foreignKey: 'exam_id' });
ExamResult.belongsTo(Exam, { foreignKey: 'exam_id' });

User.hasMany(ExamResult, { foreignKey: 'student_id' });
ExamResult.belongsTo(User, { foreignKey: 'student_id' });

module.exports = {
  User,
  Grade,
  Subject,
  Class,
  Assignment,
  AssignmentSubmission,
  Attendance,
  ClassTeacher,
  Enrollment,
  Exam,
  ExamResult,
};