import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import EmployerSidebar from './EmployerSidebar';
import { employerService } from './services/employerService';

const EmployerJobs = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('active');
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const data = await employerService.getJobPosts();
                setJobs(data);
            } catch (error) {
                console.error("Failed to fetch jobs:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchJobs();
    }, []);

    const filteredJobs = activeTab === 'all' 
        ? jobs 
        : activeTab === 'active' 
            ? jobs.filter(j => j.status === 'open')
            : jobs.filter(j => j.status !== 'open');

    const activeCount = jobs.filter(j => j.status === 'open').length;
    const totalApplications = jobs.reduce((sum, job) => sum + job.applications_count, 0);

    return (
        <div className="bg-[#111827] text-[#f9fafb] font-['DM_Sans',sans-serif] antialiased h-screen flex overflow-hidden">
            {/* Sidebar */}
            {/* Sidebar */}
            <EmployerSidebar />

            {/* Main Content */}
            <main className="flex-1 flex flex-col h-full overflow-hidden relative bg-[#111827]">
                <header className="flex items-center justify-between px-8 py-4 bg-[#1F2937] border-b border-[#374151] shadow-sm z-10 shrink-0">
                    <div>
                        <h2 className="text-lg font-bold text-[#f9fafb]">Job Postings</h2>
                        <p className="text-sm text-[#9ca3af]">Manage your active and past job listings.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-gray-800 text-[#9ca3af] hover:text-[#f9fafb] transition-colors relative">
                            <span className="material-symbols-outlined">notifications</span>
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-[#1F2937]"></span>
                        </button>
                        <button className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-lg shadow-[#2563eb]/30 transition-all flex items-center gap-2">
                            <span className="material-symbols-outlined text-lg">add</span>
                            Post New Job
                        </button>
                    </div>
                </header>

                <div className="flex-1 flex overflow-hidden">
                    {/* Jobs List */}
                    <div className="flex-1 overflow-y-auto p-6 lg:p-10 scrollbar-thin">
                        <div className="max-w-4xl mx-auto">
                            {/* Stats Row */}
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                                <div className="bg-[#1F2937] p-4 rounded-xl border border-[#374151]">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="material-symbols-outlined text-[#2563eb]">work</span>
                                        <span className="text-[10px] bg-green-900/20 text-[#22c55e] px-2 py-0.5 rounded-full border border-green-900/30 font-medium flex items-center gap-0.5">
                                            <span className="material-symbols-outlined text-[10px]">trending_up</span>+12%
                                        </span>
                                    </div>
                                    <p className="text-2xl font-bold text-[#f9fafb]">{activeCount}</p>
                                    <p className="text-[10px] text-[#9ca3af] uppercase tracking-wider font-medium mt-0.5">Active Jobs</p>
                                </div>
                                <div className="bg-[#1F2937] p-4 rounded-xl border border-[#374151]">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="material-symbols-outlined text-orange-400">people</span>
                                        <span className="text-[10px] bg-green-900/20 text-[#22c55e] px-2 py-0.5 rounded-full border border-green-900/30 font-medium flex items-center gap-0.5">
                                            <span className="material-symbols-outlined text-[10px]">trending_up</span>+24%
                                        </span>
                                    </div>
                                    <p className="text-2xl font-bold text-[#f9fafb]">{totalApplications}</p>
                                    <p className="text-[10px] text-[#9ca3af] uppercase tracking-wider font-medium mt-0.5">Total Applicants</p>
                                </div>
                                <div className="bg-[#1F2937] p-4 rounded-xl border border-[#374151]">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="material-symbols-outlined text-yellow-400">star</span>
                                        <span className="text-[10px] text-[#9ca3af] font-medium">This week</span>
                                    </div>
                                    <p className="text-2xl font-bold text-[#f9fafb]">18</p>
                                    <p className="text-[10px] text-[#9ca3af] uppercase tracking-wider font-medium mt-0.5">Interviews</p>
                                </div>
                                <div className="bg-[#1F2937] p-4 rounded-xl border border-[#374151]">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="material-symbols-outlined text-[#22c55e]">check_circle</span>
                                        <span className="text-[10px] text-[#9ca3af] font-medium">This month</span>
                                    </div>
                                    <p className="text-2xl font-bold text-[#f9fafb]">3</p>
                                    <p className="text-[10px] text-[#9ca3af] uppercase tracking-wider font-medium mt-0.5">Hires</p>
                                </div>
                                <div className="bg-[#1F2937] p-4 rounded-xl border border-[#374151]">
                                    <div className="mb-2">
                                        <p className="text-[10px] text-[#9ca3af] uppercase tracking-wider font-semibold">Response Rate</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <p className="text-2xl font-bold text-[#f9fafb]">85%</p>
                                        <svg className="w-10 h-10" viewBox="0 0 36 36">
                                            <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#374151" strokeWidth="3" />
                                            <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#2563eb" strokeWidth="3" strokeDasharray="85, 100" strokeLinecap="round" />
                                        </svg>
                                    </div>
                                    <p className="text-[10px] text-[#22c55e] font-medium mt-0.5">High engagement</p>
                                </div>
                            </div>

                            {/* Active Job Postings */}
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-[#2563eb]">list_alt</span>
                                    <h3 className="text-lg font-bold text-[#f9fafb]">Active Job Postings</h3>
                                </div>
                                <div className="flex items-center gap-2">
                                    {['all', 'active', 'paused'].map(tab => (
                                        <button
                                            key={tab}
                                            onClick={() => setActiveTab(tab)}
                                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors capitalize ${
                                                activeTab === tab
                                                    ? 'bg-[#2563eb] text-white'
                                                    : 'bg-gray-800 text-[#9ca3af] hover:text-[#f9fafb] border border-[#374151]'
                                            }`}
                                        >
                                            {tab}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-4">
                                {loading && <p className="text-center text-[#9ca3af] py-10">Loading jobs...</p>}
                                {!loading && filteredJobs.length === 0 && <p className="text-center text-[#9ca3af] py-10">No jobs found in this category.</p>}
                                {filteredJobs.map(job => (
                                    <div key={job.id} onClick={() => navigate('/employer-candidates')} className="bg-[#1F2937] rounded-2xl border border-[#374151] p-6 hover:border-[#2563eb]/40 transition-colors cursor-pointer group">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-gray-800 border border-[#374151] flex items-center justify-center shrink-0 group-hover:border-[#2563eb]/30 transition-colors">
                                                <span className="material-symbols-outlined text-[#2563eb]">work</span>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-3 mb-1">
                                                    <h4 className="font-bold text-[#f9fafb]">{job.title}</h4>
                                                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded uppercase tracking-wider ${
                                                        job.status === 'open'
                                                            ? 'bg-green-900/20 text-[#22c55e] border border-green-900/30'
                                                            : 'bg-yellow-900/20 text-yellow-400 border border-yellow-900/30'
                                                    }`}>
                                                        {job.status}
                                                    </span>
                                                    <button className="ml-auto text-[#9ca3af] hover:text-[#f9fafb]">
                                                        <span className="material-symbols-outlined">more_vert</span>
                                                    </button>
                                                </div>
                                                <div className="flex items-center gap-2 text-xs text-[#9ca3af] mb-4">
                                                    <span className="material-symbols-outlined text-sm">location_on</span>
                                                    {job.location || 'Not specified'}
                                                    <span className="text-gray-600">•</span>
                                                    {new Date(job.created_at).toLocaleDateString()}
                                                </div>
                                                <div className="flex items-center gap-6">
                                                    <div>
                                                        <p className="text-xl font-bold text-[#f9fafb]">{job.applications_count}</p>
                                                        <p className="text-[10px] text-[#9ca3af] uppercase tracking-wider font-medium">Applications</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* AI Recruiter Insights Sidebar */}
                    <aside className="w-80 bg-[#1F2937] border-l border-[#374151] p-6 overflow-y-auto hidden xl:block shrink-0">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="material-symbols-outlined text-yellow-400">auto_awesome</span>
                            <h3 className="font-bold text-[#f9fafb]">AI Recruiter Insights</h3>
                        </div>
                        <p className="text-xs text-[#9ca3af] mb-6">Our AI has analyzed your job performance. Here are actionable suggestions to boost visibility.</p>

                        <div className="space-y-5">
                            {/* Insight 1 */}
                            <div className="bg-[#111827] p-4 rounded-xl border border-[#374151]">
                                <div className="flex items-start gap-3 mb-2">
                                    <div className="w-2 h-2 rounded-full bg-red-500 mt-1.5 shrink-0"></div>
                                    <div>
                                        <h4 className="font-semibold text-[#f9fafb] text-sm">Optimize "Frontend Developer" Title</h4>
                                        <p className="text-xs text-[#9ca3af] mt-1">Changing to "Senior React Engineer" could increase qualified senior matches by <span className="text-[#2563eb] font-semibold">18%</span>.</p>
                                    </div>
                                </div>
                                <button className="text-xs text-[#2563eb] hover:text-[#1d4ed8] font-semibold mt-1 flex items-center gap-1">
                                    Apply Suggestion <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                </button>
                            </div>

                            {/* Insight 2 */}
                            <div className="bg-[#111827] p-4 rounded-xl border border-[#374151]">
                                <div className="flex items-start gap-3 mb-2">
                                    <div className="w-2 h-2 rounded-full bg-yellow-400 mt-1.5 shrink-0"></div>
                                    <div>
                                        <h4 className="font-semibold text-[#f9fafb] text-sm">Salary Transparency Boost</h4>
                                        <p className="text-xs text-[#9ca3af] mt-1">Adding a salary range to the "Product Designer" role typically improves response rates by <span className="text-[#2563eb] font-semibold">30%</span>.</p>
                                    </div>
                                </div>
                                <button className="text-xs text-[#2563eb] hover:text-[#1d4ed8] font-semibold mt-1 flex items-center gap-1">
                                    Update Job Details <span className="material-symbols-outlined text-sm">edit</span>
                                </button>
                            </div>

                            {/* Insight 3 */}
                            <div className="bg-[#111827] p-4 rounded-xl border border-[#374151]">
                                <div className="flex items-start gap-3 mb-2">
                                    <div className="w-2 h-2 rounded-full bg-orange-400 mt-1.5 shrink-0"></div>
                                    <div>
                                        <h4 className="font-semibold text-[#f9fafb] text-sm">Low Weekend Engagement</h4>
                                        <p className="text-xs text-[#9ca3af] mt-1">Your posts get 40% less visibility on Saturdays. Consider scheduling bumps for Monday mornings.</p>
                                    </div>
                                </div>
                                <button className="text-xs text-[#9ca3af] hover:text-[#f9fafb] font-semibold mt-1 flex items-center gap-1">
                                    <span className="material-symbols-outlined text-sm">refresh</span> Refresh Analysis
                                </button>
                            </div>
                        </div>
                    </aside>
                </div>
            </main>
        </div>
    );
};

export default EmployerJobs;
