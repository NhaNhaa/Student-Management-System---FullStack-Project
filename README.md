# **🎓 Student Management System**

## **📌 Overview**

The **Student Management System** is a full-stack web application designed for managing academic workflows with **Admin**, **Teacher**, and **Student** roles.
It enables user authentication, role-based dashboards, class management, assignment tracking, grading, and profile viewing — all integrated into a clean interface.

The system uses a modern tech stack with React, TailwindCSS, Node.js, Express, Sequelize (MySQL), and is hosted via Supabase.

---

## **📂 Features**

* **Authentication** – Login system with JWT token security
* **Admin Panel** – Manage users and roles
* **Teacher Dashboard** – View and manage classes, students, and assignments
* **Student Dashboard** – View enrolled subjects, grades, and profile
* **Assignment Management** – Assignments and submissions
* **Exam & Result Tracking** – Record and view exam results
* **Responsive UI** – Tailwind-based modern layout
* **Logging** – Centralized backend routing and middleware

---

## **🛠 Getting Started**

### **📌 Dependencies**

✅ Node.js & npm
✅ MySQL
✅ Supabase account (for hosting/backend env)
✅ Vite (for frontend dev server)

---

### **📥 Installation**

#### **1️⃣ Clone the Repository**

```bash
git clone https://github.com/NhaNhaa/Student-Management-System---FullStack-Project.git
cd Student-Management-System---FullStack-Project
```

#### **2️⃣ Install Dependencies**

```bash
# Frontend
cd src
npm install

# Backend
cd server
npm install
```

#### **3️⃣ Configure Environment**

Create a `.env` file in the root with the following:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=student_system
JWT_SECRET=your_jwt_secret
```

#### **4️⃣ Setup MySQL Database**

Make sure MySQL is running and create the database:

```sql
CREATE DATABASE student_system;
```

To auto-create tables and relationships:

```bash
node server/check-setup.js
```

---

### **🚀 Run the App**

#### **Backend**

```bash
cd server
npm run dev
```

#### **Frontend**

```bash
cd src
npm run dev
```

---

## **📁 Project Structure**

```student-management-system/
│
├── server/                      # 📦 Backend (Node.js + Express + Sequelize)
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── adminController.js
│   │   ├── authController.js
│   │   ├── studentController.js
│   │   └── teacherController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── Assignment.js
│   │   ├── AssignmentSubmission.js
│   │   ├── associations.js
│   │   ├── Attendance.js
│   │   ├── Class.js
│   │   ├── ClassTeacher.js
│   │   ├── Enrollment.js
│   │   ├── Exam.js
│   │   ├── ExamResult.js
│   │   ├── Grade.js
│   │   ├── Subject.js
│   │   └── User.js
│   ├── routes/
│   │   ├── admin.js
│   │   ├── auth.js
│   │   ├── student.js
│   │   └── teacher.js
│   ├── check-setup.js
│   ├── package-lock.json
│   ├── package.json
│   └── server.js
│
├── src/                         # 🎨 Frontend (React + TypeScript + Vite)
│   ├── components/
│   │   ├── Admin/
│   │   │   ├── AdminDashboard.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Profile.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── Users.tsx
│   │   ├── Student/
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Profile.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── StudentDashboard.tsx
│   │   │   └── Subjects.tsx
│   │   ├── Teacher/
│   │   │   ├── Classes.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Profile.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Students.tsx
│   │   │   └── TeacherDashboard.tsx
│   │   ├── Login.tsx
│   │   └── ProtectedRoute.tsx
│   ├── contexts/
│   │   └── AuthContext.tsx
│   ├── services/
│   │   └── authService.ts
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
│
├── supabase/                    # 🛢️ Database migration folder
│   └── migrations/
│       └── student_system.sql
│
├── .env                        # 🔐 Environment variables (not committed)
├── .gitignore                  # 🚫 Files/folders ignored by Git
├── index.html                  # 🧾 HTML template for React
├── eslint.config.js            # 🧼 ESLint config for code quality
├── postcss.config.js           # ⚙️ Tailwind/PostCSS config
├── tailwind.config.js          # 🎨 Tailwind utility config
├── vite.config.ts              # ⚙️ Vite frontend config
├── tsconfig.json               # 🔠 TypeScript global config
├── tsconfig.app.json           # 🔠 TS config for frontend
├── tsconfig.node.json          # 🔠 TS config for backend/node
├── package.json                # 📦 Frontend dependencies & scripts
└── package-lock.json           # 🔒 Dependency lock file
```

---

## **🎯 How to Use**

### 🔐 **Login**

Visit the login page and enter your credentials for either admin, teacher, or student.

### 📊 **Admin Features**

* View and manage all users
* Assign roles and privileges

### 🧑‍🏫 **Teacher Features**

* View assigned classes
* Manage students and assignments
* View and enter grades

### 👨‍🎓 **Student Features**

* View personal profile
* See enrolled classes
* Track grades and assignments

## **👨‍💻 Team Members**

* **Lim Panha**
* **Leng Sokpunleu**
* **Khorn Vannda**

---

## **📜 Version History**

🔹 **v1.0** (July 2025)

* Initial release
* Fully functional backend API
* Auth + Role-based routing
* Responsive dashboards for all roles

---

## **📌 Acknowledgments**

Special thanks to:

* [React Docs](https://reactjs.org)
* [Sequelize Docs](https://sequelize.org)
* [Supabase](https://supabase.com)
* [Tailwind CSS](https://tailwindcss.com)
* [MySQL](https://www.mysql.com)
