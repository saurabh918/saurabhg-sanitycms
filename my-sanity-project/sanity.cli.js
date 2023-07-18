import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: SANITY_STUDIO_PROJECT_ID, 
    dataset: SANITY_STUDIO_PROD_DATASET,
  }
})
