import React from 'react';
import { Link } from 'react-router-dom';
import CTASection from './components/CTASection';
import { BentoItem } from './components/ui/bento-item';

const FeaturesPage = () => {
    return (
        <>
            <section className="w-full px-4 py-16 md:py-24 flex justify-center bg-transparent relative overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-full bg-primary/10 blur-[100px] pointer-events-none rounded-full"></div>
                    <div className="max-w-4xl w-full flex flex-col gap-8 items-center text-center z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-900/40 backdrop-blur-sm border border-gray-800 text-text-secondary text-xs font-medium uppercase tracking-wider">
                            <span className="material-symbols-outlined text-primary text-sm">verified</span>
                            Powerful &amp; Scalable
                        </div>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight text-white drop-shadow-xl">
                            Platform <span className="text-white">Capabilities</span>
                        </h1>
                        <p className="text-text-secondary text-lg md:text-xl max-w-2xl font-light leading-relaxed">
                            Explore the suite of intelligent tools designed to revolutionize how you connect with talent. From AI matching to real-time analytics, we've built the future of hiring.
                        </p>
                    </div>
                </section>
                <section className="w-full px-4 md:px-10 py-10 md:py-20 bg-transparent relative">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <BentoItem className="col-span-1 md:col-span-2 flex flex-col justify-between">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110 duration-500"></div>
                                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary/20 to-[#121621] border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-primary/10">
                                    <span className="material-symbols-outlined text-[36px]">psychology</span>
                                </div>
                                <div className="flex flex-col gap-3 relative z-10 mt-6 md:mt-10">
                                    <h3 className="text-white text-2xl font-bold">AI Matching Engine</h3>
                                    <p className="text-text-secondary text-base md:text-lg leading-relaxed max-w-xl">
                                        Our proprietary deep-learning algorithm analyzes thousands of data points to connect candidates and employers with unprecedented accuracy. It goes beyond keywords to understand intent, culture fit, and long-term potential.
                                    </p>
                                </div>
                                <div className="mt-auto pt-8 flex items-center text-primary font-bold text-sm uppercase tracking-wider group-hover:gap-2 transition-all">
                                    Learn more <span className="material-symbols-outlined text-base ml-1">arrow_forward</span>
                                </div>
                            </BentoItem>

                            <BentoItem className="flex flex-col justify-between">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110 duration-500"></div>
                                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-400/20 to-[#121621] border border-blue-400/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-blue-400/10">
                                    <span className="material-symbols-outlined text-[36px]">swipe_right</span>
                                </div>
                                <div className="flex flex-col gap-3 relative z-10 mt-6 flex-grow">
                                    <h3 className="text-white text-2xl font-bold">Smart Swipe Mechanics</h3>
                                    <p className="text-text-secondary text-sm md:text-base leading-relaxed">
                                        Intuitive gesture-based interface makes reviewing candidates and jobs as easy as a swipe.
                                    </p>
                                </div>
                                <div className="mt-8 flex items-center text-blue-400 font-bold text-sm uppercase tracking-wider group-hover:gap-2 transition-all">
                                    See demo <span className="material-symbols-outlined text-base ml-1">play_circle</span>
                                </div>
                            </BentoItem>

                            <BentoItem className="flex flex-col justify-between">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110 duration-500"></div>
                                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-[#121621] border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-indigo-500/10">
                                    <span className="material-symbols-outlined text-[36px]">document_scanner</span>
                                </div>
                                <div className="flex flex-col gap-3 relative z-10 mt-6 flex-grow">
                                    <h3 className="text-white text-2xl font-bold">Automated Parsing</h3>
                                    <p className="text-text-secondary text-sm md:text-base leading-relaxed">
                                        Instantly extract skills from any unstructured resume format enabling bias-free filtering.
                                    </p>
                                </div>
                                <div className="mt-8 flex items-center text-indigo-400 font-bold text-sm uppercase tracking-wider group-hover:gap-2 transition-all">
                                    View specs <span className="material-symbols-outlined text-base ml-1">description</span>
                                </div>
                            </BentoItem>

                            <BentoItem className="col-span-1 md:col-span-2 flex flex-col justify-between">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110 duration-500"></div>
                                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-[#121621] border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-emerald-500/10">
                                    <span className="material-symbols-outlined text-[36px]">monitoring</span>
                                </div>
                                <div className="flex flex-col gap-3 relative z-10 mt-6 md:mt-10">
                                    <h3 className="text-white text-2xl font-bold">Real-time Analytics</h3>
                                    <p className="text-text-secondary text-base md:text-lg leading-relaxed max-w-xl">
                                        Gain deep insights into your pipeline. Track engagement rates, time-to-hire, diversity metrics, and funnel conversion performance to intelligently optimize your entire strategy.
                                    </p>
                                </div>
                                <div className="mt-auto pt-8 flex items-center text-emerald-400 font-bold text-sm uppercase tracking-wider group-hover:gap-2 transition-all">
                                    Explore data <span className="material-symbols-outlined text-base ml-1">bar_chart</span>
                                </div>
                            </BentoItem>
                        </div>
                    </div>
                </section>
        </>
    );
};

export default FeaturesPage;
