import { defineField, defineType } from 'sanity';
import { hotspotSchema } from './hotspot'

export default defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'hotspots',
      title: 'Hotspots',
      type: 'array',
      of: [hotspotSchema],
      options: {
        imageHotspot: {
          imagePath: 'mainImage',
        },
      },
    }),
  ],
});
