import * as express from "express";
import { config } from "dotenv";
import { StorageClient } from "@supabase/storage-js";

const router = express.Router();

const isProd = process.env.NODE_ENV === "production";
if (!isProd) {
  config();
}

const supabase = new StorageClient(process.env.STORAGE_URL, {
  apikey: process.env.SERVICE_KEY,
  Authorization: `Bearer ${process.env.SERVICE_KEY}`,
});

type StorageResponse = {
  signedUrl: string;
  token: string;
  path: string;
  url?: string;
};

router.post("/get-signed-request-for-upload", async (req, res, next) => {
  console.log("Express route: /get-signed-request-for-upload");

  try {
    const { bucket, slug, fileName } = req.body;

    // Must add math random to this so the same fileName can be uploaded multiple times
    const newFilePath = `${slug}/${Math.random()}-${fileName}`;

    const { data, error } = await supabase
      .from(bucket)
      .createSignedUploadUrl(newFilePath);

    const publicUrlResponse = supabase.from(bucket).getPublicUrl(newFilePath);

    const response = {
      ...data,
      url: publicUrlResponse.data.publicUrl,
    } as StorageResponse;

    if (error) {
      throw error;
    }

    res.json(response);
  } catch (err) {
    next(err);
  }
});

export default router;
