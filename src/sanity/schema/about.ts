import { defineType, defineField } from 'sanity';

export const about = defineType({
  name: 'about',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'portraitImage',
      title: 'Portrait Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'profileTitle',
      title: 'Profile Section Title',
      type: 'string',
      initialValue: 'Profile',
    }),
    defineField({
      name: 'registryTitle',
      title: 'Registry Section Title',
      type: 'string',
      initialValue: 'Client Registry',
    }),
    defineField({
      name: 'curationTitle',
      title: 'Curation Section Title',
      type: 'string',
      initialValue: 'Curation',
    }),
    defineField({
      name: 'bioParagraphs',
      title: 'Bio Paragraphs',
      type: 'array',
      of: [{ type: 'text' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'clientRegistry',
      title: 'Client Registry',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'curation',
      title: 'Curation Highlights',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string', title: 'Label' },
            { name: 'value', type: 'string', title: 'Value' },
          ],
        },
      ],
    }),
  ],
});
