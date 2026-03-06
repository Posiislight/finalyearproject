import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PlanSelection = () => {
    const navigate = useNavigate();
    const [selectedPlan, setSelectedPlan] = useState('pro');
    const [isAnnual, setIsAnnual] = useState(false);

    const plans = [
        {
            id: 'starter',
            name: 'Starter',
            price: 'Free',
            period: 'forever',
            description: 'Perfect for small businesses just getting started with hiring.',
            features: [
                '1 active job post',
                'Basic candidate matching',
                'Email support',
                'Standard company profile',
                'Up to 50 applicants/month',
            ],
            cta: 'Get Started',
            popular: false,
        },
        {
            id: 'pro',
            name: 'Professional',
            price: '$79',
            period: '/month',
            description: 'For growing teams that need advanced tools and more reach.',
            features: [
                '10 active job posts',
                'AI-powered candidate matching',
                'Priority support',
                'Enhanced company profile',
                'Unlimited applicants',
                'ATS optimization tools',
                'Salary benchmarking data',
                'Custom branding',
            ],
            cta: 'Start Free Trial',
            popular: true,
        },
        {
            id: 'enterprise',
            name: 'Enterprise',
            price: '$249',
            period: '/month',
            description: 'Full platform access for large organizations with complex needs.',
            features: [
                'Unlimited job posts',
                'Advanced AI matching & ranking',
                'Dedicated account manager',
                'White-label company profile',
                'Unlimited applicants',
                'Full ATS integration',
                'Advanced analytics & reporting',
                'API access',
                'Custom onboarding',
                'Team collaboration tools',
            ],
            cta: 'Contact Sales',
            popular: false,
        },
    ];

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
                    {/* Step 3 - Done */}
                    <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-[#22c55e] flex items-center justify-center shrink-0 ring-4 ring-[#1F2937]">
                            <span className="material-symbols-outlined text-white text-lg font-bold">check</span>
                        </div>
                        <div className="pt-1">
                            <p className="text-sm font-semibold text-[#f9fafb]">First Job Post</p>
                            <p className="text-xs text-[#9ca3af]">Listing created</p>
                        </div>
                    </div>
                    {/* Step 4 - Active */}
                    <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-[#2563eb] flex items-center justify-center shrink-0 ring-4 ring-[#2563eb]/20 shadow-lg shadow-[#2563eb]/30">
                            <span className="text-white text-sm font-bold">4</span>
                        </div>
                        <div className="pt-1">
                            <p className="text-sm font-bold text-[#2563eb]">Plan Selection</p>
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
                        <h2 className="text-lg font-bold text-[#f9fafb]">Choose Your Plan</h2>
                        <p className="text-sm text-[#9ca3af]">Select the plan that best fits your hiring needs. Upgrade or downgrade anytime.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button onClick={() => alert("Draft saved locally. (Implementation pending)")} className="text-sm font-medium text-[#9ca3af] hover:text-[#f9fafb]">Save as Draft</button>
                        <div className="h-8 w-8 rounded-full bg-indigo-900/50 text-indigo-300 border border-indigo-700/50 flex items-center justify-center text-sm font-bold">TC</div>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-6 lg:p-10 scrollbar-thin">
                    <div className="max-w-5xl mx-auto">
                        {/* Billing Toggle */}
                        <div className="flex items-center justify-center gap-3 mb-10">
                            <span className="text-sm text-[#9ca3af]">Monthly</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" checked={isAnnual} onChange={() => setIsAnnual(!isAnnual)} className="sr-only peer" />
                                <div className="w-11 h-6 bg-gray-700 peer-focus:ring-2 peer-focus:ring-[#2563eb]/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2563eb]"></div>
                            </label>
                            <span className="text-sm text-[#9ca3af]">Annual</span>
                            <span className="bg-green-900/30 text-green-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-green-800/50">Save 20%</span>
                        </div>

                        {/* Plan Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {plans.map((plan) => (
                                <div
                                    key={plan.id}
                                    onClick={() => setSelectedPlan(plan.id)}
                                    className={`relative bg-[#1F2937] rounded-2xl border-2 p-6 cursor-pointer transition-all duration-200 ${
                                        selectedPlan === plan.id
                                            ? 'border-[#2563eb] ring-1 ring-[#2563eb] shadow-lg shadow-[#2563eb]/10'
                                            : 'border-[#374151] hover:border-gray-500'
                                    } ${plan.popular ? 'md:-translate-y-2' : ''}`}
                                >
                                    {plan.popular && (
                                        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                            <span className="bg-[#2563eb] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">Most Popular</span>
                                        </div>
                                    )}

                                    <div className="mb-6">
                                        <h3 className="text-lg font-bold text-[#f9fafb] mb-1">{plan.name}</h3>
                                        <p className="text-xs text-[#9ca3af] mb-4">{plan.description}</p>
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-3xl font-extrabold text-[#f9fafb]">{plan.price}</span>
                                            {plan.period !== 'forever' && (
                                                <span className="text-sm text-[#9ca3af]">{plan.period}</span>
                                            )}
                                        </div>
                                    </div>

                                    <ul className="space-y-3 mb-6">
                                        {plan.features.map((feature, i) => (
                                            <li key={i} className="flex items-start gap-2 text-sm">
                                                <span className="material-symbols-outlined text-[#22c55e] text-base mt-0.5 shrink-0">check_circle</span>
                                                <span className="text-[#9ca3af]">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <button
                                        onClick={() => alert(`Selected ${plan.name} plan. Billing integration pending.`)}
                                        className={`w-full py-2.5 rounded-lg font-semibold text-sm transition-all ${
                                            selectedPlan === plan.id
                                                ? 'bg-[#2563eb] hover:bg-[#1d4ed8] text-white shadow-lg shadow-[#2563eb]/25'
                                                : 'bg-gray-800 hover:bg-gray-700 text-[#f9fafb] border border-gray-700'
                                        }`}
                                    >
                                        {plan.cta}
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Compare Features Link */}
                        <div className="text-center mt-6">
                            <button onClick={() => alert("Detailed feature comparison coming soon")} className="text-sm text-[#2563eb] hover:underline font-medium inline-flex items-center gap-1">
                                <span className="material-symbols-outlined text-sm">compare_arrows</span>
                                Compare all features
                            </button>
                        </div>

                        {/* Trust Badges */}
                        <div className="flex items-center justify-center gap-8 mt-10 pt-8 border-t border-[#374151]">
                            <div className="flex items-center gap-2 text-[#9ca3af] text-xs">
                                <span className="material-symbols-outlined text-base">lock</span>
                                SSL Encrypted
                            </div>
                            <div className="flex items-center gap-2 text-[#9ca3af] text-xs">
                                <span className="material-symbols-outlined text-base">verified</span>
                                SOC 2 Compliant
                            </div>
                            <div className="flex items-center gap-2 text-[#9ca3af] text-xs">
                                <span className="material-symbols-outlined text-base">replay</span>
                                14-day free trial
                            </div>
                            <div className="flex items-center gap-2 text-[#9ca3af] text-xs">
                                <span className="material-symbols-outlined text-base">credit_card_off</span>
                                Cancel anytime
                            </div>
                        </div>

                        {/* Navigation Buttons */}
                        <div className="flex justify-between items-center pt-8 pb-12">
                            <button
                                onClick={() => navigate('/employer-job-post')}
                                className="px-6 py-3 rounded-xl border border-[#374151] text-[#f9fafb] font-semibold hover:bg-gray-800 transition-colors flex items-center gap-2"
                            >
                                <span className="material-symbols-outlined text-sm">arrow_back</span>
                                Back
                            </button>
                            <button 
                                onClick={() => navigate('/employer-dashboard')}
                                className="px-8 py-3 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold shadow-lg shadow-[#2563eb]/30 transition-all flex items-center gap-2"
                            >
                                Complete Setup
                                <span className="material-symbols-outlined text-sm">check</span>
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default PlanSelection;
