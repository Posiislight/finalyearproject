import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import { NavBar as TubelightNavBar } from './components/ui/tubelight-navbar';
import { Home, Lightbulb, User, Briefcase, LogIn, UserPlus, LayoutDashboard, LogOut } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const getDashboardPath = () => {
        if (!user) return '/login';
        return user.is_employer ? '/employer-dashboard' : '/jobseeker-home';
    };

    // Build nav items dynamically based on auth state
    const navItems = [
        { name: 'Home', url: '/', icon: Home },
        { name: 'Features', url: '/features', icon: Lightbulb },
        { name: 'Candidates', url: '/candidates', icon: User },
        { name: 'Employers', url: '/employers', icon: Briefcase },
    ];

    // Add auth items
    if (user) {
        navItems.push({ name: 'Dashboard', url: getDashboardPath(), icon: LayoutDashboard });
        navItems.push({ name: 'Log Out', url: '#logout', icon: LogOut, onClick: handleLogout });
    } else {
        navItems.push({ name: 'Log In', url: '/login', icon: LogIn });
        navItems.push({ name: 'Sign Up Free', url: '/signup', icon: UserPlus });
    }

    return (
        <>
            {/* RecruitAI Logo — positioned top-left, separate from the tube */}
            <div className="fixed top-5 left-6 z-[101] flex items-center gap-3">
                <Link to="/" className="flex items-center gap-3 text-white group">
                    <div className="size-9 bg-primary rounded-lg flex items-center justify-center text-white shadow-[0_0_15px_rgba(36,99,235,0.4)] group-hover:shadow-[0_0_25px_rgba(36,99,235,0.6)] transition-shadow">
                        <span className="material-symbols-outlined text-[20px]">smart_toy</span>
                    </div>
                    <h2 className="text-white text-xl font-bold leading-tight tracking-tight hidden sm:block">RecruitAI</h2>
                </Link>
            </div>

            {/* The floating Tubelight Navbar pill */}
            <TubelightNavBar items={navItems} />
        </>
    );
};

export default Navbar;
