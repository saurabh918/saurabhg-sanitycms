import { defineField } from 'sanity';

export const hotspotSchema = defineField({
  name: 'hotspot',
  title: 'Hotspot',
  type: 'object',
  fields: [
    { name: 'type', type: 'string', options: { list: ['text', 'image', 'video', 'link'] } },
    { name: 'x', type: 'number', initialValue: 50 },
    { name: 'y', type: 'number', initialValue: 50 },
    { name: 'height', type: 'number', initialValue: 0.7449728743875486 },
    { name: 'width', type: 'number', initialValue: 1 },
    { name: 'content', type: 'text', rows: 2, hidden: ({ parent }) => parent && parent.type !== 'text' },
    { name: 'image', type: 'image', hidden: ({ parent }) => parent && parent.type !== 'image' },
    { name: 'video', type: 'file', accept: 'video/*', hidden: ({ parent }) => parent && parent.type !== 'video' },
    { name: 'link', type: 'url', hidden: ({ parent }) => parent && parent.type !== 'link' },
  ],
});