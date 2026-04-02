import { client } from '@/sanity/lib/client';
import { groq } from 'next-sanity';

export interface Project {
  id: string;
  title: string;
  category: string;
  client: string;
  year: string;
  image: string;
  videoUrl?: string;
  videoOrientation?: 'landscape' | 'portrait';
  gallery?: string[];
  description: string;
}

export interface CmsData {
  settings: {
    siteName: string;
    logoUrl: string;
    contactEmail: string;
    phone: string;
    location: string;
    availabilityStatus: string;
    footerHeadline: string;
    homeHeroVideoUrl?: string;
    homeHeroImageUrl?: string;
    homeWorksTitle?: string;
    homeViewAllText?: string;
    navLinks?: { name: string; href: string }[];
    socials: {
      instagram: string;
      vimeo: string;
      twitter: string;
    };
  };
  projects: Project[];
  about: {
    heroSubtitle: string;
    portraitUrl?: string;
    profileTitle?: string;
    registryTitle?: string;
    curationTitle?: string;
    bioParagraphs: string[];
    clientRegistry: string[];
    curation: { label: string; value: string }[];
  };
}

export const DEFAULT_CMS_DATA: CmsData = {
  settings: {
    siteName: "DirDeo",
    logoUrl: "",
    contactEmail: "hello@dirdeo.studio",
    phone: "+44 (0) 20 7946 0123",
    location: "London / Los Angeles",
    availabilityStatus: "Available Q3 2024",
    footerHeadline: "Let's Create Together",
    homeWorksTitle: "Selected Works",
    homeViewAllText: "View All Projects",
    socials: {
      instagram: "#",
      vimeo: "#",
      twitter: "#"
    }
  },
  projects: [
    { id: "1", title: 'Nocturnal Echoes', category: 'Videography', client: 'A24', year: '2024', image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=2000', description: 'An exploration of the deep, quiet moments of city life after midnight.' },
    { id: "2", title: 'Monolith Architectural', category: 'Photography', client: 'Foster + Partners', year: '2023', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000', description: 'Captured through the lens of brutalist architecture.' },
    { id: "3", title: 'The Silent Peak', category: 'Videography', client: 'National Geographic', year: '2024', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2000', description: 'A documentary short following the solitary journey of an alpine climber.' },
    { id: "4", title: 'Urban Geometry', category: 'Photography', client: 'Commercial', year: '2023', image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=2000', description: 'Urban geometry discovering shapes in plain sight.' },
  ],
  about: {
    heroSubtitle: "A visual architect crafting light and shadow into digital emotion.",
    bioParagraphs: [
      "Based in London and working globally, I specialize in high-concept cinematography and minimalist architectural photography.",
      "Collaborating with visionary directors and design-led brands, I bring an editorial precision to moving images."
    ],
    clientRegistry: ['A24', 'Netflix', 'Universal Pictures', 'Nike', 'Apple', 'Prada', 'Vogue', 'BMW', 'Sony Music', 'Red Bull'],
    curation: [
      { label: 'Cannes Lions', value: 'Gold for Cinematography' },
      { label: 'Royal Academy', value: 'MA in Visual Arts' },
      { label: 'Vogue Photo', value: 'Artist of the Year 2022' },
    ]
  }
};

const CMS_QUERY = groq`{
  "settings": *[_type == "settings"][0]{
    siteName,
    "logoUrl": logo.asset->url,
    contactEmail,
    phone,
    location,
    availabilityStatus,
    footerHeadline,
    "homeHeroVideoUrl": homeHeroVideo.asset->url,
    "homeHeroImageUrl": homeHeroImage.asset->url,
    homeWorksTitle,
    homeViewAllText,
    socials,
    navLinks
  },
  "projects": *[_type == "project"] | order(order asc) {
    "id": _id,
    title,
    category,
    client,
    year,
    "image": image.asset->url,
    "videoUrl": videoFile.asset->url,
    videoOrientation,
    "gallery": gallery[].asset->url,
    description
  },
  "about": *[_type == "about"][0]{
    heroSubtitle,
    profileTitle,
    registryTitle,
    curationTitle,
    "portraitUrl": portraitImage.asset->url,
    bioParagraphs,
    clientRegistry,
    curation
  }
}`;

export async function getCmsData(): Promise<CmsData> {
  try {
    const data = await client.fetch(CMS_QUERY, {}, { next: { revalidate: 0 } });

    // Gracefully merge each section individually instead of all-or-nothing
    const settings = data?.settings
      ? {
          ...DEFAULT_CMS_DATA.settings,
          ...data.settings,
          // Ensure socials is always a valid object even if not set in Sanity
          socials: {
            ...DEFAULT_CMS_DATA.settings.socials,
            ...(data.settings.socials || {}),
          },
        }
      : DEFAULT_CMS_DATA.settings;

    const projects =
      data?.projects && Array.isArray(data.projects) && data.projects.length > 0
        ? data.projects.map((p: any) => ({
            id: p.id || '',
            title: p.title || 'Untitled',
            category: p.category || 'Uncategorized',
            client: p.client || '',
            year: p.year || '',
            image: p.image || '',
            videoUrl: p.videoUrl || undefined,
            videoOrientation: p.videoOrientation || 'landscape',
            gallery: Array.isArray(p.gallery) ? p.gallery.filter(Boolean) : undefined,
            description: p.description || '',
          }))
        : DEFAULT_CMS_DATA.projects;

    const about = data?.about
      ? {
          heroSubtitle: data.about.heroSubtitle || DEFAULT_CMS_DATA.about.heroSubtitle,
          portraitUrl: data.about.portraitUrl || undefined,
          profileTitle: data.about.profileTitle || 'Profile',
          registryTitle: data.about.registryTitle || 'Client Registry',
          curationTitle: data.about.curationTitle || 'Curation',
          bioParagraphs: Array.isArray(data.about.bioParagraphs) && data.about.bioParagraphs.length > 0
            ? data.about.bioParagraphs
            : DEFAULT_CMS_DATA.about.bioParagraphs,
          clientRegistry: Array.isArray(data.about.clientRegistry) && data.about.clientRegistry.length > 0
            ? data.about.clientRegistry
            : DEFAULT_CMS_DATA.about.clientRegistry,
          curation: Array.isArray(data.about.curation) && data.about.curation.length > 0
            ? data.about.curation
            : DEFAULT_CMS_DATA.about.curation,
        }
      : DEFAULT_CMS_DATA.about;

    return { settings, projects, about };
  } catch (error) {
    console.error('Sanity fetch error, falling back to default data:', error);
    return DEFAULT_CMS_DATA;
  }
}
