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
        <div className="bg-black text-white font-['Geist_Sans',sans-serif] antialiased h-screen flex overflow-hidden">
            {/* Sidebar */}
            <EmployerSidebar />

            {/* Main Content */}
            <main className="flex-1 flex flex-col h-full overflow-hidden relative bg-black">
                <header className="flex items-center justify-between px-10 py-8 shrink-0">
                    <div>
                        <h2 className="text-3xl font-light tracking-tight text-white mb-1">Dashboard</h2>
                        <p className="text-sm text-neutral-500 font-medium tracking-wide">
                            {today} <span className="mx-2">•</span> Welcome, {user?.first_name || 'Employer'}
                        </p>
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

                <div className="flex-1 overflow-y-auto px-10 pb-10 scrollbar-thin">
                    <div className="max-w-7xl mx-auto space-y-8">
                        
                        {/* Stats Overview */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                             <div className="bg-[#0a0a0a] p-6 rounded-2xl border border-neutral-900">
                                <div className="flex justify-between items-start mb-6">
                                    <span className="material-symbols-outlined text-neutral-500">work_outline</span>
                                    <span className="text-[10px] text-blue-500 font-bold uppercase tracking-widest bg-blue-500/10 px-2 py-1 rounded">Active</span>
                                </div>
                                <h3 className="text-4xl font-light tracking-tight text-white mb-2">{activeJobsCount}</h3>
                                <p className="text-xs text-neutral-500 font-semibold uppercase tracking-widest">Active Job Posts</p>
                             </div>
                             
                             <div className="bg-[#0a0a0a] p-6 rounded-2xl border border-neutral-900">
                                <div className="flex justify-between items-start mb-6">
                                    <span className="material-symbols-outlined text-neutral-500">group</span>
                                    <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest bg-neutral-900 px-2 py-1 rounded">Total</span>
                                </div>
                                <h3 className="text-4xl font-light tracking-tight text-white mb-2">{applicants.length}</h3>
                                <p className="text-xs text-neutral-500 font-semibold uppercase tracking-widest">Total Candidates</p>
                             </div>

                             <div className="bg-[#0a0a0a] p-6 rounded-2xl border border-neutral-900">
                                <div className="flex justify-between items-start mb-6">
                                    <span className="material-symbols-outlined text-neutral-500">meeting_room</span>
                                    <span className="text-[10px] text-blue-500 font-bold uppercase tracking-widest bg-blue-500/10 px-2 py-1 rounded">Live</span>
                                </div>
                                <h3 className="text-4xl font-light tracking-tight text-white mb-2">{applicants.filter(a => a.status === 'interviewing').length}</h3>
                                <p className="text-xs text-neutral-500 font-semibold uppercase tracking-widest">Interviews</p>
                             </div>
                             
                              <div className="bg-[#0a0a0a] p-6 rounded-2xl border border-neutral-900">
                                <div className="flex justify-between items-start mb-6">
                                    <span className="material-symbols-outlined text-neutral-500">insights</span>
                                    <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest bg-neutral-900 px-2 py-1 rounded">Rate</span>
                                </div>
                                <h3 className="text-4xl font-light tracking-tight text-white mb-2">{responseRate}%</h3>
                                <p className="text-xs text-neutral-500 font-semibold uppercase tracking-widest">{responseRateText}</p>
                             </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Recent Candidates */}
                            <div className="lg:col-span-2 bg-[#0a0a0a] rounded-2xl border border-neutral-900">
                                <div className="p-6 border-b border-neutral-900 flex items-center justify-between">
                                    <h3 className="font-medium text-white text-lg">Recent Matches</h3>
                                    <button onClick={() => navigate('/employer-candidates')} className="text-sm text-neutral-400 hover:text-white font-medium transition-colors">View All &rarr;</button>
                                </div>
                                <div className="flex flex-col">
                                    {applicants.length === 0 ? (
                                        <p className="text-sm text-center text-neutral-600 py-12 font-medium">No recent applications found.</p>
                                    ) : applicants.slice(0, 5).map((app, index) => (
                                        <div key={app.id} className={`flex items-center gap-4 p-6 hover:bg-neutral-900/30 transition-colors group cursor-pointer ${index !== applicants.slice(0, 5).length - 1 ? 'border-b border-neutral-900' : ''}`}>
                                            <div className="relative shrink-0">
                                                 <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold text-sm">
                                                    {app.job_seeker_details.first_name?.[0] || 'J'}{app.job_seeker_details.last_name?.[0] || 'S'}
                                                 </div>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between">
                                                    <h4 className="font-medium text-white text-base truncate">{app.job_seeker_details.first_name} {app.job_seeker_details.last_name}</h4>
                                                    <span className="block text-blue-500 font-medium text-sm">Auto Match</span>
                                                </div>
                                                <div className="flex items-center justify-between mt-1">
                                                    <p className="text-sm text-neutral-500 truncate">{app.job_post_details.title}</p>
                                                    <span className="text-xs text-neutral-600">{new Date(app.created_at).toLocaleDateString()}</span>
                                                </div>
                                                <div className="mt-3">
                                                    <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded bg-neutral-900 text-neutral-400">{app.status}</span>
                                                </div>
                                            </div>
                                            <div className="pl-4">
                                                <button onClick={() => navigate('/employer-candidates')} className="opacity-0 group-hover:opacity-100 w-10 h-10 rounded-full bg-white text-black flex items-center justify-center transition-all hover:scale-105">
                                                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Job Performance */}
                            <div className="bg-[#0a0a0a] rounded-2xl border border-neutral-900 flex flex-col">
                                <div className="p-6 border-b border-neutral-900">
                                    <h3 className="font-medium text-white text-lg">Top Job Posts</h3>
                                </div>
                                <div className="p-6 flex-1 flex flex-col space-y-8">
                                    {jobs.length === 0 ? (
                                        <p className="text-sm text-center text-neutral-600 py-10 font-medium my-auto">No jobs posted yet.</p>
                                    ) : jobs.slice(0, 3).map((job) => (
                                        <div key={job.id}>
                                            <div className="flex justify-between items-end mb-3">
                                                <span className="text-sm font-medium text-white truncate max-w-[200px]">{job.title}</span>
                                                <span className="text-xs text-neutral-500 font-medium">{job.applications_count} apps</span>
                                            </div>
                                            <div className="w-full bg-neutral-900 rounded-full h-1 overflow-hidden">
                                                <div className="h-1 rounded-full bg-blue-600" style={{ width: `${Math.min(100, Math.max(10, job.applications_count * 5))}%` }}></div>
                                            </div>
                                        </div>
                                    ))}
                                    
                                    <div className="mt-auto pt-4">
                                        <button
                                            type="button"
                                            onClick={() => navigate('/employer-jobs')}
                                            className="w-full py-3 rounded-xl bg-white text-black hover:bg-neutral-200 text-sm font-medium transition-colors"
                                        >
                                            View All Jobs
                                        </button>
                                    </div>
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
