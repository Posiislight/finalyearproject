import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import JobSeekerBottomNav from './JobSeekerBottomNav';

const JobDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [saved, setSaved] = useState(false);
    const [showApplyModal, setShowApplyModal] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    // Mock job data - in production this would come from an API
    const jobs = {
        1: {
            id: 1, title: 'Senior Frontend Developer', company: 'TechFlow Systems', logo: 'TF', logoColor: '#2563eb',
            location: 'San Francisco, CA', remote: 'Remote', salary: '$120k – $160k', matchScore: 94,
            type: 'Full-time', posted: '2 days ago', applicants: 48,
            requirements: ['5+ years React/TypeScript', 'Experience with design systems', 'CI/CD pipeline knowledge', 'Agile methodology', 'REST & GraphQL APIs'],
            matchReason: 'Your React expertise and 6 years of frontend experience make you a strong match. Your portfolio projects align with their tech stack.',
            description: 'We are looking for a Senior Frontend Developer to join our growing engineering team. You will be responsible for building and maintaining our customer-facing web applications, collaborating closely with designers and backend engineers to deliver exceptional user experiences. You\'ll help define our frontend architecture and mentor junior developers.',
            responsibilities: [
                'Build and maintain React-based web applications',
                'Collaborate with UX designers to implement pixel-perfect interfaces',
                'Write clean, maintainable, and well-tested code',
                'Participate in code reviews and architectural discussions',
                'Mentor junior developers and contribute to engineering culture'
            ],
            benefits: [
                { icon: 'health_and_safety', label: 'Health Insurance', desc: 'Full medical, dental & vision' },
                { icon: 'savings', label: 'Equity Package', desc: 'Competitive stock options' },
                { icon: 'laptop_mac', label: 'Remote Friendly', desc: 'Work from anywhere' },
                { icon: 'school', label: 'Learning Budget', desc: '$2,000/year for courses' },
                { icon: 'fitness_center', label: 'Wellness', desc: 'Gym membership included' },
                { icon: 'flight', label: 'Unlimited PTO', desc: 'Flexible time off policy' },
            ],
            companyInfo: {
                about: 'TechFlow Systems is a leading SaaS company building the next generation of workflow automation tools. Founded in 2019, we serve over 10,000 businesses globally.',
                size: '201-500 employees',
                industry: 'Technology',
                founded: '2019',
                website: 'techflowsystems.com'
            }
        },
        2: {
            id: 2, title: 'Product Designer', company: 'Orbital Inc.', logo: 'OI', logoColor: '#7c3aed',
            location: 'New York, NY', remote: 'Hybrid', salary: '$100k – $140k', matchScore: 87,
            type: 'Full-time', posted: '5 hours ago', applicants: 23,
            requirements: ['Figma & prototyping tools', 'User research experience', 'Design system creation', 'Cross-functional collaboration', '3+ years product design'],
            matchReason: 'Your UX skills and design portfolio closely match Orbital\'s visual design needs. Their team values the collaborative approach you showcase.',
            description: 'Orbital Inc. is seeking a talented Product Designer to shape the future of our platform. You will own the end-to-end design process from research to polished UI, working alongside product managers and engineers to create delightful experiences for our users.',
            responsibilities: [
                'Lead end-to-end design for key product features',
                'Conduct user research and usability testing',
                'Create and maintain our design system',
                'Produce wireframes, prototypes, and high-fidelity designs',
                'Present design rationale to stakeholders'
            ],
            benefits: [
                { icon: 'health_and_safety', label: 'Health Insurance', desc: 'Full medical & dental' },
                { icon: 'savings', label: '401(k) Match', desc: 'Up to 4% employer match' },
                { icon: 'home_work', label: 'Hybrid Work', desc: '3 days office, 2 remote' },
                { icon: 'school', label: 'Conference Budget', desc: 'Attend 2 conferences/year' },
                { icon: 'child_care', label: 'Parental Leave', desc: '16 weeks paid leave' },
                { icon: 'restaurant', label: 'Free Meals', desc: 'Catered lunch daily' },
            ],
            companyInfo: {
                about: 'Orbital Inc. builds collaborative tools for creative teams. With a focus on intuitive design, our products are used by design teams at Fortune 500 companies worldwide.',
                size: '51-200 employees',
                industry: 'Design Software',
                founded: '2021',
                website: 'orbital.io'
            }
        },
        3: {
            id: 3, title: 'Full Stack Engineer', company: 'NexGen Labs', logo: 'NL', logoColor: '#059669',
            location: 'Austin, TX', remote: 'On-site', salary: '$130k – $175k', matchScore: 91,
            type: 'Full-time', posted: '1 day ago', applicants: 67,
            requirements: ['Node.js & Python backend', 'React or Vue frontend', 'PostgreSQL / MongoDB', 'Cloud infrastructure (AWS)', 'System design experience'],
            matchReason: 'Your full-stack experience with Node.js and React directly matches their requirements. Your AWS certifications are a strong differentiator.',
            description: 'NexGen Labs is hiring a Full Stack Engineer to build scalable web applications from the ground up. You will work across the entire stack — from crafting responsive UIs to designing efficient APIs and managing cloud infrastructure. This is a high-impact role in a fast-growing startup.',
            responsibilities: [
                'Design and implement full-stack features end-to-end',
                'Build RESTful APIs and microservices',
                'Optimize application performance and scalability',
                'Manage AWS infrastructure and CI/CD pipelines',
                'Collaborate with cross-functional teams on product roadmap'
            ],
            benefits: [
                { icon: 'health_and_safety', label: 'Health Insurance', desc: 'Premium coverage for family' },
                { icon: 'savings', label: 'Equity', desc: 'Early-stage stock options' },
                { icon: 'apartment', label: 'Office Perks', desc: 'Modern downtown office' },
                { icon: 'school', label: 'Learning', desc: 'Unlimited Udemy access' },
                { icon: 'fitness_center', label: 'Wellness Stipend', desc: '$150/month wellness' },
                { icon: 'commute', label: 'Commuter', desc: 'Transit pass provided' },
            ],
            companyInfo: {
                about: 'NexGen Labs is an early-stage startup building AI-powered developer tools. Backed by top-tier VCs, we are on a mission to make developers 10x more productive.',
                size: '11-50 employees',
                industry: 'Developer Tools',
                founded: '2023',
                website: 'nexgenlabs.dev'
            }
        }
    };

    const job = jobs[id] || jobs[1];

    const handleApply = () => {
        setShowApplyModal(true);
    };

    const handleConfirmApply = () => {
        setShowApplyModal(false);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 2500);
    };

    return (
        <div className="bg-[#111827] text-[#f9fafb] font-['DM_Sans',sans-serif] antialiased min-h-screen flex flex-col">
            {/* Sticky Top Bar */}
            <header className="sticky top-0 z-30 flex items-center justify-between px-5 py-3 bg-[#111827]/90 backdrop-blur-md border-b border-[#374151]/50">
                <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-[#1F2937] border border-[#374151] flex items-center justify-center hover:bg-gray-800 transition-colors">
                    <span className="material-symbols-outlined text-[#9ca3af] text-xl">arrow_back</span>
                </button>
                <h1 className="text-sm font-bold text-[#f9fafb] truncate max-w-[200px]">Job Details</h1>
                <div className="flex items-center gap-2">
                    <button onClick={() => setSaved(!saved)} className="w-10 h-10 rounded-full bg-[#1F2937] border border-[#374151] flex items-center justify-center hover:bg-gray-800 transition-colors">
                        <span className={`material-symbols-outlined text-xl ${saved ? 'text-[#2563eb]' : 'text-[#9ca3af]'}`} style={saved ? { fontVariationSettings: "'FILL' 1" } : {}}>bookmark</span>
                    </button>
                    <button 
                        onClick={() => {
                            if (navigator.share) {
                                navigator.share({ title: job.title, text: `Check out this job at ${job.company}`, url: window.location.href });
                            } else {
                                navigator.clipboard.writeText(window.location.href);
                                alert("Link copied to clipboard!");
                            }
                        }}
                        className="w-10 h-10 rounded-full bg-[#1F2937] border border-[#374151] flex items-center justify-center hover:bg-gray-800 transition-colors"
                    >
                        <span className="material-symbols-outlined text-[#9ca3af] text-xl">share</span>
                    </button>
                </div>
            </header>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto pb-28">
                {/* Hero Section */}
                <div className="bg-gradient-to-br from-[#2563eb]/15 via-[#7c3aed]/10 to-transparent px-5 pt-6 pb-8">
                    <div className="flex items-start gap-4">
                        <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-extrabold text-xl shadow-lg shrink-0" style={{ backgroundColor: job.logoColor }}>
                            {job.logo}
                        </div>
                        <div className="flex-1 min-w-0">
                            <h2 className="text-2xl font-bold text-[#f9fafb] leading-tight">{job.title}</h2>
                            <p className="text-sm text-[#9ca3af] mt-1">{job.company}</p>
                            <div className="flex flex-wrap gap-2 mt-3">
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#1F2937] border border-[#374151] text-[#9ca3af] text-xs font-medium">
                                    <span className="material-symbols-outlined text-xs">location_on</span>{job.location}
                                </span>
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#1F2937] border border-[#374151] text-[#9ca3af] text-xs font-medium">
                                    <span className="material-symbols-outlined text-xs">laptop_mac</span>{job.remote}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Key Stats Row */}
                    <div className="grid grid-cols-4 gap-3 mt-6">
                        <div className="bg-[#1F2937] border border-[#374151] rounded-xl p-3 text-center">
                            <p className="text-[#22c55e] font-extrabold text-lg">{job.matchScore}%</p>
                            <p className="text-[9px] text-[#9ca3af] font-medium mt-0.5">AI Match</p>
                        </div>
                        <div className="bg-[#1F2937] border border-[#374151] rounded-xl p-3 text-center">
                            <p className="text-[#f9fafb] font-extrabold text-lg">{job.salary.split('–')[0].trim()}</p>
                            <p className="text-[9px] text-[#9ca3af] font-medium mt-0.5">Min Salary</p>
                        </div>
                        <div className="bg-[#1F2937] border border-[#374151] rounded-xl p-3 text-center">
                            <p className="text-[#f9fafb] font-extrabold text-lg">{job.type}</p>
                            <p className="text-[9px] text-[#9ca3af] font-medium mt-0.5">Job Type</p>
                        </div>
                        <div className="bg-[#1F2937] border border-[#374151] rounded-xl p-3 text-center">
                            <p className="text-[#f9fafb] font-extrabold text-lg">{job.applicants}</p>
                            <p className="text-[9px] text-[#9ca3af] font-medium mt-0.5">Applicants</p>
                        </div>
                    </div>
                </div>

                <div className="px-5 space-y-6 mt-2">
                    {/* AI Match Reason */}
                    <div className="bg-[#2563eb]/5 border border-[#2563eb]/20 rounded-2xl p-5">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="material-symbols-outlined text-[#2563eb] text-lg">auto_awesome</span>
                            <span className="text-sm font-bold text-[#2563eb]">Why This Matches You</span>
                        </div>
                        <p className="text-sm text-[#9ca3af] leading-relaxed">{job.matchReason}</p>
                    </div>

                    {/* Job Description */}
                    <section>
                        <h3 className="text-base font-bold text-[#f9fafb] mb-3 flex items-center gap-2">
                            <span className="material-symbols-outlined text-[#2563eb] text-xl">description</span>
                            About This Role
                        </h3>
                        <p className="text-sm text-[#9ca3af] leading-relaxed">{job.description}</p>
                    </section>

                    {/* Responsibilities */}
                    <section>
                        <h3 className="text-base font-bold text-[#f9fafb] mb-3 flex items-center gap-2">
                            <span className="material-symbols-outlined text-[#2563eb] text-xl">task_alt</span>
                            Responsibilities
                        </h3>
                        <div className="space-y-2.5">
                            {job.responsibilities.map((item, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <span className="material-symbols-outlined text-[#2563eb] text-sm mt-0.5">arrow_right</span>
                                    <span className="text-sm text-[#9ca3af]">{item}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Requirements */}
                    <section>
                        <h3 className="text-base font-bold text-[#f9fafb] mb-3 flex items-center gap-2">
                            <span className="material-symbols-outlined text-[#2563eb] text-xl">checklist</span>
                            Requirements
                        </h3>
                        <div className="space-y-2.5">
                            {job.requirements.map((req, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <span className="material-symbols-outlined text-[#22c55e] text-sm mt-0.5">check_circle</span>
                                    <span className="text-sm text-[#f9fafb]">{req}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Benefits & Perks */}
                    <section>
                        <h3 className="text-base font-bold text-[#f9fafb] mb-3 flex items-center gap-2">
                            <span className="material-symbols-outlined text-[#2563eb] text-xl">redeem</span>
                            Benefits & Perks
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                            {job.benefits.map((benefit, i) => (
                                <div key={i} className="bg-[#1F2937] border border-[#374151] rounded-xl p-4 hover:border-[#2563eb]/30 transition-colors">
                                    <span className="material-symbols-outlined text-[#2563eb] text-xl mb-2 block">{benefit.icon}</span>
                                    <p className="text-sm font-semibold text-[#f9fafb]">{benefit.label}</p>
                                    <p className="text-xs text-[#9ca3af] mt-0.5">{benefit.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* About the Company */}
                    <section className="pb-6">
                        <h3 className="text-base font-bold text-[#f9fafb] mb-3 flex items-center gap-2">
                            <span className="material-symbols-outlined text-[#2563eb] text-xl">apartment</span>
                            About {job.company}
                        </h3>
                        <div className="bg-[#1F2937] border border-[#374151] rounded-2xl p-5 space-y-4">
                            <p className="text-sm text-[#9ca3af] leading-relaxed">{job.companyInfo.about}</p>
                            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-[#374151]">
                                <div>
                                    <p className="text-[10px] text-[#9ca3af] uppercase tracking-wider font-semibold">Industry</p>
                                    <p className="text-sm text-[#f9fafb] font-medium mt-0.5">{job.companyInfo.industry}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] text-[#9ca3af] uppercase tracking-wider font-semibold">Company Size</p>
                                    <p className="text-sm text-[#f9fafb] font-medium mt-0.5">{job.companyInfo.size}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] text-[#9ca3af] uppercase tracking-wider font-semibold">Founded</p>
                                    <p className="text-sm text-[#f9fafb] font-medium mt-0.5">{job.companyInfo.founded}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] text-[#9ca3af] uppercase tracking-wider font-semibold">Website</p>
                                    <p className="text-sm text-[#2563eb] font-medium mt-0.5">{job.companyInfo.website}</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Posted Info */}
                    <div className="flex items-center gap-2 text-xs text-[#9ca3af] pb-8">
                        <span className="material-symbols-outlined text-sm">schedule</span>
                        Posted {job.posted} · {job.applicants} applicants
                    </div>
                </div>
            </div>

            {/* Sticky Bottom CTA */}
            <div className="fixed bottom-[56px] left-0 right-0 z-20 bg-gradient-to-t from-[#111827] via-[#111827] to-[#111827]/0 pt-6 pb-4 px-5">
                <div className="flex items-center gap-3 max-w-lg mx-auto">
                    <button
                        onClick={() => setSaved(!saved)}
                        className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-all shrink-0 ${saved ? 'bg-[#2563eb]/10 border-[#2563eb]/30 text-[#2563eb]' : 'bg-[#1F2937] border-[#374151] text-[#9ca3af] hover:bg-gray-800'}`}
                    >
                        <span className="material-symbols-outlined text-xl" style={saved ? { fontVariationSettings: "'FILL' 1" } : {}}>bookmark</span>
                    </button>
                    <button
                        onClick={handleApply}
                        className="flex-1 h-12 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold text-sm shadow-lg shadow-[#2563eb]/30 transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
                    >
                        <span className="material-symbols-outlined text-lg">send</span>
                        Apply Now
                    </button>
                </div>
            </div>

            {/* Apply Confirmation Modal */}
            {showApplyModal && (
                <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm" onClick={() => setShowApplyModal(false)}>
                    <div className="w-full max-w-lg bg-[#1F2937] border-t border-[#374151] rounded-t-3xl p-6 space-y-5" onClick={e => e.stopPropagation()}>
                        <div className="w-10 h-1 bg-[#374151] rounded-full mx-auto"></div>
                        <div className="text-center">
                            <h3 className="text-lg font-bold text-[#f9fafb]">Apply to {job.title}?</h3>
                            <p className="text-sm text-[#9ca3af] mt-1">at {job.company}</p>
                        </div>
                        <div className="bg-[#111827] border border-[#374151] rounded-xl p-4">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="material-symbols-outlined text-[#2563eb] text-sm">auto_awesome</span>
                                <span className="text-xs font-bold text-[#2563eb]">AI-Generated Cover Letter</span>
                            </div>
                            <p className="text-xs text-[#9ca3af] leading-relaxed line-clamp-3">
                                Dear Hiring Manager, I am excited to apply for the {job.title} position at {job.company}. With my extensive experience and passion for building exceptional products, I believe I would be a valuable addition to your team...
                            </p>
                            <button onClick={() => alert("Full cover letter preview is an upcoming Premium feature.")} className="text-xs text-[#2563eb] mt-2 hover:underline">Preview full letter →</button>
                        </div>
                        <div className="bg-[#111827] border border-[#374151] rounded-xl p-4 flex items-center gap-3">
                            <div className="w-10 h-12 rounded-lg bg-[#2563eb]/10 border border-[#2563eb]/30 flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined text-[#2563eb] text-lg">description</span>
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-[#f9fafb]">Alex_Johnson_Resume.pdf</p>
                                <p className="text-xs text-[#9ca3af]">AI-optimized for this role · ATS Score: 92%</p>
                            </div>
                            <span className="material-symbols-outlined text-[#22c55e] text-sm">verified</span>
                        </div>
                        <div className="flex gap-3">
                            <button onClick={() => setShowApplyModal(false)} className="flex-1 py-3 rounded-xl border border-[#374151] text-[#9ca3af] hover:text-[#f9fafb] hover:bg-gray-800 text-sm font-semibold transition-colors">
                                Customize First
                            </button>
                            <button onClick={handleConfirmApply} className="flex-1 py-3 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-sm font-semibold transition-all shadow-lg shadow-[#2563eb]/30 flex items-center justify-center gap-2">
                                <span className="material-symbols-outlined text-sm">send</span>
                                Confirm & Apply
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Success Animation */}
            {showSuccess && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-20 h-20 rounded-full bg-[#22c55e]/20 border-2 border-[#22c55e] flex items-center justify-center">
                            <span className="material-symbols-outlined text-[#22c55e] text-4xl">check</span>
                        </div>
                        <h3 className="text-xl font-bold text-[#f9fafb]">Application Sent! 🎉</h3>
                        <p className="text-sm text-[#9ca3af]">Good luck with {job.company}!</p>
                    </div>
                </div>
            )}

            {/* Bottom Nav */}
            <JobSeekerBottomNav />
        </div>
    );
};

export default JobDetailPage;
