import SanityClient from "@sanity/client";

const client = new SanityClient({
  projectId: SANITY_STUDIO_PROJECT_ID, 
  dataset: SANITY_STUDIO_PROD_DATASET,
});

export default client