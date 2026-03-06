import React, { useState, useEffect, useRef } from 'react';
import EmployerSidebar from './EmployerSidebar';
import { employerService } from './services/employerService';
import BlockLoader from './components/ui/block-loader';

const EmployerCompanyProfile = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [newCultureValue, setNewCultureValue] = useState('');
    const [newBenefitValue, setNewBenefitValue] = useState('');
    const [profile, setProfile] = useState(null);
    const [editedProfile, setEditedProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    
    // Refs for hidden file inputs
    const logoInputRef = useRef(null);
    const coverInputRef = useRef(null);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            setLoading(true);
            const data = await employerService.getCompanyProfile();
            setProfile(data);
            // Ensure culture_values is an array for the UI if it's stored as a comma-separated string
            let parsedCulture = [];
            if (data.culture_values) {
                // If the backend returns a string, split it. If it returns an array, use it directly.
                parsedCulture = typeof data.culture_values === 'string' 
                    ? data.culture_values.split(',').map(v => v.trim()).filter(v => v)
                    : data.culture_values;
            }
            // Parse benefits the same way
            let parsedBenefits = [];
            if (data.benefits) {
                parsedBenefits = typeof data.benefits === 'string'
                    ? data.benefits.split(',').map(v => v.trim()).filter(v => v)
                    : data.benefits;
            }
            setEditedProfile({ ...data, culture_values_array: parsedCulture, benefits_array: parsedBenefits });
        } catch (error) {
            console.error("Failed to fetch company profile:", error);
            // Fallback for demo if the company profile doesn't exist yet, although the view uses get_or_create
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        try {
            setIsSaving(true);
            // Convert culture array back to string before saving if needed
            const dataToSave = { ...editedProfile };
            if (Array.isArray(dataToSave.culture_values_array)) {
                dataToSave.culture_values = dataToSave.culture_values_array.join(', ');
            }
            // Convert benefits array back to string before saving
            if (Array.isArray(dataToSave.benefits_array)) {
                dataToSave.benefits = dataToSave.benefits_array.join(', ');
            }
            // Remove the temporary array properties
            delete dataToSave.culture_values_array;
            delete dataToSave.benefits_array;
            
            // Clean up image URLs if they haven't changed (backend expects File objects for updates, not string URLs)
            // If logo_url or cover_photo is a string (a URL from the backend), we shouldn't send it back in a PATCH
            // unless we are sending a new File object via FormData.
            if (typeof dataToSave.logo_url === 'string') delete dataToSave.logo_url;
            if (typeof dataToSave.cover_photo === 'string') delete dataToSave.cover_photo;

            const updatedData = await employerService.updateCompanyProfile(dataToSave);
            setProfile(updatedData);
            // Re-parse arrays for editedProfile
            const cultureArr = dataToSave.culture_values
                ? dataToSave.culture_values.split(',').map(v => v.trim()).filter(v => v)
                : [];
            const benefitsArr = dataToSave.benefits
                ? dataToSave.benefits.split(',').map(v => v.trim()).filter(v => v)
                : [];
            setEditedProfile({ ...updatedData, culture_values_array: cultureArr, benefits_array: benefitsArr });
            alert("Profile saved successfully.");
        } catch (error) {
            console.error("Failed to save profile:", error);
            alert("Failed to save profile. Please try again.");
        } finally {
            setIsSaving(false);
        }
    };

    const handleImageUpload = async (event, fieldName) => {
        const file = event.target.files[0];
        if (!file) return;

        try {
            setIsSaving(true);
            const formData = new FormData();
            formData.append(fieldName, file);
            
            const updatedData = await employerService.updateCompanyProfile(formData);
            setProfile(updatedData);
            
            // Re-parse culture values for the edited profile
            let parsedCulture = [];
            if (updatedData.culture_values) {
                parsedCulture = typeof updatedData.culture_values === 'string' 
                    ? updatedData.culture_values.split(',').map(v => v.trim()).filter(v => v)
                    : updatedData.culture_values;
            }
            
            setEditedProfile({ ...updatedData, culture_values_array: parsedCulture, benefits_array: editedProfile?.benefits_array || [] });
            
        } catch (error) {
            console.error(`Failed to upload ${fieldName}:`, error);
            alert(`Failed to upload image. Please try again.`);
        } finally {
            setIsSaving(false);
            // Reset input so the same file could be selected again if needed
            if (fieldName === 'logo_url' && logoInputRef.current) logoInputRef.current.value = '';
            if (fieldName === 'cover_photo' && coverInputRef.current) coverInputRef.current.value = '';
        }
    };

    const handleInputChange = (e, field) => {
        setEditedProfile(prev => ({
            ...prev,
            [field]: e.target.value
        }));
    };

    const handleAddTeamMember = async () => {
        const name = prompt("Enter team member's name:");
        if (!name) return;
        const role = prompt("Enter team member's role (e.g., Hiring Manager):");
        if (!role) return;
        const email = prompt("Enter team member's email:");
        if (!email) return;

        try {
            setIsSaving(true);
            const colors = ['#2563eb', '#7c3aed', '#059669', '#dc2626', '#d97706', '#0891b2'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            
            const newMember = await employerService.addTeamMember({
                name,
                role,
                email,
                avatar_color: randomColor
            });

            // Refresh profile to get updated team members
            setProfile(prev => ({
                ...prev,
                team_members: [...(prev.team_members || []), newMember]
            }));
            setEditedProfile(prev => ({
                ...prev,
                team_members: [...(prev.team_members || []), newMember]
            }));
            
        } catch (error) {
            console.error("Failed to add team member:", error);
            alert("Failed to add team member.");
        } finally {
            setIsSaving(false);
        }
    };

    const handleDeleteTeamMember = async (memberId) => {
        if (!window.confirm("Are you sure you want to remove this team member?")) return;

        try {
            setIsSaving(true);
            await employerService.deleteTeamMember(memberId);
            
            setProfile(prev => ({
                ...prev,
                team_members: prev.team_members.filter(m => m.id !== memberId)
            }));
            setEditedProfile(prev => ({
                ...prev,
                team_members: prev.team_members.filter(m => m.id !== memberId)
            }));
        } catch (error) {
            console.error("Failed to remove team member:", error);
            alert("Failed to remove team member.");
        } finally {
            setIsSaving(false);
        }
    };

    const addCultureValue = () => {
        const val = prompt("Enter a new core value:");
        if (val && val.trim()) {
            setEditedProfile(prev => ({
                ...prev,
                culture_values_array: [...(prev.culture_values_array || []), val.trim()]
            }));
        }
    };

    const removeCultureValue = (indexToRemove) => {
        setEditedProfile(prev => ({
            ...prev,
            culture_values_array: prev.culture_values_array.filter((_, idx) => idx !== indexToRemove)
        }));
    };

    const addBenefitValue = () => {
        if (!newBenefitValue.trim()) return;
        setEditedProfile(prev => ({
            ...prev,
            benefits_array: [...(prev.benefits_array || []), newBenefitValue.trim()]
        }));
        setNewBenefitValue('');
    };

    const removeBenefitValue = (benefitToRemove) => {
        setEditedProfile(prev => ({
            ...prev,
            benefits_array: prev.benefits_array.filter(b => b !== benefitToRemove)
        }));
    };

    if (loading) {
        return (
            <div className="bg-black text-white flex items-center justify-center h-screen">
                <div className="flex flex-col items-center gap-4">
                    <BlockLoader size={30} gap={4} />
                    <p>Loading Profile...</p>
                </div>
            </div>
        );
    }

    if (!editedProfile) return null;

    const brandColor = editedProfile.brand_color || '#2563eb';
    const companyName = editedProfile.name || 'Company Name';
    const companyAbbr = companyName.substring(0, 2).toUpperCase();
    const isVerified = profile?.is_verified || false;

    return (
        <div className="bg-black text-[#f9fafb] font-['DM_Sans',sans-serif] antialiased h-screen flex overflow-hidden">
            <EmployerSidebar />

            <main className="flex-1 flex flex-col h-screen overflow-hidden">
                {/* Header */}
                <header className="flex items-center justify-between px-8 py-4 bg-white/5 border-b border-white/10 shrink-0">
                    <div>
                        <h2 className="text-lg font-bold text-[#f9fafb]">Company Profile</h2>
                        <p className="text-sm text-[#9ca3af]">Manage how your company appears to candidates.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button onClick={() => alert("Profile preview mode coming soon")} className="px-4 py-2 rounded-lg border border-white/10 text-[#9ca3af] hover:text-[#f9fafb] hover:bg-white/5 text-sm font-medium transition-colors">
                            Preview Profile
                        </button>
                        <button 
                            onClick={handleSave}
                            disabled={isSaving}
                            className={`px-4 py-2 rounded-lg text-sm font-semibold shadow-lg transition-all flex items-center gap-2 text-white ${isSaving ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#2563eb] hover:bg-[#1d4ed8] shadow-[#2563eb]/30'}`}
                            style={{ backgroundColor: isSaving ? '' : brandColor }}
                        >
                            {isSaving ? <BlockLoader size={12} gap={2} blockColor="bg-white" borderColor="border-transparent" /> : <span className="material-symbols-outlined text-lg">save</span>}
                            {isSaving ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-6 lg:p-10">
                    <div className="max-w-5xl mx-auto space-y-8">

                        {/* Cover Photo & Logo */}
                        <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
                            {/* Cover */}
                            <div 
                                className="relative h-48 flex items-center justify-center group cursor-pointer bg-cover bg-center"
                                style={profile?.cover_photo ? { backgroundImage: `url(${profile.cover_photo})` } : { background: `linear-gradient(to right, ${brandColor}40, #9333ea40)` }}
                                onClick={() => coverInputRef.current?.click()}
                            >
                                <input 
                                    type="file" 
                                    ref={coverInputRef} 
                                    className="hidden" 
                                    accept="image/*" 
                                    onChange={(e) => handleImageUpload(e, 'cover_photo')} 
                                />
                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                                    <div className="flex items-center gap-2 bg-black/60 px-4 py-2 rounded-lg text-white text-sm font-medium">
                                        <span className="material-symbols-outlined text-sm">photo_camera</span>
                                        Change Cover Photo
                                    </div>
                                </div>
                                {!profile?.cover_photo && <span className="material-symbols-outlined text-white/20 text-8xl">business</span>}
                            </div>
                            {/* Logo + Name */}
                            <div className="px-8 pb-6 flex items-end gap-5 -mt-10">
                                <div 
                                    className="relative group cursor-pointer"
                                    onClick={() => logoInputRef.current?.click()}
                                >
                                    <input 
                                        type="file" 
                                        ref={logoInputRef} 
                                        className="hidden" 
                                        accept="image/*" 
                                        onChange={(e) => handleImageUpload(e, 'logo_url')} 
                                    />
                                    <div 
                                        className="w-20 h-20 rounded-2xl flex items-center justify-center border-4 border-black shadow-xl overflow-hidden bg-cover bg-center"
                                        style={profile?.logo_url ? { backgroundImage: `url(${profile.logo_url})` } : { backgroundColor: brandColor }}
                                    >
                                        {!profile?.logo_url && <span className="text-white font-extrabold text-2xl">{companyAbbr}</span>}
                                    </div>
                                    <div className="absolute inset-0 rounded-2xl bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <span className="material-symbols-outlined text-white text-lg">edit</span>
                                    </div>
                                </div>
                                <div className="pb-2">
                                    <h3 className="text-xl font-bold text-[#f9fafb]">{companyName}</h3>
                                    <p className="text-sm text-[#9ca3af]">{editedProfile.website ? editedProfile.website.replace(/^https?:\/\//, '') : 'No website'} • {editedProfile.location || 'Location not set'}</p>
                                </div>
                                <div className="ml-auto pb-2 flex items-center gap-2">
                                    {isVerified && (
                                        <span className="px-3 py-1 rounded-full bg-green-900/20 text-[#22c55e] border border-green-900/30 text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                                            <span className="material-symbols-outlined text-[14px]">verified</span> Verified
                                        </span>
                                    )}
                                    <span className="px-3 py-1 rounded-full bg-[#2563eb]/10 text-[#2563eb] border border-[#2563eb]/30 text-xs font-bold uppercase tracking-wider">Premium</span>
                                </div>
                            </div>
                        </div>

                        {/* Tabs */}
                        <div className="flex items-center gap-1 border-b border-white/10">
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
                                    <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
                                        <h4 className="font-bold text-[#f9fafb] mb-5 flex items-center gap-2">
                                            <span className="material-symbols-outlined text-[#2563eb]">apartment</span>
                                            Company Details
                                        </h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            {[
                                                { label: 'Company Name', field: 'name', icon: 'business' },
                                                { label: 'Industry', field: 'industry', icon: 'category' },
                                                { label: 'Company Size', field: 'company_size', icon: 'group' },
                                                { label: 'Founded', field: 'founded_year', icon: 'calendar_today' },
                                                { label: 'Website', field: 'website', icon: 'language' },
                                                { label: 'Funding Stage', field: 'funding_stage', icon: 'monetization_on' },
                                            ].map((f, i) => (
                                                <div key={i}>
                                                    <label className="block text-xs font-semibold text-[#9ca3af] uppercase tracking-wider mb-1.5">{f.label}</label>
                                                    <div className="flex items-center gap-2 bg-black border border-white/10 rounded-xl px-4 py-3 focus-within:border-[#2563eb] transition-colors">
                                                        <span className="material-symbols-outlined text-[#9ca3af] text-sm">{f.icon}</span>
                                                        <input
                                                            type="text"
                                                            value={editedProfile[f.field] || ''}
                                                            onChange={(e) => handleInputChange(e, f.field)}
                                                            className="flex-1 bg-transparent text-[#f9fafb] text-sm outline-none placeholder:text-gray-600"
                                                            placeholder={`Enter ${f.label.toLowerCase()}...`}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* About */}
                                    <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
                                        <h4 className="font-bold text-[#f9fafb] mb-5 flex items-center gap-2">
                                            <span className="material-symbols-outlined text-[#2563eb]">info</span>
                                            About the Company
                                        </h4>
                                        <textarea
                                            rows={5}
                                            value={editedProfile.description || ''}
                                            onChange={(e) => handleInputChange(e, 'description')}
                                            placeholder="Write a brief description of your company..."
                                            className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-[#f9fafb] text-sm outline-none focus:border-[#2563eb] transition-colors resize-none placeholder:text-gray-600"
                                        />
                                        <p className="text-xs text-[#9ca3af] mt-2">This appears on your public employer profile visible to candidates.</p>
                                    </div>

                                    {/* Location & Work Model */}
                                    <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
                                        <h4 className="font-bold text-[#f9fafb] mb-5 flex items-center gap-2">
                                            <span className="material-symbols-outlined text-[#2563eb]">location_on</span>
                                            Location & Work Model
                                        </h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            {[
                                                { label: 'HQ Location', field: 'location', icon: 'location_city' },
                                            ].map((f, i) => (
                                                <div key={i} className="md:col-span-2">
                                                    <label className="block text-xs font-semibold text-[#9ca3af] uppercase tracking-wider mb-1.5">{f.label}</label>
                                                    <div className="flex items-center gap-2 bg-black border border-white/10 rounded-xl px-4 py-3 focus-within:border-[#2563eb] transition-colors">
                                                        <span className="material-symbols-outlined text-[#9ca3af] text-sm">{f.icon}</span>
                                                        <input 
                                                            type="text" 
                                                            value={editedProfile[f.field] || ''}
                                                            onChange={(e) => handleInputChange(e, f.field)}
                                                            placeholder="City, State"
                                                            className="flex-1 bg-transparent text-[#f9fafb] text-sm outline-none" 
                                                        />
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
                                                        onClick={() => setEditedProfile(prev => ({ ...prev, work_model: model }))}
                                                        className={`px-4 py-2 rounded-xl text-sm font-medium border transition-colors ${
                                                            editedProfile.work_model === model
                                                                ? 'bg-[#2563eb]/10 text-[#2563eb] border-[#2563eb]/40'
                                                                : 'bg-black text-[#9ca3af] border-white/10 hover:border-[#2563eb]/40 hover:text-[#f9fafb]'
                                                        }`}
                                                        style={editedProfile.work_model === model ? { backgroundColor: `${brandColor}15`, color: brandColor, borderColor: `${brandColor}40` } : {}}
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
                                    <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
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
                                    <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
                                        <h4 className="font-bold text-[#f9fafb] mb-4 text-sm uppercase tracking-wider">Social Links</h4>
                                        <div className="space-y-3">
                                            {[
                                                { label: 'LinkedIn', icon: 'link', placeholder: 'linkedin.com/company/...', key: 'linkedin_url' },
                                                { label: 'Twitter / X', icon: 'link', placeholder: 'twitter.com/...', key: 'twitter_url' },
                                                { label: 'GitHub', icon: 'code', placeholder: 'github.com/...', key: 'github_url' },
                                            ].map((s, i) => (
                                                <div key={i}>
                                                    <label className="block text-xs text-[#9ca3af] mb-1">{s.label}</label>
                                                    <div className="flex items-center gap-2 bg-black border border-white/10 rounded-xl px-3 py-2.5 focus-within:border-[#2563eb] transition-colors">
                                                        <span className="material-symbols-outlined text-[#9ca3af] text-sm">{s.icon}</span>
                                                        <input type="text" value={editedProfile[s.key] || ''} onChange={(e) => handleInputChange(e, s.key)} placeholder={s.placeholder} className="flex-1 bg-transparent text-[#f9fafb] text-xs outline-none placeholder:text-gray-600" />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Employer Branding Color */}
                                    <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
                                        <h4 className="font-bold text-[#f9fafb] mb-4 text-sm uppercase tracking-wider">Brand Color</h4>
                                        <div className="flex gap-3 flex-wrap">
                                            {['#2563eb', '#7c3aed', '#059669', '#dc2626', '#d97706', '#0891b2'].map(color => (
                                                <button
                                                    key={color}
                                                    onClick={() => setEditedProfile(prev => ({ ...prev, brand_color: color }))}
                                                    className={`w-8 h-8 rounded-full border-2 transition-all ${editedProfile.brand_color === color ? 'border-white scale-110 shadow-lg shadow-white/20' : 'border-transparent hover:scale-110'}`}
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
                                        <label className="block text-xs font-semibold text-[#9ca3af] uppercase tracking-wider mb-2">One-liner Pitch</label>
                                        <textarea 
                                            rows={2} 
                                            value={editedProfile.one_liner_pitch || ''}
                                            onChange={(e) => handleInputChange(e, 'one_liner_pitch')}
                                            placeholder="A short punchy sentence about what you do." 
                                            className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-[#f9fafb] text-sm outline-none focus:border-[#2563eb] transition-colors resize-none placeholder:text-gray-600" 
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-[#9ca3af] uppercase tracking-wider mb-2">Mission Statement</label>
                                        <textarea 
                                            rows={4} 
                                            value={editedProfile.mission || ''}
                                            onChange={(e) => handleInputChange(e, 'mission')}
                                            placeholder="What is the mission of your organization?" 
                                            className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-[#f9fafb] text-sm outline-none focus:border-[#2563eb] transition-colors resize-none placeholder:text-gray-600" 
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-[#9ca3af] uppercase tracking-wider mb-3">Core Values</label>
                                        <div className="flex flex-wrap gap-2">
                                            {editedProfile.culture_values_array && editedProfile.culture_values_array.map((v, i) => (
                                                <span key={i} className="px-3 py-1.5 rounded-lg bg-[#2563eb]/10 text-[#2563eb] border border-[#2563eb]/30 text-sm font-medium flex items-center gap-1" style={{ backgroundColor: `${brandColor}15`, color: brandColor, borderColor: `${brandColor}40` }}>
                                                    {v}
                                                    <span 
                                                        className="material-symbols-outlined text-sm cursor-pointer hover:text-red-400"
                                                        onClick={() => removeCultureValue(i)}
                                                    >
                                                        close
                                                    </span>
                                                </span>
                                            ))}
                                            <button 
                                                onClick={addCultureValue}
                                                className="px-3 py-1.5 rounded-lg bg-white/5 text-[#9ca3af] border border-white/10 text-sm font-medium hover:text-[#f9fafb] flex items-center gap-1"
                                            >
                                                <span className="material-symbols-outlined text-sm">add</span> Add Value
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Benefits Tab */}
                        {activeTab === 'benefits' && (
                            <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
                                <h4 className="font-bold text-[#f9fafb] mb-2 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-[#2563eb]">redeem</span>
                                    Benefits & Perks
                                </h4>
                                <p className="text-xs text-[#9ca3af] mb-5">Click to toggle which benefits your company offers. Changes are saved when you click Save.</p>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {[
                                        { icon: 'health_and_safety', label: 'Health Insurance' },
                                        { icon: 'home', label: 'Remote Work' },
                                        { icon: 'school', label: 'Learning Budget' },
                                        { icon: 'flight', label: 'Unlimited PTO' },
                                        { icon: 'fitness_center', label: 'Gym Membership' },
                                        { icon: 'child_care', label: 'Parental Leave' },
                                        { icon: 'lunch_dining', label: 'Free Meals' },
                                        { icon: 'savings', label: '401(k) Match' },
                                        { icon: 'devices', label: 'Equipment Budget' },
                                    ].map((b, i) => {
                                        const isActive = (editedProfile.benefits_array || []).includes(b.label);
                                        return (
                                            <button
                                                key={i}
                                                type="button"
                                                onClick={() => {
                                                    setEditedProfile(prev => {
                                                        const currentBenefits = prev.benefits_array || [];
                                                        const updated = isActive
                                                            ? currentBenefits.filter(x => x !== b.label)
                                                            : [...currentBenefits, b.label];
                                                        return { ...prev, benefits_array: updated };
                                                    });
                                                }}
                                                className={`flex items-center gap-3 p-4 rounded-xl border transition-all text-left ${isActive ? 'bg-[#2563eb]/10 border-[#2563eb]/40 text-[#f9fafb]' : 'bg-black border-white/10 text-[#9ca3af] hover:border-white/20'}`}
                                            >
                                                <span className={`material-symbols-outlined ${isActive ? 'text-[#2563eb]' : 'text-[#9ca3af]'}`}>{b.icon}</span>
                                                <span className="text-sm font-medium">{b.label}</span>
                                                {isActive && <span className="ml-auto material-symbols-outlined text-[#22c55e] text-sm">check_circle</span>}
                                            </button>
                                        );
                                    })}
                                </div>

                                {/* Custom Benefits */}
                                <div className="mt-8 pt-8 border-t border-white/10">
                                    <h5 className="text-sm font-semibold text-[#f9fafb] mb-3">Add Custom Benefits</h5>
                                    <div className="flex items-center gap-3 mb-4">
                                        <input 
                                            type="text" 
                                            value={newBenefitValue}
                                            onChange={(e) => setNewBenefitValue(e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault();
                                                    addBenefitValue();
                                                }
                                            }}
                                            placeholder="E.g., Pet Friendly Office, Weekly Massages" 
                                            className="flex-1 bg-black border border-white/10 rounded-xl px-4 py-2.5 text-sm text-[#f9fafb] focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb] outline-none" 
                                        />
                                        <button 
                                            type="button"
                                            onClick={addBenefitValue}
                                            disabled={!newBenefitValue.trim()}
                                            className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-4 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-[#2563eb]/20 transition-all disabled:opacity-50 flex items-center gap-2"
                                        >
                                            <span className="material-symbols-outlined text-sm">add</span> Add
                                        </button>
                                    </div>

                                    {/* Render custom benefits (those not in the preset list) */}
                                    <div className="flex flex-wrap gap-2">
                                        {(editedProfile.benefits_array || []).filter(b => ![
                                            'Health Insurance', 'Remote Work', 'Learning Budget', 
                                            'Unlimited PTO', 'Gym Membership', 'Parental Leave', 
                                            'Free Meals', '401(k) Match', 'Equipment Budget'
                                        ].includes(b)).map((b, i) => (
                                            <div key={i} className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg">
                                                <span className="text-sm text-[#f9fafb]">{b}</span>
                                                <button 
                                                    type="button" 
                                                    onClick={() => removeBenefitValue(b)}
                                                    className="text-[#9ca3af] hover:text-red-400 focus:outline-none"
                                                >
                                                    <span className="material-symbols-outlined text-sm">close</span>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
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
                                    <button 
                                        onClick={handleAddTeamMember}
                                        disabled={isSaving}
                                        className="flex items-center gap-2 bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-3 py-2 rounded-lg text-sm font-semibold transition-all disabled:opacity-50"
                                    >
                                        <span className="material-symbols-outlined text-sm">person_add</span>
                                        Invite Member
                                    </button>
                                </div>
                                <div className="space-y-3">
                                    {editedProfile.team_members && editedProfile.team_members.length > 0 ? (
                                        editedProfile.team_members.map((m) => (
                                            <div key={m.id} className="flex items-center gap-4 p-4 bg-black rounded-xl border border-white/10">
                                                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm" style={{ backgroundColor: m.avatar_color || '#2563eb' }}>
                                                    {m.name.substring(0, 2).toUpperCase()}
                                                </div>
                                                <div className="flex-1">
                                                    <p className="font-semibold text-[#f9fafb] text-sm">{m.name}</p>
                                                    <p className="text-xs text-[#9ca3af]">{m.email}</p>
                                                </div>
                                                <span className="px-2 py-1 rounded-lg bg-white/5 text-[#9ca3af] border border-white/10 text-xs font-medium">{m.role}</span>
                                                <button 
                                                    onClick={() => handleDeleteTeamMember(m.id)}
                                                    className="text-[#9ca3af] hover:text-red-400 transition-colors"
                                                    title="Remove Member"
                                                >
                                                    <span className="material-symbols-outlined text-sm">person_remove</span>
                                                </button>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-center py-8 text-[#9ca3af] text-sm border border-dashed border-white/10 rounded-xl">
                                            No team members added yet. Click "Invite Member" to add someone.
                                        </div>
                                    )}
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
