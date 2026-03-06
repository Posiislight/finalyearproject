import React, { useState } from 'react';
import { employerService } from '../services/employerService';

const EmployerJobPostModal = ({ isOpen, onClose, onSuccess }) => {
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

    if (!isOpen) return null;

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

            const newJob = await employerService.createJobPost(payload);
            setFormData({
                title: '',
                description: '',
                requirements: '',
                location: '',
                salaryCurrency: 'USD',
                salaryMin: '',
                salaryMax: '',
            });
            setAiInsights(null);
            onSuccess(newJob);
            onClose();
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto font-['DM_Sans',sans-serif]">
            <div className="bg-white/5 w-full max-w-5xl rounded-2xl shadow-2xl border border-white/10 flex flex-col max-h-[90vh]">
                
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10 shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-900/20 flex items-center justify-center">
                            <span className="material-symbols-outlined text-[#2563eb]">work</span>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-[#f9fafb]">Post a New Job</h2>
                            <p className="text-sm text-[#9ca3af]">Find the perfect candidate with AI-assisted job posts.</p>
                        </div>
                    </div>
                    <button 
                        onClick={onClose}
                        className="p-2 rounded-lg text-[#9ca3af] hover:text-[#f9fafb] hover:bg-white/5 transition-colors"
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                {/* Body: Form + Assistant */}
                <div className="flex-1 overflow-y-auto flex flex-col lg:flex-row">
                    
                    {/* Form Area */}
                    <div className="flex-1 p-6 space-y-6">
                        {/* Error moved to footer for better visibility */}
                        <div>
                            <label className="block text-sm font-medium text-[#f9fafb] mb-2">Job Title *</label>
                            <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="e.g., Senior Software Engineer" className="w-full h-11 rounded-lg bg-gray-800 border border-gray-700 text-[#f9fafb] px-4 text-sm placeholder:text-gray-500 focus:border-[#2563eb] focus:ring focus:ring-[#2563eb]/30 outline-none transition" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                        className="h-11 rounded-lg bg-black border border-white/10 text-[#f9fafb] px-3 text-sm focus:border-[#2563eb] focus:ring focus:ring-[#2563eb]/30 outline-none transition w-24"
                                    >
                                        <option value="USD">USD ($)</option>
                                        <option value="EUR">EUR (€)</option>
                                        <option value="GBP">GBP (£)</option>
                                        <option value="CAD">CAD ($)</option>
                                        <option value="AUD">AUD ($)</option>
                                        <option value="NGN">NGN (₦)</option>
                                    </select>
                                    <input 
                                        type="number" 
                                        name="salaryMin" 
                                        value={formData.salaryMin} 
                                        onChange={handleChange} 
                                        placeholder="Min" 
                                        className="w-full h-11 rounded-lg bg-gray-800 border border-gray-700 text-[#f9fafb] px-4 text-sm placeholder:text-gray-500 focus:border-[#2563eb] focus:ring focus:ring-[#2563eb]/30 outline-none transition appearance-none" 
                                    />
                                    <span className="text-gray-500">-</span>
                                    <input 
                                        type="number" 
                                        name="salaryMax" 
                                        value={formData.salaryMax} 
                                        onChange={handleChange} 
                                        placeholder="Max" 
                                        className="w-full h-11 rounded-lg bg-gray-800 border border-gray-700 text-[#f9fafb] px-4 text-sm placeholder:text-gray-500 focus:border-[#2563eb] focus:ring focus:ring-[#2563eb]/30 outline-none transition appearance-none" 
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#f9fafb] mb-2">Requirements</label>
                            <textarea name="requirements" value={formData.requirements} onChange={handleChange} className="w-full h-24 rounded-lg bg-black border border-white/10 text-[#f9fafb] focus:border-[#2563eb] focus:ring focus:ring-[#2563eb]/30 p-4 resize-none outline-none transition placeholder:text-gray-500" placeholder="List the key skills and qualifications needed..."></textarea>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#f9fafb] mb-2">Job Description (AI-Assisted) *</label>
                            <div className="relative">
                                <textarea name="description" value={formData.description} onChange={handleChange} className="w-full h-56 rounded-lg bg-black border border-white/10 text-[#f9fafb] focus:border-[#2563eb] focus:ring focus:ring-[#2563eb]/30 p-4 resize-none outline-none transition placeholder:text-gray-500 pb-16" placeholder="Type a few keywords or let AI generate a description based on the title..."></textarea>
                                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center bg-gray-800/80 backdrop-blur rounded-lg p-2 border border-gray-700/50 shadow-sm">
                                    <button 
                                        type="button" 
                                        onClick={handleGenerateWithAI}
                                        disabled={isGenerating}
                                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-indigo-500/20"
                                    >
                                        {isGenerating ? (
                                            <span className="material-symbols-outlined text-sm animate-spin">refresh</span>
                                        ) : (
                                            <span className="material-symbols-outlined text-sm">auto_awesome</span>
                                        )}
                                        {isGenerating ? 'Generating...' : 'Enhance with AI'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* JobSwipe Assistant Sidebar */}
                    <div className="w-full lg:w-80 bg-black border-t lg:border-t-0 lg:border-l border-white/10 p-6 shrink-0 flex flex-col">
                        <div className="flex items-center gap-2 mb-6 text-indigo-400">
                            <span className="material-symbols-outlined">smart_toy</span>
                            <h3 className="font-bold text-[#f9fafb]">JobSwipe Assistant</h3>
                        </div>

                        <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin">
                            {aiInsights ? (
                                <div className="space-y-6">
                                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                                        <h4 className="font-semibold text-[#f9fafb] mb-2 flex items-center gap-1.5"><span className="material-symbols-outlined text-sm text-green-400">trending_up</span> ATS Optimization</h4>
                                        <p className="text-xs text-[#9ca3af] mb-3">Based on your title and requirements</p>
                                        <div className="w-full bg-white/10 rounded-full h-1.5 mb-2">
                                            <div className="bg-green-500 h-1.5 rounded-full" style={{ width: `${aiInsights.atsScore}%` }}></div>
                                        </div>
                                        <p className="text-xs text-green-400 font-medium mb-4">{aiInsights.atsScore}% Optimized for JobSwipe ATS</p>

                                        <ul className="space-y-3">
                                            {aiInsights.tips.map((tip, idx) => (
                                                <li key={idx} className="flex items-start gap-2 text-xs text-gray-300 bg-white/5 p-2.5 rounded-lg border border-white/10">
                                                    <span className="material-symbols-outlined text-sm text-indigo-400 shrink-0 mt-0.5">tips_and_updates</span>
                                                    <span>{tip}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                                        <h4 className="font-semibold text-[#f9fafb] mb-2 flex items-center gap-1.5"><span className="material-symbols-outlined text-sm text-orange-400">monitoring</span> Market Salary Data</h4>
                                        <p className="text-xs text-[#9ca3af] mb-4">Based on similar roles via AI Analysis</p>

                                        <div className="text-center py-4 bg-black rounded-lg mb-2 border border-white/10 shadow-inner">
                                            <p className="text-xl font-bold text-[#f9fafb]">
                                                {aiInsights.minSalary} - {aiInsights.maxSalary}
                                            </p>
                                        </div>
                                        
                                        <div className="mt-4 text-center">
                                            <p className="text-[10px] text-[#9ca3af] bg-gray-700/50 max-w-fit mx-auto px-2 py-1 rounded-full border border-gray-600/50">Location: {aiInsights.location}</p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full text-center py-10">
                                    <div className="w-16 h-16 bg-indigo-900/20 rounded-full flex items-center justify-center mb-4 ring-4 ring-indigo-900/10">
                                        <span className="material-symbols-outlined text-indigo-400 text-3xl">model_training</span>
                                    </div>
                                    <p className="text-sm font-bold text-[#f9fafb] mb-2">Ready to assist</p>
                                    <p className="text-xs text-[#9ca3af] leading-relaxed max-w-[200px]">Fill in the job details and click "Enhance with AI" to get personalized ATS tips and market salary data.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Footer Controls */}
                <div className="p-5 border-t border-white/10 bg-white/5 flex items-center justify-between shrink-0 rounded-b-2xl">
                    <div className="flex-1 mr-4">
                        {error && (
                            <div className="bg-red-900/20 border border-red-800/50 text-red-400 px-4 py-2 rounded-lg text-sm font-medium animate-pulse">
                                {error}
                            </div>
                        )}
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={onClose}
                            className="px-6 py-2.5 rounded-xl border border-white/10 text-[#9ca3af] font-medium hover:bg-white/5 hover:text-[#f9fafb] transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={submitting}
                            className="px-8 py-2.5 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold shadow-lg shadow-[#2563eb]/30 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {submitting ? 'Posting Job...' : 'Post Job Now'}
                            {!submitting && <span className="material-symbols-outlined text-sm">send</span>}
                        </button>
                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default EmployerJobPostModal;
