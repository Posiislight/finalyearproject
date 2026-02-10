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
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/candidates" element={<CandidatesPage />} />
        <Route path="/employers" element={<EmployersPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/company-info" element={<CompanyInfo />} />
        <Route path="/employer-verification" element={<EmployerVerification />} />
        <Route path="/employer-job-post" element={<EmployerJobPost />} />
        <Route path="/plan-selection" element={<PlanSelection />} />
        <Route path="/employer-dashboard" element={<EmployerDashboard />} />
        <Route path="/employer-jobs" element={<EmployerJobs />} />
        <Route path="/employer-candidates" element={<EmployerCandidates />} />
        <Route path="/employer-analytics" element={<EmployerAnalytics />} />
        <Route path="/employer-company-profile" element={<EmployerCompanyProfile />} />
        <Route path="/employer-settings" element={<EmployerSettings />} />
        <Route path="/jobseeker-home" element={<JobSeekerHome />} />
        <Route path="/jobseeker-matches" element={<JobSeekerMatches />} />
        <Route path="/jobseeker-applications" element={<JobSeekerApplications />} />
        <Route path="/jobseeker-profile" element={<JobSeekerProfile />} />
        <Route path="/jobseeker-settings" element={<JobSeekerSettings />} />
      </Routes>
    </Router>
  );
}

export default App;
