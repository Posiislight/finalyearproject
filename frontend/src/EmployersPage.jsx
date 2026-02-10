import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const EmployersPage = () => {
  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white min-h-screen flex flex-col overflow-x-hidden">
      <Navbar />
      <main className="flex-grow flex flex-col items-center w-full">
        <section className="w-full px-4 py-12 md:py-20 flex justify-center bg-[url('https://placeholder.pics/svg/100x100/111621/1c212e')] bg-[length:40px_40px]">
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
                Hire the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-300">Best Talent</span>, Faster
              </h1>
              <p className="text-text-secondary text-lg md:text-xl max-w-2xl font-light">
                Stop sifting through irrelevant resumes. Our AI identifies the top 5% of candidates instantly, allowing you to focus on interviewing and closing.
              </p>
              <div className="flex flex-wrap gap-4 justify-center mt-4">
                <button className="h-12 px-8 rounded-full bg-primary hover:bg-primary-hover text-white font-bold text-base transition-all shadow-[0_0_20px_rgba(36,99,235,0.5)] flex items-center gap-2 group">
                  Start Hiring Free
                  <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </button>
                <button className="h-12 px-8 rounded-full bg-surface-dark border border-border-dark hover:border-primary/50 text-white font-bold text-base transition-colors flex items-center gap-2">
                  Request a Demo
                </button>
              </div>
            </div>
            <div className="w-full relative mt-8 group">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-primary/20 blur-[120px] rounded-full pointer-events-none"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 relative z-10">
                <div className="relative rounded-2xl overflow-hidden border border-border-dark bg-surface-dark shadow-2xl transform md:rotate-[-3deg] md:translate-x-4 hover:rotate-0 hover:translate-x-0 transition-all duration-500 hover:z-20 opacity-80 hover:opacity-100">
                  <div className="absolute top-4 left-4 z-20 bg-black/60 backdrop-blur px-3 py-1 rounded-lg text-xs font-mono text-white flex items-center gap-2 border border-white/10">
                    <span className="material-symbols-outlined text-[16px] text-primary">person</span> Candidate View
                  </div>
                  <div className="aspect-[4/3] w-full bg-cover bg-center" data-alt="Candidate working on laptop in a modern office" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBW0QcImoD1MbJKPKPzEARfx5NZ48k1ZRygslKCaoVwOeNZMggGahBvftjvbdaCmDd55OinYDoRT-ZO6zVsY0lUO1OwKanctIhHYbdZnZX01_LHQe4_xbqoVJJd_7_Hq1CwmdFujNQzbqTbNi1uUnze2ssG2JVsx6HKoks0ZCuE1MZOx8lClXBBG3Whd8bkCXP83cnFpCvbPmGQG35WMcIVwrMW9-_QdJ4-JUc7GUZpydWbAmsANsMLGGjXNIVvZQoBnU2OvfX9j14')" }}>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-6">
                      <div className="bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-xl">
                        <h3 className="text-white font-bold text-lg">Senior UX Designer</h3>
                        <p className="text-gray-300 text-sm">Active Job Seeker • 5 Yrs Exp</p>
                        <div className="flex gap-2 mt-4">
                          <div className="h-10 w-10 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center border border-red-500/30">
                            <span className="material-symbols-outlined">close</span>
                          </div>
                          <div className="flex-1"></div>
                          <div className="h-10 w-10 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center border border-green-500/30">
                            <span className="material-symbols-outlined">check</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col items-center justify-center pointer-events-none">
                  <div className="bg-primary text-white h-20 w-20 rounded-full flex items-center justify-center font-bold text-xl shadow-[0_0_30px_rgba(36,99,235,0.6)] border-4 border-background-dark animate-pulse">
                    Match!
                  </div>
                </div>
                <div className="relative rounded-2xl overflow-hidden border-2 border-primary/50 bg-surface-dark shadow-[0_0_40px_rgba(36,99,235,0.2)] transform md:rotate-[3deg] md:-translate-x-4 hover:rotate-0 hover:translate-x-0 transition-all duration-500 hover:z-20 z-10">
                  <div className="absolute top-4 right-4 z-20 bg-primary backdrop-blur px-3 py-1 rounded-lg text-xs font-mono text-white flex items-center gap-2 shadow-lg">
                    Recruiter Dashboard <span className="material-symbols-outlined text-[16px]">domain</span>
                  </div>
                  <div className="aspect-[4/3] w-full bg-surface-dark p-6 flex flex-col gap-4">
                    <div className="flex items-center justify-between border-b border-border-dark pb-4">
                      <div>
                        <h3 className="text-white font-bold">Candidates</h3>
                        <p className="text-xs text-text-secondary">AI Shortlisted</p>
                      </div>
                      <span className="bg-primary/20 text-primary text-xs px-2 py-1 rounded font-bold border border-primary/20">Top 5% Talent</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-background-dark border border-border-dark border-l-4 border-l-primary">
                      <div className="h-10 w-10 rounded-full bg-gray-700 bg-cover bg-center" data-alt="Profile picture of a candidate" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAy3rAxp2gf49BoO-JbPHzAPbcpPqInCk4noKzCMCUrqD0RZSWUH-d67FyJHuSWnIYQgJ1tvzOLbxPbgxUpJsi7V9kM6J-dTFM91m2bCNLVbgSiTAS3RXFOjHF12BjwxeyysmYGVI9048PmYRZhxiYObmL_5B_Xmc4HT_VCkBpG3pn-I02yL1P89-N-GX3-MotPtgBSl02UWs7IfIYcwafrn9CZxkA-MeBveTgeoUYn0s8fFkOy2Q-HG5hfwTl9KS3AChLSfYnTeos')" }}></div>
                      <div className="flex-1">
                        <div className="text-white text-sm font-bold">Sarah Jenkins</div>
                        <div className="text-xs text-text-secondary">Product Designer • 98% Match</div>
                      </div>
                      <button className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white">
                        <span className="material-symbols-outlined text-[16px]">add</span>
                      </button>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-background-dark border border-border-dark opacity-60">
                      <div className="h-10 w-10 rounded-full bg-gray-700 bg-cover bg-center" data-alt="Profile picture of a candidate" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBfZHKIfiCpcIQULqI8CsPuScubCGyAfB4JjMgLtDi00mCPDivicaJK34uw9Gan2RvemcCv34FmpQfj0rtSTNeJDx60LA5M1tXIXWTO7nxNVID7KJzjwKfsJcQBRxbexBbtcTyaONuBweY4ePdT1PzGqXFengwLzndN3ncbQkOit6mL9-wWHwBFBOOtLViQ-BJ6eVivxEgUcEffmml6lfYxIiXH8eK3GPVN1MUVssfZ9wpHAzle2eCEPFGHme9BX2EgYMA5yVVt35w')" }}></div>
                      <div className="flex-1">
                        <div className="text-white text-sm font-bold">David Chen</div>
                        <div className="text-xs text-text-secondary">Frontend Dev • 92% Match</div>
                      </div>
                      <button className="h-8 w-8 rounded-full bg-surface-dark border border-border-dark flex items-center justify-center text-white">
                        <span className="material-symbols-outlined text-[16px]">add</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full px-4 md:px-10 py-10 bg-background-dark border-y border-border-dark">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="flex flex-col p-4 rounded-xl bg-surface-dark border border-border-dark/50">
                <p className="text-text-secondary text-sm font-medium mb-1">Time to Hire</p>
                <div className="flex items-end gap-2">
                  <p className="text-white text-3xl font-bold">-50%</p>
                  <span className="text-emerald-500 text-xs font-bold mb-1 flex items-center">
                    <span className="material-symbols-outlined text-[14px]">arrow_downward</span> Faster
                  </span>
                </div>
              </div>
              <div className="flex flex-col p-4 rounded-xl bg-surface-dark border border-border-dark/50">
                <p className="text-text-secondary text-sm font-medium mb-1">Qualified Candidates</p>
                <div className="flex items-end gap-2">
                  <p className="text-white text-3xl font-bold">5x</p>
                  <span className="text-emerald-500 text-xs font-bold mb-1 flex items-center">
                    <span className="material-symbols-outlined text-[14px]">arrow_upward</span> Quality
                  </span>
                </div>
              </div>
              <div className="flex flex-col p-4 rounded-xl bg-surface-dark border border-border-dark/50">
                <p className="text-text-secondary text-sm font-medium mb-1">Cost Per Hire</p>
                <div className="flex items-end gap-2">
                  <p className="text-white text-3xl font-bold">-30%</p>
                  <span className="text-emerald-500 text-xs font-bold mb-1 flex items-center">
                    <span className="material-symbols-outlined text-[14px]">arrow_downward</span> Savings
                  </span>
                </div>
              </div>
              <div className="flex flex-col p-4 rounded-xl bg-surface-dark border border-border-dark/50">
                <p className="text-text-secondary text-sm font-medium mb-1">Admin Time Saved</p>
                <div className="flex items-end gap-2">
                  <p className="text-white text-3xl font-bold">20hrs</p>
                  <span className="text-emerald-500 text-xs font-bold mb-1 flex items-center">
                    <span className="material-symbols-outlined text-[14px]">bolt</span> Per Week
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full px-4 md:px-10 py-20 bg-background-dark relative overflow-hidden">
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
              <div className="group flex flex-col gap-6 rounded-2xl border border-border-dark bg-surface-dark p-8 hover:border-primary/50 transition-colors duration-300">
                <div className="h-14 w-14 rounded-xl bg-background-dark border border-border-dark flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <span className="material-symbols-outlined text-[32px]">workspace_premium</span>
                </div>
                <div className="flex flex-col gap-3">
                  <h4 className="text-white text-xl font-bold">AI Candidate Ranking</h4>
                  <p className="text-text-secondary leading-relaxed">
                    Our system automatically screens thousands of profiles to shortlist the top 5% talent that matches your specific job requirements perfectly.
                  </p>
                </div>
              </div>
              <div className="group flex flex-col gap-6 rounded-2xl border border-border-dark bg-surface-dark p-8 hover:border-primary/50 transition-colors duration-300">
                <div className="h-14 w-14 rounded-xl bg-background-dark border border-border-dark flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <span className="material-symbols-outlined text-[32px]">swipe_right</span>
                </div>
                <div className="flex flex-col gap-3">
                  <h4 className="text-white text-xl font-bold">Automated Screening</h4>
                  <p className="text-text-secondary leading-relaxed">
                    Review candidates with a simple swipe. The swipe-based review saves hours of manual resume reading, and our AI learns your preferences instantly.
                  </p>
                </div>
              </div>
              <div className="group flex flex-col gap-6 rounded-2xl border border-border-dark bg-surface-dark p-8 hover:border-primary/50 transition-colors duration-300">
                <div className="h-14 w-14 rounded-xl bg-background-dark border border-border-dark flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
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
        <section className="w-full px-4 md:px-10 py-20 border-t border-border-dark bg-[#0d1017]">
          <div className="max-w-7xl mx-auto flex flex-col gap-10 text-center">
            <p className="text-white/60 text-sm font-medium tracking-widest uppercase">Seamlessly integrates with your favorite ATS</p>
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-white text-3xl">hub</span>
                <span className="text-white font-bold text-xl tracking-tighter">HireSync</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-white text-3xl">all_inclusive</span>
                <span className="text-white font-bold text-xl tracking-tighter">TalentFlow</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-white text-3xl">api</span>
                <span className="text-white font-bold text-xl tracking-tighter">RecruitOS</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-white text-3xl">layers</span>
                <span className="text-white font-bold text-xl tracking-tighter">StaffStack</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-white text-3xl">polyline</span>
                <span className="text-white font-bold text-xl tracking-tighter">WorkNode</span>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full px-4 py-20 flex justify-center">
          <div className="max-w-5xl w-full bg-gradient-to-r from-primary to-blue-600 rounded-3xl p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-[url('https://placeholder.pics/svg/20')] opacity-10 mix-blend-overlay"></div>
            <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-white/20 rounded-full blur-3xl"></div>
            <div className="flex flex-col gap-4 relative z-10 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">Ready to transform your hiring?</h2>
              <p className="text-blue-100 text-lg max-w-md">Join over 10,000 companies using RecruitAI to build world-class teams.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 relative z-10 w-full md:w-auto">
              <button className="px-8 py-4 bg-white text-primary font-bold rounded-full hover:bg-gray-100 transition-colors shadow-lg w-full md:w-auto text-center">
                Start Hiring Free
              </button>
              <button className="px-8 py-4 bg-primary-dark/30 border border-white/20 text-white font-bold rounded-full hover:bg-white/10 transition-colors w-full md:w-auto text-center">
                Request a Demo
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
                The world's first AI-native recruitment platform designed for the modern tech workforce. Efficient, unbiased, and fast.
              </p>
              <div className="flex gap-4 mt-4">
                <a className="text-text-secondary hover:text-white transition-colors" href="#"><span className="material-symbols-outlined">thumb_up</span></a>
                <a className="text-text-secondary hover:text-white transition-colors" href="#"><span className="material-symbols-outlined">share</span></a>
                <a className="text-text-secondary hover:text-white transition-colors" href="#"><span className="material-symbols-outlined">mail</span></a>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="text-white font-bold text-sm uppercase tracking-wider">Product</h4>
              <Link to="/features" className="text-text-secondary hover:text-primary transition-colors text-sm">Features</Link>
              <a className="text-text-secondary hover:text-primary transition-colors text-sm" href="#">Pricing</a>
              <a className="text-text-secondary hover:text-primary transition-colors text-sm" href="#">Enterprise</a>
              <a className="text-text-secondary hover:text-primary transition-colors text-sm" href="#">Case Studies</a>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="text-white font-bold text-sm uppercase tracking-wider">Resources</h4>
              <a className="text-text-secondary hover:text-primary transition-colors text-sm" href="#">Blog</a>
              <a className="text-text-secondary hover:text-primary transition-colors text-sm" href="#">Community</a>
              <a className="text-text-secondary hover:text-primary transition-colors text-sm" href="#">Help Center</a>
              <a className="text-text-secondary hover:text-primary transition-colors text-sm" href="#">API Docs</a>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="text-white font-bold text-sm uppercase tracking-wider">Company</h4>
              <a className="text-text-secondary hover:text-primary transition-colors text-sm" href="#">About</a>
              <a className="text-text-secondary hover:text-primary transition-colors text-sm" href="#">Careers</a>
              <a className="text-text-secondary hover:text-primary transition-colors text-sm" href="#">Legal</a>
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

export default EmployersPage;
