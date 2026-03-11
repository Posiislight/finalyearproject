import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { employerService } from './services/employerService';
import BlockLoader from './components/ui/block-loader';

const EmployerVerification = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);
    
    // Business Verification state
    const [documents, setDocuments] = useState([]);
    const [uploadingDoc, setUploadingDoc] = useState(false);
    const documentInputRef = useRef(null);

    // Employer Branding state
    const [formData, setFormData] = useState({
        brand_color: '#2563eb',
        one_liner_pitch: '',
    });
    const [coverUrl, setCoverUrl] = useState(null);
    const [coverFile, setCoverFile] = useState(null);
    const coverInputRef = useRef(null);
    const [companyInfo, setCompanyInfo] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const [profile, docs] = await Promise.all([
                    employerService.getCompanyProfile(),
                    employerService.getVerificationDocuments()
                ]);
                setCompanyInfo(profile);
                setFormData({
                    brand_color: profile.brand_color || '#2563eb',
                    one_liner_pitch: profile.one_liner_pitch || '',
                });
                if (profile.cover_photo) {
                    setCoverUrl(profile.cover_photo);
                }
                console.log("Docs API Response:", docs);
                setDocuments(docs.results || docs);
            } catch (error) {
                console.error("Failed to load data", error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    const handleDocumentSelect = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploadingDoc(true);
        try {
            const data = new FormData();
            data.append('document', file);
            const newDoc = await employerService.uploadVerificationDocument(data);
            setDocuments(prev => [...prev, newDoc]);
        } catch (error) {
            console.error("Failed to upload document", error);
        } finally {
            setUploadingDoc(false);
        }
    };

    const handleDeleteDocument = async (docId) => {
        try {
            await employerService.deleteVerificationDocument(docId);
            setDocuments(prev => prev.filter(d => d.id !== docId));
        } catch (error) {
            console.error("Failed to delete document", error);
        }
    };

    const handleCoverSelect = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setCoverFile(file);
        setCoverUrl(URL.createObjectURL(file));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleColorSelect = (color) => {
        setFormData(prev => ({ ...prev, brand_color: color }));
    };

    const handleSave = async () => {
        setSubmitting(true);
        setErrorMsg(null);
        try {
            const data = new FormData();
            data.append('brand_color', formData.brand_color);
            data.append('one_liner_pitch', formData.one_liner_pitch);
            if (coverFile) {
                data.append('cover_photo', coverFile);
            }
            const updatedProfile = await employerService.updateCompanyProfile(data);
            setCompanyInfo(updatedProfile);
            return true;
        } catch (error) {
            console.error("Failed to update profile", error);
            if (error.response && error.response.data) {
                const msgs = Object.entries(error.response.data).map(([k, v]) => `${k}: ${v}`);
                setErrorMsg(msgs.join(' | '));
            } else {
                setErrorMsg("An unexpected error occurred while saving.");
            }
            return false;
        } finally {
            setSubmitting(false);
        }
    };

    const handleContinue = async () => {
        const success = await handleSave();
        if (success) {
            navigate('/employer-job-post');
        }
    };

    return (
        <div className="bg-black text-[#f9fafb] font-['DM_Sans',sans-serif] antialiased h-screen flex overflow-hidden">
            <aside className="hidden lg:flex flex-col w-64 h-full bg-white/5 border-r border-white/10 shadow-sm z-10 shrink-0">
                <div className="flex items-center gap-3 p-6 mb-4">
                    <div className="flex items-center justify-center">
                        <span className="material-symbols-outlined text-blue-500 text-[32px] font-light">dashboard_customize</span>
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight text-white leading-tight">
                        RecruitAI
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
                        <div className="w-8 h-8 rounded-full bg-gray-700 border-2 border-gray-600 flex items-center justify-center shrink-0 ring-4 ring-black">
                            <span className="text-gray-400 text-sm font-bold">3</span>
                        </div>
                        <div className="pt-1">
                            <p className="text-sm font-semibold text-[#f9fafb]">First Job Post</p>
                            <p className="text-xs text-[#9ca3af]">Create your listing</p>
                        </div>
                    </div>
                </div>
                <div className="mt-auto p-6">
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                        <div className="flex items-center gap-2 mb-2 text-[#f9fafb] font-semibold text-sm">
                            <span className="material-symbols-outlined text-yellow-500">lightbulb</span>
                            Need help?
                        </div>
                        <p className="text-xs text-[#9ca3af] mb-3">Our support team is available 24/7 to assist with onboarding.</p>
                        <button onClick={() => window.location.href = 'mailto:support@recruitai.com'} className="text-xs font-medium text-[#2563eb] hover:text-[#1d4ed8] hover:underline">Contact Support</button>
                    </div>
                </div>
            </aside>
            <main className="flex-1 flex flex-col h-full overflow-hidden relative bg-black">
                <header className="flex items-center justify-between px-8 py-4 bg-white/5 border-b border-white/10 shadow-sm z-10 shrink-0">
                    <div>
                        <h2 className="text-lg font-bold text-[#f9fafb]">Establish Your Presence</h2>
                        <p className="text-sm text-[#9ca3af]">Verify your business identity and customize how candidates see you.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button onClick={handleSave} disabled={submitting} className="text-sm font-medium text-[#9ca3af] hover:text-[#f9fafb]">
                            {submitting ? 'Saving...' : 'Save as Draft'}
                        </button>
                        <div className="h-8 w-8 rounded-full bg-indigo-900/50 text-indigo-300 border border-indigo-700/50 flex items-center justify-center text-sm font-bold">
                            TC
                        </div>
                    </div>
                </header>
                <div className="flex-1 overflow-y-auto p-6 lg:p-10 scrollbar-thin">
                    <div className="max-w-5xl mx-auto space-y-8">
                        {/* Business Verification */}
                        <section className="bg-white/5 rounded-2xl shadow-[0_4px_20px_-2px_rgba(0,0,0,0.3)] border border-white/10 overflow-hidden">
                            <div className="p-6 border-b border-white/10 flex justify-between items-start">
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
                                    <input type="file" ref={documentInputRef} onChange={handleDocumentSelect} className="hidden" accept=".pdf,.png,.jpg,.jpeg" />
                                    <div 
                                        onClick={() => documentInputRef.current?.click()}
                                        className={`border-2 border-dashed ${uploadingDoc ? 'border-[#2563eb] bg-[#2563eb]/5 cursor-wait' : 'border-gray-600 hover:border-[#2563eb] hover:bg-[#2563eb]/5 cursor-pointer'} transition-colors rounded-xl p-8 flex flex-col items-center justify-center text-center group`}
                                    >
                                        <div className="bg-blue-900/20 p-3 rounded-full mb-3 group-hover:scale-110 transition-transform">
                                            {uploadingDoc ? (
                                                <BlockLoader size={20} gap={3} />
                                            ) : (
                                                <span className="material-symbols-outlined text-[#2563eb] text-2xl">cloud_upload</span>
                                            )}
                                        </div>
                                        <p className="text-sm font-medium text-[#f9fafb] mb-1">
                                            {uploadingDoc ? 'Uploading...' : 'Click to upload or drag and drop'}
                                        </p>
                                        <p className="text-xs text-[#9ca3af]">PDF, PNG or JPG (max. 10MB)</p>
                                    </div>
                                    <div className="flex items-start gap-2 text-xs text-[#9ca3af] bg-white/5 p-3 rounded-lg border border-white/10">
                                        <span className="material-symbols-outlined text-base text-gray-500 shrink-0">lock</span>
                                        Documents are securely stored and only used for verification purposes. They will not be public.
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <p className="text-xs font-semibold text-[#9ca3af] uppercase tracking-wider mb-2">Attached Documents</p>
                                    {documents.length === 0 ? (
                                        <p className="text-sm text-gray-500 italic">No documents uploaded yet.</p>
                                    ) : documents.map((doc) => (
                                        <div key={doc.id} className="flex items-center p-3 bg-gray-800 border border-gray-700 rounded-xl shadow-sm hover:border-gray-600 transition-colors group">
                                            <div className="w-10 h-10 bg-blue-900/20 rounded-lg flex items-center justify-center mr-3 shrink-0">
                                                <span className="material-symbols-outlined text-blue-500">
                                                    {doc.filename.endsWith('.pdf') ? 'picture_as_pdf' : 'image'}
                                                </span>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-[#f9fafb] truncate">{doc.filename}</p>
                                                <div className="flex items-center gap-1.5 mt-0.5">
                                                    <span className={`w-2 h-2 rounded-full ${doc.status === 'verified' ? 'bg-[#22c55e]' : doc.status === 'rejected' ? 'bg-red-500' : 'bg-yellow-500'}`}></span>
                                                    <p className="text-xs text-[#9ca3af] capitalize">{doc.status}</p>
                                                </div>
                                            </div>
                                            <button onClick={() => handleDeleteDocument(doc.id)} className="p-2 text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <span className="material-symbols-outlined text-xl">delete</span>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>

                        {/* Employer Branding */}
                        <section className="bg-white/5 rounded-2xl shadow-[0_4px_20px_-2px_rgba(0,0,0,0.3)] border border-white/10 overflow-hidden">
                            <div className="p-6 border-b border-white/10 flex justify-between items-start">
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
                                <div className="w-full lg:w-1/3 p-6 border-b lg:border-b-0 lg:border-r border-white/10 space-y-6 bg-white/5">
                                    <div>
                                        <label className="block text-sm font-semibold text-[#f9fafb] mb-3">Brand Primary Color</label>
                                        <div className="flex flex-wrap gap-3">
                                            {['#2563eb', '#ec4899', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444', '#14b8a6', '#6366f1'].map(color => (
                                                <button 
                                                    key={color}
                                                    onClick={() => handleColorSelect(color)}
                                                    style={{ backgroundColor: color }}
                                                    className={`w-8 h-8 rounded-full ring-offset-black transition-all hover:scale-110 ${formData.brand_color === color ? 'ring-2 ring-offset-2 ring-white scale-110' : ''}`}
                                                ></button>
                                            ))}
                                        </div>
                                        <p className="text-xs text-[#9ca3af] mt-2">Used for buttons, links, and accents on your profile.</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-[#f9fafb] mb-3">Cover Photo</label>
                                        <input type="file" ref={coverInputRef} onChange={handleCoverSelect} className="hidden" accept="image/*" />
                                        <div onClick={() => coverInputRef.current?.click()} className="relative group cursor-pointer overflow-hidden rounded-xl border border-gray-700 bg-gray-800 h-32 flex items-center justify-center">
                                            {coverUrl ? (
                                                <img alt="Current Cover" className="w-full h-full object-cover transition-opacity group-hover:opacity-75" src={coverUrl} />
                                            ) : (
                                                <div className="flex flex-col items-center">
                                                    <span className="material-symbols-outlined text-gray-500 text-3xl group-hover:text-white transition-colors">add_photo_alternate</span>
                                                </div>
                                            )}
                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/60">
                                                <span className="bg-gray-800/90 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm border border-gray-600">Change Image</span>
                                            </div>
                                        </div>
                                        <p className="text-xs text-[#9ca3af] mt-2">Recommended size: 1200x600px. Used as the main visual.</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-[#f9fafb] mb-2">One-Liner Pitch</label>
                                        <input name="one_liner_pitch" value={formData.one_liner_pitch} onChange={handleInputChange} maxLength={60} className="w-full rounded-lg bg-gray-800 border-gray-600 text-[#f9fafb] shadow-sm focus:border-[#2563eb] focus:ring focus:ring-[#2563eb]/30 text-sm placeholder:text-gray-500" placeholder="e.g. Building the future of finance." type="text" />
                                        <div className="flex justify-between mt-1">
                                            <p className="text-xs text-[#9ca3af]">Appears on the swipe card.</p>
                                            <p className="text-xs text-[#9ca3af]">{formData.one_liner_pitch.length}/60</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full lg:w-2/3 p-8 bg-black/20 flex flex-col items-center justify-center">
                                    <div className="mb-4 flex items-center gap-2 text-[#9ca3af] text-sm">
                                        <span className="material-symbols-outlined text-lg">visibility</span>
                                        <span>Candidate Preview (Card Mode)</span>
                                    </div>
                                    <div className="w-[320px] bg-white/5 rounded-3xl shadow-xl overflow-hidden border border-white/10 relative transform hover:scale-[1.01] transition-transform duration-300">
                                        <div className="h-40 bg-cover bg-center relative bg-gray-800" style={{ backgroundImage: coverUrl ? `url('${coverUrl}')` : 'none' }}>
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                            <div className="absolute bottom-3 left-3 flex items-center gap-2">
                                                <div className="w-10 h-10 rounded-lg bg-gray-800 p-1 shadow-sm border border-gray-700 overflow-hidden flex items-center justify-center">
                                                    {companyInfo?.logo_url ? (
                                                        <img alt="Logo" className="w-full h-full object-contain" src={companyInfo.logo_url} />
                                                    ) : (
                                                        <span className="material-symbols-outlined text-gray-400">apartment</span>
                                                    )}
                                                </div>
                                                <div className="text-white">
                                                    <p className="font-bold text-sm leading-tight">{companyInfo?.name || 'Your Company'}</p>
                                                    <div className="flex items-center gap-1 text-[10px] opacity-90 text-gray-300">
                                                        <span className="material-symbols-outlined text-[10px]" style={{ color: formData.brand_color }}>verified</span>
                                                        <span>Verified</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-4 space-y-3 bg-white/5">
                                            <div>
                                                <h4 className="font-bold text-white text-lg leading-tight">Senior UX Designer</h4>
                                                <p className="text-xs font-medium mt-1" style={{ color: formData.brand_color }}>{formData.one_liner_pitch || 'Your catchy one-liner here.'}</p>
                                            </div>
                                            <div className="flex flex-wrap gap-2 text-[10px] text-gray-400 font-medium">
                                                <span className="bg-gray-800 px-2 py-1 rounded-md border border-gray-700">{companyInfo?.location || 'Location'}</span>
                                                <span className="bg-gray-800 px-2 py-1 rounded-md border border-gray-700">$130k - $160k</span>
                                                <span className="bg-gray-800 px-2 py-1 rounded-md border border-gray-700">{companyInfo?.industry || 'Industry'}</span>
                                            </div>
                                            <div className="pt-2 border-t border-gray-700">
                                                <p className="text-xs text-gray-500 mb-2 font-medium">SKILL MATCH</p>
                                                <div className="flex flex-wrap gap-1.5">
                                                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold" style={{ backgroundColor: `${formData.brand_color}30`, color: formData.brand_color, borderColor: `${formData.brand_color}50`, borderWidth: '1px' }}>Figma</span>
                                                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold" style={{ backgroundColor: `${formData.brand_color}30`, color: formData.brand_color, borderColor: `${formData.brand_color}50`, borderWidth: '1px' }}>React</span>
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
                        {errorMsg && (
                            <div className="bg-red-900/40 border border-red-500/50 p-4 rounded-xl text-red-200 text-sm flex items-start gap-3 mt-6 mb-4">
                                <span className="material-symbols-outlined text-red-500 shrink-0">error</span>
                                <div>
                                    <p className="font-bold mb-1">Could not save verification profile</p>
                                    <p className="opacity-90">{errorMsg}</p>
                                </div>
                            </div>
                        )}
                        <div className="flex justify-between items-center pt-4 pb-12">
                            <button
                                onClick={() => navigate('/company-info')}
                                className="px-6 py-3 rounded-xl border border-white/10 text-[#f9fafb] font-semibold hover:bg-white/5 transition-colors flex items-center gap-2"
                            >
                                <span className="material-symbols-outlined text-sm">arrow_back</span>
                                Back
                            </button>
                            <button
                                onClick={handleContinue}
                                disabled={submitting}
                                className="px-8 py-3 rounded-xl text-white font-bold shadow-lg transition-all flex items-center gap-2 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                                style={{ backgroundColor: formData.brand_color, boxShadow: `0 10px 15px -3px ${formData.brand_color}40` }}
                            >
                                {submitting ? 'Saving...' : 'Continue to Job Post'}
                                {!submitting && <span className="material-symbols-outlined text-sm">arrow_forward</span>}
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default EmployerVerification;
