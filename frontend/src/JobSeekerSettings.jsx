import React, { useState } from 'react';
import JobSeekerBottomNav from './JobSeekerBottomNav';

const JobSeekerSettings = () => {
    const [activeSection, setActiveSection] = useState('account');
    const [notifications, setNotifications] = useState({
        newMatch: true,
        applicationUpdate: true,
        interviewReminder: true,
        weeklyDigest: false,
        jobAlerts: true,
        marketingEmails: false,
    });
    const [profileVisibility, setProfileVisibility] = useState('visible');

    const toggle = (key) => setNotifications(prev => ({ ...prev, [key]: !prev[key] }));

    const sections = [
        { id: 'account', label: 'Account', icon: 'manage_accounts' },
        { id: 'notifications', label: 'Notifications', icon: 'notifications' },
        { id: 'privacy', label: 'Privacy', icon: 'shield' },
        { id: 'jobalerts', label: 'Job Alerts', icon: 'notifications_active' },
        { id: 'appearance', label: 'Appearance', icon: 'palette' },
    ];

    return (
        <div className="bg-[#111827] text-[#f9fafb] font-['DM_Sans',sans-serif] antialiased h-screen flex flex-col overflow-hidden">
            {/* Header */}
            <header className="px-5 pt-4 pb-2 shrink-0">
                <h1 className="text-xl font-bold text-[#f9fafb] mb-3">Settings</h1>

                {/* Section Tabs */}
                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                    {sections.map(s => (
                        <button
                            key={s.id}
                            onClick={() => setActiveSection(s.id)}
                            className={`shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                                activeSection === s.id
                                    ? 'bg-[#2563eb]/10 text-[#2563eb] border border-[#2563eb]/30'
                                    : 'bg-[#1F2937] text-[#9ca3af] border border-[#374151] hover:text-[#f9fafb]'
                            }`}
                        >
                            <span className="material-symbols-outlined text-sm">{s.icon}</span>
                            {s.label}
                        </button>
                    ))}
                </div>
            </header>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-5 pb-24 pt-4 space-y-5">

                {/* Account */}
                {activeSection === 'account' && (
                    <>
                        <div className="bg-[#1F2937] rounded-2xl border border-[#374151] p-5">
                            <h4 className="font-bold text-sm text-[#f9fafb] mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-[#2563eb] text-lg">person</span>
                                Personal Information
                            </h4>
                            <div className="flex items-center gap-4 mb-5 pb-5 border-b border-[#374151]">
                                <div className="w-14 h-14 rounded-full bg-[#2563eb] flex items-center justify-center text-white font-bold text-lg">AJ</div>
                                <div>
                                    <p className="font-semibold text-[#f9fafb]">Alex Johnson</p>
                                    <p className="text-xs text-[#9ca3af]">Senior Frontend Developer</p>
                                </div>
                                <button className="ml-auto px-3 py-1.5 rounded-lg border border-[#374151] text-[#9ca3af] hover:text-[#f9fafb] text-xs transition-colors">
                                    Change Photo
                                </button>
                            </div>
                            <div className="space-y-4">
                                {[
                                    { label: 'Full Name', value: 'Alex Johnson', type: 'text' },
                                    { label: 'Email Address', value: 'alex.j@gmail.com', type: 'email' },
                                    { label: 'Phone Number', value: '+1 (555) 123-4567', type: 'tel' },
                                    { label: 'Location', value: 'San Francisco, CA', type: 'text' },
                                ].map((f, i) => (
                                    <div key={i}>
                                        <label className="block text-[10px] font-semibold text-[#9ca3af] uppercase tracking-wider mb-1">{f.label}</label>
                                        <input
                                            type={f.type}
                                            defaultValue={f.value}
                                            className="w-full bg-[#111827] border border-[#374151] rounded-xl px-4 py-2.5 text-[#f9fafb] text-sm outline-none focus:border-[#2563eb] transition-colors"
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="mt-5 flex justify-end">
                                <button className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-5 py-2 rounded-xl text-sm font-semibold transition-all">Save Changes</button>
                            </div>
                        </div>

                        {/* Danger Zone */}
                        <div className="bg-red-900/10 rounded-2xl border border-red-900/30 p-5">
                            <h4 className="font-bold text-red-400 mb-2 flex items-center gap-2 text-sm">
                                <span className="material-symbols-outlined text-lg">warning</span>
                                Danger Zone
                            </h4>
                            <p className="text-xs text-[#9ca3af] mb-3">These actions are permanent and cannot be undone.</p>
                            <div className="flex gap-3">
                                <button className="px-3 py-2 rounded-xl border border-red-900/40 text-red-400 hover:bg-red-900/20 text-xs font-medium transition-colors">Deactivate</button>
                                <button className="px-3 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-medium transition-colors">Delete Account</button>
                            </div>
                        </div>
                    </>
                )}

                {/* Notifications */}
                {activeSection === 'notifications' && (
                    <div className="bg-[#1F2937] rounded-2xl border border-[#374151] p-5">
                        <h4 className="font-bold text-sm text-[#f9fafb] mb-4 flex items-center gap-2">
                            <span className="material-symbols-outlined text-[#2563eb] text-lg">notifications</span>
                            Notification Preferences
                        </h4>
                        <div className="space-y-1">
                            {[
                                { key: 'newMatch', label: 'New Job Matches', desc: 'When new jobs match your profile' },
                                { key: 'applicationUpdate', label: 'Application Updates', desc: 'Status changes on your applications' },
                                { key: 'interviewReminder', label: 'Interview Reminders', desc: '24 hours and 1 hour before interviews' },
                                { key: 'weeklyDigest', label: 'Weekly Summary', desc: 'Weekly overview of your job search activity' },
                                { key: 'jobAlerts', label: 'Job Alerts', desc: 'Instant alerts for high-match jobs' },
                                { key: 'marketingEmails', label: 'Product Updates', desc: 'Tips, news, and feature announcements' },
                            ].map(n => (
                                <div key={n.key} className="flex items-center justify-between py-3.5 border-b border-[#374151] last:border-0">
                                    <div>
                                        <p className="font-medium text-[#f9fafb] text-sm">{n.label}</p>
                                        <p className="text-xs text-[#9ca3af] mt-0.5">{n.desc}</p>
                                    </div>
                                    <button
                                        onClick={() => toggle(n.key)}
                                        className={`relative w-11 h-6 rounded-full transition-colors shrink-0 ${notifications[n.key] ? 'bg-[#2563eb]' : 'bg-gray-700'}`}
                                    >
                                        <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${notifications[n.key] ? 'translate-x-5' : 'translate-x-0'}`}></span>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Privacy */}
                {activeSection === 'privacy' && (
                    <>
                        <div className="bg-[#1F2937] rounded-2xl border border-[#374151] p-5">
                            <h4 className="font-bold text-sm text-[#f9fafb] mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-[#2563eb] text-lg">visibility</span>
                                Profile Visibility
                            </h4>
                            <p className="text-xs text-[#9ca3af] mb-4">Control who can see your profile and contact you.</p>
                            <div className="space-y-2">
                                {[
                                    { value: 'visible', label: 'Visible to All Employers', desc: 'Any employer can view and contact you' },
                                    { value: 'matches', label: 'Matched Employers Only', desc: 'Only employers you\'ve matched with can see you' },
                                    { value: 'hidden', label: 'Hidden', desc: 'Your profile is not discoverable' },
                                ].map(opt => (
                                    <button
                                        key={opt.value}
                                        onClick={() => setProfileVisibility(opt.value)}
                                        className={`w-full flex items-start gap-3 p-3 rounded-xl border text-left transition-colors ${
                                            profileVisibility === opt.value
                                                ? 'bg-[#2563eb]/10 border-[#2563eb]/40'
                                                : 'bg-[#111827] border-[#374151] hover:border-[#374151]/80'
                                        }`}
                                    >
                                        <div className={`w-4 h-4 rounded-full border-2 mt-0.5 shrink-0 flex items-center justify-center ${
                                            profileVisibility === opt.value ? 'border-[#2563eb]' : 'border-[#374151]'
                                        }`}>
                                            {profileVisibility === opt.value && <div className="w-2 h-2 rounded-full bg-[#2563eb]"></div>}
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-[#f9fafb]">{opt.label}</p>
                                            <p className="text-xs text-[#9ca3af]">{opt.desc}</p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="bg-[#1F2937] rounded-2xl border border-[#374151] p-5">
                            <h4 className="font-bold text-sm text-[#f9fafb] mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-[#2563eb] text-lg">database</span>
                                Data Management
                            </h4>
                            <div className="space-y-3">
                                <button className="w-full flex items-center gap-3 p-3 bg-[#111827] rounded-xl border border-[#374151] hover:border-[#374151]/80 transition-colors text-left">
                                    <span className="material-symbols-outlined text-[#9ca3af]">download</span>
                                    <div>
                                        <p className="text-sm font-medium text-[#f9fafb]">Download My Data</p>
                                        <p className="text-xs text-[#9ca3af]">Export all your data as a ZIP file</p>
                                    </div>
                                </button>
                                <button className="w-full flex items-center gap-3 p-3 bg-[#111827] rounded-xl border border-[#374151] hover:border-[#374151]/80 transition-colors text-left">
                                    <span className="material-symbols-outlined text-[#9ca3af]">block</span>
                                    <div>
                                        <p className="text-sm font-medium text-[#f9fafb]">Blocked Companies</p>
                                        <p className="text-xs text-[#9ca3af]">Manage companies that can't see your profile</p>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </>
                )}

                {/* Job Alerts */}
                {activeSection === 'jobalerts' && (
                    <div className="bg-[#1F2937] rounded-2xl border border-[#374151] p-5">
                        <h4 className="font-bold text-sm text-[#f9fafb] mb-4 flex items-center gap-2">
                            <span className="material-symbols-outlined text-[#2563eb] text-lg">notifications_active</span>
                            Job Alert Preferences
                        </h4>
                        <p className="text-xs text-[#9ca3af] mb-5">Customize the types of jobs you want to be alerted about.</p>
                        <div className="space-y-5">
                            <div>
                                <label className="block text-[10px] font-semibold text-[#9ca3af] uppercase tracking-wider mb-2">Preferred Roles</label>
                                <div className="flex flex-wrap gap-2">
                                    {['Frontend Developer', 'Full Stack Engineer', 'React Developer', 'UX Engineer'].map(r => (
                                        <span key={r} className="px-3 py-1.5 rounded-lg bg-[#2563eb]/10 text-[#2563eb] border border-[#2563eb]/30 text-xs font-medium flex items-center gap-1">
                                            {r}
                                            <span className="material-symbols-outlined text-xs cursor-pointer hover:text-red-400">close</span>
                                        </span>
                                    ))}
                                    <button className="px-3 py-1.5 rounded-lg bg-gray-800 text-[#9ca3af] border border-[#374151] text-xs font-medium hover:text-[#f9fafb] flex items-center gap-1">
                                        <span className="material-symbols-outlined text-xs">add</span>Add
                                    </button>
                                </div>
                            </div>
                            <div>
                                <label className="block text-[10px] font-semibold text-[#9ca3af] uppercase tracking-wider mb-2">Preferred Locations</label>
                                <div className="flex flex-wrap gap-2">
                                    {['San Francisco, CA', 'Remote', 'New York, NY'].map(l => (
                                        <span key={l} className="px-3 py-1.5 rounded-lg bg-[#2563eb]/10 text-[#2563eb] border border-[#2563eb]/30 text-xs font-medium flex items-center gap-1">
                                            {l}
                                            <span className="material-symbols-outlined text-xs cursor-pointer hover:text-red-400">close</span>
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="block text-[10px] font-semibold text-[#9ca3af] uppercase tracking-wider mb-2">Salary Range</label>
                                <div className="flex items-center gap-3">
                                    <input type="text" defaultValue="$100,000" className="flex-1 bg-[#111827] border border-[#374151] rounded-xl px-3 py-2.5 text-[#f9fafb] text-sm outline-none focus:border-[#2563eb]" />
                                    <span className="text-[#9ca3af]">–</span>
                                    <input type="text" defaultValue="$180,000" className="flex-1 bg-[#111827] border border-[#374151] rounded-xl px-3 py-2.5 text-[#f9fafb] text-sm outline-none focus:border-[#2563eb]" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-[10px] font-semibold text-[#9ca3af] uppercase tracking-wider mb-2">Work Model</label>
                                <div className="flex gap-2">
                                    {['Remote', 'Hybrid', 'On-site'].map(m => (
                                        <button key={m} className={`px-4 py-2 rounded-xl text-xs font-medium border transition-colors ${
                                            m === 'Remote' || m === 'Hybrid'
                                                ? 'bg-[#2563eb]/10 text-[#2563eb] border-[#2563eb]/40'
                                                : 'bg-[#111827] text-[#9ca3af] border-[#374151] hover:border-[#2563eb]/40'
                                        }`}>
                                            {m}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="block text-[10px] font-semibold text-[#9ca3af] uppercase tracking-wider mb-2">Alert Frequency</label>
                                <div className="relative">
                                    <select className="w-full appearance-none bg-[#111827] border border-[#374151] rounded-xl px-4 py-2.5 text-[#f9fafb] text-sm outline-none focus:border-[#2563eb] cursor-pointer">
                                        <option>Instant (as they come)</option>
                                        <option>Daily digest</option>
                                        <option>Weekly digest</option>
                                    </select>
                                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[#9ca3af] pointer-events-none">expand_more</span>
                                </div>
                            </div>
                        </div>
                        <div className="mt-5 flex justify-end">
                            <button className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-5 py-2 rounded-xl text-sm font-semibold transition-all">Save Preferences</button>
                        </div>
                    </div>
                )}

                {/* Appearance */}
                {activeSection === 'appearance' && (
                    <div className="bg-[#1F2937] rounded-2xl border border-[#374151] p-5">
                        <h4 className="font-bold text-sm text-[#f9fafb] mb-4 flex items-center gap-2">
                            <span className="material-symbols-outlined text-[#2563eb] text-lg">palette</span>
                            Theme & Appearance
                        </h4>
                        <div className="space-y-4">
                            <div className="grid grid-cols-3 gap-3">
                                {[
                                    { value: 'dark', label: 'Dark', icon: 'dark_mode', active: true },
                                    { value: 'light', label: 'Light', icon: 'light_mode', active: false },
                                    { value: 'system', label: 'System', icon: 'brightness_auto', active: false },
                                ].map(t => (
                                    <button
                                        key={t.value}
                                        className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-colors ${
                                            t.active
                                                ? 'bg-[#2563eb]/10 border-[#2563eb]/40 text-[#2563eb]'
                                                : 'bg-[#111827] border-[#374151] text-[#9ca3af] hover:border-[#374151]/80'
                                        }`}
                                    >
                                        <span className="material-symbols-outlined text-2xl">{t.icon}</span>
                                        <span className="text-xs font-medium">{t.label}</span>
                                    </button>
                                ))}
                            </div>
                            <div>
                                <label className="block text-[10px] font-semibold text-[#9ca3af] uppercase tracking-wider mb-2">Accent Color</label>
                                <div className="flex gap-3">
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
            </div>

            <JobSeekerBottomNav />
        </div>
    );
};

export default JobSeekerSettings;
