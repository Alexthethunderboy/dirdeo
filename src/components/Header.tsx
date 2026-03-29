'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Header({ settings }: { settings: any }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = settings.navLinks || [
    { name: 'Work', href: '/work' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex justify-center mt-6 px-4 pointer-events-none">
      <motion.div 
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className={`pointer-events-auto flex items-center justify-between rounded-full border border-white/10 transition-all duration-700 ease-[0.16,1,0.3,1] ${
          scrolled 
            ? 'px-6 py-3 w-full max-w-2xl bg-black/95 backdrop-blur-xl shadow-2xl scale-95' 
            : 'px-8 py-4 w-full max-w-4xl bg-black/60 backdrop-blur-md'
        }`}
      >
        <Link href="/" className="flex items-center group">
          {settings.logoUrl ? (
            <div className={`relative transition-all duration-700 ${scrolled ? 'h-5 w-24' : 'h-6 w-32'}`}>
              <Image 
                src={settings.logoUrl} 
                alt={settings.siteName} 
                fill 
                className="object-contain object-left group-hover:opacity-70 transition-opacity" 
              />
            </div>
          ) : (
            <span className={`font-bold tracking-tighter uppercase transition-all duration-700 group-hover:opacity-70 ${scrolled ? 'text-lg' : 'text-2xl'}`}>
              {settings.siteName}
            </span>
          )}
        </Link>
        
        <nav className="flex items-center gap-6 md:gap-12">
          {navLinks.map((link: { name: string; href: string }) => (
            <Link 
              key={link.name} 
              href={link.href}
              className={`font-bold uppercase tracking-widest text-white/60 hover:text-white transition-colors relative group ${scrolled ? 'text-[9px]' : 'text-xs md:text-sm'}`}
            >
              {link.name}
              <span className="absolute -bottom-2 left-0 w-full h-[1px] bg-white origin-right scale-x-0 transition-transform duration-300 ease-[0.16,1,0.3,1] group-hover:scale-x-100 group-hover:origin-left"></span>
            </Link>
          ))}
        </nav>
      </motion.div>
    </header>
  );
}
