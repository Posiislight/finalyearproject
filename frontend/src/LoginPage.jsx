import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

const LoginPage = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const user = await login(email, password);
            if (user.is_employer) {
                navigate('/employer-dashboard');
            } else if (user.is_job_seeker) {
                navigate('/jobseeker-home');
            } else {
                // Default fallback
                navigate('/');
            }
        } catch (err) {
            console.error('Login failed:', err);
            setError(err.response?.data?.detail || 'Invalid email or password. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen w-full flex-row">
            {/* Left Side: Vibrant Branding & Carousel (40%) */}
            <div className="relative hidden w-[40%] flex-col justify-between overflow-hidden bg-primary lg:flex p-12">
                {/* Background Image with Gradient Overlay */}
                <div className="absolute inset-0 z-0">
                    <img 
                        alt="Office collaboration" 
                        className="h-full w-full object-cover opacity-40 mix-blend-multiply" 
                        data-alt="Group of diverse professionals collaborating in a modern office" 
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4M_LKWCQ-t6bKxzDoJByWXk07daJNO7aZ5hC8R31iLPyjhvtMZkL4P1lxQmYkfIGO2ahh5hCMJkk8AYGCaGfMhzNfmKUW4x9wWxeNnENaZC5sjvSxH8DcIzIYi74GjXY0cLgbMR1H70PRdLo5Bo6M_pSiuEbMqOGHJkCUK8bHL5Fb6Og5fWu0FaLzAmjPK0Qcg1fItlB5e14IL79bYCCrhgZsQNbE1a4-PDP2Obpi3kdMFDxScK-6FsJGK1Ax2PfgikMDCfkgHXU" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-primary via-blue-700 to-indigo-900 opacity-90 mix-blend-multiply"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111621] via-transparent to-transparent opacity-60"></div>
                </div>
                {/* Logo Area */}
                <Link to="/" className="relative z-10 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-primary">
                        <span className="material-symbols-outlined text-2xl font-bold">work_history</span>
                    </div>
                    <span className="text-2xl font-bold tracking-tight text-white">HireFlow</span>
                </Link>
                {/* Carousel / Success Stories */}
                <div className="relative z-10 mt-auto">
                    <h2 className="mb-6 text-3xl font-bold leading-tight text-white">Join the community transforming recruitment.</h2>
                    {/* Reuse and modify Carousel component style */}
                    <div className="flex w-full flex-col gap-4 rounded-xl bg-white/10 p-5 backdrop-blur-md border border-white/10">
                        <div className="flex items-start gap-4">
                            <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 border-white/20">
                                <div className="h-full w-full bg-cover bg-center" data-alt="Portrait of a smiling young professional woman" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDGzLtww3jSCNDzJwrhm7_kqHaXIOp1kYDqt-UdX1vtAlYoAWluBa4Y3_QozWhAfuJED1oLIxwDzaiQS70r1-_z41eH_PHTGxglgRHpP_g5440pKsmALN_ggJE63ZPwVcesjfnnV44lolrdsyNyykbwcIt2GRA-fDdYJT6v5cHTfTKiBjLytEVvQuzl2vHW_sBa3FsOrgOdXFxmaQFHEKLwqoUzX7W0jPssbUcnjYQHhOwzR-Ke0LU8QRvn26zQ5FG2yDwpJpF1oaw')" }}>
                                </div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <div className="flex gap-1 text-yellow-400 text-sm">
                                    <span className="material-symbols-outlined text-[16px] fill-current">star</span>
                                    <span className="material-symbols-outlined text-[16px] fill-current">star</span>
                                    <span className="material-symbols-outlined text-[16px] fill-current">star</span>
                                    <span className="material-symbols-outlined text-[16px] fill-current">star</span>
                                    <span className="material-symbols-outlined text-[16px] fill-current">star</span>
                                </div>
                                <p className="text-white font-medium leading-relaxed">"Sarah matched with Google in just 2 days. Finding a job has never been this seamless and intuitive."</p>
                                <p className="text-blue-100 text-sm mt-1">Sarah Jenkins, Product Designer</p>
                            </div>
                        </div>
                        {/* Pagination dots */}
                        <div className="mt-6 flex gap-2">
                            <div className="h-1.5 w-6 rounded-full bg-white"></div>
                            <div className="h-1.5 w-1.5 rounded-full bg-white/40"></div>
                            <div className="h-1.5 w-1.5 rounded-full bg-white/40"></div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Right Side: Authentication Form (60%) */}
            <div className="flex w-full flex-1 flex-col items-center justify-center bg-background-light dark:bg-background-dark px-4 py-12 lg:w-[60%]">
                <div className="flex w-full max-w-[480px] flex-col gap-8">
                    {/* Mobile Logo (Only visible on small screens) */}
                    <div className="flex items-center gap-2 lg:hidden self-center mb-4">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">
                            <span className="material-symbols-outlined text-xl">work_history</span>
                        </div>
                        <span className="text-xl font-bold text-slate-900 dark:text-white">HireFlow</span>
                    </div>
                    {/* Segmented Buttons (Toggle Sign In / Create Account) */}
                    <div className="w-full">
                        <div className="flex h-12 w-full items-center justify-center rounded-xl bg-slate-200 dark:bg-surface-dark p-1">
                            <label className="flex h-full flex-1 cursor-pointer items-center justify-center rounded-lg px-2 text-sm font-medium transition-all has-[:checked]:bg-white dark:has-[:checked]:bg-[#2c3442] has-[:checked]:text-primary has-[:checked]:shadow-sm text-slate-500 dark:text-slate-400">
                                <span className="truncate">Sign In</span>
                                <input defaultChecked className="invisible w-0" name="auth_mode" type="radio" value="Sign In" />
                            </label>
                            <Link to="/signup" className="flex h-full flex-1 cursor-pointer items-center justify-center rounded-lg px-2 text-sm font-medium transition-all text-slate-500 dark:text-slate-400 hover:text-primary">
                                <span className="truncate">Create Account</span>
                            </Link>
                        </div>
                    </div>
                    {/* Header Text */}
                    <div className="text-center">
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Welcome back</h1>
                        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Sign in to continue your job search.</p>
                    </div>

                    {error && (
                        <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600 dark:bg-red-900/10 dark:text-red-400 border border-red-100 dark:border-red-900/20">
                            {error}
                        </div>
                    )}

                    {/* Social Login Buttons */}
                    <div className="flex flex-col gap-3">
                        <div className="flex gap-3">
                            <button className="flex h-11 flex-1 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-surface-dark dark:text-white dark:hover:bg-[#2c3442]">
                                {/* Google Icon SVG placeholder */}
                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path></svg>
                                <span>Google</span>
                            </button>
                            <button className="flex h-11 flex-1 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-surface-dark dark:text-white dark:hover:bg-[#2c3442]">
                                {/* LinkedIn Icon SVG placeholder */}
                                <svg className="h-5 w-5 text-[#0077b5]" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path></svg>
                                <span>LinkedIn</span>
                            </button>
                        </div>
                    </div>
                    <div className="relative flex items-center py-2">
                        <div className="flex-grow border-t border-slate-200 dark:border-slate-700"></div>
                        <span className="mx-4 flex-shrink-0 text-xs font-medium uppercase text-slate-400 dark:text-slate-500">Or continue with</span>
                        <div className="flex-grow border-t border-slate-200 dark:border-slate-700"></div>
                    </div>
                    {/* Main Form */}
                    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="email">Email Address</label>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400">mail</span>
                                    <input 
                                        className="h-11 w-full rounded-lg border border-slate-200 bg-transparent pl-10 pr-4 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-primary focus:ring-1 focus:ring-primary dark:border-slate-700 dark:text-white dark:placeholder-slate-500" 
                                        id="email" 
                                        placeholder="name@example.com" 
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="password">Password</label>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400">lock</span>
                                    <input 
                                        className="h-11 w-full rounded-lg border border-slate-200 bg-transparent pl-10 pr-4 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-primary focus:ring-1 focus:ring-primary dark:border-slate-700 dark:text-white dark:placeholder-slate-500" 
                                        id="password" 
                                        placeholder="••••••••" 
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <Link to="/forgot-password" className="text-xs font-medium text-primary hover:underline">Forgot Password?</Link>
                        </div>
                        {/* Submit Button */}
                        <button 
                            disabled={isLoading}
                            type="submit"
                            className={`flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all hover:bg-blue-600 hover:shadow-primary/40 active:scale-[0.98] ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {isLoading ? 'Signing In...' : 'Sign In'}
                            {!isLoading && <span className="material-symbols-outlined text-[18px]">arrow_forward</span>}
                        </button>
                    </form>
                    <div className="text-center text-sm text-slate-500 dark:text-slate-400">
                        Don't have an account? <Link className="font-medium text-primary hover:underline" to="/signup">Sign up</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
