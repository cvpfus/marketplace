import { Router } from "express";
import { addOrder, getOrder, updateOrderStatus } from "../controllers/order.js";
import { jwtMiddleware } from "../middlewares/index.js";

const router = Router();

router.route("/").post(jwtMiddleware, addOrder);
router.route("/:id").get(jwtMiddleware, getOrder);
router.route("/orderStatus").patch(jwtMiddleware, updateOrderStatus);

export default router;
