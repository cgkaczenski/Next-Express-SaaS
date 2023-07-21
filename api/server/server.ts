import * as express from "express";
import * as cors from "cors";
import { config } from "dotenv";
import UserService from "./services/User";

const isProd = process.env.NODE_ENV === "production";
if (!isProd) {
  config();
}
const URL_API = isProd ? process.env.RAILWAY_STATIC_URL : process.env.URL_API;

const server = express();

server.use(
  cors({
    origin: process.env.URL_APP,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

server.use(express.json());

server.post("/api/v1/public/get-user-by-slug", async (req, res, next) => {
  console.log("Express route: /get-user-by-slug");

  try {
    const { slug } = req.body;

    const user = await UserService.getUserBySlug({ slug });
    res.json({ user });
  } catch (err) {
    next(err);
  }
});

server.post(
  "/api/v1/public/user/update-profile",
  async (req: any, res, next) => {
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
  }
);

server.get("*", (_, res) => {
  res.sendStatus(403);
});

console.log(process.env.PORT, process.env.NODE_ENV);

server.listen(process.env.PORT, () => {
  console.log(`> Ready on ${URL_API}`);
});
