import SanityClient from "@sanity/client";

const client = new SanityClient({
  projectId: "xkq07yg2", 
  dataset: "production",
});

export default client