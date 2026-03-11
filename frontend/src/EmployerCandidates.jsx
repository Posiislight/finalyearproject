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
        <div className="bg-black text-white font-['Geist_Sans',sans-serif] antialiased h-screen flex overflow-hidden">
            {/* Sidebar */}
            <EmployerSidebar />

            {/* Main Content */}
            <main className="flex-1 flex flex-col h-full overflow-hidden relative bg-black">
                {/* Header */}
                <header className="flex items-center justify-between px-10 py-8 shrink-0">
                    <div className="flex items-center gap-4">
                        {(view === 'profile' || view === 'list') && (
                            <button onClick={() => { setView('swipe'); setProfileTab('overview'); }} className="text-neutral-500 hover:text-white transition-colors">
                                <span className="material-symbols-outlined text-[20px]">arrow_back</span>
                            </button>
                        )}
                        <div>
                            {view === 'list' ? (
                                <>
                                    <h2 className="text-3xl font-light tracking-tight text-white mb-1">{listFilter === 'shortlisted' ? 'Shortlisted' : 'Declined'} Candidates</h2>
                                    <p className="text-sm text-neutral-500 font-medium tracking-wide">{listFilter === 'shortlisted' ? shortlistedCount : declinedCount} candidates</p>
                                </>
                            ) : currentApplicant ? (
                                view === 'swipe' ? (
                                    <>
                                        <div className="flex items-center gap-3 mb-1">
                                            <h2 className="text-3xl font-light tracking-tight text-white">{currentApplicant.job_post_details?.title || 'Unknown Role'}</h2>
                                            <span className="text-[10px] font-bold px-2 py-1 rounded bg-neutral-900 text-blue-500 uppercase tracking-widest">Active</span>
                                        </div>
                                        <p className="text-sm text-neutral-500 font-medium tracking-wide">Job ID: #{currentApplicant.job_post}</p>
                                    </>
                                ) : (
                                    <>
                                        <h2 className="text-3xl font-light tracking-tight text-white mb-1">{currentApplicant.job_seeker_details?.first_name} {currentApplicant.job_seeker_details?.last_name}</h2>
                                        <p className="text-sm text-neutral-500 font-medium tracking-wide">Applying for <span className="text-white font-medium">{currentApplicant.job_post_details?.title}</span></p>
                                    </>
                                )
                            ) : (
                                <h2 className="text-3xl font-light tracking-tight text-white">No Candidates</h2>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center gap-6">
                        {view === 'swipe' ? (
                            <button onClick={() => alert("Advanced filtering coming soon")} className="px-5 py-2.5 rounded-full bg-neutral-900 text-neutral-400 hover:text-white text-sm font-medium flex items-center gap-2 transition-colors">
                                <span className="material-symbols-outlined text-sm">tune</span>
                                Filters: High Match (&gt;80%)
                            </button>
                        ) : view === 'list' ? (
                            <div className="flex items-center gap-1 bg-neutral-900 p-1 rounded-xl">
                                <button onClick={() => openListView('shortlisted')} className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors ${listFilter === 'shortlisted' ? 'bg-neutral-800 text-white shadow-sm' : 'text-neutral-500 hover:text-white'}`}>Shortlisted</button>
                                <button onClick={() => openListView('declined')} className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors ${listFilter === 'declined' ? 'bg-neutral-800 text-white shadow-sm' : 'text-neutral-500 hover:text-white'}`}>Declined</button>
                            </div>
                        ) : (
                            <>
                                <button onClick={() => alert("Share candidate coming soon")} className="text-neutral-500 hover:text-white transition-colors relative">
                                    <span className="material-symbols-outlined text-[20px]">share</span>
                                </button>
                                <button onClick={() => alert("Download candidate data coming soon")} className="text-neutral-500 hover:text-white transition-colors relative border-l border-neutral-800 pl-4">
                                    <span className="material-symbols-outlined text-[20px]">download</span>
                                </button>
                            </>
                        )}
                    </div>
                </header>

                <div className="flex-1 flex overflow-hidden px-10 pb-10">
                    {/* Center Content */}
                    <div className="flex-1 overflow-y-auto flex flex-col items-center justify-start pr-10 scrollbar-thin">
                        {view === 'list' ? (
                            /* ===== LIST VIEW for Shortlisted/Declined ===== */
                            <div className="w-full max-w-4xl mt-4">
                                {(() => {
                                    const listApplicants = listFilter === 'shortlisted' ? shortlistedApplicants : declinedApplicants;
                                    if (listApplicants.length === 0) return (
                                        <div className="text-center py-20">
                                            <span className="material-symbols-outlined text-[40px] text-neutral-800 mb-4">{listFilter === 'shortlisted' ? 'inventory_2' : 'block'}</span>
                                            <p className="text-neutral-500 font-medium">No {listFilter} candidates yet.</p>
                                        </div>
                                    );
                                    return (
                                        <div className="space-y-4">
                                            {listApplicants.map((app, idx) => {
                                                const score = aiScores[app.id];
                                                return (
                                                    <div
                                                        key={app.id}
                                                        onClick={() => viewCandidateFromList(idx)}
                                                        className="bg-[#0a0a0a] rounded-2xl border border-neutral-900 p-5 hover:bg-neutral-900/30 transition-colors cursor-pointer group flex items-center gap-5"
                                                    >
                                                        <div className={`w-14 h-14 rounded-full ${listFilter === 'shortlisted' ? 'bg-blue-600/10 text-blue-500 font-medium' : 'bg-red-500/10 text-red-500 font-medium'} flex items-center justify-center text-lg shrink-0`}>
                                                            {app.job_seeker_details?.first_name?.[0] || 'J'}{app.job_seeker_details?.last_name?.[0] || 'S'}
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex items-center gap-3 mb-1.5">
                                                                <h3 className="text-base font-medium text-white group-hover:text-blue-500 transition-colors">
                                                                    {app.job_seeker_details?.first_name} {app.job_seeker_details?.last_name}
                                                                </h3>
                                                                <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-widest ${
                                                                    app.status === 'reviewing' ? 'bg-neutral-900 text-yellow-500' :
                                                                    app.status === 'interviewing' ? 'bg-neutral-900 text-blue-500' :
                                                                    'bg-neutral-900 text-red-500'
                                                                }`}>{app.status}</span>
                                                            </div>
                                                            <p className="text-sm text-neutral-500 truncate font-medium">
                                                                Applying for <span className="text-white font-medium">{app.job_post_details?.title || 'Unknown Role'}</span>
                                                            </p>
                                                            {app.job_seeker_details?.skills && app.job_seeker_details.skills.length > 0 && (
                                                                <div className="flex flex-wrap gap-2 mt-3">
                                                                    {app.job_seeker_details.skills.slice(0, 4).map((s, si) => (
                                                                        <span key={si} className="text-[10px] bg-neutral-900 text-neutral-400 px-2 py-1 rounded font-medium uppercase tracking-widest">{s.name}</span>
                                                                    ))}
                                                                    {app.job_seeker_details.skills.length > 4 && (
                                                                        <span className="text-[10px] text-neutral-500 font-semibold px-1 py-1">+{app.job_seeker_details.skills.length - 4}</span>
                                                                    )}
                                                                </div>
                                                            )}
                                                        </div>
                                                        {score && (
                                                            <div className="text-center shrink-0 w-20">
                                                                <p className={`text-xl font-light tracking-tight ${score.match_score >= 80 ? 'text-green-500' : score.match_score >= 60 ? 'text-yellow-500' : 'text-neutral-500'}`}>{score.match_score}%</p>
                                                                <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-semibold">Match</p>
                                                            </div>
                                                        )}
                                                        <span className="material-symbols-outlined text-neutral-600 group-hover:text-blue-500 transition-colors shrink-0">chevron_right</span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    );
                                })()}
                            </div>
                        ) : loading ? (
                            <div className="flex flex-col flex-1 items-center justify-center">
                                <BlockLoader size={24} gap={3} className="mb-6" />
                                <p className="text-neutral-500 font-medium text-sm">Loading candidates...</p>
                            </div>
                        ) : !currentApplicant ? (
                            <div className="flex flex-col flex-1 items-center justify-center max-w-sm mx-auto text-center space-y-5">
                                <div className="w-20 h-20 rounded-full bg-neutral-900 flex items-center justify-center mb-2">
                                    <span className="material-symbols-outlined text-[32px] text-neutral-500">inbox</span>
                                </div>
                                <h3 className="text-3xl font-light tracking-tight text-white">You're caught up</h3>
                                <p className="text-sm text-neutral-500 font-medium leading-relaxed">You've reviewed all pending applications across your active job posts.</p>
                                <button onClick={() => navigate('/employer-dashboard')} className="mt-6 px-6 py-2.5 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors">
                                    Return to Dashboard
                                </button>
                            </div>
                        ) : view === 'swipe' ? (
                            /* ===== SWIPE CARD VIEW ===== */
                            <div className="flex flex-col items-center w-full max-w-md mt-4">
                                {/* Swipe Card */}
                                <div className="w-full bg-[#0a0a0a] rounded-3xl shadow-2xl overflow-hidden border border-neutral-900 relative transition-transform duration-300">
                                    {/* Candidate Photo placeholder */}
                                    <div className="relative h-80 bg-neutral-900 flex items-center justify-center">
                                        <span className="text-white text-6xl font-light tracking-tight pb-10">
                                            {currentApplicant.job_seeker_details?.first_name?.[0] || 'A'}
                                            {currentApplicant.job_seeker_details?.last_name?.[0] || 'C'}
                                        </span>
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent"></div>
                                        {/* Match Badge */}
                                        <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded bg-neutral-900 text-blue-500 font-medium uppercase tracking-widest text-[10px] flex items-center gap-1.5">
                                            <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
                                            <span>
                                                {rankingLoading ? 'Ranking...' : currentScore ? `${currentScore.match_score}% Match` : 'Candidate'}
                                            </span>
                                        </div>
                                        {/* Name overlay */}
                                        <div className="absolute bottom-6 left-6 right-6">
                                            <h3 className="text-3xl font-light tracking-tight text-white mb-2">
                                                {currentApplicant.job_seeker_details?.first_name} {currentApplicant.job_seeker_details?.last_name}
                                            </h3>
                                            <div className="flex items-center gap-1.5 mt-1">
                                                <div className={`w-2 h-2 rounded-full ${currentApplicant.status === 'reviewing' ? 'bg-yellow-500' : currentApplicant.status === 'interviewing' ? 'bg-blue-500' : currentApplicant.status === 'rejected' ? 'bg-red-500' : 'bg-green-500'}`}></div>
                                                <p className="text-sm text-neutral-400 font-medium">Applying for <span className="text-white">{currentApplicant.job_post_details?.title}</span></p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Card Body */}
                                    <div className="p-6 space-y-6">
                                        {/* AI Recommendation */}
                                        <div className="bg-neutral-900/50 p-5 rounded-2xl border border-neutral-800">
                                            <div className="flex items-center gap-2 mb-3">
                                                <div className="w-6 h-6 rounded-full bg-blue-600/20 flex items-center justify-center">
                                                    <span className="material-symbols-outlined text-blue-500 text-[14px]">smart_toy</span>
                                                </div>
                                                <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">AI Analysis</span>
                                            </div>
                                            {currentScore ? (
                                                <p className="text-sm text-neutral-400 leading-relaxed font-medium">
                                                    <span className="font-semibold text-white">{currentScore.match_score}% match</span> — {currentScore.reason}
                                                </p>
                                            ) : (
                                                <p className="text-sm text-neutral-400 leading-relaxed font-medium">Current status: <span className="font-semibold text-white capitalize">{currentApplicant.status}</span>. Applied on {new Date(currentApplicant.created_at).toLocaleDateString()}.</p>
                                            )}
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex items-center justify-center gap-6 pt-2 pb-2">
                                            <button onClick={() => handleStatusUpdate('rejected')} className="w-16 h-16 rounded-full bg-[#0a0a0a] border border-neutral-800 flex items-center justify-center text-neutral-500 hover:text-red-500 hover:border-red-500/50 hover:bg-red-500/10 transition-all shadow-sm">
                                                <span className="material-symbols-outlined text-3xl">close</span>
                                            </button>
                                            <button onClick={() => setView('profile')} className="w-12 h-12 rounded-full bg-[#0a0a0a] border border-neutral-800 flex items-center justify-center text-neutral-500 hover:text-blue-500 hover:border-blue-500/50 hover:bg-blue-500/10 transition-all shadow-sm">
                                                <span className="material-symbols-outlined text-xl">info</span>
                                            </button>
                                            <button onClick={() => handleStatusUpdate('reviewing')} className="w-16 h-16 rounded-full bg-[#0a0a0a] border border-neutral-800 flex items-center justify-center text-neutral-500 hover:text-green-500 hover:border-green-500/50 hover:bg-green-500/10 transition-all shadow-sm">
                                                <span className="material-symbols-outlined text-3xl">check</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            /* ===== PROFILE DETAIL VIEW ===== */
                            <div className="w-full max-w-4xl mt-4">
                                {/* Profile Hero */}
                                <div className="bg-[#0a0a0a] rounded-3xl p-8 border border-neutral-900 mb-8 relative overflow-hidden">
                                     <div className="absolute top-0 left-0 w-2 h-full bg-blue-600"></div>
                                    <div className="flex items-start gap-6">
                                        <div className="w-28 h-28 rounded-full bg-neutral-900 flex items-center justify-center shrink-0">
                                            <span className="text-4xl font-light text-white">
                                                {currentApplicant?.job_seeker_details?.first_name?.[0] || 'A'}
                                                {currentApplicant?.job_seeker_details?.last_name?.[0] || 'C'}
                                            </span>
                                        </div>
                                        <div className="flex-1 pt-2">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <h3 className="text-3xl font-light tracking-tight text-white mb-2">
                                                        {currentApplicant?.job_seeker_details?.first_name} {currentApplicant?.job_seeker_details?.last_name}
                                                    </h3>
                                                    <p className="text-sm text-neutral-500 font-medium">Applicant • Applied {new Date(currentApplicant?.created_at).toLocaleDateString()}</p>
                                                </div>
                                                <span className={`text-[10px] px-3 py-1 rounded font-bold uppercase tracking-widest ${
                                                    currentApplicant?.status === 'reviewing' ? 'bg-neutral-900 text-yellow-500' :
                                                    currentApplicant?.status === 'interviewing' ? 'bg-neutral-900 text-blue-500' :
                                                    currentApplicant?.status === 'rejected' ? 'bg-neutral-900 text-red-500' :
                                                    'bg-neutral-900 text-green-500'
                                                }`}>{currentApplicant?.status || 'Active'}</span>
                                            </div>
                                            <div className="flex flex-wrap gap-2 mt-4 text-sm text-neutral-400 font-medium">
                                                <span className="flex items-center gap-1.5">
                                                    <span className="material-symbols-outlined text-[16px] text-neutral-500">mail</span> 
                                                    Contact hidden for privacy
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Tabs */}
                                <div className="flex items-center gap-8 border-b border-neutral-900 mb-8 px-2">
                                    <button 
                                        onClick={() => setProfileTab('overview')}
                                        className={`pb-4 text-sm font-semibold tracking-wide transition-colors relative ${profileTab === 'overview' ? 'text-white' : 'text-neutral-500 hover:text-white'}`}>
                                        Overview
                                        {profileTab === 'overview' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"></span>}
                                    </button>
                                    <button 
                                        onClick={() => setProfileTab('resume')}
                                        className={`pb-4 text-sm font-semibold tracking-wide transition-colors relative ${profileTab === 'resume' ? 'text-white' : 'text-neutral-500 hover:text-white'}`}>
                                        Resume / CV
                                        {profileTab === 'resume' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"></span>}
                                    </button>
                                    <button 
                                        onClick={() => setProfileTab('cover_letter')}
                                        className={`pb-4 text-sm font-semibold tracking-wide transition-colors relative ${profileTab === 'cover_letter' ? 'text-white' : 'text-neutral-500 hover:text-white'}`}>
                                        Cover Letter
                                        {profileTab === 'cover_letter' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"></span>}
                                    </button>
                                    <button 
                                        onClick={() => setProfileTab('portfolio')}
                                        className={`pb-4 text-sm font-semibold tracking-wide transition-colors relative ${profileTab === 'portfolio' ? 'text-white' : 'text-neutral-500 hover:text-white'}`}>
                                        Portfolio
                                        {profileTab === 'portfolio' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"></span>}
                                    </button>
                                </div>

                                {profileTab === 'overview' && (
                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-10">
                                        <div className="lg:col-span-2 space-y-8">
                                            {/* AI Summary */}
                                            <div className="bg-[#0a0a0a] p-6 rounded-2xl border border-neutral-900">
                                                <div className="flex items-center gap-2 mb-4">
                                                    <span className="material-symbols-outlined text-blue-500 text-[20px]">auto_awesome</span>
                                                    <h4 className="font-medium text-white text-base">AI Summary</h4>
                                                </div>
                                                {summaryLoading ? (
                                                    <div className="flex items-center gap-3 py-4">
                                                        <BlockLoader size={16} gap={2} />
                                                        <span className="text-sm text-neutral-500 font-medium">Analyzing profile...</span>
                                                    </div>
                                                ) : (
                                                    <p className="text-sm text-neutral-400 leading-relaxed font-medium">
                                                        {aiSummary || 'Summary will appear here...'}
                                                    </p>
                                                )}
                                            </div>

                                            {/* Work Experience */}
                                            <div>
                                                <div className="flex items-center gap-2 mb-6 px-1">
                                                    <span className="material-symbols-outlined text-neutral-500 text-[20px]">work_history</span>
                                                    <h4 className="font-medium text-white text-lg">Experience</h4>
                                                </div>
                                                {currentApplicant?.job_seeker_details?.experiences?.length > 0 ? (
                                                    <div className="space-y-4">
                                                         {currentApplicant.job_seeker_details.experiences.map((exp, idx) => (
                                                             <div key={exp.id || idx} className="bg-[#0a0a0a] p-6 rounded-2xl border border-neutral-900">
                                                                <div className="flex items-start justify-between mb-2">
                                                                    <div>
                                                                        <h5 className="font-medium text-white text-base mb-1">{exp.role}</h5>
                                                                        <p className="text-sm text-blue-500 font-medium">{exp.company}</p>
                                                                    </div>
                                                                    <div className="text-right">
                                                                        <span className={`text-[10px] px-2 py-1 rounded font-bold uppercase tracking-widest ${exp.is_current ? 'bg-neutral-900 text-blue-500' : 'text-neutral-500'}`}>
                                                                            {exp.start_date?.slice(0,4)} — {exp.is_current ? 'Present' : (exp.end_date?.slice(0,4) || 'N/A')}
                                                                        </span>
                                                                        {exp.duration && <p className="text-xs text-neutral-600 mt-1 font-medium">{exp.duration}</p>}
                                                                    </div>
                                                                </div>
                                                             </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <div className="bg-[#0a0a0a] p-8 rounded-2xl border border-neutral-900 text-center">
                                                        <p className="text-sm text-neutral-500 font-medium">No experience listed.</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        
                                        <div className="space-y-8">
                                            {/* Skills */}
                                            {currentApplicant?.job_seeker_details?.skills && currentApplicant.job_seeker_details.skills.length > 0 && (
                                                <div className="bg-[#0a0a0a] p-6 rounded-2xl border border-neutral-900">
                                                    <h4 className="font-medium text-white text-base mb-4">Top Skills</h4>
                                                    <div className="flex flex-wrap gap-2">
                                                        {currentApplicant.job_seeker_details.skills.map((s, si) => (
                                                            <span key={si} className="text-xs bg-neutral-900 text-neutral-400 px-3 py-1.5 rounded-lg font-medium">{s.name}</span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                            
                                            {/* Side Info */}
                                            <div className="bg-[#0a0a0a] p-6 rounded-2xl border border-neutral-900 space-y-4">
                                                <div>
                                                    <p className="text-xs text-neutral-500 uppercase tracking-widest font-semibold mb-1">Location</p>
                                                    <p className="text-sm text-white font-medium">{currentApplicant?.job_seeker_details?.location || 'Not specified'}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-neutral-500 uppercase tracking-widest font-semibold mb-1">Applied For</p>
                                                    <p className="text-sm text-blue-500 font-medium">{currentApplicant?.job_post_details?.title}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {profileTab === 'resume' && (
                                    <div className="bg-[#0a0a0a] border border-neutral-900 rounded-3xl p-12 text-center mt-8">
                                        <div className="w-20 h-20 bg-neutral-900 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <span className="material-symbols-outlined text-[32px] text-neutral-500">description</span>
                                        </div>
                                        <h4 className="text-2xl font-light tracking-tight text-white mb-3">Resume Not Uploaded</h4>
                                        <p className="text-sm text-neutral-500 font-medium max-w-md mx-auto mb-8 leading-relaxed">
                                            This candidate has not provided a PDF resume. You can review their work experience in the Profile Overview tab.
                                        </p>
                                        {currentApplicant?.job_seeker_details?.resume_file && (
                                            <a href={currentApplicant.job_seeker_details.resume_file} target="_blank" rel="noopener noreferrer" className="px-8 py-3 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white font-semibold transition-colors inline-flex items-center gap-2">
                                                <span className="material-symbols-outlined text-[18px]">download</span> Download Resume
                                            </a>
                                        )}
                                    </div>
                                )}

                                {profileTab === 'cover_letter' && (
                                    <div className="bg-[#0a0a0a] border border-neutral-900 rounded-3xl p-10 mt-8">
                                        <h4 className="text-xl font-medium text-white mb-6 flex items-center gap-3">
                                            <span className="material-symbols-outlined text-blue-500">drafts</span>
                                            Cover Letter
                                        </h4>
                                        {currentApplicant?.cover_letter ? (
                                            <div className="prose prose-invert max-w-none prose-p:text-neutral-400 prose-p:font-medium prose-p:leading-relaxed">
                                                <p className="whitespace-pre-wrap">
                                                    {currentApplicant.cover_letter}
                                                </p>
                                            </div>
                                        ) : (
                                            <div className="text-center py-16">
                                                <p className="text-neutral-500 font-medium">No cover letter was submitted for this application.</p>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {profileTab === 'portfolio' && (
                                    <div className="bg-[#0a0a0a] border border-neutral-900 rounded-3xl p-10 mt-8">
                                       <h4 className="text-xl font-medium text-white mb-8 flex items-center gap-3">
                                            <span className="material-symbols-outlined text-blue-500">language</span>
                                            Portfolio Links
                                        </h4>
                                        <div className="space-y-4">
                                            {currentApplicant?.job_seeker_details?.portfolio_link ? (
                                                <a href={currentApplicant.job_seeker_details.portfolio_link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-6 bg-black border border-neutral-900 rounded-2xl hover:border-blue-500/50 group transition-colors">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-12 h-12 rounded-full bg-neutral-900 flex items-center justify-center group-hover:bg-blue-600/10 group-hover:text-blue-500 transition-colors">
                                                            <span className="material-symbols-outlined text-[20px]">link</span>
                                                        </div>
                                                        <div>
                                                            <p className="font-semibold text-white group-hover:text-blue-500 transition-colors mb-1">Personal Portfolio</p>
                                                            <p className="text-sm text-neutral-500 font-medium truncate max-w-sm">{currentApplicant.job_seeker_details.portfolio_link}</p>
                                                        </div>
                                                    </div>
                                                    <span className="material-symbols-outlined text-neutral-600 group-hover:text-blue-500 transition-colors">open_in_new</span>
                                                </a>
                                            ) : (
                                                <div className="text-center py-12">
                                                    <p className="text-neutral-500 font-medium">No portfolio link provided.</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}


                            </div>
                        )}
                    </div>

                    {/* Right Sidebar */}
                    <aside className="w-80 bg-[#0a0a0a] border-l border-neutral-900 rounded-tl-3xl p-6 overflow-y-auto hidden xl:block shrink-0">
                        {view === 'swipe' ? (
                            /* Recruitment Queue Sidebar */
                            <>
                                <div className="flex items-center gap-2 mb-6">
                                    <span className="material-symbols-outlined text-blue-500 text-[20px]">list_alt</span>
                                    <h3 className="font-semibold text-white text-sm uppercase tracking-widest">Pipeline</h3>
                                </div>

                                <div className="bg-black p-5 rounded-2xl border border-neutral-900 mb-6">
                                    <div className="flex justify-between items-center mb-3">
                                        <p className="text-xs text-neutral-500 uppercase tracking-widest font-semibold">Remaining</p>
                                        <span className="text-[10px] bg-neutral-900 text-neutral-400 px-2 py-1 rounded font-bold uppercase tracking-widest">Total {applicants.length}</span>
                                    </div>
                                    <p className="text-4xl font-light tracking-tight text-white mb-4">{applicants.length - currentIndex}</p>
                                    <div className="flex justify-between text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-2">
                                        <span>Progress</span>
                                        <span>{applicants.length > 0 ? Math.round((currentIndex / applicants.length) * 100) : 0}%</span>
                                    </div>
                                    <div className="w-full bg-neutral-900 rounded-full h-1">
                                        <div className="bg-blue-600 h-1 rounded-full transition-all duration-300" style={{ width: `${applicants.length > 0 ? (currentIndex / applicants.length) * 100 : 0}%` }}></div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3 mb-8">
                                    <button onClick={() => openListView('shortlisted')} className="bg-black p-5 rounded-2xl border border-neutral-900 text-center hover:bg-neutral-900/50 transition-colors cursor-pointer flex flex-col items-center">
                                        <span className="material-symbols-outlined text-blue-500 text-[24px] mb-2">inventory_2</span>
                                        <p className="text-2xl font-light tracking-tight text-white mb-1">{shortlistedCount}</p>
                                        <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-semibold">Shortlist</p>
                                    </button>
                                    <button onClick={() => openListView('declined')} className="bg-black p-5 rounded-2xl border border-neutral-900 text-center hover:bg-neutral-900/50 transition-colors cursor-pointer flex flex-col items-center">
                                        <span className="material-symbols-outlined text-neutral-500 text-[24px] mb-2">block</span>
                                        <p className="text-2xl font-light tracking-tight text-white mb-1">{declinedCount}</p>
                                        <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-semibold">Declined</p>
                                    </button>
                                </div>

                                <div className="mb-8">
                                    <div className="flex justify-between items-center mb-4">
                                        <h4 className="font-semibold text-white text-sm uppercase tracking-widest">Recent Activity</h4>
                                        <button onClick={() => openListView('shortlisted')} className="text-xs text-blue-500 hover:text-blue-400 font-semibold uppercase tracking-widest">View All</button>
                                    </div>
                                    <div className="space-y-4">
                                        {applicants.filter(a => a.status === 'reviewing' || a.status === 'interviewing').slice(0, 3).map((app, i) => (
                                            <div key={app.id} className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center text-sm font-medium text-white shrink-0">
                                                    {app.job_seeker_details?.first_name?.[0] || 'S'}{app.job_seeker_details?.last_name?.[0] || 'L'}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-white truncate mb-0.5">{app.job_seeker_details?.first_name} {app.job_seeker_details?.last_name}</p>
                                                    <p className="text-xs text-neutral-500 truncate font-medium">{app.job_post_details?.title}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Pro Tip */}
                                <div className="bg-blue-600/5 p-5 rounded-2xl border border-blue-600/10">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="material-symbols-outlined text-blue-500 text-[16px]">lightbulb</span>
                                        <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">Tip</span>
                                    </div>
                                    <p className="text-xs text-neutral-400 font-medium leading-relaxed">Customize your <span className="font-semibold text-white">Matching Criteria</span> to improve AI relevance scores.</p>
                                </div>
                            </>
                        ) : (
                            /* Profile Detail Sidebar */
                            <>
                                <div className="space-y-3 mb-8">
                                    <button onClick={() => handleStatusUpdate('reviewing')} className="w-full py-3.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-yellow-500 font-semibold transition-all flex items-center justify-center gap-2 border border-yellow-500/10 hover:border-yellow-500/30 text-sm">
                                        <span className="material-symbols-outlined text-[18px]">bookmark_add</span> Shortlist
                                    </button>
                                    <button onClick={() => handleStatusUpdate('rejected')} className="w-full py-3.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-red-500 font-semibold transition-all flex items-center justify-center gap-2 border border-red-500/10 hover:border-red-500/30 text-sm">
                                        <span className="material-symbols-outlined text-[18px]">close</span> Decline
                                    </button>
                                    <button onClick={() => handleStatusUpdate('interviewing')} className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 text-sm">
                                        <span className="material-symbols-outlined text-[18px]">event</span> Set Interview
                                    </button>
                                    <div className="pt-2">
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
                                            className="w-full py-3.5 rounded-xl bg-black hover:bg-neutral-900 text-white font-semibold border border-neutral-800 transition-all flex items-center justify-center gap-2 text-sm"
                                        >
                                            <span className="material-symbols-outlined text-[18px]">mail</span> Message Leticia
                                        </button>
                                    </div>
                                </div>

                                {/* Internal Notes */}
                                <div>
                                    <div className="flex justify-between items-center mb-5">
                                        <h4 className="font-semibold text-white text-sm uppercase tracking-widest">Team Notes</h4>
                                        <span className="text-[10px] bg-neutral-900 text-neutral-400 px-2 py-1 rounded font-bold uppercase tracking-widest">Internal</span>
                                    </div>
                                    <div className="space-y-4 mb-4">
                                        <div className="flex items-start gap-4">
                                            <div className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-xs font-medium text-white shrink-0">JS</div>
                                            <div className="flex-1">
                                                <div className="flex justify-between mb-1 items-center">
                                                    <span className="text-xs font-semibold text-white">Jane Smith</span>
                                                    <span className="text-[10px] text-neutral-600 font-semibold uppercase tracking-widest">2h ago</span>
                                                </div>
                                                <div className="bg-black p-4 rounded-b-2xl rounded-tr-2xl border border-neutral-900">
                                                    <p className="text-xs text-neutral-400 font-medium leading-relaxed">Strong portfolio. I'm impressed by the design system documentation. Definitely want to ask about their process for developer handoff.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <input type="text" placeholder="Add a note..." className="flex-1 h-11 rounded-xl bg-black border border-neutral-800 text-white px-4 text-sm font-medium placeholder:text-neutral-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition" onKeyDown={(e) => { if (e.key === 'Enter') alert('Notes feature coming soon'); }} />
                                        <button onClick={() => alert("Notes feature coming soon")} className="w-11 h-11 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white flex items-center justify-center transition-colors shrink-0 border border-neutral-800">
                                            <span className="material-symbols-outlined text-[18px]">send</span>
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

