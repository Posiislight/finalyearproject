import React, { useState } from 'react';
import EmployerSidebar from './EmployerSidebar';

const EmployerSettings = () => {
    const [activeSection, setActiveSection] = useState('account');
    const [notifications, setNotifications] = useState({
        newMatch: true,
        applicationReceived: true,
        interviewReminder: true,
        weeklyDigest: false,
        marketingEmails: false,
    });

    const toggle = (key) => setNotifications(prev => ({ ...prev, [key]: !prev[key] }));

    const sections = [
        { id: 'account', label: 'Account', icon: 'manage_accounts' },
        { id: 'notifications', label: 'Notifications', icon: 'notifications' },
        { id: 'billing', label: 'Billing & Plan', icon: 'credit_card' },
        { id: 'security', label: 'Security', icon: 'security' },
        { id: 'integrations', label: 'Integrations', icon: 'extension' },
    ];

    return (
        <div className="bg-[#111827] text-[#f9fafb] font-['DM_Sans',sans-serif] antialiased h-screen flex overflow-hidden">
            <EmployerSidebar />

            <main className="flex-1 flex flex-col h-screen overflow-hidden">
                {/* Header */}
                <header className="flex items-center justify-between px-8 py-4 bg-[#1F2937] border-b border-[#374151] shrink-0">
                    <div>
                        <h2 className="text-lg font-bold text-[#f9fafb]">Settings</h2>
                        <p className="text-sm text-[#9ca3af]">Manage your account preferences and configurations.</p>
                    </div>
                </header>

                <div className="flex-1 flex overflow-hidden">
                    {/* Settings Sidebar Nav */}
                    <nav className="w-56 bg-[#1F2937] border-r border-[#374151] p-4 shrink-0 overflow-y-auto">
                        <div className="space-y-1">
                            {sections.map(s => (
                                <button
                                    key={s.id}
                                    onClick={() => setActiveSection(s.id)}
                                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors text-left ${
                                        activeSection === s.id
                                            ? 'bg-[#2563eb]/10 text-[#2563eb]'
                                            : 'text-[#9ca3af] hover:bg-gray-800 hover:text-[#f9fafb]'
                                    }`}
                                >
                                    <span className="material-symbols-outlined text-xl">{s.icon}</span>
                                    {s.label}
                                </button>
                            ))}
                        </div>
                    </nav>

                    {/* Settings Content */}
                    <div className="flex-1 overflow-y-auto p-6 lg:p-10">
                        <div className="max-w-2xl mx-auto space-y-6">

                            {/* Account Settings */}
                            {activeSection === 'account' && (
                                <>
                                    <div className="bg-[#1F2937] rounded-2xl border border-[#374151] p-6">
                                        <h4 className="font-bold text-[#f9fafb] mb-5 flex items-center gap-2">
                                            <span className="material-symbols-outlined text-[#2563eb]">person</span>
                                            Personal Information
                                        </h4>
                                        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-[#374151]">
                                            <div className="w-16 h-16 rounded-full bg-[#2563eb] flex items-center justify-center text-white font-bold text-xl">JS</div>
                                            <div>
                                                <p className="font-semibold text-[#f9fafb]">Jane Smith</p>
                                                <p className="text-sm text-[#9ca3af]">Recruiter Admin</p>
                                            </div>
                                            <button className="ml-auto px-3 py-2 rounded-lg border border-[#374151] text-[#9ca3af] hover:text-[#f9fafb] hover:bg-gray-800 text-sm transition-colors">
                                                Change Photo
                                            </button>
                                        </div>
                                        <div className="space-y-4">
                                            {[
                                                { label: 'Full Name', value: 'Jane Smith', type: 'text' },
                                                { label: 'Job Title', value: 'Recruiter Admin', type: 'text' },
                                                { label: 'Email Address', value: 'jane@techflow.io', type: 'email' },
                                                { label: 'Phone Number', value: '+1 (555) 000-0000', type: 'tel' },
                                            ].map((f, i) => (
                                                <div key={i}>
                                                    <label className="block text-xs font-semibold text-[#9ca3af] uppercase tracking-wider mb-1.5">{f.label}</label>
                                                    <input
                                                        type={f.type}
                                                        defaultValue={f.value}
                                                        className="w-full bg-[#111827] border border-[#374151] rounded-xl px-4 py-3 text-[#f9fafb] text-sm outline-none focus:border-[#2563eb] transition-colors"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                        <div className="mt-6 flex justify-end">
                                            <button className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all">
                                                Save Changes
                                            </button>
                                        </div>
                                    </div>

                                    <div className="bg-[#1F2937] rounded-2xl border border-[#374151] p-6">
                                        <h4 className="font-bold text-[#f9fafb] mb-5 flex items-center gap-2">
                                            <span className="material-symbols-outlined text-[#2563eb]">language</span>
                                            Preferences
                                        </h4>
                                        <div className="space-y-4">
                                            {[
                                                { label: 'Language', value: 'English (US)' },
                                                { label: 'Timezone', value: 'Pacific Time (PT)' },
                                                { label: 'Date Format', value: 'MM/DD/YYYY' },
                                            ].map((f, i) => (
                                                <div key={i}>
                                                    <label className="block text-xs font-semibold text-[#9ca3af] uppercase tracking-wider mb-1.5">{f.label}</label>
                                                    <div className="relative">
                                                        <select className="w-full appearance-none bg-[#111827] border border-[#374151] rounded-xl px-4 py-3 text-[#f9fafb] text-sm outline-none focus:border-[#2563eb] transition-colors cursor-pointer">
                                                            <option>{f.value}</option>
                                                        </select>
                                                        <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[#9ca3af] pointer-events-none">expand_more</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="bg-red-900/10 rounded-2xl border border-red-900/30 p-6">
                                        <h4 className="font-bold text-red-400 mb-2 flex items-center gap-2">
                                            <span className="material-symbols-outlined">warning</span>
                                            Danger Zone
                                        </h4>
                                        <p className="text-sm text-[#9ca3af] mb-4">These actions are permanent and cannot be undone.</p>
                                        <div className="flex gap-3">
                                            <button className="px-4 py-2 rounded-xl border border-red-900/40 text-red-400 hover:bg-red-900/20 text-sm font-medium transition-colors">
                                                Deactivate Account
                                            </button>
                                            <button className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-medium transition-colors">
                                                Delete Account
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}

                            {/* Notifications */}
                            {activeSection === 'notifications' && (
                                <div className="bg-[#1F2937] rounded-2xl border border-[#374151] p-6">
                                    <h4 className="font-bold text-[#f9fafb] mb-5 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-[#2563eb]">notifications</span>
                                        Notification Preferences
                                    </h4>
                                    <div className="space-y-4">
                                        {[
                                            { key: 'newMatch', label: 'New Candidate Match', desc: 'When a new candidate matches one of your job posts' },
                                            { key: 'applicationReceived', label: 'Application Received', desc: 'When a candidate applies to a job' },
                                            { key: 'interviewReminder', label: 'Interview Reminders', desc: '24 hours before a scheduled interview' },
                                            { key: 'weeklyDigest', label: 'Weekly Digest', desc: 'A weekly summary of your hiring activity' },
                                            { key: 'marketingEmails', label: 'Product Updates', desc: 'News, tips, and feature announcements' },
                                        ].map(n => (
                                            <div key={n.key} className="flex items-center justify-between py-4 border-b border-[#374151] last:border-0">
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

                            {/* Billing */}
                            {activeSection === 'billing' && (
                                <>
                                    <div className="bg-[#1F2937] rounded-2xl border border-[#374151] p-6">
                                        <h4 className="font-bold text-[#f9fafb] mb-5 flex items-center gap-2">
                                            <span className="material-symbols-outlined text-[#2563eb]">workspace_premium</span>
                                            Current Plan
                                        </h4>
                                        <div className="bg-gradient-to-r from-[#2563eb]/20 to-purple-600/20 rounded-xl border border-[#2563eb]/30 p-5 mb-5">
                                            <div className="flex items-center justify-between mb-3">
                                                <div>
                                                    <p className="font-bold text-[#f9fafb] text-lg">Professional Plan</p>
                                                    <p className="text-sm text-[#9ca3af]">$79 / month • Billed monthly</p>
                                                </div>
                                                <span className="px-3 py-1 rounded-full bg-[#2563eb] text-white text-xs font-bold uppercase">Active</span>
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {['10 Active Jobs', 'Unlimited Candidates', 'AI Insights', 'Priority Support'].map(f => (
                                                    <span key={f} className="flex items-center gap-1 text-xs text-[#9ca3af]">
                                                        <span className="material-symbols-outlined text-[#22c55e] text-sm">check</span>{f}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="flex gap-3">
                                            <button className="flex-1 py-2.5 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-sm font-semibold transition-all">
                                                Upgrade to Enterprise
                                            </button>
                                            <button className="px-4 py-2.5 rounded-xl border border-[#374151] text-[#9ca3af] hover:text-[#f9fafb] hover:bg-gray-800 text-sm transition-colors">
                                                Cancel Plan
                                            </button>
                                        </div>
                                    </div>

                                    <div className="bg-[#1F2937] rounded-2xl border border-[#374151] p-6">
                                        <h4 className="font-bold text-[#f9fafb] mb-5 flex items-center gap-2">
                                            <span className="material-symbols-outlined text-[#2563eb]">credit_card</span>
                                            Payment Method
                                        </h4>
                                        <div className="flex items-center gap-4 p-4 bg-[#111827] rounded-xl border border-[#374151] mb-4">
                                            <div className="w-10 h-7 rounded bg-blue-600 flex items-center justify-center">
                                                <span className="text-white text-xs font-bold">VISA</span>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-[#f9fafb]">•••• •••• •••• 4242</p>
                                                <p className="text-xs text-[#9ca3af]">Expires 12/2026</p>
                                            </div>
                                            <button className="ml-auto text-sm text-[#2563eb] hover:underline">Update</button>
                                        </div>
                                        <button className="flex items-center gap-2 text-sm text-[#9ca3af] hover:text-[#f9fafb] transition-colors">
                                            <span className="material-symbols-outlined text-sm">add</span>
                                            Add Payment Method
                                        </button>
                                    </div>
                                </>
                            )}

                            {/* Security */}
                            {activeSection === 'security' && (
                                <>
                                    <div className="bg-[#1F2937] rounded-2xl border border-[#374151] p-6">
                                        <h4 className="font-bold text-[#f9fafb] mb-5 flex items-center gap-2">
                                            <span className="material-symbols-outlined text-[#2563eb]">lock</span>
                                            Change Password
                                        </h4>
                                        <div className="space-y-4">
                                            {['Current Password', 'New Password', 'Confirm New Password'].map((label, i) => (
                                                <div key={i}>
                                                    <label className="block text-xs font-semibold text-[#9ca3af] uppercase tracking-wider mb-1.5">{label}</label>
                                                    <input type="password" placeholder="••••••••" className="w-full bg-[#111827] border border-[#374151] rounded-xl px-4 py-3 text-[#f9fafb] text-sm outline-none focus:border-[#2563eb] transition-colors" />
                                                </div>
                                            ))}
                                        </div>
                                        <div className="mt-6 flex justify-end">
                                            <button className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all">
                                                Update Password
                                            </button>
                                        </div>
                                    </div>

                                    <div className="bg-[#1F2937] rounded-2xl border border-[#374151] p-6">
                                        <div className="flex items-center justify-between mb-2">
                                            <h4 className="font-bold text-[#f9fafb] flex items-center gap-2">
                                                <span className="material-symbols-outlined text-[#2563eb]">verified_user</span>
                                                Two-Factor Authentication
                                            </h4>
                                            <span className="px-2 py-1 rounded-full bg-red-900/20 text-red-400 border border-red-900/30 text-xs font-bold">Disabled</span>
                                        </div>
                                        <p className="text-sm text-[#9ca3af] mb-4">Add an extra layer of security to your account by requiring a verification code on login.</p>
                                        <button className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all">
                                            Enable 2FA
                                        </button>
                                    </div>

                                    <div className="bg-[#1F2937] rounded-2xl border border-[#374151] p-6">
                                        <h4 className="font-bold text-[#f9fafb] mb-4 flex items-center gap-2">
                                            <span className="material-symbols-outlined text-[#2563eb]">devices</span>
                                            Active Sessions
                                        </h4>
                                        <div className="space-y-3">
                                            {[
                                                { device: 'MacBook Pro', location: 'San Francisco, CA', time: 'Current session', current: true },
                                                { device: 'iPhone 15', location: 'San Francisco, CA', time: '2 hours ago', current: false },
                                            ].map((s, i) => (
                                                <div key={i} className="flex items-center gap-4 p-4 bg-[#111827] rounded-xl border border-[#374151]">
                                                    <span className="material-symbols-outlined text-[#9ca3af]">{i === 0 ? 'laptop_mac' : 'smartphone'}</span>
                                                    <div className="flex-1">
                                                        <p className="text-sm font-medium text-[#f9fafb]">{s.device}</p>
                                                        <p className="text-xs text-[#9ca3af]">{s.location} • {s.time}</p>
                                                    </div>
                                                    {s.current
                                                        ? <span className="text-xs text-[#22c55e] font-medium">This device</span>
                                                        : <button className="text-xs text-red-400 hover:underline">Revoke</button>
                                                    }
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            )}

                            {/* Integrations */}
                            {activeSection === 'integrations' && (
                                <div className="bg-[#1F2937] rounded-2xl border border-[#374151] p-6">
                                    <h4 className="font-bold text-[#f9fafb] mb-5 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-[#2563eb]">extension</span>
                                        Connected Apps
                                    </h4>
                                    <div className="space-y-4">
                                        {[
                                            { name: 'Slack', desc: 'Get notified in Slack when you receive new matches.', connected: true, icon: '💬' },
                                            { name: 'Google Calendar', desc: 'Sync interview schedules to your calendar.', connected: true, icon: '📅' },
                                            { name: 'LinkedIn', desc: 'Import candidate profiles from LinkedIn.', connected: false, icon: '🔗' },
                                            { name: 'Greenhouse ATS', desc: 'Sync candidates with your ATS.', connected: false, icon: '🌿' },
                                            { name: 'Zapier', desc: 'Automate workflows with 5000+ apps.', connected: false, icon: '⚡' },
                                        ].map((app, i) => (
                                            <div key={i} className="flex items-center gap-4 p-4 bg-[#111827] rounded-xl border border-[#374151]">
                                                <span className="text-2xl">{app.icon}</span>
                                                <div className="flex-1">
                                                    <p className="font-semibold text-[#f9fafb] text-sm">{app.name}</p>
                                                    <p className="text-xs text-[#9ca3af]">{app.desc}</p>
                                                </div>
                                                <button className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                                                    app.connected
                                                        ? 'bg-red-900/20 text-red-400 border border-red-900/30 hover:bg-red-900/40'
                                                        : 'bg-[#2563eb] text-white hover:bg-[#1d4ed8]'
                                                }`}>
                                                    {app.connected ? 'Disconnect' : 'Connect'}
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default EmployerSettings;
