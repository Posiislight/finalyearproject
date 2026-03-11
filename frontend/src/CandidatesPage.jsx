import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';



import CTASection from './components/CTASection';
import { Button, ArrowRight } from './components/ui/saa-s-template';

const MARKET_DEMAND_BY_RANGE = {
  '30d': {
    bars: [40, 60, 85, 50, 45],
    reactNativeDemand: 'High Demand',
    awsDemand: 'Growing',
  },
  '90d': {
    bars: [55, 70, 92, 64, 58],
    reactNativeDemand: 'Very High',
    awsDemand: 'High Demand',
  },
  '180d': {
    bars: [35, 52, 78, 68, 62],
    reactNativeDemand: 'Stable Demand',
    awsDemand: 'Strong Growth',
  },
};

const CandidatesPage = () => {
  const navigate = useNavigate();
  const [marketRange, setMarketRange] = useState('30d');
  const marketDemand = MARKET_DEMAND_BY_RANGE[marketRange];

  return (
    <>
        <section className="w-full px-4 py-12 md:py-20 flex justify-center bg-transparent">
          <div className="max-w-7xl w-full flex flex-col gap-12 items-center">
            <div className="text-center max-w-4xl flex flex-col gap-6 items-center z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Candidates First
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight text-white drop-shadow-xl">
                Find Your Next Role with a <span className="text-white">Swipe</span>
              </h1>
              <p className="text-text-secondary text-lg md:text-xl max-w-2xl font-light">
                Stop scrolling through endless job boards. Our AI matches your profile to the perfect roles instantly. Swipe right to apply, swipe left to pass.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4 relative z-10 mb-8 px-4 w-full sm:w-auto mt-4">
                <Link to="/signup" className="w-full sm:w-auto">
                  <Button
                    type="button"
                    variant="gradient"
                    size="lg"
                    className="rounded-full flex items-center justify-center w-full font-poppins shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                  >
                    Start Swiping
                    <ArrowRight size={16} />
                  </Button>
                </Link>
                <Link to="/signup" className="w-full sm:w-auto">
                  <Button
                    type="button"
                    variant="secondary"
                    size="lg"
                    className="rounded-full flex items-center justify-center w-full font-poppins border border-gray-700 hover:border-gray-500"
                  >
                    Upload Resume
                  </Button>
                </Link>
              </div>
            </div>

          </div>
        </section>
        
        <section className="w-full px-4 md:px-10 py-20 bg-transparent border-t border-white/10 overflow-hidden">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 relative">
            <div className="w-full md:w-1/2 flex flex-col gap-6 relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/30 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-wider w-fit">
                AI Resume Builder
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">Tailored Resume Optimization</h2>
              <p className="text-text-secondary text-lg leading-relaxed">
                Don't let the ATS block your dream job. Our AI scans your resume against thousands of job descriptions, highlighting key skills and formatting improvements to ensure you get noticed by recruiters.
              </p>
              <ul className="flex flex-col gap-4 mt-4">
                <li className="flex items-center gap-3 text-white">
                  <span className="material-symbols-outlined text-green-500">check_circle</span>
                  Keyword Optimization
                </li>
                <li className="flex items-center gap-3 text-white">
                  <span className="material-symbols-outlined text-green-500">check_circle</span>
                  Format Standardization
                </li>
                <li className="flex items-center gap-3 text-white">
                  <span className="material-symbols-outlined text-green-500">check_circle</span>
                  Impact-driven suggestions
                </li>
              </ul>
            </div>
            <div className="w-full md:w-1/2 relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/20 blur-[80px] rounded-full"></div>
              <div className="relative bg-black/60 backdrop-blur-lg border border-gray-800 rounded-xl p-6 shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500 w-3/4 mx-auto">
                <div className="flex justify-between items-center mb-6 border-b border-gray-800 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-gray-700 rounded-full"></div>
                    <div className="flex flex-col gap-1">
                      <div className="h-2 w-24 bg-gray-600 rounded"></div>
                      <div className="h-2 w-16 bg-gray-700 rounded"></div>
                    </div>
                  </div>
                  <div className="px-2 py-1 bg-green-500/20 text-green-400 text-xs font-bold rounded">ATS Score: 98</div>
                </div>
                <div className="space-y-4">
                  <div className="h-2 w-full bg-gray-700 rounded opacity-50"></div>
                  <div className="h-2 w-5/6 bg-gray-700 rounded opacity-50"></div>
                  <div className="h-2 w-4/6 bg-gray-700 rounded opacity-50"></div>
                </div>
                <div className="mt-6 p-3 bg-primary/10 border border-primary/30 rounded-lg relative">
                  <div className="absolute -top-2 -right-2 bg-primary text-white text-[10px] px-2 py-0.5 rounded-full font-bold shadow-lg">AI ENHANCED</div>
                  <div className="flex gap-2 items-start">
                    <span className="material-symbols-outlined text-primary text-sm mt-0.5">auto_awesome</span>
                    <div className="space-y-2 w-full">
                      <div className="h-2 w-full bg-primary/40 rounded"></div>
                      <div className="h-2 w-3/4 bg-primary/40 rounded"></div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4 mt-6">
                  <div className="h-2 w-full bg-gray-700 rounded opacity-50"></div>
                  <div className="h-2 w-full bg-gray-700 rounded opacity-50"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full px-4 md:px-10 py-20 bg-transparent border-t border-white/10">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row-reverse items-center gap-16">
            <div className="w-full md:w-1/2 flex flex-col gap-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/30 border border-purple-500/30 text-purple-400 text-xs font-bold uppercase tracking-wider w-fit">
                Frictionless Apply
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">Swipe Right to Apply</h2>
              <p className="text-text-secondary text-lg leading-relaxed">
                Forget cover letters and repetitive forms. Once your profile is set, applying is as easy as a single gesture. We handle the submission directly to the hiring manager's dashboard.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="p-4 bg-black/60 backdrop-blur-lg rounded-xl border border-gray-800">
                  <h4 className="text-white font-bold mb-1">One-Click</h4>
                  <p className="text-sm text-text-secondary">No external portals</p>
                </div>
                <div className="p-4 bg-black/60 backdrop-blur-lg rounded-xl border border-gray-800">
                  <h4 className="text-white font-bold mb-1">Instant Status</h4>
                  <p className="text-sm text-text-secondary">Track in real-time</p>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 flex justify-center relative">
              <div className="relative w-64 h-80">
                <div className="absolute top-0 left-0 w-full h-full bg-black/60 backdrop-blur-lg border border-gray-800 rounded-2xl transform scale-90 translate-y-8 opacity-40 shadow-xl"></div>
                <div className="absolute top-0 left-0 w-full h-full bg-black/60 backdrop-blur-lg border border-gray-800 rounded-2xl transform scale-95 translate-y-4 opacity-70 shadow-xl"></div>
                <div className="absolute top-0 left-0 w-full h-full bg-black/60 backdrop-blur-lg border border-gray-800 rounded-2xl shadow-2xl p-4 flex flex-col justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-white/10 rounded-lg flex items-center justify-center text-xl">🦄</div>
                    <div>
                      <h4 className="text-white font-bold text-sm">Senior Dev</h4>
                      <p className="text-xs text-text-secondary">Unicorn Inc.</p>
                    </div>
                  </div>
                  <div className="space-y-2 my-2">
                    <div className="px-2 py-1 bg-white/5 rounded text-xs text-text-secondary inline-block">React</div>
                    <div className="px-2 py-1 bg-white/5 rounded text-xs text-text-secondary inline-block">Node.js</div>
                    <div className="px-2 py-1 bg-white/5 rounded text-xs text-text-secondary inline-block">$180k+</div>
                  </div>
                  <div className="flex gap-2 mt-auto">
                    <button
                      type="button"
                      onClick={() => navigate('/features')}
                      className="flex-1 py-2 rounded-lg border border-red-500/50 text-red-500 bg-red-500/10 text-xs font-bold hover:bg-red-500/20 transition-colors"
                    >
                      Pass
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate('/signup')}
                      className="flex-1 py-2 rounded-lg bg-primary text-white text-xs font-bold shadow-lg shadow-primary/30 hover:bg-blue-600 transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  <div className="absolute bottom-10 right-10 animate-bounce">
                    <div className="h-8 w-8 bg-white/20 rounded-full blur-sm"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full px-4 md:px-10 py-20 bg-transparent border-t border-white/10">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
            <div className="w-full md:w-1/2 flex flex-col gap-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/30 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider w-fit">
                Market Data
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">AI Career Insights</h2>
              <p className="text-text-secondary text-lg leading-relaxed">
                Make data-driven career moves. Our dashboard reveals your skills gaps, projects market demand for your role, and provides personalized salary benchmarks so you know your true worth.
              </p>
              <div className="flex gap-4 items-center mt-2">
                <Link className="text-primary font-bold hover:underline flex items-center gap-1" to="/login">
                  View Demo Dashboard <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <div className="bg-black/60 backdrop-blur-lg border border-gray-800 rounded-xl p-6 shadow-2xl">
                <div className="flex justify-between items-center mb-6">
                  <h4 className="text-white font-bold">Market Demand</h4>
                  <select
                    value={marketRange}
                    onChange={(e) => setMarketRange(e.target.value)}
                    className="bg-black/60 backdrop-blur-lg border-gray-800 text-xs text-text-secondary rounded"
                  >
                    <option value="30d">Last 30 Days</option>
                    <option value="90d">Last 90 Days</option>
                    <option value="180d">Last 180 Days</option>
                  </select>
                </div>
                <div className="flex items-end gap-3 h-32 mb-6">
                  <div className="w-1/5 bg-primary/20 rounded-t-lg relative group" style={{ height: `${marketDemand.bars[0]}%` }}>
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-lg border border-gray-800 p-1 rounded text-[10px] text-white hidden group-hover:block">Low</div>
                  </div>
                  <div className="w-1/5 bg-primary/40 rounded-t-lg" style={{ height: `${marketDemand.bars[1]}%` }}></div>
                  <div className="w-1/5 bg-primary rounded-t-lg relative" style={{ height: `${marketDemand.bars[2]}%` }}>
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 h-1 w-1 bg-white rounded-full"></div>
                  </div>
                  <div className="w-1/5 bg-primary/60 rounded-t-lg" style={{ height: `${marketDemand.bars[3]}%` }}></div>
                  <div className="w-1/5 bg-primary/30 rounded-t-lg" style={{ height: `${marketDemand.bars[4]}%` }}></div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-xs text-text-secondary mb-1">
                    <span>React Native</span>
                    <span className="text-white">{marketDemand.reactNativeDemand}</span>
                  </div>
                  <div className="w-full bg-black/60 backdrop-blur-lg rounded-full h-2">
                    <div className="bg-emerald-500 h-2 rounded-full w-[80%]"></div>
                  </div>
                  <div className="flex justify-between text-xs text-text-secondary mb-1 mt-2">
                    <span>AWS Deployment</span>
                    <span className="text-white">{marketDemand.awsDemand}</span>
                  </div>
                  <div className="w-full bg-black/60 backdrop-blur-lg rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full w-[45%]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <CTASection />
    </>
  );
};

export default CandidatesPage;
