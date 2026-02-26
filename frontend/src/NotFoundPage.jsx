import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <div className="bg-[#111827] text-[#f9fafb] font-['DM_Sans',sans-serif] antialiased min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-6">
            {/* Animated floating background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[15%] left-[10%] w-72 h-72 bg-[#2563eb]/5 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-[#7c3aed]/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#2563eb]/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>

                {/* Floating icons */}
                <div className="absolute top-[20%] left-[20%] animate-bounce" style={{ animationDuration: '3s' }}>
                    <span className="material-symbols-outlined text-[#374151] text-4xl">work</span>
                </div>
                <div className="absolute top-[30%] right-[25%] animate-bounce" style={{ animationDuration: '4s', animationDelay: '0.5s' }}>
                    <span className="material-symbols-outlined text-[#374151] text-3xl">search</span>
                </div>
                <div className="absolute bottom-[30%] left-[15%] animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '1s' }}>
                    <span className="material-symbols-outlined text-[#374151] text-3xl">person</span>
                </div>
                <div className="absolute bottom-[25%] right-[15%] animate-bounce" style={{ animationDuration: '4.5s', animationDelay: '1.5s' }}>
                    <span className="material-symbols-outlined text-[#374151] text-4xl">favorite</span>
                </div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 text-center max-w-md mx-auto">
                {/* Logo */}
                <Link to="/" className="inline-flex items-center gap-2 mb-12">
                    <div className="w-8 h-8 bg-[#2563eb] rounded-lg flex items-center justify-center">
                        <span className="material-symbols-outlined text-white text-lg">smart_toy</span>
                    </div>
                    <span className="text-xl font-bold text-white tracking-tight">RecruitAI</span>
                </Link>

                {/* 404 Number */}
                <div className="relative mb-6">
                    <h1 className="text-[160px] md:text-[200px] font-extrabold leading-none tracking-tighter bg-gradient-to-b from-[#2563eb] via-[#7c3aed] to-[#2563eb]/20 bg-clip-text text-transparent select-none">
                        404
                    </h1>
                    {/* Decorative orbit circle */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-[#374151]/30 rounded-full"></div>
                </div>

                {/* Error Icon */}
                <div className="w-16 h-16 rounded-full bg-[#1F2937] border border-[#374151] flex items-center justify-center mx-auto mb-6">
                    <span className="material-symbols-outlined text-[#2563eb] text-3xl">explore_off</span>
                </div>

                {/* Text */}
                <h2 className="text-2xl font-bold text-[#f9fafb] mb-3">Page not found</h2>
                <p className="text-sm text-[#9ca3af] leading-relaxed mb-8 max-w-sm mx-auto">
                    The page you're looking for doesn't exist or has been moved. Let's get you back on track to finding your dream job.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <Link
                        to="/"
                        className="flex items-center justify-center gap-2 h-12 px-8 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold text-sm shadow-lg shadow-[#2563eb]/30 transition-all active:scale-[0.98] w-full sm:w-auto"
                    >
                        <span className="material-symbols-outlined text-lg">home</span>
                        Go Home
                    </Link>
                    <button
                        onClick={() => window.history.back()}
                        className="flex items-center justify-center gap-2 h-12 px-8 rounded-xl bg-[#1F2937] border border-[#374151] text-[#9ca3af] hover:text-[#f9fafb] hover:bg-gray-800 font-semibold text-sm transition-all w-full sm:w-auto"
                    >
                        <span className="material-symbols-outlined text-lg">arrow_back</span>
                        Go Back
                    </button>
                </div>

                {/* Helpful Links */}
                <div className="mt-12 pt-8 border-t border-[#374151]/50">
                    <p className="text-xs text-[#9ca3af] mb-4 uppercase tracking-wider font-semibold">Helpful Links</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link to="/features" className="text-sm text-[#2563eb] hover:underline font-medium">Features</Link>
                        <Link to="/candidates" className="text-sm text-[#2563eb] hover:underline font-medium">For Candidates</Link>
                        <Link to="/employers" className="text-sm text-[#2563eb] hover:underline font-medium">For Employers</Link>
                        <Link to="/signup" className="text-sm text-[#2563eb] hover:underline font-medium">Sign Up</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;
