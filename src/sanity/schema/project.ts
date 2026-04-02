import { defineType, defineField } from 'sanity';

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Videography', value: 'Videography' },
          { title: 'Photography', value: 'Photography' },
          { title: 'Commercial', value: 'Commercial' },
          { title: 'Personal', value: 'Personal' },
          { title: 'Cinematography', value: 'Cinematography' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'client',
      title: 'Client',
      type: 'string',
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Main Hero Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'videoFile',
      title: 'Main Video File (Large Files Supported)',
      type: 'file',
      options: {
        accept: 'video/mp4,video/x-m4v,video/*',
        storeOriginalFilename: true,
      },
      description: 'Important: To prevent the "stuck" issue, try to compress files over 100MB using Handbrake (H.264 MP4).',
    }),
    defineField({
      name: 'videoOrientation',
      title: 'Video Orientation',
      type: 'string',
      options: {
        list: [
          { title: 'Landscape (16:9)', value: 'landscape' },
          { title: 'Portrait (9:16)', value: 'portrait' },
        ],
        layout: 'radio',
      },
      initialValue: 'landscape',
      description: 'Choose portrait for short-form reels/social content.',
    }),
    defineField({
      name: 'gallery',
      title: 'Project Gallery (Multiple Photos)',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      description: 'Add multiple images for photography projects.',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      initialValue: 0,
    }),
  ],
});
