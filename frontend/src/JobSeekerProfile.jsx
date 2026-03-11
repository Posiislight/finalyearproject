import React, { useState, useEffect, useRef } from 'react';
import JobSeekerBottomNav from './JobSeekerBottomNav';
import { useAuth } from './contexts/AuthContext';
import { jobSeekerService } from './services/jobSeekerService';
import BlockLoader from './components/ui/block-loader';
import { useNavigate } from 'react-router-dom';

const JobSeekerProfile = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('overview');

    const profile = user?.job_seeker_profile || {};
    const firstName = user?.first_name || 'Job';
    const lastName = user?.last_name || 'Seeker';
    const fullName = `${firstName} ${lastName}`;
    const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`;

    // Live data state
    const [skills, setSkills] = useState([]);
    const [experience, setExperience] = useState([]);
    const [dataLoading, setDataLoading] = useState(true);

    // Resume state
    const [resumeUrl, setResumeUrl] = useState(profile.resume || null);
    const [resumeUploading, setResumeUploading] = useState(false);
    const resumeInputRef = useRef(null);

    // AI Optimizations
    const [optimizations, setOptimizations] = useState([]);
    const [optimizationsLoading, setOptimizationsLoading] = useState(false);
    const [optimizationsFetched, setOptimizationsFetched] = useState(false);
    const [optimizationsMessage, setOptimizationsMessage] = useState('');

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const [skillsData, expData, profileData] = await Promise.all([
                    jobSeekerService.getSkills(),
                    jobSeekerService.getExperience(),
                    jobSeekerService.getProfile(),
                ]);
                setSkills(skillsData);
                setExperience(expData);
                if (profileData?.job_seeker_profile?.resume) {
                    setResumeUrl(profileData.job_seeker_profile.resume);
                }
            } catch (err) {
                console.error('Profile data error:', err);
            } finally {
                setDataLoading(false);
            }
        };
        fetchProfileData();
    }, []);

    // Compute profile completeness dynamically
    const completenessChecks = [
        !!user?.first_name, !!user?.last_name, !!user?.email,
        !!profile.bio, !!profile.location,
        skills.length > 0, experience.length > 0,
        !!resumeUrl,
    ];
    const profileCompleteness = Math.round((completenessChecks.filter(Boolean).length / completenessChecks.length) * 100);

    const aiInsightsDefault = {
        ats_score: 0,
        gap_skills: [],
        trending_skills: [],
        courses: [],
    };

    const [aiInsights, setAiInsights] = useState(aiInsightsDefault);
    const [insightsLoading, setInsightsLoading] = useState(false);
    const [insightsFetched, setInsightsFetched] = useState(false);

    useEffect(() => {
        if (!insightsFetched) {
            const fetchInsights = async () => {
                setInsightsLoading(true);
                try {
                    const data = await jobSeekerService.getAiInsights();
                    setAiInsights(data);
                } catch (err) {
                    console.error('AI insights error:', err);
                } finally {
                    setInsightsLoading(false);
                    setInsightsFetched(true);
                }
            };
            fetchInsights();
        }
    }, [insightsFetched]);

    // Fetch AI optimizations when resume tab is opened
    useEffect(() => {
        if (activeTab === 'resume' && !optimizationsFetched) {
            const fetchOptimizations = async () => {
                setOptimizationsLoading(true);
                try {
                    const data = await jobSeekerService.getResumeOptimizations();
                    setOptimizations(data.optimizations || []);
                    setOptimizationsMessage(data.message || '');
                } catch (err) {
                    console.error('Optimizations error:', err);
                } finally {
                    setOptimizationsLoading(false);
                    setOptimizationsFetched(true);
                }
            };
            fetchOptimizations();
        }
    }, [activeTab, optimizationsFetched]);

    const handleResumeUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setResumeUploading(true);
        try {
            const result = await jobSeekerService.uploadResume(file);
            setResumeUrl(result.resume);
        } catch (err) {
            console.error('Resume upload error:', err);
        } finally {
            setResumeUploading(false);
        }
    };

    const getResumeFilename = () => {
        if (!resumeUrl) return null;
        try {
            const url = new URL(resumeUrl);
            const parts = url.pathname.split('/');
            return decodeURIComponent(parts[parts.length - 1]);
        } catch {
            return 'Resume.pdf';
        }
    };

    return (
        <div className="bg-black text-[#f9fafb] font-['Plus_Jakarta_Sans',sans-serif] antialiased h-screen flex flex-col overflow-hidden">
            {/* Profile Header */}
            <header className="px-5 pt-4 pb-2 shrink-0">
                <div className="flex items-center gap-4 mb-4">
                    <div className="relative">
                        <div className="w-16 h-16 rounded-full bg-[#2563eb] flex items-center justify-center text-white font-bold text-xl border-2 border-black overflow-hidden">
                            {profile.profile_picture ? (
                                <img src={profile.profile_picture} alt="Profile" className="w-full h-full object-cover" />
                            ) : initials}
                        </div>
                        <svg className="absolute -inset-1 w-[72px] h-[72px] -rotate-90" viewBox="0 0 72 72">
                            <circle cx="36" cy="36" r="33" fill="none" stroke="#374151" strokeWidth="3" />
                            <circle cx="36" cy="36" r="33" fill="none" stroke={aiInsights.ats_score >= 80 ? '#22c55e' : aiInsights.ats_score >= 60 ? '#eab308' : '#ef4444'} strokeWidth="3" strokeDasharray={`${(aiInsights.ats_score / 100) * 207} ${207}`} strokeLinecap="round" />
                        </svg>
                        <div className={`absolute -bottom-1 -right-1 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full border-2 border-black font-['DM_Mono',monospace] ${aiInsights.ats_score >= 80 ? 'bg-[#22c55e]' : aiInsights.ats_score >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}>{aiInsights.ats_score}%</div>
                    </div>
                    <div className="flex-1">
                        <h1 className="text-lg font-bold text-[#f9fafb]">{fullName}</h1>
                        <p className="text-sm text-[#9ca3af]">{profile.bio || 'Add a professional title'}</p>
                        <p className="text-xs text-[#9ca3af]">{profile.location || 'Location not set'}</p>
                    </div>
                    <button onClick={() => navigate('/job-seeker-settings')} className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
                        <span className="material-symbols-outlined text-[#9ca3af] text-lg">edit</span>
                    </button>
                </div>

                <div className="flex gap-1 border-b border-neutral-900">
                    {['overview', 'resume', 'ai insights'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2.5 text-sm font-bold tracking-wide uppercase transition-colors border-b-2 -mb-px ${
                                activeTab === tab
                                    ? 'text-blue-500 border-blue-500'
                                    : 'text-neutral-500 border-transparent hover:text-white'
                            }`}
                        >
                            {tab === 'ai insights' ? 'AI Insights' : tab}
                        </button>
                    ))}
                </div>
            </header>

            <div className="flex-1 overflow-y-auto px-5 pb-24 pt-4 space-y-5">

                {/* Overview Tab */}
                {activeTab === 'overview' && (
                    <>
                        <div className="bg-[#0a0a0a] rounded-2xl border border-neutral-900 p-5">
                            <h4 className="font-bold text-sm text-white mb-4 flex items-center gap-2 tracking-tight">
                                <span className="material-symbols-outlined text-[#2563eb] text-lg">person</span>
                                Personal Information
                            </h4>
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { label: 'Email', value: user?.email || 'Not set' },
                                    { label: 'Phone', value: profile?.phone || 'Not set' },
                                    { label: 'Location', value: profile?.location || 'Not set' },
                                    { label: 'Open to', value: 'Any' },
                                ].map((f, i) => (
                                    <div key={i}>
                                        <p className="text-[10px] text-[#9ca3af] uppercase tracking-wider font-semibold mb-0.5">{f.label}</p>
                                        <p className="text-sm text-[#f9fafb]">{f.value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-[#0a0a0a] rounded-2xl border border-neutral-900 p-5">
                            <h4 className="font-bold text-sm text-white mb-4 flex items-center gap-2 tracking-tight">
                                <span className="material-symbols-outlined text-[#2563eb] text-lg">code</span>
                                Skills & Expertise
                            </h4>
                            {skills.length > 0 ? (
                                <div className="space-y-3">
                                    {skills.map((skill, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <span className="text-xs text-[#f9fafb] w-24 truncate font-medium">{skill.name}</span>
                                            <div className="flex-1 bg-gray-700 rounded-full h-2">
                                                <div className="h-2 rounded-full bg-gradient-to-r from-[#2563eb] to-blue-400" style={{ width: `${skill.level}%` }}></div>
                                            </div>
                                            <span className="text-xs text-[#9ca3af] w-8 text-right font-['DM_Mono',monospace]">{skill.level}%</span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-[#9ca3af]">No skills added yet. Add them from the Settings page or re-run onboarding.</p>
                            )}
                        </div>

                        <div className="bg-[#0a0a0a] rounded-2xl border border-neutral-900 p-5">
                            <h4 className="font-bold text-sm text-white mb-4 flex items-center gap-2 tracking-tight">
                                <span className="material-symbols-outlined text-[#2563eb] text-lg">work</span>
                                Experience
                            </h4>
                            {experience.length > 0 ? (
                                <div className="space-y-0">
                                    {experience.map((exp, i) => (
                                        <div key={i} className="flex gap-3 relative">
                                            <div className="flex flex-col items-center">
                                                <div className={`w-3 h-3 rounded-full border-2 ${exp.is_current ? 'bg-[#2563eb] border-[#2563eb]' : 'bg-transparent border-white/10'}`}></div>
                                                {i < experience.length - 1 && <div className="w-0.5 flex-1 bg-white/10"></div>}
                                            </div>
                                            <div className="pb-5">
                                                <p className="text-sm font-semibold text-[#f9fafb]">{exp.role}</p>
                                                <p className="text-xs text-[#9ca3af]">{exp.company}</p>
                                                <p className="text-[10px] text-[#9ca3af] mt-0.5">
                                                    {new Date(exp.start_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} – {exp.is_current ? 'Present' : new Date(exp.end_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                                                    {exp.duration ? ` · ${exp.duration}` : ''}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-[#9ca3af]">No experience added yet.</p>
                            )}
                        </div>
                    </>
                )}

                {/* Resume Tab */}
                {activeTab === 'resume' && (
                    <>
                        {/* Current Resume */}
                        <div className="bg-[#0a0a0a] rounded-2xl border border-neutral-900 p-5">
                            <h4 className="font-bold text-sm text-white mb-4 flex items-center gap-2 tracking-tight">
                                <span className="material-symbols-outlined text-[#2563eb] text-lg">description</span>
                                Current Resume
                            </h4>

                            {resumeUrl ? (
                                <div className="flex items-center gap-4 p-4 bg-black rounded-xl border border-neutral-900">
                                    <div className="w-12 h-16 rounded-lg bg-blue-900/10 border border-blue-500/30 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-blue-500 text-2xl">description</span>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-bold tracking-tight text-white">{getResumeFilename()}</p>
                                        <div className="flex items-center gap-1 mt-1">
                                            <span className="material-symbols-outlined text-green-500 text-[14px]">verified</span>
                                            <span className="text-[10px] text-green-500 font-bold uppercase tracking-widest">Uploaded</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <a href={resumeUrl} target="_blank" rel="noopener noreferrer"
                                            className="w-8 h-8 rounded-lg bg-neutral-900 flex items-center justify-center hover:bg-neutral-800 transition-colors border border-neutral-800">
                                            <span className="material-symbols-outlined text-neutral-400 text-sm">download</span>
                                        </a>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <div className="w-16 h-16 rounded-2xl bg-yellow-900/10 border border-yellow-800/20 flex items-center justify-center mx-auto mb-4">
                                        <span className="material-symbols-outlined text-yellow-500 text-3xl">upload_file</span>
                                    </div>
                                    <h3 className="text-base font-bold text-[#f9fafb] mb-1">No resume uploaded yet</h3>
                                    <p className="text-sm text-[#9ca3af] mb-4 max-w-sm mx-auto">
                                        Upload your resume to get better job matches and let employers see your qualifications at a glance.
                                    </p>
                                    <p className="text-xs text-[#9ca3af] mb-4">Profiles with resumes get <span className="text-[#22c55e] font-semibold">2.5×</span> more employer views</p>
                                </div>
                            )}
                        </div>

                        {/* Upload / Replace Resume */}
                        <input type="file" ref={resumeInputRef} onChange={handleResumeUpload} accept=".pdf" className="hidden" />
                        <div
                            onClick={() => !resumeUploading && resumeInputRef.current?.click()}
                            className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all cursor-pointer ${
                                resumeUploading
                                    ? 'border-blue-500/50 bg-blue-900/10'
                                    : 'border-neutral-800 hover:border-neutral-600'
                            }`}
                        >
                            {resumeUploading ? (
                                <div className="flex flex-col items-center">
                                    <BlockLoader size={24} gap={3} className="mb-3" />
                                    <p className="text-sm text-neutral-400 font-semibold tracking-wide">Uploading...</p>
                                </div>
                            ) : (
                                <>
                                    <span className="material-symbols-outlined text-neutral-500 text-3xl mb-2">cloud_upload</span>
                                    <p className="text-sm text-neutral-300 font-bold">{resumeUrl ? 'Upload a new resume' : 'Upload your resume'}</p>
                                    <p className="text-[10px] font-bold text-neutral-600 mt-1 uppercase tracking-widest">PDF (max 5MB)</p>
                                </>
                            )}
                        </div>

                        {/* AI-Optimized Versions */}
                        <div className="bg-[#0a0a0a] rounded-2xl border border-neutral-900 p-5">
                            <h4 className="font-bold text-sm text-white mb-4 flex items-center gap-2 tracking-tight">
                                <span className="material-symbols-outlined text-[#2563eb] text-lg">auto_awesome</span>
                                AI Resume Optimization
                            </h4>

                            {optimizationsLoading ? (
                                <div className="flex flex-col items-center py-8">
                                    <BlockLoader size={24} gap={3} className="mb-4" />
                                    <p className="text-sm text-[#9ca3af]">Analyzing your profile against applied jobs...</p>
                                </div>
                            ) : optimizations.length > 0 ? (
                                <div className="space-y-3">
                                    {optimizations.map((opt, i) => (
                                        <div key={i} className="p-4 bg-black rounded-xl border border-white/10">
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-9 h-9 rounded-lg bg-[#2563eb]/10 flex items-center justify-center shrink-0">
                                                        <span className="material-symbols-outlined text-[#2563eb] text-lg">tune</span>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium text-[#f9fafb]">{opt.target_role}</p>
                                                        <p className="text-xs text-[#9ca3af]">{opt.company}</p>
                                                    </div>
                                                </div>
                                                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                                                    opt.ats_score >= 80
                                                        ? 'bg-green-900/20 text-green-400 border border-green-800/30'
                                                        : opt.ats_score >= 60
                                                            ? 'bg-yellow-900/20 text-yellow-400 border border-yellow-800/30'
                                                            : 'bg-red-900/20 text-red-400 border border-red-800/30'
                                                }`}>
                                                    ATS: <span className="font-['DM_Mono',monospace]">{opt.ats_score}%</span>
                                                </span>
                                            </div>
                                            <div className="space-y-1.5">
                                                {(opt.suggestions || []).map((s, j) => (
                                                    <div key={j} className="flex items-start gap-2 text-xs text-[#9ca3af]">
                                                        <span className="material-symbols-outlined text-yellow-500 text-sm shrink-0 mt-0.5">lightbulb</span>
                                                        <span>{s}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-6">
                                    <span className="material-symbols-outlined text-gray-600 text-3xl mb-2">auto_awesome</span>
                                    <p className="text-sm text-[#9ca3af]">
                                        {optimizationsMessage || 'Apply to some jobs first, then come back here for personalized resume optimization tips.'}
                                    </p>
                                </div>
                            )}
                        </div>
                    </>
                )}

                {/* AI Insights Tab */}
                {activeTab === 'ai insights' && (
                    <>
                        {insightsLoading ? (
                            <div className="flex flex-col items-center justify-center py-12">
                                <BlockLoader size={30} gap={4} className="mb-4" />
                                <p className="text-sm text-[#9ca3af]">Generating your AI insights...</p>
                            </div>
                        ) : (
                        <>
                        {/* ATS Score */}
                        <div className="bg-[#0a0a0a] rounded-2xl border border-neutral-900 p-5">
                            <h4 className="font-bold text-sm text-white mb-4 flex items-center gap-2 tracking-tight">
                                <span className="material-symbols-outlined text-[#2563eb] text-lg">speed</span>
                                ATS Compatibility Score
                            </h4>
                            <div className="flex items-center gap-6">
                                <div className="relative w-20 h-20">
                                    <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
                                        <circle cx="40" cy="40" r="35" fill="none" stroke="#374151" strokeWidth="6" />
                                        <circle cx="40" cy="40" r="35" fill="none" stroke={aiInsights.ats_score >= 80 ? '#22c55e' : aiInsights.ats_score >= 60 ? '#eab308' : '#ef4444'} strokeWidth="6" strokeDasharray={`${(aiInsights.ats_score/100) * 220} 220`} strokeLinecap="round" />
                                    </svg>
                                    <span className={`absolute inset-0 flex items-center justify-center text-xl font-extrabold font-['DM_Mono',monospace] ${aiInsights.ats_score >= 80 ? 'text-[#22c55e]' : aiInsights.ats_score >= 60 ? 'text-yellow-500' : 'text-red-500'}`}>{aiInsights.ats_score}%</span>
                                </div>
                                <div>
                                    <p className="text-sm text-[#f9fafb] font-medium">
                                        {aiInsights.ats_score >= 80 ? 'Great compatibility' : aiInsights.ats_score >= 60 ? 'Good, could improve' : 'Needs optimization'}
                                    </p>
                                    <p className="text-xs text-[#9ca3af] mt-0.5">
                                        {aiInsights.ats_score >= 80
                                            ? 'Your profile is well-optimized for most ATS systems.'
                                            : 'Add more skills and experience to improve your score.'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Skill Gap Analysis */}
                        <div className="bg-[#0a0a0a] rounded-2xl border border-neutral-900 p-5">
                            <h4 className="font-bold text-sm text-white mb-4 flex items-center gap-2 tracking-tight">
                                <span className="material-symbols-outlined text-[#2563eb] text-lg">troubleshoot</span>
                                Skill Gap Analysis
                            </h4>
                            <p className="text-xs text-[#9ca3af] mb-3">Skills frequently requested in your target roles that are missing from your profile:</p>
                            <div className="flex flex-wrap gap-2">
                                {aiInsights.gap_skills.map((skill, i) => (
                                    <span key={i} className="px-3 py-1.5 rounded-lg bg-yellow-900/10 text-yellow-400 border border-yellow-900/20 text-xs font-medium flex items-center gap-1.5">
                                        <span className="material-symbols-outlined text-xs">add_circle</span>
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Trending Skills */}
                        <div className="bg-[#0a0a0a] rounded-2xl border border-neutral-900 p-5">
                            <h4 className="font-bold text-sm text-white mb-4 flex items-center gap-2 tracking-tight">
                                <span className="material-symbols-outlined text-[#2563eb] text-lg">trending_up</span>
                                Trending in Your Industry
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {aiInsights.trending_skills.map((skill, i) => (
                                    <span key={i} className="px-3 py-1.5 rounded-lg bg-[#2563eb]/10 text-[#2563eb] border border-[#2563eb]/20 text-xs font-medium flex items-center gap-1.5">
                                        <span className="material-symbols-outlined text-xs">local_fire_department</span>
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Suggested Courses */}
                        <div className="bg-[#0a0a0a] rounded-2xl border border-neutral-900 p-5">
                            <h4 className="font-bold text-sm text-white mb-4 flex items-center gap-2 tracking-tight">
                                <span className="material-symbols-outlined text-[#2563eb] text-lg">school</span>
                                Recommended Courses
                            </h4>
                            <div className="space-y-3">
                                {aiInsights.courses.map((c, i) => (
                                    <div key={i} className="flex items-center gap-3 p-3 bg-black rounded-xl border border-white/10">
                                        <div className="w-10 h-10 rounded-lg bg-purple-600/10 flex items-center justify-center shrink-0">
                                            <span className="material-symbols-outlined text-purple-400 text-lg">play_circle</span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-[#f9fafb] truncate">{c.title}</p>
                                            <p className="text-xs text-[#9ca3af]">{c.provider} · {c.duration}</p>
                                            <p className="text-[10px] text-[#22c55e] mt-0.5">{c.match}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        </>)}
                    </>
                )}
            </div>

            <JobSeekerBottomNav />
        </div>
    );
};

export default JobSeekerProfile;
