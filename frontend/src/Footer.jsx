import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="w-full bg-[#0b0e14] border-t border-border-dark pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 md:px-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
                    <div className="md:col-span-2 flex flex-col gap-4 pr-10">
                        <div className="flex items-center gap-3 text-white mb-2">
                            <div className="size-6 bg-primary rounded flex items-center justify-center text-white">
                                <span className="material-symbols-outlined text-[16px]">smart_toy</span>
                            </div>
                            <h2 className="text-lg font-bold">RecruitAI</h2>
                        </div>
                        <p className="text-text-secondary text-sm leading-relaxed max-w-xs">
                            The world's first AI-native recruitment platform designed for the modern tech workforce. Efficient, unbiased, and fast.
                        </p>
                        <div className="flex gap-4 mt-4">
                            <Link className="text-text-secondary hover:text-white transition-colors" to="/features" aria-label="Explore features">
                                <span className="material-symbols-outlined">thumb_up</span>
                            </Link>
                            <Link className="text-text-secondary hover:text-white transition-colors" to="/employers" aria-label="Explore employer tools">
                                <span className="material-symbols-outlined">share</span>
                            </Link>
                            <Link className="text-text-secondary hover:text-white transition-colors" to="/signup" aria-label="Create an account">
                                <span className="material-symbols-outlined">mail</span>
                            </Link>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <h4 className="text-white font-bold text-sm uppercase tracking-wider">Product</h4>
                        <Link to="/features" className="text-text-secondary hover:text-primary transition-colors text-sm">Features</Link>
                        <Link to="/candidates" className="text-text-secondary hover:text-primary transition-colors text-sm">For Candidates</Link>
                        <Link to="/employers" className="text-text-secondary hover:text-primary transition-colors text-sm">For Employers</Link>
                    </div>
                </div>
                <div className="border-t border-border-dark pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-text-secondary">
                    <p>© 2023 RecruitAI Inc. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
