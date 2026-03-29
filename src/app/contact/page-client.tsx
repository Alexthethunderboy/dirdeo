'use client';

import { motion } from 'framer-motion';
import Footer from '@/components/Footer';

export default function ContactClient({ cms }: { cms: any }) {
  return (
    <div className="page-pt min-h-screen">
      <div className="container-standard flex flex-col md:flex-row gap-24 pb-48">
        {/* Left Column: Headline */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="md:w-1/2"
        >
          <h1 className="hero-title mb-16 uppercase">
            Start A<br />Project
          </h1>
          <div className="space-y-6 opacity-40 text-sm uppercase tracking-[0.4em] font-bold">
            <p>{cms.settings.contactEmail}</p>
            <p>{cms.settings.phone}</p>
            <p>{cms.settings.location}</p>
          </div>
        </motion.div>

        {/* Right Column: Brutalist Form */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="md:w-1/2"
        >
          <form className="flex flex-col gap-16" onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col gap-4 group">
              <label className="text-[10px] uppercase tracking-[0.5em] font-bold opacity-30 group-focus-within:opacity-100 transition-opacity">Client / Company Name</label>
              <input 
                type="text" 
                placeholder="Full Name"
                className="bg-transparent border-b border-white/20 focus:border-white focus:border-b-2 outline-none py-6 text-3xl font-bold tracking-tighter uppercase transition-all placeholder:opacity-10"
              />
            </div>

            <div className="flex flex-col gap-4 group">
              <label className="text-[10px] uppercase tracking-[0.5em] font-bold opacity-30 group-focus-within:opacity-100 transition-opacity">Contact Email Address</label>
              <input 
                type="email" 
                placeholder="email@domain.com"
                className="bg-transparent border-b border-white/20 focus:border-white focus:border-b-2 outline-none py-6 text-3xl font-bold tracking-tighter uppercase transition-all placeholder:opacity-10"
              />
            </div>

            <div className="flex flex-col gap-4 group">
              <label className="text-[10px] uppercase tracking-[0.5em] font-bold opacity-30 group-focus-within:opacity-100 transition-opacity">Project Vision / Context</label>
              <textarea 
                rows={4}
                placeholder="Brief description..."
                className="bg-transparent border-b border-white/20 focus:border-white focus:border-b-2 outline-none py-6 text-3xl font-bold tracking-tighter uppercase transition-all resize-none placeholder:opacity-10"
              />
            </div>

            <div className="mt-12 text-center md:text-left">
              <button 
                type="submit"
                className="group relative inline-flex items-center gap-6 text-4xl font-bold tracking-tighter uppercase border-b border-transparent hover:border-white pb-2 transition-all duration-300"
              >
                Send Inquiry
                <span className="w-12 h-[2px] bg-white group-hover:w-20 transition-all duration-700"></span>
              </button>
            </div>
          </form>

          <section className="mt-48 flex flex-col md:flex-row justify-between items-center opacity-40 border-t border-white/10 pt-12 gap-8 md:gap-0">
              {Object.entries(cms.settings.socials).map(([platform, url]) => (
                <a key={platform} href={url as string} className="hover:opacity-100 transition-opacity">{platform}</a>
              ))}
            <p className="text-[10px] uppercase tracking-widest font-bold opacity-60">Status: {cms.settings.availabilityStatus}</p>
          </section>
        </motion.div>
      </div>

      <Footer cms={cms} />
    </div>
  );
}
