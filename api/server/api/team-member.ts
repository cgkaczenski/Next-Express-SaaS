import * as express from "express";
import { config } from "dotenv";
import { StorageClient } from "@supabase/storage-js";
import userService from "../services/User";
import teamService from "../services/Team";

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

router.post("/teams/getDefaultTeam", async (req: any, res, next) => {
  console.log("Express route: /teams/getDefaultTeam");
  try {
    const user = await userService.getUser({
      field: "id",
      value: req.session.userId,
    });
    if (user.id !== req.session.userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const team = await teamService.getTeam({
      field: "id",
      value: user.defaultTeamId,
    });
    res.json(team);
  } catch (err) {
    next(err);
  }
});

export default router;
