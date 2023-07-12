import { defineField, defineType } from 'sanity';
import menuItem from './menuItem';

export default defineType({
  name: 'header',
  title: 'Header',
  type: 'document',
  fields: [
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
    }),
    defineField({
      name: 'menuItems',
      title: 'Menu Items',
      type: 'array',
      of: [{ type: 'menuItem' }],
    }),
    defineField({
      name: 'phoneNumber',
      title: 'Phone Number',
      type: 'string',
      validation: (Rule) =>
        Rule.regex(/^\d{10}$/, {
          name: 'phoneNumberLength',
          invert: false,
        }).warning('Please enter a valid 10-digit phone number.'),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) =>
        Rule.regex(
          /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          {
            name: 'emailFormat',
            invert: false,
          }
        ).warning('Please enter a valid email address.'),
    }),
  ],
  preview: {
    select: {},
    prepare: () => ({ title: 'Header' }),
  },
});