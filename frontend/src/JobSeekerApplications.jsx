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
        applied: { label: 'Applied', color: 'text-neutral-400', bg: 'bg-neutral-900/50', border: 'border-neutral-800' },
        reviewing: { label: 'Under Review', color: 'text-yellow-400', bg: 'bg-yellow-900/20', border: 'border-yellow-900/30' },
        interviewing: { label: 'Interview', color: 'text-blue-500', bg: 'bg-blue-900/20', border: 'border-blue-900/30' },
        rejected: { label: 'Not Selected', color: 'text-red-400', bg: 'bg-red-900/20', border: 'border-red-900/30' },
        offered: { label: 'Offer Received', color: 'text-green-400', bg: 'bg-green-900/20', border: 'border-green-900/30' },
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
        <div className="bg-black text-[#f9fafb] font-['Plus_Jakarta_Sans',sans-serif] antialiased h-screen flex flex-col overflow-hidden">
            {/* Header */}
            <header className="px-5 pt-4 pb-2 shrink-0">
                <h1 className="text-xl font-bold text-[#f9fafb] mb-3">Applications</h1>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                    {stats.map((s, i) => (
                        <div key={i} className="bg-[#0a0a0a] border border-neutral-900 rounded-xl p-3 text-center">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center mx-auto mb-1.5" style={{ backgroundColor: s.color + '15' }}>
                                <span className="material-symbols-outlined text-[16px]" style={{ color: s.color }}>{s.icon}</span>
                            </div>
                            <p className="text-lg font-bold text-white leading-tight font-['DM_Mono',monospace]">{s.value}</p>
                            <p className="text-[10px] text-neutral-500 font-medium">{s.label}</p>
                            <p className="text-[9px] text-[#22c55e] mt-0.5">{s.trend}</p>
                        </div>
                    ))}
                </div>

                {/* Search */}
                <div className="flex items-center gap-2 bg-[#0a0a0a] border border-neutral-900 rounded-[12px] px-3 py-2.5 mb-3 focus-within:border-blue-500 transition-colors shadow-sm">
                    <span className="material-symbols-outlined text-neutral-500 text-[18px]">search</span>
                    <input
                        type="text"
                        placeholder="Search applications..."
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        className="flex-1 bg-transparent text-white text-[13px] outline-none placeholder:text-neutral-600"
                    />
                </div>

                {/* Filter Tabs */}
                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                    {filters.map(f => (
                        <button
                            key={f.key}
                            onClick={() => setActiveFilter(f.key)}
                            className={`shrink-0 px-3 py-1.5 rounded-[12px] text-[11px] font-bold tracking-wide uppercase transition-colors ${
                                activeFilter === f.key
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-[#0a0a0a] text-neutral-500 border border-neutral-900 hover:text-white hover:bg-neutral-900/50'
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
                        <div key={app.id} className="bg-[#0a0a0a] rounded-2xl border border-neutral-900 p-4 hover:border-neutral-700 transition-colors flex flex-col gap-3">
                            {/* Job Info */}
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-xs shrink-0 border border-neutral-800 shadow-sm" style={{ backgroundColor: job.logo_color || '#171717' }}>
                                    {job.logo_initials || 'C'}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-bold text-white text-sm tracking-tight">{job.title}</h3>
                                    <p className="text-xs text-neutral-500 mt-0.5">{job.company_name}</p>
                                </div>
                                <span className={`shrink-0 px-2.5 py-1 rounded-[6px] text-[9px] font-bold tracking-widest uppercase ${status.bg} ${status.color} border ${status.border}`}>
                                    {status.label}
                                </span>
                            </div>

                            {/* Timeline */}
                            <div className="flex items-center gap-0 px-1 mt-1 mb-2">
                                {timeline.map((step, i) => (
                                    <React.Fragment key={i}>
                                        <div className="flex flex-col items-center gap-1.5 relative" style={{ minWidth: '44px' }}>
                                            <div className={`w-2.5 h-2.5 rounded-full border border-neutral-900 shadow-sm ${
                                                step.rejected ? 'bg-red-500 shadow-red-500/50' :
                                                step.done ? 'bg-green-500 shadow-green-500/50' :
                                                step.active ? 'bg-blue-500 shadow-blue-500/50 animate-pulse' :
                                                'bg-neutral-800'
                                            }`}></div>
                                            <span className={`text-[8px] font-bold tracking-widest uppercase text-center leading-tight ${step.done || step.active ? 'text-neutral-300' : 'text-neutral-600'}`}>{step.step}</span>
                                        </div>
                                        {i < timeline.length - 1 && (
                                            <div className={`flex-1 h-[2px] -mt-4 rounded-full ${step.done ? 'bg-green-500' : 'bg-neutral-800'}`}></div>
                                        )}
                                    </React.Fragment>
                                ))}
                            </div>

                            {/* Footer */}
                            <div className="flex items-center justify-between pt-3 border-t border-neutral-900">
                                <span className="text-[10px] uppercase tracking-widest font-bold text-neutral-600">Applied {new Date(app.created_at).toLocaleDateString()}</span>
                                <button onClick={() => navigate(`/job/${job.id}`)} className="text-[11px] font-bold tracking-wide uppercase text-blue-500 hover:text-blue-400 flex items-center gap-1 transition-colors">
                                    View Details <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
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
