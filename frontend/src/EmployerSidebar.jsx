import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import { employerService } from './services/employerService';

const EmployerSidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { logout } = useAuth();

    const [counts, setCounts] = useState({ unread_candidates: 0, unread_messages: 0 });

    useEffect(() => {
        const fetchCounts = async () => {
            try {
                const data = await employerService.getSidebarCounts();
                setCounts(data);
            } catch (err) {
                console.error("Failed to fetch sidebar counts:", err);
            }
        };
        fetchCounts();
    }, []);

    const isActive = (path) => location.pathname === path;

    return (
        <aside className="hidden lg:flex flex-col w-64 h-full bg-black border-r border-white/10 shadow-sm z-10 shrink-0">
            <div className="flex items-center gap-3 p-6 mb-4">
                <div className="bg-[#2563eb]/20 rounded-xl p-2">
                    <span className="material-symbols-outlined text-[#2563eb] text-3xl">swipe</span>
                </div>
                <h1 className="text-xl font-extrabold tracking-tight text-white">
                    JobSwipe <span className="text-xs font-normal text-[#9ca3af] block">for Employers</span>
                </h1>
            </div>

            <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
                <a 
                    onClick={() => navigate('/employer-dashboard')} 
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors cursor-pointer group ${isActive('/employer-dashboard') ? 'bg-[#2563eb]/10 text-[#2563eb]' : 'text-[#9ca3af] hover:bg-white/5 hover:text-[#f9fafb]'}`}
                >
                    <span className={`material-symbols-outlined text-xl ${isActive('/employer-dashboard') ? '' : 'group-hover:text-[#2563eb]'}`}>dashboard</span>
                    <span className={`font-medium text-sm ${isActive('/employer-dashboard') ? 'font-semibold' : ''}`}>Dashboard</span>
                </a>

                <a 
                    onClick={() => navigate('/employer-jobs')} 
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors cursor-pointer group ${isActive('/employer-jobs') ? 'bg-[#2563eb]/10 text-[#2563eb]' : 'text-[#9ca3af] hover:bg-white/5 hover:text-[#f9fafb]'}`}
                >
                    <span className={`material-symbols-outlined text-xl ${isActive('/employer-jobs') ? '' : 'group-hover:text-[#2563eb]'}`}>work</span>
                    <span className={`font-medium text-sm ${isActive('/employer-jobs') ? 'font-semibold' : ''}`}>Jobs</span>
                </a>

                <a 
                    onClick={() => navigate('/employer-candidates')} 
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors cursor-pointer group ${isActive('/employer-candidates') ? 'bg-[#2563eb]/10 text-[#2563eb]' : 'text-[#9ca3af] hover:bg-white/5 hover:text-[#f9fafb]'}`}
                >
                    <span className={`material-symbols-outlined text-xl ${isActive('/employer-candidates') ? '' : 'group-hover:text-[#2563eb]'}`}>people</span>
                    <span className={`font-medium text-sm ${isActive('/employer-candidates') ? 'font-semibold' : ''}`}>Candidates</span>
                    {counts.unread_candidates > 0 && (
                        <span className="ml-auto bg-[#2563eb] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                            {counts.unread_candidates}
                        </span>
                    )}
                </a>

                <a 
                    onClick={() => navigate('/employer-analytics')} 
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors cursor-pointer group ${isActive('/employer-analytics') ? 'bg-[#2563eb]/10 text-[#2563eb]' : 'text-[#9ca3af] hover:bg-white/5 hover:text-[#f9fafb]'}`}
                >
                    <span className={`material-symbols-outlined text-xl ${isActive('/employer-analytics') ? '' : 'group-hover:text-[#2563eb]'}`}>analytics</span>
                    <span className={`font-medium text-sm ${isActive('/employer-analytics') ? 'font-semibold' : ''}`}>Analytics</span>
                </a>

                <a 
                    onClick={() => navigate('/employer-messages')} 
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors cursor-pointer group ${isActive('/employer-messages') ? 'bg-[#2563eb]/10 text-[#2563eb]' : 'text-[#9ca3af] hover:bg-white/5 hover:text-[#f9fafb]'}`}
                >
                    <span className={`material-symbols-outlined text-xl ${isActive('/employer-messages') ? '' : 'group-hover:text-[#2563eb]'}`}>chat</span>
                    <span className={`font-medium text-sm ${isActive('/employer-messages') ? 'font-semibold' : ''}`}>Messages</span>
                    {counts.unread_messages > 0 && (
                        <span className="ml-auto bg-[#2563eb] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                            {counts.unread_messages}
                        </span>
                    )}
                </a>

                <div className="pt-4 mt-4 border-t border-white/10">
                    <p className="px-4 text-[10px] font-semibold text-[#9ca3af] uppercase tracking-wider mb-2">Settings</p>
                    <a
                        onClick={() => navigate('/employer-company-profile')}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors cursor-pointer group ${isActive('/employer-company-profile') ? 'bg-[#2563eb]/10 text-[#2563eb]' : 'text-[#9ca3af] hover:bg-white/5 hover:text-[#f9fafb]'}`}
                    >
                        <span className={`material-symbols-outlined text-xl ${isActive('/employer-company-profile') ? '' : 'group-hover:text-[#2563eb]'}`}>apartment</span>
                        <span className={`font-medium text-sm ${isActive('/employer-company-profile') ? 'font-semibold' : ''}`}>Company Profile</span>
                    </a>
                    <a
                        onClick={() => navigate('/employer-settings')}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors cursor-pointer group ${isActive('/employer-settings') ? 'bg-[#2563eb]/10 text-[#2563eb]' : 'text-[#9ca3af] hover:bg-white/5 hover:text-[#f9fafb]'}`}
                    >
                        <span className={`material-symbols-outlined text-xl ${isActive('/employer-settings') ? '' : 'group-hover:text-[#2563eb]'}`}>settings</span>
                        <span className={`font-medium text-sm ${isActive('/employer-settings') ? 'font-semibold' : ''}`}>Account</span>
                    </a>
                </div>
            </nav>

            <div className="p-4 border-t border-white/10">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 cursor-pointer transition-colors">
                        <div className="w-10 h-10 rounded-full bg-[#2563eb] flex items-center justify-center border border-blue-500/30">
                            <span className="font-bold text-white text-sm">EM</span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-[#f9fafb] truncate">Employer Portal</p>
                            <p className="text-xs text-[#9ca3af] truncate">Standard Plan</p>
                        </div>
                    </div>
                    <button 
                        onClick={() => { logout(); navigate('/login'); }}
                        className="flex items-center gap-3 px-4 py-2 text-red-500 hover:bg-red-500/10 rounded-xl transition-all font-medium text-sm"
                    >
                        <span className="material-symbols-outlined text-xl">logout</span>
                        Log Out
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default EmployerSidebar;
