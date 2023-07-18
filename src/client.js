import SanityClient from "@sanity/client";

const client = new SanityClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID, 
  dataset: process.env.SANITY_STUDIO_PROD_DATASET,
});

export default client