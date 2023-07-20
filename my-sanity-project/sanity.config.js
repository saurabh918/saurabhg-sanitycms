import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'

export default defineConfig([{
  name: 'default',
  title: 'My Sanity Project',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID,
  dataset: process.env.SANITY_STUDIO_STG_DATASET,

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  }
},
  {
    name: 'Staging',
    title: 'sanity project staging',
    basePath: '/staging',
    projectId: process.env.SANITY_STUDIO_PROJECT_ID,
    dataset: process.env.SANITY_STUDIO_STG_DATASET,
  
    plugins: [deskTool(), visionTool()],
  
    schema: {
      types: schemaTypes,
    },
  }
])
