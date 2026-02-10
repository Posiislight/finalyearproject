import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import EmployerSidebar from './EmployerSidebar';

const EmployerDashboard = () => {
    const navigate = useNavigate();
    return (
        <div className="bg-[#111827] text-[#f9fafb] font-['DM_Sans',sans-serif] antialiased h-screen flex overflow-hidden">
            {/* Sidebar */}
            {/* Sidebar */}
            <EmployerSidebar />

            {/* Main Content */}
            <main className="flex-1 flex flex-col h-full overflow-hidden relative bg-[#111827]">
                <header className="flex items-center justify-between px-8 py-4 bg-[#1F2937] border-b border-[#374151] shadow-sm z-10 shrink-0">
                    <div>
                        <h2 className="text-lg font-bold text-[#f9fafb]">Dashboard</h2>
                        <p className="text-sm text-[#9ca3af]">Wednesday, Feb 18 • Good afternoon!</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-gray-800 text-[#9ca3af] hover:text-[#f9fafb] transition-colors relative">
                             <span className="material-symbols-outlined">notifications</span>
                             <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-[#1F2937]"></span>
                        </button>
                        <button className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-lg shadow-[#2563eb]/30 transition-all flex items-center gap-2">
                             <span className="material-symbols-outlined text-lg">add</span>
                             Post a Job
                        </button>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-6 lg:p-10 scrollbar-thin">
                    <div className="max-w-6xl mx-auto space-y-8">
                        
                        {/* Stats Overview */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                             <div className="bg-[#1F2937] p-6 rounded-2xl border border-[#374151] shadow-sm">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="w-10 h-10 rounded-lg bg-blue-900/20 flex items-center justify-center text-[#2563eb]">
                                         <span className="material-symbols-outlined">work</span>
                                    </div>
                                    <span className="items-center bg-gray-800 text-[#9ca3af] text-[10px] px-2 py-0.5 rounded-full border border-gray-700 font-medium">Active</span>
                                </div>
                                <h3 className="text-3xl font-bold text-[#f9fafb] mb-1">4</h3>
                                <p className="text-sm text-[#9ca3af]">Active Job Posts</p>
                             </div>
                             
                             <div className="bg-[#1F2937] p-6 rounded-2xl border border-[#374151] shadow-sm">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="w-10 h-10 rounded-lg bg-green-900/20 flex items-center justify-center text-[#22c55e]">
                                         <span className="material-symbols-outlined">people</span>
                                    </div>
                                    <span className="items-center bg-green-900/20 text-[#22c55e] text-[10px] px-2 py-0.5 rounded-full border border-green-900/30 font-medium flex gap-1">
                                        <span className="material-symbols-outlined text-[10px]">trending_up</span>
                                        +12%
                                    </span>
                                </div>
                                <h3 className="text-3xl font-bold text-[#f9fafb] mb-1">128</h3>
                                <p className="text-sm text-[#9ca3af]">New Candidates</p>
                             </div>

                             <div className="bg-[#1F2937] p-6 rounded-2xl border border-[#374151] shadow-sm">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="w-10 h-10 rounded-lg bg-purple-900/20 flex items-center justify-center text-purple-400">
                                         <span className="material-symbols-outlined">visibility</span>
                                    </div>
                                    <span className="items-center bg-purple-900/20 text-purple-400 text-[10px] px-2 py-0.5 rounded-full border border-purple-900/30 font-medium flex gap-1">
                                        <span className="material-symbols-outlined text-[10px]">trending_up</span>
                                        +24%
                                    </span>
                                </div>
                                <h3 className="text-3xl font-bold text-[#f9fafb] mb-1">1,240</h3>
                                <p className="text-sm text-[#9ca3af]">Profile Views</p>
                             </div>
                             
                              <div className="bg-[#1F2937] p-6 rounded-2xl border border-[#374151] shadow-sm">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="w-10 h-10 rounded-lg bg-orange-900/20 flex items-center justify-center text-orange-400">
                                         <span className="material-symbols-outlined">star</span>
                                    </div>
                                     <span className="items-center bg-gray-800 text-[#9ca3af] text-[10px] px-2 py-0.5 rounded-full border border-gray-700 font-medium">Rating</span>
                                </div>
                                <h3 className="text-3xl font-bold text-[#f9fafb] mb-1">4.8</h3>
                                <p className="text-sm text-[#9ca3af]">Company Rating</p>
                             </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Recent Candidates */}
                            <div className="lg:col-span-2 bg-[#1F2937] rounded-2xl border border-[#374151]">
                                <div className="p-6 border-b border-[#374151] flex items-center justify-between">
                                    <h3 className="font-bold text-[#f9fafb] text-lg">Recent Matches</h3>
                                    <button className="text-sm text-[#2563eb] hover:text-[#1d4ed8] font-medium hover:underline">View All</button>
                                </div>
                                <div className="p-6 space-y-4">
                                    {[1, 2, 3].map((item) => (
                                        <div key={item} className="flex items-center gap-4 bg-[#111827] p-4 rounded-xl border border-[#374151] hover:border-[#2563eb]/50 transition-colors group cursor-pointer">
                                            <div className="relative">
                                                 <img src={`https://i.pravatar.cc/150?img=${item + 10}`} alt="Candidate" className="w-12 h-12 rounded-full object-cover border-2 border-[#374151]" />
                                                 <div className="absolute -bottom-1 -right-1 bg-[#1F2937] rounded-full p-0.5">
                                                     <div className="w-3 h-3 bg-green-500 rounded-full border-2 border-[#1F2937]"></div>
                                                 </div>
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-bold text-[#f9fafb] text-sm">Sarah Jenkins</h4>
                                                <p className="text-xs text-[#9ca3af]">Senior UX Designer • 5y exp</p>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className="text-[10px] bg-gray-800 text-gray-400 px-2 py-0.5 rounded border border-gray-700">Figma</span>
                                                    <span className="text-[10px] bg-gray-800 text-gray-400 px-2 py-0.5 rounded border border-gray-700">React</span>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <span className="block text-green-400 font-bold text-sm">98% Match</span>
                                                <span className="text-xs text-[#9ca3af]">Applied 2h ago</span>
                                            </div>
                                            <button className="hidden group-hover:flex w-8 h-8 rounded-full bg-[#2563eb] text-white items-center justify-center shadow-lg transition-all hover:scale-110">
                                                <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Job Performance */}
                            <div className="bg-[#1F2937] rounded-2xl border border-[#374151]">
                                <div className="p-6 border-b border-[#374151]">
                                    <h3 className="font-bold text-[#f9fafb] text-lg">Top Job Posts</h3>
                                </div>
                                <div className="p-6 space-y-6">
                                    <div>
                                        <div className="flex justify-between mb-2">
                                            <span className="text-sm font-medium text-[#f9fafb]">Senior Frontend Engineer</span>
                                            <span className="text-xs text-green-400 font-bold">+14 new</span>
                                        </div>
                                        <div className="w-full bg-gray-700 rounded-full h-1.5 mb-1">
                                            <div className="bg-[#2563eb] h-1.5 rounded-full" style={{ width: '85%' }}></div>
                                        </div>
                                        <p className="text-[10px] text-[#9ca3af]">42 Applicants • 85% Qualified</p>
                                    </div>

                                    <div>
                                        <div className="flex justify-between mb-2">
                                            <span className="text-sm font-medium text-[#f9fafb]">Product Designer</span>
                                            <span className="text-xs text-green-400 font-bold">+8 new</span>
                                        </div>
                                        <div className="w-full bg-gray-700 rounded-full h-1.5 mb-1">
                                            <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: '60%' }}></div>
                                        </div>
                                        <p className="text-[10px] text-[#9ca3af]">28 Applicants • 60% Qualified</p>
                                    </div>
                                    
                                    <div>
                                        <div className="flex justify-between mb-2">
                                            <span className="text-sm font-medium text-[#f9fafb]">Marketing Manager</span>
                                            <span className="text-xs text-green-400 font-bold">+3 new</span>
                                        </div>
                                        <div className="w-full bg-gray-700 rounded-full h-1.5 mb-1">
                                            <div className="bg-orange-500 h-1.5 rounded-full" style={{ width: '45%' }}></div>
                                        </div>
                                        <p className="text-[10px] text-[#9ca3af]">15 Applicants • 45% Qualified</p>
                                    </div>
                                    
                                    <button className="w-full py-2.5 rounded-lg border border-[#374151] text-[#9ca3af] hover:text-[#f9fafb] hover:bg-gray-800 text-sm font-medium transition-colors">
                                        View All Jobs
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
};

export default EmployerDashboard;
