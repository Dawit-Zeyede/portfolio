import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getJobApplicationsByJobId } from '../services/jobService';
import '../styles/EmployerApplications.css';

const EmployerApplications = () => {
  const { jobId } = useParams();
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const parsedJobId = jobId.startsWith(':') ? jobId.slice(1) : jobId;

    if (!parsedJobId) {
      setError('Job ID is missing. Please check the URL.');
      setLoading(false);
      return;
    }

    const fetchApplications = async () => {
      try {
        setLoading(true);
        const data = await getJobApplicationsByJobId(parsedJobId);

        if (Array.isArray(data)) {
          setApplications(data);
        } else {
          throw new Error('Invalid response format from the server.');
        }
      } catch (err) {
        setError(err.message || 'Failed to load applications. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [jobId]);

  if (loading) {
    return <p className="loading-message">Loading applications...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div className="application-container">
      <h1 className="job-header">Applications for Job #{jobId}</h1>
      {applications.length === 0 ? (
        <p className="no-applications-message">No applications for this job yet.</p>
      ) : (
        <ul className="applications-list">
          {applications.map((application) => (
            <li key={application._id} className="application-item">
              <p className="student-name">
                <strong>{application.student?.name || 'Unknown Student'}</strong>
              </p>
              <p className="student-email">
                {application.student?.email || 'No Email Provided'}
              </p>
              <p className="application-date">
                Applied on:{' '}
                {application.createdAt
                  ? new Date(application.createdAt).toLocaleDateString()
                  : 'Unknown Date'}
              </p>
              <Link
                to={`/send-message/${application.student?._id}`}
                className="send-dm-button"
              >
                Send DM
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EmployerApplications;
