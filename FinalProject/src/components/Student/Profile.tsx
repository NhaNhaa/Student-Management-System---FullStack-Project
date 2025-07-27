import React from 'react';
import { User, Mail, Shield } from 'lucide-react';

interface ProfileProps {
  profile: any;
}

const Profile: React.FC<ProfileProps> = ({ profile }) => {
  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-blue-500">Loading profile...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="dashboard-header">
        <h1 className="dashboard-title">My Profile</h1>
      </div>

      <div className="max-w-2xl">
        <div className="card">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                {profile.first_name} {profile.last_name}
              </h2>
              <p className="text-gray-600">Student</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="w-4 h-4 inline mr-2" />
                  First Name
                </label>
                <input
                  type="text"
                  value={profile.first_name}
                  className="form-input"
                  disabled
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="w-4 h-4 inline mr-2" />
                  Last Name
                </label>
                <input
                  type="text"
                  value={profile.last_name}
                  className="form-input"
                  disabled
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="w-4 h-4 inline mr-2" />
                  Email
                </label>
                <input
                  type="email"
                  value={profile.email}
                  className="form-input"
                  disabled
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Shield className="w-4 h-4 inline mr-2" />
                  Role
                </label>
                <input
                  type="text"
                  value="Student"
                  className="form-input"
                  disabled
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;