import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import JobSeekerBottomNav from './JobSeekerBottomNav';
import { useAuth } from './contexts/AuthContext';
import { jobSeekerService } from './services/jobSeekerService';

const JobSeekerSettings = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState('account');
    const [saving, setSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);

    // Form state — initialized from authenticated user
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        bio: '',
        location: '',
    });

    const [notifications, setNotifications] = useState(() => {
        const saved = localStorage.getItem('notification_prefs');
        return saved ? JSON.parse(saved) : {
            newMatch: true,
            applicationUpdate: true,
            interviewReminder: true,
            weeklyDigest: false,
            jobAlerts: true,
            marketingEmails: false,
        };
    });

    const [profileVisibility, setProfileVisibility] = useState(() => {
        return localStorage.getItem('profile_visibility') || 'visible';
    });

    // Load user data into form
    useEffect(() => {
        if (user) {
            setFormData({
                first_name: user.first_name || '',
                last_name: user.last_name || '',
                email: user.email || '',
                bio: user.job_seeker_profile?.bio || '',
                location: user.job_seeker_profile?.location || '',
            });
        }
    }, [user]);

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = async () => {
        setSaving(true);
        setSaveSuccess(false);
        try {
            await jobSeekerService.updateProfile({
                first_name: formData.first_name,
                last_name: formData.last_name,
                email: formData.email,
                job_seeker_profile: {
                    bio: formData.bio,
                    location: formData.location,
                },
            });
            setSaveSuccess(true);
            setTimeout(() => setSaveSuccess(false), 3000);
        } catch (err) {
            console.error('Save error:', err);
            alert('Failed to save changes');
        } finally {
            setSaving(false);
        }
    };

    const toggle = (key) => {
        setNotifications(prev => {
            const updated = { ...prev, [key]: !prev[key] };
            localStorage.setItem('notification_prefs', JSON.stringify(updated));
            return updated;
        });
    };

    const handleVisibilityChange = (value) => {
        setProfileVisibility(value);
        localStorage.setItem('profile_visibility', value);
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const initials = `${(formData.first_name || 'J')[0]}${(formData.last_name || 'S')[0]}`.toUpperCase();

    const sections = [
        { id: 'account', label: 'Account', icon: 'manage_accounts' },
        { id: 'notifications', label: 'Notifications', icon: 'notifications' },
        { id: 'privacy', label: 'Privacy', icon: 'shield' },
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
                                <div className="w-14 h-14 rounded-full bg-[#2563eb] flex items-center justify-center text-white font-bold text-lg">{initials}</div>
                                <div>
                                    <p className="font-semibold text-[#f9fafb]">{formData.first_name} {formData.last_name}</p>
                                    <p className="text-xs text-[#9ca3af]">{formData.bio || 'No bio set'}</p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                {[
                                    { label: 'First Name', field: 'first_name', type: 'text' },
                                    { label: 'Last Name', field: 'last_name', type: 'text' },
                                    { label: 'Email Address', field: 'email', type: 'email' },
                                    { label: 'Bio / Title', field: 'bio', type: 'text' },
                                    { label: 'Location', field: 'location', type: 'text' },
                                ].map((f, i) => (
                                    <div key={i}>
                                        <label className="block text-[10px] font-semibold text-[#9ca3af] uppercase tracking-wider mb-1">{f.label}</label>
                                        <input
                                            type={f.type}
                                            value={formData[f.field]}
                                            onChange={e => handleChange(f.field, e.target.value)}
                                            className="w-full bg-[#111827] border border-[#374151] rounded-xl px-4 py-2.5 text-[#f9fafb] text-sm outline-none focus:border-[#2563eb] transition-colors"
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="mt-5 flex items-center justify-end gap-3">
                                {saveSuccess && (
                                    <span className="text-xs text-[#22c55e] flex items-center gap-1">
                                        <span className="material-symbols-outlined text-sm">check_circle</span>
                                        Saved!
                                    </span>
                                )}
                                <button
                                    onClick={handleSave}
                                    disabled={saving}
                                    className="bg-[#2563eb] hover:bg-[#1d4ed8] disabled:opacity-50 text-white px-5 py-2 rounded-xl text-sm font-semibold transition-all"
                                >
                                    {saving ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </div>

                        {/* Session */}
                        <div className="bg-[#1F2937] rounded-2xl border border-[#374151] p-5 mb-5">
                            <h4 className="font-bold text-[#f9fafb] mb-4 flex items-center gap-2 text-sm">
                                <span className="material-symbols-outlined text-lg">logout</span>
                                Session
                            </h4>
                            <button
                                onClick={handleLogout}
                                className="w-full py-3 rounded-xl border border-red-900/40 text-red-500 hover:bg-red-900/10 text-sm font-bold transition-colors flex items-center justify-center gap-2"
                            >
                                <span className="material-symbols-outlined">logout</span>
                                Log Out
                            </button>
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
                                    onClick={() => handleVisibilityChange(opt.value)}
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
                        </div>
                    </div>
                )}
            </div>

            <JobSeekerBottomNav />
        </div>
    );
};

export default JobSeekerSettings;
