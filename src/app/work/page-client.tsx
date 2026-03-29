'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Footer from '@/components/Footer';
import type { CmsData, Project } from '@/lib/cms';

const categories = ['All', 'Videography', 'Photography', 'Commercial', 'Personal'];

export default function WorkClient({ cms }: { cms: CmsData }) {
  const allProjects = cms.projects;
  const [filter, setFilter] = useState('All');

  const filteredProjects = allProjects.filter((p: Project) => filter === 'All' || p.category === filter);

  return (
    <div className="page-pt min-h-screen">
      <div className="container-standard pb-(--section-padding)">
        <header className="mb-24 reveal-up">
          <h1 className="hero-title mb-12">Archive</h1>
          
          <nav className="flex flex-wrap gap-x-12 gap-y-6">
            {categories.map((cat) => (
              <button 
                key={cat}
                onClick={() => setFilter(cat)}
                className={`text-[10px] uppercase tracking-[0.4em] font-bold pb-4 border-b-2 transition-all duration-500 ${filter === cat ? 'border-white opacity-100' : 'border-transparent opacity-20 hover:opacity-100'}`}
              >
                {cat}
              </button>
            ))}
          </nav>
        </header>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project: Project) => (
              <motion.div 
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="group relative"
              >
                <Link href={`/work/${project.id}`} className="block group">
                  <div className="relative aspect-3/4 overflow-hidden bg-neutral-900 border border-white/5">
                    <Image 
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
                    <h3 className="text-xl font-bold tracking-tight uppercase group-hover:tracking-normal transition-all duration-500">{project.title}</h3>
                    <p className="text-[10px] uppercase tracking-widest mt-2 font-bold opacity-30">{project.category}</p>
                  </div>
                  <span className="text-sm font-bold tabular-nums opacity-20 group-hover:opacity-100 transition-opacity">{project.year}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <Footer cms={cms} />
    </div>
  );
}
