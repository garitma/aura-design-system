import { NextApiRequest, NextApiResponse } from "next";
import { setPreviewData, redirectToPreviewURL } from "@prismicio/next";

import { createClient } from "@/utils/prismic-client";

const previewManagement = async function (
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = createClient({ req });
  await setPreviewData({ req, res });
  await redirectToPreviewURL({ req, res, client });
};

export default previewManagement;
