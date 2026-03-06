import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { Button, ArrowRight } from './components/ui/saa-s-template';
import { WebGLShader } from './components/ui/web-gl-shader';
import CTASection from './components/CTASection';

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="font-display text-white min-h-screen flex flex-col overflow-x-hidden relative bg-transparent">
            {/* WebGL Shader Background */}
            <WebGLShader />
            
            <Navbar />
            
            <main className="flex-grow flex flex-col items-center w-full">
                {/* Hero Section */}
                <section 
                    className="relative w-full min-h-screen flex flex-col items-center justify-center px-6 pb-20"
                    style={{ animation: "fadeIn 0.6s ease-out" }}
                >
                    <style>{`
                        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
                        .font-poppins { font-family: 'Poppins', sans-serif; }
                    `}</style>
                    
                    <aside className="mb-8 inline-flex flex-wrap items-center justify-center gap-2 px-4 py-2 rounded-full border border-gray-800 bg-gray-900/50 backdrop-blur-sm max-w-full animate-slide-down">
                        <span className="relative flex h-2 w-2 mr-1">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                        </span>
                        <span className="text-xs text-center whitespace-nowrap text-gray-300 font-poppins">
                            AI-Powered Matching
                        </span>
                        <Link
                            to="/features"
                            className="flex items-center gap-1 text-xs hover:text-white transition-all active:scale-95 whitespace-nowrap text-gray-400 font-poppins ml-2"
                        >
                            Read more
                            <ArrowRight size={12} />
                        </Link>
                    </aside>

                    <h1
                        className="text-5xl md:text-6xl lg:text-7xl font-semibold text-center max-w-4xl px-6 leading-tight mb-6 font-poppins drop-shadow-2xl"
                        style={{
                            background: "linear-gradient(to bottom, #ffffff, #ffffff, rgba(255, 255, 255, 0.7))",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                            letterSpacing: "-0.04em"
                        }}
                    >
                        The Future of <br className="hidden md:block" /> Recruitment is Here
                    </h1>

                    <p className="text-base md:text-lg text-center max-w-2xl px-6 mb-10 text-gray-400 font-poppins font-light">
                        Experience the first AI-powered swipe-based recruitment platform. <br className="hidden md:block"/> Connecting talent with opportunity has never been faster.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-4 relative z-10 mb-16 px-4 w-full sm:w-auto">
                        <Button
                            type="button"
                            onClick={() => navigate('/candidates')}
                            variant="gradient"
                            size="lg"
                            className="rounded-full flex items-center justify-center w-full sm:w-auto font-poppins shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                        >
                            Find a Job
                            <ArrowRight size={16} />
                        </Button>
                        <Button
                            type="button"
                            onClick={() => navigate('/employers')}
                            variant="secondary"
                            size="lg"
                            className="rounded-full flex items-center justify-center w-full sm:w-auto font-poppins border border-gray-700 hover:border-gray-500"
                        >
                            Hire Talent
                        </Button>
                    </div>


                </section>

                {/* Feature Section */}
                <section className="w-full px-4 md:px-10 py-24 bg-transparent relative border-t border-white/10 overflow-hidden font-poppins">
                    <div className="max-w-7xl mx-auto flex flex-col gap-16 relative z-10">
                        {/* Section Header */}
                        <div className="flex flex-col md:flex-row gap-8 justify-between items-end pb-8">
                            <div className="max-w-2xl">
                                <h2 className="text-gray-400 font-medium tracking-widest uppercase text-xs mb-3">Tech-First Approach</h2>
                                <h3 className="text-white text-3xl md:text-5xl font-semibold leading-tight tracking-tight">Powered by Intelligence</h3>
                            </div>
                            <p className="text-gray-400 text-sm md:text-base max-w-md pb-1 font-light">
                                Our advanced algorithms ensure precision matching, saving you time and effort by filtering the noise.
                            </p>
                        </div>
                        {/* Features Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Card 1 */}
                            <div className="group flex flex-col gap-6 rounded-2xl border border-gray-800 bg-gray-900/40 p-8 hover:border-gray-600 transition-colors duration-300">
                                <div className="h-12 w-12 rounded-xl bg-gray-800 border border-gray-700 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-colors duration-300">
                                    <span className="material-symbols-outlined text-[24px]">psychology</span>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <h4 className="text-white text-lg font-medium">Smart ATS Scoring</h4>
                                    <p className="text-gray-400 text-sm leading-relaxed font-light">
                                        Instantly see how well a resume fits the job description with our automated scoring system that parses skills, experience, and keywords.
                                    </p>
                                </div>
                            </div>
                            {/* Card 2 */}
                            <div className="group flex flex-col gap-6 rounded-2xl border border-gray-800 bg-gray-900/40 p-8 hover:border-gray-600 transition-colors duration-300">
                                <div className="h-12 w-12 rounded-xl bg-gray-800 border border-gray-700 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-colors duration-300">
                                    <span className="material-symbols-outlined text-[24px]">track_changes</span>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <h4 className="text-white text-lg font-medium">95% Match Accuracy</h4>
                                    <p className="text-gray-400 text-sm leading-relaxed font-light">
                                        Our AI learns your preferences over time to deliver highly relevant candidates, reducing the time-to-hire significantly.
                                    </p>
                                </div>
                            </div>
                            {/* Card 3 */}
                            <div className="group flex flex-col gap-6 rounded-2xl border border-gray-800 bg-gray-900/40 p-8 hover:border-gray-600 transition-colors duration-300">
                                <div className="h-12 w-12 rounded-xl bg-gray-800 border border-gray-700 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-colors duration-300">
                                    <span className="material-symbols-outlined text-[24px]">trending_up</span>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <h4 className="text-white text-lg font-medium">Real-time Analytics</h4>
                                    <p className="text-gray-400 text-sm leading-relaxed font-light">
                                        Track application status, pipeline health, and engagement metrics with our comprehensive, real-time dashboard.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <CTASection />
            </main>
            
            <Footer />
        </div>
    );
};

export default LandingPage;
