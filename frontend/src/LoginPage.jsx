import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import { AuthLayout } from './components/AuthLayout';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { AtSignIcon, LockIcon } from 'lucide-react';

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
        <AuthLayout 
            quote="RecruitAI understood my tech stack perfectly. I found remote roles I didn't even know existed."
            author="David Chen"
        >
            <div className="flex flex-col space-y-1">
                <h1 className="font-poppins text-2xl font-bold tracking-tight text-white">
                    Welcome back
                </h1>
                <p className="text-white/60 text-base">
                    Sign in to continue your job search.
                </p>
            </div>

            {error && (
                <div className="rounded-lg bg-red-500/10 p-4 text-sm text-red-400 border border-red-500/20">
                    {error}
                </div>
            )}


            <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="relative">
                    <Input
                        placeholder="Email address"
                        className="peer ps-10 bg-white/5 border-white/10 text-white placeholder:text-white/30"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <div className="text-white/40 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3">
                        <AtSignIcon className="size-4" aria-hidden="true" />
                    </div>
                </div>

                <div className="relative">
                    <Input
                        placeholder="Password"
                        className="peer ps-10 bg-white/5 border-white/10 text-white placeholder:text-white/30"
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="text-white/40 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3">
                        <LockIcon className="size-4" aria-hidden="true" />
                    </div>
                </div>

                <div className="flex justify-end">
                    <Link to="/forgot-password" size="sm" className="text-xs font-medium text-primary hover:text-blue-400 transition-colors">
                        Forgot Password?
                    </Link>
                </div>

                <Button type="submit" disabled={isLoading} className="w-full bg-primary hover:bg-blue-600 text-white font-bold h-12 shadow-lg shadow-primary/20">
                    {isLoading ? 'Signing In...' : 'Sign In'}
                </Button>
            </form>

            <p className="text-white/50 mt-8 text-center text-sm">
                Don't have an account?{' '}
                <Link to="/signup" className="text-primary font-medium hover:underline underline-offset-4">
                    Sign up
                </Link>
            </p>
        </AuthLayout>
    );
};

export default LoginPage;
