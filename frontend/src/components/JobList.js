import React, { useState, useEffect } from 'react';
import { getJobs, applyToJob } from '../services/jobService';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const jobList = await getJobs();
        if (Array.isArray(jobList)) {
          setJobs(jobList);
        } else {
          throw new Error('Unexpected data format from server.');
        }
      } catch (err) {
        setError(err.message || 'Failed to fetch jobs.');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const applyForJob = async (jobId) => {
    try {
      if (!user || user.role !== 'student') {
        alert('You must be logged in as a student to apply for jobs.');
        return;
      }
      await applyToJob(jobId);
      alert('Successfully applied for the job!');
    } catch (err) {
      setError(err.message || 'Failed to apply for the job.');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Job Listings</h2>

      {loading && (
        <p style={{ textAlign: 'center', color: '#666' }}>Loading jobs...</p>
      )}

      {error && (
        <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>
      )}

      {!loading && !error && jobs.length === 0 && (
        <p style={{ textAlign: 'center', color: '#666' }}>
          No jobs available at the moment.
        </p>
      )}

      {!loading && jobs.length > 0 && (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {jobs.map((job) => (
            <li
              key={job._id}
              style={{
                marginBottom: '20px',
                padding: '20px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
              }}
            >
              <h3 style={{ color: '#007bff', marginBottom: '10px' }}>{job.title}</h3>
              <p style={{ color: '#555', marginBottom: '10px' }}>{job.description}</p>
              <p style={{ color: '#888', marginBottom: '10px' }}>
                <strong>Location:</strong> {job.location}
              </p>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Link
                  to={`/jobs/${job._id}`}
                  style={{
                    textDecoration: 'none',
                    color: '#fff',
                    backgroundColor: '#007bff',
                    padding: '10px 15px',
                    borderRadius: '5px',
                    transition: 'background-color 0.3s',
                  }}
                  onMouseEnter={(e) => (e.target.style.backgroundColor = '#0056b3')}
                  onMouseLeave={(e) => (e.target.style.backgroundColor = '#007bff')}
                >
                  View Job
                </Link>

                {user && user.role === 'student' && (
                  <button
                    onClick={() => applyForJob(job._id)}
                    style={{
                      backgroundColor: '#28a745',
                      color: '#fff',
                      border: 'none',
                      padding: '10px 15px',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      transition: 'background-color 0.3s',
                    }}
                    onMouseEnter={(e) => (e.target.style.backgroundColor = '#218838')}
                    onMouseLeave={(e) => (e.target.style.backgroundColor = '#28a745')}
                  >
                    Apply for this job
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default JobList;
