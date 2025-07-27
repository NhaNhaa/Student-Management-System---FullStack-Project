import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Home, Users, User, LogOut } from 'lucide-react';

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
        <p className="text-blue-200">Administrator</p>
      </div>

      <nav>
        <ul className="sidebar-nav">
          <li>
            <Link 
              to="/admin" 
              className={isActive('/admin') ? 'active' : ''}
            >
              <Home className="w-5 h-5" />
              Dashboard
            </Link>
          </li>
          <li>
            <Link 
              to="/admin/users" 
              className={isActive('/admin/users') ? 'active' : ''}
            >
              <Users className="w-5 h-5" />
              Users
            </Link>
          </li>
          <li>
            <Link 
              to="/admin/profile" 
              className={isActive('/admin/profile') ? 'active' : ''}
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