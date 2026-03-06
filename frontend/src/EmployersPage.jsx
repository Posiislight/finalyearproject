import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { WebGLShader } from './components/ui/web-gl-shader';
import CTASection from './components/CTASection';

const EmployersPage = () => {
  return (
    <div className="bg-transparent font-display text-white min-h-screen flex flex-col overflow-x-hidden relative">
      <WebGLShader />
      <Navbar />
      <main className="flex-grow flex flex-col items-center w-full">
        <section className="w-full px-4 py-12 md:py-20 flex justify-center bg-transparent">
          <div className="max-w-7xl w-full flex flex-col gap-12 items-center">
            <div className="text-center max-w-4xl flex flex-col gap-6 items-center z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Intelligent Hiring Platform
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight text-white drop-shadow-xl">
                Hire the <span className="text-white">Best Talent</span>, Faster
              </h1>
              <p className="text-text-secondary text-lg md:text-xl max-w-2xl font-light">
                Stop sifting through irrelevant resumes. Our AI identifies the top 5% of candidates instantly, allowing you to focus on interviewing and closing.
              </p>
              <div className="flex flex-wrap gap-4 justify-center mt-4">
                <Link to="/signup" className="h-12 px-8 rounded-full bg-primary hover:bg-primary-hover text-white font-bold text-base transition-all shadow-[0_0_20px_rgba(36,99,235,0.5)] flex items-center gap-2 group">
                  Start Hiring Free
                  <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </Link>
                
              </div>
            </div>

          </div>
        </section>
        
        <section className="w-full px-4 md:px-10 py-20 bg-transparent border-t border-white/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="max-w-7xl mx-auto flex flex-col gap-16 relative z-10">
            <div className="flex flex-col md:flex-row gap-8 justify-between items-end border-b border-border-dark pb-8">
              <div className="max-w-2xl">
                <h2 className="text-primary font-bold tracking-widest uppercase text-sm mb-3">Recruiter Tools</h2>
                <h3 className="text-white text-3xl md:text-5xl font-bold leading-tight">Smart Recruitment</h3>
              </div>
              <p className="text-text-secondary text-base md:text-lg max-w-md pb-1">
                Our advanced algorithms ensure precision matching, saving you time and effort by filtering the noise.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="group flex flex-col gap-6 rounded-2xl border border-gray-800 bg-gray-900/40 backdrop-blur-sm p-8 hover:border-gray-600 transition-colors duration-300">
                <div className="h-12 w-12 rounded-xl bg-gray-800 border border-gray-700 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-colors duration-300">
                  <span className="material-symbols-outlined text-[32px]">workspace_premium</span>
                </div>
                <div className="flex flex-col gap-3">
                  <h4 className="text-white text-xl font-bold">AI Candidate Ranking</h4>
                  <p className="text-text-secondary leading-relaxed">
                    Our system automatically screens thousands of profiles to shortlist the top 5% talent that matches your specific job requirements perfectly.
                  </p>
                </div>
              </div>
              <div className="group flex flex-col gap-6 rounded-2xl border border-gray-800 bg-gray-900/40 backdrop-blur-sm p-8 hover:border-gray-600 transition-colors duration-300">
                <div className="h-12 w-12 rounded-xl bg-gray-800 border border-gray-700 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-colors duration-300">
                  <span className="material-symbols-outlined text-[32px]">swipe_right</span>
                </div>
                <div className="flex flex-col gap-3">
                  <h4 className="text-white text-xl font-bold">Automated Screening</h4>
                  <p className="text-text-secondary leading-relaxed">
                    Review candidates with a simple swipe. The swipe-based review saves hours of manual resume reading, and our AI learns your preferences instantly.
                  </p>
                </div>
              </div>
              <div className="group flex flex-col gap-6 rounded-2xl border border-gray-800 bg-gray-900/40 backdrop-blur-sm p-8 hover:border-gray-600 transition-colors duration-300">
                <div className="h-12 w-12 rounded-xl bg-gray-800 border border-gray-700 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-colors duration-300">
                  <span className="material-symbols-outlined text-[32px]">analytics</span>
                </div>
                <div className="flex flex-col gap-3">
                  <h4 className="text-white text-xl font-bold">Data-Driven Hiring</h4>
                  <p className="text-text-secondary leading-relaxed">
                    Gain full visibility into your pipeline. Our employer analytics dashboard tracks time-to-hire, source quality, and acceptance rates in real-time.
                  </p>
                  <div className="mt-2 w-full h-24 bg-background-dark rounded-lg border border-border-dark p-3 flex flex-col justify-between opacity-80 group-hover:opacity-100 transition-opacity">
                    <div className="flex justify-between items-center">
                      <div className="h-2 w-1/3 bg-gray-700 rounded-full"></div>
                      <div className="h-2 w-4 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="flex items-end gap-1 h-10">
                      <div className="w-1/5 bg-primary/30 h-[40%] rounded-t-sm"></div>
                      <div className="w-1/5 bg-primary/50 h-[60%] rounded-t-sm"></div>
                      <div className="w-1/5 bg-primary h-[80%] rounded-t-sm"></div>
                      <div className="w-1/5 bg-primary/80 h-[50%] rounded-t-sm"></div>
                      <div className="w-1/5 bg-primary/40 h-[30%] rounded-t-sm"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default EmployersPage;
