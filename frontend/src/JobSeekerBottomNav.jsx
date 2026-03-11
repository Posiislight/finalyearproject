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
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-black border-t border-neutral-900 px-2 pb-[env(safe-area-inset-bottom)] font-['Plus_Jakarta_Sans',sans-serif]">
            <div className="flex items-center justify-around max-w-lg mx-auto">
                {tabs.map(tab => (
                    <button
                        key={tab.path}
                        onClick={() => navigate(tab.path)}
                        className={`flex flex-col items-center gap-0.5 py-2 px-2 min-w-[50px] transition-colors relative ${
                            isActive(tab.path)
                                ? 'text-blue-500'
                                : 'text-neutral-500 hover:text-white'
                        }`}
                    >
                        <span className={`material-symbols-outlined text-[22px] ${isActive(tab.path) ? 'scale-110' : ''} transition-transform`}>
                            {tab.icon}
                        </span>
                        <span className={`text-[9px] font-semibold tracking-wide ${isActive(tab.path) ? 'font-bold' : ''}`}>
                            {tab.label}
                        </span>
                        {isActive(tab.path) && (
                            <div className="absolute -top-[1px] w-6 h-[2px] bg-blue-500 rounded-b-full shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
                        )}
                    </button>
                ))}
                
                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    className="flex flex-col items-center gap-0.5 py-2 px-2 min-w-[50px] transition-colors text-neutral-600 hover:text-red-500"
                >
                    <span className="material-symbols-outlined text-[22px] transition-transform">
                        logout
                    </span>
                    <span className="text-[9px] font-semibold tracking-wide">
                        Logout
                    </span>
                </button>
            </div>
        </nav>
    );
};

export default JobSeekerBottomNav;
