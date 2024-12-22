import { expressjwt as jwt } from "express-jwt";
import "dotenv/config";

export const jwtMiddleware = jwt({
  secret: process.env.SECRET,
  algorithms: ["HS256"],
});
