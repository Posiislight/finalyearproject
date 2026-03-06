import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { employerService } from './services/employerService';

const EmployerJobPost = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        requirements: '',
        location: '',
        salaryCurrency: 'USD',
        salaryMin: '',
        salaryMax: '',
    });
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    const [isGenerating, setIsGenerating] = useState(false);
    const [aiInsights, setAiInsights] = useState(null);

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async () => {
        setError('');
        if (!formData.title.trim()) {
            setError('Job title is required.');
            return;
        }
        if (!formData.description.trim()) {
            setError('Job description is required.');
            return;
        }
        setSubmitting(true);
        try {
            // Compose the final salary string
            const formattedSalary = (formData.salaryMin || formData.salaryMax) 
                ? `${formData.salaryCurrency} ${formData.salaryMin}${formData.salaryMax ? ' - ' + formData.salaryMax : ''}`
                : '';

            const payload = {
                ...formData,
                salary: formattedSalary
            };

            await employerService.createJobPost(payload);
            navigate('/employer-jobs');
        } catch (err) {
            console.error('Failed to create job post:', err);
            setError(err.response?.data?.detail || 'Failed to create job post. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    const handleGenerateWithAI = async () => {
        if (!formData.title.trim()) {
            setError('Please enter a Job Title first so the AI knows what to write.');
            return;
        }
        setError('');
        setIsGenerating(true);
        try {
            const formattedSalary = (formData.salaryMin || formData.salaryMax) 
                ? `${formData.salaryCurrency} ${formData.salaryMin}${formData.salaryMax ? ' - ' + formData.salaryMax : ''}`
                : '';

            const data = await employerService.generateJobPost({
                title: formData.title,
                requirements: formData.requirements,
                location: formData.location,
                salary: formattedSalary
            });

            if (data.description) {
                setFormData(prev => ({ 
                    ...prev, 
                    description: data.description,
                    salaryMin: data.salary_min_num || prev.salaryMin,
                    salaryMax: data.salary_max_num || prev.salaryMax,
                    salaryCurrency: data.salary_currency || prev.salaryCurrency
                }));
            }
            setAiInsights({
                atsScore: data.ats_optimization || 0,
                tips: data.ats_tips || [],
                minSalary: data.salary_min || 'N/A',
                maxSalary: data.salary_max || 'N/A',
                location: data.salary_location || 'Global/Remote'
            });
        } catch (err) {
            console.error('Failed to generate with AI:', err);
            setError('Failed to generate AI suggestions. Please try again.');
        } finally {
            setIsGenerating(false);
        }
    };

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
                    {/* Step 2 - Done */}
                    <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-[#22c55e] flex items-center justify-center shrink-0 ring-4 ring-[#1F2937]">
                            <span className="material-symbols-outlined text-white text-lg font-bold">check</span>
                        </div>
                        <div className="pt-1">
                            <p className="text-sm font-semibold text-[#f9fafb]">Verification & Brand</p>
                            <p className="text-xs text-[#9ca3af]">Identity & Profile look</p>
                        </div>
                    </div>
                    {/* Step 3 - Active */}
                    <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-[#2563eb] flex items-center justify-center shrink-0 ring-4 ring-[#2563eb]/20 shadow-lg shadow-[#2563eb]/30">
                            <span className="text-white text-sm font-bold">3</span>
                        </div>
                        <div className="pt-1">
                            <p className="text-sm font-bold text-[#2563eb]">First Job Post</p>
                            <p className="text-xs text-[#9ca3af]">Create your listing</p>
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
                        <button onClick={() => window.location.href = 'mailto:support@jobswipe.com'} className="text-xs font-medium text-[#2563eb] hover:text-[#1d4ed8] hover:underline">Contact Support</button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col h-full overflow-hidden relative bg-[#111827]">
                <header className="flex items-center justify-between px-8 py-4 bg-[#1F2937] border-b border-[#374151] shadow-sm z-10 shrink-0">
                    <div>
                        <h2 className="text-lg font-bold text-[#f9fafb]">Create Your First Job Post</h2>
                        <p className="text-sm text-[#9ca3af]">Provide details for your first job listing to attract top talent.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button onClick={() => alert("Draft saved locally. (Implementation pending)")} className="text-sm font-medium text-[#9ca3af] hover:text-[#f9fafb]">Save as Draft</button>
                        <div className="h-8 w-8 rounded-full bg-indigo-900/50 text-indigo-300 border border-indigo-700/50 flex items-center justify-center text-sm font-bold">TC</div>
                    </div>
                </header>

                <div className="flex-1 flex overflow-hidden">
                    {/* Form Area */}
                    <div className="flex-1 overflow-y-auto p-6 lg:p-10 scrollbar-thin">
                        <div className="max-w-3xl mx-auto">
                            <div className="bg-[#1F2937] rounded-2xl shadow-[0_4px_20px_-2px_rgba(0,0,0,0.3)] border border-[#374151] p-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-lg bg-blue-900/20 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-[#2563eb]">work</span>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-[#f9fafb]">Job Details</h3>
                                        <p className="text-sm text-[#9ca3af]">Provide details for your first job listing to attract top talent.</p>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    {error && (
                                        <div className="bg-red-900/20 border border-red-800/50 text-red-400 px-4 py-3 rounded-lg text-sm">
                                            {error}
                                        </div>
                                    )}
                                    <div>
                                        <label className="block text-sm font-medium text-[#f9fafb] mb-2">Job Title *</label>
                                        <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="e.g., Senior Software Engineer" className="w-full h-11 rounded-lg bg-gray-800 border border-gray-700 text-[#f9fafb] px-4 text-sm placeholder:text-gray-500 focus:border-[#2563eb] focus:ring focus:ring-[#2563eb]/30 outline-none transition" />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-[#f9fafb] mb-2">Location</label>
                                            <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="e.g., Remote, London, UK" className="w-full h-11 rounded-lg bg-gray-800 border border-gray-700 text-[#f9fafb] px-4 text-sm placeholder:text-gray-500 focus:border-[#2563eb] focus:ring focus:ring-[#2563eb]/30 outline-none transition" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-[#f9fafb] mb-2">Salary Range</label>
                                            <div className="flex items-center gap-2">
                                                <select
                                                    name="salaryCurrency"
                                                    value={formData.salaryCurrency}
                                                    onChange={handleChange}
                                                    className="h-11 rounded-lg bg-gray-800 border border-gray-700 text-[#f9fafb] px-3 text-sm focus:border-[#2563eb] focus:ring focus:ring-[#2563eb]/30 outline-none transition w-24"
                                                >
                                                    <option value="USD">USD ($)</option>
                                                    <option value="EUR">EUR (€)</option>
                                                    <option value="GBP">GBP (£)</option>
                                                    <option value="CAD">CAD ($)</option>
                                                    <option value="AUD">AUD ($)</option>
                                                </select>
                                                <input 
                                                    type="number" 
                                                    name="salaryMin" 
                                                    value={formData.salaryMin} 
                                                    onChange={handleChange} 
                                                    placeholder="Min (e.g. 40000)" 
                                                    className="w-full h-11 rounded-lg bg-gray-800 border border-gray-700 text-[#f9fafb] px-4 text-sm placeholder:text-gray-500 focus:border-[#2563eb] focus:ring focus:ring-[#2563eb]/30 outline-none transition appearance-none" 
                                                />
                                                <span className="text-gray-500">-</span>
                                                <input 
                                                    type="number" 
                                                    name="salaryMax" 
                                                    value={formData.salaryMax} 
                                                    onChange={handleChange} 
                                                    placeholder="Max (e.g. 60000)" 
                                                    className="w-full h-11 rounded-lg bg-gray-800 border border-gray-700 text-[#f9fafb] px-4 text-sm placeholder:text-gray-500 focus:border-[#2563eb] focus:ring focus:ring-[#2563eb]/30 outline-none transition appearance-none" 
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-[#f9fafb] mb-2">Requirements</label>
                                        <textarea name="requirements" value={formData.requirements} onChange={handleChange} className="w-full h-32 rounded-lg bg-gray-800 border border-gray-700 text-[#f9fafb] focus:border-[#2563eb] focus:ring focus:ring-[#2563eb]/30 p-4 resize-none outline-none transition placeholder:text-gray-500" placeholder="List the key skills and qualifications needed..."></textarea>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-[#f9fafb] mb-2">Job Description (AI-Assisted) *</label>
                                        <div className="relative">
                                            <textarea name="description" value={formData.description} onChange={handleChange} className="w-full h-64 rounded-lg bg-gray-800 border border-gray-700 text-[#f9fafb] focus:border-[#2563eb] focus:ring focus:ring-[#2563eb]/30 p-4 resize-none outline-none transition placeholder:text-gray-500" placeholder="Type a few keywords or let AI generate a description based on the title..."></textarea>
                                            <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2">
                                                <button 
                                                    type="button" 
                                                    onClick={handleGenerateWithAI}
                                                    disabled={isGenerating}
                                                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    {isGenerating ? (
                                                        <span className="material-symbols-outlined text-sm animate-spin">refresh</span>
                                                    ) : (
                                                        <span className="material-symbols-outlined text-sm">auto_awesome</span>
                                                    )}
                                                    {isGenerating ? 'Generating...' : 'Generate with AI'}
                                                </button>
                                                <div className="ml-auto">
                                                    <button type="button" onClick={() => alert("More options coming soon")} className="p-1.5 text-[#9ca3af] hover:text-[#f9fafb]">
                                                        <span className="material-symbols-outlined">more_vert</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* JobSwipe Assistant Sidebar */}
                    <aside className="w-80 bg-[#1F2937] border-l border-[#374151] p-6 overflow-y-auto hidden xl:block">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-[#9ca3af]">smart_toy</span>
                                <h3 className="font-bold text-[#f9fafb]">JobSwipe Assistant</h3>
                            </div>
                            <button onClick={() => setAiInsights(null)} className="text-[#9ca3af] hover:text-[#f9fafb]">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>

                        {aiInsights ? (
                            <div className="space-y-6">
                                <div className="bg-gray-800/50 rounded-xl p-4 border border-[#374151]">
                                    <h4 className="font-semibold text-[#f9fafb] mb-2">ATS Optimization</h4>
                                    <p className="text-xs text-[#9ca3af] mb-3">Based on your title and requirements</p>
                                    <div className="w-full bg-gray-700 rounded-full h-1.5 mb-2">
                                        <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${aiInsights.atsScore}%` }}></div>
                                    </div>
                                    <p className="text-xs text-blue-400 font-medium mb-4">{aiInsights.atsScore}% Optimized</p>

                                    <ul className="space-y-2">
                                        {aiInsights.tips.map((tip, idx) => (
                                            <li key={idx} className="flex items-start gap-2 text-xs text-gray-400">
                                                <span className="material-symbols-outlined text-sm text-green-400">check</span>
                                                <span>{tip}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="bg-gray-800/50 rounded-xl p-4 border border-[#374151]">
                                    <h4 className="font-semibold text-[#f9fafb] mb-2">Market Salary Data</h4>
                                    <p className="text-xs text-[#9ca3af] mb-4">Based on similar roles</p>

                                    <div className="text-center py-4 bg-gray-900/50 rounded-lg mb-2 border border-gray-700">
                                        <p className="text-xl font-bold text-[#f9fafb]">
                                            {aiInsights.minSalary} - {aiInsights.maxSalary}
                                        </p>
                                    </div>
                                    <div className="h-16 relative mt-4">
                                        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-blue-500/20 to-transparent"></div>
                                        <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
                                            <path d="M0 40 Q 25 40 50 20 T 100 10" fill="none" stroke="#3b82f6" strokeWidth="2" />
                                            <circle cx="50" cy="20" r="3" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
                                        </svg>
                                    </div>
                                    <div className="mt-2 text-center">
                                        <p className="text-xs font-medium text-[#f9fafb]">Your Range Input: {formData.salaryMin || formData.salaryMax ? `${formData.salaryCurrency} ${formData.salaryMin} - ${formData.salaryMax}` : 'Not set'}</p>
                                        <p className="text-[10px] text-[#9ca3af] mt-1">Based on location: {aiInsights.location}</p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-64 text-center">
                                <div className="w-16 h-16 bg-blue-900/20 rounded-full flex items-center justify-center mb-4">
                                    <span className="material-symbols-outlined text-[#2563eb] text-2xl">auto_awesome</span>
                                </div>
                                <p className="text-sm font-medium text-[#f9fafb] mb-2">Ready to assist</p>
                                <p className="text-xs text-[#9ca3af]">Fill in a Job Title and click "Generate with AI" to get ATS tips and market salary data.</p>
                            </div>
                        )}
                    </aside>
                </div>

                {/* Bottom Navigation */}
                <div className="p-4 border-t border-[#374151] bg-[#1F2937] flex justify-between items-center px-8">
                    <button
                        onClick={() => navigate('/employer-verification')}
                        className="px-6 py-3 rounded-xl border border-[#374151] text-[#f9fafb] font-semibold hover:bg-gray-800 transition-colors flex items-center gap-2"
                    >
                        <span className="material-symbols-outlined text-sm">arrow_back</span>
                        Back
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={submitting}
                        className="px-8 py-3 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold shadow-lg shadow-[#2563eb]/30 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {submitting ? 'Creating...' : 'Create Job Post'}
                        {!submitting && <span className="material-symbols-outlined text-sm">arrow_forward</span>}
                    </button>
                </div>
            </main>
        </div>
    );
};

export default EmployerJobPost;
