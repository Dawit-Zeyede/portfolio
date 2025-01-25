import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getJobApplications } from '../services/jobService';

const JobApplications = () => {
  const { jobId } = useParams();
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await getJobApplications(jobId);
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
    <div>
      {loading ? (
        <p>Loading applications...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <>
          <h2>Applications for Job #{jobId}</h2>
          {applications.length === 0 ? (
            <p>No applications yet.</p>
          ) : (
            <ul>
              {applications.map((app, index) => (
                <li key={index}>
                  <h4>{app.user.name}</h4>
                  <p>Status: {app.status}</p>
                  <p>Applied on: {new Date(app.createdAt).toLocaleDateString()}</p>
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
