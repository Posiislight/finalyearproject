import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { jobSeekerService } from './services/jobSeekerService';

const STEPS = [
    { label: 'Personal Info', desc: 'Basic details', icon: 'person' },
    { label: 'Your Skills', desc: 'What you know', icon: 'psychology' },
    { label: 'Experience', desc: 'Work history', icon: 'work' },
];

const JobSeekerOnboarding = () => {
    const navigate = useNavigate();

    // Path choice: null = not chosen, 'resume' = upload resume, 'manual' = step by step
    const [path, setPath] = useState(null);
    const [step, setStep] = useState(0);
    const [saving, setSaving] = useState(false);

    // Resume path state
    const [resumeFile, setResumeFile] = useState(null);
    const [parsing, setParsing] = useState(false);
    const [parseError, setParseError] = useState('');
    const [parsedData, setParsedData] = useState(null);
    const resumeInputRef = useRef(null);

    // Step 1: Personal Info
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [bio, setBio] = useState('');
    const [location, setLocation] = useState('');
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(null);
    const fileInputRef = useRef(null);

    // Step 2: Skills
    const [skills, setSkills] = useState([]);
    const [newSkillName, setNewSkillName] = useState('');
    const [newSkillLevel, setNewSkillLevel] = useState(70);

    // Step 3: Experience
    const [experiences, setExperiences] = useState([]);
    const [expForm, setExpForm] = useState({
        role: '', company: '', start_date: '', end_date: '', is_current: false,
    });

    const handlePhotoSelect = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setProfilePhoto(file);
            setPhotoPreview(URL.createObjectURL(file));
        }
    };

    const addSkill = () => {
        const name = newSkillName.trim();
        if (!name || skills.find(s => s.name.toLowerCase() === name.toLowerCase())) return;
        setSkills(prev => [...prev, { name, level: newSkillLevel }]);
        setNewSkillName('');
        setNewSkillLevel(70);
    };

    const removeSkill = (name) => setSkills(prev => prev.filter(s => s.name !== name));

    const addExperience = () => {
        if (!expForm.role.trim() || !expForm.company.trim() || !expForm.start_date) return;
        setExperiences(prev => [...prev, { ...expForm }]);
        setExpForm({ role: '', company: '', start_date: '', end_date: '', is_current: false });
    };

    const removeExperience = (index) => setExperiences(prev => prev.filter((_, i) => i !== index));

    // --- Resume path: upload and parse ---
    const handleResumeUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setResumeFile(file);
        setParsing(true);
        setParseError('');
        try {
            const data = await jobSeekerService.parseResume(file);
            setParsedData(data);
            // Pre-fill fields
            setFirstName(data.first_name || '');
            setLastName(data.last_name || '');
            setBio(data.bio || '');
            setLocation(data.location || '');
            setSkills((data.skills || []).map(s => ({ name: s.name, level: s.level || 70 })));
            setExperiences((data.experiences || []).map(exp => ({
                role: exp.role || '',
                company: exp.company || '',
                start_date: exp.start_date || '',
                end_date: exp.end_date || '',
                is_current: exp.is_current || false,
            })));
        } catch (err) {
            console.error('Resume parse error:', err);
            setParseError('Could not parse your resume. Try a different file or use the manual flow.');
        } finally {
            setParsing(false);
        }
    };

    const handleSaveParsedData = async () => {
        setSaving(true);
        try {
            await jobSeekerService.updateProfile({
                first_name: firstName,
                last_name: lastName,
                job_seeker_profile: { bio, location },
            });
            if (profilePhoto) await jobSeekerService.uploadProfilePicture(profilePhoto);
            if (skills.length > 0) await Promise.all(skills.map(s => jobSeekerService.addSkill(s.name, s.level)));
            if (experiences.length > 0) {
                await Promise.all(experiences.map(e => jobSeekerService.addExperience({
                    role: e.role, company: e.company, start_date: e.start_date,
                    end_date: e.is_current ? null : e.end_date, is_current: e.is_current,
                })));
            }
            navigate('/jobseeker-home');
        } catch (err) {
            console.error('Save error:', err);
        } finally {
            setSaving(false);
        }
    };

    // --- Manual path: step by step ---
    const handleContinue = async () => {
        setSaving(true);
        try {
            if (step === 0) {
                await jobSeekerService.updateProfile({
                    first_name: firstName,
                    last_name: lastName,
                    job_seeker_profile: { bio, location },
                });
                if (profilePhoto) await jobSeekerService.uploadProfilePicture(profilePhoto);
                setStep(1);
            } else if (step === 1) {
                if (skills.length > 0) await Promise.all(skills.map(s => jobSeekerService.addSkill(s.name, s.level)));
                setStep(2);
            } else if (step === 2) {
                if (experiences.length > 0) {
                    await Promise.all(experiences.map(e => jobSeekerService.addExperience({
                        role: e.role, company: e.company, start_date: e.start_date,
                        end_date: e.is_current ? null : e.end_date, is_current: e.is_current,
                    })));
                }
                navigate('/jobseeker-home');
            }
        } catch (err) {
            console.error('Onboarding save error:', err);
        } finally {
            setSaving(false);
        }
    };

    const canProceed = () => {
        if (step === 0) return firstName.trim() && lastName.trim();
        return true;
    };

    const stepTitles = [
        { title: "Welcome! Let's set up your profile", subtitle: 'Tell us about yourself so employers can find you.' },
        { title: 'What skills do you have?', subtitle: 'Add your top skills to get matched with the right jobs.' },
        { title: 'Add your work experience', subtitle: 'Share your work history. You can always update this later.' },
    ];

    const buttonLabels = ['Continue to Skills', 'Continue to Experience', 'Finish & Find Jobs'];

    // --------------- CHOOSE PATH SCREEN ---------------
    if (path === null) {
        return (
            <div className="bg-[#111827] text-[#f9fafb] font-['DM_Sans',sans-serif] antialiased h-screen flex items-center justify-center p-6">
                <div className="max-w-3xl w-full">
                    {/* Logo */}
                    <div className="flex items-center gap-3 justify-center mb-8">
                        <div className="bg-[#2563eb]/20 rounded-xl p-2.5">
                            <span className="material-symbols-outlined text-[#2563eb] text-4xl">swipe</span>
                        </div>
                        <h1 className="text-3xl font-extrabold tracking-tight text-white">HireFlow</h1>
                    </div>

                    <h2 className="text-2xl font-bold text-center mb-2">How would you like to set up your profile?</h2>
                    <p className="text-[#9ca3af] text-center mb-10 text-sm">Choose the option that works best for you</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Resume Upload Card */}
                        <button
                            onClick={() => setPath('resume')}
                            className="bg-[#1F2937] rounded-2xl border-2 border-[#374151] p-8 text-left hover:border-[#2563eb] hover:shadow-xl hover:shadow-[#2563eb]/10 transition-all group"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-[#2563eb]/10 border border-[#2563eb]/30 flex items-center justify-center mb-5 group-hover:bg-[#2563eb]/20 transition-colors">
                                <span className="material-symbols-outlined text-[#2563eb] text-3xl">upload_file</span>
                            </div>
                            <h3 className="text-lg font-bold text-[#f9fafb] mb-2">Upload Your Resume</h3>
                            <p className="text-sm text-[#9ca3af] mb-4">Upload your PDF resume and our AI will automatically extract your details, skills, and experience.</p>
                            <div className="flex flex-wrap gap-2">
                                <span className="text-[10px] px-2 py-1 rounded-full bg-green-900/20 text-green-400 border border-green-800/30 font-medium">⚡ Fastest</span>
                                <span className="text-[10px] px-2 py-1 rounded-full bg-blue-900/20 text-blue-400 border border-blue-800/30 font-medium">🤖 AI-Powered</span>
                            </div>
                        </button>

                        {/* Manual Fill Card */}
                        <button
                            onClick={() => setPath('manual')}
                            className="bg-[#1F2937] rounded-2xl border-2 border-[#374151] p-8 text-left hover:border-[#22c55e] hover:shadow-xl hover:shadow-[#22c55e]/10 transition-all group"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-[#22c55e]/10 border border-[#22c55e]/30 flex items-center justify-center mb-5 group-hover:bg-[#22c55e]/20 transition-colors">
                                <span className="material-symbols-outlined text-[#22c55e] text-3xl">edit_note</span>
                            </div>
                            <h3 className="text-lg font-bold text-[#f9fafb] mb-2">Fill in Manually</h3>
                            <p className="text-sm text-[#9ca3af] mb-4">Step through a guided flow to enter your personal info, skills, and work experience one by one.</p>
                            <div className="flex flex-wrap gap-2">
                                <span className="text-[10px] px-2 py-1 rounded-full bg-purple-900/20 text-purple-400 border border-purple-800/30 font-medium">📝 Step-by-step</span>
                                <span className="text-[10px] px-2 py-1 rounded-full bg-yellow-900/20 text-yellow-400 border border-yellow-800/30 font-medium">🎯 Full control</span>
                            </div>
                        </button>
                    </div>

                    <p className="text-center text-xs text-[#9ca3af] mt-8">
                        <button onClick={() => navigate('/jobseeker-home')} className="hover:text-[#f9fafb] underline">
                            Skip setup for now
                        </button>
                    </p>
                </div>
            </div>
        );
    }

    // --------------- RESUME UPLOAD PATH ---------------
    if (path === 'resume' && !parsedData) {
        return (
            <div className="bg-[#111827] text-[#f9fafb] font-['DM_Sans',sans-serif] antialiased h-screen flex items-center justify-center p-6">
                <div className="max-w-xl w-full">
                    <button onClick={() => setPath(null)} className="flex items-center gap-1 text-sm text-[#9ca3af] hover:text-[#f9fafb] mb-6 transition-colors">
                        <span className="material-symbols-outlined text-lg">arrow_back</span>
                        Back to options
                    </button>

                    <div className="bg-[#1F2937] rounded-2xl border border-[#374151] p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 rounded-xl bg-[#2563eb]/10 border border-[#2563eb]/30 flex items-center justify-center">
                                <span className="material-symbols-outlined text-[#2563eb] text-2xl">upload_file</span>
                            </div>
                            <div>
                                <h2 className="text-xl font-bold">Upload Your Resume</h2>
                                <p className="text-sm text-[#9ca3af]">PDF format, max 5MB</p>
                            </div>
                        </div>

                        {parsing ? (
                            <div className="flex flex-col items-center py-12">
                                <div className="relative mb-6">
                                    <span className="material-symbols-outlined animate-spin text-5xl text-[#2563eb]">progress_activity</span>
                                </div>
                                <h3 className="text-lg font-bold mb-2">AI is reading your resume...</h3>
                                <p className="text-sm text-[#9ca3af] text-center">Extracting your name, skills, experience, and more. This may take 10-20 seconds.</p>
                            </div>
                        ) : (
                            <>
                                <input
                                    type="file"
                                    ref={resumeInputRef}
                                    onChange={handleResumeUpload}
                                    accept=".pdf"
                                    className="hidden"
                                />
                                <div
                                    onClick={() => resumeInputRef.current?.click()}
                                    className="border-2 border-dashed border-[#374151] rounded-xl p-10 text-center cursor-pointer hover:border-[#2563eb]/50 hover:bg-[#2563eb]/5 transition-all group"
                                >
                                    <span className="material-symbols-outlined text-4xl text-[#9ca3af] group-hover:text-[#2563eb] mb-3 transition-colors">cloud_upload</span>
                                    <p className="text-sm font-medium text-[#f9fafb]">Click to upload your resume</p>
                                    <p className="text-xs text-[#9ca3af] mt-1">or drag and drop a PDF file</p>
                                </div>

                                {parseError && (
                                    <div className="mt-4 p-3 rounded-lg bg-red-900/20 border border-red-800/30 text-red-400 text-sm flex items-center gap-2">
                                        <span className="material-symbols-outlined text-lg">error</span>
                                        {parseError}
                                    </div>
                                )}

                                <p className="text-xs text-[#9ca3af] text-center mt-4">
                                    Your resume will be analyzed by AI to auto-fill your profile. You can review and edit everything before saving.
                                </p>
                            </>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    // --------------- RESUME REVIEW (after AI parsed) ---------------
    if (path === 'resume' && parsedData) {
        return (
            <div className="bg-[#111827] text-[#f9fafb] font-['DM_Sans',sans-serif] antialiased h-screen flex flex-col overflow-hidden">
                <header className="flex items-center justify-between px-8 py-4 bg-[#1F2937] border-b border-[#374151] shadow-sm shrink-0">
                    <div>
                        <h2 className="text-lg font-bold text-[#f9fafb]">Review Your Extracted Profile</h2>
                        <p className="text-sm text-[#9ca3af]">AI has filled in the details from your resume. Review and edit as needed.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="bg-green-900/30 text-green-300 text-[10px] font-bold px-2.5 py-1 rounded-full border border-green-800/50 flex items-center gap-1">
                            <span className="material-symbols-outlined text-xs">check_circle</span>
                            AI Extracted
                        </span>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-6 lg:p-10 scrollbar-thin">
                    <div className="max-w-3xl mx-auto space-y-6">
                        {/* Personal Info Card */}
                        <section className="bg-[#1F2937] rounded-2xl border border-[#374151] overflow-hidden shadow-lg">
                            <div className="p-5 border-b border-[#374151] flex items-center gap-2">
                                <span className="material-symbols-outlined text-[#2563eb] text-lg">person</span>
                                <h3 className="text-base font-bold">Personal Information</h3>
                            </div>
                            <div className="p-5 space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-medium text-[#9ca3af] mb-1">First Name</label>
                                        <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)}
                                            className="w-full h-10 rounded-lg bg-gray-800 border border-gray-700 text-[#f9fafb] px-3 text-sm focus:border-[#2563eb] focus:ring focus:ring-[#2563eb]/30 outline-none transition" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-[#9ca3af] mb-1">Last Name</label>
                                        <input type="text" value={lastName} onChange={e => setLastName(e.target.value)}
                                            className="w-full h-10 rounded-lg bg-gray-800 border border-gray-700 text-[#f9fafb] px-3 text-sm focus:border-[#2563eb] focus:ring focus:ring-[#2563eb]/30 outline-none transition" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-[#9ca3af] mb-1">Professional Title</label>
                                    <input type="text" value={bio} onChange={e => setBio(e.target.value)}
                                        className="w-full h-10 rounded-lg bg-gray-800 border border-gray-700 text-[#f9fafb] px-3 text-sm focus:border-[#2563eb] focus:ring focus:ring-[#2563eb]/30 outline-none transition" />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-[#9ca3af] mb-1">Location</label>
                                    <input type="text" value={location} onChange={e => setLocation(e.target.value)}
                                        className="w-full h-10 rounded-lg bg-gray-800 border border-gray-700 text-[#f9fafb] px-3 text-sm focus:border-[#2563eb] focus:ring focus:ring-[#2563eb]/30 outline-none transition" />
                                </div>
                            </div>
                        </section>

                        {/* Skills Card */}
                        <section className="bg-[#1F2937] rounded-2xl border border-[#374151] overflow-hidden shadow-lg">
                            <div className="p-5 border-b border-[#374151] flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-[#2563eb] text-lg">psychology</span>
                                    <h3 className="text-base font-bold">Skills ({skills.length})</h3>
                                </div>
                            </div>
                            <div className="p-5 space-y-2">
                                {skills.map(skill => (
                                    <div key={skill.name} className="flex items-center gap-3 bg-gray-800 rounded-lg border border-gray-700 px-3 py-2">
                                        <span className="text-sm font-medium text-[#f9fafb] flex-1">{skill.name}</span>
                                        <div className="w-24 bg-gray-700 rounded-full h-1.5">
                                            <div className="bg-[#2563eb] h-1.5 rounded-full" style={{ width: `${skill.level}%` }} />
                                        </div>
                                        <span className="text-xs text-[#9ca3af] w-8 text-right">{skill.level}%</span>
                                        <button onClick={() => removeSkill(skill.name)} className="text-gray-500 hover:text-red-400">
                                            <span className="material-symbols-outlined text-sm">close</span>
                                        </button>
                                    </div>
                                ))}
                                {skills.length === 0 && <p className="text-sm text-[#9ca3af]">No skills extracted. You can add them later.</p>}
                            </div>
                        </section>

                        {/* Experience Card */}
                        <section className="bg-[#1F2937] rounded-2xl border border-[#374151] overflow-hidden shadow-lg">
                            <div className="p-5 border-b border-[#374151] flex items-center gap-2">
                                <span className="material-symbols-outlined text-[#2563eb] text-lg">work</span>
                                <h3 className="text-base font-bold">Experience ({experiences.length})</h3>
                            </div>
                            <div className="p-5 space-y-3">
                                {experiences.map((exp, i) => (
                                    <div key={i} className="flex items-start gap-3 bg-gray-800 rounded-lg border border-gray-700 px-4 py-3">
                                        <div className="w-9 h-9 rounded-lg bg-indigo-900/30 border border-indigo-800/40 flex items-center justify-center shrink-0 mt-0.5">
                                            <span className="material-symbols-outlined text-indigo-300 text-base">work</span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-semibold text-[#f9fafb]">{exp.role}</p>
                                            <p className="text-xs text-[#9ca3af]">{exp.company}</p>
                                            <p className="text-[10px] text-gray-500 mt-0.5">{exp.start_date} – {exp.is_current ? 'Present' : exp.end_date}</p>
                                        </div>
                                        <button onClick={() => removeExperience(i)} className="text-gray-500 hover:text-red-400">
                                            <span className="material-symbols-outlined text-sm">close</span>
                                        </button>
                                    </div>
                                ))}
                                {experiences.length === 0 && <p className="text-sm text-[#9ca3af]">No experience extracted.</p>}
                            </div>
                        </section>

                        {/* Save Button */}
                        <div className="flex justify-between items-center pt-4 pb-12">
                            <button
                                onClick={() => { setParsedData(null); setPath(null); }}
                                className="px-6 py-3 rounded-xl border border-[#374151] text-[#9ca3af] hover:text-[#f9fafb] hover:border-gray-500 font-semibold transition-all flex items-center gap-2 text-sm"
                            >
                                <span className="material-symbols-outlined text-sm">arrow_back</span>
                                Start Over
                            </button>
                            <button
                                onClick={handleSaveParsedData}
                                disabled={saving || (!firstName.trim() || !lastName.trim())}
                                className="px-8 py-3 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] disabled:opacity-40 text-white font-bold shadow-lg shadow-[#2563eb]/30 transition-all flex items-center gap-2"
                            >
                                {saving ? (
                                    <><span className="material-symbols-outlined animate-spin text-sm">progress_activity</span> Saving...</>
                                ) : (
                                    <>Save & Continue <span className="material-symbols-outlined text-sm">arrow_forward</span></>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // --------------- MANUAL PATH (3-step flow) ---------------
    return (
        <div className="bg-[#111827] text-[#f9fafb] font-['DM_Sans',sans-serif] antialiased h-screen flex overflow-hidden">
            {/* Sidebar */}
            <aside className="hidden lg:flex flex-col w-64 h-full bg-[#1F2937] border-r border-[#374151] shadow-sm z-10 shrink-0">
                <div className="flex items-center gap-3 p-6 mb-4">
                    <div className="bg-[#2563eb]/20 rounded-xl p-2">
                        <span className="material-symbols-outlined text-[#2563eb] text-3xl">swipe</span>
                    </div>
                    <h1 className="text-xl font-extrabold tracking-tight text-white">
                        HireFlow <span className="text-xs font-normal text-[#9ca3af] block">for Job Seekers</span>
                    </h1>
                </div>
                <div className="px-6 space-y-8 relative">
                    <div className="absolute left-[39px] top-4 bottom-10 w-0.5 bg-gray-700 -z-10"></div>
                    {STEPS.map((s, i) => {
                        const isActive = i === step;
                        const isComplete = i < step;
                        return (
                            <div key={i} className={`flex items-start gap-4 ${!isActive && !isComplete ? 'opacity-50' : ''}`}>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                                    isComplete ? 'bg-[#22c55e] ring-4 ring-[#22c55e]/20 shadow-lg shadow-[#22c55e]/30'
                                        : isActive ? 'bg-[#2563eb] ring-4 ring-[#2563eb]/20 shadow-lg shadow-[#2563eb]/30'
                                            : 'bg-gray-700 border-2 border-gray-600 ring-4 ring-[#1F2937]'
                                }`}>
                                    {isComplete ? (
                                        <span className="material-symbols-outlined text-white text-sm">check</span>
                                    ) : (
                                        <span className={`text-sm font-bold ${isActive ? 'text-white' : 'text-gray-400'}`}>{i + 1}</span>
                                    )}
                                </div>
                                <div className="pt-1">
                                    <p className={`text-sm font-bold ${isActive ? 'text-[#2563eb]' : isComplete ? 'text-[#22c55e]' : 'text-[#f9fafb]'}`}>{s.label}</p>
                                    <p className="text-xs text-[#9ca3af]">{s.desc}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="mt-auto p-6">
                    <div className="bg-gray-800/50 rounded-xl p-4 border border-[#374151]">
                        <div className="flex items-center gap-2 mb-2 text-[#f9fafb] font-semibold text-sm">
                            <span className="material-symbols-outlined text-yellow-500">lightbulb</span>
                            Quick tip
                        </div>
                        <p className="text-xs text-[#9ca3af] mb-1">
                            {step === 0 && "A complete profile gets 3× more views from employers."}
                            {step === 1 && "Add at least 5 skills for the best job matching accuracy."}
                            {step === 2 && "Include your most recent role — employers look at this first."}
                        </p>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col h-full overflow-hidden relative bg-[#111827]">
                <header className="flex items-center justify-between px-8 py-4 bg-[#1F2937] border-b border-[#374151] shadow-sm z-10 shrink-0">
                    <div>
                        <h2 className="text-lg font-bold text-[#f9fafb]">{stepTitles[step].title}</h2>
                        <p className="text-sm text-[#9ca3af]">{stepTitles[step].subtitle}</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate('/jobseeker-home')} className="text-sm font-medium text-[#9ca3af] hover:text-[#f9fafb]">
                            Skip for now
                        </button>
                        <div className="h-8 w-8 rounded-full bg-[#2563eb]/30 text-[#60a5fa] border border-[#2563eb]/50 flex items-center justify-center text-sm font-bold">
                            {(firstName || 'J')[0]}{(lastName || 'S')[0]}
                        </div>
                    </div>
                </header>

                {/* Mobile Step Indicator */}
                <div className="lg:hidden px-6 pt-4 flex gap-2">
                    {STEPS.map((_, i) => (
                        <div key={i} className={`h-1.5 flex-1 rounded-full transition-colors ${i <= step ? 'bg-[#2563eb]' : 'bg-[#374151]'}`} />
                    ))}
                </div>

                <div className="flex-1 overflow-y-auto p-6 lg:p-10 scrollbar-thin">
                    <div className="max-w-3xl mx-auto space-y-8">

                        {/* Step 0: Personal Info */}
                        {step === 0 && (
                            <section className="bg-[#1F2937] rounded-2xl shadow-[0_4px_20px_-2px_rgba(0,0,0,0.3)] border border-[#374151] overflow-hidden">
                                <div className="p-6 border-b border-[#374151] flex justify-between items-start">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="text-lg font-bold text-[#f9fafb]">Personal Details</h3>
                                            <span className="bg-blue-900/30 text-blue-300 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide border border-blue-800/50">Required</span>
                                        </div>
                                        <p className="text-sm text-[#9ca3af]">This information will be visible to employers when you apply.</p>
                                    </div>
                                    <span className="material-symbols-outlined text-gray-600 text-4xl">badge</span>
                                </div>
                                <div className="p-6 space-y-6">
                                    {/* Profile Photo Upload */}
                                    <div className="flex items-center gap-6">
                                        <input type="file" ref={fileInputRef} onChange={handlePhotoSelect} accept="image/*" className="hidden" />
                                        <div onClick={() => fileInputRef.current?.click()}
                                            className="w-20 h-20 rounded-2xl bg-[#2563eb]/10 border-2 border-dashed border-[#2563eb]/30 flex flex-col items-center justify-center cursor-pointer hover:border-[#2563eb] hover:bg-[#2563eb]/5 transition-colors group overflow-hidden">
                                            {photoPreview ? (
                                                <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                                            ) : (
                                                <>
                                                    <span className="material-symbols-outlined text-[#2563eb] text-2xl">add_photo_alternate</span>
                                                    <span className="text-[10px] text-gray-500 mt-0.5">Photo</span>
                                                </>
                                            )}
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-[#f9fafb]">Profile Photo</p>
                                            <p className="text-xs text-[#9ca3af] mt-0.5">PNG, JPG or SVG. Profiles with photos get 40% more responses.</p>
                                            {photoPreview && (
                                                <button onClick={() => { setProfilePhoto(null); setPhotoPreview(null); }} className="text-xs text-red-400 hover:text-red-300 mt-1">Remove photo</button>
                                            )}
                                        </div>
                                    </div>
                                    {/* Name Row */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-[#f9fafb] mb-2">First Name *</label>
                                            <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="e.g., Jane"
                                                className="w-full h-11 rounded-lg bg-gray-800 border border-gray-700 text-[#f9fafb] px-4 text-sm placeholder:text-gray-500 focus:border-[#2563eb] focus:ring focus:ring-[#2563eb]/30 outline-none transition" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-[#f9fafb] mb-2">Last Name *</label>
                                            <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} placeholder="e.g., Doe"
                                                className="w-full h-11 rounded-lg bg-gray-800 border border-gray-700 text-[#f9fafb] px-4 text-sm placeholder:text-gray-500 focus:border-[#2563eb] focus:ring focus:ring-[#2563eb]/30 outline-none transition" />
                                        </div>
                                    </div>
                                    {/* Professional Title */}
                                    <div>
                                        <label className="block text-sm font-medium text-[#f9fafb] mb-2">Professional Title</label>
                                        <div className="relative">
                                            <span className="material-symbols-outlined absolute left-3 top-2.5 text-gray-500 text-xl">work</span>
                                            <input type="text" value={bio} onChange={e => setBio(e.target.value)} placeholder="e.g., Frontend Developer, Data Analyst"
                                                className="w-full h-11 rounded-lg bg-gray-800 border border-gray-700 text-[#f9fafb] pl-10 pr-4 text-sm placeholder:text-gray-500 focus:border-[#2563eb] focus:ring focus:ring-[#2563eb]/30 outline-none transition" />
                                        </div>
                                    </div>
                                    {/* Location */}
                                    <div>
                                        <label className="block text-sm font-medium text-[#f9fafb] mb-2">Location</label>
                                        <div className="relative">
                                            <span className="material-symbols-outlined absolute left-3 top-2.5 text-gray-500 text-xl">location_on</span>
                                            <input type="text" value={location} onChange={e => setLocation(e.target.value)} placeholder="e.g., Lagos, Nigeria"
                                                className="w-full h-11 rounded-lg bg-gray-800 border border-gray-700 text-[#f9fafb] pl-10 pr-4 text-sm placeholder:text-gray-500 focus:border-[#2563eb] focus:ring focus:ring-[#2563eb]/30 outline-none transition" />
                                        </div>
                                    </div>
                                </div>
                            </section>
                        )}

                        {/* Step 1: Skills */}
                        {step === 1 && (
                            <>
                                <section className="bg-[#1F2937] rounded-2xl shadow-[0_4px_20px_-2px_rgba(0,0,0,0.3)] border border-[#374151] overflow-hidden">
                                    <div className="p-6 border-b border-[#374151] flex justify-between items-start">
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="text-lg font-bold text-[#f9fafb]">Add Your Skills</h3>
                                                <span className="bg-green-900/30 text-green-300 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide border border-green-800/50">Recommended</span>
                                            </div>
                                            <p className="text-sm text-[#9ca3af]">Skills help our AI match you with the most relevant jobs.</p>
                                        </div>
                                        <span className="material-symbols-outlined text-gray-600 text-4xl">psychology</span>
                                    </div>
                                    <div className="p-6 space-y-6">
                                        <div>
                                            <label className="block text-sm font-medium text-[#f9fafb] mb-2">Skill Name</label>
                                            <div className="flex gap-3">
                                                <input type="text" value={newSkillName} onChange={e => setNewSkillName(e.target.value)} onKeyDown={e => e.key === 'Enter' && addSkill()}
                                                    placeholder="e.g., React, Python, SQL, Figma"
                                                    className="flex-1 h-11 rounded-lg bg-gray-800 border border-gray-700 text-[#f9fafb] px-4 text-sm placeholder:text-gray-500 focus:border-[#2563eb] focus:ring focus:ring-[#2563eb]/30 outline-none transition" />
                                                <button onClick={addSkill} disabled={!newSkillName.trim()}
                                                    className="px-5 h-11 bg-[#2563eb] hover:bg-[#1d4ed8] disabled:opacity-40 text-white rounded-lg text-sm font-semibold transition-all flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-sm">add</span> Add
                                                </button>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-[#f9fafb] mb-3">Proficiency Level</label>
                                            <div className="flex items-center gap-4 bg-gray-800 rounded-lg border border-gray-700 px-4 py-3">
                                                <span className="text-xs text-gray-500">Beginner</span>
                                                <input type="range" min="10" max="100" value={newSkillLevel} onChange={e => setNewSkillLevel(parseInt(e.target.value))} className="flex-1 accent-[#2563eb]" />
                                                <span className="text-xs text-gray-500">Expert</span>
                                                <span className="text-[#2563eb] font-bold text-sm w-10 text-right">{newSkillLevel}%</span>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                                {skills.length > 0 && (
                                    <section className="bg-[#1F2937] rounded-2xl shadow-[0_4px_20px_-2px_rgba(0,0,0,0.3)] border border-[#374151] overflow-hidden">
                                        <div className="p-6 border-b border-[#374151]">
                                            <h3 className="text-lg font-bold text-[#f9fafb]">Your Skills ({skills.length})</h3>
                                        </div>
                                        <div className="p-6 space-y-3">
                                            {skills.map(skill => (
                                                <div key={skill.name} className="flex items-center gap-4 bg-gray-800 rounded-lg border border-gray-700 px-4 py-3">
                                                    <span className="text-sm font-medium text-[#f9fafb] flex-1">{skill.name}</span>
                                                    <div className="w-28 bg-gray-700 rounded-full h-2">
                                                        <div className="bg-[#2563eb] h-2 rounded-full transition-all" style={{ width: `${skill.level}%` }} />
                                                    </div>
                                                    <span className="text-xs text-[#9ca3af] w-10 text-right">{skill.level}%</span>
                                                    <button onClick={() => removeSkill(skill.name)} className="text-gray-500 hover:text-red-400 transition-colors">
                                                        <span className="material-symbols-outlined text-lg">delete</span>
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                )}
                            </>
                        )}

                        {/* Step 2: Experience */}
                        {step === 2 && (
                            <>
                                <section className="bg-[#1F2937] rounded-2xl shadow-[0_4px_20px_-2px_rgba(0,0,0,0.3)] border border-[#374151] overflow-hidden">
                                    <div className="p-6 border-b border-[#374151] flex justify-between items-start">
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="text-lg font-bold text-[#f9fafb]">Work Experience</h3>
                                                <span className="bg-green-900/30 text-green-300 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide border border-green-800/50">Recommended</span>
                                            </div>
                                            <p className="text-sm text-[#9ca3af]">Add positions you've held. Most recent first.</p>
                                        </div>
                                        <span className="material-symbols-outlined text-gray-600 text-4xl">work_history</span>
                                    </div>
                                    <div className="p-6 space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-[#f9fafb] mb-2">Job Title</label>
                                                <input type="text" value={expForm.role} onChange={e => setExpForm(p => ({ ...p, role: e.target.value }))} placeholder="e.g., Frontend Developer"
                                                    className="w-full h-11 rounded-lg bg-gray-800 border border-gray-700 text-[#f9fafb] px-4 text-sm placeholder:text-gray-500 focus:border-[#2563eb] focus:ring focus:ring-[#2563eb]/30 outline-none transition" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-[#f9fafb] mb-2">Company</label>
                                                <input type="text" value={expForm.company} onChange={e => setExpForm(p => ({ ...p, company: e.target.value }))} placeholder="e.g., Acme Corp"
                                                    className="w-full h-11 rounded-lg bg-gray-800 border border-gray-700 text-[#f9fafb] px-4 text-sm placeholder:text-gray-500 focus:border-[#2563eb] focus:ring focus:ring-[#2563eb]/30 outline-none transition" />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-[#f9fafb] mb-2">Start Date</label>
                                                <input type="date" value={expForm.start_date} onChange={e => setExpForm(p => ({ ...p, start_date: e.target.value }))}
                                                    className="w-full h-11 rounded-lg bg-gray-800 border border-gray-700 text-[#f9fafb] px-4 text-sm focus:border-[#2563eb] focus:ring focus:ring-[#2563eb]/30 outline-none transition" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-[#f9fafb] mb-2">End Date</label>
                                                <input type="date" value={expForm.end_date} onChange={e => setExpForm(p => ({ ...p, end_date: e.target.value }))} disabled={expForm.is_current}
                                                    className="w-full h-11 rounded-lg bg-gray-800 border border-gray-700 text-[#f9fafb] px-4 text-sm focus:border-[#2563eb] focus:ring focus:ring-[#2563eb]/30 outline-none transition disabled:opacity-40" />
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <label className="flex items-center gap-3 cursor-pointer">
                                                <input type="checkbox" checked={expForm.is_current} onChange={e => setExpForm(p => ({ ...p, is_current: e.target.checked, end_date: '' }))}
                                                    className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-[#2563eb] focus:ring-[#2563eb]" />
                                                <span className="text-sm text-[#9ca3af]">I currently work here</span>
                                            </label>
                                            <button onClick={addExperience} disabled={!expForm.role.trim() || !expForm.company.trim() || !expForm.start_date}
                                                className="px-5 py-2.5 bg-[#2563eb] hover:bg-[#1d4ed8] disabled:opacity-40 text-white rounded-lg text-sm font-semibold transition-all flex items-center gap-1">
                                                <span className="material-symbols-outlined text-sm">add</span> Add Experience
                                            </button>
                                        </div>
                                    </div>
                                </section>
                                {experiences.length > 0 && (
                                    <section className="bg-[#1F2937] rounded-2xl shadow-[0_4px_20px_-2px_rgba(0,0,0,0.3)] border border-[#374151] overflow-hidden">
                                        <div className="p-6 border-b border-[#374151]">
                                            <h3 className="text-lg font-bold text-[#f9fafb]">Added Experience ({experiences.length})</h3>
                                        </div>
                                        <div className="p-6 space-y-3">
                                            {experiences.map((exp, i) => (
                                                <div key={i} className="flex items-start gap-4 bg-gray-800 rounded-lg border border-gray-700 px-4 py-4">
                                                    <div className="w-10 h-10 rounded-lg bg-indigo-900/30 border border-indigo-800/40 flex items-center justify-center shrink-0">
                                                        <span className="material-symbols-outlined text-indigo-300 text-lg">work</span>
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-semibold text-[#f9fafb]">{exp.role}</p>
                                                        <p className="text-xs text-[#9ca3af]">{exp.company}</p>
                                                        <p className="text-xs text-gray-500 mt-0.5">{exp.start_date} – {exp.is_current ? 'Present' : exp.end_date}</p>
                                                    </div>
                                                    <button onClick={() => removeExperience(i)} className="text-gray-500 hover:text-red-400 transition-colors">
                                                        <span className="material-symbols-outlined text-lg">delete</span>
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                )}
                            </>
                        )}

                        {/* Navigation */}
                        <div className="flex justify-between items-center pt-4 pb-12">
                            {step > 0 ? (
                                <button onClick={() => setStep(s => s - 1)}
                                    className="px-6 py-3 rounded-xl border border-[#374151] text-[#9ca3af] hover:text-[#f9fafb] hover:border-gray-500 font-semibold transition-all flex items-center gap-2 text-sm">
                                    <span className="material-symbols-outlined text-sm">arrow_back</span> Back
                                </button>
                            ) : (
                                <button onClick={() => setPath(null)}
                                    className="px-6 py-3 rounded-xl border border-[#374151] text-[#9ca3af] hover:text-[#f9fafb] hover:border-gray-500 font-semibold transition-all flex items-center gap-2 text-sm">
                                    <span className="material-symbols-outlined text-sm">arrow_back</span> Back
                                </button>
                            )}
                            <button onClick={handleContinue} disabled={!canProceed() || saving}
                                className="px-8 py-3 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] disabled:opacity-40 text-white font-bold shadow-lg shadow-[#2563eb]/30 transition-all flex items-center gap-2">
                                {saving ? (
                                    <><span className="material-symbols-outlined animate-spin text-sm">progress_activity</span> Saving...</>
                                ) : (
                                    <>{buttonLabels[step]} <span className="material-symbols-outlined text-sm">arrow_forward</span></>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default JobSeekerOnboarding;
