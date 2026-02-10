import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmployerSidebar from './EmployerSidebar';

const EmployerCandidates = () => {
    const navigate = useNavigate();
    const [view, setView] = useState('swipe'); // 'swipe' or 'profile'

    return (
        <div className="bg-[#111827] text-[#f9fafb] font-['DM_Sans',sans-serif] antialiased h-screen flex overflow-hidden">
            {/* Sidebar */}
            {/* Sidebar */}
            <EmployerSidebar />

            {/* Main Content */}
            <main className="flex-1 flex flex-col h-full overflow-hidden relative bg-[#111827]">
                {/* Header */}
                <header className="flex items-center justify-between px-8 py-4 bg-[#1F2937] border-b border-[#374151] shadow-sm z-10 shrink-0">
                    <div className="flex items-center gap-4">
                        {view === 'profile' && (
                            <button onClick={() => setView('swipe')} className="text-[#9ca3af] hover:text-[#f9fafb] transition-colors">
                                <span className="material-symbols-outlined">arrow_back</span>
                            </button>
                        )}
                        <div>
                            {view === 'swipe' ? (
                                <>
                                    <div className="flex items-center gap-3">
                                        <h2 className="text-lg font-bold text-[#f9fafb]">Product Designer Role</h2>
                                        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded bg-green-900/20 text-[#22c55e] border border-green-900/30 uppercase tracking-wider">Active</span>
                                    </div>
                                    <p className="text-sm text-[#9ca3af]">Job ID: #PD-2023-84</p>
                                </>
                            ) : (
                                <>
                                    <h2 className="text-lg font-bold text-[#f9fafb]">Alex Rivera</h2>
                                    <p className="text-sm text-[#9ca3af]">Applying for <span className="text-[#2563eb] font-medium">Senior Product Designer</span></p>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        {view === 'swipe' ? (
                            <button className="px-4 py-2 rounded-lg bg-gray-800 text-[#9ca3af] hover:text-[#f9fafb] text-sm font-medium border border-[#374151] flex items-center gap-2 transition-colors">
                                <span className="material-symbols-outlined text-sm">tune</span>
                                Filters: High Match (&gt;80%)
                            </button>
                        ) : (
                            <>
                                <button className="text-[#9ca3af] hover:text-[#f9fafb] transition-colors">
                                    <span className="material-symbols-outlined">share</span>
                                </button>
                                <button className="text-[#9ca3af] hover:text-[#f9fafb] transition-colors">
                                    <span className="material-symbols-outlined">download</span>
                                </button>
                            </>
                        )}
                    </div>
                </header>

                <div className="flex-1 flex overflow-hidden">
                    {/* Center Content */}
                    <div className="flex-1 overflow-y-auto flex flex-col items-center justify-start p-6 lg:p-10 scrollbar-thin">
                        {view === 'swipe' ? (
                            /* ===== SWIPE CARD VIEW ===== */
                            <div className="flex flex-col items-center w-full max-w-md">
                                {/* Swipe Card */}
                                <div className="w-full bg-[#1F2937] rounded-3xl shadow-xl overflow-hidden border border-[#374151] relative">
                                    {/* Candidate Photo */}
                                    <div className="relative h-80">
                                        <img src="https://i.pravatar.cc/600?img=33" alt="Alex Rivera" className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#1F2937] via-transparent to-transparent"></div>
                                        {/* Match Badge */}
                                        <div className="absolute top-4 right-4 bg-[#1F2937]/90 backdrop-blur-sm px-3 py-1.5 rounded-full border border-[#374151] flex items-center gap-1.5">
                                            <span className="material-symbols-outlined text-yellow-400 text-sm">auto_awesome</span>
                                            <span className="text-sm font-bold text-[#f9fafb]">94% Match</span>
                                        </div>
                                        {/* Name overlay */}
                                        <div className="absolute bottom-4 left-5 right-5">
                                            <h3 className="text-2xl font-bold text-white drop-shadow-lg">Alex Rivera, 29</h3>
                                            <div className="flex items-center gap-1.5 mt-1">
                                                <div className="w-2 h-2 rounded-full bg-[#22c55e]"></div>
                                                <p className="text-sm text-gray-300 drop-shadow-md">Senior UX Designer | 8+ Years Exp</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Card Body */}
                                    <div className="p-5 space-y-5">
                                        {/* AI Recommendation */}
                                        <div className="bg-purple-900/15 p-4 rounded-xl border border-purple-800/30">
                                            <div className="flex items-center gap-2 mb-2">
                                                <div className="w-8 h-8 rounded-full bg-purple-900/30 flex items-center justify-center">
                                                    <span className="material-symbols-outlined text-purple-400 text-sm">smart_toy</span>
                                                </div>
                                                <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider">AI Recommendation</span>
                                            </div>
                                            <p className="text-sm text-[#9ca3af]">Top match for <span className="font-bold text-[#f9fafb]">Design Systems & Prototyping</span>. Highly skilled in scalable UI architecture.</p>
                                        </div>

                                        {/* Key Qualifications */}
                                        <div>
                                            <div className="flex items-center gap-2 mb-3">
                                                <span className="material-symbols-outlined text-[#9ca3af] text-sm">target</span>
                                                <p className="text-[10px] font-bold text-[#9ca3af] uppercase tracking-wider">Key Qualifications</p>
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                <span className="px-3 py-1.5 rounded-lg bg-gray-800 text-[#f9fafb] text-xs font-medium border border-[#374151]">Figma Master</span>
                                                <span className="px-3 py-1.5 rounded-lg bg-gray-800 text-[#f9fafb] text-xs font-medium border border-[#374151]">Design Systems</span>
                                                <span className="px-3 py-1.5 rounded-lg bg-gray-800 text-[#f9fafb] text-xs font-medium border border-[#374151]">Prototyping</span>
                                                <span className="px-3 py-1.5 rounded-lg bg-gray-800 text-[#f9fafb] text-xs font-medium border border-[#374151]">Interaction Design</span>
                                            </div>
                                        </div>

                                        {/* Education */}
                                        <div>
                                            <p className="text-[10px] font-bold text-[#9ca3af] uppercase tracking-wider mb-2">Education</p>
                                            <div className="flex items-center gap-2 text-sm text-[#f9fafb]">
                                                <span className="material-symbols-outlined text-[#9ca3af]">school</span>
                                                BFA Interaction Design, RISD
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex items-center justify-center gap-5 pt-2 pb-2">
                                            <button className="w-14 h-14 rounded-full bg-red-900/20 border-2 border-red-500/40 flex items-center justify-center text-red-400 hover:bg-red-900/40 hover:scale-110 transition-all shadow-lg">
                                                <span className="material-symbols-outlined text-2xl">close</span>
                                            </button>
                                            <button onClick={() => setView('profile')} className="w-11 h-11 rounded-full bg-[#2563eb]/20 border-2 border-[#2563eb]/40 flex items-center justify-center text-[#2563eb] hover:bg-[#2563eb]/30 hover:scale-110 transition-all">
                                                <span className="material-symbols-outlined text-xl">info</span>
                                            </button>
                                            <button className="w-14 h-14 rounded-full bg-green-900/20 border-2 border-green-500/40 flex items-center justify-center text-[#22c55e] hover:bg-green-900/40 hover:scale-110 transition-all shadow-lg">
                                                <span className="material-symbols-outlined text-2xl">check</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Keyboard Hints */}
                                <div className="flex items-center gap-4 mt-6 text-[#9ca3af] text-xs">
                                    <span>Use</span>
                                    <kbd className="px-2 py-0.5 bg-gray-800 rounded border border-[#374151] text-[10px] font-mono">←</kbd>
                                    <kbd className="px-2 py-0.5 bg-gray-800 rounded border border-[#374151] text-[10px] font-mono">SPACE</kbd>
                                    <kbd className="px-2 py-0.5 bg-gray-800 rounded border border-[#374151] text-[10px] font-mono">→</kbd>
                                    <span>to navigate</span>
                                </div>
                            </div>
                        ) : (
                            /* ===== PROFILE DETAIL VIEW ===== */
                            <div className="w-full max-w-3xl">
                                {/* Profile Hero */}
                                <div className="bg-gradient-to-r from-[#2563eb]/20 to-teal-600/20 rounded-2xl p-6 mb-6 border border-[#374151]">
                                    <div className="flex items-start gap-5">
                                        <img src="https://i.pravatar.cc/150?img=33" alt="Alex Rivera" className="w-24 h-24 rounded-2xl object-cover border-2 border-[#374151] shadow-lg" />
                                        <div className="flex-1">
                                            <h3 className="text-2xl font-bold text-white mb-1">Alex Rivera</h3>
                                            <p className="text-sm text-[#9ca3af]">Senior UX Designer • San Francisco, CA • 8+ Years Exp</p>
                                            <div className="flex items-center gap-2 mt-3">
                                                <a href="#" className="px-3 py-1 rounded-lg bg-[#2563eb] text-white text-xs font-medium flex items-center gap-1 hover:bg-[#1d4ed8] transition-colors">
                                                    <span className="material-symbols-outlined text-sm">link</span> LinkedIn
                                                </a>
                                                <a href="#" className="px-3 py-1 rounded-lg bg-red-600 text-white text-xs font-medium flex items-center gap-1 hover:bg-red-700 transition-colors">
                                                    <span className="material-symbols-outlined text-sm">palette</span> Portfolio
                                                </a>
                                                <a href="#" className="px-3 py-1 rounded-lg bg-gray-700 text-[#f9fafb] text-xs font-medium flex items-center gap-1 hover:bg-gray-600 transition-colors border border-[#374151]">
                                                    <span className="material-symbols-outlined text-sm">mail</span> alex.r@design.com
                                                </a>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[10px] text-[#9ca3af] uppercase tracking-wider font-bold">Match Score</p>
                                            <p className="text-4xl font-extrabold text-[#22c55e]">94%</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Tabs */}
                                <div className="flex items-center gap-6 border-b border-[#374151] mb-6 px-1">
                                    <button className="pb-3 text-sm font-semibold text-[#2563eb] border-b-2 border-[#2563eb]">Profile Overview</button>
                                    <button className="pb-3 text-sm font-medium text-[#9ca3af] hover:text-[#f9fafb]">Full Resume/CV</button>
                                    <button className="pb-3 text-sm font-medium text-[#9ca3af] hover:text-[#f9fafb]">Cover Letter</button>
                                    <button className="pb-3 text-sm font-medium text-[#9ca3af] hover:text-[#f9fafb]">Portfolio</button>
                                </div>

                                {/* AI Summary */}
                                <div className="bg-gradient-to-r from-[#2563eb]/10 to-purple-600/10 p-6 rounded-2xl border border-[#374151] mb-8">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="material-symbols-outlined text-[#2563eb]">auto_awesome</span>
                                        <h4 className="font-bold text-[#f9fafb] uppercase text-sm tracking-wide">AI-Generated Summary</h4>
                                    </div>
                                    <p className="text-sm text-[#9ca3af] leading-relaxed">
                                        Alex is a strong contender for the Senior Product Designer role, showcasing
                                        exceptional expertise in <span className="bg-[#2563eb]/20 text-[#f9fafb] font-semibold px-1.5 py-0.5 rounded">Design Systems</span> and
                                        Prototyping which aligns perfectly with the job requirements. Their experience at TechFlow
                                        demonstrates leadership in scaling UI architectures. While their react development skills are
                                        intermediate, their design leadership score is in the top 5% of candidates.
                                    </p>
                                </div>

                                {/* Work Experience */}
                                <div className="mb-8">
                                    <div className="flex items-center gap-2 mb-5">
                                        <span className="material-symbols-outlined text-[#2563eb]">work_history</span>
                                        <h4 className="font-bold text-[#f9fafb] text-lg">Work Experience</h4>
                                    </div>
                                    <div className="relative pl-6 border-l-2 border-[#374151] space-y-8">
                                        {/* Experience 1 */}
                                        <div className="relative">
                                            <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-[#2563eb] border-4 border-[#111827]"></div>
                                            <div className="flex items-center justify-between mb-2">
                                                <h5 className="font-bold text-[#f9fafb]">Senior UX Designer</h5>
                                                <span className="text-xs bg-[#2563eb]/10 text-[#2563eb] px-2.5 py-0.5 rounded-full border border-[#2563eb]/30 font-medium">2020 → Present</span>
                                            </div>
                                            <p className="text-sm text-[#9ca3af] mb-3">TechFlow Inc.</p>
                                            <ul className="space-y-2 text-sm text-[#9ca3af]">
                                                <li className="flex items-start gap-2">
                                                    <span className="text-[#374151] mt-1.5">•</span>
                                                    Spearheaded the complete redesign of the core SaaS dashboard, improving user retention by 24%.
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="text-[#374151] mt-1.5">•</span>
                                                    Built and maintained "FlowUI", the company's internal design system used by 30+ developers.
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="text-[#374151] mt-1.5">•</span>
                                                    Mentored 3 junior designers and conducted bi-weekly design critiques.
                                                </li>
                                            </ul>
                                        </div>
                                        {/* Experience 2 */}
                                        <div className="relative">
                                            <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-gray-600 border-4 border-[#111827]"></div>
                                            <div className="flex items-center justify-between mb-2">
                                                <h5 className="font-bold text-[#f9fafb]">UX Designer</h5>
                                                <span className="text-xs bg-gray-800 text-[#9ca3af] px-2.5 py-0.5 rounded-full border border-[#374151] font-medium">2017 → 2020</span>
                                            </div>
                                            <p className="text-sm text-[#9ca3af] mb-3">CreativeBox Agency</p>
                                            <ul className="space-y-2 text-sm text-[#9ca3af]">
                                                <li className="flex items-start gap-2">
                                                    <span className="text-[#374151] mt-1.5">•</span>
                                                    Delivered end-to-end product designs for 5 major fintech clients.
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="text-[#374151] mt-1.5">•</span>
                                                    Conducted user research and usability testing sessions for mobile applications.
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Sidebar */}
                    <aside className="w-80 bg-[#1F2937] border-l border-[#374151] p-6 overflow-y-auto hidden xl:block shrink-0">
                        {view === 'swipe' ? (
                            /* Recruitment Queue Sidebar */
                            <>
                                <div className="flex items-center gap-2 mb-5">
                                    <span className="material-symbols-outlined text-[#2563eb]">list_alt</span>
                                    <h3 className="font-bold text-[#f9fafb] text-sm uppercase tracking-wider">Recruitment Queue</h3>
                                </div>

                                <div className="bg-[#111827] p-4 rounded-xl border border-[#374151] mb-6">
                                    <div className="flex justify-between items-center mb-2">
                                        <p className="text-sm text-[#9ca3af]">Candidates Remaining</p>
                                        <span className="text-[10px] bg-gray-800 text-[#9ca3af] px-2 py-0.5 rounded-full border border-[#374151] font-medium">Total: 48</span>
                                    </div>
                                    <p className="text-3xl font-bold text-[#f9fafb] mb-3">12</p>
                                    <div className="flex justify-between text-xs text-[#9ca3af] mb-1">
                                        <span>Progress</span>
                                        <span>75%</span>
                                    </div>
                                    <div className="w-full bg-gray-700 rounded-full h-1.5">
                                        <div className="bg-[#2563eb] h-1.5 rounded-full" style={{ width: '75%' }}></div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3 mb-6">
                                    <div className="bg-[#111827] p-4 rounded-xl border border-[#374151] text-center">
                                        <span className="material-symbols-outlined text-[#22c55e] text-2xl mb-1">inventory_2</span>
                                        <p className="text-2xl font-bold text-[#f9fafb]">5</p>
                                        <p className="text-[10px] text-[#9ca3af] uppercase tracking-wider font-medium">Shortlisted</p>
                                    </div>
                                    <div className="bg-[#111827] p-4 rounded-xl border border-[#374151] text-center">
                                        <span className="material-symbols-outlined text-red-400 text-2xl mb-1">block</span>
                                        <p className="text-2xl font-bold text-[#f9fafb]">24</p>
                                        <p className="text-[10px] text-[#9ca3af] uppercase tracking-wider font-medium">Declined</p>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <div className="flex justify-between items-center mb-3">
                                        <h4 className="font-bold text-[#f9fafb] text-sm uppercase tracking-wider">Recent Shortlists</h4>
                                        <button className="text-xs text-[#2563eb] hover:underline font-medium">View All</button>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-[#2563eb] flex items-center justify-center text-sm font-bold text-white">SL</div>
                                            <div className="flex-1">
                                                <p className="text-sm font-semibold text-[#f9fafb]">Sarah Lee</p>
                                                <p className="text-xs text-[#9ca3af]">Product Manager</p>
                                            </div>
                                            <span className="text-sm font-bold text-[#22c55e]">92%</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-sm font-bold text-white">MJ</div>
                                            <div className="flex-1">
                                                <p className="text-sm font-semibold text-[#f9fafb]">Mike Johnson</p>
                                                <p className="text-xs text-[#9ca3af]">Frontend Dev</p>
                                            </div>
                                            <span className="text-sm font-bold text-[#22c55e]">88%</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Pro Tip */}
                                <div className="bg-purple-900/15 p-4 rounded-xl border border-purple-800/30">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="material-symbols-outlined text-purple-400 text-sm">diamond</span>
                                        <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider">Pro Tip</span>
                                    </div>
                                    <p className="text-xs text-[#9ca3af]">Customize your <span className="font-bold text-[#f9fafb]">Matching Criteria</span> to improve AI relevance scores.</p>
                                </div>
                            </>
                        ) : (
                            /* Profile Detail Sidebar */
                            <>
                                <div className="space-y-3 mb-6">
                                    <button className="w-full py-3 rounded-xl bg-[#22c55e] hover:bg-green-600 text-white font-bold shadow-lg shadow-green-500/20 transition-all flex items-center justify-center gap-2">
                                        <span className="material-symbols-outlined">check</span> Shortlist
                                    </button>
                                    <button className="w-full py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold shadow-lg shadow-red-500/20 transition-all flex items-center justify-center gap-2">
                                        <span className="material-symbols-outlined">close</span> Reject
                                    </button>
                                    <button className="w-full py-3 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold transition-all flex items-center justify-center gap-2">
                                        <span className="material-symbols-outlined">calendar_month</span> Schedule Interview
                                    </button>
                                    <button className="w-full py-2.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-[#f9fafb] font-medium border border-[#374151] transition-all flex items-center justify-center gap-2 text-sm">
                                        <span className="material-symbols-outlined text-sm">mail</span> Send Message
                                    </button>
                                </div>

                                {/* Match Breakdown */}
                                <div className="mb-6">
                                    <div className="flex justify-between items-center mb-4">
                                        <h4 className="font-bold text-[#f9fafb] text-sm uppercase tracking-wider">Match Breakdown</h4>
                                        <span className="text-sm font-bold text-[#22c55e]">94% Total</span>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex items-start gap-3 bg-[#111827] p-3 rounded-xl border border-[#374151]">
                                            <span className="material-symbols-outlined text-[#22c55e]">check_circle</span>
                                            <div>
                                                <p className="text-sm font-semibold text-[#f9fafb]">Experience Level</p>
                                                <p className="text-xs text-[#9ca3af]">8 years exceeds requirement (5y)</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3 bg-[#111827] p-3 rounded-xl border border-[#374151]">
                                            <span className="material-symbols-outlined text-[#22c55e]">check_circle</span>
                                            <div>
                                                <p className="text-sm font-semibold text-[#f9fafb]">Core Skills Match</p>
                                                <p className="text-xs text-[#9ca3af]">Figma, Design Systems, Prototyping</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3 bg-[#111827] p-3 rounded-xl border border-[#374151]">
                                            <span className="material-symbols-outlined text-orange-400">warning</span>
                                            <div>
                                                <p className="text-sm font-semibold text-[#f9fafb]">Location Preference</p>
                                                <p className="text-xs text-[#9ca3af]">Candidate is Hybrid (Role is On-site)</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Internal Notes */}
                                <div>
                                    <div className="flex justify-between items-center mb-4">
                                        <h4 className="font-bold text-[#f9fafb] text-sm uppercase tracking-wider">Internal Notes</h4>
                                        <span className="text-[10px] bg-gray-800 text-[#9ca3af] px-2 py-0.5 rounded-full border border-[#374151] font-medium">Team Only</span>
                                    </div>
                                    <div className="space-y-4 mb-4">
                                        <div className="flex items-start gap-3">
                                            <div className="w-8 h-8 rounded-full bg-[#2563eb] flex items-center justify-center text-xs font-bold text-white shrink-0">JS</div>
                                            <div className="flex-1 bg-[#111827] p-3 rounded-xl border border-[#374151]">
                                                <div className="flex justify-between mb-1">
                                                    <span className="text-xs font-semibold text-[#f9fafb]">Jane Smith</span>
                                                    <span className="text-[10px] text-[#9ca3af]">2h ago</span>
                                                </div>
                                                <p className="text-xs text-[#9ca3af]">Strong portfolio. I'm impressed by the design system documentation. Definitely want to ask about their process for developer handoff.</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-xs font-bold text-white shrink-0">MR</div>
                                            <div className="flex-1 bg-[#111827] p-3 rounded-xl border border-[#374151]">
                                                <div className="flex justify-between mb-1">
                                                    <span className="text-xs font-semibold text-[#f9fafb]">Mike Ross</span>
                                                    <span className="text-[10px] text-[#9ca3af]">5h ago</span>
                                                </div>
                                                <p className="text-xs text-[#9ca3af]">Looks good, but salary expectation is on the higher end of our budget.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <input type="text" placeholder="Add a note..." className="flex-1 h-10 rounded-xl bg-[#111827] border border-[#374151] text-[#f9fafb] px-4 text-sm placeholder:text-gray-500 focus:border-[#2563eb] focus:ring focus:ring-[#2563eb]/30 outline-none transition" />
                                        <button className="w-10 h-10 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white flex items-center justify-center transition-colors">
                                            <span className="material-symbols-outlined text-sm">send</span>
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </aside>
                </div>
            </main>
        </div>
    );
};

export default EmployerCandidates;
