import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EmployerSidebar from './EmployerSidebar';
import { employerService } from './services/employerService';
import BlockLoader from './components/ui/block-loader';
import { messagingService } from './services/messagingService';
import { useAuth } from './contexts/AuthContext';

const EmployerCandidates = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [view, setView] = useState('swipe'); // 'swipe', 'profile', or 'list'
    const [listFilter, setListFilter] = useState('shortlisted'); // 'shortlisted' or 'declined'
    const [profileTab, setProfileTab] = useState('overview'); // 'overview', 'resume', 'cover_letter', 'portfolio'
    
    // Live Data State
    const [applicants, setApplicants] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    // AI Ranking State
    const [aiScores, setAiScores] = useState({}); // { applicationId: { match_score, reason } }
    const [rankingLoading, setRankingLoading] = useState(false);

    // AI Summary State
    const [aiSummary, setAiSummary] = useState('');
    const [summaryLoading, setSummaryLoading] = useState(false);

    const runAiRanking = async (applicantData) => {
        const jobIds = [...new Set(applicantData.map(a => a.job_post).filter(Boolean))];
        if (jobIds.length === 0) {
            setAiScores({});
            return;
        }

        setRankingLoading(true);
        try {
            const rankingResults = await Promise.all(
                jobIds.map(jid => employerService.getRankedCandidates(jid).catch(() => null))
            );
            const scores = {};
            rankingResults.forEach(result => {
                if (result && result.ranked_applicants) {
                    result.ranked_applicants.forEach(r => {
                        scores[r.application_id] = {
                            match_score: r.match_score,
                            reason: r.reason,
                        };
                    });
                }
            });
            setAiScores(scores);

            // Re-sort applicants by AI score (highest first) without blocking initial render.
            const sorted = [...applicantData].sort((a, b) => {
                const scoreA = scores[a.id]?.match_score ?? 50;
                const scoreB = scores[b.id]?.match_score ?? 50;
                return scoreB - scoreA;
            });
            setApplicants(sorted);
        } catch (err) {
            console.error('AI ranking error:', err);
        } finally {
            setRankingLoading(false);
        }
    };

    useEffect(() => {
        const fetchApplicants = async () => {
            try {
                const data = await employerService.getAllApplicants();
                setApplicants(data);
                runAiRanking(data);
            } catch (error) {
                console.error("Failed to fetch employer applicants:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchApplicants();
    }, []);

    const handleStatusUpdate = async (status) => {
        if (!applicants[currentIndex]) return;
        const currentApp = applicants[currentIndex];
        
        try {
            await employerService.updateApplicationStatus(currentApp.id, status);
            setCurrentIndex(prev => prev + 1);
            setView('swipe');
        } catch (error) {
            console.error("Failed to update status:", error);
            alert("Error updating candidate status.");
        }
    };

    const currentApplicant = applicants[currentIndex];
    const currentScore = currentApplicant ? aiScores[currentApplicant.id] : null;

    // Computed sidebar stats
    const shortlistedApplicants = applicants.filter(a => a.status === 'reviewing' || a.status === 'interviewing');
    const declinedApplicants = applicants.filter(a => a.status === 'rejected');
    const shortlistedCount = shortlistedApplicants.length;
    const declinedCount = declinedApplicants.length;

    const openListView = (filter) => {
        setListFilter(filter);
        setView('list');
    };

    const viewCandidateFromList = (index) => {
        // Find the applicant's index in the main array
        const listApplicants = listFilter === 'shortlisted' ? shortlistedApplicants : declinedApplicants;
        const app = listApplicants[index];
        const mainIndex = applicants.findIndex(a => a.id === app.id);
        if (mainIndex !== -1) {
            setCurrentIndex(mainIndex);
            setView('profile');
            setProfileTab('overview');
        }
    };

    // Fetch AI summary when switching to profile view
    useEffect(() => {
        if (view === 'profile' && currentApplicant) {
            const fetchSummary = async () => {
                setSummaryLoading(true);
                setAiSummary('');
                try {
                    const data = await employerService.getCandidateSummary(currentApplicant.id);
                    setAiSummary(data.summary);
                } catch (err) {
                    console.error('AI summary error:', err);
                    setAiSummary('AI summary is temporarily unavailable for this candidate.');
                } finally {
                    setSummaryLoading(false);
                }
            };
            fetchSummary();
        }
    }, [view, currentApplicant]);

    return (
        <div className="bg-black text-[#f9fafb] font-['DM_Sans',sans-serif] antialiased h-screen flex overflow-hidden">
            {/* Sidebar */}
            {/* Sidebar */}
            <EmployerSidebar />

            {/* Main Content */}
            <main className="flex-1 flex flex-col h-full overflow-hidden relative bg-black">
                {/* Header */}
                <header className="flex items-center justify-between px-8 py-4 bg-white/5 border-b border-white/10 shadow-sm z-10 shrink-0">
                    <div className="flex items-center gap-4">
                        {(view === 'profile' || view === 'list') && (
                            <button onClick={() => { setView('swipe'); setProfileTab('overview'); }} className="text-[#9ca3af] hover:text-[#f9fafb] transition-colors">
                                <span className="material-symbols-outlined">arrow_back</span>
                            </button>
                        )}
                        <div>
                            {view === 'list' ? (
                                <>
                                    <h2 className="text-lg font-bold text-[#f9fafb]">{listFilter === 'shortlisted' ? 'Shortlisted' : 'Declined'} Candidates</h2>
                                    <p className="text-sm text-[#9ca3af]">{listFilter === 'shortlisted' ? shortlistedCount : declinedCount} candidates</p>
                                </>
                            ) : currentApplicant ? (
                                view === 'swipe' ? (
                                    <>
                                        <div className="flex items-center gap-3">
                                            <h2 className="text-lg font-bold text-[#f9fafb]">{currentApplicant.job_post_details?.title || 'Unknown Role'}</h2>
                                            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded bg-green-900/20 text-[#22c55e] border border-green-900/30 uppercase tracking-wider">Active</span>
                                        </div>
                                        <p className="text-sm text-[#9ca3af]">Job ID: #{currentApplicant.job_post}</p>
                                    </>
                                ) : (
                                    <>
                                        <h2 className="text-lg font-bold text-[#f9fafb]">{currentApplicant.job_seeker_details?.first_name} {currentApplicant.job_seeker_details?.last_name}</h2>
                                        <p className="text-sm text-[#9ca3af]">Applying for <span className="text-[#2563eb] font-medium">{currentApplicant.job_post_details?.title}</span></p>
                                    </>
                                )
                            ) : (
                                <h2 className="text-lg font-bold text-[#f9fafb]">No Candidates</h2>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        {view === 'swipe' ? (
                            <button onClick={() => alert("Advanced filtering coming soon")} className="px-4 py-2 rounded-lg bg-white/5 text-[#9ca3af] hover:text-[#f9fafb] text-sm font-medium border border-white/10 flex items-center gap-2 transition-colors">
                                <span className="material-symbols-outlined text-sm">tune</span>
                                Filters: High Match (&gt;80%)
                            </button>
                        ) : view === 'list' ? (
                            <div className="flex items-center gap-2">
                                <button onClick={() => openListView('shortlisted')} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${listFilter === 'shortlisted' ? 'bg-[#2563eb] text-white' : 'bg-white/5 text-[#9ca3af] border border-white/10 hover:text-[#f9fafb]'}`}>Shortlisted</button>
                                <button onClick={() => openListView('declined')} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${listFilter === 'declined' ? 'bg-red-500 text-white' : 'bg-white/5 text-[#9ca3af] border border-white/10 hover:text-[#f9fafb]'}`}>Declined</button>
                            </div>
                        ) : (
                            <>
                                <button onClick={() => alert("Share candidate coming soon")} className="text-[#9ca3af] hover:text-[#f9fafb] transition-colors">
                                    <span className="material-symbols-outlined">share</span>
                                </button>
                                <button onClick={() => alert("Download candidate data coming soon")} className="text-[#9ca3af] hover:text-[#f9fafb] transition-colors">
                                    <span className="material-symbols-outlined">download</span>
                                </button>
                            </>
                        )}
                    </div>
                </header>

                <div className="flex-1 flex overflow-hidden">
                    {/* Center Content */}
                    <div className="flex-1 overflow-y-auto flex flex-col items-center justify-start p-6 lg:p-10 scrollbar-thin">
                        {view === 'list' ? (
                            /* ===== LIST VIEW for Shortlisted/Declined ===== */
                            <div className="w-full max-w-4xl">
                                {(() => {
                                    const listApplicants = listFilter === 'shortlisted' ? shortlistedApplicants : declinedApplicants;
                                    if (listApplicants.length === 0) return (
                                        <div className="text-center py-20">
                                            <span className="material-symbols-outlined text-4xl text-white/20 mb-3">{listFilter === 'shortlisted' ? 'inventory_2' : 'block'}</span>
                                            <p className="text-[#9ca3af] text-sm">No {listFilter} candidates yet.</p>
                                        </div>
                                    );
                                    return (
                                        <div className="space-y-3">
                                            {listApplicants.map((app, idx) => {
                                                const score = aiScores[app.id];
                                                return (
                                                    <div
                                                        key={app.id}
                                                        onClick={() => viewCandidateFromList(idx)}
                                                        className="bg-white/5 rounded-2xl border border-white/10 p-5 hover:border-[#2563eb]/40 transition-colors cursor-pointer group flex items-center gap-5"
                                                    >
                                                        <div className={`w-14 h-14 rounded-2xl ${listFilter === 'shortlisted' ? 'bg-[#2563eb]' : 'bg-red-500'} flex items-center justify-center text-white font-bold text-lg shrink-0`}>
                                                            {app.job_seeker_details?.first_name?.[0] || 'J'}{app.job_seeker_details?.last_name?.[0] || 'S'}
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex items-center gap-2 mb-1">
                                                                <h3 className="text-sm font-bold text-[#f9fafb] group-hover:text-[#2563eb] transition-colors">
                                                                    {app.job_seeker_details?.first_name} {app.job_seeker_details?.last_name}
                                                                </h3>
                                                                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium border ${
                                                                    app.status === 'reviewing' ? 'bg-yellow-900/20 text-yellow-400 border-yellow-900/30' :
                                                                    app.status === 'interviewing' ? 'bg-blue-900/20 text-blue-400 border-blue-900/30' :
                                                                    'bg-red-900/20 text-red-400 border-red-900/30'
                                                                }`}>{app.status}</span>
                                                            </div>
                                                            <p className="text-xs text-[#9ca3af] truncate">
                                                                Applying for <span className="text-[#f9fafb] font-medium">{app.job_post_details?.title || 'Unknown Role'}</span>
                                                            </p>
                                                            {app.job_seeker_details?.skills && app.job_seeker_details.skills.length > 0 && (
                                                                <div className="flex flex-wrap gap-1.5 mt-2">
                                                                    {app.job_seeker_details.skills.slice(0, 4).map((s, si) => (
                                                                        <span key={si} className="text-[10px] bg-white/5 text-[#9ca3af] px-2 py-0.5 rounded-full border border-white/10">{s.name}</span>
                                                                    ))}
                                                                    {app.job_seeker_details.skills.length > 4 && (
                                                                        <span className="text-[10px] text-[#9ca3af]">+{app.job_seeker_details.skills.length - 4}</span>
                                                                    )}
                                                                </div>
                                                            )}
                                                        </div>
                                                        {score && (
                                                            <div className="text-center shrink-0">
                                                                <p className={`text-lg font-bold ${score.match_score >= 80 ? 'text-[#22c55e]' : score.match_score >= 60 ? 'text-yellow-400' : 'text-[#9ca3af]'}`}>{score.match_score}%</p>
                                                                <p className="text-[10px] text-[#9ca3af]">Match</p>
                                                            </div>
                                                        )}
                                                        <span className="material-symbols-outlined text-[#9ca3af] group-hover:text-[#2563eb] transition-colors shrink-0">chevron_right</span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    );
                                })()}
                            </div>
                        ) : loading ? (
                            <div className="flex flex-col flex-1 items-center justify-center">
                                <BlockLoader size={30} gap={4} className="mb-4" />
                                <p className="text-[#9ca3af]">Loading candidates...</p>
                            </div>
                        ) : !currentApplicant ? (
                            <div className="flex flex-col flex-1 items-center justify-center max-w-sm mx-auto text-center space-y-4">
                                <div className="w-20 h-20 rounded-full bg-gray-800 flex items-center justify-center mb-2">
                                    <span className="material-symbols-outlined text-4xl text-[#9ca3af]">inbox</span>
                                </div>
                                <h3 className="text-2xl font-bold text-[#f9fafb]">You're all caught up!</h3>
                                <p className="text-sm text-[#9ca3af]">You've reviewed all pending applications across your active job posts.</p>
                                <button onClick={() => navigate('/employer-dashboard')} className="mt-4 px-6 py-2 rounded-lg bg-[#2563eb] text-white font-medium hover:bg-[#1d4ed8]">
                                    Return to Dashboard
                                </button>
                            </div>
                        ) : view === 'swipe' ? (
                            /* ===== SWIPE CARD VIEW ===== */
                            <div className="flex flex-col items-center w-full max-w-md">
                                {/* Swipe Card */}
                                <div className="w-full bg-white/5 rounded-3xl shadow-xl overflow-hidden border border-white/10 relative transition-transform duration-300">
                                    {/* Candidate Photo placeholder */}
                                    <div className="relative h-80 bg-gradient-to-br from-indigo-900 to-gray-900 flex items-center justify-center">
                                        <span className="text-white text-6xl font-bold pb-10">
                                            {currentApplicant.job_seeker_details?.first_name?.[0] || 'A'}
                                            {currentApplicant.job_seeker_details?.last_name?.[0] || 'C'}
                                        </span>
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                                        {/* Match Badge */}
                                        <div className="absolute top-4 right-4 bg-black/90 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-1.5">
                                            <span className="material-symbols-outlined text-yellow-400 text-sm">auto_awesome</span>
                                            <span className="text-sm font-bold text-[#f9fafb]">
                                                {rankingLoading ? 'Ranking...' : currentScore ? `${currentScore.match_score}% Match` : 'Candidate'}
                                            </span>
                                        </div>
                                        {/* Name overlay */}
                                        <div className="absolute bottom-4 left-5 right-5">
                                            <h3 className="text-2xl font-bold text-white drop-shadow-lg">
                                                {currentApplicant.job_seeker_details?.first_name} {currentApplicant.job_seeker_details?.last_name}
                                            </h3>
                                            <div className="flex items-center gap-1.5 mt-1">
                                                <div className="w-2 h-2 rounded-full bg-[#22c55e]"></div>
                                                <p className="text-sm text-gray-300 drop-shadow-md">Applying for {currentApplicant.job_post_details?.title}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Card Body */}
                                    <div className="p-5 space-y-5">
                                        {/* AI Recommendation */}
                                        <div className="bg-purple-900/15 p-4 rounded-xl border border-purple-800/30">
                                            <div className="flex items-center gap-2 mb-2">
                                                <div className="w-8 h-8 rounded-full bg-purple-900/30 flex items-center justify-center">
                                                    <span className="material-symbols-outlined text-purple-400 text-sm">smart_toy</span>
                                                </div>
                                                <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider">AI Analysis</span>
                                            </div>
                                            {currentScore ? (
                                                <p className="text-sm text-[#9ca3af]">
                                                    <span className="font-bold text-[#f9fafb]">{currentScore.match_score}% match</span> — {currentScore.reason}
                                                </p>
                                            ) : (
                                                <p className="text-sm text-[#9ca3af]">Current status: <span className="font-bold text-[#f9fafb]">{currentApplicant.status}</span>. Applied on {new Date(currentApplicant.created_at).toLocaleDateString()}.</p>
                                            )}
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex items-center justify-center gap-5 pt-2 pb-2">
                                            <button onClick={() => handleStatusUpdate('rejected')} className="w-14 h-14 rounded-full bg-red-900/20 border-2 border-red-500/40 flex items-center justify-center text-red-400 hover:bg-red-900/40 hover:scale-110 transition-all shadow-lg">
                                                <span className="material-symbols-outlined text-2xl">close</span>
                                            </button>
                                            <button onClick={() => setView('profile')} className="w-11 h-11 rounded-full bg-[#2563eb]/20 border-2 border-[#2563eb]/40 flex items-center justify-center text-[#2563eb] hover:bg-[#2563eb]/30 hover:scale-110 transition-all">
                                                <span className="material-symbols-outlined text-xl">info</span>
                                            </button>
                                            <button onClick={() => handleStatusUpdate('reviewing')} className="w-14 h-14 rounded-full bg-green-900/20 border-2 border-green-500/40 flex items-center justify-center text-[#22c55e] hover:bg-green-900/40 hover:scale-110 transition-all shadow-lg">
                                                <span className="material-symbols-outlined text-2xl">check</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            /* ===== PROFILE DETAIL VIEW ===== */
                            <div className="w-full max-w-3xl">
                                {/* Profile Hero */}
                                <div className="bg-gradient-to-r from-[#2563eb]/20 to-teal-600/20 rounded-2xl p-6 mb-6 border border-white/10">
                                    <div className="flex items-start gap-5">
                                        <div className="w-24 h-24 rounded-2xl bg-black flex items-center justify-center border-2 border-white/10 shadow-lg shrink-0 overflow-hidden">
                                            <span className="text-4xl font-bold text-[#f9fafb]">
                                                {currentApplicant?.job_seeker_details?.first_name?.[0] || 'A'}
                                                {currentApplicant?.job_seeker_details?.last_name?.[0] || 'C'}
                                            </span>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-2xl font-bold text-white mb-1">
                                                {currentApplicant?.job_seeker_details?.first_name} {currentApplicant?.job_seeker_details?.last_name}
                                            </h3>
                                            <p className="text-sm text-[#9ca3af]">Applicant • Applied {new Date(currentApplicant?.created_at).toLocaleDateString()}</p>
                                            <div className="flex items-center gap-2 mt-3 text-sm text-[#f9fafb]">
                                                <span className="material-symbols-outlined text-[#2563eb] text-sm">mail</span> 
                                                Not currently showing full email for privacy reasons.
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Tabs */}
                                <div className="flex items-center gap-6 border-b border-white/10 mb-6 px-1">
                                    <button 
                                        onClick={() => setProfileTab('overview')}
                                        className={`pb-3 text-sm font-semibold transition-colors ${profileTab === 'overview' ? 'text-[#2563eb] border-b-2 border-[#2563eb]' : 'text-[#9ca3af] hover:text-[#f9fafb]'}`}>
                                        Profile Overview
                                    </button>
                                    <button 
                                        onClick={() => setProfileTab('resume')}
                                        className={`pb-3 text-sm font-semibold transition-colors ${profileTab === 'resume' ? 'text-[#2563eb] border-b-2 border-[#2563eb]' : 'text-[#9ca3af] hover:text-[#f9fafb]'}`}>
                                        Full Resume/CV
                                    </button>
                                    <button 
                                        onClick={() => setProfileTab('cover_letter')}
                                        className={`pb-3 text-sm font-semibold transition-colors ${profileTab === 'cover_letter' ? 'text-[#2563eb] border-b-2 border-[#2563eb]' : 'text-[#9ca3af] hover:text-[#f9fafb]'}`}>
                                        Cover Letter
                                    </button>
                                    <button 
                                        onClick={() => setProfileTab('portfolio')}
                                        className={`pb-3 text-sm font-semibold transition-colors ${profileTab === 'portfolio' ? 'text-[#2563eb] border-b-2 border-[#2563eb]' : 'text-[#9ca3af] hover:text-[#f9fafb]'}`}>
                                        Portfolio
                                    </button>
                                </div>

                                {profileTab === 'overview' && (
                                    <>
                                        <div className="bg-gradient-to-r from-[#2563eb]/10 to-purple-600/10 p-6 rounded-2xl border border-white/10 mb-8">
                                            <div className="flex items-center gap-2 mb-3">
                                                <span className="material-symbols-outlined text-[#2563eb]">auto_awesome</span>
                                                <h4 className="font-bold text-[#f9fafb] uppercase text-sm tracking-wide">AI-Generated Summary</h4>
                                            </div>
                                            {summaryLoading ? (
                                                <div className="flex items-center gap-2 py-2">
                                                    <BlockLoader size={14} gap={2} />
                                                    <span className="text-sm text-[#9ca3af]">Generating AI summary...</span>
                                                </div>
                                            ) : (
                                                <p className="text-sm text-[#9ca3af] leading-relaxed">
                                                    {aiSummary || 'Summary will appear here...'}
                                                </p>
                                            )}
                                        </div>

                                        {/* Work Experience */}
                                        <div className="mb-8">
                                            <div className="flex items-center gap-2 mb-5">
                                                <span className="material-symbols-outlined text-[#2563eb]">work_history</span>
                                                <h4 className="font-bold text-[#f9fafb] text-lg">Work Experience</h4>
                                            </div>
                                                <div className="relative pl-6 border-l-2 border-white/10 space-y-8">
                                                    {currentApplicant?.job_seeker_details?.experiences?.length > 0 ? (
                                                        currentApplicant.job_seeker_details.experiences.map((exp, idx) => (
                                                            <div key={exp.id || idx} className="relative">
                                                                <div className={`absolute -left-[31px] top-1 w-4 h-4 rounded-full ${idx === 0 ? 'bg-[#2563eb]' : 'bg-gray-600'} border-4 border-black`}></div>
                                                            <div className="flex items-center justify-between mb-2">
                                                                <h5 className="font-bold text-[#f9fafb]">{exp.role}</h5>
                                                                <span className={`text-xs px-2.5 py-0.5 rounded-full border font-medium ${exp.is_current ? 'bg-[#2563eb]/10 text-[#2563eb] border-[#2563eb]/30' : 'bg-gray-800 text-[#9ca3af] border-[#374151]'}`}>
                                                                    {exp.start_date?.slice(0,4)} → {exp.is_current ? 'Present' : (exp.end_date?.slice(0,4) || 'N/A')}
                                                                </span>
                                                            </div>
                                                            <p className="text-sm text-[#9ca3af] mb-1">{exp.company}</p>
                                                            {exp.duration && <p className="text-xs text-[#9ca3af]">Duration: {exp.duration}</p>}
                                                        </div>
                                                    ))
                                                ) : (
                                                    <p className="text-sm text-[#9ca3af] py-4">No work experience data available.</p>
                                                )}
                                            </div>
                                        </div>
                                    </>
                                )}

                                {profileTab === 'resume' && (
                                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 text-center mt-20">
                                        <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/10">
                                            <span className="material-symbols-outlined text-3xl text-[#9ca3af]">description</span>
                                        </div>
                                        <h4 className="text-xl font-bold text-[#f9fafb] mb-2">Resume Not Uploaded</h4>
                                        <p className="text-sm text-[#9ca3af] max-w-sm mx-auto mb-6">
                                            This candidate has not provided a PDF resume. You can review their work experience in the Profile Overview tab.
                                        </p>
                                        {currentApplicant?.job_seeker_details?.resume_file && (
                                            <a href={currentApplicant.job_seeker_details.resume_file} target="_blank" rel="noopener noreferrer" className="px-6 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-[#f9fafb] border border-white/10 inline-flex items-center gap-2 font-medium transition-colors cursor-pointer">
                                                <span className="material-symbols-outlined text-sm">download</span> Download Resume
                                            </a>
                                        )}
                                    </div>
                                )}

                                {profileTab === 'cover_letter' && (
                                    <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-8 mt-4">
                                        <h4 className="text-lg font-bold text-[#f9fafb] mb-4 flex items-center gap-2">
                                            <span className="material-symbols-outlined text-[#2563eb]">drafts</span>
                                            Cover Letter
                                        </h4>
                                        {currentApplicant?.cover_letter ? (
                                            <div className="prose prose-invert max-w-none">
                                                <p className="text-[#9ca3af] leading-relaxed whitespace-pre-wrap">
                                                    {currentApplicant.cover_letter}
                                                </p>
                                            </div>
                                        ) : (
                                            <div className="text-center py-10">
                                                <p className="text-[#9ca3af]">No cover letter was submitted for this application.</p>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {profileTab === 'portfolio' && (
                                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 mt-4">
                                       <h4 className="text-lg font-bold text-[#f9fafb] mb-6 flex items-center gap-2">
                                            <span className="material-symbols-outlined text-[#2563eb]">language</span>
                                            Portfolio Links
                                        </h4>
                                        <div className="space-y-4">
                                            {currentApplicant?.job_seeker_details?.portfolio_link ? (
                                                <a href={currentApplicant.job_seeker_details.portfolio_link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 bg-black border border-white/10 rounded-xl hover:border-[#2563eb] group transition-colors">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#2563eb]/20 group-hover:text-[#2563eb] transition-colors">
                                                            <span className="material-symbols-outlined">link</span>
                                                        </div>
                                                        <div>
                                                            <p className="font-semibold text-[#f9fafb] group-hover:text-[#2563eb] transition-colors">Personal Portfolio</p>
                                                            <p className="text-xs text-[#9ca3af] truncate max-w-xs">{currentApplicant.job_seeker_details.portfolio_link}</p>
                                                        </div>
                                                    </div>
                                                    <span className="material-symbols-outlined text-[#9ca3af] group-hover:text-[#2563eb] transition-colors">open_in_new</span>
                                                </a>
                                            ) : (
                                                <div className="text-center py-8">
                                                    <p className="text-[#9ca3af]">No portfolio available.</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}


                            </div>
                        )}
                    </div>

                    {/* Right Sidebar */}
                    <aside className="w-80 bg-white/5 border-l border-white/10 p-6 overflow-y-auto hidden xl:block shrink-0">
                        {view === 'swipe' ? (
                            /* Recruitment Queue Sidebar */
                            <>
                                <div className="flex items-center gap-2 mb-5">
                                    <span className="material-symbols-outlined text-[#2563eb]">list_alt</span>
                                    <h3 className="font-bold text-[#f9fafb] text-sm uppercase tracking-wider">Recruitment Queue</h3>
                                </div>

                                <div className="bg-black p-4 rounded-xl border border-white/10 mb-6">
                                    <div className="flex justify-between items-center mb-2">
                                        <p className="text-sm text-[#9ca3af]">Candidates Remaining</p>
                                        <span className="text-[10px] bg-white/5 text-[#9ca3af] px-2 py-0.5 rounded-full border border-white/10 font-medium">Total: {applicants.length}</span>
                                    </div>
                                    <p className="text-3xl font-bold text-[#f9fafb] mb-3">{applicants.length - currentIndex}</p>
                                    <div className="flex justify-between text-xs text-[#9ca3af] mb-1">
                                        <span>Progress</span>
                                        <span>{applicants.length > 0 ? Math.round((currentIndex / applicants.length) * 100) : 0}%</span>
                                    </div>
                                    <div className="w-full bg-gray-700 rounded-full h-1.5">
                                        <div className="bg-[#2563eb] h-1.5 rounded-full" style={{ width: `${applicants.length > 0 ? (currentIndex / applicants.length) * 100 : 0}%` }}></div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3 mb-6">
                                    <button onClick={() => openListView('shortlisted')} className="bg-black p-4 rounded-xl border border-white/10 text-center hover:border-[#22c55e]/40 transition-colors cursor-pointer">
                                        <span className="material-symbols-outlined text-[#22c55e] text-2xl mb-1">inventory_2</span>
                                        <p className="text-2xl font-bold text-[#f9fafb]">{shortlistedCount}</p>
                                        <p className="text-[10px] text-[#9ca3af] uppercase tracking-wider font-medium">Shortlisted</p>
                                    </button>
                                    <button onClick={() => openListView('declined')} className="bg-black p-4 rounded-xl border border-white/10 text-center hover:border-red-500/40 transition-colors cursor-pointer">
                                        <span className="material-symbols-outlined text-red-400 text-2xl mb-1">block</span>
                                        <p className="text-2xl font-bold text-[#f9fafb]">{declinedCount}</p>
                                        <p className="text-[10px] text-[#9ca3af] uppercase tracking-wider font-medium">Declined</p>
                                    </button>
                                </div>

                                <div className="mb-6">
                                    <div className="flex justify-between items-center mb-3">
                                        <h4 className="font-bold text-[#f9fafb] text-sm uppercase tracking-wider">Recent Shortlists</h4>
                                        <button onClick={() => openListView('shortlisted')} className="text-xs text-[#2563eb] hover:underline font-medium">View All</button>
                                    </div>
                                    <div className="space-y-3">
                                        {applicants.filter(a => a.status === 'reviewing' || a.status === 'interviewing').slice(0, 3).map((app, i) => (
                                            <div key={app.id} className="flex items-center gap-3">
                                                <div className={`w-10 h-10 rounded-full ${['bg-[#2563eb]', 'bg-purple-600', 'bg-orange-500'][i % 3]} flex items-center justify-center text-sm font-bold text-white`}>
                                                    {app.job_seeker_details?.first_name?.[0] || 'S'}{app.job_seeker_details?.last_name?.[0] || 'L'}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-semibold text-[#f9fafb] truncate">{app.job_seeker_details?.first_name} {app.job_seeker_details?.last_name}</p>
                                                    <p className="text-[10px] text-[#9ca3af] truncate">{app.job_post_details?.title}</p>
                                                </div>
                                                <span className="text-xs font-bold text-[#22c55e]">{app.status}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Pro Tip */}
                                <div className="bg-purple-900/15 p-4 rounded-xl border border-purple-800/30">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="material-symbols-outlined text-purple-400 text-sm">diamond</span>
                                        <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider">Pro Tip</span>
                                    </div>
                                    <p className="text-xs text-[#9ca3af]">Customize your <span className="font-bold text-[#f9fafb]">Matching Criteria</span> to improve AI relevance scores.</p>
                                </div>
                            </>
                        ) : (
                            /* Profile Detail Sidebar */
                            <>
                                <div className="space-y-3 mb-6">
                                    <button onClick={() => handleStatusUpdate('reviewing')} className="w-full py-3 rounded-xl bg-[#22c55e] hover:bg-green-600 text-white font-bold shadow-lg shadow-green-500/20 transition-all flex items-center justify-center gap-2">
                                        <span className="material-symbols-outlined">check</span> Shortlist
                                    </button>
                                    <button onClick={() => handleStatusUpdate('rejected')} className="w-full py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold shadow-lg shadow-red-500/20 transition-all flex items-center justify-center gap-2">
                                        <span className="material-symbols-outlined">close</span> Reject
                                    </button>
                                    <button onClick={() => handleStatusUpdate('interviewing')} className="w-full py-3 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold transition-all flex items-center justify-center gap-2">
                                        <span className="material-symbols-outlined">calendar_month</span> Schedule Interview
                                    </button>
                                    <button
                                        onClick={async () => {
                                            if (!currentApplicant?.job_seeker_details?.id) return;
                                            try {
                                                const thread = await messagingService.createThread(
                                                    currentApplicant.job_seeker_details.id,
                                                    user?.id
                                                );
                                                navigate('/employer-messages', { state: { threadId: thread.id } });
                                            } catch (err) {
                                                console.error('Failed to create thread:', err);
                                                // If thread already exists, the backend may return it — navigate anyway
                                                navigate('/employer-messages');
                                            }
                                        }}
                                        className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-[#f9fafb] font-medium border border-white/10 transition-all flex items-center justify-center gap-2 text-sm"
                                    >
                                        <span className="material-symbols-outlined text-sm">mail</span> Send Message
                                    </button>
                                </div>

                                {/* Match Breakdown */}
                                <div className="mb-6">
                                    <div className="flex justify-between items-center mb-4">
                                        <h4 className="font-bold text-[#f9fafb] text-sm uppercase tracking-wider">Application Detail</h4>
                                        <span className={`text-sm font-bold ${currentApplicant?.status === 'rejected' ? 'text-red-500' : 'text-[#22c55e]'}`}>{currentApplicant?.status || 'Active'}</span>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex items-start gap-3 bg-black p-3 rounded-xl border border-white/10">
                                            <span className="material-symbols-outlined text-[#22c55e]">check_circle</span>
                                            <div>
                                                <p className="text-sm font-semibold text-[#f9fafb]">Submission Status</p>
                                                <p className="text-xs text-[#9ca3af]">Current Stage: {currentApplicant?.status}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Internal Notes */}
                                <div>
                                    <div className="flex justify-between items-center mb-4">
                                        <h4 className="font-bold text-[#f9fafb] text-sm uppercase tracking-wider">Internal Notes</h4>
                                        <span className="text-[10px] bg-white/5 text-[#9ca3af] px-2 py-0.5 rounded-full border border-white/10 font-medium">Team Only</span>
                                    </div>
                                    <div className="space-y-4 mb-4">
                                        <div className="flex items-start gap-3">
                                            <div className="w-8 h-8 rounded-full bg-[#2563eb] flex items-center justify-center text-xs font-bold text-white shrink-0">JS</div>
                                            <div className="flex-1 bg-[#111827] p-3 rounded-xl border border-[#374151]">
                                                <div className="flex justify-between mb-1">
                                                    <span className="text-xs font-semibold text-[#f9fafb]">Jane Smith</span>
                                                    <span className="text-[10px] text-[#9ca3af]">2h ago</span>
                                                </div>
                                                <p className="text-xs text-[#9ca3af]">Strong portfolio. I'm impressed by the design system documentation. Definitely want to ask about their process for developer handoff.</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-xs font-bold text-white shrink-0">MR</div>
                                            <div className="flex-1 bg-[#111827] p-3 rounded-xl border border-[#374151]">
                                                <div className="flex justify-between mb-1">
                                                    <span className="text-xs font-semibold text-[#f9fafb]">Mike Ross</span>
                                                    <span className="text-[10px] text-[#9ca3af]">5h ago</span>
                                                </div>
                                                <p className="text-xs text-[#9ca3af]">Looks good, but salary expectation is on the higher end of our budget.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <input type="text" placeholder="Add a note..." className="flex-1 h-10 rounded-xl bg-black border border-white/10 text-[#f9fafb] px-4 text-sm placeholder:text-gray-500 focus:border-[#2563eb] focus:ring focus:ring-[#2563eb]/30 outline-none transition" onKeyDown={(e) => { if (e.key === 'Enter') alert('Notes feature coming soon'); }} />
                                        <button onClick={() => alert("Notes feature coming soon")} className="w-10 h-10 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white flex items-center justify-center transition-colors">
                                            <span className="material-symbols-outlined text-sm">send</span>
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </aside>
                </div>
            </main>
        </div>
    );
};

export default EmployerCandidates;

