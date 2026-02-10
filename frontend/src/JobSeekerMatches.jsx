import React, { useState } from 'react';
import JobSeekerBottomNav from './JobSeekerBottomNav';

const JobSeekerMatches = () => {
    const [activeFilter, setActiveFilter] = useState('all');
    const [sortBy, setSortBy] = useState('recent');

    const matches = [
        { id: 1, title: 'Senior Frontend Developer', company: 'TechFlow Systems', logo: 'TF', logoColor: '#2563eb', location: 'San Francisco, CA', salary: '$120k–$160k', status: 'shortlisted', matchScore: 94, matchDate: '2 hours ago', responseTime: 'Fast responder' },
        { id: 2, title: 'Lead UX Designer', company: 'DesignHub Pro', logo: 'DH', logoColor: '#7c3aed', location: 'Remote', salary: '$110k–$145k', status: 'interview', matchScore: 91, matchDate: '1 day ago', interviewDate: 'Thu, Feb 20 at 2:00 PM' },
        { id: 3, title: 'Full Stack Engineer', company: 'NexGen Labs', logo: 'NL', logoColor: '#059669', location: 'Austin, TX', salary: '$130k–$175k', status: 'review', matchScore: 88, matchDate: '3 days ago' },
        { id: 4, title: 'React Developer', company: 'CloudScale Inc.', logo: 'CS', logoColor: '#0891b2', location: 'New York, NY · Hybrid', salary: '$105k–$135k', status: 'review', matchScore: 85, matchDate: '4 days ago' },
        { id: 5, title: 'Software Engineer II', company: 'DataVault', logo: 'DV', logoColor: '#dc2626', location: 'Seattle, WA', salary: '$125k–$155k', status: 'rejected', matchScore: 79, matchDate: '1 week ago' },
    ];

    const statusConfig = {
        review: { label: 'Under Review', color: 'text-yellow-400', bg: 'bg-yellow-900/20', border: 'border-yellow-900/30', icon: 'hourglass_top' },
        shortlisted: { label: 'Shortlisted', color: 'text-[#22c55e]', bg: 'bg-green-900/20', border: 'border-green-900/30', icon: 'star' },
        interview: { label: 'Interview Scheduled', color: 'text-[#2563eb]', bg: 'bg-[#2563eb]/10', border: 'border-[#2563eb]/30', icon: 'event' },
        rejected: { label: 'Not Selected', color: 'text-red-400', bg: 'bg-red-900/20', border: 'border-red-900/30', icon: 'close' },
    };

    const filters = [
        { key: 'all', label: 'All', count: matches.length },
        { key: 'review', label: 'Under Review', count: matches.filter(m => m.status === 'review').length },
        { key: 'shortlisted', label: 'Shortlisted', count: matches.filter(m => m.status === 'shortlisted').length },
        { key: 'interview', label: 'Interviews', count: matches.filter(m => m.status === 'interview').length },
        { key: 'rejected', label: 'Rejected', count: matches.filter(m => m.status === 'rejected').length },
    ];

    const filteredMatches = activeFilter === 'all' ? matches : matches.filter(m => m.status === activeFilter);

    return (
        <div className="bg-[#111827] text-[#f9fafb] font-['DM_Sans',sans-serif] antialiased h-screen flex flex-col overflow-hidden">
            {/* Header */}
            <header className="px-5 pt-4 pb-3 shrink-0">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h1 className="text-xl font-bold text-[#f9fafb]">Matches</h1>
                        <p className="text-xs text-[#9ca3af]">{matches.length} mutual interests</p>
                    </div>
                    <div className="relative">
                        <select
                            value={sortBy}
                            onChange={e => setSortBy(e.target.value)}
                            className="appearance-none bg-[#1F2937] border border-[#374151] text-[#9ca3af] text-xs rounded-lg px-3 py-2 pr-8 outline-none focus:border-[#2563eb] cursor-pointer"
                        >
                            <option value="recent">Most Recent</option>
                            <option value="match">Highest Match</option>
                            <option value="salary">Highest Salary</option>
                        </select>
                        <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-[#9ca3af] text-sm pointer-events-none">expand_more</span>
                    </div>
                </div>

                {/* Filter Tabs */}
                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                    {filters.map(f => (
                        <button
                            key={f.key}
                            onClick={() => setActiveFilter(f.key)}
                            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                                activeFilter === f.key
                                    ? 'bg-[#2563eb] text-white'
                                    : 'bg-[#1F2937] text-[#9ca3af] border border-[#374151] hover:text-[#f9fafb]'
                            }`}
                        >
                            {f.label}
                            <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${activeFilter === f.key ? 'bg-white/20' : 'bg-[#374151]'}`}>{f.count}</span>
                        </button>
                    ))}
                </div>
            </header>

            {/* Match List */}
            <div className="flex-1 overflow-y-auto px-5 pb-24 space-y-3">
                {filteredMatches.map(match => {
                    const status = statusConfig[match.status];
                    return (
                        <div key={match.id} className="bg-[#1F2937] rounded-2xl border border-[#374151] p-4 hover:border-[#2563eb]/30 transition-colors">
                            <div className="flex items-start gap-3">
                                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-sm shrink-0" style={{ backgroundColor: match.logoColor }}>
                                    {match.logo}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-2">
                                        <div>
                                            <h3 className="font-bold text-[#f9fafb] text-sm">{match.title}</h3>
                                            <p className="text-xs text-[#9ca3af]">{match.company} · {match.location}</p>
                                        </div>
                                        <div className="shrink-0 flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#22c55e]/10 border border-[#22c55e]/20">
                                            <span className="text-[#22c55e] font-bold text-xs">{match.matchScore}%</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 mt-2.5">
                                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-semibold ${status.bg} ${status.color} border ${status.border}`}>
                                            <span className="material-symbols-outlined text-xs">{status.icon}</span>
                                            {status.label}
                                        </span>
                                        <span className="text-[10px] text-[#9ca3af]">{match.salary}</span>
                                    </div>

                                    {match.status === 'interview' && match.interviewDate && (
                                        <div className="mt-2.5 flex items-center gap-2 bg-[#2563eb]/5 border border-[#2563eb]/20 rounded-lg px-3 py-2">
                                            <span className="material-symbols-outlined text-[#2563eb] text-sm">event</span>
                                            <span className="text-xs text-[#2563eb] font-medium">{match.interviewDate}</span>
                                        </div>
                                    )}

                                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#374151]/50">
                                        <span className="text-[10px] text-[#9ca3af]">Matched {match.matchDate}</span>
                                        <div className="flex items-center gap-2">
                                            <button className="text-xs text-[#9ca3af] hover:text-[#f9fafb] transition-colors flex items-center gap-1">
                                                <span className="material-symbols-outlined text-sm">visibility</span>Details
                                            </button>
                                            {match.status !== 'rejected' && (
                                                <button className="text-xs text-red-400 hover:text-red-300 transition-colors flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-sm">undo</span>Withdraw
                                                </button>
                                            )}
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
