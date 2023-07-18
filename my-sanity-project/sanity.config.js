import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'default',
  title: 'My Sanity Project',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID,
  dataset: process.env.SANITY_STUDIO_PROD_DATASET,
  document: {
    // prev is the result from previous plugins and thus can be composed
    productionUrl: async (prev, context) => {
      // context includes the client and other details
      const {getClient, dataset, document} = context
      const client = getClient({apiVersion: '2023-05-31'})

      if (document._type === 'blog') {
        const slug = await client.fetch(
          `*[_type == 'routeInfo' && blog._ref == $blogId][0].slug.current`,
          {blogId: document._id}
        )

        const params = new URLSearchParams()
        params.set('preview', 'true')
        params.set('dataset', dataset)

        return `https://sanity-project-2023.sanity.studio/desk/blog/${slug}?${params}`
      }

      return prev
    },
  },

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
