import React, { useState } from 'react';

const LandingPage = () => {
    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white min-h-screen flex flex-col overflow-x-hidden">
            {/* TopNavBar */}
            <header className="w-full border-b border-solid border-border-dark bg-background-dark/80 backdrop-blur-md sticky top-0 z-50">
                <div className="px-4 md:px-10 py-4 max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3 text-white">
                        <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white">
                            <span className="material-symbols-outlined">smart_toy</span>
                        </div>
                        <h2 className="text-white text-xl font-bold leading-tight tracking-tight">RecruitAI</h2>
                    </div>
                    <div className="hidden md:flex flex-1 justify-end items-center gap-8">
                        <nav className="flex items-center gap-6">
                            <a className="text-white/80 hover:text-white text-sm font-medium transition-colors" href="#">Features</a>
                            <a className="text-white/80 hover:text-white text-sm font-medium transition-colors" href="#">For Candidates</a>
                            <a className="text-white/80 hover:text-white text-sm font-medium transition-colors" href="#">For Employers</a>
                            <a className="text-white/80 hover:text-white text-sm font-medium transition-colors" href="#">Pricing</a>
                        </nav>
                        <div className="flex gap-3">
                            <button className="flex items-center justify-center rounded-full h-10 px-5 bg-transparent border border-border-dark text-white text-sm font-bold hover:bg-surface-dark transition-colors">
                                Log In
                            </button>
                            <button className="flex items-center justify-center rounded-full h-10 px-5 bg-primary hover:bg-primary-hover text-white text-sm font-bold transition-colors shadow-[0_0_15px_rgba(36,99,235,0.4)]">
                                Get Started
                            </button>
                        </div>
                    </div>
                    {/* Mobile Menu Icon */}
                    <div className="md:hidden text-white">
                        <span className="material-symbols-outlined">menu</span>
                    </div>
                </div>
            </header>
            <main className="flex-grow flex flex-col items-center w-full">
                {/* HeroSection */}
                <section className="w-full px-4 py-12 md:py-20 flex justify-center bg-[url('https://placeholder.pics/svg/100x100/111621/1c212e')] bg-[length:40px_40px]">
                    <div className="max-w-7xl w-full flex flex-col gap-12 items-center">
                        {/* Text Content */}
                        <div className="text-center max-w-4xl flex flex-col gap-6 items-center z-10">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-2">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                                </span>
                                AI-Powered Matching
                            </div>
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight text-white drop-shadow-xl">
                                The Future of <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-300">Recruitment</span> is Here
                            </h1>
                            <p className="text-text-secondary text-lg md:text-xl max-w-2xl font-light">
                                Experience the first AI-powered swipe-based recruitment platform. Connecting talent with opportunity has never been faster.
                            </p>
                            <div className="flex flex-wrap gap-4 justify-center mt-4">
                                <button className="h-12 px-8 rounded-full bg-primary hover:bg-primary-hover text-white font-bold text-base transition-all shadow-[0_0_20px_rgba(36,99,235,0.5)] flex items-center gap-2 group">
                                    Find a Job
                                    <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                </button>
                                <button className="h-12 px-8 rounded-full bg-surface-dark border border-border-dark hover:border-primary/50 text-white font-bold text-base transition-colors flex items-center gap-2">
                                    Hire Talent
                                </button>
                            </div>
                        </div>
                        {/* Visual Split Content */}
                        <div className="w-full relative mt-8 group">
                            {/* Background Glow */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-primary/20 blur-[120px] rounded-full pointer-events-none"></div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 relative z-10">
                                {/* Left: Job Seeker View */}
                                <div className="relative rounded-2xl overflow-hidden border border-border-dark bg-surface-dark shadow-2xl transform md:rotate-[-3deg] md:translate-x-4 hover:rotate-0 hover:translate-x-0 transition-all duration-500 hover:z-20">
                                    <div className="absolute top-4 left-4 z-20 bg-black/60 backdrop-blur px-3 py-1 rounded-lg text-xs font-mono text-white flex items-center gap-2 border border-white/10">
                                        <span className="material-symbols-outlined text-[16px] text-primary">person</span> Job Seeker View
                                    </div>
                                    <div className="aspect-[4/3] w-full bg-cover bg-center" data-alt="Candidate working on laptop in a modern office" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBW0QcImoD1MbJKPKPzEARfx5NZ48k1ZRygslKCaoVwOeNZMggGahBvftjvbdaCmDd55OinYDoRT-ZO6zVsY0lUO1OwKanctIhHYbdZnZX01_LHQe4_xbqoVJJd_7_Hq1CwmdFujNQzbqTbNi1uUnze2ssG2JVsx6HKoks0ZCuE1MZOx8lClXBBG3Whd8bkCXP83cnFpCvbPmGQG35WMcIVwrMW9-_QdJ4-JUc7GUZpydWbAmsANsMLGGjXNIVvZQoBnU2OvfX9j14')" }}>
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-6">
                                            <div className="bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-xl">
                                                <h3 className="text-white font-bold text-lg">Senior UX Designer</h3>
                                                <p className="text-gray-300 text-sm">TechCorp Inc. • Remote</p>
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
                                {/* Center: Match Badge */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col items-center justify-center pointer-events-none">
                                    <div className="bg-primary text-white h-20 w-20 rounded-full flex items-center justify-center font-bold text-xl shadow-[0_0_30px_rgba(36,99,235,0.6)] border-4 border-background-dark animate-pulse">
                                        Match!
                                    </div>
                                </div>
                                {/* Right: Employer View */}
                                <div className="relative rounded-2xl overflow-hidden border border-border-dark bg-surface-dark shadow-2xl transform md:rotate-[3deg] md:-translate-x-4 hover:rotate-0 hover:translate-x-0 transition-all duration-500 hover:z-20">
                                    <div className="absolute top-4 right-4 z-20 bg-black/60 backdrop-blur px-3 py-1 rounded-lg text-xs font-mono text-white flex items-center gap-2 border border-white/10">
                                        Employer View <span className="material-symbols-outlined text-[16px] text-emerald-400">domain</span>
                                    </div>
                                    <div className="aspect-[4/3] w-full bg-surface-dark p-6 flex flex-col gap-4">
                                        <div className="flex items-center justify-between border-b border-border-dark pb-4">
                                            <div>
                                                <h3 className="text-white font-bold">Candidates</h3>
                                                <p className="text-xs text-text-secondary">AI Suggested</p>
                                            </div>
                                            <span className="bg-primary/20 text-primary text-xs px-2 py-1 rounded">Top 5%</span>
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
                {/* Stats Section */}
                <section className="w-full px-4 md:px-10 py-10 bg-background-dark border-y border-border-dark">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            <div className="flex flex-col p-4 rounded-xl bg-surface-dark border border-border-dark/50">
                                <p className="text-text-secondary text-sm font-medium mb-1">Matches Made</p>
                                <div className="flex items-end gap-2">
                                    <p className="text-white text-3xl font-bold">10k+</p>
                                    <span className="text-emerald-500 text-xs font-bold mb-1 flex items-center">
                                        <span className="material-symbols-outlined text-[14px]">arrow_upward</span> 12%
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col p-4 rounded-xl bg-surface-dark border border-border-dark/50">
                                <p className="text-text-secondary text-sm font-medium mb-1">Active Candidates</p>
                                <div className="flex items-end gap-2">
                                    <p className="text-white text-3xl font-bold">50k+</p>
                                    <span className="text-emerald-500 text-xs font-bold mb-1 flex items-center">
                                        <span className="material-symbols-outlined text-[14px]">arrow_upward</span> 25%
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col p-4 rounded-xl bg-surface-dark border border-border-dark/50">
                                <p className="text-text-secondary text-sm font-medium mb-1">Companies Hiring</p>
                                <div className="flex items-end gap-2">
                                    <p className="text-white text-3xl font-bold">500+</p>
                                    <span className="text-emerald-500 text-xs font-bold mb-1 flex items-center">
                                        <span className="material-symbols-outlined text-[14px]">arrow_upward</span> 10%
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col p-4 rounded-xl bg-surface-dark border border-border-dark/50">
                                <p className="text-text-secondary text-sm font-medium mb-1">Time Saved</p>
                                <div className="flex items-end gap-2">
                                    <p className="text-white text-3xl font-bold">40hrs</p>
                                    <span className="text-emerald-500 text-xs font-bold mb-1 flex items-center">
                                        <span className="material-symbols-outlined text-[14px]">arrow_upward</span> 15%
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Feature Section */}
                <section className="w-full px-4 md:px-10 py-20 bg-background-dark relative overflow-hidden">
                    {/* Decorative abstract element */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
                    <div className="max-w-7xl mx-auto flex flex-col gap-16 relative z-10">
                        {/* Section Header */}
                        <div className="flex flex-col md:flex-row gap-8 justify-between items-end border-b border-border-dark pb-8">
                            <div className="max-w-2xl">
                                <h2 className="text-primary font-bold tracking-widest uppercase text-sm mb-3">Tech-First Approach</h2>
                                <h3 className="text-white text-3xl md:text-5xl font-bold leading-tight">Powered by Intelligence</h3>
                            </div>
                            <p className="text-text-secondary text-base md:text-lg max-w-md pb-1">
                                Our advanced algorithms ensure precision matching, saving you time and effort by filtering the noise.
                            </p>
                        </div>
                        {/* Features Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Card 1 */}
                            <div className="group flex flex-col gap-6 rounded-2xl border border-border-dark bg-surface-dark p-8 hover:border-primary/50 transition-colors duration-300">
                                <div className="h-14 w-14 rounded-xl bg-background-dark border border-border-dark flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                    <span className="material-symbols-outlined text-[32px]">psychology</span>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <h4 className="text-white text-xl font-bold">Smart ATS Scoring</h4>
                                    <p className="text-text-secondary leading-relaxed">
                                        Instantly see how well a resume fits the job description with our automated scoring system that parses skills, experience, and keywords.
                                    </p>
                                </div>
                            </div>
                            {/* Card 2 */}
                            <div className="group flex flex-col gap-6 rounded-2xl border border-border-dark bg-surface-dark p-8 hover:border-primary/50 transition-colors duration-300">
                                <div className="h-14 w-14 rounded-xl bg-background-dark border border-border-dark flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                    <span className="material-symbols-outlined text-[32px]">track_changes</span>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <h4 className="text-white text-xl font-bold">95% Match Accuracy</h4>
                                    <p className="text-text-secondary leading-relaxed">
                                        Our AI learns your preferences over time to deliver highly relevant candidates, reducing the time-to-hire significantly.
                                    </p>
                                </div>
                            </div>
                            {/* Card 3 */}
                            <div className="group flex flex-col gap-6 rounded-2xl border border-border-dark bg-surface-dark p-8 hover:border-primary/50 transition-colors duration-300">
                                <div className="h-14 w-14 rounded-xl bg-background-dark border border-border-dark flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                    <span className="material-symbols-outlined text-[32px]">trending_up</span>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <h4 className="text-white text-xl font-bold">Real-time Analytics</h4>
                                    <p className="text-text-secondary leading-relaxed">
                                        Track application status, pipeline health, and engagement metrics with our comprehensive, real-time dashboard.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Testimonial / Logos Section */}
                <section className="w-full px-4 md:px-10 py-20 border-t border-border-dark bg-[#0d1017]">
                    <div className="max-w-7xl mx-auto flex flex-col gap-10 text-center">
                        <p className="text-white/60 text-sm font-medium tracking-widest uppercase">Trusted by innovative tech teams</p>
                        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                            {/* Logo 1: Hexagon/Abstract */}
                            <div className="flex items-center gap-2">
                                <div className="h-8 w-8 bg-white rounded-md transform rotate-45"></div>
                                <span className="text-white font-bold text-xl tracking-tighter">NEXUS</span>
                            </div>
                            {/* Logo 2: Circle */}
                            <div className="flex items-center gap-2">
                                <div className="h-8 w-8 border-4 border-white rounded-full"></div>
                                <span className="text-white font-bold text-xl tracking-tighter">ORBITAL</span>
                            </div>
                            {/* Logo 3: Triangle */}
                            <div className="flex items-center gap-2">
                                <div className="h-0 w-0 border-l-[16px] border-l-transparent border-b-[32px] border-b-white border-r-[16px] border-r-transparent"></div>
                                <span className="text-white font-bold text-xl tracking-tighter">APEX</span>
                            </div>
                            {/* Logo 4: Square Grid */}
                            <div className="flex items-center gap-2">
                                <div className="grid grid-cols-2 gap-1 h-8 w-8">
                                    <div className="bg-white rounded-sm"></div><div className="bg-white rounded-sm"></div>
                                    <div className="bg-white rounded-sm"></div><div className="bg-white rounded-sm"></div>
                                </div>
                                <span className="text-white font-bold text-xl tracking-tighter">GRIDLOCK</span>
                            </div>
                            {/* Logo 5: Wave */}
                            <div className="flex items-center gap-2">
                                <div className="h-8 w-8 flex items-center justify-center">
                                    <div className="w-full h-2 bg-white rounded-full transform -rotate-12"></div>
                                </div>
                                <span className="text-white font-bold text-xl tracking-tighter">FLUX</span>
                            </div>
                        </div>
                    </div>
                </section>
                {/* CTA Section */}
                <section className="w-full px-4 py-20 flex justify-center">
                    <div className="max-w-5xl w-full bg-gradient-to-r from-primary to-blue-600 rounded-3xl p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-2xl">
                        {/* Abstract patterns overlay */}
                        <div className="absolute inset-0 bg-[url('https://placeholder.pics/svg/20')] opacity-10 mix-blend-overlay"></div>
                        <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-white/20 rounded-full blur-3xl"></div>
                        <div className="flex flex-col gap-4 relative z-10 text-center md:text-left">
                            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">Ready to transform your hiring?</h2>
                            <p className="text-blue-100 text-lg max-w-md">Join over 10,000 companies and job seekers using RecruitAI today.</p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 relative z-10 w-full md:w-auto">
                            <button className="px-8 py-4 bg-white text-primary font-bold rounded-full hover:bg-gray-100 transition-colors shadow-lg w-full md:w-auto text-center">
                                Get Started Free
                            </button>
                            <button className="px-8 py-4 bg-primary-dark/30 border border-white/20 text-white font-bold rounded-full hover:bg-white/10 transition-colors w-full md:w-auto text-center">
                                Request Demo
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
                                <a className="text-text-secondary hover:text-white transition-colors" href="#"><span className="material-symbols-outlined">thumb_up</span></a> {/* Mocking social icons */}
                                <a class="text-text-secondary hover:text-white transition-colors" href="#"><span class="material-symbols-outlined">share</span></a>
                                <a class="text-text-secondary hover:text-white transition-colors" href="#"><span class="material-symbols-outlined">mail</span></a>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4">
                            <h4 className="text-white font-bold text-sm uppercase tracking-wider">Product</h4>
                            <a className="text-text-secondary hover:text-primary transition-colors text-sm" href="#">Features</a>
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

export default LandingPage;
