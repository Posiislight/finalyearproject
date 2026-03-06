import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import EmployerSidebar from './EmployerSidebar';
import EmployerJobPostModal from './components/EmployerJobPostModal';
import { employerService } from './services/employerService';
import { useAuth } from './contexts/AuthContext';

const EmployerDashboard = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [jobs, setJobs] = useState([]);
    const [applicants, setApplicants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isJobPostModalOpen, setIsJobPostModalOpen] = useState(false);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const [jobsData, applicantsData] = await Promise.all([
                employerService.getJobPosts(),
                employerService.getAllApplicants()
            ]);
            setJobs(jobsData);
            setApplicants(applicantsData);
        } catch (error) {
            console.error("Failed to fetch employer dashboard data:", error);
        } finally {
            setLoading(false);
        }
    };

    const activeJobsCount = jobs.filter(j => j.status === 'open').length;
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
    
    // Calculate Response Rate safely
    const responseRate = applicants.length > 0 
        ? Math.round((applicants.filter(a => a.status !== 'applied').length / applicants.length) * 100) 
        : 0;

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
        <div className="bg-black text-[#f9fafb] font-['DM_Sans',sans-serif] antialiased h-screen flex overflow-hidden">
            {/* Sidebar */}
            <EmployerSidebar />

            {/* Main Content */}
            <main className="flex-1 flex flex-col h-full overflow-hidden relative bg-black">
                <header className="flex items-center justify-between px-8 py-4 bg-white/5 border-b border-white/10 shadow-sm z-10 shrink-0">
                    <div>
                        <h2 className="text-lg font-bold text-[#f9fafb]">Dashboard</h2>
                        <p className="text-sm text-[#9ca3af]">{today} • Welcome back, {user?.first_name || 'Employer'}!</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button onClick={() => alert("You have 0 new notifications")} className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-gray-800 text-[#9ca3af] hover:text-[#f9fafb] transition-colors relative">
                             <span className="material-symbols-outlined">notifications</span>
                             <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-black hidden"></span>
                        </button>
                        <button onClick={() => setIsJobPostModalOpen(true)} className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-lg shadow-[#2563eb]/30 transition-all flex items-center gap-2">
                             <span className="material-symbols-outlined text-lg">add</span>
                             Post a Job
                        </button>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-6 lg:p-10 scrollbar-thin">
                    <div className="max-w-6xl mx-auto space-y-8">
                        
                        {/* Stats Overview */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                             <div className="bg-white/5 p-6 rounded-2xl border border-white/10 shadow-sm">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="w-10 h-10 rounded-lg bg-blue-900/20 flex items-center justify-center text-[#2563eb]">
                                         <span className="material-symbols-outlined">work</span>
                                    </div>
                                     <span className="items-center bg-white/5 text-[#9ca3af] text-[10px] px-2 py-0.5 rounded-full border border-white/10 font-medium whitespace-nowrap">Active</span>
                                </div>
                                <h3 className="text-3xl font-bold text-[#f9fafb] mb-1">{activeJobsCount}</h3>
                                <p className="text-sm text-[#9ca3af]">Active Job Posts</p>
                             </div>
                             
                             <div className="bg-white/5 p-6 rounded-2xl border border-white/10 shadow-sm">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="w-10 h-10 rounded-lg bg-green-900/20 flex items-center justify-center text-[#22c55e]">
                                         <span className="material-symbols-outlined">people</span>
                                    </div>
                                    <span className="items-center bg-green-900/20 text-[#22c55e] text-[10px] px-2 py-0.5 rounded-full border border-green-900/30 font-medium flex gap-1 whitespace-nowrap">
                                        <span className="material-symbols-outlined text-[10px]">sync</span>
                                        Live
                                    </span>
                                </div>
                                <h3 className="text-3xl font-bold text-[#f9fafb] mb-1">{applicants.length}</h3>
                                <p className="text-sm text-[#9ca3af]">Total Candidates</p>
                             </div>

                             <div className="bg-white/5 p-6 rounded-2xl border border-white/10 shadow-sm">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="w-10 h-10 rounded-lg bg-purple-900/20 flex items-center justify-center text-purple-400">
                                         <span className="material-symbols-outlined">handshake</span>
                                    </div>
                                    <span className="items-center bg-purple-900/20 text-purple-400 text-[10px] px-2 py-0.5 rounded-full border border-purple-900/30 font-medium flex gap-1 whitespace-nowrap">
                                        <span className="material-symbols-outlined text-[10px]">sync</span>
                                        Live
                                    </span>
                                </div>
                                <h3 className="text-3xl font-bold text-[#f9fafb] mb-1">{applicants.filter(a => a.status === 'interviewing').length}</h3>
                                <p className="text-sm text-[#9ca3af]">Interviews</p>
                             </div>
                             
                              <div className="bg-white/5 p-6 rounded-2xl border border-white/10 shadow-sm">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="w-10 h-10 rounded-lg bg-orange-900/20 flex items-center justify-center text-orange-400">
                                         <span className="material-symbols-outlined">speed</span>
                                    </div>
                                      <span className="items-center bg-white/5 text-[#9ca3af] text-[10px] px-2 py-0.5 rounded-full border border-white/10 font-medium whitespace-nowrap">Rate</span>
                                </div>
                                <h3 className="text-3xl font-bold text-[#f9fafb] mb-1">{responseRate}%</h3>
                                <p className={`text-sm ${responseRateColor}`}>{responseRateText}</p>
                             </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Recent Candidates */}
                            <div className="lg:col-span-2 bg-white/5 rounded-2xl border border-white/10">
                                <div className="p-6 border-b border-white/10 flex items-center justify-between">
                                    <h3 className="font-bold text-[#f9fafb] text-lg">Recent Matches</h3>
                                    <button onClick={() => navigate('/employer-candidates')} className="text-sm text-[#2563eb] hover:text-[#1d4ed8] font-medium hover:underline">View All</button>
                                </div>
                                <div className="p-6 space-y-4">
                                    {applicants.length === 0 ? (
                                        <p className="text-sm text-center text-[#9ca3af] py-10">No recent applications found.</p>
                                    ) : applicants.slice(0, 5).map((app) => (
                                        <div key={app.id} className="flex items-center gap-4 bg-black p-4 rounded-xl border border-white/10 hover:border-[#2563eb]/50 transition-colors group cursor-pointer">
                                            <div className="relative">
                                                 <div className="w-12 h-12 rounded-full bg-[#2563eb] flex items-center justify-center text-white font-bold border-2 border-white/10">
                                                    {app.job_seeker_details.first_name?.[0] || 'J'}{app.job_seeker_details.last_name?.[0] || 'S'}
                                                 </div>
                                                 <div className="absolute -bottom-1 -right-1 bg-black rounded-full p-0.5">
                                                     <div className="w-3 h-3 bg-green-500 rounded-full border-2 border-black"></div>
                                                 </div>
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-bold text-[#f9fafb] text-sm">{app.job_seeker_details.first_name} {app.job_seeker_details.last_name}</h4>
                                                <p className="text-xs text-[#9ca3af]">Applied for <span className="text-[#f9fafb] font-medium">{app.job_post_details.title}</span></p>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className={`text-[10px] px-2 py-0.5 rounded border ${app.status === 'applied' ? 'bg-gray-800 text-gray-400 border-gray-700' : 'bg-blue-900/30 text-blue-400 border-blue-800'}`}>{app.status}</span>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <span className="block text-[#22c55e] font-bold text-sm">Match</span>
                                                <span className="text-xs text-[#9ca3af]">{new Date(app.created_at).toLocaleDateString()}</span>
                                            </div>
                                            <button onClick={() => navigate('/employer-candidates')} className="hidden group-hover:flex w-8 h-8 rounded-full bg-[#2563eb] text-white items-center justify-center shadow-lg transition-all hover:scale-110">
                                                <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Job Performance */}
                            <div className="bg-white/5 rounded-2xl border border-white/10">
                                <div className="p-6 border-b border-white/10">
                                    <h3 className="font-bold text-[#f9fafb] text-lg">Top Job Posts</h3>
                                </div>
                                <div className="p-6 space-y-6">
                                    {jobs.length === 0 ? (
                                        <p className="text-sm text-center text-[#9ca3af] py-10">No jobs posted yet.</p>
                                    ) : jobs.slice(0, 3).map((job, idx) => (
                                        <div key={job.id}>
                                            <div className="flex justify-between mb-2">
                                                <span className="text-sm font-medium text-[#f9fafb] truncate max-w-[200px]">{job.title}</span>
                                            </div>
                                            <div className="w-full bg-gray-700 rounded-full h-1.5 mb-1">
                                                <div className={`h-1.5 rounded-full ${['bg-[#2563eb]', 'bg-purple-500', 'bg-orange-500'][idx % 3]}`} style={{ width: `${Math.min(100, Math.max(10, job.applications_count * 5))}%` }}></div>
                                            </div>
                                            <p className="text-[10px] text-[#9ca3af]">{job.applications_count} Applicants</p>
                                        </div>
                                    ))}
                                    
                                    <button
                                        type="button"
                                        onClick={() => navigate('/employer-jobs')}
                                        className="w-full py-2.5 rounded-lg border border-white/10 text-[#9ca3af] hover:text-[#f9fafb] hover:bg-white/5 text-sm font-medium transition-colors"
                                    >
                                        View All Jobs
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </main>
            
            <EmployerJobPostModal 
                isOpen={isJobPostModalOpen} 
                onClose={() => setIsJobPostModalOpen(false)} 
                onSuccess={() => {
                    fetchDashboardData();
                }} 
            />
        </div>
    );
};

export default EmployerDashboard;
