import * as express from "express";
import { config } from "dotenv";
import TeamService from "../services/Team";

const router = express.Router();

const isProd = process.env.NODE_ENV === "production";
if (!isProd) {
  config();
}

router.post("/teams/add", async (req: any, res, next) => {
  console.log("Express route: /teams/add");
  try {
    const { name, logoUrl } = req.body;
    const team = await TeamService.addTeam({
      userId: req.session.userId,
      name,
      logoUrl,
    });
    res.json(team);
  } catch (err) {
    next(err);
  }
});

export default router;
