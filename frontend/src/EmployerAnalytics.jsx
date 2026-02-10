import React, { useState } from 'react';
import EmployerSidebar from './EmployerSidebar';

const EmployerAnalytics = () => {
    const [dateRange, setDateRange] = useState('Last 30 Days');

    return (
        <div className="bg-[#111621] text-white font-['DM_Sans',sans-serif] antialiased min-h-screen flex overflow-x-hidden">
            {/* Global Sidebar */}
            <EmployerSidebar />

            {/* Main Content */}
            <main className="flex-1 p-8 max-w-[1600px] mx-auto w-full overflow-y-auto">

                {/* Header Section */}
                <div className="flex flex-col gap-6 mb-8">
                    {/* Breadcrumbs */}
                    <div className="flex items-center gap-2 text-sm text-[#94a3b8]">
                        <a href="#" className="hover:text-white transition-colors">Analytics</a>
                        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                        <span className="text-white font-medium">Job Performance</span>
                    </div>
                    <div className="flex flex-wrap items-end justify-between gap-4">
                        <div className="flex flex-col gap-1">
                            <h2 className="text-3xl font-bold text-white tracking-tight">Job Performance</h2>
                            <p className="text-[#94a3b8] max-w-2xl">Track views, swipes, and application rates for your active listings. Compare performance against industry benchmarks.</p>
                        </div>
                        <div className="flex gap-3">
                            <div className="relative">
                                <select
                                    value={dateRange}
                                    onChange={e => setDateRange(e.target.value)}
                                    className="appearance-none bg-[#1e293b] border border-[#334155] text-white pl-4 pr-10 py-2.5 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#2463eb] focus:border-transparent cursor-pointer hover:border-[#2463eb] transition-all"
                                >
                                    <option>Last 30 Days</option>
                                    <option>Last 7 Days</option>
                                    <option>Last Quarter</option>
                                    <option>Year to Date</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#94a3b8]">
                                    <span className="material-symbols-outlined text-[20px]">expand_more</span>
                                </div>
                            </div>
                            <button className="flex items-center gap-2 bg-[#2463eb] hover:bg-[#2463eb]/90 text-white px-4 py-2.5 rounded-lg text-sm font-bold shadow-lg shadow-[#2463eb]/25 transition-all hover:shadow-[#2463eb]/40 hover:border-[#2463eb]">
                                <span className="material-symbols-outlined text-[20px]">download</span>
                                Export Report
                            </button>
                        </div>
                    </div>
                </div>

                {/* KPI Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {/* Active Jobs */}
                    <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-5 hover:shadow-[0_0_15px_rgba(36,99,235,0.3)] hover:border-[#2463eb] transition-all group">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                                <span className="material-symbols-outlined">work</span>
                            </div>
                            <span className="px-2 py-1 text-xs font-medium text-emerald-400 bg-emerald-400/10 rounded-full flex items-center gap-1">
                                <span className="material-symbols-outlined text-[12px]">trending_up</span> 2 New
                            </span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-[#94a3b8] text-sm font-medium">Active Jobs</span>
                            <span className="text-2xl font-bold text-white">12</span>
                        </div>
                    </div>

                    {/* Total Views */}
                    <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-5 hover:shadow-[0_0_15px_rgba(36,99,235,0.3)] hover:border-[#2463eb] transition-all group">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
                                <span className="material-symbols-outlined">visibility</span>
                            </div>
                            <span className="px-2 py-1 text-xs font-medium text-emerald-400 bg-emerald-400/10 rounded-full flex items-center gap-1">
                                <span className="material-symbols-outlined text-[12px]">trending_up</span> 12%
                            </span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-[#94a3b8] text-sm font-medium">Total Views</span>
                            <span className="text-2xl font-bold text-white">8,432</span>
                        </div>
                    </div>

                    {/* Swipe Right Rate */}
                    <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-5 hover:shadow-[0_0_15px_rgba(36,99,235,0.3)] hover:border-[#2463eb] transition-all group">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-rose-500/10 rounded-lg text-rose-400">
                                <span className="material-symbols-outlined">favorite</span>
                            </div>
                            <span className="px-2 py-1 text-xs font-medium text-emerald-400 bg-emerald-400/10 rounded-full flex items-center gap-1">
                                <span className="material-symbols-outlined text-[12px]">trending_up</span> 2.4%
                            </span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-[#94a3b8] text-sm font-medium">Avg. Swipe Right</span>
                            <span className="text-2xl font-bold text-white">18%</span>
                        </div>
                    </div>

                    {/* Applications */}
                    <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-5 hover:shadow-[0_0_15px_rgba(36,99,235,0.3)] hover:border-[#2463eb] transition-all group">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-amber-500/10 rounded-lg text-amber-400">
                                <span className="material-symbols-outlined">description</span>
                            </div>
                            <span className="px-2 py-1 text-xs font-medium text-emerald-400 bg-emerald-400/10 rounded-full flex items-center gap-1">
                                <span className="material-symbols-outlined text-[12px]">trending_up</span> 5%
                            </span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-[#94a3b8] text-sm font-medium">Total Applications</span>
                            <span className="text-2xl font-bold text-white">342</span>
                        </div>
                    </div>
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    {/* Main Line Chart */}
                    <div className="lg:col-span-2 bg-[#1e293b] border border-[#334155] rounded-xl p-6 hover:shadow-[0_0_15px_rgba(36,99,235,0.3)] hover:border-[#2463eb] transition-all">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h3 className="text-lg font-bold text-white">Performance Trends</h3>
                                <p className="text-sm text-[#94a3b8]">Views vs. Applications correlation</p>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex items-center gap-2">
                                    <span className="w-3 h-3 rounded-full bg-[#2463eb]"></span>
                                    <span className="text-xs text-[#94a3b8]">Views</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="w-3 h-3 rounded-full bg-[#0bda62]"></span>
                                    <span className="text-xs text-[#94a3b8]">Applications</span>
                                </div>
                            </div>
                        </div>
                        <div className="h-64 w-full relative">
                            <svg className="w-full h-full" viewBox="0 0 800 300" preserveAspectRatio="none">
                                <defs>
                                    <linearGradient id="blueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                        <stop offset="0%" style={{ stopColor: '#2463eb', stopOpacity: 0.5 }} />
                                        <stop offset="100%" style={{ stopColor: '#2463eb', stopOpacity: 0 }} />
                                    </linearGradient>
                                </defs>
                                {/* Grid Lines */}
                                <line x1="0" y1="250" x2="800" y2="250" stroke="#334155" strokeWidth="1" strokeDasharray="4 4" />
                                <line x1="0" y1="175" x2="800" y2="175" stroke="#334155" strokeWidth="1" strokeDasharray="4 4" />
                                <line x1="0" y1="100" x2="800" y2="100" stroke="#334155" strokeWidth="1" strokeDasharray="4 4" />
                                <line x1="0" y1="25" x2="800" y2="25" stroke="#334155" strokeWidth="1" strokeDasharray="4 4" />
                                {/* Views Line (Blue) */}
                                <path d="M0,200 Q100,180 200,120 T400,100 T600,60 T800,40" fill="none" stroke="#2463eb" strokeWidth="3" />
                                {/* Area under Views */}
                                <path d="M0,200 Q100,180 200,120 T400,100 T600,60 T800,40 V300 H0 Z" fill="url(#blueGradient)" opacity="0.1" />
                                {/* Applications Line (Green) */}
                                <path d="M0,280 Q100,270 200,240 T400,220 T600,180 T800,160" fill="none" stroke="#0bda62" strokeWidth="3" />
                            </svg>
                            <div className="flex justify-between text-xs text-[#94a3b8] mt-2 px-1">
                                <span>Week 1</span>
                                <span>Week 2</span>
                                <span>Week 3</span>
                                <span>Week 4</span>
                            </div>
                        </div>
                    </div>

                    {/* Swipe Sentiment Donut */}
                    <div className="lg:col-span-1 bg-[#1e293b] border border-[#334155] rounded-xl p-6 hover:shadow-[0_0_15px_rgba(36,99,235,0.3)] hover:border-[#2463eb] transition-all flex flex-col">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h3 className="text-lg font-bold text-white">Swipe Sentiment</h3>
                                <p className="text-sm text-[#94a3b8]">Senior UX Designer</p>
                            </div>
                            <button className="text-[#94a3b8] hover:text-white">
                                <span className="material-symbols-outlined">more_horiz</span>
                            </button>
                        </div>
                        <div className="flex-1 flex flex-col items-center justify-center relative">
                            <div className="relative w-48 h-48">
                                <svg className="w-full h-full -rotate-90">
                                    <circle cx="96" cy="96" r="80" fill="none" stroke="#1e293b" strokeWidth="12" />
                                    <circle cx="96" cy="96" r="80" fill="none" stroke="#ef4444" strokeWidth="12" strokeDasharray="125 500" strokeDashoffset="0" strokeLinecap="round" />
                                    <circle cx="96" cy="96" r="80" fill="none" stroke="#0bda62" strokeWidth="12" strokeDasharray="320 500" strokeDashoffset="-135" strokeLinecap="round" />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-3xl font-bold text-white">64%</span>
                                    <span className="text-xs text-[#94a3b8] uppercase tracking-wider font-semibold">Interest Rate</span>
                                </div>
                            </div>
                            <div className="flex w-full justify-between mt-8 px-4">
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-white">36%</p>
                                    <p className="text-xs text-rose-400 font-medium flex items-center justify-center gap-1">
                                        <span className="material-symbols-outlined text-[14px]">close</span> Pass
                                    </p>
                                </div>
                                <div className="h-10 w-px bg-[#334155]"></div>
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-white">64%</p>
                                    <p className="text-xs text-emerald-400 font-medium flex items-center justify-center gap-1">
                                        <span className="material-symbols-outlined text-[14px]">favorite</span> Like
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Job Comparison Table */}
                <div className="bg-[#1e293b] border border-[#334155] rounded-xl overflow-hidden hover:shadow-[0_0_15px_rgba(36,99,235,0.3)] hover:border-[#2463eb] transition-all">
                    <div className="p-6 border-b border-[#334155] flex justify-between items-center">
                        <div>
                            <h3 className="text-lg font-bold text-white">Job Comparison</h3>
                            <p className="text-sm text-[#94a3b8]">Performance breakdown by active listings</p>
                        </div>
                        <div className="flex gap-2">
                            <button className="px-3 py-1.5 rounded-lg border border-[#334155] text-[#94a3b8] text-xs font-medium hover:bg-white/5 hover:text-white transition-colors flex items-center gap-1">
                                <span className="material-symbols-outlined text-[16px]">filter_list</span> Filter
                            </button>
                            <button className="px-3 py-1.5 rounded-lg border border-[#334155] text-[#94a3b8] text-xs font-medium hover:bg-white/5 hover:text-white transition-colors flex items-center gap-1">
                                <span className="material-symbols-outlined text-[16px]">sort</span> Sort
                            </button>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-[#161f2f] text-[#94a3b8] text-xs uppercase tracking-wider font-semibold border-b border-[#334155]">
                                    <th className="p-4">Job Title</th>
                                    <th className="p-4">Posted Date</th>
                                    <th className="p-4 text-right">Views</th>
                                    <th className="p-4 text-right">Swipe Right %</th>
                                    <th className="p-4 text-right">Applications</th>
                                    <th className="p-4 text-right">App. Rate</th>
                                    <th className="p-4 text-center">Benchmark</th>
                                    <th className="p-4"></th>
                                </tr>
                            </thead>
                            <tbody className="text-sm divide-y divide-[#334155]">
                                {[
                                    { abbr: 'UX', color: 'blue', title: 'Senior UX Designer', sub: 'Remote • Full-time', date: 'Oct 24, 2023', views: '1,245', swipe: 64, swipeColor: 'emerald', apps: 85, rate: '6.8%', bench: 'Above Avg', benchColor: 'emerald' },
                                    { abbr: 'FE', color: 'purple', title: 'Frontend Developer', sub: 'San Francisco • Hybrid', date: 'Oct 20, 2023', views: '2,890', swipe: 42, swipeColor: 'yellow', apps: 142, rate: '4.9%', bench: 'Average', benchColor: 'yellow' },
                                    { abbr: 'PM', color: 'pink', title: 'Product Manager', sub: 'New York • On-site', date: 'Oct 18, 2023', views: '945', swipe: 18, swipeColor: 'rose', apps: 12, rate: '1.2%', bench: 'Below Avg', benchColor: 'rose' },
                                    { abbr: 'BE', color: 'cyan', title: 'Backend Engineer', sub: 'Remote • Contract', date: 'Oct 12, 2023', views: '1,820', swipe: 55, swipeColor: 'cyan', apps: 103, rate: '5.6%', bench: 'Above Avg', benchColor: 'emerald' },
                                ].map((row, i) => (
                                    <tr key={i} className="group hover:bg-white/5 transition-colors">
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className={`h-8 w-8 rounded bg-${row.color}-500/20 flex items-center justify-center text-${row.color}-400 font-bold text-xs`}>{row.abbr}</div>
                                                <div>
                                                    <p className="font-medium text-white">{row.title}</p>
                                                    <p className="text-xs text-[#94a3b8]">{row.sub}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4 text-[#94a3b8]">{row.date}</td>
                                        <td className="p-4 text-right text-white font-medium">{row.views}</td>
                                        <td className="p-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <span className="text-white font-medium">{row.swipe}%</span>
                                                <div className="w-16 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                                                    <div className={`h-full bg-${row.swipeColor}-500`} style={{ width: `${row.swipe}%` }}></div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4 text-right text-white font-medium">{row.apps}</td>
                                        <td className="p-4 text-right text-white font-medium">{row.rate}</td>
                                        <td className="p-4 text-center">
                                            <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-${row.benchColor}-500/10 text-${row.benchColor}-400 border border-${row.benchColor}-500/20`}>
                                                {row.bench}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right">
                                            <button className="text-[#94a3b8] hover:text-white p-1 rounded hover:bg-white/10">
                                                <span className="material-symbols-outlined text-[20px]">more_vert</span>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="p-4 border-t border-[#334155] flex items-center justify-between text-xs text-[#94a3b8]">
                        <span>Showing 4 of 12 active jobs</span>
                        <div className="flex gap-2">
                            <button disabled className="px-3 py-1 rounded border border-[#334155] hover:bg-white/5 hover:text-white transition-colors disabled:opacity-50">Previous</button>
                            <button className="px-3 py-1 rounded border border-[#334155] hover:bg-white/5 hover:text-white transition-colors">Next</button>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
};

export default EmployerAnalytics;
