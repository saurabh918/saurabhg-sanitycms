import {defineField, defineType} from 'sanity'
import { hotspotSchema } from './hotspot'

export default defineType({
  name: 'blog',
  title: 'Blog',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'object',
      fields: [
        {
          name: 'en',
          title: 'English',
          type: 'string',
        },
        {
          name: 'fr',
          title: 'French',
          type: 'string',
        },
      ],
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title.en',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'hotspots',
          title: 'Hotspots',
          type: 'array',
          of: [hotspotSchema],
          options: {
            imageHotspot: {
              hotspotRadius: 12,
            },
          },
        },
      ],
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'reference',
      to: [{ type: 'category' }],
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
    }),
    defineField({
      name: 'comment',
      title: 'Comment',
      type: 'reference',
      to: [{ type: 'comment' }],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'object',
      fields: [
        {
          name: 'en',
          title: 'English',
          type: 'blockContent',
        },
        {
          name: 'fr',
          title: 'French',
          type: 'blockContent',
        },
      ],
    }),
    defineField({
      name: 'bodySection2',
      title: 'BodySection2',
      type: 'object',
      fields: [
        {
          name: 'en',
          title: 'English',
          type: 'blockContent',
        },
        {
          name: 'fr',
          title: 'French',
          type: 'blockContent',
        },
      ],
    }),
  ],

  preview: {
    select: {
      title: 'title.en',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const { author } = selection;
      return { ...selection, subtitle: author && `by ${author}` };
    },
  },
});
