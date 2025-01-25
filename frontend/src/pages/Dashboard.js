import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="dashboard-container">
      <h2 className="welcome-message">Welcome, {user?.name}</h2>
      <p className="email-info">Email: {user?.email}</p>

      {user?.role === 'student' && (
        <div className="role-section student-section">
          <h4 className="role-title">Student Dashboard</h4>
          <div className="list-group">
            <Link to="/jobs" className="list-group-item list-group-item-action job-link">
              View Job Listings
            </Link>
            <Link to="/match-jobs" className="list-group-item list-group-item-action job-link">
              Matching Jobs
            </Link>
          </div>
        </div>
      )}

      {user?.role === 'employer' && (
        <div className="role-section employer-section">
          <h4 className="role-title">Employer Dashboard</h4>
          <div className="list-group">
            <Link to="/create-job" className="list-group-item list-group-item-action create-job">
              Create a New Job
            </Link>
            <Link to="/employer/jobs" className="list-group-item list-group-item-action posted-jobs">
              Jobs Posted
            </Link>
          </div>
        </div>
      )}

      <button onClick={logout} className="btn-logout mt-4">
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
