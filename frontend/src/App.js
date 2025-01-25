import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/App.css';

// Layout Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';

// Authentication Context and Private Route
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';

// Public Pages
import Login from './pages/Login';
import Register from './pages/Register';

// Protected Pages
import Dashboard from './pages/Dashboard';
import Chat from './pages/Chat';

// Job-Related Components
import JobList from './components/JobList';
import CreateJob from './components/CreateJob';
import MatchingJobs from './components/MatchingJobs';
import JobDetails from './components/JobDetail';
import JobApplications from './components/JobApplications';

// Employer-Specific Components
import JobPosting from './components/EmployerPosting';
import JobApp from './components/EmployerApplications';
import SendMessage from './components/SendMessage';
function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Navbar />

          <div className="container mt-5">
            <ErrorBoundary>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route
                  path="/dashboard"
                  element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/chat"
                  element={
                    <PrivateRoute>
                      <Chat />
                    </PrivateRoute>
                  }
                />

                <Route
                  path="/jobs"
                  element={
                    <PrivateRoute>
                      <JobList />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/create-job"
                  element={
                    <PrivateRoute>
                      <CreateJob />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/match-jobs"
                  element={
                    <PrivateRoute>
                      <MatchingJobs />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/jobs/:jobId"
                  element={
                    <PrivateRoute>
                      <JobDetails />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/job/:jobId/applications"
                  element={
                    <PrivateRoute>
                      <JobApplications />
                    </PrivateRoute>
                  }
                />

                <Route
                  path="/employer/jobs"
                  element={
                    <PrivateRoute>
                      <JobPosting />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/employer/jobs/:jobId/applications"
                  element={
                    <PrivateRoute>
                      <JobApp />
                    </PrivateRoute>
                  }
                />
	  	<Route
                  path="/send-message/:studentId"
                  element={
                    <PrivateRoute>
                      <SendMessage />
                    </PrivateRoute>
                  }
                />
              </Routes>
            </ErrorBoundary>
          </div>

          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
