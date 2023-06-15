import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.REACT_APP_PROJECT_ID,
    dataset: process.env.REACT_APP_DATASET
  }
})
