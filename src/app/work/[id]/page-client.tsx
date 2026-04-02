'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Play } from 'lucide-react';
import Footer from '@/components/Footer';
import ImageLightbox from '@/components/ImageLightbox';
import type { CmsData, Project } from '@/lib/cms';

export default function ProjectClient({ cms }: { cms: CmsData }) {
  const { id } = useParams();
  const project = cms.projects.find((p: Project) => p.id === id) || cms.projects[0];
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // Consolidate images for lightbox (Hero + Gallery)
  const lightboxImages: string[] = [];
  if (!project.videoUrl && project.image) {
    lightboxImages.push(project.image);
  }
  if (project.gallery && project.gallery.length > 0) {
    lightboxImages.push(...project.gallery);
  }

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const isPortrait = project.videoOrientation === 'portrait';

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

        {/* Hero Media: Video Player or Image */}
        <section className={`container-standard mb-32 flex justify-center`}>
          <div 
            className={`relative overflow-hidden bg-white/5 transition-all duration-700 w-full ${
              isPortrait ? 'max-w-md aspect-9/16' : 'aspect-video'
            } ${!project.videoUrl ? 'cursor-zoom-in' : ''}`}
            onClick={() => !project.videoUrl && openLightbox(0)}
          >
            {project.videoUrl ? (
              <div className="relative w-full h-full">
                {/* Placeholder Image while video loads OR hasn't started playing */}
                <Image 
                  src={project.image} 
                  alt={project.title} 
                  fill 
                  className={`object-cover transition-opacity duration-1000 z-10 pointer-events-none ${
                    isPlaying ? 'opacity-0' : 'opacity-100'
                  }`}
                  priority
                />
                
                {/* Play Button Overlay */}
                <AnimatePresence>
                  {!isPlaying && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.1 }}
                      onClick={handlePlay}
                      className="absolute inset-0 z-20 flex items-center justify-center bg-black/20 hover:bg-black/40 transition-colors group"
                      aria-label="Play film"
                    >
                      <div className="w-24 h-24 rounded-full border border-white/30 flex items-center justify-center group-hover:scale-110 group-hover:border-white transition-all duration-500 bg-black/10 backdrop-blur-sm">
                        <Play size={32} fill="white" className="ml-1" />
                      </div>
                    </motion.button>
                  )}
                </AnimatePresence>

                <video 
                  ref={videoRef}
                  src={project.videoUrl}
                  controls={isPlaying}
                  preload="auto"
                  playsInline
                  onCanPlayThrough={() => setVideoLoaded(true)}
                  className={`w-full h-full object-cover transition-opacity duration-1000 ${
                    videoLoaded && isPlaying ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </div>
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
              {project.gallery.map((img: string, idx: number) => {
                const globalIdx = !project.videoUrl ? idx + 1 : idx;
                return (
                  <div 
                    key={idx} 
                    className="relative aspect-[4/5] w-full overflow-hidden group cursor-zoom-in"
                    onClick={() => openLightbox(globalIdx)}
                  >
                    <Image 
                      src={img} 
                      alt={`${project.title} gallery ${idx}`} 
                      fill 
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-4 border border-white/5 pointer-events-none"></div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Closing Image or Secondary Content if no gallery */}
        {!project.gallery && !project.videoUrl && (
          <section className="container-standard mb-32">
            <div 
              className="relative aspect-video w-full overflow-hidden cursor-zoom-in"
              onClick={() => openLightbox(0)}
            >
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

      <ImageLightbox 
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        images={lightboxImages}
        currentIndex={lightboxIndex}
        setCurrentIndex={setLightboxIndex}
      />
    </div>
  );
}



