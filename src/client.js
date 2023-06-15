import SanityClient from "@sanity/client";

const client = new SanityClient({
  projectId: process.env.REACT_APP_PROJECT_ID, 
  dataset: process.env.REACT_APP_DATASET,
});

export default client