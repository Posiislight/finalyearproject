import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import EmployerSidebar from './EmployerSidebar';
import EmployerJobPostModal from './components/EmployerJobPostModal';
import { employerService } from './services/employerService';
import BlockLoader from './components/ui/block-loader';

const EmployerJobs = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('active');
    const [jobs, setJobs] = useState([]);
    const [applicants, setApplicants] = useState([]);
    const [insights, setInsights] = useState([]);
    const [loading, setLoading] = useState(true);
    const [insightsLoading, setInsightsLoading] = useState(true);
    const [isJobPostModalOpen, setIsJobPostModalOpen] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [jobsData, applicantsData] = await Promise.all([
                employerService.getJobPosts(),
                employerService.getAllApplicants(),
            ]);
            setJobs(jobsData);
            setApplicants(applicantsData);
        } catch (error) {
            console.error("Failed to fetch jobs:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchInsights = async () => {
        try {
            setInsightsLoading(true);
            const insightsData = await employerService.getEmployerInsights();
            if (insightsData && insightsData.insights) {
                setInsights(insightsData.insights);
            }
        } catch (error) {
            console.error("Failed to fetch insights:", error);
            // Fallback gracefully
            setInsights([]);
        } finally {
            setInsightsLoading(false);
        }
    };

    useEffect(() => {
        fetchInsights();
    }, []);

    const filteredJobs = activeTab === 'all' 
        ? jobs 
        : activeTab === 'active' 
            ? jobs.filter(j => j.status === 'open')
            : jobs.filter(j => j.status !== 'open');

    const activeCount = jobs.filter(j => j.status === 'open').length;
    const totalApplications = jobs.reduce((sum, job) => sum + job.applications_count, 0);
    const interviewsCount = applicants.filter(a => a.status === 'interviewing').length;
    const hiresCount = applicants.filter(a => a.status === 'offered').length;
    const responseRate = applicants.length > 0 ? Math.round((applicants.filter(a => a.status !== 'applied').length / applicants.length) * 100) : 0;

    let responseRateText = "Low Engagement";
    let responseRateColor = "text-orange-400";
    if (responseRate >= 70) {
        responseRateText = "High Engagement";
        responseRateColor = "text-[#22c55e]";
    } else if (responseRate >= 30) {
        responseRateText = "Good Engagement";
        responseRateColor = "text-[#2563eb]";
    }

    return (
        <div className="bg-black text-white font-['Geist_Sans',sans-serif] antialiased h-screen flex overflow-hidden">
            {/* Sidebar */}
            <EmployerSidebar />

            {/* Main Content */}
            <main className="flex-1 flex flex-col h-full overflow-hidden relative bg-black">
                <header className="flex items-center justify-between px-10 py-8 shrink-0">
                    <div>
                        <h2 className="text-3xl font-light tracking-tight text-white mb-1">Job Postings</h2>
                        <p className="text-sm text-neutral-500 font-medium tracking-wide">Manage your active and past job listings.</p>
                    </div>
                    <div className="flex items-center gap-6">
                        <button onClick={() => alert("You have 0 new notifications")} className="text-neutral-500 hover:text-white transition-colors relative">
                            <span className="material-symbols-outlined text-2xl">notifications</span>
                            <span className="absolute top-0 right-0 w-2 h-2 bg-blue-600 rounded-full hidden"></span>
                        </button>
                        <button onClick={() => setIsJobPostModalOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full text-sm font-medium transition-all flex items-center gap-2">
                            <span className="material-symbols-outlined text-lg">add</span>
                            Post Job
                        </button>
                    </div>
                </header>

                <div className="flex-1 flex overflow-hidden px-10 pb-10">
                    {/* Jobs List */}
                    <div className="flex-1 overflow-y-auto scrollbar-thin max-w-5xl pr-10">
                        {/* Stats Row */}
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                            <div className="bg-[#0a0a0a] p-5 rounded-2xl border border-neutral-900 flex flex-col">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="material-symbols-outlined text-neutral-500">work_outline</span>
                                    <span className="text-[10px] bg-blue-500/10 text-blue-500 font-bold px-2 py-1 rounded uppercase tracking-widest">
                                        Active
                                    </span>
                                </div>
                                <p className="text-3xl font-light tracking-tight text-white mb-1">{activeCount}</p>
                                <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-semibold">Active Jobs</p>
                            </div>
                            <div className="bg-[#0a0a0a] p-5 rounded-2xl border border-neutral-900 flex flex-col">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="material-symbols-outlined text-neutral-500">group</span>
                                    <span className="text-[10px] bg-neutral-900 text-neutral-400 font-bold px-2 py-1 rounded uppercase tracking-widest flex items-center gap-1">
                                        <span className="material-symbols-outlined text-[10px]">sync</span>Live
                                    </span>
                                </div>
                                <p className="text-3xl font-light tracking-tight text-white mb-1">{totalApplications}</p>
                                <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-semibold">Total Applicants</p>
                            </div>
                            <div className="bg-[#0a0a0a] p-5 rounded-2xl border border-neutral-900 flex flex-col">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="material-symbols-outlined text-neutral-500">videocam</span>
                                    <span className="text-[10px] bg-neutral-900 text-neutral-400 font-bold px-2 py-1 rounded uppercase tracking-widest flex items-center gap-1">
                                        <span className="material-symbols-outlined text-[10px]">sync</span>Live
                                    </span>
                                </div>
                                <p className="text-3xl font-light tracking-tight text-white mb-1">{interviewsCount}</p>
                                <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-semibold">Interviews</p>
                            </div>
                            <div className="bg-[#0a0a0a] p-5 rounded-2xl border border-neutral-900 flex flex-col">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="material-symbols-outlined text-neutral-500">task_alt</span>
                                    <span className="text-[10px] bg-neutral-900 text-neutral-400 font-bold px-2 py-1 rounded uppercase tracking-widest flex items-center gap-1">
                                        <span className="material-symbols-outlined text-[10px]">sync</span>Live
                                    </span>
                                </div>
                                <p className="text-3xl font-light tracking-tight text-white mb-1">{hiresCount}</p>
                                <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-semibold">Hires</p>
                            </div>
                            <div className="bg-[#0a0a0a] p-5 rounded-2xl border border-neutral-900 flex flex-col justify-between">
                                <div>
                                    <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-semibold mb-2">Response Rate</p>
                                    <div className="flex items-center gap-3">
                                        <p className="text-3xl font-light tracking-tight text-white">{responseRate}%</p>
                                    </div>
                                </div>
                                <p className={`text-[10px] font-bold uppercase tracking-widest ${responseRateColor === 'text-orange-400' ? 'text-orange-500' : responseRateColor === 'text-[#22c55e]' ? 'text-green-500' : 'text-blue-500'}`}>{responseRateText}</p>
                            </div>
                        </div>

                        {/* Active Job Postings */}
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-neutral-500 text-[20px]">list_alt</span>
                                <h3 className="text-lg font-medium text-white">Listings</h3>
                            </div>
                            <div className="flex items-center gap-1 bg-neutral-900 p-1 rounded-xl">
                                {['all', 'active', 'paused'].map(tab => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`px-4 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors ${
                                            activeTab === tab
                                                ? 'bg-neutral-800 text-white shadow-sm'
                                                : 'text-neutral-500 hover:text-white'
                                        }`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4">
                            {loading && <p className="text-center text-neutral-500 py-10 text-sm font-medium">Loading jobs...</p>}
                            {!loading && filteredJobs.length === 0 && <p className="text-center text-neutral-500 py-10 text-sm font-medium">No jobs found in this category.</p>}
                            {filteredJobs.map(job => (
                                <div key={job.id} onClick={() => navigate('/employer-candidates')} className="bg-[#0a0a0a] rounded-2xl border border-neutral-900 p-6 hover:bg-neutral-900/30 transition-colors cursor-pointer group">
                                    <div className="flex items-start gap-5">
                                        <div className="w-12 h-12 rounded-full bg-neutral-900 flex items-center justify-center shrink-0">
                                            <span className="material-symbols-outlined text-neutral-400 text-[20px]">work_outline</span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between mb-1">
                                                <div className="flex items-center gap-3">
                                                    <h4 className="font-medium text-white text-base truncate">{job.title}</h4>
                                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-widest ${
                                                        job.status === 'open'
                                                            ? 'bg-neutral-900 text-blue-500'
                                                            : 'bg-neutral-900 text-neutral-400'
                                                    }`}>
                                                        {job.status}
                                                    </span>
                                                </div>
                                                <button onClick={(e) => { e.stopPropagation(); alert("Job options (Edit, Duplicate, Close) coming soon"); }} className="text-neutral-500 hover:text-white transition-colors">
                                                    <span className="material-symbols-outlined">more_vert</span>
                                                </button>
                                            </div>
                                            <div className="flex items-center gap-2 text-xs text-neutral-500 mb-4 font-medium">
                                                <span className="material-symbols-outlined text-[14px]">location_on</span>
                                                {job.location || 'Not specified'}
                                                <span className="mx-1">•</span>
                                                {new Date(job.created_at).toLocaleDateString()}
                                            </div>
                                            <div className="flex items-center gap-6 mt-4">
                                                <div>
                                                    <span className="text-xs text-neutral-500 font-semibold uppercase tracking-widest mr-2">Applications</span>
                                                    <span className="text-sm font-bold text-white bg-neutral-900 px-2.5 py-1 rounded">{job.applications_count}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* AI Recruiter Insights Sidebar */}
                    <aside className="w-80 bg-[#0a0a0a] border border-neutral-900 rounded-2xl p-6 overflow-y-auto hidden xl:block shrink-0">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="material-symbols-outlined text-blue-500 text-[20px]">auto_awesome</span>
                            <h3 className="font-medium text-white text-base">AI Insights</h3>
                        </div>
                        <p className="text-xs text-neutral-500 mb-8 font-medium leading-relaxed">Our AI has analyzed your job performance. Here are actionable suggestions to boost visibility.</p>

                        <div className="space-y-4">
                            {insightsLoading ? (
                                <div className="text-center py-8">
                                    <BlockLoader size={20} gap={3} className="mx-auto mb-3" />
                                    <p className="text-xs text-neutral-500 font-medium">Analyzing your jobs...</p>
                                </div>
                            ) : insights.length === 0 ? (
                                <p className="text-xs text-neutral-600 text-center py-4 font-medium">No insights available right now.</p>
                            ) : (
                                insights.map((insight, index) => (
                                    <div key={index} className="bg-black p-5 rounded-xl border border-neutral-900/50">
                                        <div className="flex items-start gap-3 mb-3">
                                            <div className={`w-1.5 h-1.5 rounded-full ${insight.icon_color === 'green-500' ? 'bg-green-500' : insight.icon_color === 'yellow-400' ? 'bg-yellow-500' : 'bg-blue-500'} mt-1.5 shrink-0`}></div>
                                            <div>
                                                <h4 className="font-medium text-white text-sm mb-1">{insight.title}</h4>
                                                <p className="text-xs text-neutral-500 leading-relaxed">
                                                    {insight.description_start}
                                                    <span className="text-neutral-300 font-medium">{insight.highlight_text}</span>
                                                    {insight.description_end}
                                                </p>
                                            </div>
                                        </div>
                                        <button onClick={() => alert("Applying AI insight: " + insight.action_text)} className="text-xs text-blue-500 hover:text-blue-400 font-medium mt-2 flex items-center gap-1 transition-colors ml-4.5">
                                            {insight.action_text} <span className="material-symbols-outlined text-[14px]">{insight.action_icon || 'arrow_forward'}</span>
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                    </aside>
                </div>
            </main>
            
            <EmployerJobPostModal 
                isOpen={isJobPostModalOpen} 
                onClose={() => setIsJobPostModalOpen(false)} 
                onSuccess={() => {
                    fetchData();
                }} 
            />
        </div>
    );
};

export default EmployerJobs;
