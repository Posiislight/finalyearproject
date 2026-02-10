import React, { useState } from 'react';
import EmployerSidebar from './EmployerSidebar';

const EmployerCompanyProfile = () => {
    const [activeTab, setActiveTab] = useState('overview');

    return (
        <div className="bg-[#111827] text-[#f9fafb] font-['DM_Sans',sans-serif] antialiased h-screen flex overflow-hidden">
            <EmployerSidebar />

            <main className="flex-1 flex flex-col h-screen overflow-hidden">
                {/* Header */}
                <header className="flex items-center justify-between px-8 py-4 bg-[#1F2937] border-b border-[#374151] shrink-0">
                    <div>
                        <h2 className="text-lg font-bold text-[#f9fafb]">Company Profile</h2>
                        <p className="text-sm text-[#9ca3af]">Manage how your company appears to candidates.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="px-4 py-2 rounded-lg border border-[#374151] text-[#9ca3af] hover:text-[#f9fafb] hover:bg-gray-800 text-sm font-medium transition-colors">
                            Preview Profile
                        </button>
                        <button className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-lg shadow-[#2563eb]/30 transition-all flex items-center gap-2">
                            <span className="material-symbols-outlined text-lg">save</span>
                            Save Changes
                        </button>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-6 lg:p-10">
                    <div className="max-w-5xl mx-auto space-y-8">

                        {/* Cover Photo & Logo */}
                        <div className="bg-[#1F2937] rounded-2xl border border-[#374151] overflow-hidden">
                            {/* Cover */}
                            <div className="relative h-48 bg-gradient-to-r from-[#2563eb]/40 to-purple-600/40 flex items-center justify-center group cursor-pointer">
                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <div className="flex items-center gap-2 bg-black/60 px-4 py-2 rounded-lg text-white text-sm font-medium">
                                        <span className="material-symbols-outlined text-sm">photo_camera</span>
                                        Change Cover Photo
                                    </div>
                                </div>
                                <span className="material-symbols-outlined text-white/20 text-8xl">business</span>
                            </div>
                            {/* Logo + Name */}
                            <div className="px-8 pb-6 flex items-end gap-5 -mt-10">
                                <div className="relative group cursor-pointer">
                                    <div className="w-20 h-20 rounded-2xl bg-[#2563eb] flex items-center justify-center border-4 border-[#1F2937] shadow-xl">
                                        <span className="text-white font-extrabold text-2xl">TF</span>
                                    </div>
                                    <div className="absolute inset-0 rounded-2xl bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <span className="material-symbols-outlined text-white text-lg">edit</span>
                                    </div>
                                </div>
                                <div className="pb-2">
                                    <h3 className="text-xl font-bold text-[#f9fafb]">TechFlow Systems</h3>
                                    <p className="text-sm text-[#9ca3af]">techflow.io • San Francisco, CA</p>
                                </div>
                                <div className="ml-auto pb-2 flex items-center gap-2">
                                    <span className="px-3 py-1 rounded-full bg-green-900/20 text-[#22c55e] border border-green-900/30 text-xs font-bold uppercase tracking-wider">Verified</span>
                                    <span className="px-3 py-1 rounded-full bg-[#2563eb]/10 text-[#2563eb] border border-[#2563eb]/30 text-xs font-bold uppercase tracking-wider">Premium</span>
                                </div>
                            </div>
                        </div>

                        {/* Tabs */}
                        <div className="flex items-center gap-1 border-b border-[#374151]">
                            {['overview', 'culture', 'benefits', 'team'].map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-5 py-3 text-sm font-medium capitalize transition-colors border-b-2 -mb-px ${
                                        activeTab === tab
                                            ? 'text-[#2563eb] border-[#2563eb]'
                                            : 'text-[#9ca3af] border-transparent hover:text-[#f9fafb]'
                                    }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        {/* Overview Tab */}
                        {activeTab === 'overview' && (
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                {/* Left: Main Info */}
                                <div className="lg:col-span-2 space-y-6">
                                    {/* Company Details */}
                                    <div className="bg-[#1F2937] rounded-2xl border border-[#374151] p-6">
                                        <h4 className="font-bold text-[#f9fafb] mb-5 flex items-center gap-2">
                                            <span className="material-symbols-outlined text-[#2563eb]">apartment</span>
                                            Company Details
                                        </h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            {[
                                                { label: 'Company Name', value: 'TechFlow Systems', icon: 'business' },
                                                { label: 'Industry', value: 'Software & Technology', icon: 'category' },
                                                { label: 'Company Size', value: '51–200 employees', icon: 'group' },
                                                { label: 'Founded', value: '2018', icon: 'calendar_today' },
                                                { label: 'Website', value: 'https://techflow.io', icon: 'language' },
                                                { label: 'Funding Stage', value: 'Series B', icon: 'monetization_on' },
                                            ].map((field, i) => (
                                                <div key={i}>
                                                    <label className="block text-xs font-semibold text-[#9ca3af] uppercase tracking-wider mb-1.5">{field.label}</label>
                                                    <div className="flex items-center gap-2 bg-[#111827] border border-[#374151] rounded-xl px-4 py-3 focus-within:border-[#2563eb] transition-colors">
                                                        <span className="material-symbols-outlined text-[#9ca3af] text-sm">{field.icon}</span>
                                                        <input
                                                            type="text"
                                                            defaultValue={field.value}
                                                            className="flex-1 bg-transparent text-[#f9fafb] text-sm outline-none placeholder:text-gray-500"
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* About */}
                                    <div className="bg-[#1F2937] rounded-2xl border border-[#374151] p-6">
                                        <h4 className="font-bold text-[#f9fafb] mb-5 flex items-center gap-2">
                                            <span className="material-symbols-outlined text-[#2563eb]">info</span>
                                            About the Company
                                        </h4>
                                        <textarea
                                            rows={5}
                                            defaultValue="TechFlow Systems is a fast-growing SaaS company building the next generation of workflow automation tools. We help teams ship faster, collaborate smarter, and scale with confidence. Backed by top-tier investors, we're on a mission to eliminate busywork from every workplace."
                                            className="w-full bg-[#111827] border border-[#374151] rounded-xl px-4 py-3 text-[#f9fafb] text-sm outline-none focus:border-[#2563eb] transition-colors resize-none placeholder:text-gray-500"
                                        />
                                        <p className="text-xs text-[#9ca3af] mt-2">This appears on your public employer profile visible to candidates.</p>
                                    </div>

                                    {/* Location & Work Model */}
                                    <div className="bg-[#1F2937] rounded-2xl border border-[#374151] p-6">
                                        <h4 className="font-bold text-[#f9fafb] mb-5 flex items-center gap-2">
                                            <span className="material-symbols-outlined text-[#2563eb]">location_on</span>
                                            Location & Work Model
                                        </h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            {[
                                                { label: 'HQ Location', value: 'San Francisco, CA', icon: 'location_city' },
                                                { label: 'Additional Offices', value: 'New York, London', icon: 'corporate_fare' },
                                            ].map((field, i) => (
                                                <div key={i}>
                                                    <label className="block text-xs font-semibold text-[#9ca3af] uppercase tracking-wider mb-1.5">{field.label}</label>
                                                    <div className="flex items-center gap-2 bg-[#111827] border border-[#374151] rounded-xl px-4 py-3 focus-within:border-[#2563eb] transition-colors">
                                                        <span className="material-symbols-outlined text-[#9ca3af] text-sm">{field.icon}</span>
                                                        <input type="text" defaultValue={field.value} className="flex-1 bg-transparent text-[#f9fafb] text-sm outline-none" />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="mt-5">
                                            <label className="block text-xs font-semibold text-[#9ca3af] uppercase tracking-wider mb-3">Work Model</label>
                                            <div className="flex gap-3 flex-wrap">
                                                {['Remote', 'Hybrid', 'On-site'].map(model => (
                                                    <button
                                                        key={model}
                                                        className={`px-4 py-2 rounded-xl text-sm font-medium border transition-colors ${
                                                            model === 'Hybrid'
                                                                ? 'bg-[#2563eb]/10 text-[#2563eb] border-[#2563eb]/40'
                                                                : 'bg-[#111827] text-[#9ca3af] border-[#374151] hover:border-[#2563eb]/40 hover:text-[#f9fafb]'
                                                        }`}
                                                    >
                                                        {model}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right: Sidebar Info */}
                                <div className="space-y-6">
                                    {/* Profile Completeness */}
                                    <div className="bg-[#1F2937] rounded-2xl border border-[#374151] p-6">
                                        <h4 className="font-bold text-[#f9fafb] mb-4 text-sm uppercase tracking-wider">Profile Strength</h4>
                                        <div className="flex items-center gap-3 mb-3">
                                            <span className="text-3xl font-extrabold text-[#22c55e]">78%</span>
                                            <span className="text-sm text-[#9ca3af]">Good</span>
                                        </div>
                                        <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
                                            <div className="bg-[#22c55e] h-2 rounded-full" style={{ width: '78%' }}></div>
                                        </div>
                                        <div className="space-y-2">
                                            {[
                                                { label: 'Company logo', done: true },
                                                { label: 'Cover photo', done: false },
                                                { label: 'About section', done: true },
                                                { label: 'Culture & values', done: false },
                                                { label: 'Benefits listed', done: true },
                                            ].map((item, i) => (
                                                <div key={i} className="flex items-center gap-2 text-sm">
                                                    <span className={`material-symbols-outlined text-sm ${item.done ? 'text-[#22c55e]' : 'text-[#9ca3af]'}`}>
                                                        {item.done ? 'check_circle' : 'radio_button_unchecked'}
                                                    </span>
                                                    <span className={item.done ? 'text-[#f9fafb]' : 'text-[#9ca3af]'}>{item.label}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Social Links */}
                                    <div className="bg-[#1F2937] rounded-2xl border border-[#374151] p-6">
                                        <h4 className="font-bold text-[#f9fafb] mb-4 text-sm uppercase tracking-wider">Social Links</h4>
                                        <div className="space-y-3">
                                            {[
                                                { label: 'LinkedIn', icon: 'link', placeholder: 'linkedin.com/company/...' },
                                                { label: 'Twitter / X', icon: 'link', placeholder: 'twitter.com/...' },
                                                { label: 'GitHub', icon: 'code', placeholder: 'github.com/...' },
                                            ].map((s, i) => (
                                                <div key={i}>
                                                    <label className="block text-xs text-[#9ca3af] mb-1">{s.label}</label>
                                                    <div className="flex items-center gap-2 bg-[#111827] border border-[#374151] rounded-xl px-3 py-2.5 focus-within:border-[#2563eb] transition-colors">
                                                        <span className="material-symbols-outlined text-[#9ca3af] text-sm">{s.icon}</span>
                                                        <input type="text" placeholder={s.placeholder} className="flex-1 bg-transparent text-[#f9fafb] text-xs outline-none placeholder:text-gray-600" />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Employer Branding Color */}
                                    <div className="bg-[#1F2937] rounded-2xl border border-[#374151] p-6">
                                        <h4 className="font-bold text-[#f9fafb] mb-4 text-sm uppercase tracking-wider">Brand Color</h4>
                                        <div className="flex gap-3 flex-wrap">
                                            {['#2563eb', '#7c3aed', '#059669', '#dc2626', '#d97706', '#0891b2'].map(color => (
                                                <button
                                                    key={color}
                                                    className={`w-8 h-8 rounded-full border-2 transition-all ${color === '#2563eb' ? 'border-white scale-110' : 'border-transparent hover:scale-110'}`}
                                                    style={{ backgroundColor: color }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Culture Tab */}
                        {activeTab === 'culture' && (
                            <div className="bg-[#1F2937] rounded-2xl border border-[#374151] p-6">
                                <h4 className="font-bold text-[#f9fafb] mb-5 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-[#2563eb]">diversity_3</span>
                                    Culture & Values
                                </h4>
                                <div className="space-y-5">
                                    <div>
                                        <label className="block text-xs font-semibold text-[#9ca3af] uppercase tracking-wider mb-2">Mission Statement</label>
                                        <textarea rows={3} defaultValue="To eliminate busywork from every workplace through intelligent automation." className="w-full bg-[#111827] border border-[#374151] rounded-xl px-4 py-3 text-[#f9fafb] text-sm outline-none focus:border-[#2563eb] transition-colors resize-none" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-[#9ca3af] uppercase tracking-wider mb-3">Core Values</label>
                                        <div className="flex flex-wrap gap-2">
                                            {['Innovation', 'Transparency', 'Ownership', 'Customer First', 'Diversity & Inclusion', 'Work-Life Balance'].map(v => (
                                                <span key={v} className="px-3 py-1.5 rounded-lg bg-[#2563eb]/10 text-[#2563eb] border border-[#2563eb]/30 text-sm font-medium flex items-center gap-1">
                                                    {v}
                                                    <span className="material-symbols-outlined text-sm cursor-pointer hover:text-red-400">close</span>
                                                </span>
                                            ))}
                                            <button className="px-3 py-1.5 rounded-lg bg-gray-800 text-[#9ca3af] border border-[#374151] text-sm font-medium hover:text-[#f9fafb] flex items-center gap-1">
                                                <span className="material-symbols-outlined text-sm">add</span> Add Value
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Benefits Tab */}
                        {activeTab === 'benefits' && (
                            <div className="bg-[#1F2937] rounded-2xl border border-[#374151] p-6">
                                <h4 className="font-bold text-[#f9fafb] mb-5 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-[#2563eb]">redeem</span>
                                    Benefits & Perks
                                </h4>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {[
                                        { icon: 'health_and_safety', label: 'Health Insurance', active: true },
                                        { icon: 'home', label: 'Remote Work', active: true },
                                        { icon: 'school', label: 'Learning Budget', active: true },
                                        { icon: 'flight', label: 'Unlimited PTO', active: true },
                                        { icon: 'fitness_center', label: 'Gym Membership', active: false },
                                        { icon: 'child_care', label: 'Parental Leave', active: true },
                                        { icon: 'lunch_dining', label: 'Free Meals', active: false },
                                        { icon: 'savings', label: '401(k) Match', active: true },
                                        { icon: 'devices', label: 'Equipment Budget', active: true },
                                    ].map((b, i) => (
                                        <div key={i} className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${b.active ? 'bg-[#2563eb]/10 border-[#2563eb]/40 text-[#f9fafb]' : 'bg-[#111827] border-[#374151] text-[#9ca3af] hover:border-[#374151]/80'}`}>
                                            <span className={`material-symbols-outlined ${b.active ? 'text-[#2563eb]' : 'text-[#9ca3af]'}`}>{b.icon}</span>
                                            <span className="text-sm font-medium">{b.label}</span>
                                            {b.active && <span className="ml-auto material-symbols-outlined text-[#22c55e] text-sm">check_circle</span>}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Team Tab */}
                        {activeTab === 'team' && (
                            <div className="bg-[#1F2937] rounded-2xl border border-[#374151] p-6">
                                <div className="flex items-center justify-between mb-5">
                                    <h4 className="font-bold text-[#f9fafb] flex items-center gap-2">
                                        <span className="material-symbols-outlined text-[#2563eb]">group</span>
                                        Team Members
                                    </h4>
                                    <button className="flex items-center gap-2 bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-3 py-2 rounded-lg text-sm font-semibold transition-all">
                                        <span className="material-symbols-outlined text-sm">person_add</span>
                                        Invite Member
                                    </button>
                                </div>
                                <div className="space-y-3">
                                    {[
                                        { name: 'Jane Smith', role: 'Recruiter Admin', email: 'jane@techflow.io', avatar: 'JS', color: '#2563eb' },
                                        { name: 'Mike Ross', role: 'Hiring Manager', email: 'mike@techflow.io', avatar: 'MR', color: '#7c3aed' },
                                        { name: 'Sarah Chen', role: 'HR Coordinator', email: 'sarah@techflow.io', avatar: 'SC', color: '#059669' },
                                    ].map((m, i) => (
                                        <div key={i} className="flex items-center gap-4 p-4 bg-[#111827] rounded-xl border border-[#374151]">
                                            <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm" style={{ backgroundColor: m.color }}>{m.avatar}</div>
                                            <div className="flex-1">
                                                <p className="font-semibold text-[#f9fafb] text-sm">{m.name}</p>
                                                <p className="text-xs text-[#9ca3af]">{m.email}</p>
                                            </div>
                                            <span className="px-2 py-1 rounded-lg bg-gray-800 text-[#9ca3af] border border-[#374151] text-xs font-medium">{m.role}</span>
                                            <button className="text-[#9ca3af] hover:text-red-400 transition-colors">
                                                <span className="material-symbols-outlined text-sm">more_vert</span>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </main>
        </div>
    );
};

export default EmployerCompanyProfile;
