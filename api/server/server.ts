import * as express from "express";
import { config } from "dotenv";
import UserService from "./services/User";

const isProd = process.env.NODE_ENV === "production";
if (!isProd) {
  config();
}
const URL_API = isProd ? process.env.RAILWAY_STATIC_URL : process.env.URL_API;

const server = express();

server.use(express.json());

server.get("/api/v1/public/get-user", async (_, res) => {
  console.log("API server got request from APP server or browser");
  const user = await UserService.getUserBySlug({ slug: "me" });
  res.json({ user: user });
});

server.get("*", (_, res) => {
  res.sendStatus(403);
});

console.log(process.env.PORT, process.env.NODE_ENV);

server.listen(process.env.PORT, () => {
  console.log(`> Ready on ${URL_API}`);
});
