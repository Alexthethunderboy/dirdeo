import Link from 'next/link';
import type { CmsData } from '@/lib/cms';

export default function Footer({ cms }: { cms: CmsData }) {
  return (
    <footer className="py-24 border-t border-white/10 bg-black">
      <div className="container-standard flex flex-col md:flex-row justify-between items-end gap-12">
        <div>
          <h2 className="hero-title mb-12">
            {cms.settings.footerHeadline || "Let's Create Together"}
          </h2>
          <div className="flex gap-8 text-sm uppercase tracking-widest font-bold">
            <a href={`mailto:${cms.settings.contactEmail}`} className="hover:opacity-50 transition-all duration-300 border-b border-transparent hover:border-white">Email</a>
            {Object.entries(cms.settings.socials).map(([social, url]) => (
              <a key={social} href={url as string} className="hover:opacity-50 transition-all duration-300 border-b border-transparent hover:border-white">{social}</a>
            ))}
          </div>
        </div>
        <div className="text-right text-[10px] opacity-40 uppercase tracking-[0.2em] font-bold">
          © {new Date().getFullYear()} {cms.settings.siteName}<br />All rights reserved
        </div>
      </div>
    </footer>
  );
}
