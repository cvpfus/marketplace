import { Router } from "express";
import {
  registerUser,
  loginUser,
  getUser,
  updateAddress,
} from "../controllers/user.js";
import { jwtMiddleware } from "../middlewares/index.js";

const router = Router();

router.route("/:userId").get(jwtMiddleware, getUser);
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/updateAddress").patch(jwtMiddleware, updateAddress);

export default router;
