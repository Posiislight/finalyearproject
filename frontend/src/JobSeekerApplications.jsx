import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import JobSeekerBottomNav from './JobSeekerBottomNav';
import { jobSeekerService } from './services/jobSeekerService';

const JobSeekerApplications = () => {
    const navigate = useNavigate();
    const [activeFilter, setActiveFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchApps = async () => {
            try {
                const data = await jobSeekerService.getApplications();
                setApplications(data);
            } catch (error) {
                console.error("Failed to fetch applications:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchApps();
    }, []);

    const stats = [
        { label: 'Total Sent', value: applications.length.toString(), icon: 'send', trend: '', color: '#2563eb' },
        { label: 'Response Rate', value: applications.length > 0 ? `${Math.round((applications.filter(a => a.status !== 'applied').length / applications.length) * 100)}%` : '0%', icon: 'reply', trend: '', color: '#22c55e' },
        { label: 'Interviews', value: applications.filter(a => a.status === 'interviewing').length.toString(), icon: 'event', trend: '', color: '#7c3aed' },
    ];

    const statusConfig = {
        applied: { label: 'Applied', color: 'text-gray-400', bg: 'bg-gray-900/20', border: 'border-gray-900/30' },
        reviewing: { label: 'Under Review', color: 'text-yellow-400', bg: 'bg-yellow-900/20', border: 'border-yellow-900/30' },
        interviewing: { label: 'Interview', color: 'text-[#2563eb]', bg: 'bg-[#2563eb]/10', border: 'border-[#2563eb]/30' },
        rejected: { label: 'Not Selected', color: 'text-red-400', bg: 'bg-red-900/20', border: 'border-red-900/30' },
        offered: { label: 'Offer Received', color: 'text-emerald-400', bg: 'bg-emerald-900/20', border: 'border-emerald-900/30' },
    };

    const filters = [
        { key: 'all', label: 'All' },
        { key: 'applied', label: 'Applied' },
        { key: 'reviewing', label: 'In Review' },
        { key: 'interviewing', label: 'Interview' },
        { key: 'offered', label: 'Offers' },
        { key: 'rejected', label: 'Rejected' },
    ];

    let filteredApps = activeFilter === 'all' ? applications : applications.filter(a => a.status === activeFilter);
    // Apply search filter
    if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        filteredApps = filteredApps.filter(a => {
            const job = a.job_post_details;
            return job && (
                (job.title || '').toLowerCase().includes(q) ||
                (job.company_name || '').toLowerCase().includes(q)
            );
        });
    }
    
    // Helper to generate a dynamic timeline depending on status
    const generateTimeline = (status) => {
        const statuses = ['applied', 'reviewing', 'interviewing', 'offered'];
        let isRejected = status === 'rejected';
        
        // If rejected, the timeline drops 'interviewing' and 'offered' and goes to 'rejected'
        if (isRejected) {
             return [
                 { step: 'Applied', done: true },
                 { step: 'Reviewed', done: true },
                 { step: 'Rejected', done: true, rejected: true },
             ];
        }

        const currentStatusIndex = statuses.indexOf(status);
        
        return statuses.map((s, i) => ({
            step: s.charAt(0).toUpperCase() + s.slice(1),
            done: i <= currentStatusIndex,
            active: i === currentStatusIndex && i !== statuses.length - 1
        }));
    };

    return (
        <div className="bg-black text-[#f9fafb] font-['DM_Sans',sans-serif] antialiased h-screen flex flex-col overflow-hidden">
            {/* Header */}
            <header className="px-5 pt-4 pb-2 shrink-0">
                <h1 className="text-xl font-bold text-[#f9fafb] mb-3">Applications</h1>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                    {stats.map((s, i) => (
                        <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center mx-auto mb-1.5" style={{ backgroundColor: s.color + '15' }}>
                                <span className="material-symbols-outlined text-lg" style={{ color: s.color }}>{s.icon}</span>
                            </div>
                            <p className="text-lg font-extrabold text-[#f9fafb]">{s.value}</p>
                            <p className="text-[10px] text-[#9ca3af]">{s.label}</p>
                            <p className="text-[9px] text-[#22c55e] mt-0.5">{s.trend}</p>
                        </div>
                    ))}
                </div>

                {/* Search */}
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 mb-3 focus-within:border-[#2563eb] transition-colors">
                    <span className="material-symbols-outlined text-[#9ca3af] text-lg">search</span>
                    <input
                        type="text"
                        placeholder="Search applications..."
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        className="flex-1 bg-transparent text-[#f9fafb] text-sm outline-none placeholder:text-gray-500"
                    />
                </div>

                {/* Filter Tabs */}
                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                    {filters.map(f => (
                        <button
                            key={f.key}
                            onClick={() => setActiveFilter(f.key)}
                            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                                activeFilter === f.key
                                    ? 'bg-[#2563eb] text-white'
                                    : 'bg-white/5 text-[#9ca3af] border border-white/10 hover:text-[#f9fafb]'
                            }`}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>
            </header>

            {/* Application List */}
            <div className="flex-1 overflow-y-auto px-5 pb-24 pt-3 space-y-3">
                {filteredApps.map(app => {
                    const status = statusConfig[app.status] || statusConfig.applied;
                    const job = app.job_post_details;
                    const timeline = generateTimeline(app.status);

                    return (
                        <div key={app.id} className="bg-white/5 rounded-2xl border border-white/10 p-4 hover:border-[#2563eb]/30 transition-colors">
                            {/* Job Info */}
                            <div className="flex items-start gap-3 mb-4">
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-xs shrink-0" style={{ backgroundColor: job.logo_color }}>
                                    {job.logo_initials}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-bold text-[#f9fafb] text-sm">{job.title}</h3>
                                    <p className="text-xs text-[#9ca3af]">{job.company_name}</p>
                                </div>
                                <span className={`shrink-0 px-2 py-1 rounded-lg text-[11px] font-semibold ${status.bg} ${status.color} border ${status.border}`}>
                                    {status.label}
                                </span>
                            </div>

                            {/* Timeline */}
                            <div className="flex items-center gap-0 mb-3 px-1">
                                {timeline.map((step, i) => (
                                    <React.Fragment key={i}>
                                        <div className="flex flex-col items-center gap-1 relative" style={{ minWidth: '44px' }}>
                                            <div className={`w-3 h-3 rounded-full border-2 ${
                                                step.rejected ? 'bg-red-500 border-red-500' :
                                                step.done ? 'bg-[#22c55e] border-[#22c55e]' :
                                                step.active ? 'bg-[#2563eb] border-[#2563eb] animate-pulse' :
                                                'bg-transparent border-white/10'
                                            }`}></div>
                                            <span className={`text-[9px] text-center leading-tight ${step.done || step.active ? 'text-[#f9fafb]' : 'text-[#9ca3af]/50'}`}>{step.step}</span>
                                        </div>
                                        {i < timeline.length - 1 && (
                                            <div className={`flex-1 h-0.5 -mt-4 ${step.done ? 'bg-[#22c55e]' : 'bg-white/10'}`}></div>
                                        )}
                                    </React.Fragment>
                                ))}
                            </div>

                            {/* Footer */}
                            <div className="flex items-center justify-between pt-2 border-t border-white/10">
                                <span className="text-[10px] text-[#9ca3af]">Applied {new Date(app.created_at).toLocaleDateString()}</span>
                                <button onClick={() => navigate(`/job/${job.id}`)} className="text-xs text-[#2563eb] hover:underline flex items-center gap-1">
                                    View Details <span className="material-symbols-outlined text-xs">arrow_forward</span>
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            <JobSeekerBottomNav />
        </div>
    );
};

export default JobSeekerApplications;
