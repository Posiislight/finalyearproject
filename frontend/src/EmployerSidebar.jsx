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
        <aside className="hidden lg:flex flex-col w-64 h-full bg-black border-r border-neutral-900 shadow-sm z-10 shrink-0 font-['Geist_Sans',sans-serif]">
            <div className="flex items-center gap-2 p-8 mb-2">
                <span className="material-symbols-outlined text-blue-500 text-[32px] font-light">
                    dashboard_customize
                </span>
                <h1 className="text-2xl font-bold tracking-tight text-white leading-tight">
                    RecruitAI
                </h1>
            </div>

            <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto scrollbar-none">
                <a 
                    onClick={() => navigate('/employer-dashboard')} 
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer group ${isActive('/employer-dashboard') ? 'bg-neutral-900 text-white' : 'text-neutral-500 hover:bg-neutral-900/50 hover:text-white'}`}
                >
                    <span className={`material-symbols-outlined text-[20px]`}>dashboard</span>
                    <span className={`font-medium text-sm ${isActive('/employer-dashboard') ? 'font-semibold' : ''}`}>Dashboard</span>
                </a>

                <a 
                    onClick={() => navigate('/employer-jobs')} 
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer group ${isActive('/employer-jobs') ? 'bg-neutral-900 text-white' : 'text-neutral-500 hover:bg-neutral-900/50 hover:text-white'}`}
                >
                    <span className={`material-symbols-outlined text-[20px]`}>work</span>
                    <span className={`font-medium text-sm ${isActive('/employer-jobs') ? 'font-semibold' : ''}`}>Jobs</span>
                </a>

                <a 
                    onClick={() => navigate('/employer-candidates')} 
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer group ${isActive('/employer-candidates') ? 'bg-neutral-900 text-white' : 'text-neutral-500 hover:bg-neutral-900/50 hover:text-white'}`}
                >
                    <span className={`material-symbols-outlined text-[20px]`}>people</span>
                    <span className={`font-medium text-sm ${isActive('/employer-candidates') ? 'font-semibold' : ''}`}>Candidates</span>
                    {counts.unread_candidates > 0 && (
                        <span className="ml-auto bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center justify-center">
                            {counts.unread_candidates}
                        </span>
                    )}
                </a>

                <a 
                    onClick={() => navigate('/employer-analytics')} 
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer group ${isActive('/employer-analytics') ? 'bg-neutral-900 text-white' : 'text-neutral-500 hover:bg-neutral-900/50 hover:text-white'}`}
                >
                    <span className={`material-symbols-outlined text-[20px]`}>insights</span>
                    <span className={`font-medium text-sm ${isActive('/employer-analytics') ? 'font-semibold' : ''}`}>Analytics</span>
                </a>

                <a 
                    onClick={() => navigate('/employer-messages')} 
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer group ${isActive('/employer-messages') ? 'bg-neutral-900 text-white' : 'text-neutral-500 hover:bg-neutral-900/50 hover:text-white'}`}
                >
                    <span className={`material-symbols-outlined text-[20px]`}>chat</span>
                    <span className={`font-medium text-sm ${isActive('/employer-messages') ? 'font-semibold' : ''}`}>Messages</span>
                    {counts.unread_messages > 0 && (
                        <span className="ml-auto bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center justify-center">
                            {counts.unread_messages}
                        </span>
                    )}
                </a>

                <div className="pt-6 mt-6 border-t border-neutral-900">
                    <p className="px-4 text-[10px] font-bold text-neutral-600 uppercase tracking-widest mb-3">Settings</p>
                    <a
                        onClick={() => navigate('/employer-company-profile')}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer group ${isActive('/employer-company-profile') ? 'bg-neutral-900 text-white' : 'text-neutral-500 hover:bg-neutral-900/50 hover:text-white'}`}
                    >
                        <span className={`material-symbols-outlined text-[20px]`}>apartment</span>
                        <span className={`font-medium text-sm ${isActive('/employer-company-profile') ? 'font-semibold' : ''}`}>Company Profile</span>
                    </a>
                    <a
                        onClick={() => navigate('/employer-settings')}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer group ${isActive('/employer-settings') ? 'bg-neutral-900 text-white' : 'text-neutral-500 hover:bg-neutral-900/50 hover:text-white'}`}
                    >
                        <span className={`material-symbols-outlined text-[20px]`}>settings</span>
                        <span className={`font-medium text-sm ${isActive('/employer-settings') ? 'font-semibold' : ''}`}>Account</span>
                    </a>
                </div>
            </nav>

            <div className="p-6 border-t border-neutral-900">
                <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-neutral-900 cursor-pointer transition-colors border border-transparent hover:border-neutral-800">
                        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                            <span className="font-semibold text-white text-sm">EM</span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white truncate">Employer Portal</p>
                            <p className="text-[10px] font-semibold uppercase tracking-widest text-neutral-500 truncate">Standard Plan</p>
                        </div>
                    </div>
                    <button 
                        onClick={() => { logout(); navigate('/login'); }}
                        className="flex items-center justify-center gap-2 w-full py-2.5 text-neutral-500 hover:text-white hover:bg-neutral-900 rounded-xl transition-all font-medium text-sm"
                    >
                        <span className="material-symbols-outlined text-[18px]">logout</span>
                        Log Out
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default EmployerSidebar;
