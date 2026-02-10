import React, { useState } from 'react';
import JobSeekerBottomNav from './JobSeekerBottomNav';

const JobSeekerApplications = () => {
    const [activeFilter, setActiveFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const stats = [
        { label: 'Total Sent', value: '24', icon: 'send', trend: '+5 this week', color: '#2563eb' },
        { label: 'Response Rate', value: '62%', icon: 'reply', trend: '+8% vs avg', color: '#22c55e' },
        { label: 'Interviews', value: '4', icon: 'event', trend: '2 upcoming', color: '#7c3aed' },
    ];

    const applications = [
        {
            id: 1, title: 'Senior Frontend Developer', company: 'TechFlow Systems', logo: 'TF', logoColor: '#2563eb',
            appliedDate: 'Feb 16, 2026', status: 'interview',
            timeline: [
                { step: 'Applied', date: 'Feb 16', done: true },
                { step: 'Reviewed', date: 'Feb 17', done: true },
                { step: 'Shortlisted', date: 'Feb 17', done: true },
                { step: 'Interview', date: 'Feb 20', done: false, active: true },
                { step: 'Offer', date: '—', done: false },
            ]
        },
        {
            id: 2, title: 'Lead UX Designer', company: 'DesignHub Pro', logo: 'DH', logoColor: '#7c3aed',
            appliedDate: 'Feb 14, 2026', status: 'shortlisted',
            timeline: [
                { step: 'Applied', date: 'Feb 14', done: true },
                { step: 'Reviewed', date: 'Feb 15', done: true },
                { step: 'Shortlisted', date: 'Feb 16', done: true },
                { step: 'Interview', date: '—', done: false },
                { step: 'Offer', date: '—', done: false },
            ]
        },
        {
            id: 3, title: 'Full Stack Engineer', company: 'NexGen Labs', logo: 'NL', logoColor: '#059669',
            appliedDate: 'Feb 12, 2026', status: 'review',
            timeline: [
                { step: 'Applied', date: 'Feb 12', done: true },
                { step: 'Reviewed', date: '—', done: false, active: true },
                { step: 'Shortlisted', date: '—', done: false },
                { step: 'Interview', date: '—', done: false },
                { step: 'Offer', date: '—', done: false },
            ]
        },
        {
            id: 4, title: 'React Developer', company: 'CloudScale Inc.', logo: 'CS', logoColor: '#0891b2',
            appliedDate: 'Feb 8, 2026', status: 'rejected',
            timeline: [
                { step: 'Applied', date: 'Feb 8', done: true },
                { step: 'Reviewed', date: 'Feb 10', done: true },
                { step: 'Rejected', date: 'Feb 11', done: true, rejected: true },
            ]
        },
        {
            id: 5, title: 'Software Engineer', company: 'DataVault', logo: 'DV', logoColor: '#dc2626',
            appliedDate: 'Feb 5, 2026', status: 'offer',
            timeline: [
                { step: 'Applied', date: 'Feb 5', done: true },
                { step: 'Reviewed', date: 'Feb 6', done: true },
                { step: 'Shortlisted', date: 'Feb 7', done: true },
                { step: 'Interview', date: 'Feb 10', done: true },
                { step: 'Offer', date: 'Feb 14', done: true },
            ]
        },
    ];

    const statusConfig = {
        review: { label: 'Under Review', color: 'text-yellow-400', bg: 'bg-yellow-900/20', border: 'border-yellow-900/30' },
        shortlisted: { label: 'Shortlisted', color: 'text-[#22c55e]', bg: 'bg-green-900/20', border: 'border-green-900/30' },
        interview: { label: 'Interview', color: 'text-[#2563eb]', bg: 'bg-[#2563eb]/10', border: 'border-[#2563eb]/30' },
        rejected: { label: 'Not Selected', color: 'text-red-400', bg: 'bg-red-900/20', border: 'border-red-900/30' },
        offer: { label: 'Offer Received', color: 'text-emerald-400', bg: 'bg-emerald-900/20', border: 'border-emerald-900/30' },
    };

    const filters = [
        { key: 'all', label: 'All' },
        { key: 'review', label: 'In Review' },
        { key: 'shortlisted', label: 'Shortlisted' },
        { key: 'interview', label: 'Interview' },
        { key: 'offer', label: 'Offers' },
        { key: 'rejected', label: 'Rejected' },
    ];

    const filteredApps = activeFilter === 'all' ? applications : applications.filter(a => a.status === activeFilter);

    return (
        <div className="bg-[#111827] text-[#f9fafb] font-['DM_Sans',sans-serif] antialiased h-screen flex flex-col overflow-hidden">
            {/* Header */}
            <header className="px-5 pt-4 pb-2 shrink-0">
                <h1 className="text-xl font-bold text-[#f9fafb] mb-3">Applications</h1>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                    {stats.map((s, i) => (
                        <div key={i} className="bg-[#1F2937] rounded-xl border border-[#374151] p-3 text-center">
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
                <div className="flex items-center gap-2 bg-[#1F2937] border border-[#374151] rounded-xl px-3 py-2.5 mb-3 focus-within:border-[#2563eb] transition-colors">
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
                                    : 'bg-[#1F2937] text-[#9ca3af] border border-[#374151] hover:text-[#f9fafb]'
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
                    const status = statusConfig[app.status];
                    return (
                        <div key={app.id} className="bg-[#1F2937] rounded-2xl border border-[#374151] p-4 hover:border-[#2563eb]/30 transition-colors">
                            {/* Job Info */}
                            <div className="flex items-start gap-3 mb-4">
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-xs shrink-0" style={{ backgroundColor: app.logoColor }}>
                                    {app.logo}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-bold text-[#f9fafb] text-sm">{app.title}</h3>
                                    <p className="text-xs text-[#9ca3af]">{app.company}</p>
                                </div>
                                <span className={`shrink-0 px-2 py-1 rounded-lg text-[11px] font-semibold ${status.bg} ${status.color} border ${status.border}`}>
                                    {status.label}
                                </span>
                            </div>

                            {/* Timeline */}
                            <div className="flex items-center gap-0 mb-3 px-1">
                                {app.timeline.map((step, i) => (
                                    <React.Fragment key={i}>
                                        <div className="flex flex-col items-center gap-1 relative" style={{ minWidth: '44px' }}>
                                            <div className={`w-3 h-3 rounded-full border-2 ${
                                                step.rejected ? 'bg-red-500 border-red-500' :
                                                step.done ? 'bg-[#22c55e] border-[#22c55e]' :
                                                step.active ? 'bg-[#2563eb] border-[#2563eb] animate-pulse' :
                                                'bg-transparent border-[#374151]'
                                            }`}></div>
                                            <span className={`text-[9px] text-center leading-tight ${step.done || step.active ? 'text-[#f9fafb]' : 'text-[#9ca3af]/50'}`}>{step.step}</span>
                                        </div>
                                        {i < app.timeline.length - 1 && (
                                            <div className={`flex-1 h-0.5 -mt-4 ${step.done ? 'bg-[#22c55e]' : 'bg-[#374151]'}`}></div>
                                        )}
                                    </React.Fragment>
                                ))}
                            </div>

                            {/* Footer */}
                            <div className="flex items-center justify-between pt-2 border-t border-[#374151]/50">
                                <span className="text-[10px] text-[#9ca3af]">Applied {app.appliedDate}</span>
                                <button className="text-xs text-[#2563eb] hover:underline flex items-center gap-1">
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
