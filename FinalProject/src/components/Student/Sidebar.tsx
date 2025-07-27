import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Home, BookOpen, User, LogOut } from 'lucide-react';

const Sidebar: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="sidebar">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
          <User className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-xl font-bold">
          {user?.first_name} {user?.last_name}
        </h2>
        <p className="text-blue-200">Student</p>
      </div>

      <nav>
        <ul className="sidebar-nav">
          <li>
            <Link 
              to="/student" 
              className={isActive('/student') ? 'active' : ''}
            >
              <Home className="w-5 h-5" />
              Dashboard
            </Link>
          </li>
          <li>
            <Link 
              to="/student/subjects" 
              className={isActive('/student/subjects') ? 'active' : ''}
            >
              <BookOpen className="w-5 h-5" />
              Subjects
            </Link>
          </li>
          <li>
            <Link 
              to="/student/profile" 
              className={isActive('/student/profile') ? 'active' : ''}
            >
              <User className="w-5 h-5" />
              Profile
            </Link>
          </li>
        </ul>
      </nav>

      <div className="mt-auto pt-8">
        <button
          onClick={logout}
          className="w-full flex items-center gap-2 text-white hover:bg-blue-800 p-3 rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;