import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email.trim()) {
            setSubmitted(true);
        }
    };

    return (
        <div className="flex min-h-screen w-full flex-row">
            {/* Left Side: Vibrant Branding (40%) */}
            <div className="relative hidden w-[40%] flex-col justify-between overflow-hidden bg-primary lg:flex p-12">
                {/* Background Image with Gradient Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        alt="Office collaboration"
                        className="h-full w-full object-cover opacity-40 mix-blend-multiply"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4M_LKWCQ-t6bKxzDoJByWXk07daJNO7aZ5hC8R31iLPyjhvtMZkL4P1lxQmYkfIGO2ahh5hCMJkk8AYGCaGfMhzNfmKUW4x9wWxeNnENaZC5sjvSxH8DcIzIYi74GjXY0cLgbMR1H70PRdLo5Bo6M_pSiuEbMqOGHJkCUK8bHL5Fb6Og5fWu0FaLzAmjPK0Qcg1fItlB5e14IL79bYCCrhgZsQNbE1a4-PDP2Obpi3kdMFDxScK-6FsJGK1Ax2PfgikMDCfkgHXU"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-primary via-blue-700 to-indigo-900 opacity-90 mix-blend-multiply"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111621] via-transparent to-transparent opacity-60"></div>
                </div>
                {/* Logo */}
                <Link to="/" className="relative z-10 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-primary">
                        <span className="material-symbols-outlined text-2xl font-bold">work_history</span>
                    </div>
                    <span className="text-2xl font-bold tracking-tight text-white">HireFlow</span>
                </Link>
                {/* Security Message */}
                <div className="relative z-10 mt-auto">
                    <h2 className="mb-6 text-3xl font-bold leading-tight text-white">Your account security is our priority.</h2>
                    <div className="flex w-full flex-col gap-4 rounded-xl bg-white/10 p-5 backdrop-blur-md border border-white/10">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined text-white text-2xl">shield</span>
                            </div>
                            <div>
                                <p className="text-white font-medium leading-relaxed">We use industry-standard encryption to protect your account. Password reset links expire after 1 hour for your safety.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side: Form (60%) */}
            <div className="flex w-full flex-1 flex-col items-center justify-center bg-background-light dark:bg-background-dark px-4 py-12 lg:w-[60%]">
                <div className="flex w-full max-w-[480px] flex-col gap-8">
                    {/* Mobile Logo */}
                    <div className="flex items-center gap-2 lg:hidden self-center mb-4">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">
                            <span className="material-symbols-outlined text-xl">work_history</span>
                        </div>
                        <span className="text-xl font-bold text-slate-900 dark:text-white">HireFlow</span>
                    </div>

                    {!submitted ? (
                        <>
                            {/* Header */}
                            <div className="text-center">
                                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
                                    <span className="material-symbols-outlined text-primary text-3xl">lock_reset</span>
                                </div>
                                <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Forgot your password?</h1>
                                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">No worries! Enter the email address associated with your account and we'll send you a link to reset your password.</p>
                            </div>

                            {/* Form */}
                            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="reset-email">Email Address</label>
                                    <div className="relative">
                                        <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400">mail</span>
                                        <input
                                            className="h-11 w-full rounded-lg border border-slate-200 bg-transparent pl-10 pr-4 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-primary focus:ring-1 focus:ring-primary dark:border-slate-700 dark:text-white dark:placeholder-slate-500"
                                            id="reset-email"
                                            placeholder="name@example.com"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all hover:bg-blue-600 hover:shadow-primary/40 active:scale-[0.98]"
                                >
                                    Send Reset Link
                                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                                </button>
                            </form>

                            <div className="text-center text-sm text-slate-500 dark:text-slate-400">
                                Remember your password? <Link className="font-medium text-primary hover:underline" to="/login">Back to Login</Link>
                            </div>
                        </>
                    ) : (
                        <>
                            {/* Success State */}
                            <div className="text-center">
                                <div className="w-20 h-20 rounded-full bg-[#22c55e]/10 border-2 border-[#22c55e] flex items-center justify-center mx-auto mb-6">
                                    <span className="material-symbols-outlined text-[#22c55e] text-4xl">mark_email_read</span>
                                </div>
                                <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Check your inbox</h1>
                                <p className="mt-3 text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                                    We've sent a password reset link to <span className="font-semibold text-slate-900 dark:text-white">{email}</span>. Click the link in the email to create a new password.
                                </p>
                            </div>

                            {/* Info Box */}
                            <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
                                <div className="flex items-start gap-3">
                                    <span className="material-symbols-outlined text-primary text-lg mt-0.5">info</span>
                                    <div>
                                        <p className="text-sm text-slate-600 dark:text-slate-300 font-medium">Didn't receive the email?</p>
                                        <ul className="text-xs text-slate-500 dark:text-slate-400 mt-2 space-y-1.5">
                                            <li className="flex items-center gap-1.5">
                                                <span className="material-symbols-outlined text-xs text-primary">check</span>
                                                Check your spam or junk folder
                                            </li>
                                            <li className="flex items-center gap-1.5">
                                                <span className="material-symbols-outlined text-xs text-primary">check</span>
                                                Make sure the email address is correct
                                            </li>
                                            <li className="flex items-center gap-1.5">
                                                <span className="material-symbols-outlined text-xs text-primary">check</span>
                                                The link expires after 1 hour
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col gap-3">
                                <button
                                    onClick={() => setSubmitted(false)}
                                    className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all hover:bg-blue-600 hover:shadow-primary/40 active:scale-[0.98]"
                                >
                                    <span className="material-symbols-outlined text-[18px]">refresh</span>
                                    Resend Email
                                </button>
                                <Link
                                    to="/login"
                                    className="flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-slate-200 dark:border-slate-700 px-6 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-surface-dark transition-colors"
                                >
                                    <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                                    Back to Login
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
