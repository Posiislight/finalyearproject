import React from 'react';
import { useNavigate } from 'react-router-dom';

const CompanyInfo = () => {
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
                    {/* Step 1 - Active */}
                    <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-[#2563eb] flex items-center justify-center shrink-0 ring-4 ring-[#2563eb]/20 shadow-lg shadow-[#2563eb]/30">
                            <span className="text-white text-sm font-bold">1</span>
                        </div>
                        <div className="pt-1">
                            <p className="text-sm font-bold text-[#2563eb]">Company Info</p>
                            <p className="text-xs text-[#9ca3af]">Basic details</p>
                        </div>
                    </div>
                    {/* Step 2 */}
                    <div className="flex items-start gap-4 opacity-50">
                        <div className="w-8 h-8 rounded-full bg-gray-700 border-2 border-gray-600 flex items-center justify-center shrink-0 ring-4 ring-[#1F2937]">
                            <span className="text-gray-400 text-sm font-bold">2</span>
                        </div>
                        <div className="pt-1">
                            <p className="text-sm font-semibold text-[#f9fafb]">Verification & Brand</p>
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

            {/* Main Content */}
            <main className="flex-1 flex flex-col h-full overflow-hidden relative bg-[#111827]">
                <header className="flex items-center justify-between px-8 py-4 bg-[#1F2937] border-b border-[#374151] shadow-sm z-10 shrink-0">
                    <div>
                        <h2 className="text-lg font-bold text-[#f9fafb]">Welcome! Let's set up your company</h2>
                        <p className="text-sm text-[#9ca3af]">Provide basic details about your organization to get started.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="text-sm font-medium text-[#9ca3af] hover:text-[#f9fafb]">Save as Draft</button>
                        <div className="h-8 w-8 rounded-full bg-indigo-900/50 text-indigo-300 border border-indigo-700/50 flex items-center justify-center text-sm font-bold">TC</div>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-6 lg:p-10 scrollbar-thin">
                    <div className="max-w-3xl mx-auto space-y-8">
                        {/* Company Details Section */}
                        <section className="bg-[#1F2937] rounded-2xl shadow-[0_4px_20px_-2px_rgba(0,0,0,0.3)] border border-[#374151] overflow-hidden">
                            <div className="p-6 border-b border-[#374151] flex justify-between items-start">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="text-lg font-bold text-[#f9fafb]">Company Details</h3>
                                        <span className="bg-blue-900/30 text-blue-300 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide border border-blue-800/50">Required</span>
                                    </div>
                                    <p className="text-sm text-[#9ca3af]">Tell us about your company so we can personalize your experience.</p>
                                </div>
                                <span className="material-symbols-outlined text-gray-600 text-4xl">apartment</span>
                            </div>
                            <div className="p-6 space-y-6">
                                {/* Company Logo */}
                                <div className="flex items-center gap-6">
                                    <div className="w-20 h-20 rounded-2xl bg-gray-800 border-2 border-dashed border-gray-600 flex flex-col items-center justify-center cursor-pointer hover:border-[#2563eb] hover:bg-[#2563eb]/5 transition-colors group">
                                        <span className="material-symbols-outlined text-gray-500 text-2xl group-hover:text-[#2563eb] transition-colors">add_photo_alternate</span>
                                        <span className="text-[10px] text-gray-500 mt-1 group-hover:text-[#2563eb]">Logo</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-[#f9fafb]">Company Logo</p>
                                        <p className="text-xs text-[#9ca3af] mt-0.5">PNG, JPG or SVG. Max 2MB. Recommended: 400x400px</p>
                                    </div>
                                </div>

                                {/* Company Name */}
                                <div>
                                    <label className="block text-sm font-medium text-[#f9fafb] mb-2">Company Name *</label>
                                    <input
                                        type="text"
                                        placeholder="e.g., TechFlow Systems"
                                        className="w-full h-11 rounded-lg bg-gray-800 border border-gray-700 text-[#f9fafb] px-4 text-sm placeholder:text-gray-500 focus:border-[#2563eb] focus:ring focus:ring-[#2563eb]/30 outline-none transition"
                                    />
                                </div>

                                {/* Two Column: Industry & Company Size */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-[#f9fafb] mb-2">Industry *</label>
                                        <select className="w-full h-11 rounded-lg bg-gray-800 border border-gray-700 text-[#f9fafb] px-4 text-sm focus:border-[#2563eb] focus:ring focus:ring-[#2563eb]/30 outline-none transition appearance-none cursor-pointer">
                                            <option value="">Select your industry</option>
                                            <option>Technology</option>
                                            <option>Finance & Banking</option>
                                            <option>Healthcare</option>
                                            <option>Education</option>
                                            <option>Marketing & Advertising</option>
                                            <option>Retail & E-commerce</option>
                                            <option>Manufacturing</option>
                                            <option>Consulting</option>
                                            <option>Real Estate</option>
                                            <option>Other</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[#f9fafb] mb-2">Company Size *</label>
                                        <select className="w-full h-11 rounded-lg bg-gray-800 border border-gray-700 text-[#f9fafb] px-4 text-sm focus:border-[#2563eb] focus:ring focus:ring-[#2563eb]/30 outline-none transition appearance-none cursor-pointer">
                                            <option value="">Select company size</option>
                                            <option>1-10 employees</option>
                                            <option>11-50 employees</option>
                                            <option>51-200 employees</option>
                                            <option>201-500 employees</option>
                                            <option>501-1000 employees</option>
                                            <option>1000+ employees</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Company Website */}
                                <div>
                                    <label className="block text-sm font-medium text-[#f9fafb] mb-2">Company Website</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-2.5 text-gray-500 text-sm">https://</span>
                                        <input
                                            type="text"
                                            placeholder="www.yourcompany.com"
                                            className="w-full h-11 rounded-lg bg-gray-800 border border-gray-700 text-[#f9fafb] pl-16 pr-4 text-sm placeholder:text-gray-500 focus:border-[#2563eb] focus:ring focus:ring-[#2563eb]/30 outline-none transition"
                                        />
                                    </div>
                                </div>

                                {/* Two Column: Founded Year & Funding Stage */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-[#f9fafb] mb-2">Founded Year</label>
                                        <input
                                            type="number"
                                            placeholder="e.g., 2020"
                                            className="w-full h-11 rounded-lg bg-gray-800 border border-gray-700 text-[#f9fafb] px-4 text-sm placeholder:text-gray-500 focus:border-[#2563eb] focus:ring focus:ring-[#2563eb]/30 outline-none transition"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[#f9fafb] mb-2">Funding Stage</label>
                                        <select className="w-full h-11 rounded-lg bg-gray-800 border border-gray-700 text-[#f9fafb] px-4 text-sm focus:border-[#2563eb] focus:ring focus:ring-[#2563eb]/30 outline-none transition appearance-none cursor-pointer">
                                            <option value="">Select funding stage</option>
                                            <option>Bootstrapped</option>
                                            <option>Pre-Seed</option>
                                            <option>Seed</option>
                                            <option>Series A</option>
                                            <option>Series B</option>
                                            <option>Series C+</option>
                                            <option>Public</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Location & Contact */}
                        <section className="bg-[#1F2937] rounded-2xl shadow-[0_4px_20px_-2px_rgba(0,0,0,0.3)] border border-[#374151] overflow-hidden">
                            <div className="p-6 border-b border-[#374151] flex justify-between items-start">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="text-lg font-bold text-[#f9fafb]">Location & Contact</h3>
                                        <span className="bg-green-900/30 text-green-300 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide border border-green-800/50">Recommended</span>
                                    </div>
                                    <p className="text-sm text-[#9ca3af]">Help candidates find you and reach out.</p>
                                </div>
                                <span className="material-symbols-outlined text-gray-600 text-4xl">location_on</span>
                            </div>
                            <div className="p-6 space-y-6">
                                {/* Headquarters */}
                                <div>
                                    <label className="block text-sm font-medium text-[#f9fafb] mb-2">Headquarters *</label>
                                    <div className="relative">
                                        <span className="material-symbols-outlined absolute left-3 top-2.5 text-gray-500 text-xl">location_on</span>
                                        <input
                                            type="text"
                                            placeholder="e.g., San Francisco, CA"
                                            className="w-full h-11 rounded-lg bg-gray-800 border border-gray-700 text-[#f9fafb] pl-10 pr-4 text-sm placeholder:text-gray-500 focus:border-[#2563eb] focus:ring focus:ring-[#2563eb]/30 outline-none transition"
                                        />
                                    </div>
                                </div>

                                {/* Work Model */}
                                <div>
                                    <label className="block text-sm font-medium text-[#f9fafb] mb-3">Work Model</label>
                                    <div className="grid grid-cols-3 gap-3">
                                        <label className="relative flex cursor-pointer flex-col items-center gap-2 rounded-xl border border-gray-700 bg-gray-800 px-4 py-4 text-sm font-medium text-[#f9fafb] transition-all hover:bg-gray-700 has-[:checked]:border-[#2563eb] has-[:checked]:bg-[#2563eb]/5 has-[:checked]:text-[#2563eb] has-[:checked]:ring-1 has-[:checked]:ring-[#2563eb]">
                                            <span className="material-symbols-outlined text-2xl">apartment</span>
                                            On-site
                                            <input defaultChecked className="invisible absolute" name="work_model" type="radio" />
                                        </label>
                                        <label className="relative flex cursor-pointer flex-col items-center gap-2 rounded-xl border border-gray-700 bg-gray-800 px-4 py-4 text-sm font-medium text-[#f9fafb] transition-all hover:bg-gray-700 has-[:checked]:border-[#2563eb] has-[:checked]:bg-[#2563eb]/5 has-[:checked]:text-[#2563eb] has-[:checked]:ring-1 has-[:checked]:ring-[#2563eb]">
                                            <span className="material-symbols-outlined text-2xl">home_work</span>
                                            Hybrid
                                            <input className="invisible absolute" name="work_model" type="radio" />
                                        </label>
                                        <label className="relative flex cursor-pointer flex-col items-center gap-2 rounded-xl border border-gray-700 bg-gray-800 px-4 py-4 text-sm font-medium text-[#f9fafb] transition-all hover:bg-gray-700 has-[:checked]:border-[#2563eb] has-[:checked]:bg-[#2563eb]/5 has-[:checked]:text-[#2563eb] has-[:checked]:ring-1 has-[:checked]:ring-[#2563eb]">
                                            <span className="material-symbols-outlined text-2xl">laptop_mac</span>
                                            Remote
                                            <input className="invisible absolute" name="work_model" type="radio" />
                                        </label>
                                    </div>
                                </div>

                                {/* Two Column: Phone & Contact Email */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-[#f9fafb] mb-2">Contact Phone</label>
                                        <div className="relative">
                                            <span className="material-symbols-outlined absolute left-3 top-2.5 text-gray-500 text-xl">call</span>
                                            <input
                                                type="tel"
                                                placeholder="+1 (555) 000-0000"
                                                className="w-full h-11 rounded-lg bg-gray-800 border border-gray-700 text-[#f9fafb] pl-10 pr-4 text-sm placeholder:text-gray-500 focus:border-[#2563eb] focus:ring focus:ring-[#2563eb]/30 outline-none transition"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[#f9fafb] mb-2">HR Contact Email</label>
                                        <div className="relative">
                                            <span className="material-symbols-outlined absolute left-3 top-2.5 text-gray-500 text-xl">mail</span>
                                            <input
                                                type="email"
                                                placeholder="hr@yourcompany.com"
                                                className="w-full h-11 rounded-lg bg-gray-800 border border-gray-700 text-[#f9fafb] pl-10 pr-4 text-sm placeholder:text-gray-500 focus:border-[#2563eb] focus:ring focus:ring-[#2563eb]/30 outline-none transition"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Company Description */}
                                <div>
                                    <label className="block text-sm font-medium text-[#f9fafb] mb-2">Company Description</label>
                                    <textarea
                                        rows={4}
                                        placeholder="Tell candidates what makes your company unique..."
                                        className="w-full rounded-lg bg-gray-800 border border-gray-700 text-[#f9fafb] px-4 py-3 text-sm placeholder:text-gray-500 focus:border-[#2563eb] focus:ring focus:ring-[#2563eb]/30 outline-none transition resize-none"
                                    ></textarea>
                                    <p className="text-xs text-[#9ca3af] mt-1">Brief description shown on your company profile. Max 500 characters.</p>
                                </div>
                            </div>
                        </section>

                        {/* Navigation Buttons */}
                        <div className="flex justify-end items-center pt-4 pb-12">
                            <button
                                onClick={() => navigate('/employer-verification')}
                                className="px-8 py-3 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold shadow-lg shadow-[#2563eb]/30 transition-all flex items-center gap-2"
                            >
                                Continue to Verification
                                <span className="material-symbols-outlined text-sm">arrow_forward</span>
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CompanyInfo;
