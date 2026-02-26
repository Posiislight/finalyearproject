import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import FeaturesPage from './FeaturesPage';
import CandidatesPage from './CandidatesPage';
import EmployersPage from './EmployersPage';
import SignUpPage from './SignUpPage';
import LoginPage from './LoginPage';
import EmployerVerification from './EmployerVerification';
import EmployerJobPost from './EmployerJobPost';
import CompanyInfo from './CompanyInfo';
import PlanSelection from './PlanSelection';
import EmployerDashboard from './EmployerDashboard';
import EmployerJobs from './EmployerJobs';
import EmployerCandidates from './EmployerCandidates';
import EmployerAnalytics from './EmployerAnalytics';
import EmployerCompanyProfile from './EmployerCompanyProfile';
import EmployerSettings from './EmployerSettings';
import JobSeekerHome from './JobSeekerHome';
import JobSeekerMatches from './JobSeekerMatches';
import JobSeekerApplications from './JobSeekerApplications';
import JobSeekerProfile from './JobSeekerProfile';
import JobSeekerSettings from './JobSeekerSettings';
import JobSeekerOnboarding from './JobSeekerOnboarding';
import JobDetailPage from './JobDetailPage';
import NotFoundPage from './NotFoundPage';
import MessagesPage from './MessagesPage';
import ForgotPasswordPage from './ForgotPasswordPage';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/candidates" element={<CandidatesPage />} />
        <Route path="/employers" element={<EmployersPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/company-info" element={<CompanyInfo />} />
        <Route path="/employer-verification" element={<EmployerVerification />} />
        <Route path="/employer-job-post" element={<EmployerJobPost />} />
        <Route path="/plan-selection" element={<PlanSelection />} />
        <Route path="/employer-dashboard" element={<ProtectedRoute allowedRole="employer"><EmployerDashboard /></ProtectedRoute>} />
        <Route path="/employer-jobs" element={<ProtectedRoute allowedRole="employer"><EmployerJobs /></ProtectedRoute>} />
        <Route path="/employer-candidates" element={<ProtectedRoute allowedRole="employer"><EmployerCandidates /></ProtectedRoute>} />
        <Route path="/employer-analytics" element={<ProtectedRoute allowedRole="employer"><EmployerAnalytics /></ProtectedRoute>} />
        <Route path="/employer-messages" element={<ProtectedRoute allowedRole="employer"><MessagesPage /></ProtectedRoute>} />
        <Route path="/employer-company-profile" element={<ProtectedRoute allowedRole="employer"><EmployerCompanyProfile /></ProtectedRoute>} />
        <Route path="/employer-settings" element={<ProtectedRoute allowedRole="employer"><EmployerSettings /></ProtectedRoute>} />
        <Route path="/jobseeker-onboarding" element={<ProtectedRoute allowedRole="job_seeker"><JobSeekerOnboarding /></ProtectedRoute>} />
        <Route path="/jobseeker-home" element={<ProtectedRoute allowedRole="job_seeker"><JobSeekerHome /></ProtectedRoute>} />
        <Route path="/jobseeker-matches" element={<ProtectedRoute allowedRole="job_seeker"><JobSeekerMatches /></ProtectedRoute>} />
        <Route path="/jobseeker-messages" element={<ProtectedRoute allowedRole="job_seeker"><MessagesPage /></ProtectedRoute>} />
        <Route path="/jobseeker-applications" element={<ProtectedRoute allowedRole="job_seeker"><JobSeekerApplications /></ProtectedRoute>} />
        <Route path="/jobseeker-profile" element={<ProtectedRoute allowedRole="job_seeker"><JobSeekerProfile /></ProtectedRoute>} />
        <Route path="/jobseeker-settings" element={<ProtectedRoute allowedRole="job_seeker"><JobSeekerSettings /></ProtectedRoute>} />
        <Route path="/job/:id" element={<JobDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
