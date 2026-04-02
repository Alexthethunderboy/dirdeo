'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Footer from '@/components/Footer';

export default function PageClient({ cms }: { cms: any }) {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const projects = cms.projects.slice(0, 4);

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative h-screen flex flex-col justify-center items-center overflow-hidden bg-neutral-900">
        <div className="absolute inset-0 z-0">
          {/* Placeholder Image while video loads */}
          {cms.settings.homeHeroImageUrl && (
            <Image 
              src={cms.settings.homeHeroImageUrl}
              alt="Background Placeholder"
              fill
              className={`object-cover grayscale opacity-60 transition-opacity duration-2000 ${videoLoaded ? 'opacity-0' : 'opacity-60'}`}
              priority
            />
          )}

          <video 
            autoPlay 
            muted 
            loop 
            playsInline
            onCanPlayThrough={() => setVideoLoaded(true)}
            className={`w-full h-full object-cover grayscale transition-opacity duration-2000 ${videoLoaded ? 'opacity-60' : 'opacity-0'}`}
            src={cms.settings.homeHeroVideoUrl || "https://player.vimeo.com/external/370331493.sd.mp4?s=7b99635da247f33d7b43f9a77033a39e83344605&profile_id=139&oauth2_token_id=57447761"}
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 text-center px-6"
        >
          <h1 className="hero-title mb-6">
            {cms.settings.siteName}
          </h1>
          <p className="text-lg md:text-xl uppercase tracking-widest opacity-80 max-w-xl mx-auto">
            {cms.about.heroSubtitle}
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-40 hover:opacity-100 transition-opacity cursor-pointer"
        >
          <span className="text-[10px] uppercase tracking-widest font-medium">Scroll to explore</span>
          <div className="w-[1px] h-12 bg-white origin-top scale-y-100 transition-transform duration-500"></div>
        </motion.div>
      </section>

      {/* Featured Works Section */}
      <section className="section-spacing container-standard">
        <div className="mb-24 reveal-up">
          <h2 className="section-title mb-4">{cms.settings.homeWorksTitle || "Selected Works"}</h2>
          <div className="w-20 h-[2px] bg-white"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-32">
          {projects.map((project: { id: string; title: string; category: string; year: string; image: string }, i: number) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: i % 2 * 0.2 }}
              className={`flex flex-col group ${i % 2 !== 0 ? 'md:mt-32' : ''}`}
            >
              <Link href={`/work/${project.id}`} className="block group">
                <div className="relative aspect-4/5 overflow-hidden bg-neutral-900 border border-white/5">
                  <Image 
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={i < 2}
                    className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                  />
                  
                  {/* Standardized Hover Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-center items-center pointer-events-none">
                    <span className="text-[10px] uppercase tracking-widest font-bold border border-white px-6 py-3">
                      View Details
                    </span>
                  </div>
                  
                  {/* Standardized Abstract Framing */}
                  <div className="absolute inset-4 border border-white/0 group-hover:border-white/20 transition-all duration-500 pointer-events-none z-10"></div>
                </div>
              </Link>
              
              <div className="mt-8 flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold tracking-tighter uppercase group-hover:tracking-normal transition-all duration-500 mb-1">
                    {project.title}
                  </h3>
                  <p className="text-xs uppercase tracking-widest opacity-40 font-bold">
                    {project.category}
                  </p>
                </div>
                <span className="text-lg font-bold tabular-nums opacity-20 group-hover:opacity-100 transition-opacity">
                  {project.year}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-48 text-center reveal-up">
          <Link 
            href="/work" 
            className="text-2xl font-bold tracking-tighter uppercase border-b border-white/20 hover:border-white pb-2 transition-all duration-300"
          >
            {cms.settings.homeViewAllText || "View All Projects"}
          </Link>
        </div>
      </section>
      
      <Footer cms={cms} />
    </div>
  );
}
