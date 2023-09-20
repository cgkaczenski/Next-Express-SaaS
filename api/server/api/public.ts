import * as express from "express";
import UserService from "../services/User";

const router = express.Router();

router.post("/get-user-by-email", async (req: any, res, next) => {
  console.log("Express route: /get-user-by-email");

  try {
    const { email } = req.body;

    const user = await UserService.getUserByEmail({ email });
    if (user.id !== req.session.userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.post("/user/update-profile", async (req: any, res, next) => {
  console.log("Express route: /user/update-profile");

  try {
    const { email, name, avatarUrl } = req.body;
    const user = await UserService.getUserByEmail({ email });
    if (user.id !== req.session.userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const updatedUser = await UserService.updateProfile({
      userId: user.id,
      name,
      avatarUrl,
    });

    res.json({ updatedUser });
  } catch (err) {
    next(err);
  }
});

export default router;
