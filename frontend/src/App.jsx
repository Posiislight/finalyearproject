import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import FeaturesPage from './FeaturesPage';
import CandidatesPage from './CandidatesPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/candidates" element={<CandidatesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
