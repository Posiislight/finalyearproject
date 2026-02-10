import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EmployerJobPost = () => {
    const navigate = useNavigate();
    return (
        <div className="bg-[#111827] text-[#f9fafb] font-['DM_Sans',sans-serif] antialiased h-screen flex overflow-hidden">
            {/* Sidebar */}
            <aside className="hidden lg:flex flex-col w-64 h-full bg-[#1F2937] border-r border-[#374151] shadow-sm z-10 shrink-0">
                <div className="flex items-center gap-3 p-6 mb-4">
                    <div className="bg-[#2563eb]/20 rounded-xl p-2">
                        <span className="material-symbols-outlined text-[#2563eb] text-3xl">swipe</span>
                    </div>
                    <h1 className="text-xl font-extrabold tracking-tight text-white">
                        JobSwipe <span className="text-xs font-normal text-[#9ca3af] block">for Employers</span>
                    </h1>
                </div>
                <div className="px-6 space-y-8 relative">
                    <div className="absolute left-[39px] top-4 bottom-10 w-0.5 bg-gray-700 -z-10"></div>
                    {/* Step 1 - Done */}
                    <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-[#22c55e] flex items-center justify-center shrink-0 ring-4 ring-[#1F2937]">
                            <span className="material-symbols-outlined text-white text-lg font-bold">check</span>
                        </div>
                        <div className="pt-1">
                            <p className="text-sm font-semibold text-[#f9fafb]">Company Info</p>
                            <p className="text-xs text-[#9ca3af]">Basic details provided</p>
                        </div>
                    </div>
                    {/* Step 2 - Done */}
                    <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-[#22c55e] flex items-center justify-center shrink-0 ring-4 ring-[#1F2937]">
                            <span className="material-symbols-outlined text-white text-lg font-bold">check</span>
                        </div>
                        <div className="pt-1">
                            <p className="text-sm font-semibold text-[#f9fafb]">Verification & Brand</p>
                            <p className="text-xs text-[#9ca3af]">Identity & Profile look</p>
                        </div>
                    </div>
                    {/* Step 3 - Active */}
                    <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-[#2563eb] flex items-center justify-center shrink-0 ring-4 ring-[#2563eb]/20 shadow-lg shadow-[#2563eb]/30">
                            <span className="text-white text-sm font-bold">3</span>
                        </div>
                        <div className="pt-1">
                            <p className="text-sm font-bold text-[#2563eb]">First Job Post</p>
                            <p className="text-xs text-[#9ca3af]">Create your listing</p>
                        </div>
                    </div>
                    {/* Step 4 */}
                    <div className="flex items-start gap-4 opacity-50">
                        <div className="w-8 h-8 rounded-full bg-gray-700 border-2 border-gray-600 flex items-center justify-center shrink-0 ring-4 ring-[#1F2937]">
                            <span className="text-gray-400 text-sm font-bold">4</span>
                        </div>
                        <div className="pt-1">
                            <p className="text-sm font-semibold text-[#f9fafb]">Plan Selection</p>
                            <p className="text-xs text-[#9ca3af]">Choose your tier</p>
                        </div>
                    </div>
                </div>
                <div className="mt-auto p-6">
                    <div className="bg-gray-800/50 rounded-xl p-4 border border-[#374151]">
                        <div className="flex items-center gap-2 mb-2 text-[#f9fafb] font-semibold text-sm">
                            <span className="material-symbols-outlined text-yellow-500">lightbulb</span>
                            Need help?
                        </div>
                        <p className="text-xs text-[#9ca3af] mb-3">Our support team is available 24/7 to assist with onboarding.</p>
                        <button className="text-xs font-medium text-[#2563eb] hover:text-[#1d4ed8] hover:underline">Contact Support</button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col h-full overflow-hidden relative bg-[#111827]">
                <header className="flex items-center justify-between px-8 py-4 bg-[#1F2937] border-b border-[#374151] shadow-sm z-10 shrink-0">
                    <div>
                        <h2 className="text-lg font-bold text-[#f9fafb]">Create Your First Job Post</h2>
                        <p className="text-sm text-[#9ca3af]">Provide details for your first job listing to attract top talent.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="text-sm font-medium text-[#9ca3af] hover:text-[#f9fafb]">Save as Draft</button>
                        <div className="h-8 w-8 rounded-full bg-indigo-900/50 text-indigo-300 border border-indigo-700/50 flex items-center justify-center text-sm font-bold">TC</div>
                    </div>
                </header>

                <div className="flex-1 flex overflow-hidden">
                    {/* Form Area */}
                    <div className="flex-1 overflow-y-auto p-6 lg:p-10 scrollbar-thin">
                        <div className="max-w-3xl mx-auto">
                            <div className="bg-[#1F2937] rounded-2xl shadow-[0_4px_20px_-2px_rgba(0,0,0,0.3)] border border-[#374151] p-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-lg bg-blue-900/20 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-[#2563eb]">work</span>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-[#f9fafb]">Job Details</h3>
                                        <p className="text-sm text-[#9ca3af]">Provide details for your first job listing to attract top talent.</p>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-[#f9fafb] mb-2">Job Title</label>
                                        <input type="text" placeholder="e.g., Senior Software Engineer" className="w-full h-11 rounded-lg bg-gray-800 border border-gray-700 text-[#f9fafb] px-4 text-sm placeholder:text-gray-500 focus:border-[#2563eb] focus:ring focus:ring-[#2563eb]/30 outline-none transition" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-[#f9fafb] mb-2">Role</label>
                                        <select className="w-full h-11 rounded-lg bg-gray-800 border border-gray-700 text-[#f9fafb] px-4 text-sm focus:border-[#2563eb] focus:ring focus:ring-[#2563eb]/30 outline-none transition appearance-none cursor-pointer">
                                            <option>Select role type</option>
                                            <option>Engineering</option>
                                            <option>Design</option>
                                            <option>Product</option>
                                            <option>Marketing</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-[#f9fafb] mb-2">Job Description (AI-Assisted)</label>
                                        <div className="relative">
                                            <textarea className="w-full h-64 rounded-lg bg-gray-800 border border-gray-700 text-[#f9fafb] focus:border-[#2563eb] focus:ring focus:ring-[#2563eb]/30 p-4 resize-none outline-none transition placeholder:text-gray-500" placeholder="Type a few keywords or let AI generate a description based on the title..."></textarea>
                                            <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2">
                                                <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-sm font-medium transition-colors">
                                                    <span className="material-symbols-outlined text-sm">auto_awesome</span>
                                                    Generate with AI
                                                </button>
                                                <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#374151] hover:bg-gray-600 text-[#f9fafb] text-sm font-medium transition-colors border border-gray-600">
                                                    <span className="material-symbols-outlined text-sm">auto_fix_high</span>
                                                    Enhance
                                                </button>
                                                <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#374151] hover:bg-gray-600 text-[#f9fafb] text-sm font-medium transition-colors border border-gray-600">
                                                    <span className="material-symbols-outlined text-sm">spellcheck</span>
                                                    Fix Grammar
                                                </button>
                                                <div className="ml-auto">
                                                    <button className="p-1.5 text-[#9ca3af] hover:text-[#f9fafb]">
                                                        <span className="material-symbols-outlined">more_vert</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* AI Copilot Sidebar */}
                    <aside className="w-80 bg-[#1F2937] border-l border-[#374151] p-6 overflow-y-auto hidden xl:block">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-[#9ca3af]">smart_toy</span>
                                <h3 className="font-bold text-[#f9fafb]">AI Copilot</h3>
                            </div>
                            <button className="text-[#9ca3af] hover:text-[#f9fafb]">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-gray-800/50 rounded-xl p-4 border border-[#374151]">
                                <h4 className="font-semibold text-[#f9fafb] mb-2">ATS Optimization</h4>
                                <p className="text-xs text-[#9ca3af] mb-3">Similar roles in progress</p>
                                <div className="w-full bg-gray-700 rounded-full h-1.5 mb-2">
                                    <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '92%' }}></div>
                                </div>
                                <p className="text-xs text-blue-400 font-medium mb-4">92% Optimized</p>

                                <ul className="space-y-2">
                                    <li className="flex items-start gap-2 text-xs text-green-400">
                                        <span className="material-symbols-outlined text-sm">check</span>
                                        <span>Add key skills: React, Node.js</span>
                                    </li>
                                    <li className="flex items-start gap-2 text-xs text-green-400">
                                        <span className="material-symbols-outlined text-sm">check</span>
                                        <span>Use action verbs</span>
                                    </li>
                                    <li className="flex items-start gap-2 text-xs text-green-400">
                                        <span className="material-symbols-outlined text-sm">check</span>
                                        <span>Use action verbs as promest</span>
                                    </li>
                                    <li className="flex items-start gap-2 text-xs text-green-400">
                                        <span className="material-symbols-outlined text-sm">check</span>
                                        <span>Add key colidalon or conscist</span>
                                    </li>
                                    <li className="flex items-start gap-2 text-xs text-gray-500">
                                        <span className="material-symbols-outlined text-sm">check</span>
                                        <span>Premove eater content and profios</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-gray-800/50 rounded-xl p-4 border border-[#374151]">
                                <h4 className="font-semibold text-[#f9fafb] mb-2">Market Salary Data</h4>
                                <p className="text-xs text-[#9ca3af] mb-4">Based on similar roles/social range</p>

                                <div className="text-center py-4 bg-gray-900/50 rounded-lg mb-2 border border-gray-700">
                                    <p className="text-xl font-bold text-[#f9fafb]">$120k - $150k</p>
                                </div>
                                <div className="h-16 relative mt-4">
                                    <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-blue-500/20 to-transparent"></div>
                                    <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
                                        <path d="M0 40 Q 25 40 50 20 T 100 10" fill="none" stroke="#3b82f6" strokeWidth="2" />
                                        <circle cx="50" cy="20" r="3" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
                                    </svg>
                                </div>
                                <div className="mt-2 text-center">
                                    <p className="text-xs font-medium text-[#f9fafb]">Your Range: $130k - $140k</p>
                                    <p className="text-[10px] text-[#9ca3af]">Similar roles in San Francisco</p>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>

                {/* Bottom Navigation */}
                <div className="p-4 border-t border-[#374151] bg-[#1F2937] flex justify-between items-center px-8">
                    <button
                        onClick={() => navigate('/employer-verification')}
                        className="px-6 py-3 rounded-xl border border-[#374151] text-[#f9fafb] font-semibold hover:bg-gray-800 transition-colors flex items-center gap-2"
                    >
                        <span className="material-symbols-outlined text-sm">arrow_back</span>
                        Back
                    </button>
                    <button
                        onClick={() => navigate('/plan-selection')}
                        className="px-8 py-3 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold shadow-lg shadow-[#2563eb]/30 transition-all flex items-center gap-2"
                    >
                        Continue
                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </button>
                </div>
            </main>
        </div>
    );
};

export default EmployerJobPost;
