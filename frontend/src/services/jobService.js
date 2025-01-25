import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const handleError = (error) => {
  if (error.response && error.response.data && error.response.data.message) {
    throw new Error(error.response.data.message);
  }
  throw new Error('An unexpected error occurred. Please try again.');
};

export const createJob = async ({ title, description, skills, location }) => {
  try {
    const response = await axios.post(
      `${API_URL}/jobs`,
      { title, description, skills, location },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const getJobs = async () => {
  try {
    const response = await axios.get(`${API_URL}/jobs`, { 
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data.jobs;
  } catch (error) {
    handleError(error);
  }
};

export const getMatchingJobs = async ({ skills, title, location }) => {
  try {
    const response = await axios.post(
      `${API_URL}/jobs/match`,
      { skills, title, location },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
    return response.data.matchingJobs;
  } catch (error) {
    handleError(error);
  }
};

export const applyToJob = async (jobId) => {
  try {
    const response = await axios.post(
      `${API_URL}/applications/${jobId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
    return response.data; 
  } catch (error) {
    handleError(error);
  }
};

export const getJobsByEmployer = async () => {
  try {
    const response = await axios.get(`${API_URL}/applications`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    const uniqueJobs = new Set();

    response.data.applications.forEach((application) => {
      const job = application.job;
      if (!uniqueJobs.has(job._id)) {
        uniqueJobs.add(job._id);
      }
    });

    const jobs = [...uniqueJobs].map((jobId) => {
      const jobData = response.data.applications.find((application) => application.job._id === jobId).job;
      return {
        _id: jobData._id,
        title: jobData.title,
        description: jobData.description,
        studentCount: response.data.applications.filter((application) => application.job._id === jobId).length,
      };
    });

    return jobs;
  } catch (error) {
    handleError(error);
  }
};

export const getJobApplicationsByJobId = async (jobId) => {
  try {
    const response = await axios.get(`${API_URL}/applications`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    const allApplications = response.data.applications || [];
    console.log('All Applications:', allApplications);

    const filteredApplications = allApplications.filter(
      (application) => application.job && application.job._id === jobId
    );

    console.log('Filtered Applications:', filteredApplications);

    return filteredApplications;
  } catch (error) {
    console.error('Failed to fetch applications:', error);
    throw error;
  }
};

export const sendMessageToStudent = async (studentId, message) => {
  try {
    const token = localStorage.getItem('token');

    const response = await axios.post(
      `${API_URL}/send-message/${studentId}`,
      { message },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    handleError(error);
  }
};

