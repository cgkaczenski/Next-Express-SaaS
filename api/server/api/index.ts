import * as express from "express";
import SessionService from "../services/Session";
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
    console.log("No authorization header");
    return res.status(401).json({ error: "No authorization header" });
  }
  const sessionToken = authHeader.split(" ")[1] as string;
  let session;
  try {
    session = await SessionService.getSession({
      sessionToken,
    });
  } catch (err) {
    console.log("Error getting session", err);
  }
  if (!session || session.expires < new Date()) {
    return res.status(401).json({ error: "Invalid session token" });
  }
  req.session = session;
  next();
}

export default function api(server: express.Express) {
  server.use(checkSession);
  server.use("/api/v1/public", publicExpressRoutes);
  server.use("/api/v1/team-member", teamMemberExpressRoutes);
  server.use(handleError);
}
