-- Create and setup student_system database with sample data
DROP DATABASE IF EXISTS student_system;
CREATE DATABASE student_system;
USE student_system;

-- 1. Users table (updated with email field)
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('admin', 'teacher', 'student') NOT NULL
);

-- 2. Grades table
CREATE TABLE grades (
  id INT AUTO_INCREMENT PRIMARY KEY,
  grade_level INT NOT NULL UNIQUE
);

-- 3. Subjects table
CREATE TABLE subjects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  subject_name VARCHAR(100) NOT NULL UNIQUE
);

-- 4. Classes table
CREATE TABLE classes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  grade_id INT NOT NULL,
  class_name VARCHAR(10) NOT NULL,
  FOREIGN KEY (grade_id) REFERENCES grades(id) ON DELETE CASCADE
);

-- 5. Class Teachers table
CREATE TABLE class_teachers (
  class_id INT NOT NULL,
  teacher_id INT NOT NULL,
  PRIMARY KEY (class_id, teacher_id),
  FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE,
  FOREIGN KEY (teacher_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 6. Enrollment table
CREATE TABLE enrollment (
  student_id INT NOT NULL,
  class_id INT NOT NULL,
  PRIMARY KEY (student_id, class_id),
  FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE
);

-- 7. Assignments table
CREATE TABLE assignments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  class_id INT NOT NULL,
  subject_id INT NOT NULL,
  assignment_name VARCHAR(255) NOT NULL,
  due_date DATE NOT NULL,
  FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE,
  FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE
);

-- 8. Assignment Submissions table
CREATE TABLE assignment_submissions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  assignment_id INT NOT NULL,
  student_id INT NOT NULL,
  submission_date DATE DEFAULT NULL,
  submission_status ENUM('pending', 'submitted', 'graded') NOT NULL DEFAULT 'pending',
  assignment_score INT DEFAULT NULL CHECK (assignment_score BETWEEN 0 AND 100),
  UNIQUE (assignment_id, student_id),
  FOREIGN KEY (assignment_id) REFERENCES assignments(id) ON DELETE CASCADE,
  FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 9. Exams table
CREATE TABLE exams (
  id INT AUTO_INCREMENT PRIMARY KEY,
  class_id INT NOT NULL,
  subject_id INT NOT NULL,
  exam_name VARCHAR(255) NOT NULL,
  exam_date DATE NOT NULL,
  FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE,
  FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE
);

-- 10. Exam Results table
CREATE TABLE exam_results (
  id INT AUTO_INCREMENT PRIMARY KEY,
  exam_id INT NOT NULL,
  student_id INT NOT NULL,
  exam_score INT DEFAULT NULL CHECK (exam_score BETWEEN 0 AND 100),
  UNIQUE (exam_id, student_id),
  FOREIGN KEY (exam_id) REFERENCES exams(id) ON DELETE CASCADE,
  FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 11. Attendance table
CREATE TABLE attendance (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT NOT NULL,
  class_id INT NOT NULL,
  attendance_date DATE NOT NULL,
  attendance_status ENUM('present', 'absent', 'late', 'excused') NOT NULL DEFAULT 'present',
  FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE,
  UNIQUE (student_id, class_id, attendance_date)
);

-- ========================================
-- INSERT SAMPLE DATA
-- ========================================

-- Insert Grades
INSERT INTO grades (grade_level) VALUES 
(9), (10), (11), (12);

-- Insert Subjects
INSERT INTO subjects (subject_name) VALUES 
('Mathematics'),
('English'),
('Science'),
('History'),
('Physics'),
('Chemistry'),
('Biology'),
('Computer Science');

-- Insert Classes
INSERT INTO classes (grade_id, class_name) VALUES 
(1, '9A'), (1, '9B'),
(2, '10A'), (2, '10B'),
(3, '11A'), (3, '11B'),
(4, '12A'), (4, '12B');

-- Insert 1 Admin (password: 'password' hashed with bcrypt)
INSERT INTO users (first_name, last_name, email, password_hash, role) VALUES 
('John', 'Admin', 'admin@school.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin');

-- Insert 3 Teachers (password: 'password' hashed with bcrypt)
INSERT INTO users (first_name, last_name, email, password_hash, role) VALUES 
('Sarah', 'Johnson', 'sarah.johnson@school.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'teacher'),
('Michael', 'Brown', 'michael.brown@school.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'teacher'),
('Emily', 'Davis', 'emily.davis@school.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'teacher');

-- Insert 20 Students (password: 'password' hashed with bcrypt)
INSERT INTO users (first_name, last_name, email, password_hash, role) VALUES 
('Alice', 'Smith', 'alice.smith@student.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'student'),
('Bob', 'Wilson', 'bob.wilson@student.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'student'),
('Charlie', 'Miller', 'charlie.miller@student.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'student'),
('Diana', 'Garcia', 'diana.garcia@student.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'student'),
('Edward', 'Martinez', 'edward.martinez@student.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'student'),
('Fiona', 'Anderson', 'fiona.anderson@student.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'student'),
('George', 'Taylor', 'george.taylor@student.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'student'),
('Hannah', 'Thomas', 'hannah.thomas@student.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'student'),
('Ian', 'Jackson', 'ian.jackson@student.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'student'),
('Julia', 'White', 'julia.white@student.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'student'),
('Kevin', 'Harris', 'kevin.harris@student.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'student'),
('Lisa', 'Martin', 'lisa.martin@student.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'student'),
('Mark', 'Thompson', 'mark.thompson@student.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'student'),
('Nina', 'Garcia', 'nina.garcia@student.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'student'),
('Oscar', 'Martinez', 'oscar.martinez@student.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'student'),
('Paula', 'Robinson', 'paula.robinson@student.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'student'),
('Quinn', 'Clark', 'quinn.clark@student.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'student'),
('Rachel', 'Rodriguez', 'rachel.rodriguez@student.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'student'),
('Sam', 'Lewis', 'sam.lewis@student.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'student'),
('Tina', 'Lee', 'tina.lee@student.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'student');

-- Assign Teachers to Classes
INSERT INTO class_teachers (class_id, teacher_id) VALUES 
(1, 2), (2, 2), -- Sarah Johnson teaches 9A and 9B
(3, 3), (4, 3), -- Michael Brown teaches 10A and 10B
(5, 4), (6, 4), -- Emily Davis teaches 11A and 11B
(7, 2), (8, 3); -- Sarah and Michael also teach 12A and 12B

-- Enroll Students in Classes (distribute 20 students across 8 classes)
INSERT INTO enrollment (student_id, class_id) VALUES 
-- Class 9A (students 5-7)
(5, 1), (6, 1), (7, 1),
-- Class 9B (students 8-10)
(8, 2), (9, 2), (10, 2),
-- Class 10A (students 11-13)
(11, 3), (12, 3), (13, 3),
-- Class 10B (students 14-16)
(14, 4), (15, 4), (16, 4),
-- Class 11A (students 17-19)
(17, 5), (18, 5), (19, 5),
-- Class 11B (students 20-22)
(20, 6), (21, 6), (22, 6),
-- Class 12A (students 23-24)
(23, 7), (24, 7),
-- Class 12B (student 5 again for demo)
(5, 8);

-- Create some sample assignments
INSERT INTO assignments (class_id, subject_id, assignment_name, due_date) VALUES 
(1, 1, 'Algebra Homework 1', '2024-02-15'),
(1, 2, 'Essay Writing', '2024-02-20'),
(2, 1, 'Geometry Problems', '2024-02-18'),
(3, 3, 'Science Lab Report', '2024-02-25'),
(4, 4, 'History Research', '2024-03-01');

-- Create assignment submissions for students
INSERT INTO assignment_submissions (assignment_id, student_id, submission_status, assignment_score) VALUES 
-- Assignment 1 submissions
(1, 5, 'graded', 85),
(1, 6, 'graded', 92),
(1, 7, 'submitted', NULL),
-- Assignment 2 submissions
(2, 5, 'graded', 78),
(2, 6, 'pending', NULL),
(2, 7, 'graded', 88),
-- Assignment 3 submissions
(3, 8, 'graded', 90),
(3, 9, 'submitted', NULL),
(3, 10, 'graded', 76);

-- Create some sample exams
INSERT INTO exams (class_id, subject_id, exam_name, exam_date) VALUES 
(1, 1, 'Mid-term Math Exam', '2024-03-15'),
(2, 2, 'English Literature Test', '2024-03-20'),
(3, 3, 'Science Quiz', '2024-03-10');

-- Create exam results
INSERT INTO exam_results (exam_id, student_id, exam_score) VALUES 
(1, 5, 88),
(1, 6, 94),
(1, 7, 82),
(2, 8, 91),
(2, 9, 87),
(2, 10, 79),
(3, 11, 93),
(3, 12, 85),
(3, 13, 90);

-- Create attendance records (sample for last 30 days)
INSERT INTO attendance (student_id, class_id, attendance_date, attendance_status) VALUES 
-- Recent attendance for student 5 in class 1
(5, 1, '2024-01-15', 'present'),
(5, 1, '2024-01-16', 'present'),
(5, 1, '2024-01-17', 'late'),
(5, 1, '2024-01-18', 'present'),
(5, 1, '2024-01-19', 'absent'),
(5, 1, '2024-01-22', 'present'),
(5, 1, '2024-01-23', 'present'),
-- Recent attendance for student 6 in class 1
(6, 1, '2024-01-15', 'present'),
(6, 1, '2024-01-16', 'present'),
(6, 1, '2024-01-17', 'present'),
(6, 1, '2024-01-18', 'present'),
(6, 1, '2024-01-19', 'present'),
(6, 1, '2024-01-22', 'late'),
(6, 1, '2024-01-23', 'present'),
-- Recent attendance for student 8 in class 2
(8, 2, '2024-01-15', 'present'),
(8, 2, '2024-01-16', 'absent'),
(8, 2, '2024-01-17', 'present'),
(8, 2, '2024-01-18', 'present'),
(8, 2, '2024-01-19', 'present'),
(8, 2, '2024-01-22', 'present'),
(8, 2, '2024-01-23', 'present');

-- Display summary
SELECT 'Database setup completed successfully!' as Status;
SELECT 
  role,
  COUNT(*) as count
FROM users 
GROUP BY role;

SELECT 'Sample data created:' as Info;
SELECT 'Grades: 4, Subjects: 8, Classes: 8' as Details;
SELECT 'Users: 1 Admin, 3 Teachers, 20 Students' as User_Details;
SELECT 'Assignments: 5, Exams: 3' as More_Details;
SELECT 'Attendance records and submissions created' as Final_Details;

-- Show all user emails for login reference
SELECT 'LOGIN CREDENTIALS (password: "password" for all):' as Login_Info;
SELECT role, email, CONCAT(first_name, ' ', last_name) as full_name 
FROM users 
ORDER BY role, email;