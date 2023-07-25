import SanityClient from "@sanity/client";

const client = new SanityClient({
  projectId: "xkq07yg2", 
  dataset: "staging",
});

export default client