import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'footer',
  title: 'Footer',
  type: 'document',
  fields: [
    defineField({
      name: 'socialMedia',
      title: 'Social Media Links',
      type: 'array',
      of: [{ type: 'socialLink' }],
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'text',
    }),
    defineField({
      name: 'newsletter',
      title: 'Enable Newsletter',
      type: 'boolean',
    }),
  ],
  preview: {
    select: {},
    prepare: () => ({ title: 'Footer' }),
  },
});