import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import JobSeekerBottomNav from './JobSeekerBottomNav';
import { jobSeekerService } from './services/jobSeekerService';

const SLIDE_DURATION = 400; // ms

const JobSeekerHome = () => {
    const navigate = useNavigate();
    const [jobs, setJobs] = useState([]);
    const [currentCard, setCurrentCard] = useState(0);
    const [showApplyModal, setShowApplyModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [showNotifModal, setShowNotifModal] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [loading, setLoading] = useState(true);
    const [savedJobs, setSavedJobs] = useState(new Set());

    // Filters
    const [selectedFilters, setSelectedFilters] = useState(new Set());
    const [allJobs, setAllJobs] = useState([]);

    // Animation
    const [slideDir, setSlideDir] = useState(null); // 'up' | 'down' | null
    const [animating, setAnimating] = useState(false);

    // AI state
    const [matchScores, setMatchScores] = useState({});
    const [coverLetter, setCoverLetter] = useState('');
    const [coverLetterLoading, setCoverLetterLoading] = useState(false);
    const [matchLoading, setMatchLoading] = useState(false);

    // Scroll ref
    const cardRef = useRef(null);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const data = await jobSeekerService.getJobFeed();
                setAllJobs(data);
                setJobs(data);
            } catch (error) {
                console.error('Failed to fetch jobs:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchJobs();
    }, []);

    // Filter logic — match selected keywords against job text
    const applyFilters = () => {
        if (selectedFilters.size === 0) {
            setJobs(allJobs);
        } else {
            const filtered = allJobs.filter(j => {
                const text = `${j.title} ${j.description} ${j.requirements} ${j.location} ${j.salary}`.toLowerCase();
                return [...selectedFilters].every(f => text.includes(f.toLowerCase()));
            });
            setJobs(filtered);
        }
        setCurrentCard(0);
        setShowFilterModal(false);
    };

    const toggleFilter = (value) => {
        setSelectedFilters(prev => {
            const next = new Set(prev);
            if (next.has(value)) next.delete(value);
            else next.add(value);
            return next;
        });
    };

    const clearFilters = () => {
        setSelectedFilters(new Set());
        setJobs(allJobs);
        setCurrentCard(0);
        setShowFilterModal(false);
    };

    const job = jobs[currentCard];

    const fetchMatchScore = useCallback(async (jobObj) => {
        if (!jobObj || matchScores[jobObj.id]) return;
        setMatchLoading(true);
        try {
            const data = await jobSeekerService.getMatchScore(jobObj.id);
            setMatchScores(prev => ({ ...prev, [jobObj.id]: data }));
        } catch (err) {
            console.error('Match score error:', err);
            setMatchScores(prev => ({
                ...prev,
                [jobObj.id]: { match_score: 75, reason: 'Could not compute match score.' },
            }));
        } finally {
            setMatchLoading(false);
        }
    }, [matchScores]);

    useEffect(() => {
        if (job) fetchMatchScore(job);
    }, [currentCard, job]);

    const currentMatch = job ? matchScores[job.id] : null;

    // Slide to next card
    const goNext = useCallback(async (action) => {
        if (animating || !job) return;

        setAnimating(true);
        setSlideDir('up');

        if (action === 'skip') {
            try { await jobSeekerService.dismissJob(job.id); } catch (e) { console.error(e); }
        }

        setTimeout(() => {
            if (currentCard < jobs.length) setCurrentCard(prev => prev + 1);
            setSlideDir('enter');
            setTimeout(() => {
                setSlideDir(null);
                setAnimating(false);
                // Scroll card back to top
                if (cardRef.current) cardRef.current.scrollTop = 0;
            }, SLIDE_DURATION);
        }, SLIDE_DURATION);
    }, [animating, job, currentCard, jobs.length]);

    const handleSave = () => {
        if (!job) return;
        setSavedJobs(prev => {
            const next = new Set(prev);
            if (next.has(job.id)) { next.delete(job.id); } else { next.add(job.id); }
            return next;
        });
    };

    const handleApply = async () => {
        setShowApplyModal(true);
        if (job) {
            setCoverLetter('');
            setCoverLetterLoading(true);
            try {
                const data = await jobSeekerService.generateCoverLetter(job.id);
                setCoverLetter(data.cover_letter);
            } catch (err) {
                setCoverLetter(
                    `Dear Hiring Manager,\n\nI am excited to apply for the ${job.title} position. I believe my skills and experience make me a strong candidate.\n\nBest regards`
                );
            } finally {
                setCoverLetterLoading(false);
            }
        }
    };

    const handleConfirmApply = async () => {
        if (!job) return;
        try {
            await jobSeekerService.applyToJob(job.id, coverLetter);
            setShowApplyModal(false);
            setShowSuccess(true);
            setTimeout(() => {
                setShowSuccess(false);
                goNext('apply');
            }, 1800);
        } catch (error) {
            console.error('Failed to apply:', error);
            alert('Error applying to job.');
        }
    };

    // Slide animation styles
    const getSlideStyle = () => {
        if (slideDir === 'up') {
            return {
                transform: 'translateY(-110%)',
                opacity: 0,
                transition: `transform ${SLIDE_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1), opacity ${SLIDE_DURATION}ms ease`,
            };
        }
        if (slideDir === 'enter') {
            return {
                transform: 'translateY(0)',
                opacity: 1,
                transition: `transform ${SLIDE_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1), opacity ${SLIDE_DURATION}ms ease`,
            };
        }
        return {
            transform: 'translateY(0)',
            opacity: 1,
        };
    };

    if (loading) {
        return (
            <div className="bg-[#111827] h-screen flex flex-col items-center justify-center gap-6 px-8">
                {/* Pulsing logo icon */}
                <div className="relative">
                    <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#2563eb] to-purple-600 flex items-center justify-center shadow-2xl shadow-[#2563eb]/30 animate-pulse">
                        <span className="material-symbols-outlined text-white text-4xl">work</span>
                    </div>
                    {/* Orbiting dot */}
                    <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#22c55e] border-2 border-[#111827] animate-bounce"></div>
                </div>

                {/* Animated text */}
                <div className="text-center space-y-2">
                    <h2 className="text-xl font-bold text-[#f9fafb]" style={{
                        background: 'linear-gradient(90deg, #2563eb, #a855f7, #2563eb)',
                        backgroundSize: '200% auto',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        animation: 'shimmer 2s ease-in-out infinite',
                    }}>
                        Finding your perfect jobs
                    </h2>
                    <p className="text-sm text-[#9ca3af]">AI is matching your profile to opportunities</p>
                </div>

                {/* Animated progress bar */}
                <div className="w-48 h-1.5 bg-[#1F2937] rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#2563eb] to-purple-500 rounded-full" style={{
                        width: '60%',
                        animation: 'loading-bar 1.5s ease-in-out infinite',
                    }}></div>
                </div>

                {/* Bouncing dots */}
                <div className="flex gap-1.5">
                    {[0, 1, 2].map(i => (
                        <div
                            key={i}
                            className="w-2 h-2 bg-[#2563eb] rounded-full"
                            style={{
                                animation: `bounce-dot 1.2s ease-in-out ${i * 0.15}s infinite`,
                            }}
                        ></div>
                    ))}
                </div>

                <style>{`
                    @keyframes shimmer {
                        0%, 100% { background-position: 0% center; }
                        50% { background-position: 200% center; }
                    }
                    @keyframes loading-bar {
                        0% { width: 10%; margin-left: 0; }
                        50% { width: 60%; margin-left: 20%; }
                        100% { width: 10%; margin-left: 90%; }
                    }
                    @keyframes bounce-dot {
                        0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
                        40% { transform: translateY(-8px); opacity: 1; }
                    }
                `}</style>
            </div>
        );
    }

    const isSaved = job ? savedJobs.has(job.id) : false;

    return (
        <div className="bg-[#111827] text-[#f9fafb] font-['DM_Sans',sans-serif] antialiased h-screen flex flex-col overflow-hidden">

            {/* Top Bar */}
            <header className="flex items-center justify-between px-5 py-3 shrink-0 z-10">
                <div>
                    <h1 className="text-lg font-bold text-[#f9fafb]">For You 🔥</h1>
                    <p className="text-xs text-[#9ca3af]">
                        {jobs.length > 0 && currentCard < jobs.length
                            ? `${jobs.length - currentCard} jobs matched for you`
                            : 'No more jobs right now'}
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setShowFilterModal(true)}
                        className="relative w-10 h-10 rounded-full bg-[#1F2937] border border-[#374151] flex items-center justify-center hover:bg-gray-700 transition-colors"
                    >
                        <span className="material-symbols-outlined text-[#9ca3af] text-xl">tune</span>
                    </button>
                    <button
                        onClick={() => setShowNotifModal(true)}
                        className="relative w-10 h-10 rounded-full bg-[#1F2937] border border-[#374151] flex items-center justify-center hover:bg-gray-700 transition-colors"
                    >
                        <span className="material-symbols-outlined text-[#9ca3af] text-xl">notifications</span>
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[#111827]"></span>
                    </button>
                </div>
            </header>

            {/* FYP Card Container */}
            <div className="flex-1 flex flex-col items-center px-4 pb-20 overflow-hidden relative min-h-0">
                {job ? (
                    <div
                        className="w-full max-w-lg flex-1 flex flex-col min-h-0"
                        style={getSlideStyle()}
                    >
                        {/* Scrollable Card */}
                        <div
                            ref={cardRef}
                            className="flex-1 overflow-y-auto rounded-3xl bg-[#1F2937] border border-[#374151] shadow-2xl min-h-0"
                            style={{ scrollbarWidth: 'thin', scrollbarColor: '#374151 transparent' }}
                        >
                            {/* Card Header */}
                            <div className="bg-gradient-to-br from-[#2563eb]/20 via-purple-600/10 to-[#1F2937] px-6 pt-6 pb-5 sticky top-0 z-10 backdrop-blur-sm bg-[#1F2937]/90 border-b border-[#374151]/50">
                                <div className="flex items-start gap-4">
                                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-extrabold text-lg shadow-lg shrink-0"
                                        style={{ backgroundColor: job.logo_color || '#2563eb' }}>
                                        {job.logo_initials || job.title?.[0] || '?'}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h2 className="text-xl font-bold text-[#f9fafb] leading-tight">{job.title}</h2>
                                        <p className="text-sm text-[#9ca3af] mt-1">{job.company_name}</p>
                                    </div>
                                    {/* AI Match Badge */}
                                    <div className="shrink-0 flex flex-col items-center">
                                        <div className="w-12 h-12 rounded-full border-2 border-[#22c55e] flex items-center justify-center bg-[#22c55e]/10">
                                            {matchLoading && !currentMatch ? (
                                                <span className="material-symbols-outlined animate-spin text-[#22c55e] text-sm">progress_activity</span>
                                            ) : (
                                                <span className="text-[#22c55e] font-extrabold text-sm">{currentMatch?.match_score ?? '—'}%</span>
                                            )}
                                        </div>
                                        <span className="text-[9px] text-[#9ca3af] mt-1 font-medium">Match</span>
                                    </div>
                                </div>
                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mt-4">
                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#111827]/60 text-[#9ca3af] text-xs font-medium">
                                        <span className="material-symbols-outlined text-xs">location_on</span>{job.location}
                                    </span>
                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#111827]/60 text-[#22c55e] text-xs font-medium">
                                        <span className="material-symbols-outlined text-xs">payments</span>{job.salary}
                                    </span>
                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#111827]/60 text-[#9ca3af] text-xs font-medium">
                                        <span className="material-symbols-outlined text-xs">schedule</span>
                                        {new Date(job.created_at).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>

                            {/* Card Body */}
                            <div className="px-6 py-5 space-y-5">
                                {/* Description */}
                                <div>
                                    <h4 className="text-xs font-bold text-[#9ca3af] uppercase tracking-wider mb-2">About the Role</h4>
                                    <p className="text-sm text-[#f9fafb] leading-relaxed">{job.description}</p>
                                </div>

                                {/* Requirements */}
                                <div>
                                    <h4 className="text-xs font-bold text-[#9ca3af] uppercase tracking-wider mb-3">Requirements</h4>
                                    <div className="space-y-2">
                                        {(job.requirements || '').split('\n').filter(Boolean).map((req, i) => (
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
                                    <p className="text-sm text-[#9ca3af] leading-relaxed">{currentMatch?.reason || 'Analysing your match...'}</p>
                                </div>

                                {/* Spacer for action bar */}
                                <div className="h-2"></div>
                            </div>
                        </div>

                        {/* Sticky Action Bar — inside the card flow */}
                        <div className="shrink-0 pt-3 pb-1">
                            <div className="flex gap-3 max-w-lg mx-auto">
                                <button
                                    onClick={() => goNext('skip')}
                                    disabled={animating}
                                    className="flex-1 py-3.5 rounded-2xl border border-[#374151] bg-[#1F2937] hover:bg-[#374151] text-[#9ca3af] hover:text-white text-sm font-semibold transition-all active:scale-[0.97] flex items-center justify-center gap-2"
                                >
                                    <span className="material-symbols-outlined text-base">arrow_downward</span>
                                    Skip
                                </button>
                                <button
                                    onClick={handleSave}
                                    className={`px-5 py-3.5 rounded-2xl border text-sm font-semibold transition-all active:scale-[0.97] flex items-center justify-center gap-1.5 ${
                                        isSaved
                                            ? 'bg-yellow-500/10 border-yellow-500/50 text-yellow-400'
                                            : 'bg-[#1F2937] border-[#374151] text-[#9ca3af] hover:bg-[#374151]'
                                    }`}
                                >
                                    <span className="material-symbols-outlined text-base">{isSaved ? 'bookmark_added' : 'bookmark'}</span>
                                </button>
                                <button
                                    onClick={handleApply}
                                    disabled={animating}
                                    className="flex-1 py-3.5 rounded-2xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-sm font-semibold transition-all active:scale-[0.97] shadow-lg shadow-[#2563eb]/20 flex items-center justify-center gap-2"
                                >
                                    <span className="material-symbols-outlined text-base">send</span>
                                    Apply Now
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
                        <div className="w-20 h-20 rounded-full bg-[#1F2937] border border-[#374151] flex items-center justify-center mx-auto">
                            <span className="material-symbols-outlined text-[#9ca3af] text-4xl">check_circle</span>
                        </div>
                        <h3 className="text-xl font-bold text-[#f9fafb]">All caught up!</h3>
                        <p className="text-sm text-[#9ca3af] max-w-xs">You've reviewed all available jobs. Check back later for new opportunities.</p>
                    </div>
                )}
            </div>

            {/* ── Apply Modal ── */}
            {showApplyModal && job && (
                <div
                    className="fixed inset-0 z-[60] flex items-end justify-center bg-black/60 backdrop-blur-sm"
                    onClick={() => setShowApplyModal(false)}
                >
                    <div
                        className="w-full max-w-lg bg-[#1F2937] border-t border-[#374151] rounded-t-3xl flex flex-col"
                        style={{ maxHeight: '85vh' }}
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="w-10 h-1 bg-[#374151] rounded-full mx-auto mt-3 mb-4 shrink-0" />
                        <div className="px-6 pb-4 text-center shrink-0">
                            <h3 className="text-lg font-bold text-[#f9fafb]">Apply to {job.title}?</h3>
                            <p className="text-sm text-[#9ca3af] mt-1">at {job.company_name}</p>
                        </div>
                        <div className="flex-1 overflow-y-auto px-6 space-y-4 pb-2">
                            <div className="bg-[#111827] border border-[#374151] rounded-xl p-4">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="material-symbols-outlined text-[#2563eb] text-sm">auto_awesome</span>
                                    <span className="text-xs font-bold text-[#2563eb]">AI-Generated Cover Letter</span>
                                </div>
                                {coverLetterLoading ? (
                                    <div className="flex items-center gap-2 py-2">
                                        <span className="material-symbols-outlined animate-spin text-[#2563eb] text-sm">progress_activity</span>
                                        <span className="text-xs text-[#9ca3af]">Generating personalised cover letter...</span>
                                    </div>
                                ) : (
                                    <textarea
                                        value={coverLetter}
                                        onChange={e => setCoverLetter(e.target.value)}
                                        rows={6}
                                        className="w-full bg-transparent text-xs text-[#9ca3af] leading-relaxed resize-none outline-none"
                                    />
                                )}
                            </div>
                        </div>
                        <div className="px-6 py-4 flex gap-3 shrink-0 border-t border-[#374151]">
                            <button
                                onClick={() => setShowApplyModal(false)}
                                className="flex-1 py-3 rounded-xl border border-[#374151] text-[#9ca3af] hover:text-[#f9fafb] hover:bg-gray-800 text-sm font-semibold transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmApply}
                                className="flex-1 py-3 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-sm font-semibold transition-all shadow shadow-[#2563eb]/30 flex items-center justify-center gap-2"
                            >
                                <span className="material-symbols-outlined text-sm">send</span>
                                Confirm & Apply
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Filter Modal ── */}
            {showFilterModal && (
                <div
                    className="fixed inset-0 z-[60] flex items-end justify-center bg-black/60 backdrop-blur-sm"
                    onClick={() => setShowFilterModal(false)}
                >
                    <div
                        className="w-full max-w-lg bg-[#1F2937] border-t border-[#374151] rounded-t-3xl p-6 space-y-5"
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="w-10 h-1 bg-[#374151] rounded-full mx-auto" />
                        <h3 className="text-lg font-bold text-[#f9fafb] text-center">Filter Jobs</h3>
                        {selectedFilters.size > 0 && (
                            <p className="text-center text-xs text-[#2563eb]">{selectedFilters.size} filter{selectedFilters.size > 1 ? 's' : ''} active</p>
                        )}
                        <div className="space-y-4">
                            {[
                                { label: 'Job Type', options: ['Full-time', 'Part-time', 'Contract', 'Remote'] },
                                { label: 'Experience Level', options: ['Junior', 'Mid-level', 'Senior', 'Lead'] },
                            ].map(group => (
                                <div key={group.label}>
                                    <p className="text-xs font-bold text-[#9ca3af] uppercase tracking-wider mb-2">{group.label}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {group.options.map(opt => (
                                            <button
                                                key={opt}
                                                onClick={() => toggleFilter(opt)}
                                                className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                                                    selectedFilters.has(opt)
                                                        ? 'border-[#2563eb] bg-[#2563eb]/20 text-[#2563eb]'
                                                        : 'border-[#374151] text-[#9ca3af] hover:border-[#2563eb] hover:text-[#2563eb]'
                                                }`}
                                            >
                                                {selectedFilters.has(opt) ? '✓ ' : ''}{opt}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={clearFilters}
                                className="flex-1 py-3 rounded-xl border border-[#374151] text-[#9ca3af] hover:text-[#f9fafb] hover:bg-[#374151] font-semibold text-sm transition-colors"
                            >
                                Clear All
                            </button>
                            <button
                                onClick={applyFilters}
                                className="flex-1 py-3 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-semibold text-sm transition-colors"
                            >
                                Apply Filters
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Notifications Modal ── */}
            {showNotifModal && (
                <div
                    className="fixed inset-0 z-[60] flex items-end justify-center bg-black/60 backdrop-blur-sm"
                    onClick={() => setShowNotifModal(false)}
                >
                    <div
                        className="w-full max-w-lg bg-[#1F2937] border-t border-[#374151] rounded-t-3xl p-6 space-y-4"
                        onClick={e => e.stopPropagation()}
                        style={{ maxHeight: '70vh', overflowY: 'auto' }}
                    >
                        <div className="w-10 h-1 bg-[#374151] rounded-full mx-auto" />
                        <h3 className="text-lg font-bold text-[#f9fafb] text-center">Notifications</h3>
                        {[
                            { icon: 'work', color: 'text-[#2563eb]', bg: 'bg-[#2563eb]/10', title: 'New Job Match', desc: 'A new Senior Developer role matches 92% of your profile.', time: '2m ago' },
                            { icon: 'check_circle', color: 'text-[#22c55e]', bg: 'bg-[#22c55e]/10', title: 'Application Viewed', desc: 'TechFlow Systems viewed your application.', time: '1h ago' },
                            { icon: 'email', color: 'text-purple-400', bg: 'bg-purple-500/10', title: 'Interview Request', desc: 'You have a new message from NexGen Labs.', time: '3h ago' },
                        ].map((n, i) => (
                            <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-[#111827] border border-[#374151]">
                                <div className={`w-9 h-9 rounded-lg ${n.bg} flex items-center justify-center shrink-0`}>
                                    <span className={`material-symbols-outlined ${n.color} text-lg`}>{n.icon}</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-[#f9fafb]">{n.title}</p>
                                    <p className="text-xs text-[#9ca3af] mt-0.5">{n.desc}</p>
                                </div>
                                <span className="text-[10px] text-[#9ca3af] shrink-0">{n.time}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* ── Success Animation ── */}
            {showSuccess && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm pointer-events-none">
                    <div className="flex flex-col items-center gap-4 animate-bounce">
                        <div className="w-20 h-20 rounded-full bg-[#22c55e]/20 border-2 border-[#22c55e] flex items-center justify-center">
                            <span className="material-symbols-outlined text-[#22c55e] text-4xl">check</span>
                        </div>
                        <h3 className="text-xl font-bold text-[#f9fafb]">Application Sent! 🎉</h3>
                        {job && <p className="text-sm text-[#9ca3af]">Good luck with {job.company_name}!</p>}
                    </div>
                </div>
            )}

            <JobSeekerBottomNav />
        </div>
    );
};

export default JobSeekerHome;
