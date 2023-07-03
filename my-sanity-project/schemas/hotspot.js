import { defineField } from 'sanity';

export const hotspotSchema = defineField({
  name: 'hotspot',
  title: 'Hotspot',
  type: 'object',
  fields: [
    { name: 'details', type: 'text', rows: 2 },
    { name: 'x', type: 'number', initialValue: 50 },
    { name: 'y', type: 'number', initialValue: 50 },
    { name: 'height', type: 'number', initialValue: 0.7449728743875486 },
    { name: 'width', type: 'number', initialValue: 1 },
  ],
});