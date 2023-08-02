import * as express from "express";
import publicExpressRoutes from "./public";
import teamMemberExpressRoutes from "./team-member";

function handleError(err, _, res, __) {
  console.error(err.stack);

  res.json({ error: err.message || err.toString() });
}

async function checkSession(req, res, next) {
  let authHeader;
  if (req && req.headers) {
    authHeader = req.headers["authorization"];
  }

  if (!authHeader) {
    return res.status(401).json({ error: "No authorization header" });
  } else {
    next();
  }
}

export default function api(server: express.Express) {
  server.use(checkSession);
  server.use("/api/v1/public", publicExpressRoutes, handleError);
  server.use("/api/v1/team-member", teamMemberExpressRoutes, handleError);
}
