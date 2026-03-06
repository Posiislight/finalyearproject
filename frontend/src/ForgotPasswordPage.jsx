import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthLayout } from './components/AuthLayout';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { AtSignIcon, ChevronLeftIcon, MailCheckIcon, InfoIcon, RefreshCwIcon } from 'lucide-react';

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
        <AuthLayout 
            quote="We use industry-standard encryption to protect your account. Password reset links expire after 1 hour for your safety."
            author="Security Team"
        >
            {!submitted ? (
                <>
                    <div className="flex flex-col space-y-1">
                        <h1 className="font-poppins text-2xl font-bold tracking-tight text-white text-center">
                            Forgot your password?
                        </h1>
                        <p className="text-white/60 text-base text-center">
                            Enter your email and we'll send you a reset link.
                        </p>
                    </div>

                    <form className="space-y-4 mt-8" onSubmit={handleSubmit}>
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

                        <Button type="submit" className="w-full bg-primary hover:bg-blue-600 text-white font-bold h-12 shadow-lg shadow-primary/20">
                            Send Reset Link
                        </Button>
                    </form>

                    <p className="text-white/50 mt-8 text-center text-sm">
                        Remember your password?{' '}
                        <Link to="/login" className="text-primary font-medium hover:underline underline-offset-4">
                            Back to Login
                        </Link>
                    </p>
                </>
            ) : (
                <div className="space-y-6 text-center">
                    <div className="w-20 h-20 rounded-full bg-green-500/10 border-2 border-green-500 flex items-center justify-center mx-auto mb-6">
                        <MailCheckIcon className="size-10 text-green-500" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-white mb-2">Check your inbox</h1>
                        <p className="text-white/60 text-sm">
                            We've sent a password reset link to <span className="text-white font-semibold">{email}</span>.
                        </p>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-left">
                        <div className="flex items-start gap-3">
                            <InfoIcon className="size-5 text-primary mt-0.5 shrink-0" />
                            <div className="space-y-2">
                                <p className="text-sm text-white/80 font-medium">Didn't receive the email?</p>
                                <ul className="text-xs text-white/50 space-y-1">
                                    <li>• Check your spam or junk folder</li>
                                    <li>• Verify the email address is correct</li>
                                    <li>• The link expires after 1 hour</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 pt-4">
                        <Button 
                            onClick={() => setSubmitted(false)}
                            className="w-full bg-primary hover:bg-blue-600 text-white font-bold h-12"
                        >
                            <RefreshCwIcon className="size-4 me-2" />
                            Resend Email
                        </Button>
                        <Button variant="ghost" className="text-white/50 hover:text-white" asChild>
                            <Link to="/login">
                                <ChevronLeftIcon className="size-4 me-2" />
                                Back to Login
                            </Link>
                        </Button>
                    </div>
                </div>
            )}
        </AuthLayout>
    );
};

export default ForgotPasswordPage;
