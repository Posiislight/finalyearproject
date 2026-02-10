import React, { useState } from 'react';
import JobSeekerBottomNav from './JobSeekerBottomNav';

const JobSeekerHome = () => {
    const [currentCard, setCurrentCard] = useState(0);
    const [showApplyModal, setShowApplyModal] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const jobs = [
        {
            id: 1, title: 'Senior Frontend Developer', company: 'TechFlow Systems', logo: 'TF', logoColor: '#2563eb',
            location: 'San Francisco, CA · Remote', salary: '$120k – $160k', matchScore: 94,
            requirements: ['5+ years React/TypeScript', 'Experience with design systems', 'CI/CD pipeline knowledge', 'Agile methodology'],
            matchReason: 'Your React expertise and 6 years of frontend experience make you a strong match. Your portfolio projects align with their tech stack.',
            type: 'Full-time', posted: '2 days ago'
        },
        {
            id: 2, title: 'Product Designer', company: 'Orbital Inc.', logo: 'OI', logoColor: '#7c3aed',
            location: 'New York, NY · Hybrid', salary: '$100k – $140k', matchScore: 87,
            requirements: ['Figma & prototyping tools', 'User research experience', 'Design system creation', 'Cross-functional collaboration'],
            matchReason: 'Your UX skills and design portfolio closely match Orbital\'s visual design needs. Their team values the collaborative approach you showcase.',
            type: 'Full-time', posted: '5 hours ago'
        },
        {
            id: 3, title: 'Full Stack Engineer', company: 'NexGen Labs', logo: 'NL', logoColor: '#059669',
            location: 'Austin, TX · On-site', salary: '$130k – $175k', matchScore: 91,
            requirements: ['Node.js & Python backend', 'React or Vue frontend', 'PostgreSQL / MongoDB', 'Cloud infrastructure (AWS)'],
            matchReason: 'Your full-stack experience with Node.js and React directly matches their requirements. Your AWS certifications are a strong differentiator.',
            type: 'Full-time', posted: '1 day ago'
        },
    ];

    const job = jobs[currentCard];

    const handleSkip = () => {
        if (currentCard < jobs.length - 1) setCurrentCard(prev => prev + 1);
    };

    const handleApply = () => {
        setShowApplyModal(true);
    };

    const handleConfirmApply = () => {
        setShowApplyModal(false);
        setShowSuccess(true);
        setTimeout(() => {
            setShowSuccess(false);
            if (currentCard < jobs.length - 1) setCurrentCard(prev => prev + 1);
        }, 2000);
    };

    return (
        <div className="bg-[#111827] text-[#f9fafb] font-['DM_Sans',sans-serif] antialiased h-screen flex flex-col overflow-hidden">
            {/* Top Bar */}
            <header className="flex items-center justify-between px-5 py-3 shrink-0">
                <div>
                    <h1 className="text-lg font-bold text-[#f9fafb]">Good evening, Alex 👋</h1>
                    <p className="text-xs text-[#9ca3af]">{jobs.length - currentCard} jobs waiting for you</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="relative w-10 h-10 rounded-full bg-[#1F2937] border border-[#374151] flex items-center justify-center hover:bg-gray-800 transition-colors">
                        <span className="material-symbols-outlined text-[#9ca3af] text-xl">tune</span>
                    </button>
                    <button className="relative w-10 h-10 rounded-full bg-[#1F2937] border border-[#374151] flex items-center justify-center hover:bg-gray-800 transition-colors">
                        <span className="material-symbols-outlined text-[#9ca3af] text-xl">notifications</span>
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[#111827]"></span>
                    </button>
                </div>
            </header>

            {/* Card Stack Area */}
            <div className="flex-1 flex flex-col items-center justify-center px-5 pb-24 relative overflow-hidden">
                {/* Background Cards (stacked effect) */}
                {currentCard < jobs.length - 1 && (
                    <div className="absolute w-[calc(100%-60px)] max-w-md h-[75%] bg-[#1F2937]/50 rounded-3xl border border-[#374151]/50 top-[54%] -translate-y-1/2 scale-[0.95]"></div>
                )}

                {/* Main Card */}
                {job ? (
                    <div className="w-full max-w-md bg-[#1F2937] rounded-3xl border border-[#374151] shadow-2xl overflow-hidden relative z-10">
                        {/* Card Header */}
                        <div className="bg-gradient-to-r from-[#2563eb]/20 to-purple-600/20 p-6 pb-5 relative">
                            <div className="flex items-start gap-4">
                                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-extrabold text-lg shadow-lg shrink-0" style={{ backgroundColor: job.logoColor }}>
                                    {job.logo}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h2 className="text-xl font-bold text-[#f9fafb] leading-tight">{job.title}</h2>
                                    <p className="text-sm text-[#9ca3af] mt-1">{job.company}</p>
                                </div>
                                <div className="shrink-0 flex flex-col items-center">
                                    <div className="w-12 h-12 rounded-full border-2 border-[#22c55e] flex items-center justify-center bg-[#22c55e]/10">
                                        <span className="text-[#22c55e] font-extrabold text-sm">{job.matchScore}%</span>
                                    </div>
                                    <span className="text-[9px] text-[#9ca3af] mt-1 font-medium">AI Match</span>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-4">
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#111827]/60 text-[#9ca3af] text-xs font-medium">
                                    <span className="material-symbols-outlined text-xs">location_on</span>{job.location}
                                </span>
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#111827]/60 text-[#22c55e] text-xs font-medium">
                                    <span className="material-symbols-outlined text-xs">payments</span>{job.salary}
                                </span>
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#111827]/60 text-[#9ca3af] text-xs font-medium">
                                    <span className="material-symbols-outlined text-xs">schedule</span>{job.posted}
                                </span>
                            </div>
                        </div>

                        {/* Card Body */}
                        <div className="p-6 space-y-5">
                            {/* Key Requirements */}
                            <div>
                                <h4 className="text-xs font-bold text-[#9ca3af] uppercase tracking-wider mb-3">Key Requirements</h4>
                                <div className="space-y-2">
                                    {job.requirements.map((req, i) => (
                                        <div key={i} className="flex items-start gap-2.5">
                                            <span className="material-symbols-outlined text-[#2563eb] text-sm mt-0.5">check_circle</span>
                                            <span className="text-sm text-[#f9fafb]">{req}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* AI Match Reason */}
                            <div className="bg-[#2563eb]/5 border border-[#2563eb]/20 rounded-xl p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="material-symbols-outlined text-[#2563eb] text-sm">auto_awesome</span>
                                    <span className="text-xs font-bold text-[#2563eb] uppercase tracking-wider">Why This Matches You</span>
                                </div>
                                <p className="text-sm text-[#9ca3af] leading-relaxed">{job.matchReason}</p>
                            </div>
                        </div>

                        {/* Card Counter */}
                        <div className="px-6 pb-2">
                            <div className="flex gap-1">
                                {jobs.map((_, i) => (
                                    <div key={i} className={`flex-1 h-1 rounded-full ${i === currentCard ? 'bg-[#2563eb]' : i < currentCard ? 'bg-[#2563eb]/30' : 'bg-[#374151]'}`}></div>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center space-y-4">
                        <div className="w-20 h-20 rounded-full bg-[#1F2937] border border-[#374151] flex items-center justify-center mx-auto">
                            <span className="material-symbols-outlined text-[#9ca3af] text-4xl">check_circle</span>
                        </div>
                        <h3 className="text-xl font-bold text-[#f9fafb]">All caught up!</h3>
                        <p className="text-sm text-[#9ca3af] max-w-xs">You've reviewed all available jobs. Check back later for new opportunities.</p>
                    </div>
                )}

                {/* Action Buttons */}
                {job && (
                    <div className="flex items-center justify-center gap-5 mt-6">
                        <button onClick={handleSkip} className="group w-14 h-14 rounded-full bg-[#1F2937] border-2 border-red-500/30 flex items-center justify-center hover:bg-red-500/10 hover:border-red-500/60 transition-all shadow-lg">
                            <span className="material-symbols-outlined text-red-400 text-2xl group-hover:scale-110 transition-transform">close</span>
                        </button>
                        <button className="group w-11 h-11 rounded-full bg-[#1F2937] border border-[#374151] flex items-center justify-center hover:bg-gray-800 transition-all">
                            <span className="material-symbols-outlined text-[#9ca3af] text-xl">info</span>
                        </button>
                        <button className="group w-11 h-11 rounded-full bg-[#1F2937] border border-[#374151] flex items-center justify-center hover:bg-gray-800 transition-all">
                            <span className="material-symbols-outlined text-[#9ca3af] text-xl">bookmark</span>
                        </button>
                        <button onClick={handleApply} className="group w-14 h-14 rounded-full bg-[#2563eb] border-2 border-[#2563eb] flex items-center justify-center hover:bg-[#1d4ed8] transition-all shadow-lg shadow-[#2563eb]/30">
                            <span className="material-symbols-outlined text-white text-2xl group-hover:scale-110 transition-transform">favorite</span>
                        </button>
                    </div>
                )}
            </div>

            {/* Apply Confirmation Modal */}
            {showApplyModal && (
                <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm" onClick={() => setShowApplyModal(false)}>
                    <div className="w-full max-w-lg bg-[#1F2937] border-t border-[#374151] rounded-t-3xl p-6 space-y-5 animate-[slideUp_0.3s_ease-out]" onClick={e => e.stopPropagation()}>
                        <div className="w-10 h-1 bg-[#374151] rounded-full mx-auto"></div>
                        <div className="text-center">
                            <h3 className="text-lg font-bold text-[#f9fafb]">Apply to {job.title}?</h3>
                            <p className="text-sm text-[#9ca3af] mt-1">at {job.company}</p>
                        </div>

                        {/* AI Cover Letter Preview */}
                        <div className="bg-[#111827] border border-[#374151] rounded-xl p-4">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="material-symbols-outlined text-[#2563eb] text-sm">auto_awesome</span>
                                <span className="text-xs font-bold text-[#2563eb]">AI-Generated Cover Letter</span>
                            </div>
                            <p className="text-xs text-[#9ca3af] leading-relaxed line-clamp-3">
                                Dear Hiring Manager, I am excited to apply for the {job.title} position at {job.company}. With my extensive experience in modern web technologies and passion for building exceptional user experiences, I believe I would be a valuable addition to your team...
                            </p>
                            <button className="text-xs text-[#2563eb] mt-2 hover:underline">Preview full letter →</button>
                        </div>

                        {/* Resume Preview */}
                        <div className="bg-[#111827] border border-[#374151] rounded-xl p-4 flex items-center gap-3">
                            <div className="w-10 h-12 rounded-lg bg-[#2563eb]/10 border border-[#2563eb]/30 flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined text-[#2563eb] text-lg">description</span>
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-[#f9fafb]">Alex_Johnson_Resume.pdf</p>
                                <p className="text-xs text-[#9ca3af]">AI-optimized for this role • ATS Score: 92%</p>
                            </div>
                            <span className="material-symbols-outlined text-[#22c55e] text-sm">verified</span>
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-3">
                            <button onClick={() => setShowApplyModal(false)} className="flex-1 py-3 rounded-xl border border-[#374151] text-[#9ca3af] hover:text-[#f9fafb] hover:bg-gray-800 text-sm font-semibold transition-colors">
                                Customize First
                            </button>
                            <button onClick={handleConfirmApply} className="flex-1 py-3 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-sm font-semibold transition-all shadow-lg shadow-[#2563eb]/30 flex items-center justify-center gap-2">
                                <span className="material-symbols-outlined text-sm">send</span>
                                Confirm & Apply
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Success Animation */}
            {showSuccess && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                    <div className="flex flex-col items-center gap-4 animate-[fadeIn_0.3s_ease-out]">
                        <div className="w-20 h-20 rounded-full bg-[#22c55e]/20 border-2 border-[#22c55e] flex items-center justify-center">
                            <span className="material-symbols-outlined text-[#22c55e] text-4xl">check</span>
                        </div>
                        <h3 className="text-xl font-bold text-[#f9fafb]">Application Sent! 🎉</h3>
                        <p className="text-sm text-[#9ca3af]">Good luck with {job.company}!</p>
                    </div>
                </div>
            )}

            {/* Bottom Nav */}
            <JobSeekerBottomNav />
        </div>
    );
};

export default JobSeekerHome;
