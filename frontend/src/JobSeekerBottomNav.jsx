import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

const JobSeekerBottomNav = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { logout } = useAuth();

    const isActive = (path) => location.pathname === path;

    const tabs = [
        { path: '/jobseeker-home', icon: 'swap_horiz', label: 'Swipe' },
        { path: '/jobseeker-matches', icon: 'favorite', label: 'Matches' },
        { path: '/jobseeker-messages', icon: 'chat', label: 'Messages' },
        { path: '/jobseeker-applications', icon: 'description', label: 'Apps' },
        { path: '/jobseeker-profile', icon: 'person', label: 'Profile' },
    ];

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#1F2937] border-t border-[#374151] px-2 pb-[env(safe-area-inset-bottom)]">
            <div className="flex items-center justify-around max-w-lg mx-auto">
                {tabs.map(tab => (
                    <button
                        key={tab.path}
                        onClick={() => navigate(tab.path)}
                        className={`flex flex-col items-center gap-0.5 py-2 px-2 min-w-[50px] transition-colors ${
                            isActive(tab.path)
                                ? 'text-[#2563eb]'
                                : 'text-[#9ca3af] hover:text-[#f9fafb]'
                        }`}
                    >
                        <span className={`material-symbols-outlined text-[22px] ${isActive(tab.path) ? 'scale-110' : ''} transition-transform`}>
                            {tab.icon}
                        </span>
                        <span className={`text-[9px] font-semibold ${isActive(tab.path) ? 'font-bold' : ''}`}>
                            {tab.label}
                        </span>
                        {isActive(tab.path) && (
                            <div className="absolute top-0 w-6 h-0.5 bg-[#2563eb] rounded-full"></div>
                        )}
                    </button>
                ))}
                
                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    className="flex flex-col items-center gap-0.5 py-2 px-2 min-w-[50px] transition-colors text-red-500 hover:text-red-400"
                >
                    <span className="material-symbols-outlined text-[22px] transition-transform">
                        logout
                    </span>
                    <span className="text-[9px] font-semibold">
                        Logout
                    </span>
                </button>
            </div>
        </nav>
    );
};

export default JobSeekerBottomNav;
