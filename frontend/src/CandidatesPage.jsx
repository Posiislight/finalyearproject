import React from 'react';
import { Link } from 'react-router-dom';

const CandidatesPage = () => {
  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white min-h-screen flex flex-col overflow-x-hidden">
      <header className="w-full border-b border-solid border-border-dark bg-background-dark/80 backdrop-blur-md sticky top-0 z-50">
        <div className="px-4 md:px-10 py-4 max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 text-white">
            <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white">
              <span className="material-symbols-outlined">smart_toy</span>
            </div>
            <h2 className="text-white text-xl font-bold leading-tight tracking-tight">RecruitAI</h2>
          </Link>
          <div className="hidden md:flex flex-1 justify-end items-center gap-8">
            <nav className="flex items-center gap-6">
              <Link to="/candidates" className="text-white text-sm font-medium transition-colors">For Candidates</Link>
              <a className="text-white/60 hover:text-white text-sm font-medium transition-colors" href="#">For Employers</a>
              <Link to="/features" className="text-white/60 hover:text-white text-sm font-medium transition-colors">Features</Link>
              <a className="text-white/60 hover:text-white text-sm font-medium transition-colors" href="#">Pricing</a>
            </nav>
            <div className="flex gap-3">
              <button className="flex items-center justify-center rounded-full h-10 px-5 bg-transparent border border-border-dark text-white text-sm font-bold hover:bg-surface-dark transition-colors">
                Log In
              </button>
              <button className="flex items-center justify-center rounded-full h-10 px-5 bg-primary hover:bg-primary-hover text-white text-sm font-bold transition-colors shadow-[0_0_15px_rgba(36,99,235,0.4)]">
                Sign Up Free
              </button>
            </div>
          </div>
          <div className="md:hidden text-white">
            <span className="material-symbols-outlined">menu</span>
          </div>
        </div>
      </header>
      <main className="flex-grow flex flex-col items-center w-full">
        <section className="w-full px-4 py-12 md:py-20 flex justify-center bg-[url('https://placeholder.pics/svg/100x100/111621/1c212e')] bg-[length:40px_40px]">
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
                Find Your Next Role with a <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-300">Swipe</span>
              </h1>
              <p className="text-text-secondary text-lg md:text-xl max-w-2xl font-light">
                Stop scrolling through endless job boards. Our AI matches your profile to the perfect roles instantly. Swipe right to apply, swipe left to pass.
              </p>
              <div className="flex flex-wrap gap-4 justify-center mt-4">
                <button className="h-12 px-8 rounded-full bg-primary hover:bg-primary-hover text-white font-bold text-base transition-all shadow-[0_0_20px_rgba(36,99,235,0.5)] flex items-center gap-2 group">
                  Start Swiping
                  <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </button>
                <button className="h-12 px-8 rounded-full bg-surface-dark border border-border-dark hover:border-primary/50 text-white font-bold text-base transition-colors flex items-center gap-2">
                  Upload Resume
                </button>
              </div>
            </div>
            <div className="w-full relative mt-8 group max-w-3xl">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-primary/20 blur-[120px] rounded-full pointer-events-none"></div>
              <div className="relative z-10 mx-auto">
                <div className="relative rounded-2xl overflow-hidden border border-border-dark bg-surface-dark shadow-2xl transition-all duration-500 hover:z-20 w-full max-w-lg mx-auto">
                  <div className="absolute top-4 left-4 z-20 bg-black/60 backdrop-blur px-3 py-1 rounded-lg text-xs font-mono text-white flex items-center gap-2 border border-white/10">
                    <span className="material-symbols-outlined text-[16px] text-primary">person</span> Your Feed
                  </div>
                  <div className="aspect-[4/3] w-full bg-cover bg-center" data-alt="Candidate working on laptop in a modern office" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBW0QcImoD1MbJKPKPzEARfx5NZ48k1ZRygslKCaoVwOeNZMggGahBvftjvbdaCmDd55OinYDoRT-ZO6zVsY0lUO1OwKanctIhHYbdZnZX01_LHQe4_xbqoVJJd_7_Hq1CwmdFujNQzbqTbNi1uUnze2ssG2JVsx6HKoks0ZCuE1MZOx8lClXBBG3Whd8bkCXP83cnFpCvbPmGQG35WMcIVwrMW9-_QdJ4-JUc7GUZpydWbAmsANsMLGGjXNIVvZQoBnU2OvfX9j14')" }}>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-6">
                      <div className="bg-surface-dark/90 backdrop-blur-md border border-white/10 p-5 rounded-2xl shadow-xl transform translate-y-2">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="text-white font-bold text-xl">Product Designer</h3>
                            <p className="text-blue-400 text-sm font-medium">Google • Remote</p>
                          </div>
                          <div className="px-2 py-1 bg-green-500/20 text-green-400 text-xs font-bold rounded border border-green-500/20">98% Match</div>
                        </div>
                        <p className="text-text-secondary text-sm mb-4 line-clamp-2">Leading the design system team for cloud products. Experience with Figma and React required.</p>
                        <div className="flex gap-4">
                          <div className="h-12 w-12 rounded-full bg-surface-dark text-red-500 flex items-center justify-center border border-border-dark hover:bg-red-500/10 transition-colors cursor-pointer">
                            <span className="material-symbols-outlined text-[24px]">close</span>
                          </div>
                          <div className="flex-1"></div>
                          <div className="h-12 w-12 rounded-full bg-primary text-white flex items-center justify-center shadow-lg hover:bg-primary-hover hover:scale-105 transition-all cursor-pointer">
                            <span className="material-symbols-outlined text-[24px]">favorite</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute top-1/2 -right-12 md:-right-24 -translate-y-1/2 hidden md:flex flex-col gap-3 opacity-60">
                  <div className="w-16 h-20 bg-surface-dark border border-border-dark rounded-lg rotate-12"></div>
                  <div className="w-16 h-20 bg-surface-dark border border-border-dark rounded-lg rotate-6"></div>
                </div>
                <div className="absolute top-1/2 -left-12 md:-left-24 -translate-y-1/2 hidden md:flex flex-col gap-3 opacity-60">
                  <div className="w-16 h-20 bg-surface-dark border border-border-dark rounded-lg -rotate-12"></div>
                  <div className="w-16 h-20 bg-surface-dark border border-border-dark rounded-lg -rotate-6"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full px-4 md:px-10 py-10 bg-background-dark border-y border-border-dark">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="flex flex-col p-4 rounded-xl bg-surface-dark border border-border-dark/50">
                <p className="text-text-secondary text-sm font-medium mb-1">Average Hike</p>
                <div className="flex items-end gap-2">
                  <p className="text-white text-3xl font-bold">35%</p>
                  <span className="text-emerald-500 text-xs font-bold mb-1 flex items-center">
                    <span className="material-symbols-outlined text-[14px]">trending_up</span>
                  </span>
                </div>
              </div>
              <div className="flex flex-col p-4 rounded-xl bg-surface-dark border border-border-dark/50">
                <p className="text-text-secondary text-sm font-medium mb-1">Active Roles</p>
                <div className="flex items-end gap-2">
                  <p className="text-white text-3xl font-bold">25k+</p>
                  <span className="text-primary text-xs font-bold mb-1 flex items-center">
                    New today
                  </span>
                </div>
              </div>
              <div className="flex flex-col p-4 rounded-xl bg-surface-dark border border-border-dark/50">
                <p className="text-text-secondary text-sm font-medium mb-1">Interview Rate</p>
                <div className="flex items-end gap-2">
                  <p className="text-white text-3xl font-bold">4x</p>
                  <span className="text-emerald-500 text-xs font-bold mb-1 flex items-center">
                    Higher
                  </span>
                </div>
              </div>
              <div className="flex flex-col p-4 rounded-xl bg-surface-dark border border-border-dark/50">
                <p className="text-text-secondary text-sm font-medium mb-1">Time to Offer</p>
                <div className="flex items-end gap-2">
                  <p className="text-white text-3xl font-bold">12d</p>
                  <span className="text-emerald-500 text-xs font-bold mb-1 flex items-center">
                    Fast
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full px-4 md:px-10 py-20 bg-surface-dark border-b border-border-dark overflow-hidden">
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
              <div className="relative bg-background-dark border border-border-dark rounded-xl p-6 shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500 w-3/4 mx-auto">
                <div className="flex justify-between items-center mb-6 border-b border-border-dark pb-4">
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
        <section className="w-full px-4 md:px-10 py-20 bg-background-dark border-b border-border-dark">
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
                <div className="p-4 bg-surface-dark rounded-xl border border-border-dark">
                  <h4 className="text-white font-bold mb-1">One-Click</h4>
                  <p className="text-sm text-text-secondary">No external portals</p>
                </div>
                <div className="p-4 bg-surface-dark rounded-xl border border-border-dark">
                  <h4 className="text-white font-bold mb-1">Instant Status</h4>
                  <p className="text-sm text-text-secondary">Track in real-time</p>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 flex justify-center relative">
              <div className="relative w-64 h-80">
                <div className="absolute top-0 left-0 w-full h-full bg-surface-dark border border-border-dark rounded-2xl transform scale-90 translate-y-8 opacity-40 shadow-xl"></div>
                <div className="absolute top-0 left-0 w-full h-full bg-surface-dark border border-border-dark rounded-2xl transform scale-95 translate-y-4 opacity-70 shadow-xl"></div>
                <div className="absolute top-0 left-0 w-full h-full bg-surface-dark border border-border-dark rounded-2xl shadow-2xl p-4 flex flex-col justify-between">
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
                    <button className="flex-1 py-2 rounded-lg border border-red-500/50 text-red-500 bg-red-500/10 text-xs font-bold">Pass</button>
                    <button className="flex-1 py-2 rounded-lg bg-primary text-white text-xs font-bold shadow-lg shadow-primary/30">Apply</button>
                  </div>
                  <div className="absolute bottom-10 right-10 animate-bounce">
                    <div className="h-8 w-8 bg-white/20 rounded-full blur-sm"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full px-4 md:px-10 py-20 bg-surface-dark border-b border-border-dark">
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
                <a className="text-primary font-bold hover:underline flex items-center gap-1" href="#">
                  View Demo Dashboard <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </a>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <div className="bg-background-dark border border-border-dark rounded-xl p-6 shadow-2xl">
                <div className="flex justify-between items-center mb-6">
                  <h4 className="text-white font-bold">Market Demand</h4>
                  <select className="bg-surface-dark border-border-dark text-xs text-text-secondary rounded">
                    <option>Last 30 Days</option>
                  </select>
                </div>
                <div className="flex items-end gap-3 h-32 mb-6">
                  <div className="w-1/5 bg-primary/20 h-[40%] rounded-t-lg relative group">
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-surface-dark border border-border-dark p-1 rounded text-[10px] text-white hidden group-hover:block">Low</div>
                  </div>
                  <div className="w-1/5 bg-primary/40 h-[60%] rounded-t-lg"></div>
                  <div className="w-1/5 bg-primary h-[85%] rounded-t-lg relative">
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 h-1 w-1 bg-white rounded-full"></div>
                  </div>
                  <div className="w-1/5 bg-primary/60 h-[50%] rounded-t-lg"></div>
                  <div className="w-1/5 bg-primary/30 h-[45%] rounded-t-lg"></div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-xs text-text-secondary mb-1">
                    <span>React Native</span>
                    <span className="text-white">High Demand</span>
                  </div>
                  <div className="w-full bg-surface-dark rounded-full h-2">
                    <div className="bg-emerald-500 h-2 rounded-full w-[80%]"></div>
                  </div>
                  <div className="flex justify-between text-xs text-text-secondary mb-1 mt-2">
                    <span>AWS Deployment</span>
                    <span className="text-white">Growing</span>
                  </div>
                  <div className="w-full bg-surface-dark rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full w-[45%]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full px-4 md:px-10 py-20 bg-background-dark">
          <div className="max-w-7xl mx-auto flex flex-col gap-12">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-4">Hired in Record Time</h2>
              <p className="text-text-secondary">Join thousands of candidates who found their dream job through RecruitAI.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-surface-dark p-8 rounded-2xl border border-border-dark flex flex-col gap-6 hover:border-primary/30 transition-colors">
                <div className="flex gap-1 text-yellow-500">
                  <span className="material-symbols-outlined text-[20px] fill-current">star</span>
                  <span className="material-symbols-outlined text-[20px] fill-current">star</span>
                  <span className="material-symbols-outlined text-[20px] fill-current">star</span>
                  <span className="material-symbols-outlined text-[20px] fill-current">star</span>
                  <span className="material-symbols-outlined text-[20px] fill-current">star</span>
                </div>
                <p className="text-white leading-relaxed">"I uploaded my resume and within 24 hours I had 5 matches that were exactly what I was looking for. No ghosting, just interviews."</p>
                <div className="flex items-center gap-4 mt-auto">
                  <div className="h-10 w-10 rounded-full bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBfZHKIfiCpcIQULqI8CsPuScubCGyAfB4JjMgLtDi00mCPDivicaJK34uw9Gan2RvemcCv34FmpQfj0rtSTNeJDx60LA5M1tXIXWTO7nxNVID7KJzjwKfsJcQBRxbexBbtcTyaONuBweY4ePdT1PzGqXFengwLzndN3ncbQkOit6mL9-wWHwBFBOOtLViQ-BJ6eVivxEgUcEffmml6lfYxIiXH8eK3GPVN1MUVssfZ9wpHAzle2eCEPFGHme9BX2EgYMA5yVVt35w')" }}></div>
                  <div>
                    <h5 className="text-white font-bold text-sm">David Chen</h5>
                    <p className="text-xs text-text-secondary">Hired at FintechCo</p>
                  </div>
                </div>
              </div>
              <div className="bg-surface-dark p-8 rounded-2xl border border-border-dark flex flex-col gap-6 hover:border-primary/30 transition-colors">
                <div className="flex gap-1 text-yellow-500">
                  <span className="material-symbols-outlined text-[20px] fill-current">star</span>
                  <span className="material-symbols-outlined text-[20px] fill-current">star</span>
                  <span className="material-symbols-outlined text-[20px] fill-current">star</span>
                  <span className="material-symbols-outlined text-[20px] fill-current">star</span>
                  <span className="material-symbols-outlined text-[20px] fill-current">star</span>
                </div>
                <p className="text-white leading-relaxed">"The swiping mechanism makes job hunting actually fun. The AI insights helped me realize I was underpaid by 20%."</p>
                <div className="flex items-center gap-4 mt-auto">
                  <div className="h-10 w-10 rounded-full bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAy3rAxp2gf49BoO-JbPHzAPbcpPqInCk4noKzCMCUrqD0RZSWUH-d67FyJHuSWnIYQgJ1tvzOLbxPbgxUpJsi7V9kM6J-dTFM91m2bCNLVbgSiTAS3RXFOjHF12BjwxeyysmYGVI9048PmYRZhxiYObmL_5B_Xmc4HT_VCkBpG3pn-I02yL1P89-N-GX3-MotPtgBSl02UWs7IfIYcwafrn9CZxkA-MeBveTgeoUYn0s8fFkOy2Q-HG5hfwTl9KS3AChLSfYnTeos')" }}></div>
                  <div>
                    <h5 className="text-white font-bold text-sm">Sarah Jenkins</h5>
                    <p className="text-xs text-text-secondary">Hired as Senior PM</p>
                  </div>
                </div>
              </div>
              <div className="bg-surface-dark p-8 rounded-2xl border border-border-dark flex flex-col gap-6 hover:border-primary/30 transition-colors">
                <div className="flex gap-1 text-yellow-500">
                  <span className="material-symbols-outlined text-[20px] fill-current">star</span>
                  <span className="material-symbols-outlined text-[20px] fill-current">star</span>
                  <span className="material-symbols-outlined text-[20px] fill-current">star</span>
                  <span className="material-symbols-outlined text-[20px] fill-current">star</span>
                  <span className="material-symbols-outlined text-[20px] fill-current">star_half</span>
                </div>
                <p className="text-white leading-relaxed">"Finally, a platform that understands technical skills. The resume optimizer suggested changes that instantly improved my callback rate."</p>
                <div className="flex items-center gap-4 mt-auto">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold">MJ</div>
                  <div>
                    <h5 className="text-white font-bold text-sm">Marcus Johnson</h5>
                    <p className="text-xs text-text-secondary">Hired at CloudSystems</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full px-4 py-20 flex justify-center bg-background-dark border-t border-border-dark">
          <div className="max-w-5xl w-full bg-gradient-to-r from-primary to-blue-600 rounded-3xl p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-[url('https://placeholder.pics/svg/20')] opacity-10 mix-blend-overlay"></div>
            <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-white/20 rounded-full blur-3xl"></div>
            <div className="flex flex-col gap-4 relative z-10 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">Ready to boost your career?</h2>
              <p className="text-blue-100 text-lg max-w-md">Create your profile in minutes and let the offers come to you.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 relative z-10 w-full md:w-auto">
              <button className="px-8 py-4 bg-white text-primary font-bold rounded-full hover:bg-gray-100 transition-colors shadow-lg w-full md:w-auto text-center">
                Get Started Free
              </button>
              <button className="px-8 py-4 bg-primary-dark/30 border border-white/20 text-white font-bold rounded-full hover:bg-white/10 transition-colors w-full md:w-auto text-center">
                Browse Jobs
              </button>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full bg-[#0b0e14] border-t border-border-dark pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 md:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 mb-16">
            <div className="col-span-2 lg:col-span-2 flex flex-col gap-4 pr-10">
              <div className="flex items-center gap-3 text-white mb-2">
                <div className="size-6 bg-primary rounded flex items-center justify-center text-white">
                  <span className="material-symbols-outlined text-[16px]">smart_toy</span>
                </div>
                <h2 className="text-lg font-bold">RecruitAI</h2>
              </div>
              <p className="text-text-secondary text-sm leading-relaxed max-w-xs">
                The AI-native career platform built for the modern candidate. Find jobs that match your skills, values, and salary expectations.
              </p>
              <div className="flex gap-4 mt-4">
                <a className="text-text-secondary hover:text-white transition-colors" href="#"><span className="material-symbols-outlined">thumb_up</span></a>
                <a className="text-text-secondary hover:text-white transition-colors" href="#"><span className="material-symbols-outlined">share</span></a>
                <a className="text-text-secondary hover:text-white transition-colors" href="#"><span className="material-symbols-outlined">mail</span></a>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="text-white font-bold text-sm uppercase tracking-wider">Candidates</h4>
              <a className="text-text-secondary hover:text-primary transition-colors text-sm" href="#">Search Jobs</a>
              <a className="text-text-secondary hover:text-primary transition-colors text-sm" href="#">Resume Builder</a>
              <a className="text-text-secondary hover:text-primary transition-colors text-sm" href="#">Salary Insights</a>
              <a className="text-text-secondary hover:text-primary transition-colors text-sm" href="#">Success Stories</a>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="text-white font-bold text-sm uppercase tracking-wider">Resources</h4>
              <a className="text-text-secondary hover:text-primary transition-colors text-sm" href="#">Career Blog</a>
              <a className="text-text-secondary hover:text-primary transition-colors text-sm" href="#">Interview Prep</a>
              <a className="text-text-secondary hover:text-primary transition-colors text-sm" href="#">Help Center</a>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="text-white font-bold text-sm uppercase tracking-wider">Company</h4>
              <a className="text-text-secondary hover:text-primary transition-colors text-sm" href="#">About Us</a>
              <a className="text-text-secondary hover:text-primary transition-colors text-sm" href="#">Careers</a>
              <a className="text-text-secondary hover:text-primary transition-colors text-sm" href="#">Privacy</a>
              <a className="text-text-secondary hover:text-primary transition-colors text-sm" href="#">Contact</a>
            </div>
          </div>
          <div className="border-t border-border-dark pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-text-secondary">
            <p>© 2023 RecruitAI Inc. All rights reserved.</p>
            <div className="flex gap-6">
              <a className="hover:text-white" href="#">Privacy Policy</a>
              <a className="hover:text-white" href="#">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CandidatesPage;
