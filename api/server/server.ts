import * as express from "express";
import * as cors from "cors";
import { config } from "dotenv";
import api from "./api";

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

api(server);

server.get("*", (_, res) => {
  res.sendStatus(403);
});

console.log(process.env.PORT, process.env.NODE_ENV);

server.listen(process.env.PORT, () => {
  console.log(`> Ready on ${URL_API}`);
});
