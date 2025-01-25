import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getJobsByEmployer } from '../services/jobService';
import '../styles/EmployerJobPostings.css';

const EmployerJobPostings = () => {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch jobs posted by the employer
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await getJobsByEmployer();
        console.log('Fetched jobs:', data);
        setJobs(Array.isArray(data) ? data : data.jobs || []);
      } catch (err) {
        setError(err.message || 'Failed to load jobs.');
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  if (loading) return <p className="loading-message">Loading jobs...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="job-container">
      <h1 className="job-header">Your Posted Jobs</h1>
      {jobs.length === 0 ? (
        <p className="no-jobs-message">No jobs posted yet.</p>
      ) : (
        <ul className="job-list">
          {jobs.map((job) => (
            <li key={job._id} className="job-item">
              <h2 className="job-title">{job.title}</h2>
              <p className="job-description">{job.description}</p>
              <Link to={`/employer/jobs/${job._id}/applications`} className="btn btn-view-applications">
                View Applications
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EmployerJobPostings;
