import React from 'react';
import { Link } from 'react-router-dom';

const FeaturesPage = () => {
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
                            <Link to="/features" className="text-white text-sm font-bold transition-colors">Features</Link>
                            <Link to="/candidates" className="text-white/80 hover:text-white text-sm font-medium transition-colors">For Candidates</Link>
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
                    <div className="md:hidden text-white">
                        <span className="material-symbols-outlined">menu</span>
                    </div>
                </div>
            </header>
            <main className="flex-grow flex flex-col items-center w-full">
                <section className="w-full px-4 py-16 md:py-24 flex justify-center bg-[url('https://placeholder.pics/svg/100x100/111621/1c212e')] bg-[length:40px_40px] relative overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-full bg-primary/10 blur-[100px] pointer-events-none rounded-full"></div>
                    <div className="max-w-4xl w-full flex flex-col gap-8 items-center text-center z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-dark border border-border-dark text-text-secondary text-xs font-medium uppercase tracking-wider">
                            <span className="material-symbols-outlined text-primary text-sm">verified</span>
                            Powerful &amp; Scalable
                        </div>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight text-white drop-shadow-xl">
                            Platform <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-300">Capabilities</span>
                        </h1>
                        <p className="text-text-secondary text-lg md:text-xl max-w-2xl font-light leading-relaxed">
                            Explore the suite of intelligent tools designed to revolutionize how you connect with talent. From AI matching to real-time analytics, we've built the future of hiring.
                        </p>
                    </div>
                </section>
                <section className="w-full px-4 md:px-10 py-10 md:py-20 bg-background-dark relative">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                            <div className="group relative flex flex-col gap-6 rounded-3xl border border-border-dark bg-surface-dark p-8 md:p-10 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(36,99,235,0.1)] overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110 duration-500"></div>
                                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary/20 to-surface-dark border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-primary/10">
                                    <span className="material-symbols-outlined text-[36px]">psychology</span>
                                </div>
                                <div className="flex flex-col gap-3 relative z-10">
                                    <h3 className="text-white text-2xl font-bold">AI Matching Engine</h3>
                                    <p className="text-text-secondary text-base md:text-lg leading-relaxed">
                                        Our proprietary deep-learning algorithm analyzes thousands of data points to connect candidates and employers with unprecedented accuracy. It goes beyond keywords to understand intent, culture fit, and long-term potential.
                                    </p>
                                </div>
                                <div className="mt-auto pt-4 flex items-center text-primary font-bold text-sm uppercase tracking-wider group-hover:gap-2 transition-all">
                                    Learn more <span className="material-symbols-outlined text-base ml-1">arrow_forward</span>
                                </div>
                            </div>
                            <div className="group relative flex flex-col gap-6 rounded-3xl border border-border-dark bg-surface-dark p-8 md:p-10 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(36,99,235,0.1)] overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400/5 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110 duration-500"></div>
                                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-400/20 to-surface-dark border border-blue-400/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-blue-400/10">
                                    <span className="material-symbols-outlined text-[36px]">swipe_right</span>
                                </div>
                                <div className="flex flex-col gap-3 relative z-10">
                                    <h3 className="text-white text-2xl font-bold">Smart Swipe Mechanics</h3>
                                    <p className="text-text-secondary text-base md:text-lg leading-relaxed">
                                        Intuitive gesture-based interface makes reviewing candidates and jobs as easy as a swipe. This frictionless interaction speeds up the shortlisting process by 4x compared to traditional platforms, keeping engagement high.
                                    </p>
                                </div>
                                <div className="mt-auto pt-4 flex items-center text-blue-400 font-bold text-sm uppercase tracking-wider group-hover:gap-2 transition-all">
                                    See demo <span className="material-symbols-outlined text-base ml-1">play_circle</span>
                                </div>
                            </div>
                            <div className="group relative flex flex-col gap-6 rounded-3xl border border-border-dark bg-surface-dark p-8 md:p-10 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(36,99,235,0.1)] overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110 duration-500"></div>
                                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-surface-dark border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-indigo-500/10">
                                    <span className="material-symbols-outlined text-[36px]">document_scanner</span>
                                </div>
                                <div className="flex flex-col gap-3 relative z-10">
                                    <h3 className="text-white text-2xl font-bold">Automated Resume Parsing</h3>
                                    <p className="text-text-secondary text-base md:text-lg leading-relaxed">
                                        Instantly extract skills, experience, and education from any resume format (PDF, DOCX). Our parser standardizes unstructured data into a comparable format, enabling bias-free filtering and effortless sorting.
                                    </p>
                                </div>
                                <div className="mt-auto pt-4 flex items-center text-indigo-400 font-bold text-sm uppercase tracking-wider group-hover:gap-2 transition-all">
                                    View specs <span class="material-symbols-outlined text-base ml-1">description</span>
                                </div>
                            </div>
                            <div className="group relative flex flex-col gap-6 rounded-3xl border border-border-dark bg-surface-dark p-8 md:p-10 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(36,99,235,0.1)] overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110 duration-500"></div>
                                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-surface-dark border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-emerald-500/10">
                                    <span className="material-symbols-outlined text-[36px]">monitoring</span>
                                </div>
                                <div className="flex flex-col gap-3 relative z-10">
                                    <h3 className="text-white text-2xl font-bold">Real-time Analytics</h3>
                                    <p className="text-text-secondary text-base md:text-lg leading-relaxed">
                                        Gain deep insights into your recruitment pipeline with live dashboards. Track engagement rates, time-to-hire, diversity metrics, and funnel conversion performance to continuously optimize your hiring strategy.
                                    </p>
                                </div>
                                <div className="mt-auto pt-4 flex items-center text-emerald-400 font-bold text-sm uppercase tracking-wider group-hover:gap-2 transition-all">
                                    Explore data <span class="material-symbols-outlined text-base ml-1">bar_chart</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="w-full px-4 py-20 flex justify-center bg-background-dark border-t border-border-dark">
                    <div className="max-w-5xl w-full bg-surface-dark border border-border-dark rounded-[2rem] p-8 md:p-16 flex flex-col items-center justify-center gap-8 relative overflow-hidden shadow-2xl text-center">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background-dark/0 to-background-dark/0 pointer-events-none"></div>
                        <div className="flex flex-col gap-6 relative z-10 max-w-2xl">
                            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">Experience it for yourself</h2>
                            <p className="text-text-secondary text-lg">
                                Join thousands of companies leveraging our AI to build world-class teams. Start your free trial today and see the difference.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 relative z-10 w-full justify-center">
                            <button className="px-10 py-4 bg-primary text-white font-bold text-lg rounded-full hover:bg-primary-hover transition-all shadow-[0_0_20px_rgba(36,99,235,0.4)] w-full sm:w-auto flex items-center justify-center gap-2 group">
                                Sign Up Now
                                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                            </button>
                            <button className="px-10 py-4 bg-transparent border border-border-dark text-white font-bold text-lg rounded-full hover:bg-white/5 transition-colors w-full sm:w-auto">
                                Talk to Sales
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
                                <a className="text-text-secondary hover:text-white transition-colors" href="#"><span class="material-symbols-outlined">share</span></a>
                                <a className="text-text-secondary hover:text-white transition-colors" href="#"><span class="material-symbols-outlined">mail</span></a>
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

export default FeaturesPage;
