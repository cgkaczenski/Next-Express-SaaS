import * as express from "express";
import { config } from "dotenv";
import teamService from "../services/Team";
import userService from "../services/User";

const router = express.Router();

const isProd = process.env.NODE_ENV === "production";
if (!isProd) {
  config();
}

router.post("/teams/add", async (req: any, res, next) => {
  console.log("Express route: /teams/add");
  try {
    const user = await userService.getUser({
      field: "id",
      value: req.session.userId,
    });
    if (user.id !== req.session.userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const { name, logoUrl } = req.body;
    const team = await teamService.addTeam({
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
