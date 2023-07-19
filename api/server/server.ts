import * as express from "express";
import { config } from "dotenv";

const isProd = process.env.NODE_ENV === "production";
if (!isProd) {
  config();
}
const URL_API = isProd ? process.env.RAILWAY_STATIC_URL : process.env.URL_API;

const server = express();

server.use(express.json());

server.get("/api/v1/public/get-user", (_, res) => {
  console.log("API server got request from APP server or browser");
  res.json({ user: { email: "team@builderbook.org" } });
});

server.get("*", (_, res) => {
  res.sendStatus(403);
});

console.log(process.env.PORT, URL_API);

server.listen(process.env.PORT, () => {
  console.log(`> Ready on ${URL_API}`);
});
