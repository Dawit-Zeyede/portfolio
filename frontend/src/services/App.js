import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/App.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Chat from './pages/Chat';
import JobApplications from './pages/JobApplications';

import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';

import JobList from './components/JobList';
import CreateJob from './components/CreateJob';
import MatchingJobs from './components/MatchingJobs';

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
