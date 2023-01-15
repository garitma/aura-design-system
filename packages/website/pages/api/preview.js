import { createClient } from "@utils/prismic-client";
import { setPreviewData, redirectToPreviewURL } from "@prismicio/next";

const previewManagement = async function (req, res) {
  const client = createClient({ req });
  await setPreviewData({ req, res });
  await redirectToPreviewURL({ req, res, client });
};

export default previewManagement;
