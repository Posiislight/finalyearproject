import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import JobSeekerBottomNav from './JobSeekerBottomNav';
import { jobSeekerService } from './services/jobSeekerService';
import BlockLoader from './components/ui/block-loader';

const JobSeekerMatches = () => {
    const navigate = useNavigate();
    const [activeFilter, setActiveFilter] = useState('all');
    const [sortBy, setSortBy] = useState('recent');
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                const data = await jobSeekerService.getApplications();
                // "Matches" = applications where employer has engaged (status beyond "applied")
                const engaged = data.filter(a => a.status !== 'applied');
                setApplications(engaged);
            } catch (err) {
                console.error('Failed to fetch matches:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchMatches();
    }, []);

    const statusConfig = {
        reviewing: { label: 'Under Review', color: 'text-yellow-400', bg: 'bg-yellow-900/20', border: 'border-yellow-900/30', icon: 'hourglass_top' },
        interviewing: { label: 'Interview', color: 'text-[#2563eb]', bg: 'bg-[#2563eb]/10', border: 'border-[#2563eb]/30', icon: 'event' },
        offered: { label: 'Offer Received', color: 'text-[#22c55e]', bg: 'bg-green-900/20', border: 'border-green-900/30', icon: 'star' },
        rejected: { label: 'Not Selected', color: 'text-red-400', bg: 'bg-red-900/20', border: 'border-red-900/30', icon: 'close' },
    };

    const filters = [
        { key: 'all', label: 'All', count: applications.length },
        { key: 'reviewing', label: 'Under Review', count: applications.filter(m => m.status === 'reviewing').length },
        { key: 'interviewing', label: 'Interviews', count: applications.filter(m => m.status === 'interviewing').length },
        { key: 'offered', label: 'Offers', count: applications.filter(m => m.status === 'offered').length },
        { key: 'rejected', label: 'Rejected', count: applications.filter(m => m.status === 'rejected').length },
    ];

    let filteredMatches = activeFilter === 'all' ? applications : applications.filter(m => m.status === activeFilter);

    // Actually sort
    if (sortBy === 'recent') {
        filteredMatches = [...filteredMatches].sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
    }

    if (loading) {
        return (
            <div className="bg-black h-screen flex items-center justify-center">
                <BlockLoader size={30} gap={4} />
            </div>
        );
    }

    return (
        <div className="bg-black text-[#f9fafb] font-['Plus_Jakarta_Sans',sans-serif] antialiased h-screen flex flex-col overflow-hidden">
            {/* Header */}
            <header className="px-5 pt-4 pb-3 shrink-0">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h1 className="text-xl font-bold text-white tracking-tight">Matches</h1>
                        <p className="text-xs text-neutral-500">{applications.length} employer engagements</p>
                    </div>
                    <div className="relative">
                        <select
                            value={sortBy}
                            onChange={e => setSortBy(e.target.value)}
                            className="appearance-none bg-[#0a0a0a] border border-neutral-900 text-neutral-400 text-xs rounded-lg px-3 py-2 pr-8 outline-none focus:border-blue-500 cursor-pointer"
                        >
                            <option value="recent">Most Recent</option>
                        </select>
                        <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-neutral-500 text-sm pointer-events-none">expand_more</span>
                    </div>
                </div>

                {/* Filter Tabs */}
                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                    {filters.map(f => (
                        <button
                            key={f.key}
                            onClick={() => setActiveFilter(f.key)}
                            className={`shrink-0 px-3 py-1.5 rounded-[12px] text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                                activeFilter === f.key
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-[#0a0a0a] text-neutral-400 border border-neutral-900 hover:text-white hover:bg-neutral-900'
                            }`}
                        >
                            {f.label}
                            <span className={`text-[10px] px-1.5 py-0.5 rounded-md ${activeFilter === f.key ? 'bg-white/20' : 'bg-neutral-800'}`}>{f.count}</span>
                        </button>
                    ))}
                </div>
            </header>

            {/* Match List */}
            <div className="flex-1 overflow-y-auto px-5 pb-24 space-y-3">
                {filteredMatches.length === 0 && (
                    <div className="text-center py-16">
                        <span className="material-symbols-outlined text-4xl text-[#374151] mb-3">handshake</span>
                        <p className="text-sm text-[#9ca3af]">No matches yet. Apply to more jobs!</p>
                    </div>
                )}
                {filteredMatches.map(app => {
                    const status = statusConfig[app.status] || statusConfig.reviewing;
                    const job = app.job_post_details;
                    if (!job) return null;
                    return (
                        <div key={app.id} className="bg-[#0a0a0a] rounded-2xl border border-neutral-900 p-4 hover:border-neutral-700 transition-colors">
                            <div className="flex items-start gap-3">
                                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-sm shrink-0 border border-neutral-800 shadow-sm" style={{ backgroundColor: job.logo_color || '#171717' }}>
                                    {job.logo_initials || 'C'}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-2">
                                        <div>
                                            <h3 className="font-bold text-white text-sm tracking-tight">{job.title}</h3>
                                            <p className="text-xs text-neutral-500 mt-0.5">{job.company_name} · {job.location}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 mt-2.5">
                                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-bold tracking-wide uppercase ${status.bg} ${status.color} border ${status.border}`}>
                                            <span className="material-symbols-outlined text-[12px]">{status.icon}</span>
                                            {status.label}
                                        </span>
                                        <span className="text-[10px] font-medium text-neutral-500 bg-neutral-900/50 px-2 py-1 rounded-md border border-neutral-800/50">{job.salary}</span>
                                    </div>

                                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-neutral-900">
                                        <span className="text-[10px] font-medium text-neutral-500 uppercase tracking-widest">Updated {new Date(app.updated_at).toLocaleDateString()}</span>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => navigate('/jobseeker-applications')}
                                                className="text-[11px] font-bold tracking-wide text-neutral-400 hover:text-white transition-colors flex items-center gap-1 uppercase"
                                            >
                                                Details <span className="material-symbols-outlined text-[12px]">open_in_new</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <JobSeekerBottomNav />
        </div>
    );
};

export default JobSeekerMatches;
