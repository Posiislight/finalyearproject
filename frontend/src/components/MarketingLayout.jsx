import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar';
import Footer from '../Footer';
import { WebGLShader } from './ui/web-gl-shader';

const MarketingLayout = () => {
  return (
    <div className="bg-transparent font-display text-white min-h-screen flex flex-col overflow-x-hidden relative">
      <WebGLShader />
      <Navbar />
      <main className="flex-grow flex flex-col items-center w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MarketingLayout;
