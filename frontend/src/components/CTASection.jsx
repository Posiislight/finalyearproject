import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/saa-s-template';

const CTASection = () => {
  return (
    <section className="w-full px-4 py-24 flex justify-center bg-black/60 backdrop-blur-lg border-t border-white/10 font-poppins relative z-10">
      <div className="max-w-5xl w-full bg-gray-900/40 backdrop-blur-sm border border-gray-800 rounded-3xl p-10 md:p-16 flex flex-col items-center gap-8 relative overflow-hidden text-center shadow-2xl">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-white/5 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="flex flex-col gap-4 relative z-10 max-w-2xl">
          <h2 className="text-3xl md:text-5xl font-semibold text-white leading-tight tracking-tight shadow-sm">
            Ready to transform your hiring?
          </h2>
          <p className="text-gray-400 text-base md:text-lg font-light">
            Join other companies and job seekers using RecruitAI today.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 relative z-10 w-full sm:w-auto mt-4">
          <Link to="/signup" className="w-full sm:w-auto">
            <Button className="w-full rounded-full font-medium" variant="gradient" size="lg">
              Get Started Free
            </Button>
          </Link>
          <Link to="/employers" className="w-full sm:w-auto">
            <Button className="w-full rounded-full font-medium border border-gray-700 hover:bg-white/10" variant="secondary" size="lg">
              Request Demo
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
