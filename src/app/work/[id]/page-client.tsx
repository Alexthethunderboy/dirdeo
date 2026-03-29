'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Footer from '@/components/Footer';
import type { CmsData, Project } from '@/lib/cms';

export default function ProjectClient({ cms }: { cms: CmsData }) {
  const { id } = useParams();
  const project = cms.projects.find((p: Project) => p.id === id) || cms.projects[0];

  return (
    <div className="page-pt min-h-screen">
      <div className="container-standard">
        <header className="mb-24 flex flex-col md:flex-row justify-between items-end gap-12 reveal-up">
          <div className="md:w-2/3">
            <h1 className="page-title mb-12">{project.title}</h1>
            <p className="text-xl md:text-3xl font-bold tracking-tight uppercase leading-[1.1] opacity-70 max-w-2xl">{project.description}</p>
          </div>
          
          <div className="flex flex-col gap-6 text-[10px] font-bold uppercase tracking-widest opacity-40 text-right">
            <div className="flex justify-between md:justify-end gap-8 border-b border-white/10 pb-2">
              <span>Client</span>
              <span>{project.client}</span>
            </div>
            <div className="flex justify-between md:justify-end gap-8 border-b border-white/10 pb-2">
              <span>Category</span>
              <span>{project.category}</span>
            </div>
            <div className="flex justify-between md:justify-end gap-8 border-b border-white/10 pb-2">
              <span>Year</span>
              <span>{project.year}</span>
            </div>
          </div>
        </header>

        {/* Hero Media: Video or Image */}
        <section className="container-standard mb-32">
          <div className="relative aspect-video w-full overflow-hidden bg-white/5">
            {project.videoUrl ? (
              <video 
                src={project.videoUrl}
                autoPlay 
                muted 
                loop 
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <Image 
                src={project.image} 
                alt={project.title} 
                fill 
                className="object-cover"
                priority
              />
            )}
            <div className="absolute inset-4 border border-white/10 pointer-events-none z-10"></div>
          </div>
        </section>

        {/* Photo Gallery if it exists */}
        {project.gallery && project.gallery.length > 0 && (
          <section className="container-standard mb-32">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {project.gallery.map((img: string, idx: number) => (
                <div key={idx} className="relative aspect-[4/5] w-full overflow-hidden group">
                  <Image 
                    src={img} 
                    alt={`${project.title} gallery ${idx}`} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-4 border border-white/5 pointer-events-none"></div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Closing Image or Secondary Content */}
        {!project.gallery && (
          <section className="container-standard mb-32">
            <div className="relative aspect-video w-full overflow-hidden">
              <Image 
                src={project.image} 
                alt={project.title} 
                fill 
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-4 border border-white/10 pointer-events-none"></div>
            </div>
          </section>
        )}

        {/* Next Project Nav */}
        <section className="py-48 border-t border-white/10 text-center reveal-up">
          <Link href="/work" className="group flex flex-col items-center">
            <span className="text-[10px] uppercase font-bold tracking-widest opacity-30 group-hover:opacity-100 transition-opacity mb-4">View All Archive</span>
            <span className="text-6xl md:text-9xl font-bold tracking-tighter uppercase group-hover:tracking-tight transition-all duration-500">
              Next Project
            </span>
          </Link>
        </section>
      </div>

      <Footer cms={cms} />
    </div>
  );
}
