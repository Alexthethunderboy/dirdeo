import { defineType, defineField } from 'sanity';

export const settings = defineType({
  name: 'settings',
  title: 'Global Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      initialValue: 'DirDeo',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      initialValue: '+44 (0) 20 7946 0123',
    }),
    defineField({
      name: 'location',
      title: 'Location / Office',
      type: 'string',
      initialValue: 'London / Los Angeles',
    }),
    defineField({
      name: 'availabilityStatus',
      title: 'Availability Status',
      type: 'string',
      initialValue: 'Available Q3 2024',
    }),
    defineField({
      name: 'footerHeadline',
      title: 'Footer Call to Action',
      type: 'string',
      initialValue: "Let's Create Together",
    }),
    defineField({
      name: 'socials',
      title: 'Social Links',
      type: 'object',
      fields: [
        defineField({ name: 'instagram', type: 'url', title: 'Instagram' }),
        defineField({ name: 'vimeo', type: 'url', title: 'Vimeo' }),
        defineField({ name: 'twitter', type: 'url', title: 'Twitter' }),
      ],
    }),
    defineField({
      name: 'homeHeroVideo',
      title: 'Home Hero Video File',
      type: 'file',
      options: { 
        accept: 'video/mp4,video/x-m4v,video/*',
        storeOriginalFilename: true,
      },
      description: 'Keep home videos under 20MB for fast landing page performance.',
    }),
    defineField({
      name: 'homeHeroImage',
      title: 'Home Hero Placeholder Image',
      type: 'image',
      description: 'Shown immediately while the video is loading.',
      options: { hotspot: true },
    }),
    defineField({
      name: 'homeWorksTitle',
      title: 'Home Works Section Title',
      type: 'string',
      initialValue: 'Selected Works',
    }),
    defineField({
      name: 'homeViewAllText',
      title: 'Home View All Button Text',
      type: 'string',
      initialValue: 'View All Projects',
    }),
    defineField({
      name: 'navLinks',
      title: 'Navigation Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', type: 'string', title: 'Link Text' },
            { name: 'href', type: 'string', title: 'Link URL' },
          ],
        },
      ],
      initialValue: [
        { name: 'Work', href: '/work' },
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' },
      ],
    }),
  ],
});
