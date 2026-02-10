import React, { useState } from 'react';
import JobSeekerBottomNav from './JobSeekerBottomNav';

const JobSeekerProfile = () => {
    const [activeTab, setActiveTab] = useState('overview');

    const skills = [
        { name: 'React', level: 95, trending: true },
        { name: 'TypeScript', level: 88, trending: true },
        { name: 'JavaScript', level: 92 },
        { name: 'Node.js', level: 80 },
        { name: 'CSS/Tailwind', level: 85 },
        { name: 'Python', level: 65 },
        { name: 'PostgreSQL', level: 70 },
        { name: 'AWS', level: 60 },
        { name: 'Docker', level: 55 },
        { name: 'GraphQL', level: 72 },
    ];

    const experience = [
        { role: 'Senior Frontend Developer', company: 'Acme Corp', period: 'Jan 2023 – Present', duration: '2 yrs', current: true },
        { role: 'Frontend Developer', company: 'PixelForge Studio', period: 'Mar 2020 – Dec 2022', duration: '2 yrs 10 mo' },
        { role: 'Junior Developer', company: 'StartupHub', period: 'Jun 2018 – Feb 2020', duration: '1 yr 9 mo' },
    ];

    const aiInsights = {
        atsScore: 87,
        gapSkills: ['System Design', 'CI/CD Pipelines', 'Kubernetes', 'Machine Learning Basics'],
        trendingSkills: ['AI/ML Integration', 'Rust', 'WebAssembly', 'Edge Computing', 'LLM APIs'],
        courses: [
            { title: 'System Design Fundamentals', provider: 'Coursera', duration: '4 weeks', match: 'Covers top skill gap' },
            { title: 'Docker & Kubernetes Mastery', provider: 'Udemy', duration: '6 weeks', match: 'High demand skill' },
            { title: 'AI for Developers', provider: 'DeepLearning.AI', duration: '3 weeks', match: 'Trending in your field' },
        ],
    };

    return (
        <div className="bg-[#111827] text-[#f9fafb] font-['DM_Sans',sans-serif] antialiased h-screen flex flex-col overflow-hidden">
            {/* Profile Header */}
            <header className="px-5 pt-4 pb-2 shrink-0">
                <div className="flex items-center gap-4 mb-4">
                    {/* Avatar + Completeness Ring */}
                    <div className="relative">
                        <div className="w-16 h-16 rounded-full bg-[#2563eb] flex items-center justify-center text-white font-bold text-xl border-2 border-[#111827]">
                            AJ
                        </div>
                        {/* Completeness ring */}
                        <svg className="absolute -inset-1 w-[72px] h-[72px] -rotate-90" viewBox="0 0 72 72">
                            <circle cx="36" cy="36" r="33" fill="none" stroke="#374151" strokeWidth="3" />
                            <circle cx="36" cy="36" r="33" fill="none" stroke="#22c55e" strokeWidth="3" strokeDasharray={`${0.82 * 207} ${207}`} strokeLinecap="round" />
                        </svg>
                        <div className="absolute -bottom-1 -right-1 bg-[#22c55e] text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full border-2 border-[#111827]">82%</div>
                    </div>
                    <div className="flex-1">
                        <h1 className="text-lg font-bold text-[#f9fafb]">Alex Johnson</h1>
                        <p className="text-sm text-[#9ca3af]">Senior Frontend Developer</p>
                        <p className="text-xs text-[#9ca3af]">San Francisco, CA · 6 yrs exp</p>
                    </div>
                    <button className="w-9 h-9 rounded-lg bg-[#1F2937] border border-[#374151] flex items-center justify-center hover:bg-gray-800 transition-colors">
                        <span className="material-symbols-outlined text-[#9ca3af] text-lg">edit</span>
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex gap-1 border-b border-[#374151]">
                    {['overview', 'resume', 'ai insights'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2.5 text-sm font-medium capitalize transition-colors border-b-2 -mb-px ${
                                activeTab === tab
                                    ? 'text-[#2563eb] border-[#2563eb]'
                                    : 'text-[#9ca3af] border-transparent hover:text-[#f9fafb]'
                            }`}
                        >
                            {tab === 'ai insights' ? 'AI Insights' : tab}
                        </button>
                    ))}
                </div>
            </header>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto px-5 pb-24 pt-4 space-y-5">

                {/* Overview Tab */}
                {activeTab === 'overview' && (
                    <>
                        {/* Personal Info */}
                        <div className="bg-[#1F2937] rounded-2xl border border-[#374151] p-5">
                            <h4 className="font-bold text-sm text-[#f9fafb] mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-[#2563eb] text-lg">person</span>
                                Personal Information
                            </h4>
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { label: 'Email', value: 'alex.j@gmail.com' },
                                    { label: 'Phone', value: '+1 (555) 123-4567' },
                                    { label: 'Location', value: 'San Francisco, CA' },
                                    { label: 'Open to', value: 'Remote / Hybrid' },
                                ].map((f, i) => (
                                    <div key={i}>
                                        <p className="text-[10px] text-[#9ca3af] uppercase tracking-wider font-semibold mb-0.5">{f.label}</p>
                                        <p className="text-sm text-[#f9fafb]">{f.value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Skills Matrix */}
                        <div className="bg-[#1F2937] rounded-2xl border border-[#374151] p-5">
                            <h4 className="font-bold text-sm text-[#f9fafb] mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-[#2563eb] text-lg">code</span>
                                Skills & Expertise
                            </h4>
                            <div className="space-y-3">
                                {skills.map((skill, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <span className="text-xs text-[#f9fafb] w-24 truncate font-medium">{skill.name}</span>
                                        <div className="flex-1 bg-gray-700 rounded-full h-2">
                                            <div className="h-2 rounded-full bg-gradient-to-r from-[#2563eb] to-blue-400" style={{ width: `${skill.level}%` }}></div>
                                        </div>
                                        <span className="text-xs text-[#9ca3af] w-8 text-right">{skill.level}%</span>
                                        {skill.trending && (
                                            <span className="material-symbols-outlined text-[#22c55e] text-xs">trending_up</span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Experience Timeline */}
                        <div className="bg-[#1F2937] rounded-2xl border border-[#374151] p-5">
                            <h4 className="font-bold text-sm text-[#f9fafb] mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-[#2563eb] text-lg">work</span>
                                Experience
                            </h4>
                            <div className="space-y-0">
                                {experience.map((exp, i) => (
                                    <div key={i} className="flex gap-3 relative">
                                        {/* Timeline line */}
                                        <div className="flex flex-col items-center">
                                            <div className={`w-3 h-3 rounded-full border-2 ${exp.current ? 'bg-[#2563eb] border-[#2563eb]' : 'bg-transparent border-[#374151]'}`}></div>
                                            {i < experience.length - 1 && <div className="w-0.5 flex-1 bg-[#374151]"></div>}
                                        </div>
                                        <div className="pb-5">
                                            <p className="text-sm font-semibold text-[#f9fafb]">{exp.role}</p>
                                            <p className="text-xs text-[#9ca3af]">{exp.company}</p>
                                            <p className="text-[10px] text-[#9ca3af] mt-0.5">{exp.period} · {exp.duration}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}

                {/* Resume Tab */}
                {activeTab === 'resume' && (
                    <>
                        {/* Current Resume */}
                        <div className="bg-[#1F2937] rounded-2xl border border-[#374151] p-5">
                            <h4 className="font-bold text-sm text-[#f9fafb] mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-[#2563eb] text-lg">description</span>
                                Current Resume
                            </h4>
                            <div className="flex items-center gap-4 p-4 bg-[#111827] rounded-xl border border-[#374151]">
                                <div className="w-12 h-16 rounded-lg bg-[#2563eb]/10 border border-[#2563eb]/30 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-[#2563eb] text-2xl">description</span>
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-semibold text-[#f9fafb]">Alex_Johnson_Resume.pdf</p>
                                    <p className="text-xs text-[#9ca3af]">Updated Feb 15, 2026 · 2 pages</p>
                                    <div className="flex items-center gap-1 mt-1">
                                        <span className="material-symbols-outlined text-[#22c55e] text-xs">verified</span>
                                        <span className="text-[10px] text-[#22c55e] font-medium">ATS Optimized</span>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button className="w-8 h-8 rounded-lg bg-[#374151]/50 flex items-center justify-center hover:bg-gray-700 transition-colors">
                                        <span className="material-symbols-outlined text-[#9ca3af] text-sm">download</span>
                                    </button>
                                    <button className="w-8 h-8 rounded-lg bg-[#374151]/50 flex items-center justify-center hover:bg-gray-700 transition-colors">
                                        <span className="material-symbols-outlined text-[#9ca3af] text-sm">share</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* AI-Optimized Versions */}
                        <div className="bg-[#1F2937] rounded-2xl border border-[#374151] p-5">
                            <h4 className="font-bold text-sm text-[#f9fafb] mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-[#2563eb] text-lg">auto_awesome</span>
                                AI-Optimized Versions
                            </h4>
                            <div className="space-y-3">
                                {[
                                    { role: 'Frontend Developer', score: 94, company: 'TechFlow Systems' },
                                    { role: 'Full Stack Engineer', score: 89, company: 'NexGen Labs' },
                                    { role: 'React Developer', score: 91, company: 'CloudScale Inc.' },
                                ].map((v, i) => (
                                    <div key={i} className="flex items-center gap-3 p-3 bg-[#111827] rounded-xl border border-[#374151]">
                                        <div className="w-9 h-9 rounded-lg bg-[#2563eb]/10 flex items-center justify-center shrink-0">
                                            <span className="material-symbols-outlined text-[#2563eb] text-lg">tune</span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-[#f9fafb] truncate">Optimized for: {v.role}</p>
                                            <p className="text-xs text-[#9ca3af]">{v.company} · ATS Score: {v.score}%</p>
                                        </div>
                                        <button className="text-xs text-[#2563eb] hover:underline shrink-0">View</button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Upload New */}
                        <div className="border-2 border-dashed border-[#374151] rounded-2xl p-6 text-center hover:border-[#2563eb]/40 transition-colors cursor-pointer">
                            <span className="material-symbols-outlined text-[#9ca3af] text-3xl mb-2">cloud_upload</span>
                            <p className="text-sm text-[#9ca3af]">Upload new resume</p>
                            <p className="text-[10px] text-[#9ca3af]/60 mt-1">PDF, DOC, DOCX (max 5MB)</p>
                        </div>
                    </>
                )}

                {/* AI Insights Tab */}
                {activeTab === 'ai insights' && (
                    <>
                        {/* ATS Score */}
                        <div className="bg-[#1F2937] rounded-2xl border border-[#374151] p-5">
                            <h4 className="font-bold text-sm text-[#f9fafb] mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-[#2563eb] text-lg">speed</span>
                                ATS Compatibility Score
                            </h4>
                            <div className="flex items-center gap-6">
                                <div className="relative w-20 h-20">
                                    <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
                                        <circle cx="40" cy="40" r="35" fill="none" stroke="#374151" strokeWidth="6" />
                                        <circle cx="40" cy="40" r="35" fill="none" stroke="#22c55e" strokeWidth="6" strokeDasharray={`${(aiInsights.atsScore/100) * 220} 220`} strokeLinecap="round" />
                                    </svg>
                                    <span className="absolute inset-0 flex items-center justify-center text-xl font-extrabold text-[#22c55e]">{aiInsights.atsScore}%</span>
                                </div>
                                <div>
                                    <p className="text-sm text-[#f9fafb] font-medium">Great compatibility</p>
                                    <p className="text-xs text-[#9ca3af] mt-0.5">Your profile is well-optimized for most ATS systems. A few improvements can push you above 90%.</p>
                                </div>
                            </div>
                        </div>

                        {/* Skill Gap Analysis */}
                        <div className="bg-[#1F2937] rounded-2xl border border-[#374151] p-5">
                            <h4 className="font-bold text-sm text-[#f9fafb] mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-[#2563eb] text-lg">troubleshoot</span>
                                Skill Gap Analysis
                            </h4>
                            <p className="text-xs text-[#9ca3af] mb-3">Skills frequently requested in your target roles that are missing from your profile:</p>
                            <div className="flex flex-wrap gap-2">
                                {aiInsights.gapSkills.map((skill, i) => (
                                    <span key={i} className="px-3 py-1.5 rounded-lg bg-yellow-900/10 text-yellow-400 border border-yellow-900/20 text-xs font-medium flex items-center gap-1.5">
                                        <span className="material-symbols-outlined text-xs">add_circle</span>
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Trending Skills */}
                        <div className="bg-[#1F2937] rounded-2xl border border-[#374151] p-5">
                            <h4 className="font-bold text-sm text-[#f9fafb] mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-[#2563eb] text-lg">trending_up</span>
                                Trending in Your Industry
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {aiInsights.trendingSkills.map((skill, i) => (
                                    <span key={i} className="px-3 py-1.5 rounded-lg bg-[#2563eb]/10 text-[#2563eb] border border-[#2563eb]/20 text-xs font-medium flex items-center gap-1.5">
                                        <span className="material-symbols-outlined text-xs">local_fire_department</span>
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Suggested Courses */}
                        <div className="bg-[#1F2937] rounded-2xl border border-[#374151] p-5">
                            <h4 className="font-bold text-sm text-[#f9fafb] mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-[#2563eb] text-lg">school</span>
                                Recommended Courses
                            </h4>
                            <div className="space-y-3">
                                {aiInsights.courses.map((c, i) => (
                                    <div key={i} className="flex items-center gap-3 p-3 bg-[#111827] rounded-xl border border-[#374151]">
                                        <div className="w-10 h-10 rounded-lg bg-purple-600/10 flex items-center justify-center shrink-0">
                                            <span className="material-symbols-outlined text-purple-400 text-lg">play_circle</span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-[#f9fafb] truncate">{c.title}</p>
                                            <p className="text-xs text-[#9ca3af]">{c.provider} · {c.duration}</p>
                                            <p className="text-[10px] text-[#22c55e] mt-0.5">{c.match}</p>
                                        </div>
                                        <button className="text-xs text-[#2563eb] hover:underline shrink-0">Enroll</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </div>

            <JobSeekerBottomNav />
        </div>
    );
};

export default JobSeekerProfile;
