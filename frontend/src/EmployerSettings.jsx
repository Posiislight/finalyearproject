import React, { useState, useEffect } from 'react';
import EmployerSidebar from './EmployerSidebar';
import { useAuth } from './contexts/AuthContext';
import { authService } from './services/authService';

const EmployerSettings = () => {
    const { user } = useAuth();
    const [activeSection, setActiveSection] = useState('account');
    
    // Notifications State (persisted to LocalStorage)
    const [notifications, setNotifications] = useState(() => {
        const saved = localStorage.getItem('employer_notifications');
        return saved ? JSON.parse(saved) : {
            newMatch: true,
            applicationReceived: true,
            interviewReminder: true,
            weeklyDigest: false,
            marketingEmails: false,
        };
    });

    const toggle = (key) => {
        setNotifications(prev => {
            const next = { ...prev, [key]: !prev[key] };
            localStorage.setItem('employer_notifications', JSON.stringify(next));
            return next;
        });
    };

    // Preferences State (persisted to LocalStorage)
    const [preferences, setPreferences] = useState(() => {
        const saved = localStorage.getItem('employer_preferences');
        return saved ? JSON.parse(saved) : {
            Language: 'English (US)',
            Timezone: 'Pacific Time (PT)',
            'Date Format': 'MM/DD/YYYY'
        };
    });

    const handlePreferenceChange = (label, value) => {
        setPreferences(prev => {
            const next = { ...prev, [label]: value };
            localStorage.setItem('employer_preferences', JSON.stringify(next));
            return next;
        });
    };

    // Account State
    const [accountData, setAccountData] = useState({
        first_name: user?.first_name || '',
        last_name: user?.last_name || '',
        email: user?.email || '',
    });
    const [isSavingAccount, setIsSavingAccount] = useState(false);
    const [accountMessage, setAccountMessage] = useState('');

    // Password State
    const [passwordData, setPasswordData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [isSavingPassword, setIsSavingPassword] = useState(false);
    const [passwordMessage, setPasswordMessage] = useState({ type: '', text: '' });

    // Handlers
    const handleAccountSave = async () => {
        setIsSavingAccount(true);
        setAccountMessage('');
        try {
            await authService.updateProfile(accountData);
            setAccountMessage('Profile updated successfully.');
        } catch (err) {
            setAccountMessage('Failed to update profile.');
        } finally {
            setIsSavingAccount(false);
        }
    };

    const handlePasswordSave = async () => {
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setPasswordMessage({ type: 'error', text: 'New passwords do not match.' });
            return;
        }
        setIsSavingPassword(true);
        setPasswordMessage({ type: '', text: '' });
        try {
            await authService.changePassword(passwordData.oldPassword, passwordData.newPassword);
            setPasswordMessage({ type: 'success', text: 'Password updated successfully.' });
            setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
        } catch (err) {
            setPasswordMessage({ type: 'error', text: 'Failed to update password. Check old password.' });
        } finally {
            setIsSavingPassword(false);
        }
    };

    const sections = [
        { id: 'account', label: 'Account', icon: 'manage_accounts' },
        { id: 'notifications', label: 'Notifications', icon: 'notifications' },
        { id: 'security', label: 'Security', icon: 'security' },
    ];

    return (
        <div className="bg-black text-[#f9fafb] font-['DM_Sans',sans-serif] antialiased h-screen flex overflow-hidden">
            <EmployerSidebar />

            <main className="flex-1 flex flex-col h-screen overflow-hidden">
                {/* Header */}
                <header className="flex items-center justify-between px-8 py-4 bg-white/5 border-b border-white/10 shrink-0">
                    <div>
                        <h2 className="text-lg font-bold text-[#f9fafb]">Settings</h2>
                        <p className="text-sm text-[#9ca3af]">Manage your account preferences and configurations.</p>
                    </div>
                </header>

                <div className="flex-1 flex overflow-hidden">
                    {/* Settings Sidebar Nav */}
                    <nav className="w-56 bg-white/5 border-r border-white/10 p-4 shrink-0 overflow-y-auto">
                        <div className="space-y-1">
                            {sections.map(s => (
                                <button
                                    key={s.id}
                                    onClick={() => setActiveSection(s.id)}
                                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors text-left ${
                                        activeSection === s.id
                                            ? 'bg-[#2563eb]/10 text-[#2563eb]'
                                            : 'text-[#9ca3af] hover:bg-white/5 hover:text-[#f9fafb]'
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
                                    <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
                                        <h4 className="font-bold text-[#f9fafb] mb-5 flex items-center gap-2">
                                            <span className="material-symbols-outlined text-[#2563eb]">person</span>
                                            Personal Information
                                        </h4>
                                        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/10">
                                            <div className="w-16 h-16 rounded-full bg-[#2563eb] flex items-center justify-center text-white font-bold text-xl">
                                                {(user?.first_name?.[0] || '') + (user?.last_name?.[0] || '') || 'US'}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-[#f9fafb]">{user?.first_name} {user?.last_name}</p>
                                                <p className="text-sm text-[#9ca3af]">{user?.email}</p>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-xs font-semibold text-[#9ca3af] uppercase tracking-wider mb-1.5">First Name</label>
                                                <input
                                                    type="text"
                                                    value={accountData.first_name}
                                                    onChange={e => setAccountData({...accountData, first_name: e.target.value})}
                                                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-[#f9fafb] text-sm outline-none focus:border-[#2563eb] transition-colors"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-semibold text-[#9ca3af] uppercase tracking-wider mb-1.5">Last Name</label>
                                                <input
                                                    type="text"
                                                    value={accountData.last_name}
                                                    onChange={e => setAccountData({...accountData, last_name: e.target.value})}
                                                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-[#f9fafb] text-sm outline-none focus:border-[#2563eb] transition-colors"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-semibold text-[#9ca3af] uppercase tracking-wider mb-1.5">Email Address</label>
                                                <input
                                                    type="email"
                                                    value={accountData.email}
                                                    onChange={e => setAccountData({...accountData, email: e.target.value})}
                                                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-[#f9fafb] text-sm outline-none focus:border-[#2563eb] transition-colors"
                                                />
                                            </div>
                                        </div>
                                        {accountMessage && (
                                            <div className="mt-4 text-sm text-[#22c55e]">{accountMessage}</div>
                                        )}
                                        <div className="mt-6 flex justify-end">
                                            <button 
                                                onClick={handleAccountSave}
                                                disabled={isSavingAccount}
                                                className="bg-[#2563eb] hover:bg-[#1d4ed8] disabled:opacity-50 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all">
                                                {isSavingAccount ? 'Saving...' : 'Save Changes'}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
                                        <h4 className="font-bold text-[#f9fafb] mb-5 flex items-center gap-2">
                                            <span className="material-symbols-outlined text-[#2563eb]">language</span>
                                            Preferences
                                        </h4>
                                        <div className="space-y-4">
                                            {[
                                                { label: 'Language', options: ['English (US)', 'Spanish (ES)', 'French (FR)', 'German (DE)'] },
                                                { label: 'Timezone', options: ['Pacific Time (PT)', 'Eastern Time (ET)', 'UTC', 'Central European Time (CET)'] },
                                                { label: 'Date Format', options: ['MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD'] },
                                            ].map((f, i) => (
                                                <div key={i}>
                                                    <label className="block text-xs font-semibold text-[#9ca3af] uppercase tracking-wider mb-1.5">{f.label}</label>
                                                    <div className="relative">
                                                        <select
                                                            value={preferences[f.label]}
                                                            onChange={(e) => handlePreferenceChange(f.label, e.target.value)}
                                                            className="w-full appearance-none bg-black border border-white/10 rounded-xl px-4 py-3 text-[#f9fafb] text-sm outline-none focus:border-[#2563eb] transition-colors cursor-pointer"
                                                        >
                                                            {f.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                                        </select>
                                                        <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[#9ca3af] pointer-events-none">expand_more</span>
                                                    </div>
                                                </div>
                                            ))}
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
                                            <div key={n.key} className="flex items-center justify-between py-4 border-b border-white/10 last:border-0">
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

                            {/* Security */}
                            {activeSection === 'security' && (
                                <>
                                    <div className="bg-[#1F2937] rounded-2xl border border-[#374151] p-6">
                                        <h4 className="font-bold text-[#f9fafb] mb-5 flex items-center gap-2">
                                            <span className="material-symbols-outlined text-[#2563eb]">lock</span>
                                            Change Password
                                        </h4>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-xs font-semibold text-[#9ca3af] uppercase tracking-wider mb-1.5">Current Password</label>
                                                <input 
                                                    type="password" 
                                                    placeholder="••••••••" 
                                                    value={passwordData.oldPassword}
                                                    onChange={e => setPasswordData({...passwordData, oldPassword: e.target.value})}
                                                    className="w-full bg-[#111827] border border-[#374151] rounded-xl px-4 py-3 text-[#f9fafb] text-sm outline-none focus:border-[#2563eb] transition-colors" 
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-semibold text-[#9ca3af] uppercase tracking-wider mb-1.5">New Password</label>
                                                <input 
                                                    type="password" 
                                                    placeholder="••••••••" 
                                                    value={passwordData.newPassword}
                                                    onChange={e => setPasswordData({...passwordData, newPassword: e.target.value})}
                                                    className="w-full bg-[#111827] border border-[#374151] rounded-xl px-4 py-3 text-[#f9fafb] text-sm outline-none focus:border-[#2563eb] transition-colors" 
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-semibold text-[#9ca3af] uppercase tracking-wider mb-1.5">Confirm New Password</label>
                                                <input 
                                                    type="password" 
                                                    placeholder="••••••••" 
                                                    value={passwordData.confirmPassword}
                                                    onChange={e => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                                                    className="w-full bg-[#111827] border border-[#374151] rounded-xl px-4 py-3 text-[#f9fafb] text-sm outline-none focus:border-[#2563eb] transition-colors" 
                                                />
                                            </div>
                                        </div>
                                        {passwordMessage.text && (
                                            <div className={`mt-4 text-sm ${passwordMessage.type === 'error' ? 'text-red-400' : 'text-[#22c55e]'}`}>
                                                {passwordMessage.text}
                                            </div>
                                        )}
                                        <div className="mt-6 flex justify-end">
                                            <button 
                                                onClick={handlePasswordSave}
                                                disabled={isSavingPassword || !passwordData.oldPassword || !passwordData.newPassword || !passwordData.confirmPassword}
                                                className="bg-[#2563eb] hover:bg-[#1d4ed8] disabled:opacity-50 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all">
                                                {isSavingPassword ? 'Updating...' : 'Update Password'}
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}

                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default EmployerSettings;
