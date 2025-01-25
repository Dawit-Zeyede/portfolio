import React, { useState } from 'react';
import { getMatchingJobs } from '../services/jobService';

const MatchingJobs = () => {
  const [skills, setSkills] = useState('');
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [matchingJobs, setMatchingJobs] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setMatchingJobs([]);

    const skillsArray = skills.split(',').map((skill) => skill.trim());

    try {
      const jobs = await getMatchingJobs({ skills: skillsArray, title, location });
      if (jobs.length === 0) {
        setError('No matching jobs found.');
      } else {
        setMatchingJobs(jobs);
      }
    } catch (error) {
      setError(error.message || 'Failed to fetch matching jobs.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Find Matching Jobs</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Skills (comma-separated):</label>
          <input
            type="text"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Location:</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Searching...' : 'Search Jobs'}
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && matchingJobs.length > 0 && (
        <div>
          <h3>Matching Jobs</h3>
          <ul>
            {matchingJobs.map((job) => (
              <li key={job._id}>
                <h4>{job.title}</h4>
                <p>{job.description}</p>
                <p>Location: {job.location}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MatchingJobs;
