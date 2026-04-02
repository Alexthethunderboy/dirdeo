'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Footer from '@/components/Footer';

export default function AboutClient({ cms }: { cms: any }) {
  const clients = cms.about.clientRegistry || [];
  const curations = cms.about.curation || [];
  return (
    <div className="page-pt min-h-screen">
      <div className="container-standard grid grid-cols-1 md:grid-cols-2 gap-20 pb-32">
        {/* Sticky Portrait Column */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative sticky top-40 h-[70vh] md:h-[80vh] bg-neutral-900 group border border-white/5 overflow-hidden"
        >
          {/* Abstract Offset Frame */}
          <div className="absolute inset-4 border border-white/10 opacity-70 z-10 pointer-events-none group-hover:inset-6 transition-all duration-700"></div>
          
          <Image 
            src={cms.about.portraitUrl || "/portrait.png"}
            alt="Portrait"
            fill
            className="object-cover grayscale group-hover:grayscale-0 transition-grayscale duration-1000"
            priority
          />
        </motion.div>

        {/* Content Column */}
        <div className="flex flex-col gap-32">
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="hero-title mb-12">{cms.about.profileTitle || "Profile"}</h1>
            <p className="text-2xl md:text-5xl font-bold tracking-tight uppercase leading-[1.05] mb-12">
              {cms.about.heroSubtitle}
            </p>
            <div className="space-y-8 text-lg opacity-60 leading-relaxed font-medium">
              {(cms.about.bioParagraphs || []).map((para: string, idx: number) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="section-title mb-12">{cms.about.registryTitle || "Client Registry"}</h2>
            <div className="flex flex-wrap gap-x-12 gap-y-8">
              {clients.map((client: string, i: number) => (
                <motion.span 
                  key={client}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter uppercase cursor-crosshair hover:opacity-100 transition-opacity"
                >
                  {client}
                </motion.span>
              ))}
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="pb-24"
          >
            <h2 className="section-title mb-12">{cms.about.curationTitle || "Curation"}</h2>
            <ul className="space-y-6">
              {curations.map((item: any, idx: number) => (
                <li key={idx} className="flex flex-col md:flex-row justify-between md:items-baseline border-b border-white/10 pb-6 group cursor-default">
                  <span className="text-[10px] font-bold uppercase tracking-widest opacity-30 group-hover:opacity-100 transition-opacity mb-2 md:mb-0">
                    {item.label}
                  </span>
                  <span className="text-xl md:text-2xl font-bold tracking-tighter uppercase group-hover:tracking-normal transition-all duration-500">
                    {item.value}
                  </span>
                </li>
              ))}
            </ul>
          </motion.section>
        </div>
      </div>

      <Footer cms={cms} />
    </div>
  );
}
