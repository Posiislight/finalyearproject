import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const JobSeekerBottomNav = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    const tabs = [
        { path: '/jobseeker-home', icon: 'swap_horiz', label: 'Swipe' },
        { path: '/jobseeker-matches', icon: 'favorite', label: 'Matches' },
        { path: '/jobseeker-applications', icon: 'description', label: 'Applications' },
        { path: '/jobseeker-profile', icon: 'person', label: 'Profile' },
        { path: '/jobseeker-settings', icon: 'settings', label: 'Settings' },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#1F2937] border-t border-[#374151] px-2 pb-[env(safe-area-inset-bottom)]">
            <div className="flex items-center justify-around max-w-lg mx-auto">
                {tabs.map(tab => (
                    <button
                        key={tab.path}
                        onClick={() => navigate(tab.path)}
                        className={`flex flex-col items-center gap-0.5 py-2 px-3 min-w-[64px] transition-colors ${
                            isActive(tab.path)
                                ? 'text-[#2563eb]'
                                : 'text-[#9ca3af] hover:text-[#f9fafb]'
                        }`}
                    >
                        <span className={`material-symbols-outlined text-[22px] ${isActive(tab.path) ? 'scale-110' : ''} transition-transform`}>
                            {tab.icon}
                        </span>
                        <span className={`text-[10px] font-semibold ${isActive(tab.path) ? 'font-bold' : ''}`}>
                            {tab.label}
                        </span>
                        {isActive(tab.path) && (
                            <div className="absolute top-0 w-8 h-0.5 bg-[#2563eb] rounded-full"></div>
                        )}
                    </button>
                ))}
            </div>
        </nav>
    );
};

export default JobSeekerBottomNav;
