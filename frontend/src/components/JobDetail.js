import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/JobDetails.css';

const JobDetails = () => {
    const { jobId } = useParams();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchJobDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/jobs/${jobId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch job details');
                }
                const data = await response.json();
                setJob(data.job);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchJobDetails();
    }, [jobId]);

    if (loading) {
        return <p className="loading">Loading...</p>;
    }

    if (error) {
        return <p className="error">Error: {error}</p>;
    }

    return (
        <div className="job-details-container">
            {job ? (
                <>
                    <h1 className="job-title">{job.title}</h1>
                    <p className="job-description"><strong>Description:</strong> {job.description}</p>
                    <p className="job-location"><strong>Location:</strong> {job.location}</p>
                    <p className="job-skills"><strong>Skills:</strong> {job.skills.join(', ')}</p>
                    <p className="job-employer"><strong>Employer:</strong> {job.employer.name} ({job.employer.email})</p>
                    <p className="job-posted-on"><strong>Posted On:</strong> {new Date(job.createdAt).toLocaleDateString()}</p>
                </>
            ) : (
                <p className="not-found">Job not found</p>
            )}
        </div>
    );
};

export default JobDetails;
