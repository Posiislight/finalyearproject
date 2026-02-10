import React from 'react';
import { useNavigate } from 'react-router-dom';

const EmployerVerification = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-[#111827] text-[#f9fafb] font-['DM_Sans',sans-serif] antialiased h-screen flex overflow-hidden">
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
                    {/* Step 2 - Active */}
                    <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-[#2563eb] flex items-center justify-center shrink-0 ring-4 ring-[#2563eb]/20 shadow-lg shadow-[#2563eb]/30">
                            <span className="text-white text-sm font-bold">2</span>
                        </div>
                        <div className="pt-1">
                            <p className="text-sm font-bold text-[#2563eb]">Verification & Branding</p>
                            <p className="text-xs text-[#9ca3af]">Identity & Profile look</p>
                        </div>
                    </div>
                    {/* Step 3 */}
                    <div className="flex items-start gap-4 opacity-50">
                        <div className="w-8 h-8 rounded-full bg-gray-700 border-2 border-gray-600 flex items-center justify-center shrink-0 ring-4 ring-[#1F2937]">
                            <span className="text-gray-400 text-sm font-bold">3</span>
                        </div>
                        <div className="pt-1">
                            <p className="text-sm font-semibold text-[#f9fafb]">First Job Post</p>
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
            <main className="flex-1 flex flex-col h-full overflow-hidden relative bg-[#111827]">
                <header className="flex items-center justify-between px-8 py-4 bg-[#1F2937] border-b border-[#374151] shadow-sm z-10 shrink-0">
                    <div>
                        <h2 className="text-lg font-bold text-[#f9fafb]">Establish Your Presence</h2>
                        <p className="text-sm text-[#9ca3af]">Verify your business identity and customize how candidates see you.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="text-sm font-medium text-[#9ca3af] hover:text-[#f9fafb]">Save as Draft</button>
                        <div className="h-8 w-8 rounded-full bg-indigo-900/50 text-indigo-300 border border-indigo-700/50 flex items-center justify-center text-sm font-bold">
                            TC
                        </div>
                    </div>
                </header>
                <div className="flex-1 overflow-y-auto p-6 lg:p-10 scrollbar-thin">
                    <div className="max-w-5xl mx-auto space-y-8">
                        {/* Business Verification */}
                        <section className="bg-[#1F2937] rounded-2xl shadow-[0_4px_20px_-2px_rgba(0,0,0,0.3)] border border-[#374151] overflow-hidden">
                            <div className="p-6 border-b border-[#374151] flex justify-between items-start">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="text-lg font-bold text-[#f9fafb]">Business Verification</h3>
                                        <span className="bg-blue-900/30 text-blue-300 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide border border-blue-800/50">Required</span>
                                    </div>
                                    <p className="text-sm text-[#9ca3af]">Upload official documents to earn the "Verified Employer" badge. Trusted by 98% of candidates.</p>
                                </div>
                                <span className="material-symbols-outlined text-gray-600 text-4xl">verified_user</span>
                            </div>
                            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <label className="block text-sm font-medium text-[#f9fafb]">Upload Business Registration or Tax Document</label>
                                    <div className="border-2 border-dashed border-gray-600 hover:border-[#2563eb] hover:bg-[#2563eb]/5 transition-colors rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer group">
                                        <div className="bg-blue-900/20 p-3 rounded-full mb-3 group-hover:scale-110 transition-transform">
                                            <span className="material-symbols-outlined text-[#2563eb] text-2xl">cloud_upload</span>
                                        </div>
                                        <p className="text-sm font-medium text-[#f9fafb] mb-1">Click to upload or drag and drop</p>
                                        <p className="text-xs text-[#9ca3af]">PDF, PNG or JPG (max. 10MB)</p>
                                    </div>
                                    <div className="flex items-start gap-2 text-xs text-[#9ca3af] bg-gray-800/50 p-3 rounded-lg border border-gray-700">
                                        <span className="material-symbols-outlined text-base text-gray-500 shrink-0">lock</span>
                                        Documents are securely stored and only used for verification purposes. They will not be public.
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <p className="text-xs font-semibold text-[#9ca3af] uppercase tracking-wider mb-2">Attached Documents</p>
                                    <div className="flex items-center p-3 bg-gray-800 border border-gray-700 rounded-xl shadow-sm hover:border-gray-600 transition-colors group">
                                        <div className="w-10 h-10 bg-red-900/20 rounded-lg flex items-center justify-center mr-3 shrink-0">
                                            <span className="material-symbols-outlined text-red-500">picture_as_pdf</span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-[#f9fafb] truncate">Inc_Certificate_2023.pdf</p>
                                            <div className="flex items-center gap-1.5 mt-0.5">
                                                <span className="w-2 h-2 rounded-full bg-[#22c55e]"></span>
                                                <p className="text-xs text-[#9ca3af]">Uploaded successfully</p>
                                            </div>
                                        </div>
                                        <button className="p-2 text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <span className="material-symbols-outlined text-xl">delete</span>
                                        </button>
                                    </div>
                                    <div className="flex items-center p-3 bg-gray-800 border border-gray-700 rounded-xl shadow-sm relative overflow-hidden">
                                        <div className="absolute bottom-0 left-0 h-1 bg-[#2563eb]/20 w-full">
                                            <div className="h-full bg-[#2563eb] w-2/3"></div>
                                        </div>
                                        <div className="w-10 h-10 bg-blue-900/20 rounded-lg flex items-center justify-center mr-3 shrink-0">
                                            <span className="material-symbols-outlined text-blue-500">image</span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-[#f9fafb] truncate">Office_Lease_Agreement.png</p>
                                            <p className="text-xs text-[#9ca3af] mt-0.5">Scanning for viruses... 65%</p>
                                        </div>
                                        <button className="p-2 text-gray-500 hover:text-red-400">
                                            <span className="material-symbols-outlined text-xl">close</span>
                                        </button>
                                    </div>
                                    <div className="flex items-center p-3 bg-red-900/10 border border-red-900/30 rounded-xl shadow-sm">
                                        <div className="w-10 h-10 bg-red-900/20 rounded-lg flex items-center justify-center mr-3 shrink-0">
                                            <span className="material-symbols-outlined text-red-500">warning</span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-red-400 truncate">Tax_Form_Old.pdf</p>
                                            <p className="text-xs text-red-300 mt-0.5">File type not supported or corrupted.</p>
                                        </div>
                                        <button className="p-2 text-red-400 hover:text-red-300">
                                            <span className="material-symbols-outlined text-xl">refresh</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Employer Branding */}
                        <section className="bg-[#1F2937] rounded-2xl shadow-[0_4px_20px_-2px_rgba(0,0,0,0.3)] border border-[#374151] overflow-hidden">
                            <div className="p-6 border-b border-[#374151] flex justify-between items-start">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="text-lg font-bold text-[#f9fafb]">Employer Branding</h3>
                                        <span className="bg-green-900/30 text-green-300 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide border border-green-800/50">Recommended</span>
                                    </div>
                                    <p className="text-sm text-[#9ca3af]">Customize how your company card appears in the candidate swipe feed.</p>
                                </div>
                                <span className="material-symbols-outlined text-gray-600 text-4xl">palette</span>
                            </div>
                            <div className="flex flex-col lg:flex-row">
                                <div className="w-full lg:w-1/3 p-6 border-b lg:border-b-0 lg:border-r border-[#374151] space-y-6 bg-gray-800/30">
                                    <div>
                                        <label className="block text-sm font-semibold text-[#f9fafb] mb-3">Brand Primary Color</label>
                                        <div className="flex flex-wrap gap-3">
                                            <button className="w-8 h-8 rounded-full bg-[#2463eb] ring-2 ring-offset-2 ring-[#2463eb] ring-offset-[#1F2937] transition-all"></button>
                                            <button className="w-8 h-8 rounded-full bg-[#ec4899] hover:ring-2 hover:ring-offset-2 hover:ring-[#ec4899] hover:ring-offset-[#1F2937] transition-all"></button>
                                            <button className="w-8 h-8 rounded-full bg-[#10b981] hover:ring-2 hover:ring-offset-2 hover:ring-[#10b981] hover:ring-offset-[#1F2937] transition-all"></button>
                                            <button className="w-8 h-8 rounded-full bg-[#f59e0b] hover:ring-2 hover:ring-offset-2 hover:ring-[#f59e0b] hover:ring-offset-[#1F2937] transition-all"></button>
                                            <button className="w-8 h-8 rounded-full bg-[#8b5cf6] hover:ring-2 hover:ring-offset-2 hover:ring-[#8b5cf6] hover:ring-offset-[#1F2937] transition-all"></button>
                                            <div className="relative group">
                                                <button className="w-8 h-8 rounded-full bg-transparent border border-gray-600 flex items-center justify-center hover:border-gray-400 hover:bg-gray-800">
                                                    <span className="material-symbols-outlined text-gray-400 text-sm">add</span>
                                                </button>
                                            </div>
                                        </div>
                                        <p className="text-xs text-[#9ca3af] mt-2">Used for buttons, links, and accents on your profile.</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-[#f9fafb] mb-3">Cover Photo</label>
                                        <div className="relative group cursor-pointer overflow-hidden rounded-xl border border-gray-700">
                                            <img alt="Current Cover" className="w-full h-32 object-cover transition-opacity group-hover:opacity-75" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCUqCUZJ83tZFyCOeO7dfF8OEiTgAjdI1TUyC0e15O3XUQSE91x4bYTtnkpdKVd8xh-yFnDTEsci9F7WcYGWXAlyrMtZV6ODJ7KiOBAWsE271fLTIpaPOcKmCe4J5_OmSgqOi6Dk_inHgOnkZ_j1RB9jDlwPuy3vO4WrtL1mMYVxoZrWl6CNL0ukstYWyiZwrij_BYk-rOh8YNqakxibES0RlK6luenR3iq08ieP4woJNY5ZXNFj0j3RdzPxGZhaP8FbXmt6_fyOM0" />
                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/60">
                                                <span className="bg-gray-800/90 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm border border-gray-600">Change Image</span>
                                            </div>
                                        </div>
                                        <p className="text-xs text-[#9ca3af] mt-2">Recommended size: 1200x600px. Used as the main visual.</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-[#f9fafb] mb-2">One-Liner Pitch</label>
                                        <input className="w-full rounded-lg bg-gray-800 border-gray-600 text-[#f9fafb] shadow-sm focus:border-[#2563eb] focus:ring focus:ring-[#2563eb]/30 text-sm placeholder:text-gray-500" placeholder="e.g. Building the future of finance." type="text" defaultValue="Revolutionizing digital payments globally." />
                                        <div className="flex justify-between mt-1">
                                            <p className="text-xs text-[#9ca3af]">Appears on the swipe card.</p>
                                            <p className="text-xs text-[#9ca3af]">42/60</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full lg:w-2/3 p-8 bg-black/20 flex flex-col items-center justify-center">
                                    <div className="mb-4 flex items-center gap-2 text-[#9ca3af] text-sm">
                                        <span className="material-symbols-outlined text-lg">visibility</span>
                                        <span>Candidate Preview (Card Mode)</span>
                                    </div>
                                    <div className="w-[320px] bg-[#1F2937] rounded-3xl shadow-xl overflow-hidden border border-[#374151] relative transform hover:scale-[1.01] transition-transform duration-300">
                                        <div className="h-40 bg-cover bg-center relative" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCUqCUZJ83tZFyCOeO7dfF8OEiTgAjdI1TUyC0e15O3XUQSE91x4bYTtnkpdKVd8xh-yFnDTEsci9F7WcYGWXAlyrMtZV6ODJ7KiOBAWsE271fLTIpaPOcKmCe4J5_OmSgqOi6Dk_inHgOnkZ_j1RB9jDlwPuy3vO4WrtL1mMYVxoZrWl6CNL0ukstYWyiZwrij_BYk-rOh8YNqakxibES0RlK6luenR3iq08ieP4woJNY5ZXNFj0j3RdzPxGZhaP8FbXmt6_fyOM0')" }}>
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                            <div className="absolute bottom-3 left-3 flex items-center gap-2">
                                                <div className="w-10 h-10 rounded-lg bg-gray-800 p-1 shadow-sm border border-gray-700">
                                                    <img alt="Logo" className="w-full h-full object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDX0W6417ElFGkKFmqXF7LdYrJt4Iz36pECq3w-s_FIUXAXOPm6xSDICP6oo3V9EbTd_MPhrfCJe3P5DyL2-2uJ9ZW1K-uXpa3wMJbR1bC4n_5L0z0GNuPob_qq2GibBJcBYfeTby7vPg2IVkYTQbzfkK_7pAWlQk9yW_lbCjs2t-doAtw6kt82uqU48n5dniwC4LUl1zRpLsnVKPB7GkvHnYCz68txLYuwTeMOzeMuM0vMG4_f56wmxgR1XWgf3oHE8bE-EKVOQlY" />
                                                </div>
                                                <div className="text-white">
                                                    <p className="font-bold text-sm leading-tight">TechFlow Systems</p>
                                                    <div className="flex items-center gap-1 text-[10px] opacity-90 text-gray-300">
                                                        <span className="material-symbols-outlined text-[10px]">verified</span>
                                                        <span>Verified</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-4 space-y-3 bg-[#1F2937]">
                                            <div>
                                                <h4 className="font-bold text-white text-lg leading-tight">Senior UX Designer</h4>
                                                <p className="text-xs text-[#2563eb] font-medium mt-1">Revolutionizing digital payments globally.</p>
                                            </div>
                                            <div className="flex flex-wrap gap-2 text-[10px] text-gray-400 font-medium">
                                                <span className="bg-gray-800 px-2 py-1 rounded-md border border-gray-700">San Francisco</span>
                                                <span className="bg-gray-800 px-2 py-1 rounded-md border border-gray-700">$130k - $160k</span>
                                                <span className="bg-gray-800 px-2 py-1 rounded-md border border-gray-700">Series B</span>
                                            </div>
                                            <div className="pt-2 border-t border-gray-700">
                                                <p className="text-xs text-gray-500 mb-2 font-medium">SKILL MATCH</p>
                                                <div className="flex flex-wrap gap-1.5">
                                                    <span className="px-2 py-0.5 rounded-full bg-blue-900/30 text-blue-300 border border-blue-800/50 text-[10px] font-semibold">Figma</span>
                                                    <span className="px-2 py-0.5 rounded-full bg-blue-900/30 text-blue-300 border border-blue-800/50 text-[10px] font-semibold">React</span>
                                                    <span className="px-2 py-0.5 rounded-full bg-gray-800 text-gray-400 border border-gray-700 text-[10px]">Product</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-3 bg-gray-800/50 flex justify-center gap-4 border-t border-[#374151]">
                                            <div className="w-10 h-10 rounded-full bg-[#1F2937] shadow-sm border border-[#374151] flex items-center justify-center text-red-400 hover:bg-red-900/20 transition-colors">
                                                <span className="material-symbols-outlined text-xl">close</span>
                                            </div>
                                            <div className="w-10 h-10 rounded-full bg-[#1F2937] shadow-sm border border-[#374151] flex items-center justify-center text-blue-400 hover:bg-blue-900/20 transition-colors">
                                                <span className="material-symbols-outlined text-xl">info</span>
                                            </div>
                                            <div className="w-10 h-10 rounded-full bg-[#1F2937] shadow-sm border border-[#374151] flex items-center justify-center text-green-500 hover:bg-green-900/20 transition-colors">
                                                <span className="material-symbols-outlined text-xl icon-fill">favorite</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Navigation */}
                        <div className="flex justify-between items-center pt-4 pb-12">
                            <button
                                onClick={() => navigate('/company-info')}
                                className="px-6 py-3 rounded-xl border border-[#374151] text-[#f9fafb] font-semibold hover:bg-gray-800 transition-colors flex items-center gap-2"
                            >
                                <span className="material-symbols-outlined text-sm">arrow_back</span>
                                Back
                            </button>
                            <button
                                onClick={() => navigate('/employer-job-post')}
                                className="px-8 py-3 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold shadow-lg shadow-[#2563eb]/30 transition-all flex items-center gap-2"
                            >
                                Continue to Job Post
                                <span className="material-symbols-outlined text-sm">arrow_forward</span>
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default EmployerVerification;
