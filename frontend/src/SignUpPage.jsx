import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import { AuthLayout } from './components/AuthLayout';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { AtSignIcon, LockIcon, UserIcon, BriefcaseIcon } from 'lucide-react';

const SignUpPage = () => {
    const navigate = useNavigate();
    const { register, login } = useAuth();
    const [userType, setUserType] = useState('Job Seeker');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setIsLoading(true);

        try {
            await register(email, password, userType);
            setSuccess('Account created successfully! Logging you in...');
            await login(email, password);
            
            if (userType === 'Employer') {
                navigate('/company-info');
            } else {
                navigate('/jobseeker-onboarding');
            }
        } catch (err) {
            console.error('Registration failed:', err);
            const serverError = err.response?.data;
            if (serverError && typeof serverError === 'object') {
                const firstError = Object.values(serverError)[0];
                setError(Array.isArray(firstError) ? firstError[0] : firstError);
            } else {
                setError('Registration failed. Please check your details and try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthLayout 
            quote="Sarah matched with Google in just 2 days. Finding a job has never been this seamless and intuitive."
            author="Sarah Jenkins"
        >
            <div className="flex flex-col space-y-1">
                <h1 className="font-poppins text-2xl font-bold tracking-tight text-white">
                    Create your account
                </h1>
                <p className="text-white/60 text-base">
                    Join thousands of professionals finding their dream jobs.
                </p>
            </div>

            {error && (
                <div className="rounded-lg bg-red-500/10 p-4 text-sm text-red-400 border border-red-500/20">
                    {error}
                </div>
            )}

            {success && (
                <div className="rounded-lg bg-green-500/10 p-4 text-sm text-green-400 border border-green-500/20">
                    {success}
                </div>
            )}

            <form className="space-y-4 mt-6" onSubmit={handleSubmit}>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-white/70">I am a</label>
                    <div className="grid grid-cols-2 gap-3">
                        <button
                            type="button"
                            onClick={() => setUserType('Job Seeker')}
                            className={`flex items-center justify-center gap-2 rounded-lg border px-4 py-3 text-sm font-medium transition-all ${
                                userType === 'Job Seeker' 
                                ? 'border-primary bg-primary/10 text-primary ring-1 ring-primary' 
                                : 'border-white/10 bg-white/5 text-white/70 hover:bg-white/10'
                            }`}
                        >
                            <UserIcon className="size-4" />
                            Job Seeker
                        </button>
                        <button
                            type="button"
                            onClick={() => setUserType('Employer')}
                            className={`flex items-center justify-center gap-2 rounded-lg border px-4 py-3 text-sm font-medium transition-all ${
                                userType === 'Employer' 
                                ? 'border-primary bg-primary/10 text-primary ring-1 ring-primary' 
                                : 'border-white/10 bg-white/5 text-white/70 hover:bg-white/10'
                            }`}
                        >
                            <BriefcaseIcon className="size-4" />
                            Employer
                        </button>
                    </div>
                </div>

                <div className="relative pt-2">
                    <Input
                        placeholder="Email address"
                        className="peer ps-10 bg-white/5 border-white/10 text-white placeholder:text-white/30"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <div className="text-white/40 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 mt-2">
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

                <div className="flex items-start gap-2 pt-2">
                    <input required className="mt-1 h-4 w-4 rounded border-white/10 bg-white/5 text-primary focus:ring-primary" id="terms" type="checkbox" />
                    <label className="text-xs text-white/50 leading-normal" htmlFor="terms">
                        By creating an account, you agree to our <a className="text-primary hover:underline" href="/terms" target="_blank">Terms of Service</a> and <a className="text-primary hover:underline" href="/privacy" target="_blank">Privacy Policy</a>.
                    </label>
                </div>

                <Button type="submit" disabled={isLoading} className="w-full bg-primary hover:bg-blue-600 text-white font-bold h-12 shadow-lg shadow-primary/20 mt-4">
                    {isLoading ? 'Creating Account...' : 'Create Account'}
                </Button>
            </form>


            <p className="text-white/50 mt-8 text-center text-sm">
                Already have an account?{' '}
                <Link to="/login" className="text-primary font-medium hover:underline underline-offset-4">
                    Log in
                </Link>
            </p>
        </AuthLayout>
    );
};

export default SignUpPage;
