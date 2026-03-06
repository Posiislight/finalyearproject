import React, { useState, useEffect } from 'react';
import EmployerSidebar from './EmployerSidebar';
import { employerService } from './services/employerService';

const EmployerAnalytics = () => {
    const [dateRange, setDateRange] = useState('Last 30 Days');
    const [jobs, setJobs] = useState([]);
    const [applicants, setApplicants] = useState([]);
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Calculate date range (approximate for demo purposes)
                let start = null;
                const today = new Date();
                if (dateRange === 'Last 30 Days') {
                    start = new Date(today.setDate(today.getDate() - 30));
                } else if (dateRange === 'Last 7 Days') {
                    start = new Date(today.setDate(today.getDate() - 7));
                }
                const startDateStr = start ? start.toISOString().split('T')[0] : null;
                const endDateStr = new Date().toISOString().split('T')[0];

                const [jobsData, applicantsData, analyticsData] = await Promise.all([
                    employerService.getJobPosts(),
                    employerService.getAllApplicants(),
                    employerService.getAnalyticsSummary(startDateStr, endDateStr).catch(() => null)
                ]);
                
                setJobs(jobsData);
                setApplicants(applicantsData);
                setAnalytics(analyticsData);
            } catch (error) {
                console.error("Failed to fetch analytics:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [dateRange]);

    const activeCount = jobs.filter(j => j.status === 'open').length;
    const totalViews = analytics?.totals?.views || 0;
    const totalShortlists = analytics?.totals?.shortlists || 0;
    const swipeRightRate = totalViews > 0 ? Math.round((totalShortlists / totalViews) * 100) : 0;
    const totalApplications = applicants.length;

    // --- Dynamic SVG Chart Calculation for Views & Applications --- //
    const CHART_WIDTH = 800;
    const CHART_HEIGHT = 300;
    const PADDING_V = 40;  // Don't draw points at the absolute top/bottom edge
    
    // Sort chronological: oldest to newest
    const perDayData = (analytics?.per_day || []).sort((a, b) => new Date(a.date) - new Date(b.date));
    
    // Helper to generate a Smooth SVG Path string
    const generatePath = (data, valueKey, height, width, padding, isArea = false) => {
        if (!data || data.length === 0) return `M0,${height - padding} L${width},${height - padding}`;
        if (data.length === 1) return `M0,${height - padding} L${width},${height - padding}`;

        const maxVal = Math.max(...data.map(d => Number(d[valueKey]) || 0));
        // Use a baseline max of 10 if there's very little data so the chart doesn't look bizarre
        const maxScale = maxVal < 10 ? 10 : maxVal;

        const points = data.map((d, index) => {
            const x = (index / (data.length - 1)) * width;
            const val = Number(d[valueKey]) || 0;
            // Invert Y axis since SVG 0,0 is top-left
            const y = height - padding - ((val / maxScale) * (height - (padding * 2)));
            return [x, y];
        });

        // Simple smooth bezier interpolation
        let path = `M${points[0][0]},${points[0][1]}`;
        for (let i = 0; i < points.length - 1; i++) {
            const current = points[i];
            const next = points[i+1];
            // Control points spread halfway across the X distance between points
            const cp1X = current[0] + (next[0] - current[0]) / 2;
            const cp2X = current[0] + (next[0] - current[0]) / 2;
            path += ` C${cp1X},${current[1]} ${cp2X},${next[1]} ${next[0]},${next[1]}`;
        }

        if (isArea) {
            path += ` V${height} H0 Z`;
        }
        return path;
    };

    const viewsPath = generatePath(perDayData, 'views', CHART_HEIGHT, CHART_WIDTH, PADDING_V);
    const viewsAreaPath = generatePath(perDayData, 'views', CHART_HEIGHT, CHART_WIDTH, PADDING_V, true);
    
    // Note: applicants.length is NOT per day yet in backend, but backend does track shortlists/clicks
    // Use shortlists as the secondary green line instead of applying since we have those analytics.
    const shortlistsPath = generatePath(perDayData, 'shortlists', CHART_HEIGHT, CHART_WIDTH, PADDING_V);

    // Donut Chart logic
    const donutRadius = 80;
    const donutCircumference = 2 * Math.PI * donutRadius; // ~502.6
    const donutLikesLength = (swipeRightRate / 100) * donutCircumference;
    const donutPassLength = donutCircumference - donutLikesLength;
    const donutPassOffset = 0;
    const donutLikesOffset = -donutPassLength - 10; // small gap

    // ---- Export Report as CSV ---- //
    const exportReport = () => {
        const rows = [
            ['JobSwipe Analytics Report'],
            [`Date Range: ${dateRange}`],
            [`Generated: ${new Date().toLocaleString()}`],
            [],
            ['=== KPI Summary ==='],
            ['Metric', 'Value'],
            ['Active Jobs', activeCount],
            ['Total Views', totalViews],
            ['Swipe Right Rate', `${swipeRightRate}%`],
            ['Total Applications', totalApplications],
            ['Total Shortlists', totalShortlists],
            [],
            ['=== Job Performance ==='],
            ['Title', 'Location', 'Type', 'Posted Date', 'Applications', 'Status'],
            ...jobs.map(job => [
                job.title || 'Untitled',
                job.location || 'Remote',
                job.job_type === 'ft' ? 'Full-time' : job.job_type === 'pt' ? 'Part-time' : job.job_type || 'Full-time',
                new Date(job.created_at).toLocaleDateString(),
                job.applications_count || 0,
                job.status || 'open',
            ]),
        ];

        if (perDayData.length > 0) {
            rows.push([]);
            rows.push(['=== Daily Breakdown ===']);
            rows.push(['Date', 'Views', 'Shortlists']);
            perDayData.forEach(d => {
                rows.push([d.date, d.views || 0, d.shortlists || 0]);
            });
        }

        // Build CSV string and trigger download
        const csvContent = rows.map(r => r.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')).join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `jobswipe-analytics-${dateRange.replace(/\s+/g, '-').toLowerCase()}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="bg-black text-white font-['DM_Sans',sans-serif] antialiased min-h-screen flex overflow-x-hidden">
            {/* Global Sidebar */}
            <EmployerSidebar />

            {/* Main Content */}
            <main className="flex-1 p-8 max-w-[1600px] mx-auto w-full overflow-y-auto">

                {/* Header Section */}
                <div className="flex flex-col gap-6 mb-8">
                    {/* Breadcrumbs */}
                    <div className="flex items-center gap-2 text-sm text-[#94a3b8]">
                        <a href="/employer-dashboard" className="hover:text-white transition-colors">Analytics</a>
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
                                    className="appearance-none bg-black border border-white/10 text-white pl-4 pr-10 py-2.5 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#2463eb] focus:border-transparent cursor-pointer hover:border-[#2463eb] transition-all"
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
                            <button onClick={exportReport} className="flex items-center gap-2 bg-[#2463eb] hover:bg-[#2463eb]/90 text-white px-4 py-2.5 rounded-lg text-sm font-bold shadow-lg shadow-[#2463eb]/25 transition-all hover:shadow-[#2463eb]/40 hover:border-[#2463eb]">
                                <span className="material-symbols-outlined text-[20px]">download</span>
                                Export Report
                            </button>
                        </div>
                    </div>
                </div>

                {/* KPI Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {/* Active Jobs */}
                    <div className="bg-white/5 border border-white/10 rounded-xl p-5 hover:shadow-[0_0_15px_rgba(36,99,235,0.3)] hover:border-[#2463eb] transition-all group">
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
                            <span className="text-2xl font-bold text-white">{loading ? '...' : activeCount}</span>
                        </div>
                    </div>

                    {/* Total Views */}
                    <div className="bg-white/5 border border-white/10 rounded-xl p-5 hover:shadow-[0_0_15px_rgba(36,99,235,0.3)] hover:border-[#2463eb] transition-all group">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
                                <span className="material-symbols-outlined">visibility</span>
                            </div>
                            <span className="px-2 py-1 text-xs font-medium text-emerald-400 bg-emerald-400/10 rounded-full flex items-center gap-1">
                                <span className="material-symbols-outlined text-[12px]">trending_up</span> Live
                            </span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-[#94a3b8] text-sm font-medium">Total Views</span>
                            <span className="text-2xl font-bold text-white">{loading ? '...' : totalViews.toLocaleString()}</span>
                        </div>
                    </div>

                    {/* Swipe Right Rate */}
                    <div className="bg-white/5 border border-white/10 rounded-xl p-5 hover:shadow-[0_0_15px_rgba(36,99,235,0.3)] hover:border-[#2463eb] transition-all group">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-rose-500/10 rounded-lg text-rose-400">
                                <span className="material-symbols-outlined">favorite</span>
                            </div>
                            <span className="px-2 py-1 text-xs font-medium text-emerald-400 bg-emerald-400/10 rounded-full flex items-center gap-1">
                                <span className="material-symbols-outlined text-[12px]">trending_up</span> Live
                            </span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-[#94a3b8] text-sm font-medium">Avg. Swipe Right</span>
                            <span className="text-2xl font-bold text-white">{loading ? '...' : `${swipeRightRate}%`}</span>
                        </div>
                    </div>

                    {/* Applications */}
                    <div className="bg-white/5 border border-white/10 rounded-xl p-5 hover:shadow-[0_0_15px_rgba(36,99,235,0.3)] hover:border-[#2463eb] transition-all group">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-amber-500/10 rounded-lg text-amber-400">
                                <span className="material-symbols-outlined">description</span>
                            </div>
                            <span className="px-2 py-1 text-xs font-medium text-emerald-400 bg-emerald-400/10 rounded-full flex items-center gap-1">
                                <span className="material-symbols-outlined text-[12px]">trending_up</span> Live
                            </span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-[#94a3b8] text-sm font-medium">Total Applications</span>
                            <span className="text-2xl font-bold text-white">{loading ? '...' : totalApplications}</span>
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
                        <line x1="0" y1="250" x2="800" y2="250" stroke="rgba(255,255,255,0.07)" strokeWidth="1" strokeDasharray="4 4" />
                        <line x1="0" y1="175" x2="800" y2="175" stroke="rgba(255,255,255,0.07)" strokeWidth="1" strokeDasharray="4 4" />
                        <line x1="0" y1="100" x2="800" y2="100" stroke="rgba(255,255,255,0.07)" strokeWidth="1" strokeDasharray="4 4" />
                        <line x1="0" y1="25" x2="800" y2="25" stroke="rgba(255,255,255,0.07)" strokeWidth="1" strokeDasharray="4 4" />
                                {/* Views Line (Blue) */}
                                <path d={viewsPath} fill="none" stroke="#2463eb" strokeWidth="3" />
                                {/* Area under Views */}
                                <path d={viewsAreaPath} fill="url(#blueGradient)" opacity="0.1" />
                                {/* Shortlists Line (Green) */}
                                <path d={shortlistsPath} fill="none" stroke="#0bda62" strokeWidth="3" />
                            </svg>
                            <div className="flex justify-between text-xs text-[#94a3b8] mt-2 px-1">
                                {perDayData.length > 0 ? (
                                    <>
                                        <span>{new Date(perDayData[0].date).toLocaleDateString(undefined, { month: 'short', day: 'numeric'})}</span>
                                        {perDayData.length > 2 && (
                                            <span>{new Date(perDayData[Math.floor(perDayData.length/2)].date).toLocaleDateString(undefined, { month: 'short', day: 'numeric'})}</span>
                                        )}
                                        <span>{new Date(perDayData[perDayData.length - 1].date).toLocaleDateString(undefined, { month: 'short', day: 'numeric'})}</span>
                                    </>
                                ) : (
                                    <span>No activity data available</span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Swipe Sentiment Donut */}
                    <div className="lg:col-span-1 bg-[#1e293b] border border-[#334155] rounded-xl p-6 hover:shadow-[0_0_15px_rgba(36,99,235,0.3)] hover:border-[#2463eb] transition-all flex flex-col">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h3 className="text-lg font-bold text-white">Swipe Sentiment</h3>
                                <p className="text-sm text-[#94a3b8]">All Active Jobs</p>
                            </div>
                            <button onClick={() => alert("Additional options coming soon")} className="text-[#94a3b8] hover:text-white">
                                <span className="material-symbols-outlined">more_horiz</span>
                            </button>
                        </div>
                        <div className="flex-1 flex flex-col items-center justify-center relative">
                            <div className="relative w-48 h-48">
                                <svg className="w-full h-full -rotate-90">
                        <circle cx="96" cy="96" r="80" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="12" />
                                    {totalViews > 0 && (
                                        <>
                                            <circle cx="96" cy="96" r="80" fill="none" stroke="#ef4444" strokeWidth="12" strokeDasharray={`${donutPassLength} ${donutCircumference}`} strokeDashoffset={donutPassOffset} strokeLinecap="round" />
                                            <circle cx="96" cy="96" r="80" fill="none" stroke="#0bda62" strokeWidth="12" strokeDasharray={`${donutLikesLength} ${donutCircumference}`} strokeDashoffset={donutLikesOffset} strokeLinecap="round" />
                                        </>
                                    )}
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-3xl font-bold text-white">{loading ? '...' : totalViews === 0 ? 'N/A' : `${swipeRightRate}%`}</span>
                                    <span className="text-xs text-[#94a3b8] uppercase tracking-wider font-semibold">Interest Rate</span>
                                </div>
                            </div>
                            <div className="flex w-full justify-between mt-8 px-4">
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-white">{loading ? '...' : totalViews === 0 ? '—' : `${100 - swipeRightRate}%`}</p>
                                    <p className="text-xs text-rose-400 font-medium flex items-center justify-center gap-1">
                                        <span className="material-symbols-outlined text-[14px]">close</span> Pass
                                    </p>
                                </div>
                        <div className="h-10 w-px bg-white/10"></div>
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-white">{loading ? '...' : totalViews === 0 ? '—' : `${swipeRightRate}%`}</p>
                                    <p className="text-xs text-emerald-400 font-medium flex items-center justify-center gap-1">
                                        <span className="material-symbols-outlined text-[14px]">favorite</span> Like
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Job Comparison Table */}
                <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:shadow-[0_0_15px_rgba(36,99,235,0.3)] hover:border-[#2463eb] transition-all">
                    <div className="p-6 border-b border-white/10 flex justify-between items-center">
                        <div>
                            <h3 className="text-lg font-bold text-white">Job Comparison</h3>
                            <p className="text-sm text-[#94a3b8]">Performance breakdown by active listings</p>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => alert("Filter functionality coming soon")} className="px-3 py-1.5 rounded-lg border border-white/10 text-[#94a3b8] text-xs font-medium hover:bg-white/5 hover:text-white transition-colors flex items-center gap-1">
                                <span className="material-symbols-outlined text-[16px]">filter_list</span> Filter
                            </button>
                            <button onClick={() => alert("Sort functionality coming soon")} className="px-3 py-1.5 rounded-lg border border-white/10 text-[#94a3b8] text-xs font-medium hover:bg-white/5 hover:text-white transition-colors flex items-center gap-1">
                                <span className="material-symbols-outlined text-[16px]">sort</span> Sort
                            </button>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-black text-[#94a3b8] text-xs uppercase tracking-wider font-semibold border-b border-white/10">
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
                            <tbody className="text-sm divide-y divide-white/10">
                                {jobs.map((job, i) => {
                                    const colors = ['blue', 'purple', 'pink', 'cyan', 'emerald', 'yellow', 'rose'];
                                    const color = colors[i % colors.length];
                                    const abbr = job.title ? job.title.substring(0, 2).toUpperCase() : 'JB';
                                    const date = new Date(job.created_at).toLocaleDateString();
                                    const apps = job.applications_count || 0;
                                    
                                    return (
                                        <tr key={job.id} className="group hover:bg-white/5 transition-colors">
                                            <td className="p-4">
                                                <div className="flex items-center gap-3">
                                                    <div className={`h-8 w-8 rounded bg-${color}-500/20 flex items-center justify-center text-${color}-400 font-bold text-xs`}>{abbr}</div>
                                                    <div>
                                                        <p className="font-medium text-white">{job.title}</p>
                                                        <p className="text-xs text-[#94a3b8]">{job.location || 'Remote'} • {job.job_type === 'ft' ? 'Full-time' : job.job_type === 'pt' ? 'Part-time' : job.job_type || 'Full-time'}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4 text-[#94a3b8]">{date}</td>
                                            <td className="p-4 text-right text-[#94a3b8] font-medium">—</td>
                                            <td className="p-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <span className="text-[#94a3b8] font-medium">—</span>
                                                </div>
                                            </td>
                                            <td className="p-4 text-right text-white font-medium">{apps}</td>
                                            <td className="p-4 text-right text-[#94a3b8] font-medium">—</td>
                                            <td className="p-4 text-center">
                                                <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-500/10 text-gray-400 border border-gray-500/20`}>
                                                    N/A
                                                </span>
                                            </td>
                                            <td className="p-4 text-right">
                                                <button onClick={() => alert("Job analytics options coming soon")} className="text-[#94a3b8] hover:text-white p-1 rounded hover:bg-white/10">
                                                    <span className="material-symbols-outlined text-[20px]">more_vert</span>
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className="p-4 border-t border-white/10 flex items-center justify-between text-xs text-[#94a3b8]">
                        <span>Showing {jobs.length} of {jobs.length} active jobs</span>
                        <div className="flex gap-2">
                            <button disabled className="px-3 py-1 rounded border border-white/10 hover:bg-white/5 hover:text-white transition-colors disabled:opacity-50">Previous</button>
                            <button disabled className="px-3 py-1 rounded border border-white/10 hover:bg-white/5 hover:text-white transition-colors disabled:opacity-50">Next</button>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
};

export default EmployerAnalytics;
