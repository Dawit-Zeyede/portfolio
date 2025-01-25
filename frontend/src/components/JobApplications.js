import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getJobApplicationsByJobId } from '../services/jobService';
import '../styles/JobApplications.css';

const JobApplications = () => {
  const { jobId } = useParams();
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await getJobApplicationsByJobId(jobId);
        setApplications(response);
      } catch (error) {
        setError(error.message || 'Failed to fetch job applications.');
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, [jobId]);

  return (
    <div className="applications-container">
      {loading ? (
        <p className="loading-message">Loading applications...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <>
          <h2 className="applications-header">Applications for Job #{jobId}</h2>
          {applications.length === 0 ? (
            <p className="no-applications-message">No applications yet.</p>
          ) : (
            <ul className="applications-list">
              {applications.map((app) => (
                <li key={app._id} className="application-item">
                  <h4 className="applicant-name">{app.user.name}</h4>
                  <p className="application-status">Status: {app.status}</p>
                  <p className="application-date">
                    Applied on: {new Date(app.createdAt).toLocaleDateString()}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default JobApplications;
