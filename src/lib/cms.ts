import { client } from '@/sanity/lib/client';
import { urlForImage } from '@/sanity/lib/image';
import { groq } from 'next-sanity';

export interface Project {
  id: string;
  title: string;
  category: string;
  client: string;
  year: string;
  image: string;
  videoUrl?: string;
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
    socials: {
      instagram: string;
      vimeo: string;
      twitter: string;
    };
  };
  projects: Project[];
  about: {
    heroSubtitle: string;
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
    socials: {
      instagram: "#",
      vimeo: "#",
      twitter: "#"
    }
  },
  projects: [
    { id: "1", title: 'Nocturnal Echoes', category: 'Videography', client: 'A24', year: '2024', image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=2000', description: 'An exploration of the deep, quiet moments of city life after midnight. Shot on ARRI Alexa using anamorphic lenses for a cinematic, wide-screen feel.' },
    { id: "2", title: 'Monolith Architectural', category: 'Photography', client: 'Foster + Partners', year: '2023', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000', description: 'Captured through the lens of brutalist architecture. This series emphasizes the strength and texture of concrete against the pure light of high noon.' },
    { id: "3", title: 'The Silent Peak', category: 'Videography', client: 'National Geographic', year: '2024', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2000', description: 'A documentary short following the solitary journey of an alpine climber. Focused on the relationship between man and the magnitude of nature.' },
    { id: "4", title: 'Urban Geometry', category: 'Photography', client: 'Commercial', year: '2023', image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=2000', description: 'Urban geometry discovering shapes in plain sight.' },
    { id: "5", title: 'Concrete Jungle', category: 'Commercial', client: 'None', year: '2024', image: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&q=80&w=2000', description: 'A deep dive into the brutalist streets.' },
    { id: "6", title: 'Neon Pulse', category: 'Personal', client: 'None', year: '2023', image: 'https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&q=80&w=2000', description: 'Personal exploration of night life vibes in Tokyo.' }
  ],
  about: {
    heroSubtitle: "A visual architect crafting light and shadow into digital emotion.",
    bioParagraphs: [
      "Based in London and working globally, I specialize in high-concept cinematography and minimalist architectural photography. My discipline is centered on the reduction of noise—prioritizing the purity of form and the subtle interplay of light.",
      "Collaborating with visionary directors and design-led brands, I bring an editorial precision to moving images, ensuring every frame functions as a standalone piece of art."
    ],
    clientRegistry: ['A24', 'Netflix', 'Universal Pictures', 'Nike', 'Apple', 'Prada', 'Vogue', 'BMW', 'Sony Music', 'Red Bull'],
    curation: [
      { label: 'Cannes Lions', value: 'Gold for Cinematography' },
      { label: 'Royal Academy', value: 'MA in Visual Arts' },
      { label: 'Vogue Photo', value: 'Artist of the Year 2022' },
    ]
  }
};

export async function getCmsData(): Promise<CmsData> {
  try {
    const query = groq`{
      "settings": *[_type == "settings"][0]{
        siteName,
        "logoUrl": logo.asset->url,
        contactEmail,
        phone,
        location,
        availabilityStatus,
        footerHeadline,
        "homeHeroVideoUrl": homeHeroVideo.asset->url,
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

    const data = await client.fetch(query);

    // Deep merge or check for missing critical fields
    if (!data.settings || !data.about || !data.projects || data.projects.length === 0) {
      return DEFAULT_CMS_DATA;
    }

    // Ensure strings are populated even if schema has changed
    const finalData = {
      ...data,
      settings: {
        ...DEFAULT_CMS_DATA.settings,
        ...data.settings
      }
    };

    return finalData as CmsData;
  } catch (error) {
    console.error('Sanity fetch error, falling back to mock data:', error);
    return DEFAULT_CMS_DATA;
  }
}
