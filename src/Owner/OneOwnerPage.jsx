import React, { useState } from 'react';

import { 
  ShieldCheck, 
  History, 
  Award, 
  CheckCircle2, 
  ChevronRight, 
  Menu, 
  X 
} from 'lucide-react';

const OneOwnerPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans selection:bg-emerald-500 selection:text-white">
      {/* <Web /> */}
      {/* --- Navigation --- */}
      <nav className=" w-full z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-8 w-8 text-emerald-500" />
              <span className="font-bold text-xl tracking-tight">OneOwner<span className="text-emerald-500">.Verify</span></span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a href="#features" className="hover:text-emerald-400 transition-colors px-3 py-2 rounded-md text-sm font-medium">Benefits</a>
                <a href="#history" className="hover:text-emerald-400 transition-colors px-3 py-2 rounded-md text-sm font-medium">History Report</a>
                <a href="#specs" className="hover:text-emerald-400 transition-colors px-3 py-2 rounded-md text-sm font-medium">Specifications</a>
                <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-all shadow-lg shadow-emerald-500/20">
                  Contact Seller
                </button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-300 hover:text-white">
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden bg-slate-800">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="#features" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-700">Benefits</a>
              <a href="#history" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-700">History</a>
              <a href="#specs" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-700">Specs</a>
            </div>
          </div>
        )}
      </nav>

      {/* --- Hero Section --- */}
      <div className="relative pt-32 pb-20 sm:pt-40 sm:pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Verified Single Ownership
            </div>
            
            <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
              Pristine Condition. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                Documented History.
              </span>
            </h1>
            
            <p className="mt-6 text-xl text-slate-400 max-w-2xl mx-auto">
              Experience the peace of mind that comes with a verified one-owner item. 
              No accidents, no wear, just pure original quality backed by a full audit trail.
            </p>
            
            <div className="mt-10 flex justify-center gap-4">
              <button className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 md:text-lg flex items-center gap-2 transition-all">
                View Full Report <ChevronRight className="h-5 w-5" />
              </button>
              <button className="px-8 py-3 border border-slate-700 text-base font-medium rounded-md text-slate-300 hover:bg-slate-800 md:text-lg transition-all">
                Schedule Viewing
              </button>
            </div>
          </div>
        </div>
        
        {/* Background decorative blur */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none">
          <div className="absolute top-20 left-20 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        </div>
      </div>

      {/* --- Trust Indicators --- */}
      <div className="bg-slate-800/50 border-y border-slate-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 text-center">
            <div className="flex flex-col items-center">
              <History className="h-10 w-10 text-emerald-400 mb-4" />
              <h3 className="text-lg font-medium text-white">Full History Audit</h3>
              <p className="mt-2 text-slate-400 text-sm">Every service record digitized and verified.</p>
            </div>
            <div className="flex flex-col items-center">
              <ShieldCheck className="h-10 w-10 text-emerald-400 mb-4" />
              <h3 className="text-lg font-medium text-white">Zero Accidents</h3>
              <p className="mt-2 text-slate-400 text-sm">Certified structural integrity and paint depth.</p>
            </div>
            <div className="flex flex-col items-center">
              <Award className="h-10 w-10 text-emerald-400 mb-4" />
              <h3 className="text-lg font-medium text-white">Original Owner</h3>
              <p className="mt-2 text-slate-400 text-sm">Transferred directly from manufacturer to first owner.</p>
            </div>
          </div>
        </div>
      </div>

      {/* --- Product Showcase / Details --- */}
      <div id="specs" className="py-24 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            
            {/* Image Side */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              {/* Placeholder for Product Image - Replace src with your image */}
              <div className="relative rounded-2xl bg-slate-800 aspect-[4/3] flex items-center justify-center overflow-hidden border border-slate-700">
                 <div className="text-center p-8">
                    <p className="text-slate-500 text-lg">[Product Image Placeholder]</p>
                    <p className="text-slate-600 text-sm mt-2">(e.g. Vintage Car, Watch, or Real Estate)</p>
                 </div>
              </div>
            </div>

            {/* Details Side */}
            <div className="mt-12 lg:mt-0">
              <h2 className="text-3xl font-bold text-white">The "One Owner" Difference</h2>
              <p className="mt-4 text-lg text-slate-400">
                This item has been meticulously cared for by a single owner since acquisition. 
                It represents the pinnacle of maintenance and preservation.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  "100% Authentic Documentation",
                  "Full Service History Available",
                  "Original Packaging & Accessories",
                  "Low Mileage / Usage",
                  "Transferable Warranty"
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                    <span className="text-slate-300">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-slate-400">Current Value Estimate</span>
                    <span className="text-2xl font-bold text-white">$45,000</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                  <p className="text-xs text-slate-500 mt-2 text-right">Based on market analysis</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- CTA Section --- */}
      <div className="bg-slate-800">
        <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Ready to acquire this exclusive piece?
          </h2>
          <p className="mt-4 text-xl text-slate-400">
            Inventory like this doesn't last long. Secure your inspection today.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <button className="px-8 py-3 bg-white text-slate-900 font-bold rounded-lg hover:bg-slate-100 transition-colors">
              Buy Now
            </button>
            <button className="px-8 py-3 bg-transparent border border-slate-600 text-white font-bold rounded-lg hover:bg-slate-700 transition-colors">
              Ask a Question
            </button>
          </div>
        </div>
      </div>

      {/* --- Footer --- */}
      <footer className="bg-slate-900 border-t border-slate-800 pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <ShieldCheck className="h-6 w-6 text-slate-500" />
            <span className="text-slate-400 font-medium">OneOwner.Verify</span>
          </div>
          <div className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} All rights reserved. Verified Listing.
          </div>
        </div>
      </footer>

    </div>
  );
};

export default OneOwnerPage;