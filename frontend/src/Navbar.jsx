import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <header className="w-full border-b border-solid border-border-dark bg-background-dark/80 backdrop-blur-md sticky top-0 z-50">
            <div className="px-4 md:px-10 py-4 max-w-7xl mx-auto flex items-center justify-between">
                <Link to="/" className="flex items-center gap-3 text-white">
                    <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white">
                        <span className="material-symbols-outlined">smart_toy</span>
                    </div>
                    <h2 className="text-white text-xl font-bold leading-tight tracking-tight">RecruitAI</h2>
                </Link>
                <div className="hidden md:flex flex-1 justify-end items-center gap-8">
                    <nav className="flex items-center gap-6">
                        <Link to="/features" className="text-white/80 hover:text-white text-sm font-medium transition-colors">Features</Link>
                        <Link to="/candidates" className="text-white/80 hover:text-white text-sm font-medium transition-colors">For Candidates</Link>
                        <a className="text-white/80 hover:text-white text-sm font-medium transition-colors" href="#">For Employers</a>
                        <a className="text-white/80 hover:text-white text-sm font-medium transition-colors" href="#">Pricing</a>
                    </nav>
                    <div className="flex gap-3">
                        <button className="flex items-center justify-center rounded-full h-10 px-5 bg-transparent border border-border-dark text-white text-sm font-bold hover:bg-surface-dark transition-colors">
                            Log In
                        </button>
                        <button className="flex items-center justify-center rounded-full h-10 px-5 bg-primary hover:bg-primary-hover text-white text-sm font-bold transition-colors shadow-[0_0_15px_rgba(36,99,235,0.4)]">
                            Sign Up Free
                        </button>
                    </div>
                </div>
                {/* Mobile Menu Icon */}
                <div className="md:hidden text-white">
                    <span className="material-symbols-outlined">menu</span>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
