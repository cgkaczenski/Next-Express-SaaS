import * as express from "express";

import UserService from "../services/User";

const router = express.Router();

router.post("/get-user-by-slug", async (req, res, next) => {
  console.log("Express route: /get-user-by-slug");

  try {
    const { slug } = req.body;

    const user = await UserService.getUserBySlug({ slug });
    res.json({ user });
  } catch (err) {
    next(err);
  }
});

router.post("/user/update-profile", async (req: any, res, next) => {
  console.log("Express route: /user/update-profile");

  try {
    const { name, avatarUrl } = req.body;

    const userId = "123";

    const updatedUser = await UserService.updateProfile({
      userId: userId,
      name,
      avatarUrl,
    });

    res.json({ updatedUser });
  } catch (err) {
    next(err);
  }
});

export default router;
