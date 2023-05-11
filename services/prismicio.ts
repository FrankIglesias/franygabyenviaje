import * as prismic from "@prismicio/client";
import * as prismicNext from "@prismicio/next";
import config from "../slicemachine.config.json";

export const repositoryName = config.repositoryName;
export const createClient = (config: prismicNext.CreateClientConfig = {}) => {
  const client = prismic.createClient(process.env.PRISMIC_REPOSITORY, {
    accessToken: process.env.PRISMIC_TOKEN,
    ...config,
  });

  prismicNext.enableAutoPreviews({
    client,
    previewData: config.previewData,
    req: config.req,
  });

  return client;
};
